<?php

/**
 * -------------------------------------------
 * Fleetbase Core API Configuration
 * -------------------------------------------
 */
return [
    'api' => [
        'version' => '0.0.1',
        'routing' => [
            'prefix' => '~registry',
            'internal_prefix' => 'v1'
        ],
    ],
    'registry' => [
        'host' => env('REGISTRY_HOST', 'https://registry.fleetbase.io'),
        'token' => env('REGISTRY_TOKEN', env('REGISTRY_AUTH_TOKEN'))
    ],
    'stripe' => [
        'key' => env('STRIPE_KEY', env('STRIPE_API_KEY')),
        'secret' => env('STRIPE_SECRET', env('STRIPE_API_SECRET')),
        'webhook_secret' => env('STRIPE_WEBHOOK_SECRET'),
    ],
    'extensions' => [
        'preinstalled' => env('PREINSTALLED_EXTENSIONS', false)
    ],
    'facilitator_fee' => env('REGISTRY_FACILITATOR_FEE', 10)
];
