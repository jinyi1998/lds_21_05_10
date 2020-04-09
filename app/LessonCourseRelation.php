<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LessonCourseRelation extends Model
{
    //
    protected $table = 'lesson_course_relation';
    protected $primaryKey = 'id';
    protected $fillable = ['lesson_id', 'course_id', 'created_by', 'updated_by', 'is_deleted'];
    public $timestamps = true;
}
