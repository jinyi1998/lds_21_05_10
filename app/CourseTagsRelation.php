<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CourseTagsRelation extends Model
{
    //
    protected $table = 'course_tags_relation';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [ 'course_id', 'tags_id', 'created_by', 'updated_by', 'is_deleted'];
}
