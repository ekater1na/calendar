import {Component, OnInit} from '@angular/core';
import * as moment from "moment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {switchMap} from "rxjs/operators";
import {Task, TasksService} from "../shared/tasks.service";
import {DateService} from "../shared/date.service";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  form: FormGroup;

  tasks: Task[] = [];

  constructor(
    private dateService: DateService,
    private tasksService: TasksService
  ) {
  }

  get date$(): moment.Moment {
    return this.dateService.date$.value;
  }

  ngOnInit(): void {
    this.dateService.date$.pipe(
      switchMap(value => this.tasksService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks
    })

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit() {
    const {title} = this.form.value;
    const task: Task = {
      title,
      date: this.dateService.date$.value.format('DD-MM-YYYY'),
    }

    this.tasksService.create(task).subscribe(() => {
        this.form.reset()
      },
      // eslint-disable-next-line no-console
      err => console.error(err)
    )
  }
}
