<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TaskResourceRelation extends Model
{
    //
    protected $table = 'learningtask_resource';
    protected $primaryKey = 'id';
    protected $fillable = ['resource_id', 'created_by', 'updated_by', 'is_deleted'];
    public $timestamps = true;

    public function moodlemod(){
        return $this->hasOneThrough(
            'App\MoodleMod',
            'App\LearningResourceMoodleRelation',
            'resource_id',
            'id',
            'resource_id',
            'moodle_mod_id'
        );
        // return $this->hasOne('App\LearningResourceMoodleRelation', 'resource_id', 'resource_id');
    }
}
