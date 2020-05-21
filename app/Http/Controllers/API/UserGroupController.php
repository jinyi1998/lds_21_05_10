<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Usergroup;

class UserGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $usergroup = Usergroup::all();
        return \response()->json($usergroup);
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
        $usergroup = Usergroup::find($id);
        $usergroup = UserGroupController::save($usergroup, $request);
        return response()->json($usergroup);
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
        $usergroup = Usergroup::find($id);
        return \response()->json($usergroup);
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
        $usergroup = Usergroup::find($id);
        $usergroup = UserGroupController::save($usergroup, $request);
        return response()->json($usergroup);
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

    public static function save (Usergroup $usergroup, Request $request){
        if($request->has('name')){
            $usergroup->name = $request->name;
        }
        if($request->has('description')){
            $usergroup->description = $request->description;
        }

        if($request->has('type')){
            $usergroup->type = $request->type;
        }

        if($request->has('created_at')){
            $usergroup->created_at = now();
        }

        if($request->has('created_by')){
            $usergroup->created_by =$request->created_by;
        }else{
            $usergroup->created_by =1;
        }

        if($request->has('updated_by')){
            $usergroup->updated_by = $request->updated_by;
        }else{
            $usergroup->updated_by = 1;
        }

        if($request->has('users')){
            foreach((array)$request->users as $_user){
                $usergroup->userid()->updateOrCreate([
                    'usergroup_id' => $_user->usergroup_id,
                    'user_id' => $_user->user_id,
                    'updated_at' => now(),
                    'created_by' => 1,
                    'updated_by' => 1,
                    'is_deleted' => 0
                ]);
            }
        }
        $usergroup->updated_at = now();
        $usergroup->save();

        return $usergroup;
    }
}
