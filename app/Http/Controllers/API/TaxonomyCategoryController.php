<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\TaxonomyCategory;

class TaxonomyCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $category = TaxonomyCategory::with(['updatedby', 'createdby'])->orderBy('sequence')->get();

        return response()->json($category);
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
        $category = new TaxonomyCategory();

        $category = $this->save($category, $request);

        return response()->json($category);
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
        $category = TaxonomyCategory::with(['tasktype', 'tasktypeid'])->find($id);

        return response()->json($category);
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
        $category =  TaxonomyCategory::find($id);

        $category = $this->save($category, $request);

        return response()->json($category);
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
        $category = TaxonomyCategory::find($id);

        $category->delete();

        return response()->json($category);
    }
    
    public function save(TaxonomyCategory $category, Request $request){
        $category->name = $request->name;

        if($request->has('description')){
            $category->description = $request->description;
        }

        if($request->has('color')){
            $category->color = $request->color;
        }

        if($request->has('sequence')){
            $category->sequence = $request->sequence;
        }

        if(!($category->id)){
            $category->created_by = Auth::user()->id;
            $category->created_at = now();
        }

        $category->updated_by = Auth::user()->id;
        $category->updated_at = now();

        $category->save();

        return $category;
    }
}
