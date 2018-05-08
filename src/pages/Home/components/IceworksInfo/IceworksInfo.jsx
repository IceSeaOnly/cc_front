import React, { Component } from 'react';
import { Button } from '@icedesign/base';
import { Link } from 'react-router-dom';

export default class ProductIntro extends Component {
  static displayName = 'ProductIntro';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.productContent}>
          <div style={styles.productInfo}>
            <h3 style={styles.title}>基于星云链智能合约</h3>
            <div style={styles.titleLine}>
              <div style={styles.titleHighlightLine} />
            </div>
            <p style={styles.desc}>
              该智能合约解决了押金场景中的不信任痛点:
 用户与要求提供押金证明的机构约定好押金额度后，通过创建一条合约，即可将指定的NAS数字货币托管到该智能合约上。
 约定的押金周期结束后，用户即可自行解除合约提回数字货币。即便是对方机构倒闭不存在了，也不会影响押金的安全。
            </p>
          </div>
          <div style={styles.productSnapshot}>
            <img
              width={696}
              height={527}
              src="http://cdn.binghai.site/o_1ccve598pqtir3s17021bbi1u0qa.png"
              alt=""
            />
          </div>
        </div>
        <div style={styles.clipBackground} />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
    height: 690,
    marginTop: '-130px',
    paddingTop: '10px',
  },
  productContent: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 120,
  },
  titleLine: {
    width: 140,
    height: 2,
    marginTop: 17,
    background: '#fff',
    borderLeft: '2px solid ##5fb2f8',
  },
  titleHighlightLine: {
    background: '#3080FE',
    height: 2,
    width: 33,
  },
  productSnapshot: {},
  productInfo: {
    width: 400,
    marginRight: 90,
    marginTop: 40,
  },
  title: {
    color: '#223C4E',
    fontSize: 36,
  },
  desc: {
    color: '#6D7A82',
    fontSize: 16,
    lineHeight: 1.5,
    marginTop: 24,
  },
  extraButton: {
    marginTop: 35,
    borderColor: '#3080FE',
    background: 'transparent',
    color: '#3080FE',
  },
  clipBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: '#FAFAFA',
    clipPath: 'polygon(0 15%, 100% 0, 100% 85%, 0% 100%)',
  },
};
