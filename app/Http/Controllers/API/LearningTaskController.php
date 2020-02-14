<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LearningTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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

    public function getDefaultLearningTaskByComponent($id){
        $data = [
            "1" => [
                //task id => task
                [
                    "id" => 1,
                    "type" => "Receive Information",
                    "title" => "Students observe the scenario",
                    "assessment" => [],
                    "time" => 20,
                    "classType" =>  'Out Class',
                    "target" => 'Whole Class',
                    "resource" => ["Video"],
                    "STEMType" => ["Science", "Math", "Engineering"],
                    "description" => "Teachers can use video, news clips",
                ],
                [
                    "id" => 2,
                    "type" => "Discuss",
                    "title" => "Students discuss with the interviewee",
                    "assessment" => [],
                    "time" => 20,
                    "classType" => 'Out Class',
                    "target" => '4 per group',
                    "resource" => ["worksheet"],
                    "STEMType" => ["Science", "Math", "Engineering"],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                ],
                [
                    "id" => 3,
                    "type" => "Discuss",
                    "title" => "Students discuss within the group",
                    "assessment" => [],
                    "time" => 20,
                    "classType" => 'In Class',
                    "target" =>  '6 per group',
                    "resource" => ["Worksheet"],
                    "STEMType" => ["Science", "Math", "Engineering"],
                    "description" => "The design brief should focus on functional request of the product",
                ]
            ],
            "2" => [
                //task id => task
                [
                    "id" => 1,
                    "type" => "Receive Information",
                    "title" => "Students observe the scenario For Componet 2",
                    "assessment" => [],
                    "time" => 20,
                    "classType" =>  'Out Class',
                    "target" => '4 per group',
                    "resource" => ["Video"],
                    "STEMType" => ["Science", "Math", "Engineering"],
                    "description" => "Teachers can use video, news clips",
                ],
                [
                    "id" => 2,
                    "type" => "Discuss",
                    "title" => "Students discuss with the interviewee  For Componet 2",
                    "assessment" => [],
                    "time" => 20,
                    "classType" => 'In Class',
                    "target" => '5 per group',
                    "resource" => ["worksheet"],
                    "STEMType" => ["Science", "Math", "Engineering"],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                ],
            ],
            "3" => [
                [
                    "id" => 1,
                    "type" => "Receive Information",
                    "title" => "Students observe the scenario For Componet 3",
                    "assessment" => [],
                    "time" => 20,
                    "classType" => 'Out Class',
                    "target" => '4 per group',
                    "resource" => ["Video"],
                    "STEMType" => ["Science", "Math", "Engineering"],
                    "description" => "Teachers can use video, news clips",
                ],
                [
                    "id" => 2,
                    "type" => "Discuss",
                    "title" => "Students discuss with the interviewee  For Componet 3",
                    "assessment" => [],
                    "time" => 20,
                    "classType" => 'Out Class',
                    "target" => 'individual',
                    "resource" => ["worksheet"],
                    "STEMType" => ["Science", "Math", "Engineering"],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                ],
            ],
            "4" => [
                [
                    "id" => 1,
                    "type" => "Receive Information",
                    "title" => "Students observe the scenario For Componet 4",
                    "assessment" => [],
                    "time" => 20,
                    "classType" =>  'In Class',
                    "target" => 'individual',
                    "resource" => ["Video"],
                    "STEMType" => ["Science", "Math", "Engineering"],
                    "description" => "Teachers can use video, news clips",
                ],
                [
                    "id" => 2,
                    "type" => "Discuss",
                    "title" => "Students discuss with the interviewee  For Componet 4",
                    "assessment" => [],
                    "time" => 20,
                    "classType" => 'Out Class',
                    "target" => '4 per group',
                    "resource" => ["worksheet"],
                    "STEMType" => ["Science", "Math", "Engineering"],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                ],
            ]
        ];
        return response()->json(
           $data[$id]
        );
    }

    public function getTaskSizeOption(){
        return response()->json([
            [
                'id' => 1,
                'value'=> 1,
                'description' => 'Whole Class',
            ],
            [
                'id' => 2,
                'value'=> 2,
                'description' => '6 per group',
            ],
            [
                'id' => 3,
                'value'=> 3,
                'description' => '5 per group',
            ],
            [
                'id' => 4,
                'value'=> 4,
                'description' => '4 per group',
            ],
            [
                'id' => 5,
                'value'=> 5,
                'description' => '3 per group',
            ],
            [
                'id' => 6,
                'value'=> 6,
                'description' => '2 per group',
            ],
            [
                'id' => 7,
                'value'=> 7,
                'description' => 'individual',
            ],
        ]);
    }

    public function getTaskClassTypeOption(){
        return response()->json([
            [
                'id' => 1,
                'value'=> 'In Class',
                'description' => 'In Class',
            ],
            [
                'id' => 2,
                'value'=> 'Out Class',
                'description' => 'Out Class',
            ],
        ]);
    }

    public function getTaskTargetTypeOption(){
        return response()->json([
            [
                'id' => 1,
                'value'=> 'Whole Class',
                'description' => 'Whole Class',
            ],
            [
                'id' => 2,
                'value'=> '6 per group',
                'description' => '6 per group',
            ],
            [
                'id' => 3,
                'value'=> '5 per group',
                'description' => '5 per group',
            ],
            [
                'id' => 4,
                'value'=> '4 per group',
                'description' => '4 per group',
            ],
            [
                'id' => 5,
                'value'=> '3 per group',
                'description' => '3 per group',
            ],
            [
                'id' => 6,
                'value'=> '2 per group',
                'description' => '2 per group',
            ],
            [
                'id' => 7,
                'value'=> 'individual',
                'description' => 'individual',
            ],
        ]);
    }

    public function getTaskResourceTypeOption(){
        return response()->json([
            [
                'id' => 1,
                'value'=> 'Youtube',
                'description' => 'Youtube',
            ],
            [
                'id' => 2,
                'value'=> 'Facebook',
                'description' => 'Facebook',
            ],
            [
                'id' => 3,
                'value'=> 'Telegram',
                'description' => 'Telegram',
            ],
            [
                'id' => 4,
                'value'=> 'Wiki',
                'description' => 'Wikipedia',
            ],
            [
                'id' => 5,
                'value'=> 'textbook',
                'description' => 'Textbook',
            ],
            [
                'id' => 6,
                'value'=> 'lihkg',
                'description' => 'lihkg',
            ],
        ]);
    }
}
