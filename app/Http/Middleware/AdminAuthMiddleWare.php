<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class AdminAuthMiddleWare
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (\Auth::user()->is_admin == true) {
            return $next($request);
        }
    
          return response()->json(Auth::user());
    }
}
