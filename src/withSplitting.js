import React, { Component } from 'react';

const withSplitting = getComponent => {
  // 여기서 getComponent 는 () => import('./SplitMe') 의 형태로 함수가 전달되야합니다.
  class WithSplitting extends Component {
    state = {
      Splitted: null
    };

    constructor(props) {
      super(props);
      getComponent().then(({ default: Splitted }) => {
        this.setState({
          Splitted
        });
      });
    }

    render() {
      const { Splitted } = this.state;
      if (!Splitted) {
        return null;
      }
      return <Splitted {...this.props} />;
    }
  }

  return WithSplitting;
};

export const About = withSplitting(() => import(/* webpackChunkName: "about" */'Src/Container/About/About'));
export const User = withSplitting(() => import(/* webpackChunkName: "user" */'Src/Container/User/User'));
export const SuperMarket = withSplitting(() => import(/* webpackChunkName: "superMarket" */'Src/Container/SuperMarket/SuperMarket'));
export const Profile = withSplitting(() => import(/* webpackChunkName: "profile" */'Src/Container/Profile/Profile'));
