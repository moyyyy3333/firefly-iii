from telegram import Update
from telegram.ext import ContextTypes

import firefly_client as ff
from config import TELEGRAM_ALLOWED_CHAT_IDS


def _is_allowed(update: Update) -> bool:
    if not TELEGRAM_ALLOWED_CHAT_IDS:
        return True
    return update.effective_chat.id in TELEGRAM_ALLOWED_CHAT_IDS


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not _is_allowed(update):
        return
    await update.message.reply_text(
        "👋 <b>Hermes</b> — your Firefly III assistant\n\n"
        "/balance — account balances\n"
        "/transactions — last 5 transactions\n"
        "/bills — upcoming bills\n"
        "/budgets — budget overview\n"
        "/help — this message",
        parse_mode="HTML",
    )


async def balance(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not _is_allowed(update):
        return
    try:
        accounts = ff.get_accounts("asset")
        if not accounts:
            await update.message.reply_text("No asset accounts found.")
            return
        lines = ["<b>Account Balances</b>"]
        for acc in accounts:
            attrs = acc.get("attributes", {})
            name = attrs.get("name", "Unknown")
            balance_val = attrs.get("current_balance", "0.00")
            currency = attrs.get("currency_symbol", "")
            lines.append(f"• {name}: {currency}{balance_val}")
        await update.message.reply_text("\n".join(lines), parse_mode="HTML")
    except Exception as e:
        await update.message.reply_text(f"Error fetching balances: {e}")


async def transactions(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not _is_allowed(update):
        return
    try:
        txns = ff.get_recent_transactions(5)
        if not txns:
            await update.message.reply_text("No recent transactions found.")
            return
        lines = ["<b>Last 5 Transactions</b>"]
        for txn in txns:
            attrs = txn.get("attributes", {})
            splits = attrs.get("transactions", [{}])
            t = splits[0] if splits else {}
            desc = t.get("description", "No description")
            amount = t.get("amount", "0.00")
            currency = t.get("currency_symbol", "")
            date = t.get("date", "")[:10]
            lines.append(f"• {date} — {desc}: {currency}{amount}")
        await update.message.reply_text("\n".join(lines), parse_mode="HTML")
    except Exception as e:
        await update.message.reply_text(f"Error fetching transactions: {e}")


async def bills(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not _is_allowed(update):
        return
    try:
        bill_list = ff.get_bills()
        if not bill_list:
            await update.message.reply_text("No bills found.")
            return
        lines = ["<b>Bills</b>"]
        for bill in bill_list:
            attrs = bill.get("attributes", {})
            name = attrs.get("name", "Unknown")
            amount_min = attrs.get("amount_min", "0.00")
            amount_max = attrs.get("amount_max", "0.00")
            currency = attrs.get("currency_symbol", "")
            next_expected = attrs.get("next_expected_match", "unknown")[:10]
            lines.append(f"• {name}: {currency}{amount_min}–{currency}{amount_max} (next: {next_expected})")
        await update.message.reply_text("\n".join(lines), parse_mode="HTML")
    except Exception as e:
        await update.message.reply_text(f"Error fetching bills: {e}")


async def budgets(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not _is_allowed(update):
        return
    try:
        budget_list = ff.get_budgets()
        if not budget_list:
            await update.message.reply_text("No budgets found.")
            return
        lines = ["<b>Budgets</b>"]
        for budget in budget_list:
            attrs = budget.get("attributes", {})
            name = attrs.get("name", "Unknown")
            spent = attrs.get("spent", [{}])
            spent_val = spent[0].get("sum", "0.00") if spent else "0.00"
            currency = spent[0].get("currency_symbol", "") if spent else ""
            lines.append(f"• {name}: {currency}{spent_val} spent")
        await update.message.reply_text("\n".join(lines), parse_mode="HTML")
    except Exception as e:
        await update.message.reply_text(f"Error fetching budgets: {e}")


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await start(update, context)
