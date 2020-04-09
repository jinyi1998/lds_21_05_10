<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TaskTemplateResourceRelation extends Model
{
    //
    protected $table = 'learningtask_template_resource';
    protected $primaryKey = 'id';
    protected $fillable = ['learningoutcome_id'];
    public $timestamps = true;
}
