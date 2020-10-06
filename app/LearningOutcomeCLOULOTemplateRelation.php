<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LearningOutcomeCLOULOTemplateRelation extends Model
{
    //
    protected $table = 'unit_outcome_component_outcome_template_relation';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = ['component_outcome_id', 'unit_outcome_id', 'created_by', 'updated_by', 'is_deleted'];
}
