<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnitOutcomeComponentOutcomeRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unit_outcome_component_outcome_relation', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('unit_outcomeid');
            $table->unsignedBigInteger('component_outcomeid');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('unit_outcomeid', 'ulo_id')->references('id')->on('learningoutcome')->onDelete('cascade');
            $table->foreign('component_outcomeid', 'clo_id')->references('id')->on('learningoutcome')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('unit_outcome_component_outcome_relation');

    }
}
