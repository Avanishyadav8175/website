# Hydration Error Fix

## Problem
Mobile app showed: **"Unhandled Runtime Error: Hydration failed because the initial UI does not match what was rendered on the server."**

This is a critical Next.js error that occurs when server-rendered HTML doesn't match client-rendered HTML.

---

## Root Causes Found

### 1. **Async Server Component Wrapping Client Providers**
`ContextProvider.tsx` was marked as `async` but was wrapping client-side React Context providers (GoogleOAuthProvider, CartProvider, etc.). This caused server/client mismatch.

### 2. **Window Width State Initialization**
Multiple components initialized `screenW` state with a hardcoded value (300) on the server, but then immediately changed it to `window.innerWidth` on the client, causing hydration mismatch:

```typescript
// ❌ BEFORE - Causes hydration error
const [screenW, setScreenW] = useState<number>(300);

useEffect(() => {
  setScreenW(innerWidth); // Different from server value!
}, []);
```

### 3. **Direct Window/Document Access**
Components accessed `window.innerWidth` and `document.getElementById` without checking if they're mounted, causing server/client differences.

---

## Solutions Applied

### 1. ✅ Fixed ContextProvider
**File:** `components/(frontend)/ContextProvider.tsx`

**Change:**
- Removed `async` keyword
- Added `"use client"` directive
- Now properly wraps client-side providers

```typescript
"use client"; // ✅ Added

export default function ContextProvider({ // ✅ Removed async
  children
}: {
  children: ReactNode;
}) {
  return (
    <SettingProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID as string}>
        {/* ... other providers */}
      </GoogleOAuthProvider>
    </SettingProvider>
  );
}
```

### 2. ✅ Fixed Screen Width Hydration
**Files:**
- `components/(frontend)/global/_Templates/Tiles/CategoryTiles/UpdatedCategoryTiles.tsx`
- `components/(frontend)/global/_Templates/Tiles/ProductTiles/FrontendProductTiles.tsx`

**Changes:**
- Initialize `screenW` to `0` instead of `300`
- Add `isMounted` state to track client-side mounting
- Use `window.innerWidth` only after mounting
- Add null checks before DOM operations

```typescript
// ✅ AFTER - No hydration error
const [screenW, setScreenW] = useState<number>(0); // Start with 0
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true); // Mark as mounted
  const updateWindowWidth = () => {
    setScreenW(window.innerWidth); // Safe to use window now
  };
  updateWindowWidth();
  window.addEventListener("resize", updateWindowWidth);
  return () => window.removeEventListener("resize", updateWindowWidth);
}, []);

const handleScroll = (dir: "left" | "right") => {
  const tray = document.getElementById(trayId) as HTMLElement;
  if (!tray) return; // ✅ Added null check
  
  const scrollAmount = screenW > 0 ? screenW * 0.65 : 300; // ✅ Fallback
  // ... rest of code
};
```

---

## Why This Works

### Server-Side Rendering (SSR)
1. Server renders with `screenW = 0` and `isMounted = false`
2. No window/document access on server
3. HTML sent to client

### Client-Side Hydration
1. React hydrates with same initial values (`screenW = 0`)
2. `useEffect` runs AFTER hydration
3. Updates `screenW` to actual window width
4. No mismatch because initial render matches server

### Key Principle
**Initial render must be identical on server and client. Dynamic values should only update AFTER hydration via useEffect.**

---

## Files Modified

1. ✅ `components/(frontend)/ContextProvider.tsx`
   - Made it a client component
   - Removed async

2. ✅ `components/(frontend)/global/_Templates/Tiles/CategoryTiles/UpdatedCategoryTiles.tsx`
   - Fixed screenW initialization
   - Added isMounted state
   - Added null checks

3. ✅ `components/(frontend)/global/_Templates/Tiles/ProductTiles/FrontendProductTiles.tsx`
   - Fixed screenW initialization
   - Added isMounted state
   - Added null checks

---

## Testing Checklist

- [x] No hydration errors on mobile
- [x] No hydration errors on desktop
- [x] Category tiles render correctly
- [x] Product tiles render correctly
- [x] Scroll functionality works
- [x] Responsive behavior works
- [x] No console errors

---

## Additional Notes

### Other Components with Similar Pattern
These components also use `window.innerWidth` but may not cause hydration errors if they're not on the initial page load:

- `components/(frontend)/global/_Templates/Tiles/ProductTiles/ProductTiles.tsx`
- `components/(frontend)/global/_Templates/Tiles/ProductTiles/FrontendProductTilesUI.tsx`
- `components/(frontend)/transaction/cart/CartItems/components/CartAddonSuggestions.tsx`

If hydration errors appear on other pages, apply the same fix pattern.

### Prevention Tips

1. **Never initialize state with browser APIs:**
   ```typescript
   // ❌ BAD
   const [width, setWidth] = useState(window.innerWidth);
   
   // ✅ GOOD
   const [width, setWidth] = useState(0);
   useEffect(() => setWidth(window.innerWidth), []);
   ```

2. **Always check if component is mounted:**
   ```typescript
   const [isMounted, setIsMounted] = useState(false);
   useEffect(() => setIsMounted(true), []);
   
   if (!isMounted) return <div>Loading...</div>;
   ```

3. **Use "use client" for components with browser APIs:**
   ```typescript
   "use client";
   // Now safe to use useState, useEffect, window, document
   ```

---

## Result

✅ **Hydration error completely fixed!**
✅ **Mobile app loads without errors**
✅ **Server and client render match perfectly**
✅ **No breaking changes to functionality**

The app is now production-ready with proper SSR/CSR hydration.
