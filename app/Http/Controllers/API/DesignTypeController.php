<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\DesignType;
use Auth;
use Intervention\Image\Facades\Image as Image;
use Illuminate\Support\Facades\Storage;

class DesignTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $designTypes = DesignType::with(['updatedby', 'createdby'])->get();
        return response()->json($designTypes);
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
        $designType = new DesignType();
        $designType = $this->save($designType, $request);

        return response()->json($designType);
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
        $designType = DesignType::with(['components','componentsid', 'outcomes',])->find($id);
        return response()->json($designType);
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
        $designType = DesignType::find($id);
        $designType = $this->save($designType, $request);

        return response()->json($designType);
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
        $designType = DesignType::find($id);
        $designType->delete();

        return response()->json();
    }

    public function getLearningComponentByDesignType($id){

        $designType = DesignType::with(['components'])->find($id);

        return response()->json(
            $designType['components']
        );
    }

    public function getDesignTypeInstruction($id){

        $designType = DesignType::with(['instructions'])->find($id);

        return response()->json(
            $designType['instructions']
        );
    }

    public function save(DesignType $designType, Request $request){
        if($request->has('name')){
            $designType->name = $request->name;
        }
        if($request->has('description')){
            $designType->description = $request->description;
        }
        if($request->has('media')){
            $designType->media = $request->media;
        }
        if($request->has('hint')){
            $designType->hint = $request->hint;
        }
        if($request->has('is_deleted')){
            $designType->is_deleted = $request->is_deleted;
        }

        if($designType->id > 0){

        }else{
            $designType->created_by = Auth::user()->id;
            $designType->created_at = now();
        }

        $designType->updated_by = Auth::user()->id;
        $designType->updated_at = now();

        $designType->save();

        return $designType;
    }

    public function uploadImg(Request $request){
        $data = $request->all();
        $png_url = "designtype_".time().".png";
        $path =  public_path().'/asset'.'/image'.'/design_type_logo';

        if(!file_exists($path)){
            mkdir($path);
        }
    
        $image = Image::make(file_get_contents($data[0]))->save($path.'/'.$png_url);     
        $image->destroy();
        $response = array(
            'status' => 'success',
            'path' => '/asset'.'/image'.'/design_type_logo'. '/'.$png_url,
        );
        return response()->json($response);
    }
}
