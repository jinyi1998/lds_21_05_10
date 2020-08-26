<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InsertNewDesignType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //

        DB::table('design_type')->insert([
            [
                'id' => 999,
                'name' => 'Start From Scratch',
                'description' => 'Start From Scratch',
                'hint' => 'You can freely design your learning design without any preloadings...',
                'media' => '/asset/image/SI.png',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);


        DB::table('component_template')->insert([
            [
                'id' => 999,
                'title' => 'New Empty Component',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);

        DB::table('designtype_component_temp_relation')->insert([
            ['designtype_id' => 999, 'component_id' => 999, 'created_by' => 1,'updated_by' => 1, 'is_deleted' => false] 
        ]);

       
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        DB::table('designtype_component_temp_relation')->where('designtype_id', '=', 999)->delete();
        DB::table('component_template')->where('id', '=', 999)->delete();
        DB::table('design_type')->where('id', '=', 999)->delete();
    }
}
