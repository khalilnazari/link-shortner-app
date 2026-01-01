import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, isToday, isYesterday, format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeDate(date: Date): string {
  if (isToday(date)) {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  return format(date, "PP");
}
