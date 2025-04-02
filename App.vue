<script>
export default {
	onLaunch: function () {
		console.log('App Launch')
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	},
	onLaunch() {
		uni.$on("tabChanged", (item) => {
			console.log("全局监听 tabBar 切换：", item);
			if (item.text === "AI") {
				const app = getApp();
				console.log(app)
				// app.audioCHangeWord()
				console.log("拦截 AI Tab，阻止跳转！");
				//   this.audioCHangeWord()

				uni.switchTab({ url: "/pages/home" });
			}

			// uni.showToast({
			// 	title: `切换到 ${item.text}`,
			// 	icon: "none"
			// });
		});
	},
	method: {
		anotherMethod() {
			this.audioCHangeWord(); // 调用其他方法
		},
		onLoad() {
			this.audioCHangeWord(); // 生命周期钩子中调用
		},
		mounted() {
			this.audioCHangeWord(); // Vue 生命周期钩子中调用
		},
		audioCHangeWord() {
			var that = this;
			console.log(this)
			// 创建 SpeechRecognition 对象
			// eslint-disable-next-line no-undef
			var recognition = new webkitSpeechRecognition();
			if (!recognition) {
				// eslint-disable-next-line no-undef
				recognition = new SpeechRecognition();
			}
			// 设置语言
			recognition.lang = "zh-CN";
			// 开始语音识别
			recognition.start();
			that.isListening = true;
			// 监听识别结果
			recognition.onresult = function (event) {
				var result = event.results[0][0].transcript;
				console.log("识别的话：", result); // 在这里打印识别的话
				that.getChat(result)
			};
			// 监听错误事件
			recognition.onerror = function (event) {
				that.isListening = false;
				that.$message("监听语音失败:" + event.error);
				console.error(event.error);
			};
			// 监听结束事件（包括识别成功、识别错误和用户停止）
			recognition.onend = function () {
				that.isListening = false;
				console.log("语音识别停止");
			};
		},
		getChat(text) {
			uni.request({
				url: "http://localhost:8089/dev-api/getChat?value=" + text,
				method: 'GET',
				success: (res) => {
					console.log(res.data.response.response)
					// 使用说话方法
					speechMethods.webSocketSend(res.data.response.response);
				}
			});
		},
		chat(text) {
			const url = 'https://ark.cn-beijing.volces.com/api/v3/bots/chat/completions';
			const headers = {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer c31db783-e7ac-42a1-97a1-e41559c011a0',
			};
			const body = {
				"model": "bot-20241012171533-7wdc5",
				"messages": [{
					"role": "user",
					"content": text
				}]
			};
			uni.request({
				url: url,
				method: 'POST',
				header: headers,
				data: body,
				success: (res) => {
					if (res.statusCode === 200) {
						this.setData({
							responseData: res.data,
						});
						console.log(res.data); // 打印返回值
					} else {
						uni.showToast({
							title: '请求失败',
							icon: 'none',
						});
					}
				}
			});
		}
	}
}
</script>

<style lang="scss">
@import "@/uni_modules/uview-ui/index.scss";
/*每个页面公共css */
</style>
