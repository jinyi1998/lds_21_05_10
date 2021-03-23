<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InitClassTargetOptsSequence extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $target = DB::table('classtargetopts')->get();
        foreach($target as $index => $_target){
            DB::table('classtargetopts')->where('id', '=', $_target->id)->update([
                'sequence'=> $index + 1
            ]);
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
