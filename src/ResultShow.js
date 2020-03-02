/* 
ResultShow Component:
--------------------------------------------------------------------------------------------
Show the results of searching. Items will be shown in a List. List using ant-design's List;
Also the description and the number of star/watcher/fork will be shown.
Each page will show 5 items. A page selector will be at the bottom of page
--------------------------------------------------------------------------------------------
Using : 
<ResultShow result={result}/>

result formate:
{ status, data={} }
 - status is one of status:
    -"Waiting Input"
    -"Fail"
    -"Successful"
 - data is return package of github API : https://developer.github.com/v3/repos/
 */




import React from 'react';

//Semantic vector graphics that are supplied in antd. The detail is here:https://ant.design/components/icon/.
import { StarOutlined, EyeFilled, ForkOutlined } from '@ant-design/icons';
import { Alert, List, Avatar } from "antd";
import "antd/dist/antd.css";


// For star/watcher/fork and following number
const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);


// Result display component
class ResultShow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // Show 'Waitting for input' message at start
    if (this.props.result == undefined || this.props.result.status == "Waiting Input") {
      return <Alert message='Waiting For Input' type="info" />
    }

    // When get result, show the list
    if (this.props.result.status == "Successful") {
      return <List                //Using list from ant-desing: https://ant.design/components/list/
        itemLayout="vertical"     //item's layout is vertical 
        size="large"              //large
        pagination={{             //5 item in one page
          pageSize: 5,
        }}
        dataSource={this.props.result.data}  //source data

        renderItem={item => (     //reander for each data
          <List.Item
            key={item.title}
            actions={[            //star / watchers / forks 
              <IconText icon={StarOutlined} text={item.stargazers_count} key="list-vertical-star-o" />,
              <IconText icon={EyeFilled} text={item.watchers_count} key="list-vertical-like-o" />,
              <IconText icon={ForkOutlined} text={item.forks_count} key="list-vertical-message" />,
            ]}
          >

            <List.Item.Meta       //avatar title description
              avatar={<Avatar src={item.owner.avatar_url} />}
              title={<a href={item.html_url} target="_blank" rel="noopener noreferrer">{item.name}</a>}
              description={item.description != undefined ? ("Description: " + item.description) : ''}
            />
          </List.Item>
        )}>
      </List>
    }

    // If something wrong
    if (this.props.result.status == "Fail") {
      return <Alert message='Sorry, Nothing can be found' type="error" />
    }
  }
}

export default ResultShow;