<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Lesson;
use App\LessonCoureseRelation;
use App\LessonTaskRelation;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $lesson = Lesson::All();
        return response()->json($lesson);

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
        $lesson = new Lesson();
        $lesson = LessonController::save($lesson, $request); 

        return response()->json($lesson);
     
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
        $lesson = Lesson::with(['tasks', 'tasksid', 'courseid'])->find($id);
        return response()->json($lesson);
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
        $lesson = Lesson::find($id);
        $lesson = LessonController::save($lesson, $request);
        return response()->json($lesson);

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

    public static function save(Lesson $lesson, Request $request){

        if($request->has('title')){
            $lesson->title = $request->title;
        }

        if($request->has('sequence')){
            $lesson->sequence = $request->sequence;
        }

        if($request->has('time')){
            $lesson->time = $request->time;
        }

        $lesson->is_deleted = 0;
        $lesson->created_by = 1;
        $lesson->updated_by = 1;
        $lesson->save();
        
        if($request->has('tasks_id')){
            $lesson->tasksid()->delete();

            foreach($request->tasks_id as $_task){
                $lesson->tasksid()->create([
                    'task_id' => $_task["task_id"],
                    'lesson_id' => $lesson->id,
                    'created_by' => 1,
                    'updated_by' => 1,
                    'is_deleted' => 0
                ]);
            }
            $time = 0;
            foreach($lesson->tasks as $_task){
                $time += $_task->time;
            }
            $lesson->time = $time;
        }

        if($request->has('course_id')){
            $lesson->courseid()->delete();
            $lesson->courseid()->create([
                'course_id' => $request->course_id,
                'lesson_id' => $lesson->id,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => 0
            ]);
        }
        $lesson->save();

        return $lesson;
    }
}
