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

// Route::get('/login', function () {
//     return view('login');
// });
 
// Route::get('/register', function () {
//     return view('register');
// });

Route::get('/app', function () {
    return view('app');
});

Route::get('/app2', function () {
    return view('app2');
}); 

// Route::get('/designstudio', function () {
//     return view('designstudio', ["courseid" => -1]);
// })->middleware('auth');

// Route::get('/designstudio/{id}', function ($id) {
//     return view('designstudio', ["courseid" => $id]);
// })->middleware('auth');

// Route::get('/mydesign', function () {
//     return view('mydesign');
// })->middleware('auth');

// Route::get('/publicdesign', function () {
//     return view('mydesign');
// })->middleware('auth');


Auth::routes();
Route::post('api/user/changepassword', '\App\Http\Controllers\RouteController@changePassword');
Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');
Route::get('test', '\App\Http\Controllers\testcontroller@test');

Route::get('/designstudio', '\App\Http\Controllers\RouteController@designstudio');
Route::get('/designstudio/{id}', '\App\Http\Controllers\RouteController@designstudio');
Route::get('/mydesign', '\App\Http\Controllers\RouteController@mydesign');
Route::get('/publicdesign', '\App\Http\Controllers\RouteController@publicdesign');


Route::get('/api/course/showAll', 'CourseControllerTest@showAll');
Route::post('/api/course/clearCourseComponent', 'CourseControllerTest@clearCourseComponent');
Route::post('/api/course/clearCourseLesson', 'CourseControllerTest@clearCourseLesson');
Route::resource('/api/course', 'CourseControllerTest');


// Route::get('/design', function () {
//     return view('design');
// });
