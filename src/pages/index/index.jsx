import {Component} from 'react'
import {View, Text} from '@tarojs/components'
import TabBar from "../common/tabBar";
import Taro from "@tarojs/taro";


class Index extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidShow() {
    wx.login({//微信登录,获取临时code,可以用来传到后台与其他东西拿到openId
      success: resp => {
        const code = resp.code;
        //DoSomthing 携带code请求服务器
        Taro.request({
          url: "http://localhost:8090/login",
          data: {
            code: resp.code
          },
          method: "POST",
          header: {
            "content-type": "application/json"
          }
        }).then(res => {
          console.log("存结果: ",res)
          if (res.data != null) {
            Taro.setStorage({
              key: "user",
              data: res,
            })
          }
        }).catch((err) => {
          console.log("错误: ", err);
        })
      }
    })
  }


  componentDidMount() {//只第一次打开页面渲染一次

  }

  componentDidHide() {
  }

  render() {
    return (
      <View>
        <View><Text>Hello, 主页</Text></View>
        <TabBar tabBarCurrent={0}/>
      </View>
    )
  }
}

export default Index

