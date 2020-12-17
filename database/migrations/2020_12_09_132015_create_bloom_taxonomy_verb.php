<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBloomTaxonomyVerb extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bloom_taxonomy_verb', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('name');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted')->default(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });

        $remember = ['Recall', 'Relate', 'Recognize', "Memorize", "Repeat", "Record", "List"];
        $comprehend = ['Estimate', 'Discuss', 'Describe', 'Recognize', 'Explain', 'Express', 'Identify'];
        $apply = ['Interpret', 'Apply', 'Emply', 'Use', 'Demonstrate', 'Dramatize', 'Practice', 'Illustrate', 'Operate', 'Schedule', 'Shop', 'Sketch'];
        $analyze = ['Distinguish', 'Analyze', 'Differentiate', 'Appraise', 'Calculate', 'Experiment', 'Test', 'Compare', 'Contrast', 'Criticize', 'Diagram', 'Inspect'
        , 'Debate', 'Inventory', 'Question', 'Relate'];
        $evaluation = ['Judge', 'Appraise', 'Rate', 'Evaluate', 'Compare', 'Revise', 'Score', 'Select', 'Choose', 'Assess Estimate', 'Measure'];
        $create = ['Compose', 'Plan', 'Propose', 'Design', 'Formulate', 'Arrange', 'Collect', 'Construct', 'Create', 'Set up', 'Organize', 'Manage', 'prepare'];

        foreach($remember as $_verb){
            DB::table('bloom_taxonomy_verb')->insert(
                [
                    'name' => $_verb,
                    'created_by' => 1,
                    'updated_by' => 1,
                ]
            );
        }

        foreach($comprehend as $_verb){
            DB::table('bloom_taxonomy_verb')->insert(
                [
                    'name' => $_verb,
                    'created_by' => 1,
                    'updated_by' => 1,
                ]
            );
        }

        foreach($apply as $_verb){
            DB::table('bloom_taxonomy_verb')->insert(
                [
                    'name' => $_verb,
                    'created_by' => 1,
                    'updated_by' => 1,
                ]
            );
        }

        foreach($analyze as $_verb){
            DB::table('bloom_taxonomy_verb')->insert(
                [
                    'name' => $_verb,
                    'created_by' => 1,
                    'updated_by' => 1,
                ]
            );
        }

        foreach($evaluation as $_verb){
            DB::table('bloom_taxonomy_verb')->insert(
                [
                    'name' => $_verb,
                    'created_by' => 1,
                    'updated_by' => 1,
                ]
            );
        }
        
        foreach($create as $_verb){
            DB::table('bloom_taxonomy_verb')->insert(
                [
                    'name' => $_verb,
                    'created_by' => 1,
                    'updated_by' => 1,
                ]
            );
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bloom_taxonomy_verb');
    }
}
