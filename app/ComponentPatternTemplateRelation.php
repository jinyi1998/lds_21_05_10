<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ComponentPatternTemplateRelation extends Model
{
    //
    protected $table = 'component_pattern_template_relation';
    protected $primaryKey = 'id';
    protected $fillable = ['component_id', 'pattern_id', 'created_by', 'updated_by', 'is_deleted'];
    public $timestamps = true;
}
