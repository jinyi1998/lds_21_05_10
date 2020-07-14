<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\DB;
use Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $users = User::all();
        return response()->json($users);
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

    public function getAvaUserGroup(){
        $usergroups = User::with(['usergroup'])->find(Auth::user()->id)->usergroup;
        return response()->json($usergroups);
    }

    public function getUserMgmtDashboard(){
        $seven_days_users = DB::table('users')
        ->select(DB::raw('CAST(created_at AS DATE) as date, count(*) as user_count'))
        ->whereRaw('CAST(created_at AS DATE) >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)')
        ->groupByRaw('CAST(created_at AS DATE)')
        ->get();
        
        $today_users = DB::table('users')
        ->select(DB::raw('email, school, name, created_at, CURDATE()'))
        ->whereRaw('CAST(created_at AS DATE) = CURDATE()')
        ->get();


        $response['seven_days_users'] =  $seven_days_users;
        $response['today_users'] =  $today_users;

        return response()->json($response);
    }
}
