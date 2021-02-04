<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App;

class AppOptsController extends Controller
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
            "elearningtoolOpts" => $this->getElearningTool(),
            "bloomLvlOpts" => $this->getBloomLevel(),
            "outcomeTypeOpts" => $this->getOutcomeType(),
            "STEMTypeOpts" => $this->getSTEMType(),
            "designType" => $this->getDesignType(),
            "taxonomyCategory" => $this->getTaxonomyCategory()
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
        return App\LearningTasktypeOpts::where('is_deleted', 0)->orderBy('sequence')->with(['categoryid'])->get();
    }

    public function getTaxonomyCategory(){
        return App\TaxonomyCategory::where('is_deleted', 0)->orderBy('sequence')->get();
    }

    public function getClassType(){
        return App\ClassTypeOpts::where('is_deleted', 0)->get();
    }

    public function getClassTarget(){
        return App\ClassTargetOpts::where('is_deleted', 0)->get();
    }

    public function getClassSize(){
        return App\ClassSizeOpts::where('is_deleted', 0)->get();
    }

    public function getResource(){
        return App\ResourceOpts::where('is_deleted', 0)->get();
    }

    public function getElearningTool(){
        return App\ElearningtoolOpts::where('is_deleted', 0)->get();
    }

    public function getBloomLevel(){
        return App\BloomTaxonomyLevel::where('is_deleted', 0)->with(['verbs'])->get();
    }

    public function getOutcomeType(){
        return App\OutcomeType::where('is_deleted', 0)->orderBy('sequence')->get();
    }

    public function getSTEMType(){
        return App\STEMType::where('is_deleted', 0)->get();
    }

    public function getDesignType(){
        return App\DesignType::with(['updatedby', 'createdby'])->get();
    }
}
