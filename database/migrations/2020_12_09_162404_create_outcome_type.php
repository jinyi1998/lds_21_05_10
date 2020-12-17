<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOutcomeType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('outcome_type', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('name');
            $table->text('name_ch');
            $table->longText('hint');
            $table->smallInteger('sequence');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted')->default(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });

        // init data
        DB::table('outcome_type')->insert([
            [
                'name' => 'Disciplinary Knowledge',
                'name_ch' => '',
                'hint' => 'Disciplinary knowledge focuses on memorization, recall, interpretation of information and meaning. For example, define technical terms by giving properties. Explain scientific principles by giving examples.',
                'sequence' => 1,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'Disciplinary Skills',
                'name_ch' => '',
                'hint' => 'Disciplinary skills focus on using learning materials or concepts in a new context. For example, predict the effect of a change in a variable for the experiment., or formulate hypotheses based upon the analysis. Or evaluate the design artefacts critically.',
                'sequence' => 2,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'name' => 'Generic Skills',
                'name_ch' => '',
                'hint' => 'Generic skills are often referred as 21st century skills, including communication, collaboration, critical thinking, creativity, problem solving, and self-directed learning.',
                'sequence' => 3,
                'created_by' => 1,
                'updated_by' => 1,
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('outcome_type');
    }
}
