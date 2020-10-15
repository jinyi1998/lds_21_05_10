<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\ResourceOpts;

class ResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $resourceOpts = ResourceOpts::with(['createdby', 'updatedby'])->get();
        return response()->json($resourceOpts);
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
        $resourceOpts = new ResourceOpts();
        $resourceOpts = $this->save($resourceOpts, $request);
        return response()->json($resourceOpts);
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
        $resourceOpts = ResourceOpts::find($id);
        $resourceOpts = $this->save($resourceOpts, $request);

        return response()->json($resourceOpts);
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

    public function save(ResourceOpts $resourceOpts, Request $request){

        if($request->has('description')){
            $resourceOpts->description = $request->description;
        }

        if(!($resourceOpts->id > 0)){
            $resourceOpts->created_by = Auth::user()->id;
            $resourceOpts->created_at = now();
        }

        $resourceOpts->updated_by = Auth::user()->id;
        $resourceOpts->updated_at = now();
        $resourceOpts->is_deleted = 0;

        $resourceOpts->save();

        return $resourceOpts;
    }
}
