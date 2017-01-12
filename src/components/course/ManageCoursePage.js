import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CourseForm from './CourseForm';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

import * as courseActions from '../../actions/courseActions';

import {authorsFormattedForDropdown} from '../../selectors/selectors';

export class ManageCoursePage extends React.Component {
  constructor(props,context) {
    super(props, context);
    this.state = {
      course: Object.assign({},this.props.course),
      errors: {},
      saving: false
    };
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.course.id !== nextProps.course.id) {
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let state = Object.assign({},this.state);
    state.course[field] = event.target.value;
    return this.setState({course:state.course});
  }
  
  courseFormisValid() {
    let formIsValid = true;
    let errors = {};
    if(this.state.course.title.length < 5){
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }
    this.setState({errors:errors})
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();
    if(!this.courseFormisValid()) return;
    this.setState({saving:true});
    this.props.action.saveCourse(this.state.course)
    .then(this.redirect)
    .catch(error => {
      this.setState({saving:false});
      toastr.error(error);
    });
  }
  redirect = () => {
    this.setState({saving:false});
    toastr.success('Course saved');
    browserHistory.push('/courses');
  }
  render() {
    const {authors} = this.props;
    const {course,errors,saving} = this.state;
    return(
      <CourseForm 
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        course={course}
        errors={errors}
        allAuthors={authors}
        saving={saving}
      />
    );
  }
}

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const result = courses.find(course => {
    if(course.id === id) return course;
    return null;
  });
  return result;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id;
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
  if(courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);