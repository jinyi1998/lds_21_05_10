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
                    'title' => 'Design Type 1: Item 1',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
                [
                    'id' => 2,
                    'title' => 'Design Type 1: Item 2',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
                [
                    'id' => 3,
                    'title' => 'Design Type 1: Item 3',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
            ],
            "2" => [
                [
                    'id' => 1,
                    'title' => 'Design Type 1: Item 1',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
                [
                    'id' => 2,
                    'title' => 'Design Type 1: Item 2',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
                [
                    'id' => 3,
                    'title' => 'Design Type 1: Item 3',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
            ],
            "3" => [
                [
                    'id' => 1,
                    'title' => 'Design Type 3: Item 1',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
                [
                    'id' => 2,
                    'title' => 'Design Type 3: Item 2',
                    'tasks' => [],
                    'learningOutcomes' => [

                    ],
                ],
                [
                    'id' => 3,
                    'title' => 'Design Type 3: Item 3',
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

}
