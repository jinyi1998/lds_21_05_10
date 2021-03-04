<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PublicSharing extends Model
{
    //
    protected $table = 'public_sharing';
    protected $primaryKey = 'id';
    public $timestamps = true;
}
