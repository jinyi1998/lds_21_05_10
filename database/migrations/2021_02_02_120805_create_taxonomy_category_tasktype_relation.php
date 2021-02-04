<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaxonomyCategoryTasktypeRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('taxonomy_category_tasktype_relation', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('task_type_id');
            $table->unsignedBigInteger('taxonomy_category_id');

            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted')->default(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('task_type_id')->references('id')->on('learningTasktypeOpts')->onDelete('cascade');
            $table->foreign('taxonomy_category_id', 'cat_id')->references('id')->on('taxonomy_category')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('taxonomy_category_tasktype_relation');
    }
}
