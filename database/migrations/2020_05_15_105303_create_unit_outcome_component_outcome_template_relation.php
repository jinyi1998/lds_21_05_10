<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnitOutcomeComponentOutcomeTemplateRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unit_outcome_component_outcome_template_relation', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('unit_outcomeid');
            $table->unsignedBigInteger('component_outcomeid');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('unit_outcomeid', 'ulo_temp_id')->references('id')->on('learningoutcome_template');
            $table->foreign('component_outcomeid', 'clo_temp_id')->references('id')->on('learningoutcome_template');
        });

        DB::table('unit_outcome_component_outcome_template_relation')->insert([
            //ED + SDL
            [
                'component_outcomeid' => 5,
                'unit_outcomeid' => 1,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 6,
                'unit_outcomeid' => 1,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 7,
                'unit_outcomeid' => 2,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 8,
                'unit_outcomeid' => 1,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 9,
                'unit_outcomeid' => 2,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 10,
                'unit_outcomeid' => 1,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 11,
                'unit_outcomeid' => 2,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 12,
                'unit_outcomeid' => 1,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 13,
                'unit_outcomeid' => 2,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 14,
                'unit_outcomeid' => 2,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],

            //SI + SDL

            [
                'component_outcomeid' => 15,
                'unit_outcomeid' => 3,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 16,
                'unit_outcomeid' => 3,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 17,
                'unit_outcomeid' => 4,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 18,
                'unit_outcomeid' => 3,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 19,
                'unit_outcomeid' => 3,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 20,
                'unit_outcomeid' => 4,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 21,
                'unit_outcomeid' => 3,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 22,
                'unit_outcomeid' => 4,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 23,
                'unit_outcomeid' => 3,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 24,
                'unit_outcomeid' => 4,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 25,
                'unit_outcomeid' => 4,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 26,
                'unit_outcomeid' => 1,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'component_outcomeid' => 27,
                'unit_outcomeid' => 4,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('unit_outcome_component_outcome_template_relation');
    }
}
