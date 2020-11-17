<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnLessontypeLessonTaskRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('lesson_task_relation', function (Blueprint $table) {
            // $table->foreign('component_id')->references('id')->on('component_template');
            $table->smallInteger('lessontype')->default(2);
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('lesson_task_relation', function (Blueprint $table) {
            // $table->foreign('component_id')->references('id')->on('component_template');
            $table->dropColumn('lessontype');
        });
    }
}
