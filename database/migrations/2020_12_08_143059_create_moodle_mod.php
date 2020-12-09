<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMoodleMod extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('moodle_mod', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('name');
            $table->text('name_moodle');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted')->default(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });

        //init data
        DB::table('moodle_mod')->insert([
            [
                "name" => 'assign',
                "name_moodle" => 'mod_assign',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'assignment',
                "name_moodle" => 'mod_assignment',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'book',
                "name_moodle" => 'mod_book',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'chat',
                "name_moodle" => 'mod_chat',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'choice',
                "name_moodle" => 'mod_choice',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'data',
                "name_moodle" => 'mod_data',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'feedback',
                "name_moodle" => 'mod_feedback',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'folder',
                "name_moodle" => 'mod_folder',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'forum',
                "name_moodle" => 'mod_forum',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'glossary',
                "name_moodle" => 'mod_glossary',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'h5pactivity',
                "name_moodle" => 'mod_h5pactivity',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'imscp',
                "name_moodle" => 'mod_imscp ',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'label',
                "name_moodle" => 'mod_label',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'lesson',
                "name_moodle" => 'mod_lesson',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'lti',
                "name_moodle" => 'mod_lti',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'page',
                "name_moodle" => 'mod_page',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'quiz',
                "name_moodle" => 'mod_quiz',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'resource',
                "name_moodle" => 'mod_resource',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'scorm',
                "name_moodle" => 'mod_scorm',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'survey',
                "name_moodle" => 'mod_survey',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'url',
                "name_moodle" => 'mod_url',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'wiki',
                "name_moodle" => 'mod_wiki',
                "created_by" => 1,
                "updated_by" => 1
            ],
            [
                "name" => 'workshop',
                "name_moodle" => 'mod_workshop',
                "created_by" => 1,
                "updated_by" => 1
            ],

        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('moodle_mod');
    }
}
