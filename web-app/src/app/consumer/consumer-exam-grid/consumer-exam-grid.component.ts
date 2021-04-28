import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppState} from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {selectConsumersFeature} from '../../store/app.selectors';
import {ExamHeader} from '../../models/exam.model';

@Component({
  selector: 'app-consumer-exam-grid',
  templateUrl: './consumer-exam-grid.component.html',
  styleUrls: ['./consumer-exam-grid.component.scss']
})
export class ConsumerExamGridComponent implements OnInit, OnDestroy {
  exams: ExamHeader[] = [];
  errorMessage: string;
  loading: boolean;
  private consumersSubscription: Subscription;

  constructor(private store: Store<AppState>) {
  }


  ngOnInit(): void {
    this.consumersSubscription = this.store.select(selectConsumersFeature)
      .subscribe(consumersState => {
        this.exams = Object.values(consumersState.examHeaders);
        this.errorMessage = consumersState.loadExamHeadersErrorMessage;
        this.loading = consumersState.loadExamHeadersLoading;
      });
  }

  formatTimeLabel(value: number): string {
    const hours = Math.trunc(value / 60);
    const minutes = value % 60;
    return hours > 0 ?
      minutes > 0 ? `${hours} hours ${minutes} minutes` : `${hours} hours`
      : `${minutes} minutes`;
  }

  formatDescription(value: string, maxLength: number): string {
    return value.length > maxLength ? `${value.substr(0, maxLength)}...` : value;
  }

  ngOnDestroy(): void {
    this.consumersSubscription?.unsubscribe();
  }

}
