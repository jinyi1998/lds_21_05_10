<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Auth;

class RouteController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function test(){

        return \response()->json(Auth::user());
    }
    
    public function designstudio($id = -1){
        $user['id'] =  Auth::user()->id;
        $user['name'] =  Auth::user()->name;
        $user['email'] =  Auth::user()->email;
        $user_temp = \json_encode($user);

        return view('designstudio', ["courseid" => $id, 'user'=> $user_temp]);
    }
   
    public function mydesign(){
        $user['id'] =  Auth::user()->id;
        $user['name'] =  Auth::user()->name;
        $user['email'] =  Auth::user()->email;
        $user_temp = \json_encode($user);

        return view('mydesign', ['user'=> $user_temp]);
    }

    public function publicdesign(){
        $user['id'] =  Auth::user()->id;
        $user['name'] =  Auth::user()->name;
        $user['email'] =  Auth::user()->email;
        $user_temp = \json_encode($user);

        return view('publicdesign', ['user'=> $user_temp]);
    }

    public function usergroups(){
        $user['id'] =  Auth::user()->id;
        $user['name'] =  Auth::user()->name;
        $user['email'] =  Auth::user()->email;
        $user_temp = \json_encode($user);

        return view('usergroups', ['user'=> $user_temp]);
    }

    public function usergroup($id){
        $user['id'] =  Auth::user()->id;
        $user['name'] =  Auth::user()->name;
        $user['email'] =  Auth::user()->email;
        $user_temp = \json_encode($user);

        return view('usergroup', ['user'=> $user_temp, 'usergroupid' => $id]);
    }

    public function changePassword(Request $request){
        try{
            $credentials = $request->only('email', 'password');

            if (Auth::attempt($credentials)) {
                $request->user()->fill([
                    'password' => Hash::make($request->new_password),
                    'name' => $request->name
                ])->save();
                return response()->json('success');
            }
            return response()->json('auth_fail');
        }catch(Exception $e){
            return response()->json($request);
        }
      
       
    }
}
