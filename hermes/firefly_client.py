import requests
from config import FIREFLY_BASE_URL, FIREFLY_API_TOKEN


def _headers():
    return {
        "Authorization": f"Bearer {FIREFLY_API_TOKEN}",
        "Accept": "application/json",
        "Content-Type": "application/json",
    }


def get_accounts(account_type: str = "asset") -> list[dict]:
    url = f"{FIREFLY_BASE_URL}/api/v1/accounts"
    resp = requests.get(url, headers=_headers(), params={"type": account_type}, timeout=10)
    resp.raise_for_status()
    return resp.json().get("data", [])


def get_summary() -> dict:
    url = f"{FIREFLY_BASE_URL}/api/v1/summary/basic"
    resp = requests.get(url, headers=_headers(), timeout=10)
    resp.raise_for_status()
    return resp.json()


def get_recent_transactions(limit: int = 5) -> list[dict]:
    url = f"{FIREFLY_BASE_URL}/api/v1/transactions"
    resp = requests.get(url, headers=_headers(), params={"limit": limit, "page": 1}, timeout=10)
    resp.raise_for_status()
    return resp.json().get("data", [])


def get_bills() -> list[dict]:
    url = f"{FIREFLY_BASE_URL}/api/v1/bills"
    resp = requests.get(url, headers=_headers(), timeout=10)
    resp.raise_for_status()
    return resp.json().get("data", [])


def get_budgets() -> list[dict]:
    url = f"{FIREFLY_BASE_URL}/api/v1/budgets"
    resp = requests.get(url, headers=_headers(), timeout=10)
    resp.raise_for_status()
    return resp.json().get("data", [])
