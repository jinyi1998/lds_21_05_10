<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Usergroup;
use App\UsergroupUserRelation;
use App\UsergroupUserTempRelation;


class UsergroupUserTempController extends Controller
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
        $usergroupUserTempRelation = UsergroupUserTempRelation::find($id);
        
        // add to original table
        $usergroupUserRelation = UsergroupUserRelation::updateOrCreate(
            [
                "user_id" => $usergroupUserTempRelation->user_id,
                "usergroup_id" => $usergroupUserTempRelation->usergroup_id,
                "permission" => $usergroupUserTempRelation->permission,
                "is_deleted" => 0,
                "created_by" => 1,
                "updated_by" => 1,
            ]
        );

        //delete the request
        $usergroupUserTempRelation->delete();

        $userGroup = Usergroup::with(['users', 'userstemp'])->find($usergroupUserTempRelation->usergroup_id);;
        
        return response()->json($userGroup);
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
        $usergroupUserTempRelation = UsergroupUserTempRelation::find($id);

        $userGroup = Usergroup::with(['users', 'userstemp'])->find($usergroupUserTempRelation->usergroup_id);;
        $usergroupUserTempRelation->delete();

        $userGroup = Usergroup::with(['users', 'userstemp'])->find($userGroup->id);

        return response()->json($userGroup);
    }
}
