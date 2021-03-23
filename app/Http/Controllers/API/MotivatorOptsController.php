<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\MotivatorOpts;
use Auth;

class MotivatorOptsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $motivatorOpts = MotivatorOpts::with(['createdby', 'updatedby'])->orderBy('sequence')->get();

        return $motivatorOpts;
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
        $motivatorOpt = new MotivatorOpts();
        $request['sequence'] = MotivatorOpts::count() + 1;
        $motivatorOpt = $this->save($motivatorOpt, $request);
        
        return response()->json($motivatorOpt);
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
        $motivatorOpt = MotivatorOpts::find($id);

        return $motivatorOpt;
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
        $motivatorOpt = MotivatorOpts::find($id);
        $motivatorOpt = $this->save($motivatorOpt, $request);

        return response()->json($motivatorOpt);
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
        
        $motivatorOpt = MotivatorOpts::find($id);
        $motivatorOpt->delete();

        return response()->json('success');
    }

    private function save(MotivatorOpts $motivatorOpt, Request $request){
        $motivatorOpt->name = $request->name;
        if($request->has('description')){
            $motivatorOpt->description = $request->description;
        }

        if($request->has('sequence')){
            $motivatorOpt->sequence = $request->sequence;
        }

        if(!($motivatorOpt->id > 0)){
            $motivatorOpt->created_at = now();
            $motivatorOpt->created_by = Auth::user()->id;
        }

        $motivatorOpt->updated_at = now();
        $motivatorOpt->updated_by = Auth::user()->id;

        $motivatorOpt->save();
        
        return $motivatorOpt;
    }
}
