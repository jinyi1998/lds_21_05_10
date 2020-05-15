<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddComponentLevelOutcomesTemplate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $insertGetId = DB::table('learningoutcome_template')->insertGetId([
            'level' => 'Apply',
            'outcomeType' => 2,
            'description' => 'Test Solution',
            'STEMType' => 'E',
            'isCourseLevel' => false,
            'created_by' => 1,
            'updated_by' => 1,
            'is_deleted' => false,
            'created_at' => now(),
            'updated_at' => now()     
        ]);

        DB::table('component_outcome_template_relation')->insert([
            'component_id' => 5,
            'outcome_id' => $insertGetId,
            'created_by' => 1,
            'updated_by' => 1,
            'is_deleted' => false,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $insertGetId = DB::table('learningoutcome_template')->insertGetId([
            'level' => 'Apply',
            'outcomeType' => 3,
            'description' => 'Goal Setting',
            'STEMType' => '',
            'isCourseLevel' => false,
            'created_by' => 1,
            'updated_by' => 1,
            'is_deleted' => false,
            'created_at' => now(),
            'updated_at' => now()   
        ]);

        DB::table('component_outcome_template_relation')->insert([
            'component_id' => 7,
            'outcome_id' => $insertGetId,
            'created_by' => 1,
            'updated_by' => 1,
            'is_deleted' => false,
            'created_at' => now(),
            'updated_at' => now()
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
        DB::table('component_outcome_template_relation')->orderBy('id', 'desc')->limit(2)->delete();
        DB::table('learningoutcome_template')->orderBy('id', 'desc')->limit(2)->delete();
    }
}
