<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CourseComponentRelation extends Model
{
    //
    protected $table = 'course_component_relation';
    protected $primaryKey = 'id';
    protected $fillable = ['component_id', 'course_id', 'created_by', 'updated_by', 'is_deleted'];
    public $timestamps = true;
}
