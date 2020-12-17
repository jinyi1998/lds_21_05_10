<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\LearningOutcomeTemplate;
use Auth;

class LearningOutcomeTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return response()->json(App\LearningOutcomeTemplate::All());

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $outcome = new LearningOutcomeTemplate();
        return response()->json(LearningOutcomeTemplateController::save($outcome, $request));
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
        return response()->json(App\LearningOutcomeTemplate::find($id));
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
        $outcome = LearningOutcomeTemplate::find($id);
        return response()->json(LearningOutcomeTemplateController::save($outcome, $request));
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
        $outcome = LearningOutcomeTemplate::find($id);
        if($outcome->componentid()->exists()){
            $outcome->componentid()->delete();
        }

        if($outcome->unit_outcomeid_temp()->exists()){
            $outcome->unit_outcomeid_temp()->delete();
        }
    }

    public static function save(LearningOutcomeTemplate $outcome, Request $request){

        // return \response()->json($request);
        if($request->has('level')){
            $outcome->level = $request->level;
        }else{
            $outcome->level = "";
        }

        if($request->has('outcomeType')){
            $outcome->outcomeType = $request->outcomeType;
        }

        if($request->has('description')){
            $outcome->description = $request->description;
        }

        if($request->has('STEMType')){
            $outcome->STEMType = $request->STEMType;
        }else{
            $outcome->STEMType = "";
        }

        if($request->has('isCourseLevel')){
            $outcome->isCourseLevel = $request->isCourseLevel;
        }

        if($request->has('template_id')){
            $outcome->template_id = $request->template_id;
        }

        $outcome->created_by = Auth::user()->id;
        $outcome->updated_by = Auth::user()->id;
        $outcome->is_deleted = 0;
        $outcome->created_at = now();
        $outcome->updated_at = now();

        $outcome->save();

        if($request->has('del_component_id')){
            $outcome->componentid()->where('component_id', $request->del_component_id)->delete();
        }
        
        if($request->has('component_id')){
            $sequence = DB::table('component_outcome_template_relation')->where('component_id', $request->component_id)->count();
            if( $outcome->componentid()->exists()){
                $outcome->componentid()->update([
                    // 'id' =>  $outcome->componentid()->get()->id,
                    'outcome_id' => $outcome->id,
                    'component_id' => $request->component_id,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0,
                    // 'sequence' =>  $sequence + 1,
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




        if($request->has('stemtypes_id')){
            $outcome->stemtypesid()->delete();
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

        if($request->has('slo_outcome')){
            // delete slo outcome
            $existing = $outcome->slo_outcome_id()->get();
            foreach((array)$existing as $_eslo){

                if(!isset($_eslo->component_outcome_id)){
                    continue;   
                }
                $check = true;

                foreach($request->slo_outcome as $_slo){
                    if($_slo['id']  == $_eslo->component_outcome_id){
                        $check = false;
                    }
                }

               if($check){
                 $outcome->slo_outcome_id()->where('component_outcome_id', $_eslo->component_outcome_id)->delete();
               }
            }

            foreach($request->slo_outcome as $_slo){
                if( $_slo['id'] > 0){
                    $new_slo = LearningOutcomeTemplate::find($_slo['id']);
                    $request_slo = new \Illuminate\Http\Request( $_slo);
                    $request_slo['stemtypes_id'] = $request->stemtypes_id;
                    $request_slo['unit_outcome_id'] = $outcome->id;
                    $slo_outcome = LearningOutcomeTemplateController::save($new_slo, $request_slo);            
                    //update
                }else{
                    //create
                    $new_slo = new LearningOutcomeTemplate();
                    $request_slo = new \Illuminate\Http\Request( $_slo);
                    $request_slo['stemtypes_id'] = $request->stemtypes_id;
                    $request_slo['unit_outcome_id'] = $outcome->id;
                    $slo_outcome = LearningOutcomeTemplateController::save($new_slo, $request_slo);
                }
            }
        }

        if($request->has('unit_outcome_id')){
            if($request->unit_outcome_id == -1){
                // do nothing
            }   
            else if($outcome->unit_outcomeid_temp()->exists()){
                $outcome->unit_outcomeid_temp()->update([
                    'component_outcome_id' => $outcome->id,
                    'unit_outcome_id' => $request->unit_outcome_id,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                ]);
            }else{
                $outcome->unit_outcomeid_temp()->create([
                    'component_outcome_id' => $outcome->id,
                    'unit_outcome_id' => $request->unit_outcome_id,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                ]);
            }
          
        }

        if($request->has('designtype_id') && $outcome->isCourseLevel == true){
            if($outcome->designtypeid()->exists()){
                $outcome->designtypeid()->update([
                    'outcome_id' => $outcome->id,
                    'designtype_id' => $request->designtype_id,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0,
                ]);

            }else{
                $outcome->designtypeid()->create([
                    'outcome_id' => $outcome->id,
                    'designtype_id' => $request->designtype_id,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0,
                ]);
            }
        }      
        return $outcome;
    }




}
