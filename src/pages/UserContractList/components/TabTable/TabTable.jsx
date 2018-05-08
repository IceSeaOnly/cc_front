import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import { Tab ,Button} from '@icedesign/base';
import axios from 'axios';
import CustomTable from './components/CustomTable';

const TabPane = Tab.TabPane;

const tabs = [
  { tab: '全部', key: 'all' },
];

export default class TabTable extends Component {
  static displayName = 'TabTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      tabKey: 'all',
      userType:0,
    };
    this.columns = [
      {
        title: '机构名称',
        dataIndex: 'officeName',
        key: 'officeName',
      },
      {
        title: '用户名称',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '状态',
        dataIndex: 'states',
        key: 'states',
      },
      {
        title: '创建时间',
        dataIndex: 'createdTime',
        key: 'createdTime',
      },
      {
        title: '操作',
        key: 'action',
        render: (value, index, record) => {
          if(this.state.userType == 0){
            return (
              <span>
                <Button onClick={()=>this.seeContract(record)}>查看</Button>
                <Button type="primary" onClick={()=>this.optContract(record)}>操作</Button>
              </span>
            );
          }else{
            if(record.state == 1){
              return (
                <span>
                  <Button onClick={()=>this.confirmContract(record)}>同意</Button>
                  <Button type="primary" shape="warning" onClick={()=>this.delContract(record)}>删除</Button>
                  <Button type="primary" onClick={()=>this.seeContract(record)}>查看</Button>
                </span>
              );
            }else{
              return (
                <span>
                  <Button onClick={()=>this.seeContract(record)}>查看</Button>
                </span>
              );
            }
          } 
        },
      },
    ];
  }

  componentDidMount() {
    var thiz = this;
    axios.get('/login/isLogin')
      .then(function (response) {
        if(response.data.status=='SUCCESS'){
          thiz.setState({'userType':response.data.msg=='0'?0:1},function(){
            thiz.fetchData();
          });
        }else{
          window.location.href="/";
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  fetchData(){
    axios
      .get(this.state.userType==0?'/user/listMyContract':'/office/list')
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          dataSource: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  delContract = (record)=>{
    var thiz = this;
    axios
      .get('/office/delContract?id='+record.id)
      .then((response) => {
        thiz.fetchData();        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  confirmContract = (record)=>{
    var thiz = this;
    axios
      .get('/office/confirmContract?id='+record.id)
      .then((response) => {
        thiz.fetchData();        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleTabChange = (key) => {
    this.setState({
      tabKey: key,
    });
  };

  applyContract = ()=>{
    axios.get('/cache/clearV')
      .then(function (response) {
        window.location.href='/#/applyContract';
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  seeContract = (record)=>{
      axios.post('/cache/setV', {'V':record.id})
      .then(function (response) {
        window.location.href='/#/contractInfo';
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  optContract = (record)=>{
      axios.post('/cache/setV', {'V':record.id})
      .then(function (response) {
        window.location.href='/#/applyContract';
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { dataSource } = this.state;
    if(this.state.userType == 0){
        return (
        <div className="tab-table">
          <IceContainer>
              <Button type="primary" onClick={this.applyContract}>申请认证合约</Button>
          </IceContainer>
          <IceContainer>
            <Tab onChange={this.handleTabChange}>
              {tabs.map((item) => {
                return (
                  <TabPane tab={item.tab} key={item.key}>
                    <CustomTable
                      dataSource={dataSource}
                      columns={this.columns}
                      hasBorder={false}
                    />
                  </TabPane>
                );
              })}
            </Tab>
          </IceContainer>
        </div>
      );
    }else{
      return (
        <div className="tab-table">
          <IceContainer>
            <Tab onChange={this.handleTabChange}>
              {tabs.map((item) => {
                return (
                  <TabPane tab={item.tab} key={item.key}>
                    <CustomTable
                      dataSource={dataSource}
                      columns={this.columns}
                      hasBorder={false}
                    />
                  </TabPane>
                );
              })}
            </Tab>
          </IceContainer>
        </div>
      );
    }
    
  }
}
