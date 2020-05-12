<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LessonTaskRelation extends Model
{
    //
    protected $table = 'lesson_task_relation';
    protected $primaryKey = 'id';
    protected $fillable = ['lesson_id', 'task_id', 'created_by', 'updated_by', 'is_deleted', 'sequence'];
    public $timestamps = true;
}

