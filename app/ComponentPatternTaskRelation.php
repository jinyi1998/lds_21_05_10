<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ComponentPatternTaskRelation extends Model
{
    //
    protected $table = 'component_pattern_task_relation';
    protected $primaryKey = 'id';
    protected $fillable = ['component_id', 'pattern_id', 'task_id', 'sequence', 'created_by', 'updated_by', 'is_deleted'];
    public $timestamps = true;
}
