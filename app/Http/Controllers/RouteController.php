<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
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
}
