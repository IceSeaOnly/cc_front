import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {Grid,Step,Icon,Feedback,Button } from '@icedesign/base';
import axios from 'axios';
const Toast = Feedback.toast;

import ItemForm from './ItemForm';
import Step2ItemForm from './Step2ItemForm';
import Step4ItemForm from './Step4ItemForm';

const { Row, Col } = Grid;

export default class StepForm extends Component {
  static displayName = 'StepForm';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      contractId:-1,
      contract:{}
    };
  }

  componentDidMount(){
    var thiz = this;
    axios.get('/cache/getV')
      .then(function (response) {
        if(response.data.status == 'SUCCESS'){
          console.log('继续合约');
          thiz.fechData(response.data.data);
        }else{
          console.log('新建合约');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  fechData(id){
    var thiz = this;
    axios.get('/user/listMyContract?id='+id)
      .then(function (response) {
        var _step = response.data.data.state;
        var _cid = response.data.data.id;
          thiz.setState({step:_step<5?_step+1:_step,'contractId':_cid,'contract':response.data.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  clearV(){
    axios.get('/cache/clearV')
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  }

  setV(v){
    axios.post('/cache/setV', {'V':v})
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  nextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  afterSelectOffice = (contractId)=>{
    console.log('contractId:'+contractId);
    this.setV(contractId);
    this.setState({'contractId':contractId},function(){
        this.setState({ step: this.state.step + 1 });
    })
  }

  getContractId = ()=>{return this.state.contractId}

  dissoulution = ()=>{
    var func = "dissolution"
    var args = "[\"" + this.state.contract.uuid + "\"]"

    window.postMessage({
        "target": "contentscript",
        "data":{
            "to" : this.state.contract.smartContractAddrsss,
            "value" : 0,
            "contract" : {
                "function" : func,
                "args" : args
            }
        },
        "method": "neb_sendTransaction"
    }, "*");

  }

  renderStep = (step) => {
    if (step === 0) {
      return <ItemForm onSubmit={this.afterSelectOffice} />;
    }

    if (step === 1) {
      return <Step2ItemForm onSubmit={this.nextStep} getContractId={this.getContractId}/>;
    }

    if (step === 2) {
      return (
        <div style={styles.content}>
          <h2>
            <Icon type="loading" style={styles.icon} size="xl" />
            请等待该机构的审核<br/>{this.state.contract.sysRemark}
          </h2>
        </div>
      );
    }
    if (step === 3) {
      return <Step4ItemForm onSubmit={this.nextStep} getContractId={this.getContractId}/>;
    }

    if (step === 4) {
      return (
        <div style={styles.content}>
          <h2>
            <Icon type="process" style={styles.icon} size="xl" />
            系统正在检查是否到账...<br/>{this.state.contract.sysRemark}
          </h2>
        </div>
      );
    }

    if (step === 5) {
      return (
        <div style={styles.content}>
          <h2>
            <Icon type="success" style={styles.icon} size="xl" />
            合约履行中...<br/>{this.state.contract.sysRemark}
          </h2>
        </div>
      );
    }

        if (step === 6) {
      return (
        <div style={styles.content}>
          <Button onClick={this.dissoulution} > 解除合约 </Button><br/>
          <h2>
            <Icon type="good" style={styles.icon} size="xl" />
            合约已完成<br/>{this.state.contract.sysRemark}
          </h2>
        </div>
      );
    }

  };

  render() {
    return (
      <div className="step-form">
        <IceContainer>
          <Row wrap>
            <Col xxs="24" s="5" l="5" style={styles.formLabel}>
              <Step
                current={this.state.step}
                direction="vertical"
                type="dot"
                animation={false}
                style={styles.step}
              >
                <Step.Item title="选择机构" content="" />
                <Step.Item title="录入合约" content="" />
                <Step.Item title="机构审核" content="" />
                <Step.Item title="录入交易" content="" />
                <Step.Item title="系统确认" content="" />
                <Step.Item title="执行合约" content="" />
                <Step.Item title="合约完成" content="" />
              </Step>
            </Col>
            <Col xxs="24" s="18" l="18">
              {this.renderStep(this.state.step)}
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  step: {
    marginBottom: '20px',
  },
  content: {
    height: '200px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  icon: {
    color: '#1DC11D',
    marginRight: '10px',
  },
};
