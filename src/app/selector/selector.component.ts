import {Component, OnInit} from '@angular/core';
import * as moment from "moment";
import {DateService} from "../shared/date.service";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  constructor(private dateService: DateService) {
  }

  get date$(): moment.Moment {
    return this.dateService.date$.value;
  }

  ngOnInit() {

  }

  go(dir: number) {
    this.dateService.changeMonth(dir)
  }
}
