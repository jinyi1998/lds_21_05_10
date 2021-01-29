<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App;


class LearningTaskOptsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $data = [
            "learningTasktypeOpts" => $this->getLearningTaskType(),
            "classTypeOpts" => $this->getClassType(),
            "classTargetOpts" => $this->getClassTarget(),
            "classSizeOpts" => $this->getClassSize(),
            "resourceOpts" => $this->getResource(),
            "elearningtoolOpts" => $this->getElearningTool()
        ];
        return response()->json($data);
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

    public function getLearningTaskType(){
        // return DB::table('learningTasktypeOpts')->where('is_deleted', 0)->get();
        return App\LearningTasktypeOpts::where('is_deleted', 0)->orderBy('sequence')->get();
    }

    public function getClassType(){
        // return DB::table('classTargetOpts')->where('is_deleted', 0)->get();
        // return App\ClassTargetOpts::where('is_deleted', 0)->get();
        return App\ClassTypeOpts::where('is_deleted', 0)->get();
    }

    public function getClassTarget(){
        // return DB::table('classTypeOpts')->where('is_deleted', 0)->get();
        // return App\ClassTypeOpts::where('is_deleted', 0)->get();
        return App\ClassTargetOpts::where('is_deleted', 0)->get();
    }

    public function getClassSize(){
        // return DB::table('classSizeOpts')->where('is_deleted', 0)->get();
        return App\ClassSizeOpts::where('is_deleted', 0)->get();
    }

    public function getResource(){
        // return DB::table('resourceOpts')->where('is_deleted', 0)->get();
        return App\ResourceOpts::where('is_deleted', 0)->get();
    }

    public function getElearningTool(){
        // return DB::table('elearningtoolOpts')->where('is_deleted', 0)->get();
        return App\ElearningtoolOpts::where('is_deleted', 0)->get();
    }
}
