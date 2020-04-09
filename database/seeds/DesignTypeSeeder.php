<?php

use Illuminate\Database\Seeder;

class DesignTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('design_type')->insert([
            [
                'name' => 'Engineering Design SDL',
                'description' => 'Using engineering design practice to guide the learing task 
                sequence design by adopting the self-directed learning approach',
                'hint' => 'Engineering Design approach guides you...',
                'media' => 'https://cdn2.iconfinder.com/data/icons/conceptual-vectors-of-logos-and-symbols/66/204-512.png',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Scienitic Investigation SDL',
                'description' => 'Using scienitic investigation practice to guide the 
                learing task sequence design by adopting the self-directed learning approach',
                'hint' => 'Scientific investigation practice design approach guides you...',
                'media' => 'https://www.pinclipart.com/picdir/big/44-449704_nuclear-icon-nuclear-icon-png-clipart.png',
                'created_by' => 1,
                'updated_by' => 1,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
