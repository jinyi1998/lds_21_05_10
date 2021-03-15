<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InsertClassTargetOpts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        DB::table('classTargetOpts')
        ->insert(['description' => "Peer", "created_by" => 1, "updated_by" => 1, "is_deleted"=> 1]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        DB::table('classTargetOpts')->where('id', 4)->delete();
    }
}
