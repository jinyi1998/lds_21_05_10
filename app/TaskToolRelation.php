<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TaskToolRelation extends Model
{
    //
    protected $table = 'learningtask_etool';
    protected $primaryKey = 'id';
    protected $fillable = ['elearningtool_id', 'created_by', 'updated_by', 'is_deleted'];
    // protected $visible = ['learningoutcome_id'];
    public $timestamps = true;
}
