<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InsertSequenceOutcome extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('course_outcome_relation',function (Blueprint $table) {
            $table->smallInteger('sequence')->nullable();
        });
        Schema::table('component_outcome_relational',function (Blueprint $table) {
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
        Schema::table('course_outcome_relation',function (Blueprint $table) {
            $table->dropColumn(['sequence']);
        });
        Schema::table('component_outcome_relational',function (Blueprint $table) {
            $table->dropColumn(['sequence']);
        });
    }
}
