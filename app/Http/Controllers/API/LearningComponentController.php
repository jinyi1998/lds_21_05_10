<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Component;
use App\ComponentTemplate;
use App\LearningPatternTemplate;
use App\LeariningTaskTemplate;
use App\ComponentPatternTemplateRelation;

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
        $component = Component::All();
        return  response()->json($component);

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
        $component = new Component;
        $component = LearningComponentController::save( $component, $request);

        return response()->json($component);
       
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
        $component = Component::with([
            'tasks', 
            'patterns',
            'outcomes',
            'outcomeid',
        ])->find($id);
        return  response()->json($component);
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
        $component = Component::find($id);
        $component = LearningComponentController::save( $component, $request);

        return response()->json($component);
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
    
    public function getDefaultLearningComponentByDesignType2($id){
        $data = [
            "1" => [
              1, 2, 3, 4, 5
            ],
            "2" => [
               6, 7, 8, 9, 10
            ],
        ];

        return response()->json(
            $data[$id]
        );
    }

    public static function getPatternOpts($id){
        $component = Component::find($id);
        $componentTemp = ComponentTemplate::find($component->component_template_id);
        return response()->json(
            $componentTemp->patterns
        );
    }

    public static function save(Component $component, Request $request){
        if($request->has('title')){
            $component->title = $request->title;
        }

        if($request->has('component_template_id')){
            $component->component_template_id = $request->component_template_id;
        }

        if($request->has('sequence')){
            $component->sequence = $request->sequence;
        }

        if($component->id > 0){
            // $component->title = $request->title;
        }else{
            $component->created_by = 1;
            $component->created_at = now();
        }
        // $component->component_template_id = $request->component_template_id;
        $component->updated_by = 1;
        $component->updated_at = now();
        $component->is_deleted = 0;

        $component->save();

        // outcomes
        if($request->has('outcomes')){
            foreach($request->outcomes as $_outcome){
                $_outcome['component_id'] =  $component->id;
                $request_outcome = new \Illuminate\Http\Request($_outcome);
                LearningOutcomesController::store($request_outcome);
            }
        }

        // pattern
        if($request->has('patterns')){
            $_pattern =  $request->patterns[0];
            $_pattern['component_id'] = $component->id;
            foreach(  $_pattern['tasks'] as $key => $_task){
                $_task['sequence'] = $key;
                $_pattern['tasks'][$key]['sequence'] = $key + 1;
            }
            $request_pattern = new \Illuminate\Http\Request( $_pattern);
            LearningPatternController::store($request_pattern);

            // foreach($request->patterns as $_pattern){
            //     $_pattern['component_id'] =  $component->id;
            //     $request_pattern = new \Illuminate\Http\Request($_pattern);
            //     LearningPatternController::store($request_pattern);
            // }
        }
       
        //tasks
        if($request->has('tasks')){
            foreach($request->tasks as $_task){
                $_task['component_id'] =  $component->id;
    
                $request_task = new \Illuminate\Http\Request($_task);
                LearningTaskController::store($request_task);
                 //add to component task relation
            }
        }

        if($request->has('course_id')){
            $component->courseid()->create([
                'course_id' => $request->course_id,
                'component_id' => $component->id,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => 0
            ]);
        }
        $component->save();
        return $component;
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
