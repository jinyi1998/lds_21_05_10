<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Illuminate\Support\Facades\DB;
use App\Component;
use App\LearningTask;
use App\LearningPattern;

class DesignPermissionMiddleWare
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    private string $method;
    private string $module;
    private int $id;


    public function handle($request, Closure $next)
    {
        
        [$module, $id] = $this->handleSegments($request);
        $this->module = $module;
        $this->id = $id;
        $this->method = $request->method();


        $permission = [];
        if($id == -1){
            return $next($request);
        }else{
            switch($this->module){
                case 'course':
                    $permission = $this->getDesignPermission($this->id);
                break;
                case 'learningComponent':
                    $permission = $this->getCoursePermissionFromComponent($this->id);
                break;
                case 'learningPattern':
                    $permission = $this->getCoursePermissionFromPattern($this->id);
                break;
                case 'learningTask':
                    $permission = $this->getCoursePermissionFromTask($this->id);
                break;
            }
        }

        $rs = $this->checkPermission($request, $permission);

        if($rs){
            return $next($request);
        }else{
            return \response()->json(['message' => 'unauthenticated', 'permission' => $permission], 401);
        }      
    }

    public function handleSegments($request){
        $method = $request->method();
        $segments = $request->segments();
        $id = -1;
        $module = $segments[1];

        switch($method){
            default:
            case 'GET':
                if(isset($segments[2])){
                    $id = $segments[2];
                }
            break;
            case 'POST':
                switch($module){
                    case 'learningComponent':
                        if($request->has('course_id')){
                            $id = $request->course_id;
                            $module = 'course';
                        }
                    break;
                    case 'learningPattern':
                        if($request->has('component_id')){
                            $id = $request->component_id;
                            $module = 'learningComponent';
                        }
                    break;
                    case 'learningTask':
                        if($request->has('component_id')){
                            $id = $request->component_id;
                            $module = 'learningComponent';
                        }else if($request->has('pattern_id')){
                            $id = $request->pattern_id;
                            $module = 'learningPattern';
                        }
                    break;
                }
            break;
            case 'PUT':
                $id = $segments[2];
            break;
            case 'DELETE':
                $id = $segments[2];
            break;

        }
        return [$module, $id];
    }

    public function getDesignPermission($courseid){
        $permission = [];

        $user_permission = DB::table('design_user_permission')
        ->where('course_id', $courseid)
        ->where('user_id', Auth::user()->id)
        ->select('course_id', 'user_id', 'permission')
        ->get();
       
        $usergroup_permission = DB::table('design_usergroup_permission')
        ->join('usergroup_user_relation', 'design_usergroup_permission.usergroup_id', '=', 'usergroup_user_relation.usergroup_id')
        ->where('course_id', $courseid)
        ->where('usergroup_user_relation.user_id', Auth::user()->id)
        ->select('course_id', 'design_usergroup_permission.usergroup_id', 'design_usergroup_permission.permission')
        ->get();

        $public_permission = DB::table('design_public_permission')
        ->where('course_id', $courseid)
        ->select('course_id', 'permission')
        ->get();
        // $permission = {};
        $permission['public_permission'] = $public_permission;
        $permission['user_permission'] = $user_permission;
        $permission['usergroup_permission'] = $usergroup_permission;

        return $permission;
    }

    public function checkPermission($request, $permission){
        $permission_value = 0;
        // user > usergroup > public
        if(count($permission['user_permission']) > 0){
            $permission_value = $permission['user_permission'][0]->permission;
        }
        elseif(count($permission['usergroup_permission']) > 0){
            foreach($permission['usergroup_permission'] as $_usergroup_permission){
                if($permission_value < $_usergroup_permission->permission){
                    $permission_value =  $_usergroup_permission->permission;
                }
            }
           
        }
        elseif(count($permission['public_permission']) > 0){
            if($permission_value < $permission['public_permission'][0]->permission){
                $permission_value =  $permission['public_permission'][0]->permission;
            }
        }

        return $this->checkPermissionMethod($request, $permission_value);
    }

    public function checkPermissionMethod($request, $permission){
        if($this->method == 'course'){
            switch($this->method){
                case 'DELETE':
                    if($permission > 3) return true;
                break;
                case 'POST':
                case 'PUT':
                    if($permission > 2) return true;
                break; 
                case 'GET':
                    if($permission > 0) return true;
                default:
                    return false;
            }
        }else{
            switch($this->method){
                case 'DELETE':
                case 'POST':
                case 'PUT':
                    if($permission > 2) return true;
                break; 
                case 'GET':
                    if($permission > 0) return true;
                default:
                    return false;
            }
        }
    }

    public function getCoursePermissionFromComponent($id){
        $component = Component::with(['courseid'])->find($id);
        return $this->getDesignPermission($component->courseid->course_id);
    }

    public function getCoursePermissionFromPattern($id){
         $pattern = LearningPattern::with(['componentid'])->find($id);
         return $this->getCoursePermissionFromComponent($pattern->componentid->component_id);
    }

    public function getCoursePermissionFromTask($id){
        $task = LearningTask::with(['patternid', 'componentid'])->find($id);
        if($task->patternid){
            return $this->getCoursePermissionFromPattern($task->patternid->pattern_id);
        }elseif($task->componentid){
            return $this->getCoursePermissionFromComponent($task->componentid->component_id);
        }
        return false;
    }

}
