<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatternbinPatternRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patternbin_pattern_relation', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('pattern_id');
            $table->unsignedBigInteger('patternbin_id');
            $table->smallInteger('sequence');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted')->default(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('patternbin_id')->references('id')->on('patternbin')->onDelete('cascade');
            $table->foreign('pattern_id')->references('id')->on('learningpattern_template');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patternbin_pattern_relation');
    }
}
