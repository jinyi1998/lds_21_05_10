<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FixComponentPatternTemplateRelationSequence extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $relation = DB::table('component_pattern_template_relation')->orderBy('component_id')->orderBy('sequence')->get();
        $component_id = 0;
        $sequence = 1;
        foreach($relation as $_relation){
            if($component_id != $_relation->component_id){
                $sequence = 1;
            }
            $component_id = $_relation->component_id;
            DB::table('component_pattern_template_relation')->where('id', $_relation->id)->update(
                [
                    "sequence" => $sequence,
                    "updated_at" => now()
                ]
            );
            $sequence++;
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
