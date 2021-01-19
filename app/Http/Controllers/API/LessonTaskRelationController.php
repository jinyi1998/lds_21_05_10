<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\LessonTaskRelation;

class LessonTaskRelationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $relation = LessonTaskRelation::All();
        return response()->json($relation);
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
        $relation = new LessonTaskRelation;
        $relation = LessonTaskRelationController::save($relation, $request);

        return response()->json($relation);
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
        $relation = LessonTaskRelation::find($id);
        return response()->json($relation);
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
        $relation = LessonTaskRelation::find($id);
        $relation = LessonTaskRelationController::save($relation, $request);
        return response()->json($relation);
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

    public static function save(LessonTaskRelation $relation, Request $request){
        if($request->has('lesson_id')){
            $relation->lesson_id = $request->lesson_id;
        }
        if($request->has('task_id')){
            $relation->task_id = $request->task_id;
        }
        if($request->has('sequence')){
            $relation->sequence = $request->sequence;
        }

        if($request->has('starttime')){
            $relation->starttime = $request->starttime;
        }

        if($request->has('lessontype')){
            $relation->lessontype = $request->lessontype;
        }


        if(!($relation->created_by > 0)){
            $relation->created_by = Auth::user()->id;
        }
        $relation->updated_by = Auth::user()->id;
        $relation->updated_at = now();
      
        $relation->is_deleted = false;
        $relation->save();

        return $relation;
    }
}
