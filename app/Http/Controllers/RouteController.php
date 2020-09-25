<?php

namespace App\Http\Controllers;
use Auth;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;

use App\Http\Controllers\API\CourseController;
use App\Http\Controllers\API\LearningPatternTemplateController;
use App\Http\Controllers\API\LearningComponentTemplateController;

class RouteController extends Controller
{
    //
    private function getUserJson(){
        $user['id'] =  Auth::user()->id;
        $user['name'] =  Auth::user()->name;
        $user['email'] =  Auth::user()->email;
        $user['display_tourguide'] =  Auth::user()->display_tourguide;
        $user['is_admin'] = Auth::user()->is_admin;
        $user_temp = \json_encode($user);

        return $user_temp;
    }

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function test(){

        return \response()->json(Auth::user());
    }
    
    public function designstudio($id = -1, $step = 0){

        // return view('designstudio', ["courseid" => $id, 'user'=> $user_temp, 'step' => $step]);
        if($step == 0){

        }else{
            $step = $step - 1;
        }

        return view('app', ["courseid" => $id, 'user'=> $this->getUserJson(), 'step' => $step, 'module' => 'designstudio']);
    }

    public function newdesignstudio($id = -1){
        $courseController = new CourseController();

        $request_course = new \Illuminate\Http\Request();
        $course = $courseController->store($request_course)->getData();

        // return response()->json($course);
        return redirect('designstudio/'.$course->id);
        // return view('app', ["courseid" => $course->id, 'user'=> $this->getUserJson(), 'step' => 0, 'module' => 'designstudio']);
    }
   
    public function mydesign(){
        // return view('mydesign', ['user'=> $user_temp]);
        return view('app',  ["courseid" => -1, 'user'=> $this->getUserJson(), 'step' => 0, 'module' => 'mydesign']);
    }

    public function publicdesign(){
        // return view('publicdesign', ['user'=> $user_temp]);
        return view('app',  ["courseid" => -1, 'user'=> $this->getUserJson(), 'step' => 0, 'module' => 'publicdesign']);
    }

    public function printpdf($id){
        // return view('publicdesign', ['user'=> $user_temp]);
        return view('printablepdf', ["courseid" => $id]);
    }

    public function usergroups(){
        // return view('usergroups', ['user'=> $user_temp]);
        return view('app',  ["courseid" => -1, 'user'=> $this->getUserJson(), 'step' => 0, 'module' => 'usergroups']);
    }

    public function usergroup($id){
        // return view('usergroup', ['user'=> $user_temp, 'usergroupid' => $id]);
        return view('app',  ["courseid" => -1, 'user'=> $this->getUserJson(), 'step' => 0, 'module' => 'usergroup', 'usergroupid' => $id]);
    }

    public function admin_dashboard(){
        return view('app',  ['user'=> $this->getUserJson(), 'module' => 'admin_dashboard']);
    }

    public function admin_usersmanagement(){    
        return view('app',  ['user'=> $this->getUserJson(), 'module' => 'admin_usersmanagement']);
    }

    public function admin_templatebuilder(){
        return view('app',  ['user'=> $this->getUserJson(), 'module' => 'admin_template_builder']);
    }

    public function admin_component_template(){
        return view('app',  ['user'=> $this->getUserJson(), 'module' => 'admin_component_template']);
    }

    public function admin_component_template_builder_new(){
        $componentTempController = new LearningComponentTemplateController();

        $request_component = new \Illuminate\Http\Request();
        $request_component->title = "new Component";
        $component = $componentTempController->store($request_component)->getData();

        return redirect('admin/component_template_builder/'. $component->id);
    }

    public function admin_component_template_builder($id){
        return view('app',  ['user'=> $this->getUserJson(), 'module' => 'admin_component_template_builder', 'componentid' => $id]);
    }


    public function admin_pattern_template(){
        return view('app',  ['user'=> $this->getUserJson(), 'module' => 'admin_pattern_template']);
    }

    public function admin_pattern_template_builder_new(){
        $patternTempController = new LearningPatternTemplateController();

        $request_pattern = new \Illuminate\Http\Request();
        $request_pattern->title = "new Pattern";
        $pattern = $patternTempController->store($request_pattern)->getData();

        return redirect('admin/pattern_template_builder/'. $pattern->id);
    }

    public function admin_pattern_template_builder($id){
        return view('app',  ['user'=> $this->getUserJson(), 'module' => 'admin_pattern_template_builder', 'patternid' => $id]);
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

        // return \response('test');
        try{
            $user =  Auth::user();
            $user['display_tourguide'] =  $request->display_tourguide;
            $user->save();
    
            return response()->json($user);
        }catch(Exception $e){
            return response()->json($e);
        }
    }   
}
