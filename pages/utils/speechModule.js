import { Base64 } from './js/base64js.js';
import './js/enc-base64-min';
import CryptoJS from './js/hmac-sha256.js';

const APPID = '08c1a943';
const API_SECRET = 'NmQ5YmY0Nzg4MmU0YTQzNGU0NmM5OWMy';
const API_KEY = '5cbaed332e3e5b1dbbb8959e4d59b879';

const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();

// 生成握手参数
const getWebSocketUrl = () => {
  return new Promise((resolve, reject) => {
    var url = 'wss://iat-api.xfyun.cn/v2/iat';
    var host = 'iat-api.xfyun.cn';
    var apiKey = API_KEY;
    var apiSecret = API_SECRET;
    var date = new Date().toGMTString();
    var algorithm = 'hmac-sha256';
    var headers = 'host date request-line';
    var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/iat HTTP/1.1`;
    var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
    var signature = CryptoJS.enc.Base64.stringify(signatureSha);
    var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    var authorization = Base64.btoa(authorizationOrigin);
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
    resolve(url);
  });
};

// 连接 websocket
const connectWebSocket = async () => {
  const url = await getWebSocketUrl();
  uni.connectSocket({
    url: encodeURI(url)
  });
  uni.onSocketOpen(function(res) {
    console.log('WebSocket 连接已打开！');
  });
  uni.onSocketError(function(res) {
    console.log('WebSocket 连接打开失败，请检查！');
  });
  uni.onSocketMessage(function(res) {
    console.log('收到服务器内容：' + res.data);
    // 这里可以根据需要处理接收到的消息，或者将处理逻辑暴露给外部调用者
  });
};

// 对处理后的音频数据进行 base64 编码
const toBase64 = (buffer) => {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return Base64.btoa(binary);
};

// 向 webSocket 发送数据，现在接受一个参数 text
const webSocketSend = (text) => {
  // 假设将文本转换为音频数据的逻辑（这里只是模拟，实际需要根据具体情况实现）
  let audioData = Array.from(new Uint8Array(text));
  let audioDataSlice = audioData.splice(0, 1280);
  var params = {
    common: {
      app_id: APPID
    },
    business: {
      language: 'zh_cn',
      domain: 'iat',
      accent: 'mandarin',
      vad_eos: 3000,
      dwa: 'wpgs'
    },
    data: {
      status: 0,
      format: 'audio/L16;rate=16000',
      encoding: 'raw',
      audio: toBase64(audioDataSlice)
    }
  };
  console.log('------初始化头部数据--流式分片发送数据到讯飞平台------');
  uni.sendSocketMessage({
    data: JSON.stringify(params)
  });
  let handlerInterval = setInterval(() => {
    console.log('------具体内容数据--流式分片发送数据到讯飞平台------');
    if (audioData.length === 0) {
      uni.sendSocketMessage({
        data: JSON.stringify({
          data: {
            status: 2,
            format: 'audio/L16;rate=16000',
            encoding: 'raw',
            audio: ''
          }
        })
      });
      clearInterval(handlerInterval);
      return false;
    }
    audioDataSlice = audioData.splice(0, 1280);
    uni.sendSocketMessage({
      data: JSON.stringify({
        data: {
          status: 1,
          format: 'audio/L16;rate=16000',
          encoding: 'raw',
          audio: toBase64(audioDataSlice)
        }
      })
    });
  }, 40);
};

const speechMethods = {
  connectWebSocket,
  webSocketSend
};

export default speechMethods;