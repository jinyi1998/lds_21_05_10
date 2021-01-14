<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Lesson;

class LessonAnalysisController extends Controller
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
        // $result = {};
        $lesson = Lesson::with(['tasks'])->find($id);
        
        //init data 
        $task['title'] = $lesson->title;
        $tasks_time_by_task = [];
        $tasks_num_by_type = [];
        $tasks_num_by_class_type = [];
        $tasks_num_by_target = [];
        $tasks_num_by_size = [];

        $lesson_task_with_component = [];

        $temp = DB::table('lesson')
        ->join('lesson_task_relation', 'lesson.id', '=', 'lesson_task_relation.lesson_id')
        ->join('learningtask', 'learningtask.id', '=', 'lesson_task_relation.task_id')
        ->leftJoin('learningtask_assessment', 'learningtask.id', '=', 'learningtask_assessment.learningtask_id')
        ->leftJoin('learningoutcome', 'learningoutcome.id', '=', 'learningtask_assessment.learningoutcome_id')
        ->leftJoin('component_outcome_relational', 'learningoutcome.id', '=', 'component_outcome_relational.outcome_id')
        ->leftJoin('pattern_task_relational', 'learningtask.id', '=', 'pattern_task_relational.task_id')
        ->leftJoin('component_pattern_task_relation', 'pattern_task_relational.pattern_id', '=', 'component_pattern_task_relation.pattern_id')
        ->leftJoin('component_pattern_task_relation as 2', 'learningtask.id', '=', '2.task_id')
        // ->leftJoin('component', 'component.id', '=', 'component_task_relational.component_id')
        ->leftJoin('component', function($join)
        {
            $join->orOn('component.id', '=', 'component_pattern_task_relation.component_id');
            $join->orOn('component.id','=', '2.component_id');
        })
        ->where('lesson.id', '=', $id)
        // ->groupBy('learningoutcome.id', 'learningoutcome.description', 'component.id')
        // ->select(DB::raw('learningoutcome.id as outcome_id, 
        //     learningoutcome.description, 
        //     component.id as component_id,
        //     component.title as component_title,
        //     if( GROUP_CONCAT(DISTINCT learningtask_assessment.learningtask_id) is null, false, true) as has_assessment, 
        //     GROUP_CONCAT(DISTINCT learningtask.id) as learningtask_id,
        //     GROUP_CONCAT(learningtask.title SEPARATOR "||||") as learningtask_title
        // '
        // ))
        ->select('learningtask.id as task_id', 
        'learningtask.title as task_title',
        'learningtask.type as task_type',
        'component.id as component_id', 
        'component.title as component_title',
        'learningoutcome.id as outcome_id',
        'learningoutcome.description as outcome_description')
        ->get();

        $lesson_task_with_component['task'] = [];
        $lesson_task_with_component['component'] = [];
        $lesson_task_with_component['outcome'] = [];

        foreach($temp as $_temp){
            if($_temp->outcome_id > 0){
                $lesson_task_with_component['outcome'][$_temp->outcome_id] = $_temp->outcome_description;
            }       
            if($_temp->task_id > 0){
                if(isset( $lesson_task_with_component['task'][$_temp->task_id])){
                    if($_temp->outcome_id > 0){
                        //prevent null
                        array_push( $lesson_task_with_component['task'][$_temp->task_id]['outcome_id'],  $_temp->outcome_id);
                    }
                }else{
                    $lesson_task_with_component['task'][$_temp->task_id]['task_id'] = $_temp->task_id;
                    $lesson_task_with_component['task'][$_temp->task_id]['task_title'] = $_temp->task_title;
                    $lesson_task_with_component['task'][$_temp->task_id]['component_id'] = $_temp->component_id;
                    $lesson_task_with_component['task'][$_temp->task_id]['task_type'] = $_temp->task_type;
                    $lesson_task_with_component['task'][$_temp->task_id]['outcome_id'] = [];
                    if($_temp->outcome_id > 0){
                        array_push( $lesson_task_with_component['task'][$_temp->task_id]['outcome_id'],  $_temp->outcome_id);
                    }
                  
                }
            }       

            if($_temp->component_id > 0){
                $lesson_task_with_component['component'][$_temp->component_id] = $_temp->component_title;
            }       
        }


        // return response()->json($lesson_assessment_by_component);



        foreach($lesson['tasks'] as $key => $_task){
            $tasks_time_by_task[$_task['title']] = 0;
            $tasks_num_by_type[$_task['type']] = 0;
            $tasks_num_by_class_type[$_task['class_type']] = 0;
            $tasks_num_by_target[$_task['target']] = 0;
            $tasks_num_by_size[$_task['size']] = 0;
        }

        //fill data
        foreach($lesson['tasks'] as $_task){
            $tasks_time_by_task[$_task['title']] += (int)$_task['time'];
            $tasks_num_by_type[$_task['type']] += 1;
            $tasks_num_by_class_type[$_task['class_type']] += 1;
            $tasks_num_by_target[$_task['target']] += 1;
            $tasks_num_by_size[$_task['size']] += 1;
        }

        $result['tasks_time_by_task'] = $tasks_time_by_task;

        $result['tasks_num_by_type'] = $tasks_num_by_type;
        $result['tasks_num_by_class_type'] = $tasks_num_by_class_type;
        $result['tasks_num_by_target'] = $tasks_num_by_target;
        $result['tasks_num_by_size'] = $tasks_num_by_size;
        $result['lesson_task_with_component'] = $lesson_task_with_component;
        
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
