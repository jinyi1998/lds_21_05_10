<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnSubjectCourse extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('course', function (Blueprint $table) {
            // $table->foreign('component_id')->references('id')->on('component_template');
            $table->string('subject', 256)->nullable();
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
        Schema::table('course', function (Blueprint $table) {
            // $table->foreign('component_id')->references('id')->on('component_template');
            $table->dropColumn('subject');
        });
    }
}
