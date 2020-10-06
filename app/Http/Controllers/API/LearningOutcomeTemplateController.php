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
        $outcome->level = $request->level;
        $outcome->outcomeType = $request->outcomeType;
        $outcome->description = $request->description;
        $outcome->STEMType = $request->STEMType;
        $outcome->isCourseLevel = $request->isCourseLevel;
        $outcome->created_by = 1;
        $outcome->updated_by = 1;
        $outcome->is_deleted = 0;
        $outcome->created_at = now();
        $outcome->updated_at = now();

        $outcome->save();

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

        if($request->has('unit_outcome_id')){
            if($request->unit_outcomeid == -1){
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
