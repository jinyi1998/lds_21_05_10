<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\MoodleMod;
use Auth;

class MoodleModController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $moodleMod = MoodleMod::with(['createdby', 'updatedby'])->get();
        return response()->json($moodleMod);
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
        $moodleMod = new MoodleMod();
        $moodleMod = $this->save($moodleMod, $request);

        return response()->json($moodleMod);

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
        $moodleMod = MoodleMod::find($id);
        return response()->json($moodleMod);
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
        $moodleMod = MoodleMod::find($id);
        $moodleMod = $this->save($moodleMod, $request);

        return response()->json($moodleMod);
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
        $moodleMod = MoodleMod::find($id);
        $moodleMod->delete();

        return response()->json('success');
    }

    public function save(MoodleMod $moodleMod, Request $request){
        if($request->has('name')){
            $moodleMod->name = $request->name;
        }
        if($request->has('name_moodle')){
            $moodleMod->name_moodle = $request->name_moodle;
        }

        if($moodleMod->id > 0){

        }else{
            $moodleMod->created_by = Auth::user()->id;
            $moodleMod->created_at = now();
        }

        $moodleMod->updated_by = Auth::user()->id;
        $moodleMod->updated_at = now();

        $moodleMod->save();

        return $moodleMod;
    }
}
