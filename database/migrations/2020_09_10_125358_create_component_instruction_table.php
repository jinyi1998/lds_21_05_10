<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComponentInstructionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('component_instruction', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('title');
            $table->text('media');
            $table->text('description');
            $table->smallInteger('created_by');
            $table->smallInteger('updated_by');
            $table->boolean('is_deleted');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });

        //data init
        DB::table('component_instruction')->insert([
            [
                'id' => 1,
                'title' => 'Identify problem through goal-setting',
                'media' => '/asset/image/design_type_logo/ED/ED_1.png',
                'description' => 'Engineering design is the process of designing and creating products to solve problems in daily life. The first step of engineering design process is to identify an authentic problem to be addressed. Who raises the problem? In the SDL approach, it is not the teacher but students who take the lead to raise a problem to be solved by engineering design. How can teachers help students to raise a good problem? Good strategies include group brainstorming and a role-play of client interviews to understand the needs of users targeted.',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 2,
                'title' => 'Ideate and design solution through self-planning',
                'media' => '/asset/image/design_type_logo/ED/ED_2.png',
                'description' => 'Engineering design is NOT asking the students to follow the steps provided by teachers to create the product. Instead, students should ideate the solution by themselves, preferably in groupworks. Students may search solutions to relevant problems on the Internet, collect information and share with group mates. Teachers may provide guidance and rubrics to facilitate students’ ideation process.',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 3,
                'title' => 'Construct prototype through self-monitoring',
                'media' => '/asset/image/design_type_logo/ED/ED_3.png',
                'description' => 'Students will construct the product/prototype based on their plans made in previous steps. Before students’ taking actions, teachers need to lead students to discuss and agree on the success criteria of the product. Teachers may remind students to constantly refer to the success criteria in the process of constructing prototypes.',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 4,
                'title' => 'Test performance of the product through self-evaluation',
                'media' => '/asset/image/design_type_logo/ED/ED_4.png',
                'description' => 'There are different ways for testing the performance of the prototype. It can be a competition, a scientific investigation, or a client interview on the product efficacy. Whichever the form teachers choose, do not forget to ask students to conduct peer-assessment with the given success criteria in the previous step.',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 5,
                'title' => 'Optimize the product through revision',
                'media' => '/asset/image/design_type_logo/ED/ED_5.png',
                'description' => 'Engineering design is an iterative process. Students can start another round of engineering design with thinking about the improvement of the product based on the evaluation and feedback received in the previous step. It is also a good idea to integrate more subjects in this step, such as humanity and arts, when teachers may wish to ask students to make the prototype more attractive and user-friendly.',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 6,
                'title' => 'Formulate inquiry questions through goal setting',
                'media' => '/asset/image/design_type_logo/SI/SI_1.png',
                'description' => 'Scientific investigation is the way in which scientists study the natural world and propose explanations based on the evidence. Who asks the question to be investigated? In the SDL approach, it is not the teacher but students who take the lead to ask a problem. How to motivate students to ask questions? Teachers may encourage students to observe a phenomenon and ask them to predict what may happen when some conditions/variables change.',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 7,
                'title' => 'Research and Propose Hypothesis through goal setting',
                'media' => '/asset/image/design_type_logo/SI/SI_2.png',
                'description' => 'Students may be given opportunities to search relevant information, discuss in groups and generate the hypothesis for the inquiry question. Teachers may provide guidance and rubrics to facilitate students’ collaboration process.',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 8,
                'title' => 'Design Experiment through self-planning',
                'media' => '/asset/image/design_type_logo/SI/SI_3.png',
                'description' => 'Students will design a fair-test experiment to test their hypothesis. Teachers may provide guidance and rubrics to facilitate students’ design process.',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 9,
                'title' => 'Conduct Experiment through self-monitoring',
                'media' => '/asset/image/design_type_logo/SI/SI_4.png',
                'description' => 'Students will conduct the experience designed to test their hypothesis. Before students’ taking actions, teachers need to lead students to discuss and agree on the success criteria of the experiment. Teachers may remind students to constantly refer to the success criteria in the process of experiment.',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 10,
                'title' => 'Analyse Data and interpret results through self-evaluation and revision',
                'media' => '/asset/image/design_type_logo/SI/SI_5.png',
                'description' => 'Students identify causal and correlational relationships of different groups of data sets collected from the experiment and write down their statements using the process of scientific reasoning (CER). Please remember to ask students to conduct peer-assessment with the given success criteria in the previous step.',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 11,
                'title' => 'Start From Strach',
                'media' => '/asset/image/design_type_logo/SFS/SFS_1.png',
                'description' => 'It is written',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
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
        Schema::dropIfExists('component_instruction');
    }
}
