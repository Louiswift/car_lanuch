<template>
	<view class="item">
		<span :class="styleType"> {{ title }}</span>
		<!-- <input type="text" :value="txt" style="color:#6B6B6B;" disabled> -->
		<input v-if="type === 'User'" @input="onInput" type="text" :placeholder="txt" disabled>
		<input v-else-if="type === 'other'" @input="onInput" type="password" :placeholder="txt" :value="value">
	</view>
</template>

<script>
export default {
	name: "Input",
	data() {
		return {
		};
	},
	props: {
		type: {
			type: String,
			default: "other",
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
		}
	}
}
</script>

<style scoped>
.User {
	color: #6B6B6B;
}

.item {
	display: flex;
	border-top: 1px solid #D8D8D8;
	padding: 15px 0;
}

.item input {
	font-size: 14px;
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
}
</style>
