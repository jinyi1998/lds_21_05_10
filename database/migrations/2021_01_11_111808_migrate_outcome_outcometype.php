<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MigrateOutcomeOutcometype extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
          $lo = DB::table('learningoutcome')->get();

        foreach($lo as $_lo){
            // print_r($_lo);
            if($_lo->outcomeType == 1){
                DB::table('learningoutcome')->where('id', $_lo->id)->update([
                    'outcomeType' => 2,
                ]);
            }
            if($_lo->outcomeType == 2){
                DB::table('learningoutcome')->where('id', $_lo->id)->update([
                    'outcomeType' => 1,
                ]);
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
