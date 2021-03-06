<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Component;

class LearningComponentAnalysisController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $component = Component::find($id);

        $pattern_task = DB::table('learningtask')
            ->join('pattern_task_relational', 'pattern_task_relational.task_id', '=', 'learningtask.id')
            ->join('component_pattern_task_relation', 'pattern_task_relational.pattern_id', '=', 'component_pattern_task_relation.pattern_id')
            ->leftJoin('lesson_task_relation', 'lesson_task_relation.task_id', '=', 'learningtask.id')
            ->leftJoin('lesson', 'lesson_task_relation.lesson_id', '=', 'lesson.id')
            ->where('component_pattern_task_relation.component_id', '=', $id)
            ->select('learningtask.title as task_title', 
            'learningtask.time as task_time', 
            'learningtask.type as task_type', 
            'learningtask.target as target',
            'learningtask.id as task_id', 
            'lesson.title as lesson_title', 
            'lesson.id as lesson_id', 
            'lesson.sequence as sequence',
            'component_pattern_task_relation.sequence as task_sequence',
            'pattern_task_relational.sequence as pattern_task_sequence'
         );
        
        $component_task = DB::table('learningtask')
        ->join('component_pattern_task_relation', 'component_pattern_task_relation.task_id', '=', 'learningtask.id')
        ->leftJoin('lesson_task_relation', 'lesson_task_relation.task_id', '=', 'learningtask.id')
        ->leftJoin('lesson', 'lesson_task_relation.lesson_id', '=', 'lesson.id')
        ->where('component_pattern_task_relation.component_id', '=', $id)
        ->select('learningtask.title as task_title', 
        'learningtask.time as task_time', 
        'learningtask.type as task_type', 
        'learningtask.target as target',
        'learningtask.id as task_id', 
        'lesson.title as lesson_title', 
        'lesson.id as lesson_id', 
        'lesson.sequence as sequence',
        'component_pattern_task_relation.sequence as task_sequence',
        'component_pattern_task_relation.sequence as pattern_task_sequence'
        )
        ->union($pattern_task)
        ->orderBy('sequence')
        ->orderBy('task_sequence')
        ->orderBy('pattern_task_sequence')
        ->get();

        // return response()->json($component_task);

        $tasks_by_lesson = [];
        $tasks_by_lesson['lesson'] = [];
        foreach($component_task as $_task){
            if(!isset(  $tasks_by_lesson['lesson'][$_task->lesson_id]) && $_task->lesson_id > 0){
                $tasks_by_lesson['lesson'][$_task->lesson_id] = $_task->lesson_title;
            }  
            $tasks_by_lesson['task'][$_task->task_id]['task_title'] = $_task->task_title;
            $tasks_by_lesson['task'][$_task->task_id]['task_time'] = $_task->task_time;
            $tasks_by_lesson['task'][$_task->task_id]['task_type'] = $_task->task_type;
            $tasks_by_lesson['task'][$_task->task_id]['lesson_id'] = $_task->lesson_id;
        }

        $task_assessment = [];
        $task_assessment_temp = DB::table('learningoutcome')
            ->join('component_outcome_relational', 'learningoutcome.id', '=', 'component_outcome_relational.outcome_id')
            ->leftJoin('learningtask_assessment', 'learningoutcome.id', '=', 'learningtask_assessment.learningoutcome_id')
            ->leftJoin('learningtask', 'learningtask.id', '=', 'learningtask_assessment.learningtask_id')
            ->where('component_outcome_relational.component_id', '=', $id)
            ->groupBy('learningoutcome.id', 'learningoutcome.description')
            ->select(DB::raw('learningoutcome.id, 
            learningoutcome.description, 
            if( GROUP_CONCAT(DISTINCT learningtask_assessment.learningtask_id) is null, false, true) as has_assessment, 
            GROUP_CONCAT(DISTINCT learningtask_assessment.learningtask_id) as learningtask_id,
            GROUP_CONCAT(learningtask.title) as learningtask_title,
            GROUP_CONCAT(learningtask.type) as learningtask_type
            '
            ))
            // ->select(DB::raw('distinct learningoutcome.*, if(learningtask_assessment.learningtask_id is null, 0, learningtask_assessment.learningtask_id) as learningtask_id'))
            ->get();

        foreach( $task_assessment_temp as $index => $_task_assessment){
            $check = false;
            $taskid_arr = explode(',', $_task_assessment->learningtask_id);
            $task_concat = "";

            foreach( $taskid_arr as $index => $_taskid_arr){
                $checkcheck = false;
                foreach($component_task as $_component_task){
                    if($_component_task->task_id == $_taskid_arr){
                        $checkcheck = true;
                    }else{
                    }
                }
                if(!$checkcheck){
                    unset($taskid_arr[$index]);
                }
            }
            $task_concat = implode(",",$taskid_arr);
           
            $_task_assessment->learningtask_id = $task_concat;
            if($check){
                // unset($task_assessment[$index]);
            }else{
                array_push($task_assessment, $_task_assessment);
            }
        }
        
        //
        $tasks_time_by_type = [];
        $tasks_num_by_type = [];

        $tasks_time_by_task = [];

        $tasks_num_by_classtarget = [];

        if(isset($component['patterns'])){
            foreach($component['patterns'] as $_pattern){
                foreach($_pattern['tasks'] as $task){
                    if(!isset( $tasks_time_by_type[$task->type])){
                        $tasks_time_by_type[$task->type] = 0;
                        $tasks_num_by_type[$task->type] = 0;
                       
                    }
                    
                    if(!isset( $tasks_time_by_task[$task->title])){
                        $tasks_time_by_task[$task->title] = 0;
                    }
    
                    if(!isset( $tasks_num_by_classtarget[$task->target])){
                        $tasks_num_by_classtarget[$task->target] = 0;
                    }
    
                    $tasks_time_by_type[$task->type] +=  $task->time;
                    $tasks_num_by_type[$task->type] +=  1;
    
                    $tasks_time_by_task[$task->title] += $task->time;
    
                    $tasks_num_by_classtarget[$task->target] += 1;
                 }
            }
        }

        if(isset($component['tasks'])){
            
            foreach($component['tasks'] as $task){
                if(!isset( $tasks_time_by_type[$task->type])){
                    $tasks_time_by_type[$task->type] = 0;
                    $tasks_num_by_type[$task->type] = 0;
                }
                if(!isset( $tasks_time_by_task[$task->title])){
                    $tasks_time_by_task[$task->title] = 0;
                }
                if(!isset( $tasks_num_by_classtarget[$task->target])){
                    $tasks_num_by_classtarget[$task->target] = 0;
                }


                $tasks_time_by_type[$task->type] +=  $task->time;
                $tasks_num_by_type[$task->type] +=  1;

                $tasks_time_by_task[$task->title] += $task->time;

                $tasks_num_by_classtarget[$task->target] += 1;
            }
        }

        $result['task_assessment'] = $task_assessment;
        $result['tasks_time_by_type'] = $tasks_time_by_type;
        $result['tasks_num_by_type'] = $tasks_num_by_type;
        $result['tasks_time_by_task'] = $tasks_time_by_task;
        $result['tasks_num_by_classtarget'] = $tasks_num_by_classtarget;

        $result['tasks_by_lesson'] = $tasks_by_lesson;


        return response()->json($result);
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
    }
}
