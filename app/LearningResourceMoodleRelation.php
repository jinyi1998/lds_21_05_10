<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LearningResourceMoodleRelation extends Model
{
    //
    protected $table = 'learning_resource_moodle_relation';
    protected $primaryKey = 'id';
    protected $fillable = ['resource_id', 'moodle_mod_id', 'created_by', 'updated_by', 'is_deleted',];
    public $timestamps = true;
}
