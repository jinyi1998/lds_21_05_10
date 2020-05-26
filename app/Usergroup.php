<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usergroup extends Model
{
    //
    protected $table = 'usergroup';
    protected $primaryKey = 'id';
    protected $fillable = ['name', 'description', 'type', 'created_by', 'updated_by', 'is_deleted'];
    public $timestamps = true;

    public function userid(){
        return $this->hasMany(
            'App\UsergroupUserRelation',
            'usergroup_id'
        )->select(['user_id','usergroup_id']);
    }

    public function users(){
        return $this->hasManyThrough(
            'App\User',
            'App\UsergroupUserRelation',
            'usergroup_id',
            'id',
            'id',
            'user_id'
        )->select('users.name', 'users.school', 'users.email', 'usergroup_user_relation.created_at', 'usergroup_user_relation.id as relation_id');
    }

    public function useridtemp(){
        return $this->hasMany(
            'App\UsergroupUserTempRelation',
            'usergroup_id'
        )->select(['user_id','usergroup_id']);
    }

    public function userstemp(){
        return $this->hasManyThrough(
            'App\User',
            'App\UsergroupUserTempRelation',
            'usergroup_id',
            'id',
            'id',
            'user_id'
        )->select('users.name', 'users.school', 'users.email', 'usergroup_user_temp_relation.created_at', 'usergroup_user_temp_relation.id as relation_id');
    }


}
