import ProfileClient from "./ProfileClient";
import { getProfileAction } from "@/app/actions/profile";

export default async function ProfilePage() {
  const profile = await getProfileAction();
  
  return <ProfileClient initialProfile={profile} />;
}
