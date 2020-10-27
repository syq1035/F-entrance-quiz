import React, { Component } from 'react';
import './Home.scss'
import axios from "axios"

class Home extends Component {
  constructor() {
    super()
    this.state = {
      students: [],
      groups: [],
      isAdd: true,
      name: ''
    }
  }

  componentDidMount() {
    this.getAllStudents()
  }

  getAllStudents = () => {
    axios.get('http://localhost:8080/students').then((res) => {
      this.setState({
        students: res.data
      })
    })
  }

  grouping = () => {
    axios.get('http://localhost:8080/groups').then((res) => {
      this.setState({
        groups: res.data
      })
    })
  }

  addStudent = () => {
    this.setState({
      isAdd: false
    })
  }

  changeText = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  enterAdd = (e) => {
    if (e.keyCode === 13) {
      this.setState({
        isAdd: true
      })
      axios.post('http://localhost:8080/student', { name: this.state.name }).then(() => {
        this.getAllStudents()
      })
    }
  }

  render() {
    return (
      <div className="main">
        <div className="top">
          <span className="text">分组列表</span>
          <button className="group-btn" onClick={this.grouping}>分组学员</button>
        </div>
        {
          this.state.groups.length > 0 ?
            <div className="groups">
            {
              this.state.groups && this.state.groups.map((group, index) => (
                <div className="group" key={index}>
                  <div className="group-num">{`${index + 1}组`}</div>
                  <div className="group-list">
                  {
                    group.map((student, index) => (<div className="item" key={index}>{`${student.id}.${student.name}`}</div>))
                  }
                  </div>
                </div>
              ))
            }
            </div>
            : ''
        }
        
        <div className="student-list">
          <span className="text">学员列表</span>
          <div className="list">
            {
              this.state.students && this.state.students.map((student, index) => (<div className="item" key={index}>{`${student.id}.${student.name}`}</div>))
            }
            {
              this.state.isAdd ?
                <div className="item" onClick={this.addStudent}>+添加学员</div>
                :
                <div className="item">
                  <input type="text" value={this.state.name} onChange={this.changeText} onKeyUp={this.enterAdd} />
                </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
