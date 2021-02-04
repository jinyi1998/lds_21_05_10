<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Course;
use App\Component;

class CourseAnalysisController extends Controller
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
        $temp = Course::with(['components'])->find($id);
        
        //tasks time
        //tasks type

        #region task
        $tasks_time_by_type = [];
        $tasks_num_by_type = [];

        foreach($temp['components'] as $_component){
            // pattern
            if(isset($_component['patterns'])){
                foreach($_component['patterns'] as $_pattern){
                    if(isset($_pattern['tasks'])){
                        foreach($_pattern['tasks'] as $task){
                            if(!isset( $tasks_time_by_type[$task->type])){
                                $tasks_time_by_type[$task->type] = 0;
                                $tasks_num_by_type[$task->type] = 0;
                            }
                            $tasks_time_by_type[$task->type] +=  $task->time;
                            $tasks_num_by_type[$task->type] +=  1;
                        }
                    }
                }
            }
            
            // task
            if(isset($_component['tasks'])){
    
                foreach($_component['tasks'] as $task){
                    if(!isset( $taskstime[$task->type])){
                        $tasks_time_by_type[$task->type] = 0;
                        $tasks_num_by_type[$task->type] = 0;
                    }
                    $tasks_time_by_type[$task->type] +=  $task->time;
                    $tasks_num_by_type[$task->type] +=  1;
                }
            }

        }
      
        #endrehion

        $result['tasks_time_by_type'] = $tasks_time_by_type;
        $result['tasks_num_by_type'] = $tasks_num_by_type;
        return response()->json($result);
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
}
