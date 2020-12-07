<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\LearningPattern;
use App\LearningTask;
use App\PatternTaskRelation;
use App\ComponentPatternRelation;
use App\ComponentPatternTaskRelation;
use Illuminate\Support\Facades\DB;
use Auth;


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
        return response()->json($pattern);
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

        if($request->has('title')){
            $pattern->title = $request->title;
        }

        if($pattern->id > 0){

        }else{
            $pattern->created_by = Auth::user()->id;
            $pattern->created_at = now();
        }

        $pattern->updated_by = Auth::user()->id;
        $pattern->is_deleted = 0;
        $pattern->updated_at = now();
        $pattern->save();

        //tasks
        if($request->has('tasks')){
            $pattern->tasks()->delete();
            // foreach($pattern->tasks as $_task){
            //     $task = LearningTask::find($_task->id);
            //     $task->delete();
            // }
            foreach($request->tasks as $key => $_task){
                // $_task['sequence'] = $key + 1;
                unset($_task['assessmentid']); //avoid adding assessment
                $request_task = new \Illuminate\Http\Request($_task);
                $task = LearningTaskController::save(new LearningTask, $request_task);

    
                // return response()->json($task);
                $taskRelation = new PatternTaskRelation([
                    'pattern_id' => $pattern->id,
                    'sequence' =>  $key + 1,
                    'task_id' => $task->id,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                ]);
                $pattern->tasksid()->save($taskRelation);
            }
        }

        if($request->has('component_id')){
            if($pattern->componentid()->exists()){
                if($request->has('sequence')){
                    $pattern->componentid()->update([
                        'sequence'=> $request->sequence,
                        'updated_by' => Auth::user()->id,
                        'updated_at' => now()
                    ]);
                }
            }else{
                $sequence = ComponentPatternTaskRelation::where('component_id', $request->component_id)->max('sequence');
                $pattern->componentid()->create([
                    'pattern_id' => $pattern->id,
                    'component_id' => $request->component_id,
                    'sequence'=> $sequence + 1,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                ]);
            }
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
        $pattern->delete();
        return response()->json("success");
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
            // $_task['sequence'] = $_task->patternid->sequence;
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
