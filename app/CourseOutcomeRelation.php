<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CourseOutcomeRelation extends Model
{
    //
    protected $table = 'course_outcome_relation';
    protected $primaryKey = 'id';
    protected $fillable = ['outcome_id', 'course_id', 'created_by', 'updated_by', 'is_deleted'];
    public $timestamps = true;
}
