<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyTasktypeOptsAddColumnSequence extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('learningTasktypeOpts', function($table)
        {
            $table->smallInteger('sequence')->nullable();
        });
        
        DB::table('learningTasktypeOpts')->where('id', 4)->update([
            'description' => "Practice",
        ]);

        $type = DB::table('learningTasktypeOpts')->get();

        foreach($type as $_type){
            $sequence = 1;
            switch($_type->description){
                case 'Receiving & Interpreting Information':
                    $sequence = 1;
                    break;
                case 'Practice':
                    $sequence = 2;
                    break;
                case 'Test / Assessment':
                    $sequence = 3;
                    break;
                case 'Information Exploration':
                    $sequence = 4;
                    break;
                case 'Explorations through Conversation':
                    $sequence = 5;
                    break;
                case 'Tangible / Immersive Investigation':
                    $sequence = 6;
                    break;
                case 'Construction: Conceptual / Visual Artefacts':
                    $sequence = 7;
                    break;
                case 'Construction: Tangible / Manipulable Artifacts':
                    $sequence = 8;
                    break;
                case 'Presentations, Performance Illustrations':
                    $sequence = 9;
                    break;
                case 'Reflection':
                    $sequence = 10;
                    break;
                case 'Revision':
                    $sequence = 11;
                    break;
                case 'Self-/Peer-assessment':
                    $sequence = 12;
                    break;
            }

            DB::table('learningTaskTypeOpts')->where('id', $_type->id)->update([
                'sequence' => $sequence,
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
        Schema::table('learningTaskTypeOpts', function($table)
        {
            $table->dropColumn('sequence');
        });
    }
}
