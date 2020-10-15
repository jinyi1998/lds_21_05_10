<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\LearningPatternTemplate;
use Auth;

class LearningPatternTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $patterns = LearningPatternTemplate::with(['componentsid', 'updatedby', 'createdby'])->get();
        return response()->json($patterns);
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
        $pattern = new LearningPatternTemplate();
        $pattern = LearningPatternTemplateController::save( $pattern, $request);
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
        $pattern = LearningPatternTemplate::with('tasks')->find($id);
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
        $pattern = LearningPatternTemplate::find($id);
        $pattern = $this->save( $pattern, $request);
        return response()->json($pattern);
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
        $task = LearningPatternTemplate::find($id);
        $task->componentsid()->delete();
        $task->tasksid()->delete();
        $task->delete();
        return response()->json("");
    }

    public static function save(LearningPatternTemplate $pattern, Request $request){

        $pattern->title = $request->title;
        $pattern->created_by = Auth::user()->id;
        $pattern->updated_by = Auth::user()->id;
        $pattern->is_deleted = 0;
        if(!($pattern->id > 0)){
            $pattern->created_at = now();
        }
        $pattern->updated_at = now();
        $pattern->save();

        if($request->has('component_id')){
            $pattern->componentsid()->delete();
            $pattern->componentsid()->create([
                'pattern_id' => $pattern->id,
                'component_id' => $request->component_id,
                'created_by' => Auth::user()->id,
                'updated_by' => Auth::user()->id,
                'is_deleted' => 0
            ]);
        }

        if($request->has('tasks')){
            foreach( $request->tasks as $_task){
                $request_task = new \Illuminate\Http\Request($_task);
                $task = LearningTaskTemplateController::save(new \App\LearningTaskTemplate(), $request_task);
                $pattern->tasksid()->create([
                    'pattern_id' => $pattern->id,
                    'task_id' => $task->id,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                ]);
            }
        }

        return $pattern;
    }
}
