export const ecommerceSample = {
  json: `{
  "orders": [
    { "orderId": 1001, "sku": "A1", "name": "Widget", "qty": 2, "price": 9.99 },
    { "orderId": 1002, "sku": "B2", "name": "Gadget", "qty": 1, "price": 14.5 },
    { "orderId": 1003, "sku": "C3", "name": "Thingy", "qty": 5, "price": 2.99 }
  ]
}`,
  toon: `orders[3]{orderId\tsku\tname\tqty\tprice}:
1001\tA1\tWidget\t2\t9.99
1002\tB2\tGadget\t1\t14.5
1003\tC3\tThingy\t5\t2.99`,
} as const

export const analyticsSample = {
  json: `{
  "metrics": [
    { "date": "2025-01-01", "users": 1200, "views": 3400, "bounce": 0.42 },
    { "date": "2025-01-02", "users": 1400, "views": 3900, "bounce": 0.39 },
    { "date": "2025-01-03", "users": 1320, "views": 3700, "bounce": 0.41 }
  ]
}`,
  toon: `metrics[3]{date\tusers\tviews\tbounce}:
2025-01-01\t1200\t3400\t0.42
2025-01-02\t1400\t3900\t0.39
2025-01-03\t1320\t3700\t0.41`,
} as const

export const usersSample = {
  json: `{
  "users": [
    { "id": 1, "username": "alice_w", "email": "alice@example.com", "role": "admin", "active": true },
    { "id": 2, "username": "bob_smith", "email": "bob@example.com", "role": "user", "active": true },
    { "id": 3, "username": "carol_j", "email": "carol@example.com", "role": "editor", "active": false }
  ]
}`,
  toon: `users[3]{id\tusername\temail\trole\tactive}:
1\talice_w\talice@example.com\tadmin\ttrue
2\tbob_smith\tbob@example.com\tuser\ttrue
3\tcarol_j\tcarol@example.com\teditor\tfalse`,
} as const

export const logsSample = {
  json: `{
  "logs": [
    { "timestamp": "2025-01-01T10:30:00Z", "level": "INFO", "message": "System started", "userId": null },
    { "timestamp": "2025-01-01T10:35:23Z", "level": "WARN", "message": "High memory usage", "userId": 123 },
    { "timestamp": "2025-01-01T10:40:15Z", "level": "ERROR", "message": "Database connection failed", "userId": 456 }
  ]
}`,
  toon: `logs[3]{timestamp\tlevel\tmessage\tuserId}:
2025-01-01T10:30:00Z\tINFO\tSystem started\tnull
2025-01-01T10:35:23Z\tWARN\tHigh memory usage\t123
2025-01-01T10:40:15Z\tERROR\tDatabase connection failed\t456`,
} as const
