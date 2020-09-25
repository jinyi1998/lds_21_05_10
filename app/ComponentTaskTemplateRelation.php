<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ComponentTaskTemplateRelation extends Model
{
    //
    protected $table = 'component_task_template_relation';
    protected $primaryKey = 'id';
    protected $fillable = ['component_id', 'task_id', 'created_by', 'updated_by', 'is_deleted', 'sequence'];
    public $timestamps = true;
}
