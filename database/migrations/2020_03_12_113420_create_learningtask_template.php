<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLearningtaskTemplate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('learningtask_template', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->bigInteger('time');
            $table->unsignedBigInteger('type');
            $table->unsignedBigInteger('class_type');
            $table->unsignedBigInteger('target');
            $table->unsignedBigInteger('size');
            $table->string('description');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('type')->references('id')->on('learningTasktypeOpts');
            $table->foreign('class_type')->references('id')->on('classTargetOpts');
            $table->foreign('target')->references('id')->on('classTargetOpts');
            $table->foreign('size')->references('id')->on('classSizeOpts');
        });

        Schema::create('learningtask_template_assessment', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('learningtask_id');
            $table->unsignedBigInteger('learningoutcome_id');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
            
            $table->foreign('learningtask_id')->references('id')->on('learningtask_template');
            $table->foreign('learningoutcome_id')->references('id')->on('learningtask_template');
        });

        Schema::create('learningtask_template_resource', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('learningtask_id');
            $table->unsignedBigInteger('resource_id');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('learningtask_id')->references('id')->on('learningtask_template');
            $table->foreign('resource_id')->references('id')->on('resourceOpts');
        });

        Schema::create('learningtask_template_etool', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('learningtask_id');
            $table->unsignedBigInteger('elearningtool_id');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('learningtask_id')->references('id')->on('learningtask_template');
            $table->foreign('elearningtool_id')->references('id')->on('resourceOpts');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('learningtask_template_assessment');
        Schema::dropIfExists('learningtask_template_resource');
        Schema::dropIfExists('learningtask_template_etool');
        Schema::dropIfExists('learningtask_template');
    }
}
