<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FixPatternTaskTemplateRelationSequence extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $relation = DB::table('pattern_task_template_relation')->orderBy('pattern_id')->orderBy('sequence')->get();
        $pattern_id = 0;
        $sequence = 1;
        foreach($relation as $_relation){
            if($pattern_id != $_relation->pattern_id){
                $sequence = 1;
            }
            $pattern_id = $_relation->pattern_id;
            DB::table('pattern_task_template_relation')->where('id', $_relation->id)->update(
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
