<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDesigntypeComponentTempRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('designtype_component_temp_relation', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('designtype_id');
            $table->unsignedBigInteger('component_id');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('designtype_id')->references('id')->on('design_type')->onDelete('cascade');
            $table->foreign('component_id')->references('id')->on('component_template')->onDelete('cascade');
        });

        DB::table('designtype_component_temp_relation')->insert([
            ['designtype_id' => 1, 'component_id' => 1, 'created_by' => 1,'updated_by' => 1, 'is_deleted' => false] ,
            ['designtype_id' => 1, 'component_id' => 2, 'created_by' => 1,'updated_by' => 1, 'is_deleted' => false] ,
            ['designtype_id' => 1, 'component_id' => 3, 'created_by' => 1,'updated_by' => 1, 'is_deleted' => false] ,
            ['designtype_id' => 1, 'component_id' => 4, 'created_by' => 1,'updated_by' => 1, 'is_deleted' => false] ,
            ['designtype_id' => 1, 'component_id' => 5, 'created_by' => 1,'updated_by' => 1, 'is_deleted' => false] ,
            ['designtype_id' => 2, 'component_id' => 6, 'created_by' => 1,'updated_by' => 1, 'is_deleted' => false] ,
            ['designtype_id' => 2, 'component_id' => 7, 'created_by' => 1,'updated_by' => 1, 'is_deleted' => false] ,
            ['designtype_id' => 2, 'component_id' => 8, 'created_by' => 1,'updated_by' => 1, 'is_deleted' => false] ,
            ['designtype_id' => 2, 'component_id' => 9, 'created_by' => 1,'updated_by' => 1, 'is_deleted' => false] ,
            ['designtype_id' => 2, 'component_id' => 10, 'created_by' => 1,'updated_by' => 1, 'is_deleted' => false] ,
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('designtype_component_temp_relation');
    }
}
