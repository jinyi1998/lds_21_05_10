<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateLearningToolOtps extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $data =  [
            [
                'description' => 'Assignment Submission',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        foreach($data as $_elearningtools){
            DB::table('elearningtoolOpts')
            ->insert($_elearningtools);
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
        DB::table('elearningtoolOpts')
        ->where('description', 'Assignment Submission')
        ->delete();
    }
}
