import React, { Component } from 'react';
import './Home.scss';
import axios from 'axios';

// TODO GTB-4: - 没有组件拆分，Home包含内容逻辑较多，组件过长
class Home extends Component {
  constructor() {
    super();
    this.state = {
      students: [],
      groups: [],
      isAdd: true,
      // TODO GTB-4: - name state比较冗余，这里不用做双向绑定
      name: '',
    };
  }

  componentDidMount() {
    this.getAllStudents();
  }

  getAllStudents = () => {
    // TODO GTB-4: - 请求相关可以拆出API请求层，解耦请求与渲染
    axios.get('http://localhost:8080/students').then((res) => {
      this.setState({
        students: res.data,
      });
    });
  };

  grouping = () => {
    axios.get('http://localhost:8080/groups').then((res) => {
      this.setState({
        groups: res.data,
      });
    });
  };

  addStudent = () => {
    this.setState({
      isAdd: false,
    });
  };

  // TODO GTB-4: - 同name，这里这个方法也是冗余的
  changeText = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  // TODO GTB-3: - 下面的e中可以取到value即为name
  enterAdd = (e) => {
    if (e.keyCode === 13) {
      this.setState({
        isAdd: true,
      });
      axios.post('http://localhost:8080/student', { name: this.state.name }).then(() => {
        this.getAllStudents();
      });
    }
  };

  render() {
    // TODO GTB-4: - 加强语义化标签的使用
    // TODO GTB-3: - 没有做组件拆分，嵌套比较深，易读性低
    // TODO GTB-4: - 思考如何拆分组件，如学员列表，分组列表，和组件复用，如学员item等
    return (
      <div className="main">
        {/* TODO GTB-4: - 标签class命名需要更加体现业务逻辑，top之类的无法体现，且可能冲突 */}
        <div className="top">
          <span className="text">分组列表</span>
          <button className="group-btn" onClick={this.grouping}>
            分组学员
          </button>
        </div>
        {this.state.groups.length > 0 ? (
          <div className="groups">
            {this.state.groups &&
              this.state.groups.map((group, index) => (
                // TODO GTB-4: - 不推荐使用index作为key
                <div className="group" key={index}>
                  <div className="group-num">{`${index + 1}组`}</div>
                  <div className="group-list">
                    {group.map((student, index) => (
                      <div className="item" key={index}>{`${student.id}.${student.name}`}</div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          ''
        )}

        <div className="student-list">
          <span className="text">学员列表</span>
          <div className="list">
            {this.state.students &&
              this.state.students.map((student, index) => (
                <div className="item" key={index}>{`${student.id}.${student.name}`}</div>
              ))}
            {this.state.isAdd ? (
              <div className="item" onClick={this.addStudent}>
                +添加学员
              </div>
            ) : (
              <div className="item">
                <input
                  type="text"
                  value={this.state.name}
                  onChange={this.changeText}
                  onKeyUp={this.enterAdd}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
