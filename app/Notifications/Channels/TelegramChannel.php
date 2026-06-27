<?php

/*
 * TelegramChannel.php
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

namespace FireflyIII\Notifications\Channels;

use FireflyIII\Support\Facades\FireflyConfig;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramChannel
{
    public function send(mixed $notifiable, Notification $notification): void
    {
        if (!method_exists($notification, 'toTelegram')) {
            Log::warning('[Telegram] Notification has no toTelegram() method.');
            return;
        }

        $botToken = (string) FireflyConfig::getEncrypted('telegram_bot_token', '')->data;
        if ('' === $botToken) {
            Log::warning('[Telegram] No bot token configured, skipping notification.');
            return;
        }

        $chatId = $notifiable->routeNotificationFor('telegram', $notification);
        if ('' === (string) $chatId) {
            Log::warning('[Telegram] No chat ID for notifiable, skipping notification.');
            return;
        }

        $text = $notification->toTelegram($notifiable);
        if ('' === trim($text)) {
            Log::warning('[Telegram] Empty message text, skipping notification.');
            return;
        }

        $url = sprintf('https://api.telegram.org/bot%s/sendMessage', $botToken);

        try {
            $response = Http::post($url, [
                'chat_id'    => $chatId,
                'text'       => $text,
                'parse_mode' => 'HTML',
            ]);

            if (!$response->successful()) {
                Log::error(sprintf('[Telegram] API error: %s', $response->body()));
            } else {
                Log::debug(sprintf('[Telegram] Message sent to chat %s.', $chatId));
            }
        } catch (\Throwable $e) {
            Log::error(sprintf('[Telegram] Exception sending message: %s', $e->getMessage()));
        }
    }
}
