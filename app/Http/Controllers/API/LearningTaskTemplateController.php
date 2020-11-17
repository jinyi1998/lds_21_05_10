<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\LearningTaskTemplate;
use App\TaskTemplateToolRelation;
use App\TaskTemplateResourceRelation;
use Illuminate\Support\Facades\DB;
use Auth;


class LearningTaskTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return response()->json(LearningTaskTemplate::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public static function store(Request $request)
    {
        //
        $task = new LearningTaskTemplate();
        if($request->has('pattern_id')){
            $count = DB::table('pattern_task_template_relation')->where('pattern_id', $request->pattern_id)->count();
            $request['sequence'] = $count + 1;
        }
        if($request->has('component_id')){
            $count = DB::table('component_task_template_relation')->where('component_id', $request->component_id)->count();
            $request['sequence'] = $count + 1;
        }
        return LearningTaskTemplateController::save($task, $request);
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
        $task = LearningTaskTemplate::with([
            'componentid',
            'assessmentid', 
            'resourceid', 
            'toolid',
            'patternid'
            ])->find($id);
        return response()->json($task);
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
        $task = LearningTaskTemplate::find($id);
        return $this->save($task, $request);
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
        $task = LearningTaskTemplate::find($id);
        $task->assessmentid()->delete();
        $task->resourceid()->delete();
        $task->toolid()->delete();
        $task->patternid()->delete();
        $task->componentid()->delete();
        $task->delete();
        return response()->json("");
    }

    public static function save(LearningTaskTemplate $task, Request $request){
        if($request->has('title')){
            $task->title = $request->title;
        }
        if($request->has('time')){
            $task->time = $request->time;
        }
        if($request->has('type')){
            $task->type = $request->type;
        }
        if($request->has('class_type')){
            $task->class_type = $request->class_type;
        }
        if($request->has('target')){
            $task->target = $request->target;
        }
        if($request->has('size')){
            $task->size = $request->size;
        }
        if($request->has('description')){
            $task->description = $request->description;
        }
        if($request->has('has_assessment')){
            $task->has_assessment = $request->has_assessment;
        }
        $task->is_deleted = 0;
        $task->created_by = Auth::user()->id;
        $task->updated_by = Auth::user()->id;
        $task->created_at = now();
        $task->updated_at = now();

        $task->save();
        //assessment
        if($request->has('component_id')){
            if($request->has('sequence')){
                $task->componentid()->delete();
                $task->componentid()->create([
                    'task_id' => $task->id,
                    'component_id' => $request->component_id,
                    'sequence' => $request->sequence,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                ]);
            }
        }

        if($request->has('pattern_id')){
            if($request->has('sequence')){
                $task->patternid()->delete();
                $task->patternid()->create([
                    'task_id' => $task->id,
                    'pattern_id' => $request->pattern_id,
                    'sequence' => $request->sequence,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                ]);
            }
        }

        // if($request->has('assessmentid') ){
        //     $task->assessmentid()->delete();
        //     foreach($request->assessmentid as $_assessment){
        //         $task->assessmentid()->create([
        //             'task_id' => $task->id,
        //             'learningoutcome_id' => $_assessment['learningoutcome_id'],
        //             'created_by' => 1,
        //             'updated_by' => 1,
        //             'is_deleted' => 0
        //         ]);
        //     }    
        // }
       
        //resource
        if($request->has('resourceid') ){
            $task->resourceid()->delete();
            foreach($request->resourceid as $_resource){
                $test = new TaskTemplateResourceRelation([
                    'resource_id' => $_resource['resource_id'],
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                    ]);
                $task->resourceid()->save($test);
            }
        }

        if($request->has('toolid') ){
            $task->toolid()->delete();
            foreach($request->toolid as $_tool){
                // return response($_assessment['learningoutcome_id'], 200);
                $test = new TaskTemplateToolRelation([
                    'elearningtool_id' => $_tool['elearningtool_id'],
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                    'is_deleted' => 0
                    ]);
                $task->toolid()->save($test);
            }
        }
        return $request;
    }


}
