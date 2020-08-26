<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/401', function () {
    return response()->json('401 error');
});


Auth::routes();
Route::post('api/user/changepassword', '\App\Http\Controllers\RouteController@changePassword');
Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');
Route::get('/designstudio', '\App\Http\Controllers\RouteController@newdesignstudio');
Route::get('/designstudio/{id}', '\App\Http\Controllers\RouteController@designstudio');
// Route::get('/designstudio/{id}/{step}', '\App\Http\Controllers\RouteController@designstudio');
Route::get('/printpdf/{id}', '\App\Http\Controllers\RouteController@printpdf');
Route::get('/mydesign', '\App\Http\Controllers\RouteController@mydesign');
Route::get('/publicdesign', '\App\Http\Controllers\RouteController@publicdesign');
Route::get('/usergroups', '\App\Http\Controllers\RouteController@usergroups');
Route::get('/usergroup/{id}', '\App\Http\Controllers\RouteController@usergroup');
Route::get('file/downloadCourseJson/{file_name}', 'API\FileSystemController@apiFileCourseDownload');

//admin related
Route::middleware('admin_auth')->prefix('admin')->group(function(){
    // Route::get('/', '\App\Http\Controllers\RouteController@admin_dashboard');
    Route::get('usersmanagement', '\App\Http\Controllers\RouteController@admin_usersmanagement');
    Route::get('template_builder', '\App\Http\Controllers\RouteController@admin_templatebuilder');
    Route::get('dashboard', '\App\Http\Controllers\RouteController@admin_dashboard');

});