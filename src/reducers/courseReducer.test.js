import expect from 'expect';
import * as actions from '../actions/courseActions';
import courseReducer from './courseReducer';

describe('Course Reducer', ()=>{
  it('should add course when passed CREATE_COURSE_SUCCESS',()=>{
    const initialState = [
      {title: 'A'},
      {title: 'B'}
    ];
    const newCourse = {title: 'C'};
    const action = actions.createCourseSuccess(newCourse);
    
    const newState = courseReducer(initialState, action);

    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
  });
  it('should update course when passed UPDATE_COURSE_SUCCESS',()=>{
    const initialState = [
      {id: 'foo', title:'foo'},
      {id: 'bar', title: 'bar'}
    ];
    const update = {id:'bar', title: 'boooo'};
    const action = actions.updateCourseSucess(update);
    const newState = courseReducer(initialState,action);

    const untouchedCourse = newState.find(a => a.id === 'foo');

    expect(newState[1].title).toBe('boooo');
    expect(untouchedCourse.title).toEqual('foo');
  });
});