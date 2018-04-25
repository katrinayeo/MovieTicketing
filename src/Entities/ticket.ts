import { Customer } from "./customer";
import { ScreeningSchedule } from "./screeningSchedule";

export class Ticket {
  ticketId: number;
  seatNo: String;
  price: number;
  customer: Customer;
  screeningSchedule: ScreeningSchedule;
}
