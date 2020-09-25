<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TaskTemplateResourceRelation extends Model
{
    //
    protected $table = 'learningtask_template_resource';
    protected $primaryKey = 'id';
    protected $fillable = ['resource_id', 'created_by', 'updated_by', 'is_deleted'];
    public $timestamps = true;
}
