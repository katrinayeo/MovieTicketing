import { CalendarDate } from "./calendarDate";
import { Movie } from "./movie";
import { DateTime } from "ionic-angular";


export class ScreeningSchedule{
  screeningScheduleId: number;
  startTime: DateTime;
  endTime: DateTime;
  movie: Movie;
  calendarDate: CalendarDate;
}
