<template>
	<view class="focus-input">
		<view class="input-wrapper" :class="{ active: isFocus }">
			<span :class="styleType"> {{ title }}</span>
			<input @focus="isFocus = true" @blur="isFocus = false" v-if="type === 'User'" @input="onInput" type="text"
				:placeholder="txt" disabled>
			<input @focus="isFocus = true" @blur="isFocus = false" v-if="type === 'text'" @input="onInput" :type="type"
				:placeholder="txt">
			<input @focus="isFocus = true" @blur="isFocus = false" v-if="type === 'number'" @input="onInput"
				:type="type" :placeholder="txt" maxlength="11">
			<input @focus="isFocus = true" @blur="isFocus = false" v-else-if="type === 'password'" @input="onInput"
				:type="type" :placeholder="txt" :value="value">
			<!-- <view class="input-box1" v-else-if="type === 'code'" >
				<input class="inputcode" @input="onInput" type="text" :placeholder="txt" :value="value" maxlength="6" @focus="isFocus = true" @blur="isFocus = false">
				<button class="code-btn" :disabled="countdown > 0" @click="fuc">
					{{ countdown > 0 ? `${countdown}s` : "获取验证码" }}
				</button>
			</view> -->
		</view>
	</view>
</template>

<script>
export default {
	name: "Input",
	data() {
		return {
			countdown: 0,
			isFocus: false
		};
	},
	props: {
		type: {
			type: String,
			default: "text",
			required: false
		},
		fuc: {
			type: Function,
			required: false
		},
		title: {
			type: String,
			required: true
		},
		txt: {
			type: String,
			required: true
		},
		value: {
			type: String,
		}
	},
	computed: {
		styleType() {
			return `${this.type}`;
		}
	},
	methods: {
		onInput(event) {
			this.$emit('input', event.target.value);
		},
		getCode() {
			if (this.countdown > 0) return;
			uni.showToast({ title: "验证码已发送", icon: "success" });
			this.countdown = 60;
			this.timer = setInterval(() => {
				this.countdown--;
				if (this.countdown <= 0) clearInterval(this.timer);
			}, 1000);
		},
	}
}
</script>

<style scoped>
.User {
	color: #6B6B6B;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 2rpx solid #ccc;
  border-radius: 10rpx;
  padding: 20rpx;
  transition: border-color 0.3s;
}

.active {
  border-color: #007aff;
}

.hint {
	color: #A7A7A7;
	font-size: 14px;
}

.itemWrap .item:last-child {
	border-bottom: 1px solid #D8D8D8 !important;
}

span {
	width: 180rpx;
	font-size: 28rpx;
}

.input-box {
	display: flex;
	align-items: center;
	background: #f5f5f5;
	padding: 12px 0;
	border-top: 1px solid #D8D8D8;
	border-bottom: 1px solid #D8D8D8;
}

.input-box1 {
	display: flex;
	align-items: center;
	background: #f5f5f5;
	border-radius: 10rpx;
	flex: 1;
}

.inputcode{
	flex: 1;
}

.code-btn {
	font-size: 14px;
}

.input-wrapper {
	display: flex;
	align-items: center;
	border: 2rpx solid #ccc;
	border-radius: 10rpx;
	padding: 20rpx;
	transition: border-color 0.3s;
}

.input-wrapper.active {
	border-color: #007aff;
}

input {
	flex: 1;
	font-size: 28rpx;
	border: none;
	background: transparent;
}
</style>
