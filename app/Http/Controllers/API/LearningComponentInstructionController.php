<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ComponentInstruction;
use Auth;
use Intervention\Image\Facades\Image as Image;

class LearningComponentInstructionController extends Controller
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
        $instruction = new ComponentInstruction();
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
        $instruction = ComponentInstruction::with(['componentid'])->find($id);
        return $instruction;
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
        $instruction = ComponentInstruction::find($id);
        $instruction = $this->save($instruction, $request);

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
    }

    public function save (ComponentInstruction $instruction, Request $request){
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
            $instruction->created_by = Auth::user()->id;
            $instruction->created_at = now();
        }
        $instruction->is_deleted = 0;
        $instruction->updated_by = Auth::user()->id;
        $instruction->updated_at = now();

        $instruction->save();

        if($request->has('component_id')){
            $instruction->componentid()->delete();
            $instruction->componentid()->create([
                'component_id' => $request->component_id,
                'component_instruction_id' => $instruction->id,
                'created_by' => Auth::user()->id,
                'updated_by' => Auth::user()->id,
                'is_deleted' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        $instruction->save();


        return $instruction;
    }

    public function uploadImg(Request $request){
        $data = $request->all();
        $png_url = "component_instruction_".time().".png";
        $path =  public_path().'/asset'.'/image'.'/component_instruction'. '/'.$png_url;
    
        $image = Image::make(file_get_contents($data[0]))->save($path);     
        $image->destroy();
        $response = array(
            'status' => 'success',
            'path' => '/asset'.'/image'.'/component_instruction'. '/'.$png_url,
        );
        return response()->json($response);
    }
}
