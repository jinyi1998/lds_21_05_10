<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ComponentTemplate;

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
        $components = ComponentTemplate::all();
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
        return $this->save($component, $request);
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
        $component = ComponentTemplate::with(['patterns', 'outcomes', 'tasks'])->where('id', $id)->firstOrFail();
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
        return $this->save($component, $request);
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
            $component->created_by = 1;
            $component->created_at = now();
        }
        // $component->component_template_id = $request->component_template_id;
        $component->updated_by = 1;
        $component->updated_at = now();
        $component->is_deleted = 0;

        $component->save();

        // outcomes
        $outcome_asso = [];
        if($request->has('outcomes')){
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
            'created_by' => 1,
            'updated_by' => 1,
            'is_deleted' => 0
        ]);
        
        return $component;
    }
}
