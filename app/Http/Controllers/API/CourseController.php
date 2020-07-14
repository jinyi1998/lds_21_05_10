<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Course;
use App\Component;
use App\LearningOutcome;
use App\Lesson;
use Auth;


class CourseController extends Controller
{
    public function index()
    {
        $course = Course::with(['createdby','usergroupid'])->where('created_by', Auth::user()->id)->get();
        return response()->json($course);
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

        return CourseController::show($course->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public static function show($id)
    {
        //
        $course = Course::with(['componentid', 'components', 'outcomes', 'outcomeid', 'lessons', 'lessonid'])->find($id);
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
            $course->created_by =  $request->created_by;
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
                    'created_by' => 1,
                    'updated_by' => 1,
                    'is_deleted' => 0
                ]);
            }
        }
        $course->updated_by =  Auth::user()->id;
        $course->is_deleted = 0;
        $course->updated_at = now();
        $course->save();

        return $course;
    }


    public function showAll()
    {
        $course = Course::with(['createdby', 'usergroupid'])->where("coursetype", '=', 3)->get();
        return response()->json($course);
    }

    public function showUsergroup($id)
    {
        // $courses = Course::has('usergroupid', '=', $id)->with(['createdby'])->get();
        $data = Course::with(['createdby', 'usergroupid'])->get();
        $courses = array();

        foreach($data as $key => $course){
      
            $x = $course->usergroupid()->where('usergroup_id', $id)->get();
            if ($x->count()){
                array_push($courses, $course);
            }
        }
        return response()->json($courses);
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

    public function getDesignTypeTemp(){
        return response()->json([
            [
                'id' => 1,
                'hint' => 'engineering design approach guides you...',
                'description'=> "using engineering design practice to guide the learing task 
                sequence design by adopting the self-directed learning approach",
                'media'=> "/asset/image/ED.png",
                'name'=> "Engineering Design SDL",
            ],
            [
                'id' => 2,
                'hint' => 'Scientific investigation practice design approach guides you...',
                'description'=> "using Scientific investigation practice to guide the 
                learing task sequence design by adopting the self-directed learning approach",
                'media'=> "/asset/image/SI.png",
                'name'=> "Scientific Investigation SDL",
            ],
        ]);
    }

    public function importCourse( Request $request){
        //save course
        $course = new Course();
        $request['created_by'] =  Auth::user()->id;
        $course = CourseController::save($course, $request);

 
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
        foreach($request->components as $_component){
            // $_component
            $_component_obj = new Component();
            $_component['course_id'] = $course->id;
            foreach($_component['outcomes'] as $index => $_outcome){
                $_component['outcomes'][$index]['unit_outcomeid']['unit_outcomeid'] = $outcomeMapping[ $_component['outcomes'][$index]['unit_outcomeid']['unit_outcomeid']];
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
            // return response()->json($new_component);
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