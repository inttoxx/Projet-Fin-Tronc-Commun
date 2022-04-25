<?php

namespace App\Models;

use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'password',
        'birthdate',
        'username',
        'password',
        'admin',
        'picture_extension'
    ];
    public function posts()
    {
        return $this->hasMany('\App\Models\Post');
    }
    public function comments()
    {
        return $this->hasMany('\App\Models\Comment');
    }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public static function boot() {
        parent::boot();
        static::deleting(function($user) {
            foreach ($user->comments as $comment) {
                $comment->delete();
            }
            foreach ($user->posts as $post) {
                $post->delete();
            }
        });
    }
}
