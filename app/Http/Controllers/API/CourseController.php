<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Course;
use App\Component;
use App\LearningOutcome;
use App\LearningTask;
use App\Lesson;
use App\Tags;
use Auth;


class CourseController extends Controller
{
    public function index()
    {
        $course_arr = [];
        $courses = Course::with(['createdby','usergroupid', 'tags'])->orderBy('is_pin', 'desc')->get();
        foreach($courses as $index => $_course){
            $_course['permission'] = $this->getCurrentUserCoursePermission($_course->id);
            if( $_course['permission'] > 0){
                array_push($course_arr, $_course);
            }
        }

        return response()->json($course_arr);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $course = new Course();
        $request['created_by'] =  Auth::user()->id;
        $course = CourseController::save($course, $request);
        DB::table('design_user_permission')->insert([  
            [
                'course_id' => $course->id,
                'user_id' => Auth::user()->id,
                'permission' => 100,
                'created_by' => Auth::user()->id,
                'updated_by' => Auth::user()->id,
                'is_deleted' => 0
            ]
        ]);

        return CourseController::show($course->id);
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
        $course = Course::with(['componentid', 'components', 'outcomes', 'outcomeid', 'lessons', 'lessonid', 'createdby', 'tags'])->find($id);
        $course['permission'] = $this->getCurrentUserCoursePermission($course->id);
        return response()->json($course);
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
        // $input = $request->all();
        // $respond =  DB::table('demo')->where('id', $id)->update(['data' => json_encode($input), 'updated_at' =>now()]);
        // return response()->json($respond);
        $course = Course::find($id);
        $course = CourseController::save($course, $request);
        return CourseController::show($course->id);

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
        $course = Course::find($id);
        $course->delete();

        return response()->json("success");
    } 

    public static function save(Course $course, Request $request){

        if($request->has('unit_title')){
            $course->unit_title = $request->unit_title;
        }
        if($request->has('level')){
            $course->level = $request->level;
        }
        if($request->has('subject')){
            $course->subject = $request->subject;
        }
        if($request->has('no_of_lesson')){
            $course->no_of_lesson = $request->no_of_lesson;
        }
        if($request->has('description')){
            $course->description = $request->description;
        }
        if($request->has('design_type_id')){
            $course->design_type_id = $request->design_type_id;
        }
        if($request->has('created_by')){
            $course->created_by =  Auth::user()->id;
        }

        if($request->has('is_finish')){
            $course->is_finish =  $request->is_finish;
        }
        
        if($request->has('coursetype')){
            $course->coursetype =  $request->coursetype;
        }

        if($request->has('usergroupid')){
            $course->usergroupid()->delete();
            foreach((array) $request->usergroupid as $_usergroup){
                $course->usergroupid()->create([
                    'course_id' => $_usergroup['course_id'],
                    'usergroup_id' => $_usergroup['usergroup_id'],
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                ]);
            }
        }

        $course->updated_by =  Auth::user()->id;
        $course->is_deleted = 0;
        $course->updated_at = now();
        $course->save();

        if($request->has('tags')){
            $course->tagsid()->delete();
            foreach($request->tags as $_tag){
                if(Tags::where('name', $_tag)->count() > 0){ // if tags existed
                    $tag = Tags::where('name', $_tag)->first();
                }else{
                    $tag = new Tags();
                    $tag->name = $_tag;
                    $tag->created_by = Auth::user()->id;
                    $tag->updated_by = Auth::user()->id;

                    $tag->created_at = now();
                    $tag->updated_at = now();
                    $tag->save();
                    //create new one
                }
                //create relation
                $course->tagsid()->create([
                    'course_id' => $course->id,
                    'tags_id' => $tag->id,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                ]);
            }
        }

        return $course;
    }


    public function showAll()
    {
        $course_arr = [];
        $courses = Course::with(['createdby','usergroupid'])->orderBy('is_pin', 'desc')->get();
        foreach($courses as $index => $_course){
            $_course['permission_arr'] = $this->getCoursePermission($_course->id);
            if( count($_course['permission_arr']['public_permission']) > 0){
                if($_course['permission_arr']['public_permission'][0]->permission > 0){
                    $_course['permission'] = $this->getCurrentUserCoursePermission($_course->id);
                    array_push($course_arr, $_course);
                }
            }
        }
        return response()->json($course_arr);
    }

