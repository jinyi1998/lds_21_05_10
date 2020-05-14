<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDesigntypeOutcomeTemplateRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('designtype_outcome_template_relation', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('designtype_id');
            $table->unsignedBigInteger('outcome_id');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('designtype_id')->references('id')->on('design_type');
            $table->foreign('outcome_id')->references('id')->on('learningoutcome_template');
        });

        DB::table('designtype_outcome_template_relation')->insert([
            //1
            [
                'designtype_id' => 1,
                'outcome_id' => 1,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'designtype_id' => 1,
                'outcome_id' => 2,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'designtype_id' => 2,
                'outcome_id' => 3,
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'designtype_id' => 2,
                'outcome_id' => 4,
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
        Schema::dropIfExists('designtype_outcome_template_relation');
    }
}
