<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ElearningtoolOpts extends Model
{
    //
    protected $table = 'elearningtoolOpts';
    protected $primaryKey = 'id';
    public $timestamps = true;

    public function moodlemodid(){
        return $this->hasOne(
            'App\LearningToolMoodleRelation',
            'tool_id',
            'id'
        );
    }

    public function moodlemod(){
        return $this->hasOneThrough(
            'App\MoodleMod',
            'App\LearningToolMoodleRelation',
            'tool_id', 
            'id',
            'id', 
            'moodle_mod_id' 
        );
    }

    public function createdby(){
        return $this->hasOne(
            'App\User',
            'id',
            'created_by'
        );
    }

    public function updatedby(){
        return $this->hasOne(
            'App\User',
            'id',
            'updated_by'
        );
    }

}
