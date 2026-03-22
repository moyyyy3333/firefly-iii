<?php

/*
 * SupabaseClient.php
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

namespace FireflyIII\Services\Supabase;

use GuzzleHttp\Client;
use Psr\Http\Message\ResponseInterface;
use RuntimeException;

class SupabaseClient
{
    private string $anonKey;
    private string $serviceRoleKey;
    private string $url;

    public function __construct()
    {
        $config               = config('services.supabase');
        $this->url            = rtrim((string) ($config['url'] ?? ''), '/');
        $this->anonKey        = (string) ($config['anon_key'] ?? '');
        $this->serviceRoleKey = (string) ($config['service_role_key'] ?? '');
    }

    public function isConfigured(): bool
    {
        return '' !== $this->url && ('' !== $this->anonKey || '' !== $this->serviceRoleKey);
    }

    /**
     * Generic request to any Supabase endpoint path.
     */
    public function request(string $method, string $path, array $options = [], bool $useServiceRole = false): ResponseInterface
    {
        $key    = $this->resolveApiKey($useServiceRole);
        $client = new Client(
            [
                'base_uri' => sprintf('%s/', $this->url),
                'timeout'  => 10,
            ]
        );

        $options['headers'] = array_merge(
            [
                'apikey'        => $key,
                'Authorization' => sprintf('Bearer %s', $key),
                'Accept'        => 'application/json',
            ],
            $options['headers'] ?? []
        );

        return $client->request($method, ltrim($path, '/'), $options);
    }

    /**
     * Request data from the PostgREST endpoint.
     */
    public function rest(string $method, string $table, array $query = [], array $payload = [], bool $useServiceRole = false, array $headers = []): ResponseInterface
    {
        $path = sprintf('rest/v1/%s', ltrim($table, '/'));
        if ([] !== $query) {
            $path = sprintf('%s?%s', $path, http_build_query($query, '', '&', PHP_QUERY_RFC3986));
        }

        $options = ['headers' => $headers];
        if ([] !== $payload) {
            $options['json'] = $payload;
            $options['headers']['Content-Type'] = 'application/json';
        }

        return $this->request($method, $path, $options, $useServiceRole);
    }

    /**
     * Call a Postgres function through Supabase RPC.
     */
    public function rpc(string $functionName, array $payload = [], bool $useServiceRole = false): ResponseInterface
    {
        return $this->request(
            'POST',
            sprintf('rest/v1/rpc/%s', ltrim($functionName, '/')),
            ['json' => $payload, 'headers' => ['Content-Type' => 'application/json']],
            $useServiceRole
        );
    }

    private function resolveApiKey(bool $useServiceRole): string
    {
        if ('' === $this->url) {
            throw new RuntimeException('Supabase URL is not configured.');
        }

        if ($useServiceRole) {
            if ('' === $this->serviceRoleKey) {
                throw new RuntimeException('Supabase service role key is not configured.');
            }

            return $this->serviceRoleKey;
        }

        if ('' !== $this->anonKey) {
            return $this->anonKey;
        }
        if ('' !== $this->serviceRoleKey) {
            return $this->serviceRoleKey;
        }

        throw new RuntimeException('Supabase API key is not configured.');
    }
}