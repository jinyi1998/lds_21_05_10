<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\LearningOutcome;
use Auth;

class LearningOutcomesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $outcomes = LearningOutcome::All();
        return response()->json($outcomes);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public static function store(Request $request)
    {
        //
        $outcome = new LearningOutcome;
        $outcome = LearningOutcomesController::save($outcome, $request);
        return response()->json($outcome);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $outcome = LearningOutcome::with(['componentid', 'tasks'])->find($id);
        return response()->json($outcome);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $outcome = LearningOutcome::find($id);
        $outcome = LearningOutcomesController::save($outcome, $request);

        return response()->json($outcome);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $outcome = LearningOutcome::find($id);
        // return response()->json($outcome->component_outcomeid);
        foreach($outcome->component_outcomeid as $_clo_id){
            $clo_outcome = LearningOutcome::find($_clo_id['component_outcomeid']);
            $clo_outcome->delete();
        }
        $outcome->delete();
        return response()->json("");
    }

      /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroyComponentRelation($outcome_id, $component_id)
    {
        //
        $outcome = LearningOutcome::find($outcome_id);

        foreach($outcome->componentid as $_component_id){
            if($_component_id->component_id == $component_id){
                $_component_id->delete(); // <-- direct deletion
                return response()->json('success');
            }
        }
        return response()->json("no this outcome");
    }


    public static function save(LearningOutcome $outcome, Request $request){

        // return \response()->json($request);
        $outcome->level = $request->level;
        $outcome->outcomeType = $request->outcomeType;
        $outcome->description = $request->description;
        $outcome->STEMType = $request->STEMType;
        $outcome->isCourseLevel = $request->isCourseLevel;

        if($request->has('bloom_id')){
            $outcome->bloom_id = $request->bloom_id;
        }
        $outcome->created_by = Auth::user()->id;
        $outcome->updated_by = Auth::user()->id;
        $outcome->is_deleted = 0;
        $outcome->created_at = now();
        $outcome->updated_at = now();
        
        if($request->has('template_id')){
            $outcome->template_id = $request->template_id;
        }

        $outcome->save();

        if($request->has('stemtypes_id')){
            $outcome->stemtypesid()->delete();
            if(isset($request->stemtypes_id)){
                foreach($request->stemtypes_id as $_stemid){
                    $outcome->stemtypesid()->create([
                        'outcome_id' => $outcome->id,
                        'stem_type_id' => $_stemid,
                        'created_by' => Auth::user()->id,
                        'updated_by' => Auth::user()->id,
                        'is_deleted' => 0,
                    ]);
                }
            }
          
        }

        if($request->has('del_component_id')){
            $outcome->componentid()->where('component_id', $request->del_component_id)->delete();
        }
        
        if($request->has('component_id')){
            $sequence = DB::table('component_outcome_relational')->where('component_id', $request->component_id)->count();
            if( $outcome->componentid()->exists()){
                $outcome->componentid()->update([
                    'outcome_id' => $outcome->id,
                    'component_id' => $request->component_id,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0,
                    'sequence' =>  $sequence + 1,
                ]);
            }else{
                $outcome->componentid()->create([
                    'outcome_id' => $outcome->id,
                    'component_id' => $request->component_id,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0,
                    'sequence' =>  $sequence + 1,
                ]);
            }
       
        }

        if($request->has('slo_outcome')){
            // delete
            $existing = $outcome->slo_outcome_id()->get();
            foreach($existing as $_eslo){
                $check = true;

                if(!isset($_eslo->component_outcomeid)){
                    continue;   
                }

                foreach($request->slo_outcome as $_slo){
                    if($_slo['id']  == $_eslo->component_outcomeid){
                        $check = false;
                    }
                }

               if($check){
                 $outcome->slo_outcome_id()->where('component_outcomeid', $_eslo->component_outcomeid)->delete();
               }
            }

            foreach($request->slo_outcome as $_slo){
                if( $_slo['id'] > 0){
                   
                    $request_slo = new \Illuminate\Http\Request( $_slo);
                    $request_slo['stemtypes_id'] = $request->stemtypes_id;
                    $request_slo['unit_outcome_id'] = $outcome->id;

                    $new_slo = LearningOutcome::find($_slo['id']);
                    if( !isset( $new_slo)){
                        //load from template
                        $new_slo = new LearningOutcome();
                        $request_slo['template_id'] = $_slo['id'];
                    }
                    $slo_outcome = LearningOutcomesController::save($new_slo, $request_slo);            
                    //update
                }else{
                    //create
                    $new_slo = new LearningOutcome();
                    $request_slo = new \Illuminate\Http\Request( $_slo);
                    $request_slo['stemtypes_id'] = $request->stemtypes_id;
                    $request_slo['unit_outcome_id'] = $outcome->id;
                    $slo_outcome = LearningOutcomesController::save($new_slo, $request_slo);
                }
            }
        }

        if($request->has('unit_outcome_id')){
            if($request->unit_outcome_id == -1){
                // do nothing
            }   
            else if($outcome->unit_outcomeid()->exists()){
                $outcome->unit_outcomeid()->update([
                    'component_outcomeid' => $outcome->id,
                    'unit_outcomeid' => $request->unit_outcome_id,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                ]);
            }else{
                $outcome->unit_outcomeid()->create([
                    'component_outcomeid' => $outcome->id,
                    'unit_outcomeid' => $request->unit_outcome_id,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                ]);
            }
          
        }

        if($request->has('course_id') && $outcome->isCourseLevel == true){
            $sequence = DB::table('course_outcome_relation')->where('course_id', $request->course_id)->count();
            if($outcome->courseid()->exists()){

            }else{
                $outcome->courseid()->create([
                    'outcome_id' => $outcome->id,
                    'course_id' => $request->course_id,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0,
                    'sequence' => $sequence + 1
                ]);
            }
        }      
        return $outcome;
    }

}
