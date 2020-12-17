<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStemType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stem_type', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('name');
            $table->text('name_ch');
            $table->text('short_name');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted')->default(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });

        DB::table('stem_type')->insert([
            [
                'name' => 'Science',
                'name_ch' => '',
                'short_name' => 'S',
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'Technology',
                'name_ch' => '',
                'short_name' => 'T',
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'Engineering',
                'name_ch' => '',
                'short_name' => 'E',
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'Mathametics',
                'name_ch' => '',
                'short_name' => 'M',
                'created_by' => 1,
                'updated_by' => 1,
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
        Schema::dropIfExists('stem_type');
    }
}
