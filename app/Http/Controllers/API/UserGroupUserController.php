<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Usergroup;
use App\UsergroupUserRelation;
use App\UsergroupUserTempRelation;

class UserGroupUserController extends Controller
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
        $usergroup = Usergroup::find($request->usergroup_id);
        if($usergroup->type == 1){
            // join the group directly if it is a public group
            $usergroupUserRelation = UsergroupUserRelation::updateOrCreate(
                [
                    "user_id" => $request->user_id,
                    "usergroup_id" => $request->usergroup_id,
                    "permission" => 2,
                    "is_deleted" => 0,
                    "created_by" => $request->user_id,
                    "updated_by" => $request->user_id,
                ]
            );
            return response()->json($usergroupUserRelation);
        }else{
            $usergroupUserTempRelation = UsergroupUserTempRelation::updateOrCreate(
                [
                    "user_id" => $request->user_id,
                    "usergroup_id" => $request->usergroup_id,
                    "permission" => 2,
                    "is_deleted" => 0,
                    "created_by" => $request->user_id,
                    "updated_by" => $request->user_id,
                ]
            );
            return response()->json($usergroupUserTempRelation);
        }
        return response()->json($usergroupUserRelation);
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
        $usergroupUserRelation = UsergroupUserRelation::find($id);

        $userGroup = Usergroup::with(['users', 'userstemp'])->find($usergroupUserRelation->usergroup_id);
        $usergroupUserRelation->delete();
        //refresh
        $userGroup = Usergroup::with(['users', 'userstemp'])->find($userGroup->id);
        return response()->json($userGroup);
    }



}
