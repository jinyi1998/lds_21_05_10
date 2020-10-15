<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ComponentInstruction extends Model
{
    //
    protected $table = 'component_instruction';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = ['title', 'media', 'description', 'created_by', 'updated_by', 'is_deleted'];

    public function componentid(){
        return $this->belongsTo('App\ComponentComponentInstructionRelation', 'id','component_instruction_id');
    }
}
