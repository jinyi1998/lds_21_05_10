<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Course;
use Auth;

class CourseControllerTest extends Controller
{
    //
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function index()
    {
        // pattern 
        // id => courseJson

        // $list = DB::table('demo')->select('id','data', 'updated_at')->get();
        // return response()->json($list);
        // return response()->json(  \Auth::user());

        $course = Course::with(['createdby'])->where('created_by', Auth::user()->id)->get();
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
        // $input = $request->all();
        // $id = DB::table('demo')->insertGetId([
        //     'data' => json_encode($input)
        //     , 'created_by' => 1
        //     , 'updated_by' => 1
        //     , 'is_deleted' => false
        //     , 'created_at' => now()
        //     , 'updated_at' => now()
        // ]);
        // return response()->json($id);

        $course = new Course();
        $request['created_by'] =  Auth::user()->id;
        $course = CourseControllerTest::save($course, $request);

        return CourseControllerTest::show($course->id);
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
        // $course = DB::table('demo')->find($id);
        // return response()->json($course);
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
        $course = CourseControllerTest::save($course, $request);
        return CourseControllerTest::show($course->id);

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
        // if($request->has('componentid')){
        //     foreach($request->componentid as $_component){
        //         $course->componentid = $request->design_type_id;
        //     }   
        // }
        // $course->created_by =  Auth::user()->id;
        $course->updated_by =  Auth::user()->id;
        $course->is_deleted = 0;
        $course->updated_at = now();
        $course->save();

        return $course;
    }


    public function showAll()
    {
        $course = Course::with(['createdby'])->get();
        return response()->json($course);
    }

    public function getDesignTypeTemp(){
        return response()->json([
            [
                'id' => 1,
                'hint' => 'engineering design approach guides you...',
                'description'=> "using engineering design practice to guide the learing task 
                sequence design by adopting the self-directed learning approach",
                'media'=> "https://cdn2.iconfinder.com/data/icons/conceptual-vectors-of-logos-and-symbols/66/204-512.png",
                'name'=> "Engineering Design SDL",
            ],
            [
                'id' => 2,
                'hint' => 'Scientific investigation practice design approach guides you...',
                'description'=> "using scienitic investigation practice to guide the 
                learing task sequence design by adopting the self-directed learning approach",
                'media'=> "https://www.pinclipart.com/picdir/big/44-449704_nuclear-icon-nuclear-icon-png-clipart.png",
                'name'=> "Scienitic Investigation SDL",
            ],
            // [
            //     'id' => 3,
            //     'hint' => 'engineering design approach guides you...',
            //     'description'=> "using engineering design practice to guide the learing task 
            //     sequence design by adopting the guided learning approach",
            //     'media'=> "https://www.pinclipart.com/picdir/big/1-17456_engineer-clipart-ship-engineer-symbol-of-marine-engineering.png",
            //     'name'=> "Engineering Design Guided",
            // ],
            // [
            //     'id' => 4,
            //     'hint' => 'engineering design approach guides you...',
            //     'description'=> "using scienitic investigation practice to guide the learing task sequence 
            //     design by adopting the guided learning approach",
            //     'media'=> "https://www.pinclipart.com/picdir/big/179-1791472_engineering-solutions-engineering-tools-logo-clipart.png",
            //     'name'=> "Scienitic Investigation Guided",
            // ]
        ]);
    }
}
