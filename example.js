var mqtt = require('./')

const clientId = 'app20191009111001380400'
const host = 'mqtt://bj-pt-prd-vpn.reworldgame.com:1883'
const options = {
  keepalive: 30,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  username: '20191009111001380400', //  登录的用户名
  password: 'aOFohUK4e3zIT8Hr3Cyu5/D+tMWOk51WgKHLV6Vc3g1S0pm2VINjIfkOZUUXxPo/4f5tMdYFa5499sKO8wMV0he6r3wFQvRsrdPyjJ+Gqti8x0E5TuTOXwsus9flnZQL0KL6oWUGPm4onvkaY2A8fwDkb0C7osxD/1Lp6p6Fsn4w0PGFwBaFFL7HEfTfEmEH',
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
  rejectUnauthorized: false
}
// 可查看到 mqtt 模块的信息
console.log('connecting mqtt client')
// window.client = mqtt.connect(host, options)
const client = mqtt.connect(host, options)
client.on('error', (err) => {
  console.log('Connection error: ', err)
  client.end()
})
// 重新连接
client.on('reconnect', () => {
  console.log('Reconnecting...')
})
client.on('connect', () => {
  MS()
  // MP('181708623737555397')
  // MP('181708623737555399')
  // console.log('Client connected:' + clientId)
  // client.subscribe('MN', () => {
  //   client.on('messagesubscribe', (topic, message, packet) => {
  //     console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic)
  //   })
  // })
  // const LRMs = {
  //   conversation: {
  //     type: 0,
  //     target: '20191021141051835748',
  //     line: 0
  //   },
  //   beforeUid: 0,
  //   count: 10
  // }
  // client.publish('LRM', JSON.stringify(LRMs), {
  //   qos: 1,
  //   retain: false
  // }, (error, res) => {
  //   if (error) {
  //     console.log('Subscribe to topics error', error)
  //     return
  //   }
  //   console.log('Subscribe to topics res', res, res.payload.toString())
  // })
})
client.on('message', (topic, message, packet) => {
  // console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic)
  console.log(Number(JSON.parse(message.toString()).head) - 1)
  if (topic === 'MN') MP(Number(JSON.parse(message.toString()).head) - 1)
  if (topic === 'MP') MS(JSON.parse(message.toString()).head - 1)
})
// client.on('messagesubscribe', (topic, message, packet) => {
//   console.log('Received messagesubscribe: ' + message.toString() + '\nOn topic: ' + topic)
//   console.log(message)
//   if (topic === 'MN') MP(JSON.parse(message.toString()).head)
// })
function MS() {
  const consentimg = {
    conversation: {
      // 0: 私信 1: 群组
      type: 0,
      //  私信时对方userId，群组时是群组标识
      target: '20191009111001380400',
      line: 0
    },
    // 发送者userId
    fromUser: '20191021141051835748',
    content: {
      // 消息类型  1 - 文本消息    9-点赞消息
      type: 1,
      // 点赞时 '{\'type\':1, \'user\': \'dmqk\', \'mid\': \'167683548902359052\'}'  type含义：1献花  2凋零
      content: 'electronhello,you got it! electron',
      // 搜索内容
      searchableContent: 'electronhello,you got it!',
      // 标记 是否读
      persistFlag: 3
    }
  }
  const MPS = client.publish('MS', JSON.stringify(consentimg), {
    qos: 1,
    retain: false
  }, (error, res) => {
    if (error) {
      console.log('Subscribe to topics error', error)
      return
    }
    console.log('Subscribe to topics res', res.toString(), res.payload.toString())
    console.log(JSON.parse(res.payload).content.content)
  })
  console.log(MPS)
}

function MP(num) {
  console.log('===================', num)
  const mps = {
    // 拉取消息时的  current 传入参数时 需要将当前（messageId - 1 ），因为拉取的内容是 传入id之后的消息
    // id: '181708623737554833',
    id: num,
    type: 0
  }
  client.publish('MP', JSON.stringify(mps), {
    qos: 1,
    retain: false,
    cbStorePut: (error, res) => {
      if (error) {
        console.log('Subscribe cbStorePuts error', error)
        return
      }
      console.log('Subscribe cbStorePuts res', res)
    }
  }, (error, res) => {
    if (error) {
      console.log('Subscribe to topics error', error)
      return
    }
    console.log('Subscribe to topics res', this, res)
    console.log(client)
    console.log(client._events.messagesubscribe)
    // client._events.message((topic, message, packet) => {
    //   console.log(topic, message, packet)
    // })
  })
}