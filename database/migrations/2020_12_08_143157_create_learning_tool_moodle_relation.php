<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLearningToolMoodleRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('learning_tool_moodle_relation', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('tool_id');
            $table->unsignedBigInteger('moodle_mod_id');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted')->default(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('tool_id')->references('id')->on('learningtask_etool')->onDelete('cascade');
            $table->foreign('moodle_mod_id')->references('id')->on('moodle_mod')->onDelete('cascade');

            $table->unique(['tool_id', 'moodle_mod_id'], 'uuid');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('learning_tool_moodle_relation');
    }
}
