<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MigrateUnitOutcomeComponentOutcomeData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $clo = DB::table('component_outcome_relational')->get();

        foreach($clo as $_clo){
            $ulo =  DB::table('unit_outcome_component_outcome_relation')->where('component_outcomeid', $_clo->outcome_id)->get();
            if(isset($ulo)){
                foreach($ulo as $_ulo){
                    if(!DB::table('component_outcome_relational')->where('outcome_id', $_ulo->unit_outcomeid)->where('component_id', $_clo->component_id)->exists()){
                        DB::table('component_outcome_relational')->insert([
                            'component_id' => $_clo->component_id,
                            'outcome_id' => $_ulo->unit_outcomeid,
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
