/* 
Searching Component:
--------------------------------------------------------------------------------------------
Display a search input at top. And process user's input and button click event.
Using Github API to search the all repositorys of specified user.
--------------------------------------------------------------------------------------------
Using : 
<Searching resultCB={resultCallBack} />

resultCallBack is a callback function for process result. EG.
 function resultCallBack(res){
  result = res;
  renderAll();
}
*/

import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { message, Input } from "antd";
import "antd/dist/antd.css";
const { Search } = Input;

// store searched result and loading state
let result = { status: "Waiting Input" };
let resultCB;

class searching extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
    this.clickButton = this.clickButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    resultCB = this.props.resultCB;
  }
  // Put the user data (searched user'name of GitHub) in state 
  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  // Search button
  clickButton() {
    //Display a global loading indicator
    message.destroy()
    const hide = message.loading('Action in progress..', 0)
    var link = "https://api.github.com/users/" + this.state.username + "/repos";
    fetch(link)
      .then(function (response) {
        hide()    // Recall hide will hide the indicator
        if (response.status !== 200) {
          throw new Error("Not 200 response")
        }
        return response.json();
      }).then(function (response) {
        message.success("Loaded!", 1);
        result.status = "Successful"
        result.data = response;
        resultCB(result)
      }).catch(function (error) {
        message.error("Can't find this user, please try again.", 1);
        result.status = "Fail";
        resultCB(result)
      });

  }

  render() {
    return (
      <span >
        <Search
          placeholder="Input user's name"
          enterButton="Search"
          size="large"
          maxLength={300}
          prefix={<UserOutlined />}
          onChange={this.handleChange}
          onSearch={this.clickButton}
        />
      </span>

    );
  }
}
export default searching