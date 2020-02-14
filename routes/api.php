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

//Learning Outcome
Route::get('learningOutcome/getOutcomeType', 'API\LearningOutcomesController@getOutcomeType');
Route::get('learningOutcome/getOutcomeLevel/{id}', 'API\LearningOutcomesController@getOutcomeLevel');
Route::get('learningOutcome/getDefaultOutcomeByLearningType/{id}', 'API\LearningOutcomesController@getDefaultOutcomeByLearningType');
Route::resource('learningOutcome', 'API\LearningOutcomesController');

//Learning Component Controller
Route::get('learningComponent/getDefaultLearningComponentByDesignType/{id}', 
'API\LearningComponentController@getDefaultLearningComponentByDesignType');

//Learning Task Controller
Route::get('learningTask/getDefaultLearningTaskByComponent/{id}', 
'API\LearningTaskController@getDefaultLearningTaskByComponent');
Route::get('learningTask/getTaskClassTypeOption', 
'API\LearningTaskController@getTaskClassTypeOption');
Route::get('learningTask/getTaskSizeOption', 
'API\LearningTaskController@getTaskSizeOption');
Route::get('learningTask/getTaskTargetTypeOption', 
'API\LearningTaskController@getTaskTargetTypeOption');
Route::get('learningTask/getTaskResourceTypeOption', 
'API\LearningTaskController@getTaskResourceTypeOption');
