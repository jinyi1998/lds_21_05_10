<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\LearningTasktypeOpts;

class TaskTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $tasktypeOpts = LearningTasktypeOpts::with(['createdby', 'updatedby'])->get();

        return response()->json($tasktypeOpts);
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
        $tasktypeOpts = new LearningTasktypeOpts();

        $tasktypeOpts = $this->save($tasktypeOpts, $request);
        return response()->json($tasktypeOpts);
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
        $tasktypeOpts = LearningTasktypeOpts::find($id);
        $tasktypeOpts = $this->save($tasktypeOpts, $request);

        return response()->json($tasktypeOpts);
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

    public function save(LearningTasktypeOpts $tasktypeOpts, Request $request){
        if($request->has('description')){
            $tasktypeOpts->description = $request->description;
        }   
        if($request->has('color')){
            $tasktypeOpts->color = $request->color;
        }

        if(!($tasktypeOpts->id) > 0){
            $tasktypeOpts->created_by = Auth::user()->id;
            $tasktypeOpts->created_at = now();
        }
        $tasktypeOpts->is_deleted = 0;
        $tasktypeOpts->updated_by = Auth::user()->id;
        $tasktypeOpts->updated_at = now();

        $tasktypeOpts->save();

        return $tasktypeOpts;
    }
}
