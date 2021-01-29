<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\DesignTypeComponentTemplateRelation;
use Auth;

class DesignTypeComponentTempController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $relation = DesignTypeComponentTemplateRelation::get(); 
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
        $relation = new DesignTypeCompoentTemplateRelation();

        $relation = $this->save($relation, $reuqest);
        
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
        $relation = DesignTypeComponentTemplateRelation::find($id); 
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
        $relation = DesignTypeComponentTemplateRelation::find($id);

        $relation = $this->save($relation, $reuqest);

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
        $relation = DesignTypeComponentTemplateRelation::find($id);
        $relation->delete();

        return response()->json('success');

    }

    public function save(DesignTypeComponentTemplateRelation $relation, Request $request){
        if($request->has('designtype_id')){
            $relation->designtype_id = $request->designtype_id;
        }
        if($request->has('component_id')){
            $relation->component_id = $request->component_id;
        }
        
        if(! ($relation->id > 0)){
            $relation->created_at = now();
            $relation->created_by = Auth::user()->id;
        }
        $relation->updated_at = now();
        $relation->updated_by = Auth::user()->id;

        $relation->save();
    }
}
