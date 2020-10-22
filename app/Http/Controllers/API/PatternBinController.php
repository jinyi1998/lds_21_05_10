<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\PatternBin;
use Auth;

class PatternBinController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $patternbins = PatternBin::all();

        return response()->json($patternbins);
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
        $patternbin = new PatternBin();
        $patternbin = $this->save($patternbin, $request);

        return response()->json($patternbin);
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
        $patternbin = PatternBin::with(['patterns'])->find($id);

        return response()->json($patternbin);
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
        $patternbin = PatternBin::find($id);
        $patternbin = $this->save($patternbin, $request);

        return response()->json($patternbin);
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
        $patternbin = PatternBin::find($id);
        $patternbin->patternsid()->delete();
        $patternbin->delete();

    }

    public function save(PatternBin $patternbin, Request $request){

        if($request->has('name')){
            $patternbin->name = $request->name;
        }

        if(!($patternbin->id > 0)){
            $patternbin->created_by = Auth::user()->id;
            $patternbin->created_at = now();
        }
        $patternbin->updated_by = Auth::user()->id;
        $patternbin->updated_at = now();
        $patternbin->is_deleted = false;
        
        $patternbin->save();


        if($request->has('patternbin_category_id')){
            $patternbin->patternbin_categoryid()->delete();
            $patternbin->patternbin_categoryid()->create([
                'patternbin_category_id' => $request->patternbin_category_id,
                'patternbin_id' => $patternbin->id,
                'created_by' => Auth::user()->id,
                'updated_by' => Auth::user()->id,
                'is_deleted' => 0
            ]);
        }
        
        $patternbin->save();

        return $patternbin;
    }

    public function addPatternRelation(Request $request, $id){
        $patternbin = PatternBin::find($id);
        if( $patternbin->patternsid()->where('patternbin_pattern_relation.patternbin_id', $patternbin->id)->where('patternbin_pattern_relation.pattern_id',  $request->pattern_id)->count() ){

        }else{
            $patternbin->patternsid()->create([
                'pattern_id' => $request->pattern_id,
                'patternbin_id' => $patternbin->id,
                'sequence' => $patternbin->patternsid()->count() + 1,
                'created_by' => Auth::user()->id,
                'updated_by' => Auth::user()->id,
                'is_deleted' => 0
            ]);
        }
     
        return response()->json($patternbin);
    }

    public function deletePatternRelation(Request $request, $id){
        $patternbin = PatternBin::find($id);
        $patternbin->patternsid()->where('patternbin_pattern_relation.patternbin_id', $patternbin->id)->where('patternbin_pattern_relation.pattern_id',  $request->pattern_id)->delete();
     
        return response()->json($patternbin);
    }
}
