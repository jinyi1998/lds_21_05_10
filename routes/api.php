<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::resource('opts', 'API\AppOptsController');
Route::get('course/{id}', 'API\CourseController@show');

Route::middleware(['auth:api'])->group(function () {
    //File System
    Route::post('file/json', 'API\FileSystemController@json');
    Route::get('file/exportCourseJson/{id}', 'API\FileSystemController@exportCourseJson');
    Route::get('file', 'API\FileSystemController@index');

    //Learning Outcome
    Route::delete('learningOutcome/destroyComponentRelation/{outcome_id}/{component_id}', 'API\LearningOutcomesController@destroyComponentRelation');
    Route::resource('learningOutcome', 'API\LearningOutcomesController');

    //Learning Outcome Relation
    Route::resource('courseOutcomeRelation', 'API\CourseOutcomeRelationController');
    Route::resource('componentOutcomeRelation', 'API\ComponentOutcomeRelationController');

    //Learning Component Controller
    Route::get('learningComponent/getPatternOpts/{id}', 
    'API\LearningComponentController@getPatternOpts');

    Route::middleware('design_permission')->resource('learningComponent', 'API\LearningComponentController');

    //Learning Component Task Relation Controller
    Route::resource('componentTaskRelation', 'API\ComponentTaskController');

    //Lesson Task Relation Controller
    Route::resource('lessonTaskRelation', 'API\LessonTaskRelationController');

    //Learning Pattern Controller
    Route::put('learningPattern/unlockPattern/{id}', 
    'API\LearningPatternController@unlockPattern');
    Route::middleware('design_permission')->resource('learningPattern', 
    'API\LearningPatternController');


    //Learning Task Controller
    Route::get('learningTask/getLearningPatternOpts', 
    'API\LearningTaskController@getLearningPatternOpts');
    Route::middleware('design_permission')->resource('learningTask', 'API\LearningTaskController');

    //Learning Lesson
    Route::resource('lesson', 'API\LessonController');

    Route::resource('courseanalysis', 'API\CourseAnalysisController');
    Route::resource('componentanalysis', 'API\LearningComponentAnalysisController');
    Route::resource('lessonanalysis', 'API\LessonAnalysisController');

    //template related
    Route::resource('learningComponentTemplate', 'API\LearningComponentTemplateController');
    Route::get('learningComponentTemplate/getPatternOpts/{id}', 
    'API\LearningComponentTemplateController@getPatternOpts');
    Route::get('learningComponentTemplate/getInstructions/{id}', 
    'API\LearningComponentTemplateController@getInstructions');
    Route::post('learningComponentTemplate/addPatternRelation/{id}', 
    'API\LearningComponentTemplateController@addPatternRelation');
    Route::put('learningComponentTemplate/deletePatternRelation/{id}', 
    'API\LearningComponentTemplateController@deletePatternRelation');

    Route::post('componentInstruction/uploadImg', 
    'API\LearningComponentInstructionController@uploadImg');
    Route::resource('componentInstruction', 'API\LearningComponentInstructionController');

    Route::post('learningPatternTemplate/uploadImg', 'API\LearningPatternTemplateController@uploadImg');
    Route::resource('learningPatternTemplate', 'API\LearningPatternTemplateController');

    Route::resource('learningTaskTemplate', 'API\LearningTaskTemplateController');
    Route::resource('learningOutcomeTemplate', 'API\LearningOutcomeTemplateController');

    Route::post('patternbin/addPatternRelation/{id}', 
    'API\PatternBinController@addPatternRelation');
    Route::put('patternbin/deletePatternRelation/{id}', 
    'API\PatternBinController@deletePatternRelation');
    Route::resource('patternbin', 'API\PatternBinController');
    Route::resource('patternbinCategory', 'API\PatternBinCategoryController');


    Route::resource('usergroup', 'API\UserGroupController');
    Route::resource('usergroupuser', 'API\UserGroupUserController');
    Route::resource('usergroupuserTemp', 'API\UsergroupUserTempController');

    Route::resource('test', 'API\TestController');

    Route::delete('course/clearCourseComponent/{id}', 'API\CourseController@clearCourseComponent');
    Route::delete('course/clearCourseLesson/{id}', 'API\CourseController@clearCourseLesson');
    Route::get('course/showAll', 'API\CourseController@showAll');
    Route::get('course/showUsergroup/{id}', 'API\CourseController@showUsergroup');
    Route::post('file/courseImport', 'API\CourseController@importCourse');
    Route::get('course/getPermission/{id}', 'API\CourseController@getCoursePermission');
    Route::post('course/updatePermission', 'API\CourseController@updateCoursePermission');
    Route::middleware('design_permission')->resource('course', 'API\CourseController')->except(['show']);

    Route::get('designType/getLearningComponentByDesignType/{id}', 'API\DesignTypeController@getLearningComponentByDesignType');
    Route::get('designType/getDesignTypeInstruction/{id}', 'API\DesignTypeController@getDesignTypeInstruction');
    Route::post('designType/uploadImg', 'API\DesignTypeController@uploadImg');
    Route::resource('designType', 'API\DesignTypeController');

    Route::post('designTypeInstruction/uploadImg', 
    'API\DesignTypeInstructionController@uploadImg');
    Route::resource('designTypeInstruction', 'API\DesignTypeInstructionController');
    Route::resource('designTypeComponentTemplate', 'API\DesignTypeComponentTempController');



    Route::resource('classSize', 'API\ClassSizeController');
    Route::resource('classTarget', 'API\ClassTargetController');
    Route::resource('classType', 'API\ClassTypeController');
    Route::resource('taskType', 'API\TaskTypeController');
    Route::resource('resource', 'API\ResourceController');
    Route::resource('elearningTool', 'API\ElearningToolController');
    Route::resource('moodleMod', 'API\MoodleModController');
    Route::resource('taxonomyCategory', 'API\TaxonomyCategoryController');
    Route::resource('taxonomyCategoryTasktypeRelation', 'API\TaxonomyCategoryTaskTypeRelationController');

    Route::get('user/search/{id}', 'API\UserController@searchUser');
    Route::get('user/getUserMgmtDashboard', 'API\UserController@getUserMgmtDashboard');
    Route::get('user/getAvaUserGroup', 'API\UserController@getAvaUserGroup');
    Route::put('user/tourguide', '\App\Http\Controllers\RouteController@displayTourGuide');
    Route::resource('user', 'API\UserController');


    Route::middleware('admin_auth')->get('/admin', function(){
        return response()->json('admin test');
    });

});