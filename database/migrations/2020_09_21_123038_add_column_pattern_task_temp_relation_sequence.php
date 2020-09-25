<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnPatternTaskTempRelationSequence extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('pattern_task_template_relation',function (Blueprint $table) {
            $table->smallInteger('sequence')->nullable();
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
        Schema::table('pattern_task_template_relation',function (Blueprint $table) {
            $table->dropColumn('sequence');
        });
    }
}
