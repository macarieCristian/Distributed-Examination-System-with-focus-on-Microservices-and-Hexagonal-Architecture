import {AppState} from './app.reducer';
import {createSelector} from '@ngrx/store';
import {isEmpty} from 'lodash';

export const selectAuthFeature = (state: AppState) => state.auth;

export const selectAuthCurrentUser = createSelector(
  selectAuthFeature,
  (state) => state.currentUser
);
export const selectAuthErrorMessage = createSelector(
  selectAuthFeature,
  (state) => state.errorMessage
);
export const selectAuthLoading = createSelector(
  selectAuthFeature,
  (state) => state.loading
);


export const selectExamsFeature = (state: AppState) => state.exams;

export const selectExamQuestionsByUuid = (uuid: string) => createSelector(
  selectExamsFeature,
  (state) => state.exams[uuid]?.examQuestions
);


export const selectQuestionsFeature = (state: AppState) => state.questions;

export const selectAllQuestions = createSelector(
  selectQuestionsFeature,
  (state) => state.questions
);

export const selectExamQuestions = (examUuid: string) => createSelector(
  selectAllQuestions,
  selectExamQuestionsByUuid(examUuid),
  (questions, examQuestions) => {
    if (isEmpty(questions) || isEmpty(examQuestions)) {
      return [];
    }
    return examQuestions.map(({questionUuid}) => questions[questionUuid]);
  }
);

// export const selectExamQuestionsMap = (examUuid: string) => createSelector(
//   selectAllQuestions,
//   selectExamQuestionsByUuid(examUuid),
//   (questions, examQuestions) => {
//     if (isEmpty(examQuestions)) {
//       return {};
//     }
//     return mapKeys(examQuestions.map(({questionUuid}) => questions[questionUuid]), 'uuid');
//   }
// );


export const selectStatisticsFeature = (state: AppState) => state.statistics;

export const selectExamGradesByExamUuid = (uuid: string) => createSelector(
  selectStatisticsFeature,
  (state) => state.examGrades[uuid]
);

// export const selectExamAnswerQuestionsByExamUuid = (examUuid: string) => createSelector(
//   selectStatisticsFeature,
//   (state) => state.examAnswers?.[examUuid]?.questions
// );

export const selectExamAnswerQuestionByExamUuidAndQuestionUuid = (examUuid: string, questionUuid: string) => createSelector(
  selectStatisticsFeature,
  (state) => state.examAnswers?.[examUuid]?.questions?.[questionUuid]
);


export const selectConsumersFeature = (state: AppState) => state.consumers;

export const selectExamHeaderByUuid = (uuid: string) => createSelector(
  selectConsumersFeature,
  (state) => state.examHeaders[uuid]
);



