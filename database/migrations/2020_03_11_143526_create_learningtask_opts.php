<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLearningtaskOpts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('classTypeOpts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('description', 100);
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });

        Schema::create('classTargetOpts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('description', 100);
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });

        Schema::create('learningTasktypeOpts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('description', 100);
            $table->char('color', 100);
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });

        Schema::create('classSizeOpts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('description', 100);
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });

        Schema::create('resourceOpts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('description', 100);
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });

        Schema::create('elearningtoolOpts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('description', 100);
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
        Schema::dropIfExists('classTypeOpts');
        Schema::dropIfExists('classTargetOpts');
        Schema::dropIfExists('learningTasktypeOpts');
        Schema::dropIfExists('classSizeOpts');
        Schema::dropIfExists('resourceOpts');
        Schema::dropIfExists('elearningtoolOpts');
    }
}
