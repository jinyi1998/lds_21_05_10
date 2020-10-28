<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDesigntypeInstructionRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('designtype_instruction_relation', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('designtype_id');
            $table->unsignedBigInteger('designtype_instruction_id');
            $table->smallInteger('sequence');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted')->default(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('designtype_id')->references('id')->on('design_type');
            $table->foreign('designtype_instruction_id', 'instr_id')->references('id')->on('designtype_instruction')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('designtype_instruction_relation');
    }
}
