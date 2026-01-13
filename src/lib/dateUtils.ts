import { formatDistanceToNow, format } from "date-fns";
import { nl } from "date-fns/locale";

export function formatRelativeTime(dateString: string | null): string {
  if (!dateString) return "";
  
  try {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: nl });
  } catch {
    return "";
  }
}

export function formatMessageTime(dateString: string | null): string {
  if (!dateString) return "";
  
  try {
    const date = new Date(dateString);
    return format(date, "HH:mm");
  } catch {
    return "";
  }
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  
  try {
    const date = new Date(dateString);
    return format(date, "d MMM yyyy", { locale: nl });
  } catch {
    return "";
  }
}
