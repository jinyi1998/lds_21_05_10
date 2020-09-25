<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnLearningTaskHasAssessment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('learningtask', function($table) {
            $table->Boolean('has_assessment')->default(false);
        });

        DB::table('learningtask')
        ->whereRaw('learningtask.id in (select distinct learningtask_id from learningtask_assessment where learningtask_id = learningtask.id)')
        ->update(['has_assessment'=> true]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('learningtask', function($table) {
            $table->dropColumn('has_assessment');
        });
    }
}
