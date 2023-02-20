import store from "@/store";

export function isAthleteMinor(birthDate: string) {
  const eventDate = new Date(store.getters["edition/getEdition"].startDate);
  const birth = new Date(birthDate);
  let age = eventDate.getFullYear() - birth.getFullYear();
  const m = eventDate.getMonth() - birth.getMonth();
  const d = eventDate.getDate() - birth.getDate();
  if (m < 0 || (m === 0 && d < 0)) age--;
  return age < 18;
}
