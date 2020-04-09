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

Route::get('/login', function () {
    return view('login');
});

Route::get('/register', function () {
    return view('register');
});

Route::get('/app', function () {
    return view('app');
});

Route::get('/app2', function () {
    return view('app2');
}); 

Route::get('/designstudio', function () {
    return view('designstudio', ["courseid" => -1]);
}); 

Route::get('/designstudio/{id}', function ($id) {
    return view('designstudio', ["courseid" => $id]);
}); 

Route::get('/mydesign', function () {
    return view('mydesign');
}); 

Route::get('/publicdesign', function () {
    return view('designstudio');
}); 



// Route::get('/design', function () {
//     return view('design');
// });
