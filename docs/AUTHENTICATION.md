# Authentication

Authentication is based on JWT tokens.

Access Token
- stored in memory
- lifetime: ~15 minutes

Refresh Token
- stored in HTTP-only cookie
- lifetime: ~7 days

Flow:

1. user logs in
2. backend returns access token
3. frontend stores access token
4. API requests include Authorization header

Authorization: Bearer <token>
