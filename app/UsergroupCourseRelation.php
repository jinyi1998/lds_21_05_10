<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsergroupCourseRelation extends Model
{
    //
    protected $table = 'usergroup_course_relation';
    protected $primaryKey = 'id';
    protected $fillable = ['usergroup_id', 'course_id','created_by', 'updated_by', 'is_deleted'];
    public $timestamps = true;
}
