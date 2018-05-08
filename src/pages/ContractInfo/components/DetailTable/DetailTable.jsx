import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {Feedback } from '@icedesign/base';
import axios from 'axios';
const Toast = Feedback.toast;

export default class DetailTable extends Component {
  static displayName = 'DetailTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      contract:{},
      userType:0,
    };
  }

  componentDidMount(){
    var thiz = this;
    axios.get('/login/isLogin')
      .then(function (response) {
        if(response.data.status=='SUCCESS'){
          thiz.setState({'userType':response.data.msg=='0'?0:1},function(){
            thiz.initId();
          });
        }else{
          window.location.href="/";
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  initId(){
    var thiz = this;
    axios.get('/cache/getV')
      .then(function (response) {
        if(response.data.status == 'SUCCESS'){
          thiz.fechData(response.data.data);
        }else{
          Toast.error('合约载入错误!');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  fechData(id){
    var thiz = this;
    axios.get((this.state.userType == 0?'/user/listMyContract?id=':'/office/list?id=')+id)
      .then(function (response) {
          thiz.setState({contract:response.data.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="detail-table">
        <IceContainer title="合约详情">
          <ul style={styles.detailTable}>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>用户名：</div>
              <div style={styles.detailBody}>{this.state.contract.userId}/{this.state.contract.userName}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>机构名称：</div>
              <div style={styles.detailBody}>{this.state.contract.officeId}/{this.state.contract.officeName}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>合约时间：</div>
              <div style={styles.detailBody}>{this.state.contract.createdTime}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>合约额度：</div>
              <div style={styles.detailBody}>{this.state.contract.val} NAS</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>合约地址：</div>
              <div style={styles.detailBody}>{this.state.contract.smartContractAddrsss}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>交易Hash：</div>
              <div style={styles.detailBody}>{this.state.contract.tx}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>合约参考码：</div>
              <div style={styles.detailBody}>{this.state.contract.uuid}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>合约到期时间：</div>
              <div style={styles.detailBody}>{this.state.contract.endTimeTs}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>合约内容：</div>
              <div style={styles.detailBody}>{this.state.contract.remark}</div>
            </li>
            <li style={styles.detailItem}>
              <div style={styles.detailTitle}>合约状态：</div>
              <div style={styles.detailBody}>
                <span style={styles.statusProcessing}>{this.state.contract.states}</span>
              </div>
            </li>
          </ul>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  detailItem: {
    padding: '15px 0px',
    display: 'flex',
    borderTop: '1px solid #EEEFF3',
  },
  detailTitle: {
    marginRight: '30px',
    textAlign: 'right',
    width: '120px',
    color: '#999999',
  },
  detailBody: {
    flex: 1,
  },
  statusProcessing: {
    color: '#64D874',
  },
};
