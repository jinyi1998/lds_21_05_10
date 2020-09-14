<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ComponentComponentInstructionRelation extends Model
{
    //
    protected $table = 'component_component_instruction_relation';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = ['component_id', 'component_instruction_id', 'created_by', 'updated_by', 'is_deleted'];
}
