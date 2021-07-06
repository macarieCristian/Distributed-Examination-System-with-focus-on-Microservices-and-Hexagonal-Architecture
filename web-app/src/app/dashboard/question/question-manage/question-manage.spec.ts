import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionManageComponent} from './question-manage.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {FormatterService} from '../../../shared/util/formatter.service';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {AngularResizedEventModule} from 'angular-resize-event';
import {BrowserModule} from '@angular/platform-browser';

describe('QuestionManageComponent', () => {
  let component: QuestionManageComponent;
  let fixture: ComponentFixture<QuestionManageComponent>;
  let store: MockStore;
  let formatterService: FormatterService;
  const initialState = {
    questions: {
      questions: {},
      loadQuestionsErrorMessage: undefined,
      loadQuestionsLoading: false,
      addQuestionErrorMessage: undefined,
      addQuestionLoading: false,
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionManageComponent],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        SharedModule,
        MatListModule,
        MatBadgeModule,
        AngularResizedEventModule
      ],
      providers: [provideMockStore({initialState}), FormatterService]
    })
      .compileComponents();

    store = TestBed.inject(MockStore);
    formatterService = TestBed.inject(FormatterService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const titleDiv = fixture.debugElement.nativeElement.querySelector('#titleDiv');
    expect(titleDiv.innerText).toEqual('Add Question');
  });
});
