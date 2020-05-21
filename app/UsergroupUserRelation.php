<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsergroupUserRelation extends Model
{
    //
    protected $table = 'usergroup_user_relation';
    protected $primaryKey = 'id';
    protected $fillable = ['usergroup_id', 'user_id', 'permission','created_by', 'updated_by', 'is_deleted'];
    public $timestamps = true;

}
