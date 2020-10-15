<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ClassTypeOpts;
use Auth;

class ClassTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $classTypeOpts = ClassTypeOpts::with(['createdby', 'updatedby'])->get();

        return response()->json($classTypeOpts);
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
        $classTypeOpts = new ClassTypeOpts();

        $classTypeOpts = $this->save($classTypeOpts, $request);
        return response()->json($classTypeOpts);
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
        $classTypeOpts = ClassTypeOpts::find($id);

        $classTypeOpts = $this->save($classTypeOpts, $request);
        return response()->json($classTypeOpts);
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

    public function save(ClassTypeOpts $classTypeOpts, Request $request){
        if($request->has('description')){
            $classTypeOpts->description = $request->description;
        }

        if(!($classTypeOpts->id > 0)){
            $classTypeOpts->created_by = Auth::user()->id;
            $classTypeOpts->created_at = now();
        }

        $classTypeOpts->is_deleted = 0;
        $classTypeOpts->updated_by = Auth::user()->id;
        $classTypeOpts->updated_at = now();

        $classTypeOpts->save();

        return response()->json($classTypeOpts);
    }
}
