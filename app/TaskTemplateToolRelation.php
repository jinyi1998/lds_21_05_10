<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TaskTemplateToolRelation extends Model
{
    //
    protected $table = 'learningtask_template_etool';
    protected $primaryKey = 'id';
    // protected $visible = ['learningoutcome_id'];
    public $timestamps = true;
}
