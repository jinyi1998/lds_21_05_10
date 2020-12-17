<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MigrateLearningoutcomeTemplateBloomLevelId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $outcome = DB::table('learningoutcome_template')->get();

        foreach($outcome as $_outcome){
            $bloom_taxonomy_level = DB::table('bloom_taxonomy_level')->where('name', 'like', $_outcome->level)->select('id')->get();
            foreach($bloom_taxonomy_level as $_bloom_taxonomy_level){
                if(isset($_bloom_taxonomy_level->id)){
                    DB::table('learningoutcome_template')->where('id', $_outcome->id)->update(
                        [
                            'bloom_id' => $_bloom_taxonomy_level->id,
                            'updated_at' => now(),
                            'updated_by' => 1,
                        ]
                    );
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
