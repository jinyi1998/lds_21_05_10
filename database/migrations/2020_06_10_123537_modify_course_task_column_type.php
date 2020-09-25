<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyCourseTaskColumnType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('learningtask', function($table) {
            $table->text('description')->nullable()->change();
        });
        Schema::table('course', function($table) {
            $table->text('description')->nullable()->change();
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
        // Schema::table('learningtask', function($table) {
        //     $table->string('description')->nullable()->change();
        // });
        // Schema::table('course', function($table) {
        //     $table->string('description')->nullable()->change();
        // });
    }
}
