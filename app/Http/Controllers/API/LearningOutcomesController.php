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
        $outcome = LearningOutcome::with(['componentid'])->find($id);
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
        $outcome->created_by = Auth::user()->id;
        $outcome->updated_by = Auth::user()->id;
        $outcome->is_deleted = 0;
        $outcome->created_at = now();
        $outcome->updated_at = now();

        if($request->has('template_id')){
            $outcome->template_id = $request->template_id;
        }

        $outcome->save();

        if($request->has('component_id')){
            $sequence = DB::table('component_outcome_relational')->where('component_id', $request->component_id)->count();
            if( $outcome->componentid()->exists()){
                $outcome->componentid()->update([
                    // 'id' =>  $outcome->componentid()->get()->id,
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

        if($request->has('unit_outcomeid')){
            if($request->unit_outcomeid == -1){
                // do nothing
            }   
            else if($outcome->unit_outcomeid()->exists()){
                $outcome->unit_outcomeid()->update([
                    'component_outcomeid' => $outcome->id,
                    'unit_outcomeid' => $request->unit_outcomeid,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                ]);
            }else{
                $outcome->unit_outcomeid()->create([
                    'component_outcomeid' => $outcome->id,
                    'unit_outcomeid' => $request->unit_outcomeid,
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


    public function getOutcomeType(){
        //
        return response()->json([
            [
                'id' => 1,
                'description' => 'Disciplinary Skills',
                'value' => 1
            ],
            [
                'id' => 2,
                'description' => 'Disciplinary Knowledge',
                'value' => 2
            ],
            [
                'id' => 3,
                'description' => 'Generic Skills',
                'value' => 3
            ],
           
        ]);
    }

    public function getOutcomeLevel($id = 1){


        return response()->json([
            [
                'id' => 1,
                'description' => 'Remember',
                'value' => ['Recall', 'Relate', 'Recognize', 'Memorize', 'Repeat', 'Record', 'List']                
            ],
            [
                'id' => 2,
                'description' => 'Comprehend',
                'value' => ['Estimate', 'Discuss', 'Describe', 'Recognize', 'Explain', 'Express', 'Identify']                
            ],
            [
                'id' => 3,
                'description' => 'Apply',
                'value' => ['Interpret', 'Apply', 'Emply', 'Use', 'Demonstrate', 'Dramatize', 'Practice', 'Illustrate', 'Operate', 'Schedule', 'Shop', 'Sketch']
            ],
            [
                'id' => 4,
                'description' => 'Analyze',
                'value' => ['Distinguish', 'Analyze', 'Differentiate', 'Appraise', 'Calculate', 'Experiment', 'Test'
                , 'Compare', 'Contrast', 'Criticize', 'Diagram', 'Inspect', 'Debate', 'Inventory', 'Question', 'Relate']
            ],
            [
                'id' => 5,
                'description' => 'Evaluation',
                'value' => ['Judge', 'Appraise', 'Rate', 'Evaluate', 'Compare', 'Revise', 'Score', 'Select', 'Choose', 'Assess estimate', 'Measure']
            ],
            [
                'id' => 6,
                'description' => 'Create',
                'value' => ['Compose Plan', 'Propose', 'Design', 'Formulate', 'Arrange', 'Collect', 'Construct', 'Create', 'Set up', 'Organize', 'Manage', 'Prepare']
            ],
        ]);
    }

    public function getSTEMType(){
        return response()->json([
            '1' => [
                'id' => 1,
                'description' => 'Science',
                'value' => 'S'
            ],
            '2' => [
                'id' => 2,
                'description' => 'Technology',
                'value' => 'T'
            ],
            '3' => [
                'id' => 3,
                'description' => 'Engineering',
                'value' => 'E'
            ],
            '4' => [
                'id' => 3,
                'description' => 'Mathametics',
                'value' => 'M'
            ],
           
        ]);
    }
}
