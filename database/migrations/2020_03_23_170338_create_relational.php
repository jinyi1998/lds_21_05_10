<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRelational extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('component_pattern_relational', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('component_id');
            $table->unsignedBigInteger('pattern_id');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('component_id')->references('id')->on('component')->onDelete('cascade');
            $table->foreign('pattern_id')->references('id')->on('learningpattern')->onDelete('cascade');
        });

        Schema::create('component_outcome_relational', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('component_id');
            $table->unsignedBigInteger('outcome_id');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('component_id')->references('id')->on('component')->onDelete('cascade');
            $table->foreign('outcome_id')->references('id')->on('learningoutcome')->onDelete('cascade');

        });

        Schema::create('pattern_task_relational', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('pattern_id');
            $table->unsignedBigInteger('task_id');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('pattern_id')->references('id')->on('learningpattern')->onDelete('cascade');
            $table->foreign('task_id')->references('id')->on('learningtask')->onDelete('cascade');

        });

        Schema::create('component_task_relational', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('component_id');
            $table->unsignedBigInteger('task_id');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('component_id')->references('id')->on('component')->onDelete('cascade');
            $table->foreign('task_id')->references('id')->on('learningtask')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('component_pattern_relational');
        Schema::dropIfExists('component_outcome_relational');
        Schema::dropIfExists('pattern_task_relational');
        Schema::dropIfExists('component_task_relational');
    }
}
