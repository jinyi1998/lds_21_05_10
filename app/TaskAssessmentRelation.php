<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TaskAssessmentRelation extends Model
{
    //
    protected $table = 'learningtask_assessment';
    protected $primaryKey = 'id';
    protected $fillable = ['learningoutcome_id', 'created_by', 'updated_by', 'is_deleted'];
    public $timestamps = true;
}
