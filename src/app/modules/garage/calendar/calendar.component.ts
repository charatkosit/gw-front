import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions!: CalendarOptions;

  ngOnInit(): void {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      timeZone: 'UTC',
      events: 'https://fullcalendar.io/api/demo-feeds/events.json',
      editable: true,
      selectable: true,
      plugins: [dayGridPlugin]
    };
  }
}
