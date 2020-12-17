<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Component;
use App\ComponentTemplate;
use App\LearningPatternTemplate;
use App\LeariningTaskTemplate;
use App\ComponentPatternTemplateRelation;
use App\LearningOutcomeTemplate;
use Illuminate\Support\Facades\DB;
use Auth;

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
            'patterntaskid',
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
        $component = Component::find($id);

        $component->delete();

        return response()->json('success');
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
            $component->created_by = Auth::user()->id;
            $component->created_at = now();
        }
        // $component->component_template_id = $request->component_template_id;
        $component->updated_by = Auth::user()->id;
        $component->updated_at = now();
        $component->is_deleted = 0;

        $component->save();


        // outcomes relation
        if($request->has('outcomes_id')){
            //clear all learning outcomes for this component
            $component->outcomeid()->delete();
            foreach($request->outcomes_id as $_outcome_id){
                $sequence = $component->outcomeid()->count();
                $component->outcomeid()->create([
                    "component_id" => $component->id,
                    "outcome_id" => $_outcome_id['outcome_id'],
                    "sequence" => $sequence,
                    "is_deleted" => false,
                    "created_by" => Auth::user()->id,
                    "updated_by" => Auth::user()->id
                ]);
            }
        }
        // outcomes
        $outcome_asso = [];
        if($request->has('outcomes')){
            // foreach($request->outcomes as $_outcome){
            //     $_outcome['component_id'] =  $component->id;
            //     //

            //     if($request->has('course_id') && isset($_outcome['unit_outcomeid_temp'])  && $_outcome['unit_outcomeid_temp'] != null ){
            //         // $_outcome['unit_outcome_id'] =  $_outcome['unit_outcome_id']->;
            //         $count = DB::table('course_outcome_relation') 
            //         ->join('learningoutcome', 'learningoutcome.id', '=', 'course_outcome_relation.outcome_id')
            //         ->where('learningoutcome.template_id', '=', $_outcome['unit_outcomeid_temp']['unit_outcome_id'])
            //         ->where('course_outcome_relation.course_id', '=', $request->course_id)
            //         ->count();

            //         if($count > 0){
            //             $uloid = DB::table('course_outcome_relation') 
            //             ->join('learningoutcome', 'learningoutcome.id', '=', 'course_outcome_relation.outcome_id')
            //             ->where('learningoutcome.template_id', '=', $_outcome['unit_outcomeid_temp']['unit_outcome_id'])
            //             ->where('course_outcome_relation.course_id', '=', $request->course_id)
            //             ->select('learningoutcome.id as outcome_id')->limit(1)->get();
    
            //             $uloid = json_decode($uloid, true);
                        
            //             $_outcome['unit_outcome_id'] =  $uloid[0]['outcome_id'];
            //         }else{
            //             $new_unit_outcome = LearningOutcomeTemplate::where('id',  $_outcome['unit_outcomeid_temp']['unit_outcome_id'])->get();
            //             $new_unit_outcome = json_decode($new_unit_outcome, true);
            //             $new_unit_outcome[0]['course_id'] = $request->course_id;
            //             $new_unit_outcome[0]['template_id'] = $new_unit_outcome[0]['id'];
            //             $request_new_unit_outcome = new \Illuminate\Http\Request($new_unit_outcome[0]);
            //             $new_unit_outcome = LearningOutcomesController::store($request_new_unit_outcome)->getContent();
            //             $new_unit_outcome = json_decode($new_unit_outcome);

            //             $_outcome['unit_outcome_id'] =  $new_unit_outcome->id;
            //         }

                 
            //     }else if($request->has('course_id') && isset($_outcome['unit_outcomeid'])  && $_outcome['unit_outcomeid'] != null ){
            //         // do nothing
            //         $_outcome['unit_outcome_id'] =  $_outcome['unit_outcomeid']['unit_outcomeid'];
            //     }

            //     $request_outcome = new \Illuminate\Http\Request($_outcome);
            //     $outcome = LearningOutcomesController::store($request_outcome)->getContent();
            //     $outcome = json_decode($outcome);
            //     $temp["outcome_template_id"] = $_outcome['id'];
            //     $temp["outcome_id"] = $outcome->id;
            //     array_push($outcome_asso, $temp);
            // }
        }

        // pattern
        if($request->has('patterns') && isset($request->patterns[0])){
            $_pattern =  $request->patterns[0];
            $_pattern['component_id'] = $component->id;
            foreach(  $_pattern['tasks'] as $key => $_task){
                $_task['sequence'] = $key;
                $_pattern['tasks'][$key]['sequence'] = $key + 1;

                foreach($outcome_asso as $_outcome_asso){
                    if(!isset($_task['assessmentid'])){
                        continue;
                    }
                   foreach($_task['assessmentid'] as $assessment_key => $_assessment){
                        if($_task['assessmentid'][$assessment_key]['learningoutcome_id'] == $_outcome_asso['outcome_template_id']){
                            $_pattern['tasks'][$key]['assessmentid'][$assessment_key]['learningoutcome_id'] = $_outcome_asso['outcome_id'];
                            // return $_assessment;
                        }
                   }
                }
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
            foreach($request->tasks as $key => $_task){
                $_task['component_id'] =  $component->id;
                $_task['sequence'] = $key + 1;

                // foreach($outcome_asso as $_outcome_asso){
                //     foreach($_task['assessmentid'] as $assessment_key => $_assessment){
                //         if($_assessment['learningoutcome_id'] == $_outcome_asso['outcome_template_id']){
                //             $_task['assessmentid'][$assessment_key]['learningoutcome_id'] = $_outcome_asso['outcome_id'];
                //         }
                //     }
                // }
                
                $request_task = new \Illuminate\Http\Request($_task);
                LearningTaskController::store($request_task);
                 //add to component task relation
            }
        }

        if($request->has('course_id')){
            $component->courseid()->create([
                'course_id' => $request->course_id,
                'component_id' => $component->id,
                'created_by' => Auth::user()->id,
                'updated_by' => Auth::user()->id,
                'is_deleted' => 0
            ]);
        }
        $component->save();

        $component = Component::with([
            'tasks', 
            'patterns',
            'outcomes'
        ])->find($component->id);

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
}