    public function showUsergroup($id)
    {
        // $courses = Course::has('usergroupid', '=', $id)->with(['createdby'])->get();
        $course_arr = [];
        $courses = Course::with(['createdby','usergroupid'])->get();

        foreach($courses as $index => $_course){

            $_course['permission_arr'] = $this->getCoursePermission($_course->id);
            if( count($_course['permission_arr']['usergroup_permission']) > 0){
                foreach($_course['permission_arr']['usergroup_permission'] as $_usergroup_permission)
                if($_usergroup_permission->permission > 0 && $_usergroup_permission->usergroup_id == $id){
                    $_course['permission'] = $this->getCurrentUserCoursePermission($_course->id);
                    array_push($course_arr, $_course);
                }
            }
        }

        return response()->json($course_arr);
    }

    public function getCurrentUserCoursePermission($id){
        $user_permission = DB::table('design_user_permission')
        ->where('course_id', $id)
        ->where('design_user_permission.user_id', Auth::user()->id)
        ->join('users', 'users.id', 'design_user_permission.user_id')
        ->select('course_id', 'user_id', 'permission', 'users.name')
        ->get();
       

        $usergroup_permission = DB::table('design_usergroup_permission')
        ->where('course_id', $id)
        ->where('users.id', Auth::user()->id)
        ->join('usergroup_user_relation', 'usergroup_user_relation.usergroup_id', 'design_usergroup_permission.usergroup_id')
        ->join('users', 'users.id', 'usergroup_user_relation.user_id')
        ->select('course_id', 'design_usergroup_permission.permission')
        ->get();

        $public_permission = DB::table('design_public_permission')
        ->where('course_id', $id)
        ->select('course_id', 'permission')
        ->get();
        // $permission = {};

        $permission = -1;

        foreach ($user_permission as $_user_permission){
            $permission = $_user_permission->permission;
        }

        foreach ($usergroup_permission as $_usergroup_permission){
            if($_usergroup_permission->permission > $permission){
                $permission = $_usergroup_permission->permission;
            }
        }

        foreach ($public_permission as $_public_permission){
            if($_public_permission->permission > $permission){
                $permission = $_public_permission->permission;
            }
        }

        return $permission;
    }


    public function getCoursePermission($id){

        $user_permission = DB::table('design_user_permission')
        ->where('course_id', $id)
        // ->where('user_id', Auth::user()->id)
        ->join('users', 'users.id', 'design_user_permission.user_id')
        ->select('course_id', 'user_id', 'permission', 'users.name')
        ->get();
       

        $usergroup_permission = DB::table('design_usergroup_permission')
        ->where('course_id', $id)
        ->select('course_id', 'usergroup_id', 'permission')
        ->get();

        $public_permission = DB::table('design_public_permission')
        ->where('course_id', $id)
        ->select('course_id', 'permission')
        ->get();
        // $permission = {};
        $permission['public_permission'] = [];
        $permission['user_permission'] = [];
        $permission['usergroup_permission'] = [];

        $permission['public_permission'] = $public_permission;
        $permission['user_permission'] = $user_permission;
        $permission['usergroup_permission'] = count($usergroup_permission) > 0 ? $usergroup_permission : [];

        // $course['permission'] = $permission;

        return $permission;
    } 

