import {Component, OnInit} from '@angular/core';
import {DateService} from "../shared/date.service";
import * as moment from "moment";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  form: FormGroup;

  constructor(
    private dateService: DateService
  ) {
  }

  get date$(): moment.Moment {
    return this.dateService.date$.value;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit() {
    const {title} = this.form.value;
    console.log('title', title)
  }
}
