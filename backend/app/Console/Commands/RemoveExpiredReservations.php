<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RemoveExpiredReservations extends Command
{
    protected $signature = 'reservations:cleanup';
    protected $description = 'Remove expired reservations from the database';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $expirationTime = Carbon::now()->subHours(24);

        
        DB::table('reservations')
            ->where('created_at', '<', $expirationTime)
            ->delete();

        $this->info('Expired reservations cleaned up successfully.');
    }
}