<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InitClassSizeOptsSequence extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $size = DB::table('classsizeopts')->get();
        foreach($size as $index => $_size){
            DB::table('classsizeopts')->where('id', '=', $_size->id)->update([
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
