<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyOutcometypeRenameGenericskill extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        DB::table('outcome_type')->where('id', 3)->update([
            'name' => "Non-disciplinary Outcomes",
            'hint' => "Non-discplinary outcomes are usually referred as 21st century skills, including communication, collaboration, critical thinking, creativity, problem solving, and self-directed learning; as well as emotions, attitudes and values."
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
    }
}
