<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PatternTaskTemplateRelation extends Model
{
    //
    protected $table = 'pattern_task_template_relation';
    protected $primaryKey = 'id';
    public $timestamps = true;
}
