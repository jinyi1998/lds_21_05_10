<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\FeedbackOpts;
use Auth;

class FeedbackOptsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $feedbackOpts = FeedbackOpts::with(['createdby', 'updatedby'])->orderBy('sequence')->get();

        return $feedbackOpts;

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
        $feedbackOpt = new FeedbackOpts();
        $request['sequence'] = FeedbackOpts::count()+1;
        $feedbackOpt = $this->save($feedbackOpt, $reuqest);

        return response()->json($feedbackOpt);
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
        $feedbackOpt = FeedbackOpts::find($id);

        return $feedbackOpt;
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
        $feedbackOpt = FeedbackOpts::find($id);
        $feedbackOpt = $this->save($feedbackOpt, $request);

        return response()->json($feedbackOpt);
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

        $feedbackOpt = FeedbackOpts::find($id);
        $feedbackOpt->delete();

        return response()->json('success');
    }

    private function save(FeedbackOpts $feedbackOpt, Request $request){
        $feedbackOpt->name = $request->name;
        if($request->has('description')){
            $feedbackOpt->description = $request->description;
        }

        if($request->has('sequence')){
            $feedbackOpt->sequence = $request->sequence;
        }

        if(!($feedbackOpt->id > 0)){
            $feedbackOpt->created_at = now();
            $feedbackOpt->created_by = Auth::user()->id;
        }

        $feedbackOpt->updated_at = now();
        $feedbackOpt->updated_by = Auth::user()->id;

        $feedbackOpt->save();

        return $feedbackOpt;
    }
}
