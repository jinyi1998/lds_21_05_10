<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsergroupUserTempRelation extends Model
{
    //
    protected $table = 'usergroup_user_temp_relation';
    protected $primaryKey = 'id';
    protected $fillable = ['usergroup_id', 'user_id', 'permission','created_by', 'updated_by', 'is_deleted'];
    public $timestamps = true;
}