    public function updateCoursePermission(Request $request){

        $course = Course::find($request->course_id);
        // clear the exisiting record
        DB::table('design_user_permission')
        ->where('course_id', $course->id)
        ->where('user_id', '!=' ,$course->created_by) //pass if user = create course owner
        ->delete();

        DB::table('design_usergroup_permission')
        ->where('course_id', $course->id)
        ->delete();

        DB::table('design_public_permission')
        ->where('course_id', $course->id)
        ->delete();



        $permission['public_permission'] = $request->permission['public_permission'];
        $permission['user_permission'] = $request->permission['user_permission'];
        $permission['usergroup_permission'] = $request->permission['usergroup_permission'];
      
        // user
        foreach($permission['user_permission'] as $_user_permission){
            if($_user_permission['user_id'] == $course->created_by  || $_user_permission['permission'] == -1){
                // pass if user = create course owner
                continue;
            }
            DB::table('design_user_permission')->insert([
                [
                    'course_id' => $course->id,
                    'user_id' => $_user_permission['user_id'],
                    'permission' => $_user_permission['permission'], 
                    'is_deleted' => 0,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id
                ],
            ]);

        }

        // user group
        foreach($permission['usergroup_permission'] as $_usergroup_permission){

            if($_usergroup_permission['permission'] == -1){
                continue;
            }

            DB::table('design_usergroup_permission')->insert([
                ['course_id' => $course->id, 
                'usergroup_id' => $_usergroup_permission['usergroup_id'], 
                'permission' => $_usergroup_permission['permission'], 
                'is_deleted' => 0,
                'created_by' => Auth::user()->id,
                'updated_by' => Auth::user()->id
                ],
            ]);

        }

        // public
        foreach($permission['public_permission'] as $_public_permission){

            if($_public_permission['permission'] == -1){
                continue;
            }

            DB::table('design_public_permission')->insert([
                [
                    'course_id' => $course->id, 
                    'permission' => $_public_permission['permission'], 
                    'is_deleted' => 0,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id
                ],
            ]);

        }

        return response()->json($request->permission);


    }

    public function clearCourseComponent($id){
        $course = Course::find($id);
        $course->outcomes()->delete();
        $course->components()->delete();
        return response()->json($course);
    }

    public function clearCourseLesson($id){
        $course = Course::find($id);
        $course->lessons()->delete();
        return response()->json($course);
    }

