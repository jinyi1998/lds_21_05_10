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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Course Controller
Route::get('course/getDesignTypeTemp', 'API\CourseController@getDesignTypeTemp');
Route::resource('course', 'API\CourseController');
Route::post('course/test', 'API\CourseController@test');

//Learning Outcome
Route::get('learningOutcome/getOutcomeType', 'API\LearningOutcomesController@getOutcomeType');
Route::get('learningOutcome/getLearningOutcomeByComponentTemp/{id}', 'API\LearningOutcomesController@getLearningOutcomeByComponentTemp');
Route::get('learningOutcome/getOutcomeLevel/{id}', 'API\LearningOutcomesController@getOutcomeLevel');
Route::get('learningOutcome/getDefaultOutcomeByLearningType/{id}', 'API\LearningOutcomesController@getDefaultOutcomeByLearningType');
Route::resource('learningOutcome', 'API\LearningOutcomesController');

//Learning Component Controller
Route::get('learningComponent/getDefaultLearningComponentByDesignType/{id}', 
'API\LearningComponentController@getDefaultLearningComponentByDesignType');

Route::get('learningComponent/getDefaultLearningComponentByDesignType/{id}', 
'API\LearningComponentController@getDefaultLearningComponentByDesignType');

Route::get('learningComponent/getLearningComponentByDesignType/{id}', 
'API\LearningComponentController@getLearningComponentByDesignType');

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

