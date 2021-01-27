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
            $clo_arr = [];
            foreach($request->outcomes_id as $_outcome_id){
                array_push($clo_arr, $_outcome_id['outcome_id']);
            }

            $lo = $component->outcomeid()->get();
            foreach( $lo as $clo){
                if(!in_array($clo->outcome_id, $clo_arr)){
                    $relatedtask = \App\TaskAssessmentRelation::where('learningoutcome_id', $clo['outcome_id'])->select('learningtask_id')->get();
                    foreach( $relatedtask as $_rtask){
                        $task = \App\LearningTask::with(['componentid', 'patternid'])->find($_rtask->learningtask_id);
        
                        if(!isset($task->componentid)){
                            //do nothing
                        }elseif($task->componentid->component_id == $component->id){
                            \App\TaskAssessmentRelation::where('learningoutcome_id', $clo['outcome_id'])->where('learningtask_id', $task->id)->delete();
                        }
                        if(!isset($task->patternid)){
                            //do nothing
                        }elseif($task->patternid->componentid->component_id == $component->id){
                            \App\TaskAssessmentRelation::where('learningoutcome_id', $clo['outcome_id'])->where('learningtask_id', $task->id)->delete();
                        }
                    }   
                }
            }
            $component->outcomeid()->delete();

            foreach($request->outcomes_id as $_outcome_id){
              
                // update or delete existing outcome
                $sequence = $component->outcomeid()->max('sequence');
                $component->outcomeid()->create([
                    "component_id" => $component->id,
                    "outcome_id" => $_outcome_id['outcome_id'],
                    "sequence" => $sequence + 1,
                    "is_deleted" => false,
                    "created_by" => Auth::user()->id,
                    "updated_by" => Auth::user()->id
                ]);
            }
        }
        // pattern
        if($request->has('patterns') && isset($request->patterns[0])){
            $_pattern =  $request->patterns[0];
            $_pattern['component_id'] = $component->id;
            foreach(  $_pattern['tasks'] as $key => $_task){
                $_task['sequence'] = $key;
                $_pattern['tasks'][$key]['sequence'] = $key + 1;
            }
            $request_pattern = new \Illuminate\Http\Request( $_pattern);
            LearningPatternController::store($request_pattern);
        }
       
        //tasks
        if($request->has('tasks')){
            foreach($request->tasks as $key => $_task){
                $_task['component_id'] =  $component->id;
                $_task['sequence'] = $key + 1;
                
                $request_task = new \Illuminate\Http\Request($_task);
                LearningTaskController::store($request_task);
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
            'outcomes',
            'outcomeid'
        ])->find($component->id);

        return $component;
    }
}
