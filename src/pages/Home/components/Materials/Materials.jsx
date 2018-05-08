import React, { Component } from 'react';
import { Button } from '@icedesign/base';
import { Link } from 'react-router-dom';

export default class IntroWithBackground extends Component {
  static displayName = 'IntroWithBackground';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.inntroContent}>
          <h3 style={styles.title}>系统简洁安全</h3>
          <div style={styles.titleLine}>
            <div style={styles.titleHighlightLine} />
          </div>
          <p style={styles.desc}>
            专业视觉设计，安全数据存储，海量认证机构
            是您进行资产证明、信用托管的理想方案
          </p>
          <Link to="">
            <Button style={styles.extraButton}>立即使用 &gt;</Button>
          </Link>
        </div>
        <div style={styles.background}>
          <div style={styles.grayOverlay} />
          <div style={styles.backgroundImage} />
        </div>
        <div style={styles.topClipTriange} />
        <div style={styles.bottomClipTriange} />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
    height: '750px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-100px',
  },
  inntroContent: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: '#fff',
    width: '466px',
  },
  titleLine: {
    width: '140px',
    height: '2px',
    marginTop: '17px',
    background: '#FFFFFF',
    borderLeft: '2px solid ##5fb2f8',
  },
  titleHighlightLine: {
    background: '#3080FE',
    height: '2px',
    width: '33px',
  },
  title: {
    fontSize: '36px',
  },
  desc: {
    fontSize: '16px',
    lineHeight: 1.5,
    marginTop: '34px',
    textAlign: 'center',
  },
  extraButton: {
    marginTop: '85px',
    borderColor: '#fff',
    background: 'transparent',
    color: '#fff',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: '#ccc',
  },
  grayOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.76)',
    zIndex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundImage:
      'url(http://cdn.binghai.site/o_1ccv7p1541r31f541au1uea13ra.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  topClipTriange: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    background: '#fff',
    height: '150px',
    zIndex: 1,
    clipPath: 'polygon(0 0, 0 100%, 100% 0)',
  },
  bottomClipTriange: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: '#fff',
    height: '150px',
    zIndex: 1,
    clipPath: 'polygon(0 100%, 100% 0%, 100% 100%)',
  },
};
