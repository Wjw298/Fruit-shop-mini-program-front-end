

export default defineAppConfig({
  pages: [
    'pages/index/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  subPackages: [
    {
      "root": "pages/sort/",
      "pages": [
        "index"
      ]
    },
    {
      "root": "pages/order/",
      "pages": [
        "index",
      ]
    },
    {
      "root": "pages/user/",
      "pages": [
        "index",
        "order",
        "address",
        "address_1",
        "gotoInsert",
        "orderDetails",
        "appIntroduction",
        "gotoSuggestion"
      ]
    },
  ]
})
