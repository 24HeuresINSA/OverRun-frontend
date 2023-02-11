import { dateFormat } from "@/types/dateFormat";

export function formateDate(date: string) {
  return new Date(date).toLocaleDateString("FR-fr", dateFormat);
}
