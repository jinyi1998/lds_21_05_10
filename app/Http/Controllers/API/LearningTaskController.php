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

    public function getLearningTemplateList(){
        return response()->json(
            [
                [
                    'id' => 1,
                    'description' => 'Client interview',
                ],
                [
                    'id' => 2,
                    'description' => 'Brainstorming',
                ],
                [
                    'id' => 3,
                    'description' => 'Ideate design plans',
                ],
                [
                    'id' => 4,
                    'description' => 'Prototype construction',
                ],
                [
                    'id' => 5,
                    'description' => 'Competition',
                ],
                [
                    'id' => 6,
                    'description' => 'Client interview on the product efficacy',
                ],
                [
                    'id' => 7,
                    'description' => 'Product optimization',
                ],
                [
                    'id' => 8,
                    'description' => 'Predict-observe-explain',
                ],
                [
                    'id' => 9,
                    'description' => 'Ask questions about variables',
                ],
                [
                    'id' => 10,
                    'description' => 'Design fair test',
                ],
                [
                    'id' => 11,
                    'description' => 'Conduct experiments',
                ],
                [
                    'id' => 12,
                    'description' => 'Data analysis and scientific reasoning',
                ],
            ]
        );

    }

    public function getLearningPatternByComponent($id){
        $data = [
            "1" => [
               1, 2
            ],
            "2" => [
                3
            ],
            "3" => [
                4
            ],
            "4" => [
                5, 6
            ],
            "5" => [
                7
             ],
            "6" => [
                8
             ],
            "7" => [
                9
             ],
            "8" => [
                10
             ],
            "9" => [
                11
             ],
            "10" => [
                12
             ],
        ];
        
        return response()->json(
            $data[$id]
         );

    }

    public function getLearningTaskByPattern($id){
        $data = [
            "1" => [
                //task id => task
                [
                    "id" => 1,
                    "type" => 1,
                    "title" => "Students observe the scenario of the design problem through stimulus",
                    "assessment" => [],
                    "time" => 5,
                    "classType" =>  1,
                    "target" => 1,
                    "size"=> 2,
                    "resource" => [1],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 2,
                    "type" => 2,
                    "title" => "Students conduct a client interview to understand the design needs",
                    "assessment" => [],
                    "time" => 15,
                    "classType" => 1,
                    "target" => 2,
                    "size"=> 2,
                    "resource" => [2],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 3,
                    "type" => 3,
                    "title" => "Students work on the information collected from the interview, 
                    and select the most prominent problem needed to be addressed.",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" =>  2,
                    "size"=> 2,
                    "resource" => [2,3],
                    "e_resource" => [],
                    "description" => "The design brief should focus on functional request of the product",
                    "content" => ""
                ],
                [
                    "id" => 4,
                    "type" => 4,
                    "title" => "Students present their findings on user needs to the whole class",
                    "assessment" => [],
                    "time" => 5,
                    "classType" => 1,
                    "target" =>  1,
                    "size"=> 2,
                    "resource" => [2,3],
                    "e_resource" => [],
                    "description" => "The design brief should focus on functional request of the product",
                    "content" => ""
                ],
            ],
            "2" => [
                //task id => task
                [
                    "id" => 1,
                    "type" => 1,
                    "title" => "Students observe the scenario of the design problem through stimulus",
                    "assessment" => [],
                    "time" => 5,
                    "classType" =>  1,
                    "target" => 1,
                    "size"=> 2,
                    "resource" => [1],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 2,
                    "type" => 2,
                    "title" => "Students discuss the needs of users",
                    "assessment" => [],
                    "time" => 15,
                    "classType" => 1,
                    "target" => 2,
                    "size"=> 2,
                    "resource" => [2],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 3,
                    "type" => 3,
                    "title" => "Students work on indentifying the most 
                    prominent problem needed to be addressed.",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" =>  2,
                    "size"=> 2,
                    "resource" => [2,3],
                    "e_resource" => [],
                    "description" => "The design brief should focus on functional request of the product",
                    "content" => ""
                ],
                [
                    "id" => 4,
                    "type" => 4,
                    "title" => "Students present their findings on user needs to the whole class",
                    "assessment" => [],
                    "time" => 5,
                    "classType" => 1,
                    "target" =>  1,
                    "size"=> 2,
                    "resource" => [2,3],
                    "e_resource" => [],
                    "description" => "The design brief should focus on functional request of the product",
                    "content" => ""
                ],
            ],
            "3" => [
                //task id => task
              
                [
                    "id" => 6,
                    "type" => 5,
                    "title" => "Students search and study existing solutions to the users needs.",
                    "assessment" => [],
                    "time" => 30,
                    "classType" => 2,
                    "target" => 1,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 7,
                    "type" => 2,
                    "title" => "Students brainstorm on their findings, and converge on one best/feasible solution.",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 2,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
                [
                    "id" => 8,
                    "type" => 3,
                    "title" => "Students work out a plan/draw sketch design to construct prototype",
                    "assessment" => [],
                    "time" => 15,
                    "classType" => 1,
                    "target" => 1,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
                [
                    "id" => 9,
                    "type" => 6,
                    "title" => "Students receive feedback and comments from teachers and other students",
                    "assessment" => [],
                    "time" => 5,
                    "classType" => 1,
                    "target" => 1,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
                [
                    "id" => 10,
                    "type" => 7,
                    "title" => "Students revise the design problem based on the feedback received.",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 1,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
            ],
            "4" => [
                [
                    "id" => 11,
                    "type" => 2,
                    "title" => "Group discussion to identify the factors to be evaluate 
                    the prototype that fulfills users' need",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 2,
                    "size"=> 4,
                    "resource" => [4],
                    "e_resource" => [],
                    "description" => "Teachers can use video, news clips",
                    "content" => ""
                ],
                [
                    "id" => 12,
                    "type" => 3,
                    "title" => "Students list criteria/rubric used to evaluate 
                    the effectiveness of the prototype",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 2,
                    "target" => 2,
                    "size"=> 3,
                    "resource" => [1, 2],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
                [
                    "id" => 13,
                    "type" => 8,
                    "title" => "Students explores the materials",
                    "assessment" => [],
                    "time" => 60,
                    "classType" => 2,
                    "target" => 2,
                    "size"=> 4,
                    "resource" => [4],
                    "e_resource" => [],
                    "description" => "Teachers can use video, news clips",
                    "content" => ""
                ],
                [
                    "id" => 14,
                    "type" => 3,
                    "title" => "Students produce an early, inexpensive, and scaled down version of the product ",
                    "assessment" => [],
                    "time" => 60,
                    "classType" => 2,
                    "target" => 2,
                    "size"=> 3,
                    "resource" => [1, 2],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
            ],
            "5" => [
                [
                    "id" => 15,
                    "type" => 5,
                    "title" => "Students receive teachers' instruction on the success criteria of the competition",
                    "assessment" => [],
                    "time" => 5,
                    "classType" =>  2,
                    "target" => 2,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "Teachers can use video, news clips",
                    "content" => ""
                ],
                [
                    "id" => 16,
                    "type" => 6,
                    "title" => "Students perform their product",
                    "assessment" => [],
                    "time" => 30,
                    "classType" => 1,
                    "target" => 3,
                    "size"=> 5,
                    "resource" => [ 3, 4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
                [
                    "id" => 17,
                    "type" => 6,
                    "title" => "Students self/peer evaluate the performance of their products based on the rubrics.",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 3,
                    "size"=> 5,
                    "resource" => [ 3, 4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
            ],
            "6" => [
                [
                    "id" => 15,
                    "type" => 1,
                    "title" => "Students receive teachers' instruction on 
                    conducting a client interview for the effectiveness of the product.",
                    "assessment" => [],
                    "time" => 5,
                    "classType" =>  1,
                    "target" => 1,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 16,
                    "type" => 6,
                    "title" => "Students conduct a client interview to 
                    collect the feedback from the users who try out the products",
                    "assessment" => [],
                    "time" => 15,
                    "classType" => 1,
                    "target" => 1,
                    "size"=> 5,
                    "resource" => [ 3, 4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
                [
                    "id" => 17,
                    "type" => 6,
                    "title" => "Students self/peer evaluate the 
                    performance of their products based on the rubrics..",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 1,
                    "size"=> 5,
                    "resource" => [ 3, 4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
            ],
            "7" => [
                [
                    "id" => 18,
                    "type" => 5,
                    "title" => "Students analyze the feedback from users/teachers, and search methods to optimie the product",
                    "assessment" => [],
                    "time" => 30,
                    "classType" =>  2,
                    "target" => 2,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "Teachers can use video, news clips",
                    "content" => ""
                ],
                [
                    "id" => 19,
                    "type" => 6,
                    "title" => "Students brainstorm on their findings, and converge on one best/feasible solution.",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 3,
                    "size"=> 5,
                    "resource" => [ 3, 4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
                [
                    "id" => 20,
                    "type" => 6,
                    "title" => "Students work out a plan/draw sketch design to construct prototype",
                    "assessment" => [],
                    "time" => 15,
                    "classType" => 1,
                    "target" => 3,
                    "size"=> 5,
                    "resource" => [ 3, 4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
                [
                    "id" => 21,
                    "type" => 6,
                    "title" => "Students work on the product optimization",
                    "assessment" => [],
                    "time" => 30,
                    "classType" => 1,
                    "target" => 3,
                    "size"=> 5,
                    "resource" => [ 3, 4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
            ],
            "8" => [
                //task id => task
                [
                    "id" => 1,
                    "type" => 1,
                    "title" => "Students observe the scenario of the design problem through stimulus",
                    "assessment" => [],
                    "time" => 5,
                    "classType" =>  1,
                    "target" => 1,
                    "size"=> 1,
                    "resource" => [1],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 2,
                    "type" => 7,
                    "title" => "Based on the scenario, 
                    students predict what would happen when a particular variable change.",
                    "assessment" => [],
                    "time" => 5,
                    "classType" => 1,
                    "target" => 3,
                    "size"=> 1,
                    "resource" => [2],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 3,
                    "type" => 2,
                    "title" => "Students discuss and explain what has been observed: whether and why",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" =>  2,
                    "size"=> 3,
                    "resource" => [2,3],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 4,
                    "type" => 3,
                    "title" => "Students write down the inquiry questions and shared with the whole class",
                    "assessment" => [],
                    "time" => 5,
                    "classType" => 2,
                    "target" =>  1,
                    "size"=> 1,
                    "resource" => [2,3],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
            ],
            "9" => [
                //task id => task
                [
                    "id" => 1,
                    "type" => 1,
                    "title" => "Students search and explore new 
                    relevant information about the variables of the problem ",
                    "assessment" => [],
                    "time" => 30,
                    "classType" =>  2,
                    "target" => 3,
                    "size"=> 1,
                    "resource" => [1],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 2,
                    "type" => 2,
                    "title" => "Group discussion and come up with some hypothesis",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 2,
                    "size"=> 3,
                    "resource" => [2],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 3,
                    "type" => 3,
                    "title" => "Write down the hypothesis and
                     share with the whole class",
                    "assessment" => [],
                    "time" => 5,
                    "classType" => 1,
                    "target" =>  2,
                    "size"=> 3,
                    "resource" => [2,3],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 4,
                    "type" => 6,
                    "title" => "Students receive feedback and
                     comments from teachers and other students",
                    "assessment" => [],
                    "time" => 5,
                    "classType" => 1,
                    "target" =>  1,
                    "size"=> 1,
                    "resource" => [2,3],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 5,
                    "type" => 7,
                    "title" => "Students revise the hypothesis
                     based on the feedback received.",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" =>  1,
                    "size"=> 1,
                    "resource" => [2,3],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
            ],
            "10" => [
                [
                    "id" => 11,
                    "type" => 2,
                    "title" => "Group discussion to differentiate dependent/independent/control
                     varibles and design instrument to measure the variables",
                    "assessment" => [],
                    "time" => 15,
                    "classType" => 1,
                    "target" => 2,
                    "size"=> 4,
                    "resource" => [4],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 12,
                    "type" => 3,
                    "title" => "Students write a plan of scientific inquiry",
                    "assessment" => [],
                    "time" => 15,
                    "classType" => 1,
                    "target" => 2,
                    "size"=> 4,
                    "resource" => [1, 2],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 13,
                    "type" => 9,
                    "title" => "Students reflect on the alignmennt between hypothesis and inquiry methods,
                     as well as other practical issues of the experiment design",
                    "assessment" => [],
                    "time" => 5,
                    "classType" => 2,
                    "target" => 3,
                    "size"=> 1,
                    "resource" => [4],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 14,
                    "type" => 7,
                    "title" => "Students revise and finalize the plan",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 2,
                    "size"=> 4,
                    "resource" => [1, 2],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
            ],
            "11" => [
                //task id => task
              
                [
                    "id" => 6,
                    "type" => 2,
                    "title" => "Group discussion to identify the factors to be monitored for 
                    the successful implementation of the experiment plan",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 2,
                    "target" => 2,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 7,
                    "type" => 3,
                    "title" => "List criteria/rubric used to evaluate the success of the experiment ",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 2,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 8,
                    "type" => 8,
                    "title" => "Conduct the experiment, observe the phenomena and record the data",
                    "assessment" => [],
                    "time" => 20,
                    "classType" => 1,
                    "target" => 2,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 9,
                    "type" => 6,
                    "title" => "Conduct self-/peer-assessment
                     on the experiment procedure to identify the areas of improvement",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 2,
                    "size"=> 1,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 10,
                    "type" => 7,
                    "title" => "Improve the experienment design and operation",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 2,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 11,
                    "type" => 3,
                    "title" => "Summarize and display the data in the form of spreadsheets, tables, or charts.",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 2,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
            ],
            "12" => [
                [
                    "id" => 15,
                    "type" => 9,
                    "title" => "Students identify causal and correlational relationship of different groups of data sets.",
                    "assessment" => [],
                    "time" => 5,
                    "classType" =>  1,
                    "target" => 3,
                    "size"=> 1,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 16,
                    "type" => 9,
                    "title" => "Students choose valid and reliable evidences that support the claims",
                    "assessment" => [],
                    "time" => 5,
                    "classType" => 1,
                    "target" => 3,
                    "size"=> 1,
                    "resource" => [ 3, 4],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 17,
                    "type" => 9,
                    "title" => "Students apply scientific
                     principles/theories to construct an explanation for the results.",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 3,
                    "size"=> 1,
                    "resource" => [ 3, 4],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 18,
                    "type" => 9,
                    "title" => "Students write down their statements
                     on the process of scientific reasoning",
                    "assessment" => [],
                    "time" => 5,
                    "classType" =>  1,
                    "target" => 3,
                    "size"=> 1,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 19,
                    "type" => 9,
                    "title" => "Conduct self-assessment on the scientific
                     reasoning process (claim, evidence, reasoning )",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 1,
                    "size"=> 1,
                    "resource" => [ 3, 4],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 20,
                    "type" => 7,
                    "title" => "Students improve the process of scientific reasoning",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 2,
                    "size"=> 1,
                    "resource" => [ 3, 4],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 21,
                    "type" => 10,
                    "title" => "Students construct graphical displays to illustrate the
                     relationships of the variables, and present to the whole class",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 1,
                    "size"=> 1,
                    "resource" => [ 3, 4],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
            ],
        ];
        return response()->json(
            $data[$id]
         );
    }

    public function getLearningPatternOpts(){
        $data = [
            [
                "id" => 1,
                "description" => "Pattern 1: Client interview"
            ],
            [
                "id" => 2,
                "description" => "Pattern 2: Brainstorming"
            ],
            [
                "id" => 3,
                "description" => "Pattern 3: Ideate design plans"
            ],
            [
                "id" => 4,
                "description" => "Pattern 4: Prototype construction"
            ],
            [
                "id" => 5,
                "description" => "Pattern 5: Competition"
            ],
            [
                "id" => 6,
                "description" => "Pattern 6: Client interview on the product efficacy"
            ],
            [
                "id" => 7,
                "description" => "Pattern 7: Product optimization"
            ],
            [
                "id" => 8,
                "description" => "Pattern 1: Predict-observe-explain"
            ],
            [
                "id" => 9,
                "description" => "Pattern 2: Ask questions about variables"
            ],
            [
                "id" => 10,
                "description" => "Pattern 3: Design fair test"
            ],
            [
                "id" => 11,
                "description" => "Pattern 4: Conduct experiments"
            ],
            [
                "id" => 12,
                "description" => "Pattern 5: Data analysis and scientific reasoning"
            ],
        ];
        return response()->json(
            $data
         );
    }

    public function getDefaultLearningTaskByComponent($id){
        $data = [
            "1" => [
                //task id => task
                [
                    "id" => 1,
                    "type" => 1,
                    "title" => "Students conduct a client interview to understand the design needs",
                    "assessment" => [],
                    "time" => 5,
                    "classType" =>  1,
                    "target" => 1,
                    "size"=> 2,
                    "resource" => [1],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 2,
                    "type" => 2,
                    "title" => "Students conduct a client interview to understand the design needs",
                    "assessment" => [],
                    "time" => 15,
                    "classType" => 1,
                    "target" => 2,
                    "size"=> 2,
                    "resource" => [2],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 3,
                    "type" => 3,
                    "title" => "Students work on the information collected from the interview, 
                    and select the most prominent problem needed to be addressed.",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" =>  2,
                    "size"=> 2,
                    "resource" => [2,3],
                    "e_resource" => [],
                    "description" => "The design brief should focus on functional request of the product",
                    "content" => ""
                ],
                [
                    "id" => 4,
                    "type" => 4,
                    "title" => "Students present their findings on user needs to the whole class",
                    "assessment" => [],
                    "time" => 5,
                    "classType" => 1,
                    "target" =>  1,
                    "size"=> 2,
                    "resource" => [2,3],
                    "e_resource" => [],
                    "description" => "The design brief should focus on functional request of the product",
                    "content" => ""
                ],
            ],
            "2" => [
                //task id => task
              
                [
                    "id" => 6,
                    "type" => 5,
                    "title" => "Students search and study existing solutions to the users needs.",
                    "assessment" => [],
                    "time" => 30,
                    "classType" => 2,
                    "target" => 1,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "",
                    "content" => ""
                ],
                [
                    "id" => 7,
                    "type" => 2,
                    "title" => "Students brainstorm on their findings, and converge on one best/feasible solution.",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 2,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
                [
                    "id" => 8,
                    "type" => 3,
                    "title" => "Students work out a plan/draw sketch design to construct prototype",
                    "assessment" => [],
                    "time" => 15,
                    "classType" => 1,
                    "target" => 1,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
                [
                    "id" => 9,
                    "type" => 6,
                    "title" => "Students receive feedback and comments from teachers and other students",
                    "assessment" => [],
                    "time" => 5,
                    "classType" => 1,
                    "target" => 1,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
                [
                    "id" => 10,
                    "type" => 7,
                    "title" => "Students revise the design problem based on the feedback received.",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 1,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
            ],
            "3" => [
                [
                    "id" => 11,
                    "type" => 2,
                    "title" => "Group discussion to identify the factors to be evaluate 
                    the prototype that fulfills users' need",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 2,
                    "size"=> 4,
                    "resource" => [4],
                    "e_resource" => [],
                    "description" => "Teachers can use video, news clips",
                    "content" => ""
                ],
                [
                    "id" => 12,
                    "type" => 3,
                    "title" => "Students list criteria/rubric used to evaluate 
                    the effectiveness of the prototype",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 2,
                    "target" => 2,
                    "size"=> 3,
                    "resource" => [1, 2],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
                [
                    "id" => 13,
                    "type" => 8,
                    "title" => "Students explores the materials",
                    "assessment" => [],
                    "time" => 60,
                    "classType" => 2,
                    "target" => 2,
                    "size"=> 4,
                    "resource" => [4],
                    "e_resource" => [],
                    "description" => "Teachers can use video, news clips",
                    "content" => ""
                ],
                [
                    "id" => 14,
                    "type" => 3,
                    "title" => "Students produce an early, inexpensive, and scaled down version of the product ",
                    "assessment" => [],
                    "time" => 60,
                    "classType" => 2,
                    "target" => 2,
                    "size"=> 3,
                    "resource" => [1, 2],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
            ],
            "4" => [
                [
                    "id" => 15,
                    "type" => 5,
                    "title" => "Students receive teachers' instruction on the success criteria of the competition",
                    "assessment" => [],
                    "time" => 5,
                    "classType" =>  2,
                    "target" => 2,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "Teachers can use video, news clips",
                    "content" => ""
                ],
                [
                    "id" => 16,
                    "type" => 6,
                    "title" => "Students perform their product",
                    "assessment" => [],
                    "time" => 30,
                    "classType" => 1,
                    "target" => 3,
                    "size"=> 5,
                    "resource" => [ 3, 4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
                [
                    "id" => 17,
                    "type" => 6,
                    "title" => "Students self/peer evaluate the performance of their products based on the rubrics.",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 3,
                    "size"=> 5,
                    "resource" => [ 3, 4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
            ],
            "5" => [
                [
                    "id" => 18,
                    "type" => 5,
                    "title" => "Students analyze the feedback from users/teachers, and search methods to optimie the product",
                    "assessment" => [],
                    "time" => 30,
                    "classType" =>  2,
                    "target" => 2,
                    "size"=> 3,
                    "resource" => [3,4],
                    "e_resource" => [],
                    "description" => "Teachers can use video, news clips",
                    "content" => ""
                ],
                [
                    "id" => 19,
                    "type" => 6,
                    "title" => "Students brainstorm on their findings, and converge on one best/feasible solution.",
                    "assessment" => [],
                    "time" => 10,
                    "classType" => 1,
                    "target" => 3,
                    "size"=> 5,
                    "resource" => [ 3, 4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
                [
                    "id" => 20,
                    "type" => 6,
                    "title" => "Students work out a plan/draw sketch design to construct prototype",
                    "assessment" => [],
                    "time" => 15,
                    "classType" => 1,
                    "target" => 3,
                    "size"=> 5,
                    "resource" => [ 3, 4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
                [
                    "id" => 21,
                    "type" => 6,
                    "title" => "Students work on the product optimization",
                    "assessment" => [],
                    "time" => 30,
                    "classType" => 1,
                    "target" => 3,
                    "size"=> 5,
                    "resource" => [ 3, 4],
                    "e_resource" => [],
                    "description" => "Teachers can introduce the interview technique for each group and guide their thinking",
                    "content" => ""
                ],
            ]
        ];
        return response()->json(
           $data[$id]
        );
    }

    public function getTaskTypeOption(){
        return response()->json([
            [
                'id' => 1,
                'description' => 'Receiving and interpreting information'
            ],
            [
                'id' => 2,
                'description' => 'Exploration through conversation'
            ],
            [
                'id' => 3,
                'description' => 'Construction: Conceptual/visual artefacts'
            ],
            [
                'id' => 4,
                'description' => 'Presentation, performance and illustration'
            ],
            [
                'id' => 5,
                'description' => 'Informaton exploration'
            ],
            [
                'id' => 6,
                'description' => 'Self/Peer-Assessment'
            ],
            [
                'id' => 7,
                'description' => 'Revision'
            ],
            [
                'id' => 8,
                'description' => 'Tangible/immersive investigation'
            ],
            [
                'id'=> 9,
                'description' => 'Reflection'
            ],
            [
                'id'=> 10,
                'description' => 'Presentations, illustration, and performance'
            ]
        ]);
    }

    public function getTaskSizeOption(){
        return response()->json([
            [
                'id' => 1,
                'value'=> 1,
                'description' => 'N/A',
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
                'description' => 'Whole Class',
            ],
            [
                'id' => 2,
                'description' => 'Group',
            ],
            [
                'id' => 3,
                'description' => 'Individual',
            ],
        ]);
    }

    public function getTaskResourceTypeOption(){
        return response()->json([
            [
                'id' => 1,
                'description' => 'Videos',
            ],
            [
                'id' => 2,
                'description' => 'Articles',
            ],
            [
                'id' => 3,
                'description' => 'Worksheets',
            ],
            [
                'id' => 4,
                'description' => 'Rubrics',
            ],
            [
                'id' => 5,
                'description' => 'Materials',
            ],
            [
                'id' => 6,
                'description' => 'Guidelines',
            ],
        ]);
    }

    public function getTaskELeraningResourceTypeOption(){
        return response()->json(
            [
                [
                    'id' => 1,
                    'description' => 'Moodle (discussion forum)',
                ],
                [
                    'id' => 2,
                    'description' => 'Moodle (wiki)',
                ],
                [
                    'id' => 3,
                    'description' => 'Moodle (portfolio)',
                ],
                [
                    'id' => 4,
                    'description' => 'Moodle (Polling/ survey)',
                ],
                [
                    'id' => 5,
                    'description' => 'Instant messenger',
                ],
                [
                    'id' => 6,
                    'description' => 'Video conferencing system',
                ],
                [
                    'id' => 7,
                    'description' => 'Google toolkits',
                ],
            ]
        );
    }
}
