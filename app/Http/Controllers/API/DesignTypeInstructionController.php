<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\DesigntypeInstruction;

class DesignTypeInstructionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $instruction = new DesigntypeInstruction();
        $instruction = $this->save($instruction, $request);

        return response()->json($instruction);
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
        $instruction = DesigntypeInstruction::find($id);
        return response()->json($instruction);
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
        $instruction = DesigntypeInstruction::find($id);
        $instruction = $this->save($instruction, $id);

        return response()->json($instruction);
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
        $instruction = DesigntypeInstruction::find($id);
        return response()->json('success');
    }

    public function save(DesigntypeInstruction $instruction, Request $request){
        if($request->has('title')){
            $instruction->title = $request->title;
        }

        if($request->has('description')){
            $instruction->description = $request->description;
        }

        if($request->has('media')){
            $instruction->media = $request->media;
        }

        if($instruction->id > 0){

        }else{
            //
            $instruction->created_by = Auth::user()->id;
            $instruction->created_at = now();
        }

        $instruction->updated_by = Auth::user()->id;
        $instruction->updated_at = now();

        $instruction->is_deleted = 0;

        $instruction->save();

        if($request->has('designtype_id')){
            
        }
    }

    public function uploadImg(Request $request){
        $data = $request->all();
        $png_url = "designtype_instruction_".time().".png";
        $path =  public_path().'/asset'.'/image'.'/designtype_instruction';
        if(!file_exists($path)){
            mkdir($path);
        }
    
        $image = Image::make(file_get_contents($data[0]))->save($path. '/'.$png_url);     
        $image->destroy();
        $response = array(
            'status' => 'success',
            'path' => '/asset'.'/image'.'/designtype_instruction'. '/'.$png_url,
        );
        return response()->json($response);
    }
}
