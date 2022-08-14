import {Component} from 'react'
import {View, Button, Text} from '@tarojs/components'
import TabBar from "../common/tabBar";
import './index.css';
import Taro from "@tarojs/taro";
import {AtAvatar, AtButton,AtGrid,} from "taro-ui";



class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userImage: '',
      token: '',
      orders: [],
      address: [],
      state: '',
    }
  }


  componentDidMount() {//只第一次打开页面渲染一次
    Taro.getStorage({
      key: 'user',
      success: function (res) {
      }
    }).then(res => {
      let name
      let image
      let state
      let token
      let code
      let that = this;
      name = res.data.data.customer.name;
      image = res.data.data.customer.image;
      state = res.data.data.customer.state;
      token = res.data.data.msg;
      wx.login({
        success: res => {
          code = res.code;
        }
      })
      that.setState({
        userName: name,
        userImage: image,
        token: token,
        state: state
      })
    })
  }

  exit = () => {//退出
    const {token} = this.state
    let code
    wx.login({
      success: res => {
        code = res.code;
        Taro.request({
          url: "http://localhost:8090/exit",
          data: {
            code: code,
          },
          method: "POST",
          header: {
            "content-type": "application/json",
            token: token
          },
        }).then(res => {
          if (res.data > 0) {
            Taro.navigateTo({
              url: '../index/index'
            }).then()
          }
        })
      }
    })

  }
  getUserProfile = () => {//登录
    const {token} = this.state
    Taro.getUserProfile({//获取用户姓名和头像
      lang: 'zh_CN',
      desc: "获取你的昵称、头像、地区及性别",
      success: response => {
        const wxUserInfo = response.userInfo;
        wx.login({//微信登录,获取临时code,可以用来传到后台与其他东西拿到openId
          success: resp => {
            const code = resp.code;
            Taro.request({
              url: "http://localhost:8090/enroll",
              data: {
                user: wxUserInfo,
                code: code,
              },
              method: "POST",
              header: {
                "content-type": "application/json",
                token: token
              },

            }).then(() => {
              Taro.navigateTo({
                url: '../index/index'
              })
            })

          }
        })
        //this.onLoad();
      },
      fail: () => {
        console.error("您拒绝了请求");
        return;
        //拒绝授权
      }
    }).then()
  }

  gotoAddress = () => {
    let that = this;
    let {token, address} = this.state
    wx.login({
      success: res => {
        Taro.request({//请求address数据
          url: "http://localhost:8090/address/findAllAddress",
          data: {
            code: res.code
          },
          method: "GET",
          header: {
            "content-type": "application/json",
            token: token,
          },
          success: function (res) {
            address = res.data
            Taro.navigateTo({
              url: './address?address=' + JSON.stringify(address)
            }).then()
          }, fail: function (err) {
            console.log("获取address数据失败:", err);
          },
        })
      }
    })
  };

  gotoAppraise = () => {
    let that = this;
    let {token, orders} = this.state
    wx.login({
      success: res => {
        Taro.request({//请求order数据
          url: "http://localhost:8090/order/findOrder",
          data: {
            code: res.code
          },
          method: "GET",
          header: {
            "content-type": "application/json",
            token: token
          },
          success: function (res) {
            orders = res.data
            Taro.navigateTo({
              url: './order?orders=' + JSON.stringify(orders)
            }).then(()=>{
            })
          },
          fail: function (err) {
            console.log("获取order数据失败:", err);
          },
        })
      }
    })
  };

  gotoAppIntroduction(){
    Taro.navigateTo({
      url:'./appIntroduction'
    }).then()
  }


  render() {
    const {userName, state, userImage} = this.state
    return (
      <View className='page'>
        <View >
          <TabBar tabBarCurrent={3}/>
        </View>
        <View className='header'>
          {
            userName && state === 1
              ? <View >
                <View>
                  <View className='header-image'>
                    <AtAvatar circle image={userImage}/>
                  </View>
                  <View className='header-text'>
                    <Text>{userName}</Text>
                  </View>
                </View>
              </View>
              : <View >
                <View className='header-text'>
                  <Text onClick={this.getUserProfile}>注册/登录</Text>
                </View>
              </View>
          }
      </View>
        <View className='ziti'>
          <AtGrid  data={
            [
              {
                image: 'https://ts1.cn.mm.bing.net/th/id/R-C.05f19728acffc543e581660f203048c9?rik=o8dyovyUVJ0GtQ&riu=http%3a%2f%2fbpic.588ku.com%2felement_origin_min_pic%2f19%2f04%2f13%2fe34af0a9b89cc55322c4eb221d054036.jpg&ehk=%2bS4kJSCfVIsw4Jil1KRYrzbNx5saJ9LvhUHYnqxMhVs%3d&risl=&pid=ImgRaw&r=0',
                value: '收货地址'

              },
              {
                image: 'https://ts1.cn.mm.bing.net/th/id/R-C.b6af7b0b7652d1862829fa0dbc05a8df?rik=OOZeyBCwA%2bV78Q&riu=http%3a%2f%2fbpic.588ku.com%2felement_list_pic%2f19%2f04%2f10%2f1a0a7377b07a6656ded7f0c5c0c9e4d8.jpg&ehk=BEF%2fZX%2f2qxbYFNNTbgiP1O4wCdFn%2bO7ty36nNkGhzzw%3d&risl=&pid=ImgRaw&r=0',
                value: '历史评价'
              },
              {
                image: 'https://bpic.588ku.com/element_pic/20/07/01/09041135e0926fddba10c62095b2d17b.jpg!/fw/224/quality/90/unsharp/true/compress/true',
                value: '意见反馈'
              },
            ]
          } onClick={this.handleClick.bind(this)} />
        </View>
        <View className='main'>
          <View className='AtButton top'>
              <AtButton disabled={state ? 0 : 1} className='blue'></AtButton>
              <AtButton disabled={state ? 0 : 1} className='white'>联系客服：406—86688 >></AtButton>
              <AtButton disabled={state ? 0 : 1} className='blue'></AtButton>
              <AtButton  onClick={this.gotoAppIntroduction} disabled={state ? 0 : 1} className='white'>关于小程序功能详情简介>></AtButton>
              <AtButton disabled={state ? 0 : 1} className='blue'></AtButton>
              <AtButton onClick={this.exit} className='white' disabled={state ? 0 : 1}>--------退出登录------->></AtButton>
              <AtButton disabled={state ? 0 : 1} className='blue'></AtButton>
            </View>
        </View>
      </View>
    )
  }
  handleClick(value){
    console.log( value);
    switch(value.value){
      case "收货地址":
        this.gotoAddress();
        break;

      case "历史评价":
        this.gotoAppraise();
        break;
      case "意见反馈":
        Taro.navigateTo({
          url: './gotoSuggestion',
        });
        break;

    }
  }
}

export default User

