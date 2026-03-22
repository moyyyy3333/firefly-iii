<?php

/*
 * SupabaseController.php
 * Copyright (c) 2026 james@firefly-iii.org
 *
 * This file is part of Firefly III (https://github.com/firefly-iii).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

declare(strict_types=1);

namespace FireflyIII\Api\V1\Controllers\System;

use FireflyIII\Api\V1\Controllers\Controller;
use FireflyIII\Services\Supabase\SupabaseClient;
use FireflyIII\User;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\JsonResponse;
use RuntimeException;

final class SupabaseController extends Controller
{
    /**
     * Sync the authenticated Firefly III user to Supabase.
     */
    public function syncUser(): JsonResponse
    {
        /** @var User|null $user */
        $user = auth()->user();
        if (null === $user) {
            return response()->api(['message' => 'Not authenticated.'])->setStatusCode(401)->header('Content-Type', self::JSON_CONTENT_TYPE);
        }

        /** @var SupabaseClient $supabase */
        $supabase = app(SupabaseClient::class);
        if (!$supabase->isConfigured()) {
            return response()->api(['message' => 'Supabase is not configured.'])->setStatusCode(422)->header('Content-Type', self::JSON_CONTENT_TYPE);
        }

        $payload = [[
            'firefly_user_id' => $user->id,
            'email'           => (string) ($user->email ?? ''),
            'name'            => (string) ($user->name ?? ''),
            'updated_at'      => now()->toIso8601String(),
        ]];

        try {
            $response = $supabase->rest(
                'POST',
                'firefly_users',
                ['on_conflict' => 'firefly_user_id'],
                $payload,
                true,
                ['Prefer' => 'resolution=merge-duplicates']
            );
            $status   = $response->getStatusCode();
        } catch (GuzzleException|RuntimeException $e) {
            return response()->api([
                'message' => 'Could not sync user to Supabase.',
                'error'   => $e->getMessage(),
            ])->setStatusCode(502)->header('Content-Type', self::JSON_CONTENT_TYPE);
        }

        return response()->api([
            'data' => [
                'status'          => 'ok',
                'supabase_status' => $status,
                'table'           => 'firefly_users',
                'firefly_user_id' => $user->id,
            ],
        ])->header('Content-Type', self::JSON_CONTENT_TYPE);
    }
}