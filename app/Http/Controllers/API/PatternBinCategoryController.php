<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\PatternBinCategory;
use Auth;

class PatternBinCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $patternBinCategory = PatternBinCategory::with(['updatedby', 'createdby'])->get();

        return response()->json($patternBinCategory);
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
        $patternBinCategory = new PatternBinCategory();
        $patternBinCategory = $this->save($patternBinCategory, $request);

        return response()->json($patternBinCategory);
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
        $patternBinCategory = PatternBinCategory::with(['patternbin'])->find($id);
        return response()->json($patternBinCategory);
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
        $patternBinCategory = PatternBinCategory::find($id);

        $patternBinCategory = $this->save($patternBinCategory, $request);
        return response()->json($patternBinCategory);
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
        $patternBinCategory = PatternBinCategory::find($id);
        $patternBinCategory->delete();

        return response()->json($patternBinCategory);
    }

    public function save(PatternBinCategory $patternBinCategory, Request $request){
        if($request->has('name')){
            $patternBinCategory->name = $request->name;
        }
        if(!($patternBinCategory->id > 0)){
            $patternBinCategory->created_by = Auth::user()->id;
            $patternBinCategory->created_at = now();
        }
        $patternBinCategory->updated_by = Auth::user()->id;
        $patternBinCategory->updated_at = now();

        $patternBinCategory->save();

        if($request->has('patternbin_id')){
            $patternBinCategory->patternbin_id()->delete();

            foreach($patternbin_id as $_patternbin_id){
                $patternBinCategory->patternbin_id()->create(
                [
                    "patternbin_id" => $_patternbin_id,
                    "patternbin_category_id" => $patternBinCategory->id,
                    "created_by" => Auth::user()->id,
                    "updated_by" => Auth::user()->id,
                ]);
            }
        }
        $patternBinCategory->save();

        return $patternBinCategory;
    }
}
