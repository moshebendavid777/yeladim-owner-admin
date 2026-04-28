# Yeladim Owner Admin

Private web admin for the platform owner.

This app is separate from the daycare mobile app. It is for managing SaaS centers, licenses, plans, billing health, and security/audit events.

## Run

```bash
npm install
npm run dev
```

Local URL:

```text
http://localhost:5174
```

Demo login:

- Email: `owner@yeladim.app`
- Passcode: `demo`

## API

Set the API URL in the sign-in screen. Default:

```text
https://your-wordpress-site.com/wp-json/yeladim/v1
```

Supported backend routes added to `yeladim-app-backend`:

- `GET /owner/centers`
- `PATCH /owner/centers/{center_id}/license`

Production requirements before launch:

- Replace demo passcode with real auth.
- Require MFA.
- Store tokens securely in httpOnly cookies if this becomes a hosted dashboard.
- Add audit logs for every owner action.
- Verify Stripe webhook signatures server-side.
- Restrict platform owner endpoints to owner-only accounts.
