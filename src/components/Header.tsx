import { getStoreSettings } from "@/lib/storeSettings";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const storeSettings = await getStoreSettings();
  
  return <HeaderClient storeSettings={storeSettings} />;
}
