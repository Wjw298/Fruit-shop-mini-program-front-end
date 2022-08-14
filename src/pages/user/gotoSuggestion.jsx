import {Component} from "react";
import {Input, Textarea, View} from "@tarojs/components";
import {AtButton} from "taro-ui";
import Taro from "@tarojs/taro";






class GotoSuggestion extends Component{

  constructor(props) {
    super(props);
    this.state = {
      suggestion:'请输入您宝贵的建议'
    }
  }
  suggestion=(suggestion)=>{
    this.setState({
      suggestion:suggestion
    })
  }

  yijian=()=>{
    setTimeout(function (){
      Taro.navigateTo({
        url: './index'
      }).then()
    },1000)

      }




  render() {
    const {suggestion}=this.state
    return (
      <View>
        <Textarea placeholder={suggestion}
                  onInput={this.suggestion.bind(suggestion)}
                  style='background:#fff;width:100%;height:80px;padding:0 30rpx;' autoFocus
        />

        <AtButton onClick={this.yijian}>提交意见</AtButton>

      </View>
    )
  }
}
export default GotoSuggestion
