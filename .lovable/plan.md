

## Problem Analysis

The backend is healthy -- I confirmed the database has 2 ashrams and is responding to queries. The issue is entirely in the browser:

1. **Stale refresh token**: The browser has a corrupt/expired refresh token (`anrn3lbzsysn`) stored in localStorage. The Supabase client keeps retrying token refresh, and every retry fails with "Failed to fetch", blocking ALL other requests (including the ashrams list query and login).

2. **Failed recovery**: The current catch block in `AuthContext` calls `supabase.auth.signOut()` when `getSession()` fails -- but `signOut()` also makes a network request to the backend, which ALSO fails. So the stale token is never cleared from localStorage, creating an infinite failure loop.

## Plan

### 1. Fix stale session recovery in AuthContext

In `src/contexts/AuthContext.tsx`, change the `.catch()` block to manually clear localStorage instead of calling `supabase.auth.signOut()`:

- Remove the stale Supabase auth keys directly from `localStorage` (keys matching `sb-*-auth-token`)
- Reset state (`setUser(null)`, `setSession(null)`, etc.)
- Set `isLoading` to false
- This avoids the circular problem of calling a network-dependent `signOut()` when the network itself is the issue

### 2. Add network error detection in the auth state listener

In the `onAuthStateChange` callback, add handling for token refresh failures to proactively clear the corrupt session when repeated failures are detected.

### Technical Detail

The key localStorage cleanup:
```typescript
// Clear all Supabase auth keys from localStorage
Object.keys(localStorage).forEach(key => {
  if (key.startsWith('sb-')) {
    localStorage.removeItem(key);
  }
});
```

This ensures the app can recover from stale sessions even when the backend is temporarily unreachable, and once the session is cleared, normal unauthenticated requests (like loading the ashram list) will work immediately.

