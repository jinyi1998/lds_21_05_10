<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'school'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function usergroupid(){
        return $this->hasMany(
            'App\UsergroupUserRelation',
            'user_id',
            'id'
        )->select(['user_id','usergroup_id']);
    }

    public function usergroup(){
        return $this->hasManyThrough(
            'App\Usergroup',
            'App\UsergroupUserRelation',
            'user_id',
            'id',
            'id',
            'usergroup_id'
        )->select(['usergroup.id','name']);
    }
}
