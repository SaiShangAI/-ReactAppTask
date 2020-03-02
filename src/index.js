import React from 'react';
import ReactDOM from 'react-dom';
/*
'antd' is a React UI library that contains a set of high quality components and demos 
for building rich, interactive user interfaces. The detail is here:https://ant.design/docs/react/introduce.

Layout: The layout wrapper, in which Header/ Sider/ Content/ Footer or Layout itself can be nested, 
 and can be placed in any parent container. The detail is here: https://ant.design/components/layout/.
*/
import { Layout } from "antd";
import "antd/dist/antd.css";

// own self component: 
import ResultShow from './ResultShow';
import Searching from './Searching';

// layout
const { Header, Footer, Content } = Layout;

// store search results and state
let result = { status: "Waiting Input" };

// callback for geting search results
function resultCallBack(res) {
  result = res;
  renderAll();
}

// render all page
function renderAll() {
  ReactDOM.render(<Layout className="layout">
    <Header style={{ padding: '12px 200px', backgroundColor: "#3266a7" }}>
      <Searching resultCB={resultCallBack} />
    </Header>
    <Content style={{ padding: '30px 30px', backgroundColor: 'white' }}>
      <ResultShow result={result} />
    </Content>
    <Footer style={{ textAlign: 'center' }}>Sai Shang Design ©2020 Created by SaiShang</Footer>
  </Layout>
    ,
    document.getElementById('root'));
}
renderAll();



























// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

