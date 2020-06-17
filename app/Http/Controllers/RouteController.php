<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Auth;
use App\Http\Controllers\CourseControllerTest;


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
    
    public function designstudio($id = -1, $step = 0){
        $user['id'] =  Auth::user()->id;
        $user['name'] =  Auth::user()->name;
        $user['email'] =  Auth::user()->email;
        $user['display_tourguide'] =  Auth::user()->display_tourguide;
        $user_temp = \json_encode($user);

        return view('designstudio', ["courseid" => $id, 'user'=> $user_temp, 'step' => $step]);
    }

    public function newdesignstudio($id = -1){
        $courseController = new CourseControllerTest();

        $user['id'] =  Auth::user()->id;
        $user['name'] =  Auth::user()->name;
        $user['email'] =  Auth::user()->email;
        $user['display_tourguide'] =  Auth::user()->display_tourguide;
        $user_temp = \json_encode($user);

        $request_course = new \Illuminate\Http\Request();
        $course = $courseController->store($request_course)->getData();
        return redirect('designstudio/'.$course->id);
    }
   
    public function mydesign(){
        $user['id'] =  Auth::user()->id;
        $user['name'] =  Auth::user()->name;
        $user['email'] =  Auth::user()->email;
        $user['display_tourguide'] =  Auth::user()->display_tourguide;
        $user_temp = \json_encode($user);

        return view('mydesign', ['user'=> $user_temp]);
    }

    public function publicdesign(){
        $user['id'] =  Auth::user()->id;
        $user['name'] =  Auth::user()->name;
        $user['email'] =  Auth::user()->email;
        $user['display_tourguide'] =  Auth::user()->display_tourguide;
        $user_temp = \json_encode($user);

        return view('publicdesign', ['user'=> $user_temp]);
    }

    public function usergroups(){
        $user['id'] =  Auth::user()->id;
        $user['name'] =  Auth::user()->name;
        $user['email'] =  Auth::user()->email;
        $user['display_tourguide'] =  Auth::user()->display_tourguide;
        $user_temp = \json_encode($user);

        return view('usergroups', ['user'=> $user_temp]);
    }

    public function usergroup($id){
        $user['id'] =  Auth::user()->id;
        $user['name'] =  Auth::user()->name;
        $user['email'] =  Auth::user()->email;
        $user['display_tourguide'] =  Auth::user()->display_tourguide;
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

    public function displayTourGuide(Request $request){
        $user =  Auth::user();
        $user['display_tourguide'] =  $request->display_tourguide;
        $user->save();
        // Auth::user()->display_tourguide ＝ $request->display_tourguide;
        // $user['id'] =  Auth::user()->id;
        // $user['name'] =  Auth::user()->name;
        // $user['email'] =  Auth::user()->email;
        // $user['display_tourguide'] =  Auth::user()->display_tourguide;

        return response()->json($user);
    }   
}
