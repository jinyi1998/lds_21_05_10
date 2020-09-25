<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TaskTemplateToolRelation extends Model
{
    //
    protected $table = 'learningtask_template_etool';
    protected $primaryKey = 'id';
    protected $fillable = ['elearningtool_id', 'created_by', 'updated_by', 'is_deleted'];
    public $timestamps = true;
}
