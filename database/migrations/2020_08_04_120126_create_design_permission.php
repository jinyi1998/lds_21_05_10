<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDesignPermission extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('design_user_permission', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('course_id');
            $table->unsignedBigInteger('user_id');
            $table->smallInteger('permission');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('course_id')->references('id')->on('course')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        $courses = DB::table('course')->get();
        foreach( $courses as $course){
            DB::table('design_user_permission')->insert([  
                [
                    'course_id' => $course->id,
                    'user_id' => $course->created_by,
                    'permission' => 4,
                    'created_by' => $course->created_by,
                    'updated_by' => $course->created_by,
                    'is_deleted' => 0
                ]
            ]);
        }

        Schema::create('design_usergroup_permission', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('course_id');
            $table->unsignedBigInteger('usergroup_id');
            $table->smallInteger('permission');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('course_id')->references('id')->on('course')->onDelete('cascade');
            $table->foreign('usergroup_id')->references('id')->on('usergroup')->onDelete('cascade');
        });


        Schema::create('design_public_permission', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('course_id');
            $table->smallInteger('permission');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('course_id')->references('id')->on('course')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('design_user_permission');
        Schema::dropIfExists('design_usergroup_permission');
        Schema::dropIfExists('design_public_permission');
    }
}
