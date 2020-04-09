<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TaskTemplateAssessmentRelation extends Model
{
    //
        //
        protected $table = 'learningtask_template_assessment';
        protected $primaryKey = 'id';
        // protected $visible = ['learningoutcome_id'];
        public $timestamps = true;
}
