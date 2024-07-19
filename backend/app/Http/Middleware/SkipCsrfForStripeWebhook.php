<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SkipCsrfForStripeWebhook
{
    protected $except = [
        '/webhook',
    ];

    public function handle(Request $request, Closure $next)
    {
        if ($this->shouldSkip($request)) {
            return $next($request);
        }

        return app(\Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class)
            ->handle($request, $next);
    }

    protected function shouldSkip($request)
    {
        foreach ($this->except as $except) {
            if ($request->is($except)) {
                return true;
            }
        }

        return false;
    }
}
