<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LearningOutcome extends Model
{
    //
    protected $table = 'learningoutcome';
    protected $primaryKey = 'id';
    public $timestamps = true;

    public function componentid(){
        return $this->belongsTo('App\ComponentOutcomeRelation', 'id', 'outcome_id');
    }

    public function courseid(){
        return $this->belongsTo('App\CourseOutcomeRelation', 'id', 'outcome_id');
    }
}
