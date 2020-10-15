<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ClassTargetOpts;
use Auth;

class ClassTargetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $classTargetOpts = ClassTargetOpts::with(['createdby', 'updatedby'])->get();

        return $classTargetOpts;
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
        $classTargetOpts = new ClassTargetOpts();
        $classTargetOpts = $this->save($classTargetOpts, $request);

        return response()->json($classTargetOpts);
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
        $classTargetOpts = ClassTargetOpts::find($id);
        $classTargetOpts = $this->save($classTargetOpts, $request);

        return response()->json($classTargetOpts);
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

    public function save(ClassTargetOpts $classTargetOpts, Request $request){
        if($request->has('description')){
            $classTargetOpts->description = $request->description;
        }

        if(!($classTargetOpts->id > 0)){
            $classTargetOpts->created_by = Auth::user()->id;
            $classTargetOpts->created_at = now();
        }

        $classTargetOpts->is_deleted = 0;
        $classTargetOpts->updated_by = Auth::user()->id;
        $classTargetOpts->updated_at = now();

        $classTargetOpts->save();

        return $classTargetOpts;
    }
}
