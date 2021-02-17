<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\LearningTask;
use App\ComponentPatternTaskRelation;
use App\PatternTaskRelation;
use App\TaskAssessmentRelation;
use App\TaskResourceRelation;
use App\TaskToolRelation;
use Illuminate\Support\Facades\DB;
use Auth;

class LearningTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $task = LearningTask::All();
        return response()->json($task);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public static function store(Request $request)
    {
        $task = new LearningTask;  
        $task = LearningTaskController::save($task, $request);
        return response()->json($task);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //findOrFail
        $task = LearningTask::with([
            'assessmentid', 
            'resourceid', 
            'toolid', 
            'patternid',
            'componentid',
            'lessonid'
        ])->find($id);
       
        return response()->json($task);
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
        $task = LearningTask::find($id);
        // if the learning task is related to the   
        $task = LearningTaskController::save($task, $request);
        
        return response()->json($task);
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
        $task = LearningTask::find($id);
        $task->assessmentid()->delete();
        $task->resourceid()->delete();
        $task->toolid()->delete();
        $task->patternid()->delete();
        $task->componentid()->delete();
        $task->delete();
        return response()->json("");
    }

    public static function save(LearningTask $task, Request $request){
        if($request->has('title')){
            $task->title = $request->title;
        }
        if($request->has('time')){
            $task->time = $request->time;
        }
        if($request->has('type')){
            $task->type = $request->type;
        }
        if($request->has('class_type')){
            $task->class_type = $request->class_type;
        }
        if($request->has('target')){
            $task->target = $request->target;
        }
        if($request->has('size')){
            $task->size = $request->size;
        }
        if($request->has('description')){
            $task->description = $request->description;
        }

        if($request->has('has_assessment')){
            $task->has_assessment = $request->has_assessment;
        }
        // if($request->has('sequence')){
        //     $task->sequence = $request->sequence;
        // }

        $task->is_deleted = 0;
        $task->created_by = Auth::user()->id;
        $task->updated_by = Auth::user()->id;
        $task->created_at = now();
        $task->updated_at = now();

        $task->save();
        //assessment
        if($request->has('component_id')){
            if($request->has('sequence')){
                $sequence =  $request->sequence;
            }else{
                if(ComponentPatternTaskRelation::where('component_id', '=', $request->component_id)->where('task_id', '=', $task->id)->count() > 0){
                    $sequence =   ComponentPatternTaskRelation::where('component_id', '=', $request->component_id)->where('task_id', '=', $task->id)->first()->sequence;
                }else{
                    $sequence =   ComponentPatternTaskRelation::where('component_id', '=', $request->component_id)->max('sequence') + 1;
                }
               
            }

            if( $task->componentid()->exists()) {
                $task->componentid()->update([
                    'task_id' => $task->id,
                    'component_id' => $request->component_id,
                    'sequence' =>   $sequence,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                ]);
            }else{
                $task->componentid()->create([
                    'task_id' => $task->id,
                    'component_id' => $request->component_id,
                    'sequence' =>   $sequence,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                ]);
            }
        }

        if($request->has('pattern_id') && $request->pattern_id > 0){
            if($request->has('sequence')){
              $sequence  =  $request->sequence;
            }else{
                if( PatternTaskRelation::where('pattern_id', '=', $request->pattern_id)->where('task_id', '=', $task->id)->count() > 0){
                    $sequence = PatternTaskRelation::where('pattern_id', '=', $request->pattern_id)->where('task_id', '=', $task->id)->first()->sequence;
                }else{
                    $sequence = PatternTaskRelation::where('pattern_id', '=', $request->pattern_id)->max('sequence') + 1;
                }
              
            }

            if( $task->patternid()->exists()) {
                $task->patternid()->update([
                    'task_id' => $task->id,
                    'pattern_id' => $request->pattern_id,
                    'sequence' => $sequence,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                ]);

            }else{
                $task->patternid()->create([
                    'task_id' => $task->id,
                    'pattern_id' => $request->pattern_id,
                    'sequence' => $sequence,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                ]);
            }
        }

        if($request->has('assessmentid') ){
            $task->assessmentid()->delete();
            foreach($request->assessmentid as $_assessment){
                $task->assessmentid()->create([
                    'task_id' => $task->id,
                    'learningoutcome_id' => $_assessment['learningoutcome_id'],
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                ]);
            }    
        }
       
        //resource
        if($request->has('resourceid') ){
            $task->resourceid()->delete();
            foreach($request->resourceid as $_resource){
                $test = new TaskResourceRelation([
                    'resource_id' => $_resource['resource_id'],
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                    ]);
                $task->resourceid()->save($test);
            }
        }

        if($request->has('toolid') ){
            $task->toolid()->delete();
            foreach($request->toolid as $_tool){
                // return response($_assessment['learningoutcome_id'], 200);
                $test = new TaskToolRelation([
                    'elearningtool_id' => $_tool['elearningtool_id'],
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                    ]);
                $task->toolid()->save($test);
            }
        }
        return $task;
    }

    public function getLearningComponentByDesignType($id){
        $data = [
            "1" => [
                [
                    'id' => 1,
                    'title' => 'Identify problem through goal-setting',
                    'tasks' => [],
                    'learningOutcomes' => [
                    ],
                ],
                [
                    'id' => 2,
                    'title' => 'Ideate and design solution through self-planning',
                    'tasks' => [],
                    'learningOutcomes' => [
                    ],
                ],
                [
                    'id' => 3,
                    'title' => 'Construct prototype through self-monitoring',
                    'tasks' => [],
                    'learningOutcomes' => [
                    ],
                ],
                [
                    'id' => 4,
                    'title' => 'Test performance of the product through self-evaluation',
                    'tasks' => [],
                    'learningOutcomes' => [
                    ],
                ],
                [
                    'id' => 5,
                    'title' => 'Optimize the product through revision',
                    'tasks' => [],
                    'learningOutcomes' => [
                    ],
                ],
            ],
            "2" => [
                [
                    'id' => 1,
                    'title' => 'Formulate inquiry questions through goal setting',
                    'tasks' => [],
                    'learningOutcomes' => [
                    ],
                ],
                [
                    'id' => 2,
                    'title' => 'Research and Propose Hypothesis through goal setting',
                    'tasks' => [],
                    'learningOutcomes' => [
                    ],
                ],
                [
                    'id' => 3,
                    'title' => 'Conduct Experiment through self-monitoring',
                    'tasks' => [],
                    'learningOutcomes' => [
                    ],
                ],
                [
                    'id' => 4,
                    'title' => 'Analyse Data and interpret results through self-evaluation and revision',
                    'tasks' => [],
                    'learningOutcomes' => [
                    ],
                ],
            ],
        ];

        return response()->json(
            $data[$id]
        );

    }
}
