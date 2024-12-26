// import { EventInput } from '@fullcalendar/angular';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: any[] = [
  {
    id: createEventId(),
    title: 'Party',
    start: '2022-02-13T00:00:00',
    color: '#38cab3'
  },
  {
    id: createEventId(),
    title: 'Conference',
    start: '2022-02-03T13:00:00',
    end: '2022-02-03T15:00:00',
    color: '#ffbd5a'
  },
  {
    id: createEventId(),
    title: 'Meeting',
    start: '2022-02-08T09:00:00',
    end: '2022-02-03T12:00:00',
    color: '#f34343'
  },
  {
    id: createEventId(),
    title: 'Business Lunch',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00',
    color: '#f34343'
  }
];

export function createEventId() {
  return String(eventGuid++);
}
