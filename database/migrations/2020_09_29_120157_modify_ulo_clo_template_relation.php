<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyUloCloTemplateRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('unit_outcome_component_outcome_template_relation', function (Blueprint $table) {
            // $table->foreign('component_id')->references('id')->on('component_template');
            $table->renameColumn('unit_outcomeid', 'unit_outcome_id');
            $table->renameColumn('component_outcomeid', 'component_outcome_id');
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
