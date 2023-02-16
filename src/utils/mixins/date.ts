import { dateFormat } from "@/types/dateFormat";

export function formateDate(date: string) {
  return new Date(date).toLocaleDateString("FR-fr", dateFormat);
}

export function htmlImputDateTime(date: string) {
  const dateObj = new Date(date);
  const day = String(dateObj.getDay() + 1).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
