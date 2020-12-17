<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBloomTaxonomyLevel extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bloom_taxonomy_level', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('name');
            $table->smallInteger('level');
            $table->smallInteger('sequence');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted')->default(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent(); 
        });


        // insert default values;
        DB::table('bloom_taxonomy_level')->insert([
            [
                'name' => 'Remember',
                'level' => 1,
                'sequence' => 1,
                'created_by' => 1,
                'updated_by' => 1
            ],
            [
                'name' => 'Comprehend',
                'level' => 2,
                'sequence' => 2,
                'created_by' => 1,
                'updated_by' => 1
            ],
            [
                'name' => 'Apply',
                'level' => 3,
                'sequence' => 3,
                'created_by' => 1,
                'updated_by' => 1
            ],
            [
                'name' => 'Analyze',
                'level' => 4,
                'sequence' => 4,
                'created_by' => 1,
                'updated_by' => 1
            ],
            [
                'name' => 'Evaluation',
                'level' => 5,
                'sequence' => 5,
                'created_by' => 1,
                'updated_by' => 1
            ],
            [
                'name' => 'Create',
                'level' => 6,
                'sequence' => 6,
                'created_by' => 1,
                'updated_by' => 1
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bloom_taxonomy_level');
    }
}
