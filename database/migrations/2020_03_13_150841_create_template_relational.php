<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTemplateRelational extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('component_pattern_template_relational', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('component_id');
            $table->unsignedBigInteger('pattern_id');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('component_id')->references('id')->on('component_template');
            $table->foreign('pattern_id')->references('id')->on('learningpatteren_template');
        });

        Schema::create('component_outcome_template_relational', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('component_id');
            $table->unsignedBigInteger('outcome_id');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('component_id')->references('id')->on('component_template');
            $table->foreign('outcome_id')->references('id')->on('learningoutcome_template');

        });

        Schema::create('pattern_task_template_relational', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('pattern_id');
            $table->unsignedBigInteger('task_id');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('pattern_id')->references('id')->on('learningpatteren_template');
            $table->foreign('task_id')->references('id')->on('learningtask_template');

        });


        Schema::create('designtype_component_template_relational', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('designtype_id');
            $table->unsignedBigInteger('component_id');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('designtype_id')->references('id')->on('design_type');
            $table->foreign('component_id')->references('id')->on('component_template');

        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('component_pattern_template_relational');
        Schema::dropIfExists('component_outcome_template_relational');
        Schema::dropIfExists('pattern_task_template_relational');
        Schema::dropIfExists('designtype_component_template_relational');
    }
}
