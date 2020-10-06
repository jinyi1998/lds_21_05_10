<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ComponentOutcomeTemplateRelation extends Model
{
    //
        //
        protected $table = 'component_outcome_template_relation';
        protected $primaryKey = 'id';
        public $timestamps = true;

        protected $fillable = ['component_id', 'outcome_id', 'created_by', 'updated_by', 'is_deleted', 'sequence'];
}
