<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LearningComponentController extends Controller
{
    /** Data Template
     * 
     */

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
    
    public function getDefaultLearningComponentByDesignType($id){
        $data = [
            "1" => [
                [
                    'id' => 1,
                    'title' => 'Identify problem through goal-setting',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
                [
                    'id' => 2,
                    'title' => 'Ideate and design solution through self-planning ',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
                [
                    'id' => 3,
                    'title' => 'Construct prototype through self-monitoring',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
                [
                    'id' => 4,
                    'title' => 'Test performance of the product through self-evaluation',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
                [
                    'id' => 5,
                    'title' => 'Optimize the product through revision',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
            ],
            "2" => [
                [
                    'id' => 6,
                    'title' => 'Formulate inquiry questions through goal setting',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
                [
                    'id' => 7,
                    'title' => 'Research and Propose Hypothesis through goal setting',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
                [
                    'id' => 8,
                    'title' => 'Design Experiment through self-planning',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
                [
                    'id' => 9,
                    'title' => 'Conduct Experiment through self-monitoring',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
                [
                    'id' => 10,
                    'title' => 'Analyse Data and interpret results through self-evaluation and revision',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
            ],
            "3" => [
                [
                    'id' => 1,
                    'title' => 'Conduct Experiment through self-monitoring',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
                [
                    'id' => 2,
                    'title' => 'Ideate and design solution through self-planning ',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
                [
                    'id' => 3,
                    'title' => 'Analyse Data and interpret results through self-evaluation and revision',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
            ],
            "4" => [
                [
                    'id' => 1,
                    'title' => 'Design Type 4: Item 1',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
                [
                    'id' => 2,
                    'title' => 'Design Type 4: Item 2',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
                [
                    'id' => 3,
                    'title' => 'Design Type 4: Item 3',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
            ],
        ];

        return response()->json(
            $data[$id]
        );
    }

    public function getLearningComponentByDesignType($id){
        $data = [
            "1" => [
                [
                    'id' => 1,
                    'title' => 'Identify problem through goal-setting',
                    'tasks' => [],
                    'learningOutcomes' => [
                    ],
                ],
                [
                    'id' => 2,
                    'title' => 'Ideate and design solution through self-planning',
                    'tasks' => [],
                    'learningOutcomes' => [
                    ],
                ],
                [
                    'id' => 3,
                    'title' => 'Construct prototype through self-monitoring',
                    'tasks' => [],
                    'learningOutcomes' => [
                    ],
                ],
                [
                    'id' => 4,
                    'title' => 'Test performance of the product through self-evaluation',
                    'tasks' => [],
                    'learningOutcomes' => [
                    ],
                ],
                [
                    'id' => 5,
                    'title' => 'Optimize the product through revision',
                    'tasks' => [],
                    'learningOutcomes' => [
                    ],
                ],
            ],
            "2" => [
                [
                    'id' => 1,
                    'title' => 'Formulate inquiry questions through goal setting',
                    'tasks' => [],
                    'learningOutcomes' => [
                    ],
                ],
                [
                    'id' => 2,
                    'title' => 'Research and Propose Hypothesis through goal setting',
                    'tasks' => [],
                    'learningOutcomes' => [
                    ],
                ],
                [
                    'id' => 3,
                    'title' => 'Conduct Experiment through self-monitoring',
                    'tasks' => [],
                    'learningOutcomes' => [
                    ],
                ],
                [
                    'id' => 4,
                    'title' => 'Analyse Data and interpret results through self-evaluation and revision',
                    'tasks' => [],
                    'learningOutcomes' => [
                    ],
                ],
            ],
        ];

        return response()->json(
            $data[$id]
        );

    }

}
