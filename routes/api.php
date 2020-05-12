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

Route::resource('opts', 'API\LearningTaskOptsController');

//Course Controller
Route::get('course/getDesignTypeTemp', 'API\CourseController@getDesignTypeTemp');
// Route::resource('course', 'API\CourseController');


//File System
Route::post('file/json', 'API\FileSystemController@json');
Route::get('file', 'API\FileSystemController@index');

//Learning Outcome

Route::get('learningOutcome/getOutcomeType', 'API\LearningOutcomesController@getOutcomeType');
// Route::get('learningOutcome/getLearningOutcomeByComponentTemp/{id}', 'API\LearningOutcomesController@getLearningOutcomeByComponentTemp');
Route::get('learningOutcome/getOutcomeLevel/{id}', 'API\LearningOutcomesController@getOutcomeLevel');
// Route::get('learningOutcome/getDefaultOutcomeByLearningType/{id}', 'API\LearningOutcomesController@getDefaultOutcomeByLearningType');
Route::delete('learningOutcome/destroyComponentRelation/{outcome_id}/{component_id}', 'API\LearningOutcomesController@destroyComponentRelation');
Route::resource('learningOutcome', 'API\LearningOutcomesController');

//Learning Outcome Relation
Route::resource('courseOutcomeRelation', 'API\CourseOutcomeRelationController');
Route::resource('componentOutcomeRelation', 'API\ComponentOutcomeRelationController');

//Learning Component Controller
// Route::get('learningComponent/getDefaultLearningComponentByDesignType/{id}', 
// 'API\LearningComponentController@getDefaultLearningComponentByDesignType');

Route::get('learningComponent/getDefaultLearningComponentByDesignType2/{id}', 
'API\LearningComponentController@getDefaultLearningComponentByDesignType2');


Route::get('learningComponent/getLearningComponentByDesignType/{id}', 
'API\LearningComponentController@getLearningComponentByDesignType');

Route::get('learningComponent/getPatternOpts/{id}', 
'API\LearningComponentController@getPatternOpts');

Route::get('learningComponent/getDefaultLearningComponentByDesignType/{id}', 
'API\LearningComponentController@getDefaultLearningComponentByDesignType');

Route::resource('learningComponent', 'API\LearningComponentController');

//Learning Component Task Relation Controller
Route::resource('componentTaskRelation', 'API\ComponentTaskController');

//Lesson Task Relation Controller
Route::resource('lessonTaskRelation', 'API\LessonTaskRelationController');



//Learning Pattern Controller
Route::put('learningPattern/unlockPattern/{id}', 
'API\LearningPatternController@unlockPattern');
Route::resource('learningPattern', 
'API\LearningPatternController');


//Learning Task Controller
Route::get('learningTask/getDefaultLearningTaskByComponent/{id}', 
'API\LearningTaskController@getDefaultLearningTaskByComponent');

Route::get('learningTask/getLearningTemplateList/', 
'API\LearningTaskController@getLearningTemplateList');

Route::get('learningTask/getLearningPatternByComponent/{id}', 
'API\LearningTaskController@getLearningPatternByComponent');

Route::get('learningTask/getLearningTaskByPattern/{id}', 
'API\LearningTaskController@getLearningTaskByPattern');

Route::get('learningTask/getTaskTypeOption', 
'API\LearningTaskController@getTaskTypeOption');

Route::get('learningTask/getTaskClassTypeOption', 
'API\LearningTaskController@getTaskClassTypeOption');

Route::get('learningTask/getTaskSizeOption', 
'API\LearningTaskController@getTaskSizeOption');

Route::get('learningTask/getTaskTargetTypeOption', 
'API\LearningTaskController@getTaskTargetTypeOption');

Route::get('learningTask/getTaskResourceTypeOption', 
'API\LearningTaskController@getTaskResourceTypeOption');

Route::get('learningTask/getTaskResourceTypeOption', 
'API\LearningTaskController@getTaskResourceTypeOption');

Route::get('learningTask/getTaskELeraningResourceTypeOption', 
'API\LearningTaskController@getTaskELeraningResourceTypeOption');

Route::get('learningTask/getLearningPatternOpts', 
'API\LearningTaskController@getLearningPatternOpts');

Route::resource('learningTask', 'API\LearningTaskController');

//Learning Lesson
Route::resource('lesson', 'API\LessonController');

Route::resource('courseanalysis', 'API\CourseAnalysisController');
Route::resource('componentanalysis', 'API\LearningComponentAnalysisController');
Route::resource('lessonanalysis', 'API\LessonAnalysisController');

//template related
Route::resource('learningComponentTemplate', 'API\LearningComponentTemplateController');
Route::resource('learningPatternTemplate', 'API\LearningPatternTemplateController');
Route::resource('learningTaskTemplate', 'API\LearningTaskTemplateController');
