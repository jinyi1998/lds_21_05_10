<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InsertSequenceTaskPatternRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('pattern_task_relational',function (Blueprint $table) {
            $table->smallInteger('sequence')->nullable();
        });

        Schema::table('learningtask',function (Blueprint $table) {
            $table->dropColumn(['sequence']);
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
        Schema::table('pattern_task_relational',function (Blueprint $table) {
            $table->dropColumn(['sequence']);
        });

        Schema::table('learningtask',function (Blueprint $table) {
            $table->smallInteger('sequence')->nullable();
        });
    }
}
