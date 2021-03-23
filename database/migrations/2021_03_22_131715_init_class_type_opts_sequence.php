<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InitClassTypeOptsSequence extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $type = DB::table('classtypeopts')->get();
        foreach($type as $index => $_type){
            DB::table('classtypeopts')->where('id', '=', $_type->id)->update([
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
