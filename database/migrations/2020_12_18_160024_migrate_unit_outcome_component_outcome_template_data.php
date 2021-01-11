<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MigrateUnitOutcomeComponentOutcomeTemplateData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $clo = DB::table('component_outcome_template_relation')->get();

        foreach($clo as $_clo){

            $ulo =  DB::table('unit_outcome_component_outcome_template_relation')->where('component_outcome_id', $_clo->outcome_id)->get();
            
            if(isset($ulo)){
                foreach($ulo as $_ulo){
                    if(!DB::table('component_outcome_template_relation')->where('outcome_id', $_ulo->unit_outcome_id)->where('component_id', $_clo->component_id)->exists()){
                        DB::table('component_outcome_template_relation')->insert([
                            'component_id' => $_clo->component_id,
                            'outcome_id' => $_ulo->unit_outcome_id,
                            'created_by' => 1,
                            'updated_by' => 1,
                            'is_deleted' => false
                        ]);
                    }
                }
               
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
    }
}
