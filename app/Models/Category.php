<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'categoryId';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var string
     */
    protected $fillable = [
        'categoryId',
        'categoryName',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
    ];
}
