import { CalendarDate } from "./calendarDate";
import { Movie } from "./movie";


export class ScreeningSchedule{
  screeningScheduleId: number;
  startTime: DateTime;
  endTime: DateTime;
  movie: Movie;
  calendarDate: CalendarDate;
}
