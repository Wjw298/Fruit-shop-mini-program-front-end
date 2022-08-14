import {Component} from 'react';
import { AtTabBar }  from 'taro-ui'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'


class TabBar extends Component {

  handleClick (value) {
    console.log("tabBar ====" +value);
    switch (value) {
      case 0:
        Taro.reLaunch({
          url: '/pages/index/index'
        });
        break;
      case 1:
        Taro.reLaunch({
          url: `/pages/sort/index` //'/pages/physicalIdentity/healthKnowledge'
        });
        break;
      case 2:
        Taro.reLaunch({
          url: '/pages/order/index'
        });
        break;
      case 3:
        Taro.reLaunch({
          url: '/pages/user/index'
        });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <View>
        <AtTabBar
          fixed
          backgroundColor='#ffffff'
          color='#cccccc'
          selectedColor='#4d8581'
          tabList={[
            { title: '首页', iconType: 'home' },
            { title: '分类', iconType: 'list' },
            { title: '订单', iconType: 'shopping-cart' },
            { title: '个人中心', iconType: 'user' },
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.props.tabBarCurrent}
        />
      </View>
    );
  }
}

export default TabBar;
