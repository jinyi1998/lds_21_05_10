<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnSequenceComponentPatternRelational extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('component_pattern_relational', function (Blueprint $table) {
            // $table->foreign('component_id')->references('id')->on('component_template');
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
        Schema::table('component_pattern_relational', function (Blueprint $table) {
            // $table->foreign('component_id')->references('id')->on('component_template');
            $table->dropColumn('sequence');
        });
    }
}
