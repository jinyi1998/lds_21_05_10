<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InitMotivatorOptsData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        DB::table('motivator_opts')
        ->insert(
            [
                ['name' => "peer competition", "description" => "", "sequence" => 1 ,"created_by" => 1, "updated_by" => 1, "is_deleted"=> 0],
                ['name' => "team agency", "description" => "", "sequence" => 2 ,"created_by" => 1, "updated_by" => 1, "is_deleted"=> 0],
                ['name' => "individual agency", "description" => "", "sequence" => 3 ,"created_by" => 1, "updated_by" => 1, "is_deleted"=> 0],
                ['name' => "leaderboard", "description" => "", "sequence" => 4 ,"created_by" => 1, "updated_by" => 1, "is_deleted"=> 0],
                ['name' => "badge", "description" => "", "sequence" => 5 ,"created_by" => 1, "updated_by" => 1, "is_deleted"=> 0],
            ]);
     
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        DB::table('motivator_opts')->delete();
    }
}
