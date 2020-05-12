<?php

use Illuminate\Database\Seeder;

class LearningTasksOtpsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('classTypeOpts')->insert([
            [
                'description' => 'In Class',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Out Class',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);

        DB::table('classTargetOpts')->insert([
            [
                'description' => 'Whole Class',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],[
                'description' => 'Group',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],[
                'description' => 'Individual',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);

        if(! DB::table('learningTasktypeOpts') ->where('id', 1)->exists()){
            DB::table('learningTasktypeOpts')->insert([
                [
                    'description' => 'Receiving and interpreting information',
                    'color' => '#194d33',
                    'created_by' => 1,
                    'updated_by' => 1,
                    'is_deleted' => false,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'description' => 'Exploration through conversation',
                    'color' => '#FF6900',
                    'created_by' => 1,
                    'updated_by' => 1,
                    'is_deleted' => false,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'description' => 'Construction: Conceptual/visual artefacts',
                    'color' => '#FCB900',
                    'created_by' => 1,
                    'updated_by' => 1,
                    'is_deleted' => false,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'description' => 'Presentation, performance and illustration',
                    'color' => '#7BDCB5',
                    'created_by' => 1,
                    'updated_by' => 1,
                    'is_deleted' => false,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'description' => 'Informaton exploration',
                    'color' => '#8ED1FC',
                    'created_by' => 1,
                    'updated_by' => 1,
                    'is_deleted' => false,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'description' => 'Self/Peer-Assessment',
                    'color' => '#0693E3',
                    'created_by' => 1,
                    'updated_by' => 1,
                    'is_deleted' => false,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'description' => 'Revision',
                    'color' => '#EB144C',
                    'created_by' => 1,
                    'updated_by' => 1,
                    'is_deleted' => false,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'description' => 'Tangible/immersive investigation',
                    'color' => '#9900EF',
                    'created_by' => 1,
                    'updated_by' => 1,
                    'is_deleted' => false,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'description' => 'Reflection',
                    'color' => '#069113',
                    'created_by' => 1,
                    'updated_by' => 1,
                    'is_deleted' => false,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
                [
                    'description' => 'Presentations, illustration, and performance',
                    'color' => '#EB1FFC',
                    'created_by' => 1,
                    'updated_by' => 1,
                    'is_deleted' => false,
                    'created_at' => now(),
                    'updated_at' => now()
                ],
            ]);
        }
      

        DB::table('classSizeOpts')->insert([
            [
                'description' => 'N/A',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => '6 per group',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => '5 per group',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => '4 per group',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => '3 per group',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => '2 per group',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Individual',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);

        DB::table('resourceOpts')->insert([
            [
                'description' => 'Videos',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Articles',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Worksheets',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Rubrics',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Materials',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Guidelines',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);

        DB::table('elearningtoolOpts')->insert([
            [
                'description' => 'Moodle (discussion forum)',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Moodle (wiki)',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Moodle (portfolio)',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Moodle (Polling/ survey)',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Instant messenger',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Video conferencing system',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'description' => 'Google toolkits',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);


    }
}
