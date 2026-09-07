# Car Modification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement full vehicle modification functionality for the KarLuxe admin dashboard, including a dedicated luxury edit modal, image management via ImageKit, an `updateCarAction` server action, and UI integration into `FleetManagerTable`.

**Architecture:** A dedicated `EditCarModal` component handles editing all fields (identity, pricing, specs, availability, images). On save, it calls `updateCarAction` in `adminActions.ts`, which validates inputs via Zod, updates the `cars` record and synchronizes `vehicle_images` in Supabase via `createAdminClient()`. `FleetManagerTable` exposes a gold `Pencil` action icon to trigger the modal and update state locally.

**Tech Stack:** Next.js 16 (App Router, Server Actions), React 19, TypeScript, Tailwind CSS v4, ImageKit (@imagekit/next), Supabase (@supabase/ssr, Supabase client), Zod.

## Global Constraints
- Do not break existing `AddCarModal` or `FleetManagerTable` functionality.
- Luxury aesthetic: dark theme (`#050505`, `#111111/90`), gold accents (`#D4AF37`), Lucide icons.
- Currency: Daily rate input in DA (240 DA = 1 EUR), live EUR and USD badges.
- Images: Retain existing ImageKit URLs; only upload new `File` instances; enforce max 5 images total.

---

### Task 1: Add `updateCarAction` in `src/app/actions/adminActions.ts`

**Files:**
- Modify: `src/app/actions/adminActions.ts`

**Interfaces:**
- Produces: `updateCarAction(input: z.infer<typeof updateCarSchema>): Promise<{ success: boolean; car?: CarWithDetails; error?: string }>`

- [ ] **Step 1: Define `updateCarSchema` and implement `updateCarAction`**
Add Zod schema for updating a car with all editable fields:
```typescript
const updateCarSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(2),
  brandId: z.string().uuid(),
  categoryId: z.string().uuid(),
  year: z.number().int().min(2000),
  dailyRate: z.number().positive(),
  securityDeposit: z.number().positive(),
  transmission: z.enum(['Automatic', 'Dual-Clutch', 'Manual']),
  seats: z.number().int().min(1).max(9),
  fuelType: z.string().default('Gasoline'),
  horsepower: z.number().int().nonnegative().default(0),
  acceleration: z.string().default('N/A'),
  topSpeed: z.string().default('N/A'),
  engine: z.string().default('N/A'),
  location: z.string(),
  description: z.string(),
  isFeatured: z.boolean().default(false),
  isAvailable: z.boolean().default(true),
  agentName: z.string().optional().nullable(),
  featuredImage: z.string().url(),
  additionalImages: z.array(z.string().url()).optional(),
});

export async function updateCarAction(input: z.infer<typeof updateCarSchema>) {
  try {
    const validated = updateCarSchema.parse(input);
    const supabase = createAdminClient();
    const slug = validated.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const { data: updatedCar, error } = await (supabase.from('cars') as any)
      .update({
        title: validated.title,
        slug: `${slug}-${validated.id.slice(0, 4)}`,
        brand_id: validated.brandId,
        category_id: validated.categoryId,
        year: validated.year,
        daily_rate: validated.dailyRate,
        security_deposit: validated.securityDeposit,
        transmission: validated.transmission,
        fuel_type: validated.fuelType,
        seats: validated.seats,
        acceleration: validated.acceleration,
        top_speed: validated.topSpeed,
        horsepower: validated.horsepower,
        engine: validated.engine,
        location: validated.location,
        description: validated.description,
        featured_image: validated.featuredImage,
        is_featured: validated.isFeatured,
        is_available: validated.isAvailable,
        agent_name: validated.agentName || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', validated.id)
      .select('*, brands(*), categories(*)')
      .single();

    if (error) return { success: false, error: error.message };

    // Synchronize vehicle_images
    await (supabase.from('vehicle_images') as any).delete().eq('car_id', validated.id);

    if (validated.additionalImages && validated.additionalImages.length > 0) {
      const imagesToInsert = validated.additionalImages.map((url, idx) => ({
        car_id: validated.id,
        url: url,
        is_primary: false,
        display_order: idx + 1,
      }));
      await (supabase.from('vehicle_images') as any).insert(imagesToInsert);
    }

    return { success: true, car: updatedCar };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update supercar' };
  }
}
```

- [ ] **Step 2: Verify `updateCarAction` types and lint**
Run: `npm run lint`
Expected: 0 errors

