<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\TaxonomyCategoryTasktypeRelation;

class TaxonomyCategoryTaskTypeRelationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $relation = TaxonomyCategoryTasktypeRelation::get();

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
        $relation = new TaxonomyCategoryTasktypeRelation();

        $relation = $this->save($relation, $request);

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
        $relation = TaxonomyCategoryTasktypeRelation::find($id);

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
        $relation = TaxonomyCategoryTasktypeRelation::find($id);

        $relation = $this->save($relation, $request);

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
        $relation = TaxonomyCategoryTasktypeRelation::find($id);

        $relation->delete();

        return response("success");
    }

    public function save(TaxonomyCategoryTasktypeRelation $relation, Request $request){
        $relation->task_type_id = $request->task_type_id;
        $relation->taxonomy_category_id = $request->taxonomy_category_id;

        if(! ($relation->id > 0) ){ 
            $relation->created_by = Auth::user()->id;
            $relation->created_at = now();
        }
        $relation->updated_by = Auth::user()->id;
        $relation->updated_at = now();

        $relation->save();

        return $relation;
    }
}
