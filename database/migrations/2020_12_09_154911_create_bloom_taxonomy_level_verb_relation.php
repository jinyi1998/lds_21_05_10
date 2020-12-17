<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBloomTaxonomyLevelVerbRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bloom_taxonomy_level_verb_relation', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('bloom_taxonomy_level_id');
            $table->unsignedBigInteger('bloom_taxonomy_verb_id');

            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted')->default(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('bloom_taxonomy_level_id', 'level_id')->references('id')->on('bloom_taxonomy_level')->onDelete('cascade');
            $table->foreign('bloom_taxonomy_verb_id', 'verb_id')->references('id')->on('bloom_taxonomy_verb')->onDelete('cascade');

            // $table->unique(['tool_id', 'moodle_mod_id'], 'uuid');
        });

        for($i = 1; $i<56; $i++){
            $level = 1;
            if($i < 8){
                $level = 1;
            }elseif( $i < 15){
                $level = 2;
            }elseif( $i < 27){
                $level = 3;
            }elseif( $i < 43){
                $level = 4;
            }elseif( $i < 54){
                $level = 5;
            }else{
                $level = 6;
            }
            
            DB::table('bloom_taxonomy_level_verb_relation')->insert(
                [
                    'bloom_taxonomy_level_id' => $level,
                    'bloom_taxonomy_verb_id' => $i,
                    'created_by' => 1,
                    'updated_by' => 1 
                ]
            );
        }
       
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bloom_taxonomy_level_verb_relation');
    }
}