- [ ] **Step 3: Commit Task 1**
```bash
git add src/app/actions/adminActions.ts
git commit -m "feat(admin): add updateCarAction server action"
```

---

### Task 2: Create `EditCarModal.tsx`

**Files:**
- Create: `src/components/features/admin/EditCarModal.tsx`

**Interfaces:**
- Consumes: `CarWithDetails`, `Brand`, `Category`, `updateCarAction`, `LuxuryModal`, `LuxuryButton`
- Produces: `EditCarModal: React.FC<EditCarModalProps>`

- [ ] **Step 1: Implement `EditCarModal.tsx`**
Create the component with:
- State initialized from `car` prop (and re-synced when `car` changes).
- Inputs for:
  - Title, Brand, Category, Year, Agency/Location
  - Daily rate (in DA, converted to/from EUR with live EUR/USD badges)
  - Security Deposit (in DA, converted to/from EUR)
  - Availability toggle (`is_available`)
  - Featured badge toggle (`is_featured`)
  - Technical specs: Transmission, Seats, Fuel Type, Horsepower, 0-100 km/h, Top Speed, Engine
  - Photos: Manage current photos (URLs) + upload new photos (`File[]`), select primary cover, delete specific photos, max 5 photos total.
  - Description textarea
- Form submission:
  - Uploads newly added `File` items to ImageKit via `/api/upload-auth`.
  - Combines existing kept URLs and new ImageKit URLs.
  - Calls `updateCarAction`.
  - On success, invokes `onCarUpdated(updatedCar)` and `onClose()`.

- [ ] **Step 2: Verify syntax and lint**
Run: `npm run lint`
Expected: 0 errors

- [ ] **Step 3: Commit Task 2**
```bash
git add src/components/features/admin/EditCarModal.tsx
git commit -m "feat(admin): create EditCarModal component"
```

---

### Task 3: Integrate Edit Action in `FleetManagerTable.tsx` and `src/app/admin/page.tsx`

**Files:**
- Modify: `src/components/features/admin/FleetManagerTable.tsx`
- Modify: `src/app/admin/page.tsx`

**Interfaces:**
- Consumes: `EditCarModal`
- Updates: `carList` state on car update, calls `onCarUpdated` prop

- [ ] **Step 1: Add Pencil button and modal wiring to `FleetManagerTable.tsx`**
- Import `EditCarModal` dynamically.
- Add `editingCar` state: `const [editingCar, setEditingCar] = useState<CarWithDetails | null>(null);`.
- Add `onCarUpdated?: (car: CarWithDetails) => void;` to `FleetManagerTableProps`.
- In the actions column for each car, render the gold Pencil button:
```tsx
<button
  onClick={() => setEditingCar(car)}
  title="Modifier le véhicule"
  className="p-2 rounded-xl border border-white/10 text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all cursor-pointer"
>
  <Pencil className="w-3.5 h-3.5" />
</button>
```
- Render `EditCarModal` when `editingCar` is not null:
```tsx
{editingCar && (
  <EditCarModal
    isOpen={!!editingCar}
    onClose={() => setEditingCar(null)}
    car={editingCar}
    brands={brands}
    categories={categories}
    locations={locations}
    onCarUpdated={(updatedCar) => {
      setCarList((prev) => prev.map((c) => (c.id === updatedCar.id ? { ...c, ...updatedCar } : c)));
      if (onCarUpdated) onCarUpdated(updatedCar);
      setEditingCar(null);
    }}
  />
)}
```

- [ ] **Step 2: Connect `onCarUpdated` in `src/app/admin/page.tsx`**
Pass `onCarUpdated={(updated) => setCars(prev => prev.map(c => c.id === updated.id ? { ...c, ...updated } : c))}` to `<FleetManagerTable />`.

- [ ] **Step 3: Commit Task 3**
```bash
git add src/components/features/admin/FleetManagerTable.tsx src/app/admin/page.tsx
git commit -m "feat(admin): integrate car edit button and modal in FleetManagerTable"
```

---

### Task 4: Complete Verification

- [ ] **Step 1: Run linter**
Run: `npm run lint`
Expected: 0 errors

- [ ] **Step 2: Run production build**
Run: `npm run build`
Expected: Exit code 0

- [ ] **Step 3: Commit any remaining changes**
```bash
git commit -m "chore: complete car modification feature verification"
```
