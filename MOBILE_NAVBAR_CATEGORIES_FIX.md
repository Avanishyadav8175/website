# Mobile Navbar Categories Fix

## Problem
When adding new categories to "Mobile Navbar Categories" in the admin panel, they were not showing up in the mobile navbar on the frontend.

## Root Causes

### 1. Only showing first category's catalogues
The `CatalogueDrawerContent` component was only displaying catalogues from the first category:
```typescript
const catalogues = catalogueCategories[0]?._catalogues as CatalogueDocument[];
```

This meant that if you added a catalogue to a different category, it wouldn't appear in the mobile navbar.

### 2. No automatic cache revalidation
When creating, updating, or deleting catalogues through the admin panel, the Redis cache was not being automatically cleared. This meant that even if catalogues were properly saved to the database, they wouldn't show up on the frontend until the cache was manually cleared.

## Solutions Applied

### 1. Display all catalogues from all categories
Updated `CatalogueDrawerContent.tsx` to collect and display catalogues from ALL categories, not just the first one:

```typescript
// Collect all catalogues from all categories
const catalogues = catalogueCategories.reduce<CatalogueDocument[]>((acc, category) => {
  const categoryCatalogues = category._catalogues as CatalogueDocument[] || [];
  return [...acc, ...categoryCatalogues];
}, []);
```

Also improved the rendering logic:
- Changed from using array index as key to using `catalogue._id` for better React performance
- Added length check to only render when catalogues exist

### 2. Automatic cache revalidation
Added automatic cache revalidation to the catalogue API routes:

**File: `app/api/admin/preset/catalogue/(_root)/route.ts`**
- POST (create): Revalidates cache after successfully adding catalogues
- PATCH (bulk update): Revalidates cache after successfully updating catalogues
- DELETE (bulk delete): Revalidates cache after successfully deleting catalogues

**File: `app/api/admin/preset/catalogue/[id]/route.ts`**
- PATCH (single update): Revalidates cache after successfully updating a catalogue
- DELETE (single delete): Revalidates cache after successfully deleting a catalogue

The revalidation is done asynchronously and doesn't block the API response:
```typescript
fetch(`${DOMAIN}/api/admin/revalidate-cache/catalogue-categories`, {
  headers: { "x-api-key": X_API_KEY }
}).catch(err => console.error("Failed to revalidate cache:", err));
```

## How It Works Now

1. **Adding catalogues**: When you add a new mobile navbar category from the admin panel, it will:
   - Be saved to the database with `isActive: true` (from previous fix)
   - Automatically trigger cache revalidation
   - Appear in the mobile navbar immediately (within a few seconds)

2. **Updating catalogues**: When you update a catalogue (name, icon, path, etc.), the cache is automatically cleared and the changes appear on the frontend.

3. **Deleting catalogues**: When you delete a catalogue, it's removed from the mobile navbar immediately.

4. **All categories visible**: Catalogues from ALL categories are now displayed in the mobile navbar, not just the first category.

## Files Modified

1. `components/(frontend)/components/background/components/CatalogueDrawerContent.tsx`
   - Changed to collect catalogues from all categories using `reduce()`
   - Improved key prop to use `catalogue._id` instead of array index
   - Added length check before rendering

2. `app/api/admin/preset/catalogue/(_root)/route.ts`
   - Added automatic cache revalidation for POST, PATCH, and DELETE operations

3. `app/api/admin/preset/catalogue/[id]/route.ts`
   - Added automatic cache revalidation for PATCH and DELETE operations

## Testing

To verify the fix:
1. Go to Admin Panel → Category Page → Mobile Navbar Categories
2. Add a new category with name, URL, icon, and select any category
3. The category should appear in the admin table
4. Open the mobile navbar on the frontend (on mobile or tablet view)
5. The new category should appear within a few seconds (cache revalidation time)
6. Try updating the category - changes should appear immediately
7. Try adding categories to different catalogue categories - all should appear in the mobile navbar

## Related Previous Fixes

This fix builds on the previous `MOBILE_CATEGORY_FIX.md` which ensured that:
- New catalogues are created with `isActive: true` by default
- Category selection is enabled in the admin form
- Category column is visible in the admin table