    public function importCourse( Request $request){
        //save course
        $course = new Course();
        $request['created_by'] =  Auth::user()->id;
        $course = CourseController::save($course, $request);

        DB::table('design_user_permission')->insert([  
            [
                'course_id' => $course->id,
                'user_id' => Auth::user()->id,
                'permission' => 100,
                'created_by' => Auth::user()->id,
                'updated_by' => Auth::user()->id,
                'is_deleted' => 0
            ]
        ]);


        
        //outcome
        $outcomeMapping = [];
        foreach($request->outcomes as $_outcome){
            $_outcome_obj = new LearningOutcome();
            $_outcome['course_id'] = $course->id;
            $_outcome_request = new \Illuminate\Http\Request($_outcome);
            $new_outcome = LearningOutcomesController::save( $_outcome_obj, $_outcome_request);

            //mapping array for the unit outcome from the old json course to new unit outcome
            $outcomeMapping[$_outcome['id']] = $new_outcome->id;
        }

        //component
        $taskMapping = [];
        $taskAssessmentMapping = [];
        $taskAssessmentMapping_filter = [];
        foreach($request->components as $_component){
            // $_component
            $_component_obj = new Component();
            $_component['course_id'] = $course->id;
            // mapping with new unit new outcome
            foreach($_component['outcomes'] as $index => $_outcome){
                $_component['outcomes'][$index]['unit_outcomeid']['unit_outcomeid'] = $outcomeMapping[ $_component['outcomes'][$index]['unit_outcomeid']['unit_outcomeid']];
            }

            //save original task-outcome task
            foreach($_component['tasks'] as $index => $_task){
                
                foreach($_task['assessmentid'] as $_index => $_assessment){
                    $taskAssessmentMapping [$_task['id']]['id'] =  $_task['id'];
                    $taskAssessmentMapping [$_task['id']]['assessmentid'][$_index]['learningoutcome_id'] = $_component['tasks'][$index]['assessmentid'][$_index]['learningoutcome_id'];
                    $taskAssessmentMapping [$_task['id']]['assessmentid'][$_index]['learningtask_id'] = $_component['tasks'][$index]['assessmentid'][$_index]['learningtask_id'];
                }
                unset($_component['tasks'][$index]['assessmentid']);
            }
            foreach($_component['patterns'] as $index_pattern => $_pattern){
                foreach($_pattern['tasks'] as $index_tasks => $_task){
                    
                    foreach($_task['assessmentid'] as $_index => $_assessment){
                        $taskAssessmentMapping [$_task['id']]['id'] =  $_task['id'];
                        $taskAssessmentMapping [$_task['id']]['assessmentid'][$_index]['learningoutcome_id'] 
                            = $_component['patterns'][$index_pattern]['tasks'][$index_tasks]['assessmentid'][$_index]['learningoutcome_id'];
                        $taskAssessmentMapping [$_task['id']]['assessmentid'][$_index]['learningtask_id'] 
                            =  $_component['patterns'][$index_pattern]['tasks'][$index_tasks]['assessmentid'][$_index]['learningtask_id'];
                    }
                    unset($_component['patterns'][$index_pattern]['tasks'][$index_tasks]['assessmentid']);
                }
            }

            $_component_request = new \Illuminate\Http\Request($_component);
            $new_component = LearningComponentController::save( $_component_obj, $_component_request);

            //generate task mapping array for lesson-task mapping
            foreach($_component['tasks'] as $index => $_task){
                $taskMapping[$_task['id']] = $new_component['tasks'][$index]['id'];
            }
            foreach($_component['patterns'] as $index_pattern => $_pattern){
                foreach($_pattern['tasks'] as $index_tasks => $_task){
                    $taskMapping[$_task['id']] = $new_component['patterns'][$index_pattern]['tasks'][$index_tasks]['id'];
                }
            }
            foreach($taskAssessmentMapping as $_task_index => $_task){
                $taskAssessmentMapping[$_task_index]['id'] =  $taskMapping[$_task_index];
                foreach($_task['assessmentid'] as $assessment_index => $_assessment){
                    foreach($_component['outcomes'] as $index_outcomes => $_outcomes){
                        if( $_assessment['learningoutcome_id'] == $_outcomes['id']){    

                            $taskAssessmentMapping_filter[$_task_index]['assessmentid'][$assessment_index]['learningoutcome_id'] = $new_component['outcomes'][$index_outcomes]['id'];
                            $taskAssessmentMapping_filter[$_task_index]['assessmentid'][$assessment_index]['learningtask_id'] =  $taskMapping[$_task_index];
                        }
                    }
                }
            }
        }

        foreach($taskAssessmentMapping as $_task_id => $_task){
         
            if(isset($taskAssessmentMapping_filter[$_task_id])){
                unset( $taskAssessmentMapping[$_task_id]['assessmentid'] );
                $taskAssessmentMapping[$_task_id]['assessmentid'] = $taskAssessmentMapping_filter[$_task_id]['assessmentid'];
            }else{
                unset( $taskAssessmentMapping[$_task_id] );
            }
        }
        //tasks assessment

        foreach($taskAssessmentMapping as $_task){
            $task_obj = LearningTask::find($_task['id']);
            $_task_request = new \Illuminate\Http\Request($_task);
            //update the learning task assessment
            LearningTaskController::save( $task_obj, $_task_request);
        }

        //lesson
        foreach($request->lessons as $_lesson){
            $_lesson_obj = new Lesson();
            $_lesson['course_id'] = $course->id;
            foreach($_lesson['tasksid'] as $index => $_task){
                if(isset($taskMapping[$_task['task_id']])){
                    $_lesson['tasks_id'][$index]['task_id'] = $taskMapping[$_task['task_id']];
                    $_lesson['tasks_id'][$index]['sequence'] = $index + 1;
                }
            }
            // return response()->json($_lesson);
            $_lesson_request = new \Illuminate\Http\Request($_lesson);
            LessonController::save( $_lesson_obj, $_lesson_request);
        }

        // $course = Course::find($course->id);
        $course = Course::with(['componentid', 'components', 'outcomes', 'outcomeid', 'lessons', 'lessonid'])->find($course->id);

        return response()->json($course);
    }

}   