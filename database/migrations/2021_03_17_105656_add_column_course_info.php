<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnCourseInfo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('course', function($table)
        {
            $table->char('school', 255)->nullable();
            $table->text('sch_cc_goal')->nullable();
            $table->text('technology')->nullable();
            $table->text('prior_knowledge')->nullable();
            $table->text('maximum_enrollment_number')->nullable();
            $table->text('highlight')->nullable();
            $table->text('reflection')->nullable();
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
        Schema::table('course', function($table)
        {
            $table->dropColumn('school');
            $table->dropColumn('sch_cc_goal');
            $table->dropColumn('technology');
            $table->dropColumn('prior_knowledge');
            $table->dropColumn('maximum_enrollment_number');
            $table->dropColumn('highlight');
            $table->dropColumn('reflection');
        });
    }
}
