import {Component} from 'react'
import {Text, View} from '@tarojs/components'
import TabBar from "../common/tabBar";
import Taro from "@tarojs/taro";


class Sort extends Component {

  componentWillUnmount() {}

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    return (
      <View>
        <Text>Hello，查看分类</Text>
        <TabBar tabBarCurrent={1} />
      </View>
    )
  }
}

export default Sort

