<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDesigntypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('design_type', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('name', 100);
            $table->char('description', 255);
            $table->char('hint', 255);
            $table->char('media', 255);
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });

        $initData = [
            [
                'name' => 'Engineering Design SDL',
                'description' => 'Using engineering design practice to guide the learing task 
                sequence design by adopting the self-directed learning approach',
                'hint' => 'Engineering Design approach guides you...',
                'media' => 'https://cdn2.iconfinder.com/data/icons/conceptual-vectors-of-logos-and-symbols/66/204-512.png',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Scienitic Investigation SDL',
                'description' => 'Using scienitic investigation practice to guide the 
                learing task sequence design by adopting the self-directed learning approach',
                'hint' => 'Scientific investigation practice design approach guides you...',
                'media' => 'https://www.pinclipart.com/picdir/big/44-449704_nuclear-icon-nuclear-icon-png-clipart.png',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        DB::table('design_type')->insert($initData);


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('design_type');
    }
}
