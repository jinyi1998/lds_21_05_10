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
Route::get('/timeline/{id}', '\App\Http\Controllers\RouteController@timeline');
Route::get('/designstudio/{id}', '\App\Http\Controllers\RouteController@designstudio');
Route::get('/designstudio/{id}/{step}', '\App\Http\Controllers\RouteController@designstudio');
// Route::get('/designstudio/{id}/{step}', '\App\Http\Controllers\RouteController@designstudio');
Route::get('/printpdf/{id}', '\App\Http\Controllers\RouteController@printpdf');
Route::get('/mydesign', '\App\Http\Controllers\RouteController@mydesign');
Route::get('/publicdesign', '\App\Http\Controllers\RouteController@publicdesign');
Route::get('/usergroups', '\App\Http\Controllers\RouteController@usergroups');
Route::get('/usergroup/{id}', '\App\Http\Controllers\RouteController@usergroup');
Route::get('file/downloadCourseJson/{file_name}', 'API\FileSystemController@apiFileCourseDownload');

Route::get('publicsharing/{token}', function($token){
    return view('publicsharing',  ['token' => $token, 'module' => 'publicsharing']);
});

//admin related
Route::middleware('admin_auth')->prefix('admin')->group(function(){
    // Route::get('/', '\App\Http\Controllers\RouteController@admin_dashboard');
    Route::get('usersmanagement', '\App\Http\Controllers\RouteController@admin_usersmanagement');
    Route::get('template_builder', '\App\Http\Controllers\RouteController@admin_templatebuilder');

    #region site managmeent
    Route::get('sitemanagement', '\App\Http\Controllers\RouteController@admin_site_management');
    Route::get('classsize_opts', '\App\Http\Controllers\RouteController@admin_classsize_opts');
    Route::get('classtype_opts', '\App\Http\Controllers\RouteController@admin_classtype_opts');
    Route::get('classtarget_opts', '\App\Http\Controllers\RouteController@admin_classtarget_opts');
    Route::get('resource_opts', '\App\Http\Controllers\RouteController@admin_resource_opts');
    Route::get('elearningtool_opts', '\App\Http\Controllers\RouteController@admin_elearningtool_opts');
    Route::get('tasktype_opts', '\App\Http\Controllers\RouteController@admin_tasktype_opts');
    Route::get('moodlemod', '\App\Http\Controllers\RouteController@admin_moodlemod');
    Route::get('taxonomy_category', '\App\Http\Controllers\RouteController@admin_taxcategory');
    Route::get('feedback_opts', '\App\Http\Controllers\RouteController@admin_feedback_opts');
    Route::get('motivator_opts', '\App\Http\Controllers\RouteController@admin_motivator_opts');
    #endregion
   

    #region design temp builder
    Route::get('design_type', '\App\Http\Controllers\RouteController@admin_design_type');
    Route::get('design_type_builder', '\App\Http\Controllers\RouteController@admin_design_type_builder_new');
    Route::get('design_type_builder/{id}', '\App\Http\Controllers\RouteController@admin_design_type_builder');
    Route::get('component_template_builder', '\App\Http\Controllers\RouteController@admin_component_template_builder_new');
    Route::get('component_template_builder/{id}', '\App\Http\Controllers\RouteController@admin_component_template_builder');
    Route::get('component_template', '\App\Http\Controllers\RouteController@admin_component_template');
    Route::get('pattern_template_builder', '\App\Http\Controllers\RouteController@admin_pattern_template_builder_new');
    Route::get('pattern_template_builder/{id}', '\App\Http\Controllers\RouteController@admin_pattern_template_builder');
    Route::get('pattern_template', '\App\Http\Controllers\RouteController@admin_pattern_template');
    Route::get('patternbin_category', '\App\Http\Controllers\RouteController@admin_pattern_bin_category_list');
    Route::get('patternbin_category/{id}', '\App\Http\Controllers\RouteController@admin_pattern_bin_category');
    Route::get('patternbin/{id}', '\App\Http\Controllers\RouteController@admin_pattern_bin');
    #endregion
  
    Route::get('dashboard', '\App\Http\Controllers\RouteController@admin_dashboard');

});