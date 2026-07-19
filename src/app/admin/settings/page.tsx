import SettingsClient from "./SettingsClient";
import { getStoreSettingsAction } from "@/app/actions/settings";

export default async function SettingsPage() {
  const initialSettings = await getStoreSettingsAction();

  return <SettingsClient initialSettings={initialSettings} />;
}
