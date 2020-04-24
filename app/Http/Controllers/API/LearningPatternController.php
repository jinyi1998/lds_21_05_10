<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\LearningPattern;
use App\LearningTask;
use App\PatternTaskRelation;
use App\ComponentPatternRelation;


class LearningPatternController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $pattern = LearningPattern::All();
        return $response()->json($pattern);
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
        $pattern = new LearningPattern;
        $pattern = LearningPatternController::save($pattern, $request);
        return response("success");
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
        $pattern = LearningPattern::with(['tasks', 'componentid'])->find($id);
        return response()->json($pattern);
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
        $pattern = LearningPattern::find($id);
        $pattern = LearningPatternController::save($pattern, $request);
        return response()->json($pattern);
    }

    public static function save(LearningPattern $pattern, Request $request){

        $pattern->title = $request->title;
        $pattern->created_by = 1;
        $pattern->updated_by = 1;
        $pattern->is_deleted = 0;
        $pattern->created_at = now();
        $pattern->updated_at = now();
        $pattern->save();
        //  return response()->json($pattern);
        //tasks
        if($request->has('tasks')){
            $pattern->tasks()->delete();
            // foreach($pattern->tasks as $_task){
            //     $task = LearningTask::find($_task->id);
            //     $task->delete();
            // }
            foreach($request->tasks as $key => $_task){
                $_task['sequence'] = $key + 1;
                $request_task = new \Illuminate\Http\Request($_task);
                $task = LearningTaskController::save(new LearningTask,$request_task);
                // $task = $pattern->tasks()->updateOrCreate([
                //     'title' => $_task['title'],
                //     'time' => $_task['time'],
                //     'type' => $_task['type'],
                //     'class_type' => $_task['class_type'],
                //     'target' => $_task['target'],
                //     'size' => $_task['size'],
                //     'description' => $_task['description'],
                //     'toolid' => $_task['toolid'],
                //     'learningtask.created_by' => 1,
                //     'learningtask.updated_by' => 1,
                //     'learningtask.is_deleted' => 0
                // ]);
    
                // return response()->json($task);
                $taskRelation = new PatternTaskRelation([
                    'pattern_id' => $pattern->id,
                    'task_id' => $task->id,
                    'created_by' => 1,
                    'updated_by' => 1,
                    'is_deleted' => 0
                ]);
                $pattern->tasksid()->save($taskRelation);
            }
        }

        if($request->has('component_id')){
            $pattern->componentid()->create([
                'pattern_id' => $pattern->id,
                'component_id' => $request->component_id,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => 0
            ]);
        }
        $pattern->save();
        return $pattern;
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
        $pattern = LearningPattern::find($id);
        $pattern->is_deleted = 1;
        $pattern->save();
        return response()->json("");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function unlockPattern($id)
    {
        //
        $pattern = LearningPattern::find($id);
        //add tasks to tasks
        foreach( $pattern->tasks as $_task){
            $_task['component_id'] = $pattern->componentid->component_id;
            $request = new \Illuminate\Http\Request();
            $request->merge($_task->toArray());
            LearningTaskController::save(new LearningTask(), $request);
        }
        //delete all the pattern_task relation first
        $pattern->tasks()->delete();
        // $pattern->tasksid()->delete();
        $pattern->componentid()->delete();
        $pattern->delete();
        return response()->json("");
    }
}
