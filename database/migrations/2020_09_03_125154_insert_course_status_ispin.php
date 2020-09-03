<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InsertCourseStatusIspin extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('course', function($table) {
            $table->boolean('is_pin')->default(false);
            $table->boolean('is_finish')->default(false);
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
        Schema::table('course', function($table) {
            $table->dropColumn('is_pin');
            $table->dropColumn('is_finish');
        });
    }
}
