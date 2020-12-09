<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ElearningtoolOpts;
use Auth;

class ElearningToolController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $elearningToolOpts = ElearningtoolOpts::with(['createdby', 'updatedby'])->get();

        return response()->json($elearningToolOpts);
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
        $elearningToolOpts = new ElearningtoolOpts();

        $elearningToolOpts = $this->save($elearningToolOpts, $request);
        return response()->json($elearningToolOpts);
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
        $elearningToolOpts = ElearningtoolOpts::with(['moodlemodid', 'moodlemod'])->find($id);
        return response()->json($elearningToolOpts);
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
        $elearningToolOpts = ElearningtoolOpts::find($id);

        $elearningToolOpts = $this->save($elearningToolOpts, $request);
        return response()->json($elearningToolOpts);
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

    public function save(ElearningtoolOpts $elearningToolOpts, Request $request){
        if($request->has('description')){
            $elearningToolOpts->description = $request->description;
        }

        if(!($elearningToolOpts->id > 0)){
            $elearningToolOpts->created_by = Auth::user()->id;
            $elearningToolOpts->created_at = now();
        }
        $elearningToolOpts->updated_by = Auth::user()->id;
        $elearningToolOpts->updated_at = now();

        $elearningToolOpts->is_deleted = 0;

        $elearningToolOpts->save();

        if($request->has('moodlemod_id')){
            if( $elearningToolOpts->moodlemodid()->exists()){
                $elearningToolOpts->moodlemodid()->update([
                    'tool_id' => $elearningToolOpts->id,
                    'moodle_mod_id' => $request->moodlemod_id,
                    'updated_by' => Auth::user()->id,
                    'updated_at' => now()
                ]);
            }else{
                $elearningToolOpts->moodlemodid()->create([
                    'tool_id' => $elearningToolOpts->id,
                    'moodle_mod_id' => $request->moodlemod_id,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }


        return $elearningToolOpts;
    }
}
