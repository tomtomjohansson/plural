import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './courseList.js';
import {browserHistory} from 'react-router';

class CoursesPage extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
      // this.onTitleChange = this.onTitleChange.bind(this);
      // this.onClickSave = this.onClickSave.bind(this);
    }
    // onTitleChange(event) {
    //   const course = Object.assign({},this.state.course);
    //   course.title = event.target.value;
    //   this.setState({
    //     course
    //   });
    // }
    // onClickSave() {
    //   this.props.actions.createCourse(this.state.course);
    // }
    courseRow(course, index) {
      return <div key={index}>{course.title}</div>;
    }
    redirectToAddCoursePage() {
      browserHistory.push('/course');
    }
    render() {
      const {courses} = this.props;
        return (
          <div>
            <h1>Courses</h1>
            <input type="submit"
            value="Add Course"
            className="btn btn-primary"
            onClick={this.redirectToAddCoursePage}
            />
            <CourseList courses={courses} />
            
          </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
    // createCourse: course => dispatch(courseActions.createCourse(course))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(CoursesPage);

// <h2>Add Course</h2>
//             <input type="text" onChange={this.onTitleChange} value={this.state.course.title} />
//             <input type="submit" value="save" onClick={this.onClickSave} />