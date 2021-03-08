<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\PublicSharing;
use App\Course;
use Auth;
use Illuminate\Support\Facades\Hash;

class PublicSharingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $publicSharings = PublicSharing::get();
        // $publicSharings =  csrf_token(); 
        return response()->json($publicSharings);
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
        $publicSharing = new PublicSharing();

        $publicSharing = $this->save($publicSharing, $request);

        return response()->json($publicSharing);

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
        $publicSharing = PublicSharing::find($id);
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
        $publicSharing = PublicSharing::find($id);

        $publicSharing->is_deleted = true;
        $publicSharing->deleted_at = now();

        $publicSharing->save();

        return response()->json('success');
    }

    public function save(PublicSharing $publicSharing, Request $request){
        $publicSharing->course_id = $request->course_id;
        $token =  Hash::make($request->course_id + time());
        $publicSharing->token = str_replace('/', '', $token);

        $publicSharing->created_by = Auth::user()->id;
        $publicSharing->updated_by =  Auth::user()->id;

        $publicSharing->save();

        return $publicSharing;
    }

    public function verify(String $token){
        $publicSharing = PublicSharing::where('token', $token)->where('is_deleted', false)->get();

        if(count($publicSharing)){
            return response()->json([
                "verification" => true,
                "course_id" => $publicSharing[0]['course_id']
            ]);
        }else{
            return response()->json([
                "verification" => false,
                "course_id" => -999
            ]);
        }
      
    }


    public function verifyReturnCourse(String $token){
        $publicSharing = PublicSharing::where('token', $token)->where('is_deleted', false)->get();

        if(count($publicSharing)){
            return response()->json([
                "verification" => true,
                "course" => Course::with(['componentid', 'components', 'outcomes', 'outcomeid', 'lessons', 'lessonid', 'createdby', 'tags'])
                ->find($publicSharing[0]['course_id'])
            ]);
        }else{
            return response()->json([
                "verification" => false,
                "course_id" => -999
            ]);
        }
      
    }

    public function showByCourse($id){
        $publicSharing = PublicSharing::where('course_id', $id)->where('is_deleted', false)->first();
        return response()->json($publicSharing);
    }
}
