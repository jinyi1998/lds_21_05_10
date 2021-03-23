<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InitResourceOptsSequence extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $type = DB::table('resourceopts')->get();
        foreach($type as $index => $_type){
            DB::table('resourceopts')->where('id', '=', $_type->id)->update([
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
