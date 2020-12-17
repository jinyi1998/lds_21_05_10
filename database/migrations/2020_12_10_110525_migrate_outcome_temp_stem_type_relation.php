<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MigrateOutcomeTempStemTypeRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $outcome = DB::table('learningoutcome_template')->select(['id', 'STEMType'])->get();

        foreach($outcome as $_outcome){
            if(strpos($_outcome->STEMType, 'S') !== false){
                DB::table('outcome_template_stem_type_relation')->insert(
                    [
                        'stem_type_id' => 1,
                        'outcome_id' => $_outcome->id,
                        'created_by' => 1,
                        'updated_by' => 1
                    ]
                );
            }
            if(strpos($_outcome->STEMType, 'T') !== false){
                DB::table('outcome_template_stem_type_relation')->insert(
                    [
                        'stem_type_id' => 2,
                        'outcome_id' => $_outcome->id,
                        'created_by' => 1,
                        'updated_by' => 1
                    ]
                );
            }
            if(strpos($_outcome->STEMType, 'E') !== false){
                DB::table('outcome_template_stem_type_relation')->insert(
                    [
                        'stem_type_id' => 3,
                        'outcome_id' => $_outcome->id,
                        'created_by' => 1,
                        'updated_by' => 1
                    ]
                );
            }   
            if(strpos($_outcome->STEMType, 'M') !== false){
                DB::table('outcome_template_stem_type_relation')->insert(
                    [
                        'stem_type_id' => 4,
                        'outcome_id' => $_outcome->id,
                        'created_by' => 1,
                        'updated_by' => 1
                    ]
                );
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        DB::table('outcome_template_stem_type_relation')->delete();
    }
}
