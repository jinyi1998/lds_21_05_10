<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyComponentOutcomeTempRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('component_outcome_template_relation', function (Blueprint $table) {
            // $table->foreign('component_id')->references('id')->on('component_template');
            $table->dropForeign(['outcome_id']);
            $table->foreign('outcome_id')->references('id')->on('learningoutcome_template')->onDelete('cascade');
        });

        Schema::table('unit_outcome_component_outcome_template_relation', function (Blueprint $table) {
            // $table->foreign('component_id')->references('id')->on('component_template');
            $table->dropForeign('clo_temp_id');
            $table->foreign('component_outcomeid', 'clo_temp_id')->references('id')->on('learningoutcome_template')->onDelete('cascade');
        });

        
        Schema::table('learningtask_template_assessment', function (Blueprint $table) {
            // $table->foreign('component_id')->references('id')->on('component_template');
            $table->dropForeign(['learningoutcome_id']);
            $table->foreign('learningoutcome_id')->references('id')->on('learningoutcome_template')->onDelete('cascade');
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
    }
}
