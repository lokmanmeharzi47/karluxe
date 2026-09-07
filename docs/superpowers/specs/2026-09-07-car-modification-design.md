# Car Modification Feature Design Specification

## Overview
This specification details the end-to-end implementation of the car modification (edit) feature for the KarLuxe executive admin dashboard. Administrators can edit all properties of any vehicle in the fleet—including identity, brand, category, pricing in DA/EUR/USD, security deposits, physical attributes, advanced powertrain/performance specs, availability/featured toggles, and photo galleries via ImageKit.

---

## 1. Architecture & Data Flow

### 1.1 Server Action: `updateCarAction`
* **File:** `src/app/actions/adminActions.ts`
* **Validation (Zod):**
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
    agentName: z.string().optional(),
    featuredImage: z.string().url(),
    additionalImages: z.array(z.string().url()).optional(),
  });
  ```
* **Database Updates:**
  1. Update `public.cars` table via `createAdminClient()`.
  2. If the title has changed, recompute the URL slug cleanly (`${slug}-${id.slice(0, 4)}`).
  3. Synchronize `public.vehicle_images`:
     - Delete existing secondary images for this car.
     - Re-insert the updated gallery of secondary image URLs with `display_order` and `is_primary: false`.
  4. Return `{ success: true, car: updatedCarWithJoins }`.

---

## 2. Components & UI Integration

### 2.1 Edit Button in `FleetManagerTable.tsx`
* Add `Pencil` icon button in the `ACTIONS` column for each supercar row:
  ```tsx
  <button
    onClick={() => setEditingCar(car)}
    title="Modifier le véhicule"
    className="p-2 rounded-xl border border-white/10 text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all cursor-pointer"
  >
    <Pencil className="w-3.5 h-3.5" />
  </button>
  ```
* Add state `const [editingCar, setEditingCar] = useState<CarWithDetails | null>(null);`.
* Render `EditCarModal` dynamically when `editingCar` is set.
* Add callback `onCarUpdated?: (updatedCar: CarWithDetails) => void` to inform parent page `src/app/admin/page.tsx`.

### 2.2 `EditCarModal.tsx`
* **File:** `src/components/features/admin/EditCarModal.tsx`
* **Props:**
  ```typescript
  interface EditCarModalProps {
    isOpen: boolean;
    onClose: () => void;
    car: CarWithDetails;
    brands: Brand[];
    categories: Category[];
    locations: any[];
    onCarUpdated: (updatedCar: CarWithDetails) => void;
  }
  ```
* **State & Initial Values:**
  * Pre-populates from `car` prop on mount / open.
  * Form fields:
    * `title`, `brandId`, `categoryId`, `year`, `dailyRateEur`, `depositEur`, `transmission`, `seats`, `location`, `agentName`, `description`.
    * Extended specs: `fuelType`, `horsepower`, `acceleration`, `topSpeed`, `engine`, `isFeatured`, `isAvailable`.
    * Pricing converters: Live conversion between DA (240 DA = 1 EUR) and USD ($1.08 = 1 EUR).
  * Image handling:
    * `existingImages`: array of URLs currently stored for the car (`featured_image` + `vehicle_images`).
    * `newFiles`: array of new `File` objects selected by admin.
    * Allows removing any image, designating cover photo, and selecting new files up to 5 total.
    * Uploads only new files to ImageKit using client-side `upload()` through `/api/upload-auth`.
    * Retains already-uploaded ImageKit URLs without redundant re-uploads.

---

## 3. Error Handling & Edge Cases
* **Image Upload Failures:** Show explicit error banner without discarding edited text fields.
* **Non-existent Relations:** Fallback safely if brand or category is deleted or not found.
* **Slug Conflicts:** Preserve uniqueness using vehicle ID prefix.
* **Currency Rounding:** Clean rounding without floating-point precision display glitches in DA.

---

## 4. Verification Plan
* Validate schema and TypeScript compilation with `npm run lint`.
* Validate Next.js production build with `npm run build`.
* Test opening modal, editing fields, saving changes, and observing real-time table update.
