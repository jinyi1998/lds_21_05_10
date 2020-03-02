<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
/** data template
    * const course = {
    *     courseInfo : {
    *       id: 0,
    *       unitTitle: "",
    *       schoolName: "",
    *       level: "",
    *       noOfLessons: "",
    *       courseDes: "",
    *       createDate: "",
    *       createBy: ""
    *       modifyDate: "",
    *       modifyBy: ""
    *     },
    *     designType: "",
    *     components: [
    *       {
    *         id: 0,
    *         title: "",
    *         tasks: [
    *           {
    *             id: 0,
    *             title: "",
    *             assessment: [],
    *             time: 0,
    *             classType: "",
    *             target: "",
    *             resource: "",
    *             STEMType: [],
    *             description: "",
    *           }
    *         ],
    *         learningOutcomes: [
    *               id...,
    *         ]
    *       }
    *     ],
    *     *learning outcomes in course level
    *     learningOutcomes: [
    *       {
    *         id: 0,
    *         level: "",
    *         outcomeType: "",
    *         STEMType: [],
    *         description: "",
    *         status: false
    *       }
    *     ],
    *     lesson: [
    *       {
    *         id: 0,
    *         name: "",
    *         tasks: []
    *       }
    *     ]
    *   }
*/
   
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // pattern 
        // id => courseJson
        $list = DB::table('demo')->select('id','data', 'updated_at')->get();
        return response()->json($list);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $id = DB::table('demo')->insertGetId(
            ['data' => json_encode($input)]
        );
        return response()->json($id);
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
        $course = DB::table('demo')->find($id);
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
        $input = $request->all();
        $respond =  DB::table('demo')->where('id', $id)->update(['data' => json_encode($input), 'updated_at' =>now()]);
        return response()->json($respond);
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

    public function test(Request $request)
    {
        $input = $request->all();
        $id = DB::table('demo')->insertGetId(
            ['data' => json_encode($input), 'created_at' => now(), 'updated_at' => now()]
        );
        return response()->json($id);
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