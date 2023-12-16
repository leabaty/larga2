export interface CalendarItemView {
  date: string;
  paxCounter: number;
  enabled: boolean;
}

export type CalendarView = CalendarItemView[];
