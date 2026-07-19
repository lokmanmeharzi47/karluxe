import CheckoutClient from "./CheckoutClient";
import { getStoreSettings } from "@/lib/storeSettings";

export default async function CheckoutPage() {
  const storeSettings = await getStoreSettings();
  
  return <CheckoutClient storeSettings={storeSettings} />;
}
