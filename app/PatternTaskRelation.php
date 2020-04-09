<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PatternTaskRelation extends Model
{
    //
    protected $table = 'pattern_task_relational';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = ['task_id', 'learningpattern_id', 'created_by', 'updated_by', 'is_deleted'];
}
