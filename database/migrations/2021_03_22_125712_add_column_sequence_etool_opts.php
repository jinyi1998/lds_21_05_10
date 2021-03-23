<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnSequenceEtoolOpts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('elearningtoolopts', function (Blueprint $table) {
            $table->smallInteger('sequence');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('elearningtoolopts', function (Blueprint $table) {
            $table->dropColumn('sequence');
        });
    }
}
