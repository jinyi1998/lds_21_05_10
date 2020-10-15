<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Course;

class FileSystemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return response()->download(storage_path('app/public/course_temp.json'))->deleteFileAfterSend();
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

    public function json(Request $request)
    {
        $input = $request->all();
        Storage::disk('public')->put('course_temp.json', json_encode($input));
        return response('success');
        // return response()->download(storage_path('app/public/course_temp.json'))->deleteFileAfterSend();
    }

    public function apiFileCourseDownload($file_name){
        return response()->download(storage_path('app/public/'.$file_name))->deleteFileAfterSend();
    }

    public function exportCourseJson($id){
        $course = Course::with(['componentid', 'components', 'outcomes', 'outcomeid', 'lessons', 'lessonid'])->find($id);
        $file_name = 'course_temp'.$id.'.json';
        Storage::disk('public')->put($file_name, json_encode($course));
        return response($file_name);
    }
}
