<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PatternTaskTemplateRelation extends Model
{
    //
    protected $table = 'pattern_task_template_relation';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = ['task_id', 'pattern_id', 'created_by', 'updated_by', 'is_deleted', 'sequence'];
}
