<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TaskToolRelation extends Model
{
    //
    protected $table = 'learningtask_etool';
    protected $primaryKey = 'id';
    protected $fillable = ['elearningtool_id', 'created_by', 'updated_by', 'is_deleted'];
    // protected $visible = ['learningoutcome_id'];
    public $timestamps = true;

    public function moodlemod(){
        return $this->hasOneThrough(
            'App\MoodleMod',
            'App\LearningToolMoodleRelation',
            'tool_id',
            'id',
            'elearningtool_id',
            'moodle_mod_id'
        );
        // return $this->hasOne(, 'tool_id', );
    }
}
