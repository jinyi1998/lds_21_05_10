<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LearningOutcomeTemplateSTEMRelation extends Model
{
    //
    protected $table = 'outcome_template_stem_type_relation';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = ['stem_type_id', 'outcome_id', 'created_by', 'updated_by', 'is_deleted'];
}
