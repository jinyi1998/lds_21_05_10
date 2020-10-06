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
                'id' => 3,
                'name' => 'Start From Scratch',
                'description' => 'Start From Scratch',
                'hint' => 'You can freely design your learning design without any preloadings...',
                'media' => '/asset/image/design_type_logo/Scratch.png',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);


        DB::table('component_template')->insert([
            [
                'id' => 11,
                'title' => 'New Empty Component',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);

        DB::table('designtype_component_template_relation')->insert([
            ['designtype_id' => 3, 'component_id' => 11, 'created_by' => 1,'updated_by' => 1, 'is_deleted' => false] 
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
        // DB::table('designtype_outcome_template_relation')->where('designtype_id', '=', 3)->delete();
        // DB::table('designtype_component_template_relation')->where('designtype_id', '=', 3)->delete();
        // DB::table('component')->where('component_template_id', '=', 11)->delete();
        // DB::table('component_template')->where('id', '=', 11)->delete();
        // DB::table('design_type')->where('id', '=', 3)->delete();
    }
}
