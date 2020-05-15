<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LearningOutcomeCLOULORelation extends Model
{
    //
    protected $table = 'unit_outcome_component_outcome_relation';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = ['component_outcomeid', 'unit_outcomeid', 'created_by', 'updated_by', 'is_deleted'];
}
