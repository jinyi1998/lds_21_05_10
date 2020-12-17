<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOutcomeStemTypeRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('outcome_stem_type_relation', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('stem_type_id');
            $table->unsignedBigInteger('outcome_id');

            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted')->default(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('stem_type_id')->references('id')->on('stem_type')->onDelete('cascade');
            $table->foreign('outcome_id')->references('id')->on('learningoutcome')->onDelete('cascade');

        });
      
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('outcome_stem_type_relation');
    }
}
