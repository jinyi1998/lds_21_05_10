<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLearningtask extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('learningtask', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->bigInteger('time');
            $table->unsignedBigInteger('type');
            $table->unsignedBigInteger('class_type');
            $table->unsignedBigInteger('target');
            $table->unsignedBigInteger('size');
            $table->string('description')->nullable();
            $table->smallInteger('sequence');
            $table->smallInteger('created_by')->default(1);
            $table->smallInteger('updated_by')->default(1);
            $table->boolean('is_deleted')->default(0);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('type')->references('id')->on('learningTasktypeOpts');
            $table->foreign('class_type')->references('id')->on('classTypeOpts');
            $table->foreign('target')->references('id')->on('classTargetOpts');
            $table->foreign('size')->references('id')->on('classSizeOpts');
        });

        Schema::create('learningtask_assessment', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('learningtask_id');
            $table->unsignedBigInteger('learningoutcome_id');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
            
            $table->foreign('learningtask_id')->references('id')->on('learningtask')->onDelete('cascade');
            $table->foreign('learningoutcome_id')->references('id')->on('learningoutcome')->onDelete('cascade');
        });

        Schema::create('learningtask_resource', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('learningtask_id');
            $table->unsignedBigInteger('resource_id');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('learningtask_id')->references('id')->on('learningtask')->onDelete('cascade');
            $table->foreign('resource_id')->references('id')->on('resourceOpts')->onDelete('cascade');
        });

        Schema::create('learningtask_etool', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('learningtask_id');
            $table->unsignedBigInteger('elearningtool_id');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('learningtask_id')->references('id')->on('learningtask')->onDelete('cascade');
            $table->foreign('elearningtool_id')->references('id')->on('resourceOpts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('learningtask_assessment');
        Schema::dropIfExists('learningtask_resource');
        Schema::dropIfExists('learningtask_etool');
        Schema::dropIfExists('learningtask');
    }
}
