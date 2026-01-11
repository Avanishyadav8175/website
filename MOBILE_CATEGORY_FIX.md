# Mobile Category Bug Fix

## Problem
When adding mobile navbar categories from the admin panel, they would disappear after clicking the "Full Website Reset" button.

## Root Cause
The issue was NOT that the reset button was deleting the categories from the database. The actual problem was:

1. **Default `isActive` value**: When creating new mobile categories (catalogues), the `isActive` field was not being set, defaulting to `false` in the database schema.

2. **Frontend filtering**: The frontend API (`/api/frontend/catalogue-categories`) only fetches categories where `isActive: true`:
   ```typescript
   const catalogues = await Catalogues.find({
     isActive: true  // Only active catalogues are shown
   })
   ```

3. **Cache clearing**: When clicking "Full Website Reset", it only clears the Redis cache - it does NOT delete database records. However, since the categories were never activated (`isActive: false`), they wouldn't show up on the frontend even after cache refresh.

## Solution Applied

### 1. Auto-activate new categories
Modified `getDocumentsFromFormFieldsGenerator.tsx` to set `isActive: true` by default when creating new catalogues:

```typescript
const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  category: elements.category.value,
  name: elements.name.value,
  path: elements.path.value,
  icon: elements.icon.value,
  isActive: true,  // ✅ Now defaults to active
  createdBy: "",
  updatedBy: ""
});
```

### 2. Enabled category selection
Uncommented the category dropdown in `TableFormFields.tsx` so admins can properly select which category the mobile navbar item belongs to (instead of being hardcoded).

### 3. Added category column to table
Uncommented the category column in `getTableContentGenerator.tsx` so admins can see which category each mobile navbar item belongs to.

## How It Works Now

1. **Adding categories**: When you add a new mobile navbar category from the admin panel, it will be automatically active (`isActive: true`) and will show up on the frontend immediately.

2. **Reset button**: The "Full Website Reset" button only clears the Redis cache - it does NOT delete any database records. Your mobile categories will remain in the database and continue to show on the frontend.

3. **Manual control**: You can still manually activate/deactivate categories using the toggle button in the admin table if needed.

## Files Modified

1. `decorwish/components/(admin)/routes/preset/catalogue/utils/getDocumentsFromFormFieldsGenerator.tsx`
   - Added `isActive: true` to default values
   - Uncommented category field usage

2. `decorwish/components/(admin)/routes/preset/catalogue/components/TableFormFields.tsx`
   - Uncommented category dropdown selector

3. `decorwish/components/(admin)/routes/preset/catalogue/utils/getTableContentGenerator.tsx`
   - Uncommented category column in table view

## Testing

To verify the fix:
1. Go to Admin Panel → Category Page → Mobile Navbar Categories
2. Add a new category with name, URL, and icon
3. The category should appear in the table with the active toggle ON
4. Check the frontend mobile menu - the category should be visible
5. Click "Full Website Reset" button
6. Refresh the frontend - the category should still be visible
