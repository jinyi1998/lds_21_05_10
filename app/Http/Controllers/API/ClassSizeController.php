<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ClassSizeOpts;
use Auth;

class ClassSizeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return ClassSizeOpts::with(['createdby', 'updatedby'])->orderBy('sequence')->get();
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
        $classSizeOpts = new ClassSizeOpts();
        $request['sequence'] = ClassSizeOpts::count() + 1;
        $classSizeOpts = $this->save( $classSizeOpts, $request);

        return response()->json($classSizeOpts);
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
        return ClassSizeOpts::find($id);
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
        $classSizeOpts = ClassSizeOpts::find($id);
        $classSizeOpts = $this->save( $classSizeOpts, $request);

        return response()->json($classSizeOpts);
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
        $classSizeOpts = ClassSizeOpts::find($id);
        try{
            $classSizeOpts->delete();
            return response()->json();
        }catch(Expectation $error){
            return response()->json($error);
        }
    }

    public function save(ClassSizeOpts $classSizeOpts, Request $request){
        if($request->has('description')){
            $classSizeOpts->description = $request->description;
        }

        if($request->has('sequence')){
            $classSizeOpts->sequence = $request->sequence;
        }

        if(!($classSizeOpts->id > 0)){
            $classSizeOpts->created_by = Auth::user()->id;
            $classSizeOpts->created_at = now();
        }

        $classSizeOpts->updated_by = Auth::user()->id;
        $classSizeOpts->updated_at = now();
        $classSizeOpts->is_deleted = 0;

        $classSizeOpts->save();

        return $classSizeOpts;
    }
}
