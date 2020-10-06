<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DesignTypeComponentTemplateRelation extends Model
{
    //
    protected $table = 'designtype_component_template_relation';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [ 'designtype_id', 'component_id', 'created_by', 'updated_by', 'is_deleted'];
}
