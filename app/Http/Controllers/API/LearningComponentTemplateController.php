<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ComponentTemplate;
use Auth;


class LearningComponentTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $components = ComponentTemplate::with(['createdby', 'updatedby'])->get();
        return response()->json($components);
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
        $component = new ComponentTemplate();
        return response()->json($this->save($component, $request));
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
        $component = ComponentTemplate::with(['patterns', 'outcomes', 'tasks', 'designtype'])->where('id', $id)->firstOrFail();
        // foreach($temp as $item){
        //     print_r($item);
        // }
        return response()->json($component);
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
        $component = ComponentTemplate::find($id);
        return response()->json($this->save($component, $request));
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
        $component = ComponentTemplate::find($id);

        $component->designtypeid()->delete();     
        $component->tasks()->delete();
        $component->outcomes()->delete();
        $component->patternid()->delete();

        $component->delete();

        return response()->json();

    }

    public static function getPatternOpts($id){
        $componentTemp = ComponentTemplate::find($id);
        return response()->json(
            $componentTemp->patterns
        );
    }

    public static function save(ComponentTemplate $component, Request $request){
        if($request->has('title')){
            $component->title = $request->title;
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

        if($request->has('designtype_id')){
            $count = $component->designtypeid()->where( 'designtype_id', $request->designtype_id)->count();

            if($count > 0){

            }else{
                $component->designtypeid()->delete();
                $component->outcomes()->delete();
                $component->designtypeid()->create([
                    'designtype_id' =>  $request->designtype_id,
                    'component_id' => $component->id,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => false
                ]);
            }
        }

        // outcomes
        $outcome_asso = [];
        if($request->has('outcomes')){
        }

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

        // pattern
        if($request->has('patterns') && isset($request->patterns[0])){
            $_pattern =  $request->patterns[0];
            $_pattern['component_id'] = $component->id;
    
            $request_pattern = new \Illuminate\Http\Request( $_pattern);
            LearningPatternTemplateController::store($request_pattern);
        }
       
        //tasks
        if($request->has('tasks')){
            foreach($request->tasks as $_task){
                $_task['component_id'] =  $component->id;
                
                $request_task = new \Illuminate\Http\Request($_task);
                LearningTaskTemplateController::store($request_task);
                 //add to component task relation
            }
        }

        $component->save();

        $component = ComponentTemplate::with([
            'tasks', 
            'patterns'
        ])->find($component->id);
        return $component;
    }

    public function addPatternRelation(Request $request, $id){
        $pattern_id =  $request->pattern_id;
        $component = ComponentTemplate::find($id);
        $component->patternid()->create([
            'pattern_id' => $pattern_id,
            'component_id' => $component->id,
            'created_by' => Auth::user()->id,
            'updated_by' => Auth::user()->id,
            'is_deleted' => 0
        ]);
        
        return $component;
    }

    public function deletePatternRelation(Request $request, $id){
        $pattern_id =  $request->pattern_id;
        $component = ComponentTemplate::find($id);
        $component->patternid()->where('pattern_id', $pattern_id)->delete();
        
        return $component;
    }

    public function getInstructions($id){
        $component = ComponentTemplate::find($id);
        return response()->json($component->instructions);
    } 
}
