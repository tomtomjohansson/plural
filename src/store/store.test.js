import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', () => {
  it('Should handle creating courses', function() {
    // arrange
    const store = createStore(rootReducer, initialState);
    const course = {
      id: 1,
      title: "Clean Code"
    };
    const course2 = {
      id: 2,
      title: "Something"
    };
    const updatedCourse = {
      id: 1,
      title: "Really Clean Code"
    };

    // act
    const actions = [courseActions.createCourseSuccess(course),courseActions.createCourseSuccess(course2), courseActions.updateCourseSucess(updatedCourse)];
    actions.forEach(action => {
      store.dispatch(action);
    })

    // assert
    const actual = store.getState().courses[1];
    const expected = {
      id: 1,
      title: "Really Clean Code"
    };

    expect(actual).toEqual(expected);
    expect(store.getState().courses.length).toEqual(2);
  });
});
