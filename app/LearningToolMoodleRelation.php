<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LearningToolMoodleRelation extends Model
{
    //
    protected $table = 'learning_tool_moodle_relation';
    protected $primaryKey = 'id';
    protected $fillable = ['tool_id', 'moodle_mod_id', 'created_by', 'updated_by', 'is_deleted'];
    public $timestamps = true;
}
