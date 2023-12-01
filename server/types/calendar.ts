export interface CalendarItem {
  date: Date;
  paxCounter: number;
  enabled: boolean;
}

export type Calendar = CalendarItem[];
