import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'customDate'
})

export class CustomDatePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    const utcDate = moment.utc(value);
    const localDate = utcDate.tz('Asia/Bangkok');
    return localDate.format('YYYY-MM-DD HH:mm');
  }

}
