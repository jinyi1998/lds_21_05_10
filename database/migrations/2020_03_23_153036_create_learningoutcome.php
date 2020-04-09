<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLearningoutcome extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('learningoutcome', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('level', 100)->nullable();
            $table->integer('outcomeType');
            $table->char('description', 100)->nullable();
            $table->char('STEMType', 100)->nullable();
            $table->boolean('isCourseLevel', 100);
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('learningoutcome');
    }
}
