<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InitFeedbackOptsData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
       

            DB::table('feedback_opts')
            ->insert(
                [
                    ['name' => "teacher feedback", "description" => "", "sequence" => 1 ,"created_by" => 1, "updated_by" => 1, "is_deleted"=> 0],
                    ['name' => "peer-review feedback ", "description" => "", "sequence" => 2 ,"created_by" => 1, "updated_by" => 1, "is_deleted"=> 0],
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
        DB::table('feedback_opts')->delete();
    }
}
