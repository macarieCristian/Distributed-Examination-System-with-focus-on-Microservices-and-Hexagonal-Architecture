import {createReducer, on} from '@ngrx/store';
import {groupBy, map, mapKeys} from 'lodash';
import {ExamAnswerDto} from '../../dtos/exam.answer.dto';
import {addExamAnswer, loadExamAnswersFailed, loadExamAnswersStart, loadExamAnswersSuccess} from './statistics.actions';
import {ExamAnswerQuestionAnswerDto} from '../../dtos/exam-answer-question-answer.dto';
import {ExamAnswerQuestionDto} from '../../dtos/exam-answer-question.dto';
import {ExamAnswerQuestionAnswer} from '../../models/exam-answer-question-answer.model';
import {ExamAnswerQuestion} from '../../models/exam-answer-question.model';
import {ExamAnswer} from '../../models/exam-answer.model';
import {ExamGrade} from '../../models/exam-grade.model';

export const statisticsFeatureKey = 'statistics';

export interface StatisticsState {
  examAnswers: { [examUuid: string]: ExamAnswer };
  examGrades: { [examUuid: string]: ExamGrade[] };
  loadExamAnswersErrorMessage: string | undefined;
  loadExamAnswersLoading: boolean;
}

const initialStatisticsState: StatisticsState = {
  examAnswers: {},
  examGrades: {},
  loadExamAnswersErrorMessage: undefined,
  loadExamAnswersLoading: false,
};

export const statisticsReducer = createReducer(initialStatisticsState,
  on(loadExamAnswersStart, (state) => (
    {
      ...state,
      loadExamAnswersLoading: true
    }
  )),
  on(loadExamAnswersSuccess, (state, {examAnswers}) => (
    {
      ...state,
      examAnswers: mapExamAnswersToAnswerCount(examAnswers),
      examGrades: mapExamAnswersToGrades(examAnswers),
      loadExamAnswersErrorMessage: undefined,
      loadExamAnswersLoading: false
    }
  )),
  on(loadExamAnswersFailed, (state, {errorMessage}) => (
    {
      ...state,
      loadExamAnswersErrorMessage: errorMessage,
      loadExamAnswersLoading: false
    }
  )),
  on(addExamAnswer, (state, {examAnswer}) => (
    {
      ...state,
      examAnswers: {
        ...state.examAnswers,
        ...mapExamAnswersToAnswerCount(
          [
            ...(state.examAnswers[examAnswer.examUuid] ? [state.examAnswers[examAnswer.examUuid]] : []),
            examAnswer
          ]
        )
      },
      examGrades: {
        ...state.examGrades,
        ...mapExamAnswersToGrades(
          [
            ...(state.examGrades[examAnswer.examUuid] ? state.examGrades[examAnswer.examUuid] : []),
            examAnswer
          ]
        )
      }
    }
  ))
);

const mapExamAnswersToGrades = (examAnswers: (ExamAnswerDto | ExamAnswer | ExamGrade)[]): { [examUuid: string]: ExamGrade[] } =>
  groupBy(examAnswers.map<ExamGrade>(examAnswer => ({
    id: examAnswer.id,
    examUuid: examAnswer.examUuid,
    ownerUuid: examAnswer.ownerUuid,
    consumerUuid: examAnswer.consumerUuid,
    grade: examAnswer.grade,
  })), 'examUuid');


const mapExamAnswersToAnswerCount = (examAnswers: (ExamAnswerDto | ExamAnswer)[]): { [examUuid: string]: ExamAnswer } =>
  mapKeys(map<(ExamAnswerDto | ExamAnswer)[], ExamAnswer>(Object.values(groupBy(examAnswers, 'examUuid')),
    examAnswerList => examAnswerList.reduce<ExamAnswer>((ex1, ex2) => ({
      examUuid: ex2.examUuid,
      ownerUuid: ex2.ownerUuid,
      questions: mapKeys(map<(ExamAnswerQuestionDto | ExamAnswerQuestion)[], ExamAnswerQuestion>(
        Object.values(groupBy(Object.values(ex1.questions || []).concat(Object.values(ex2.questions || [])), 'uuid')),
        examAnswerQuestionList => examAnswerQuestionList.reduce<ExamAnswerQuestion>((eq1, eq2) => ({
          uuid: eq2.uuid,
          ownerUuid: eq2.ownerUuid,
          answers: mapKeys(map<(ExamAnswerQuestionAnswerDto | ExamAnswerQuestionAnswer)[], ExamAnswerQuestionAnswer>(
            Object.values(groupBy(Object.values(eq1.answers || []).concat(Object.values(eq2.answers || [])), 'uuid')),
            examQuestionAnswerList => examQuestionAnswerList.reduce<ExamAnswerQuestionAnswer>((qa1, qa2) => ({
              uuid: qa2.uuid,
              count: (qa1.count || 0) + (qa2.count || 0) +
                (+qa1.checked || 0) + (+qa2.checked || 0) +
                (+!!qa1.value || 0) + (+!!qa2.value || 0)
            }), {} as ExamAnswerQuestionAnswer)), 'uuid'),
        }), {} as ExamAnswerQuestion)), 'uuid'),
    }), {} as ExamAnswer)), 'examUuid');


