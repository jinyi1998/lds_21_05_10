<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComponentPatternTaskRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('component_pattern_task_relation', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('component_id');
            $table->unsignedBigInteger('pattern_id')->nullable();
            $table->unsignedBigInteger('task_id')->nullable();
            $table->smallInteger('sequence');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('component_id')->references('id')->on('component')->onDelete('cascade');
            $table->foreign('pattern_id')->references('id')->on('learningpattern')->onDelete('cascade');
            $table->foreign('task_id')->references('id')->on('learningtask')->onDelete('cascade');
        });

        // migrating from component pattern relation
        $component_pattern = DB::table('component_pattern_relational')->get();
        foreach($component_pattern as $_component_pattern){
            $sequence = DB::table('component_pattern_task_relation')->where('component_id', $_component_pattern->component_id)->max('sequence');
            DB::table('component_pattern_task_relation')->insert([[
                "component_id" => $_component_pattern->component_id,
                "pattern_id" => $_component_pattern->pattern_id,
                "sequence"=>   $sequence + 1,
                "created_by" => $_component_pattern->created_by,
                "updated_by" => $_component_pattern->updated_by,
                "is_deleted" => false
            ]]);
        }

        // migrating from component task relation
        $component_task = DB::table('component_task_relational')->get();
        foreach($component_task as $_component_task){

            $sequence = DB::table('component_pattern_task_relation')->where('component_id', $_component_task->component_id)->max('sequence');
            DB::table('component_pattern_task_relation')->insert([[
                "component_id" => $_component_task->component_id,
                "task_id" => $_component_task->task_id,
                "sequence"=>  $sequence + 1,
                "created_by" => $_component_task->created_by,
                "updated_by" => $_component_task->updated_by,
                "is_deleted" => false
            ]]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('component_pattern_task_relation');
    }
}
