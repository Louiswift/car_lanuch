<template>
	<view class="Item" @click="fuc">
		<text>{{ text }}</text>
		<view class="right">
			<view class="numberWrap">
				<text class="txt">{{ content }}</text>
			</view>
			<img src="../static/右边.png" class="rightIcon" alt="" srcset="" />
		</view>
	</view>
</template>

<script>
export default {
	name: "Item",
	data() {
		return {
		};
	},
	props: {
		type: {
			type: String,
			default: "hidden",
			required: false,
		},
		text: {
			type: String,
			required: true
		},
		fuc: {
			type: Function,
			required: true
		},
		content: {
			type: String,
			required: false
		}
	},
	computed: {
		styleType() {
			return `show-${this.type}`;
		}
	}
}
</script>

<style scoped>
.Item {
	display: flex;
	justify-content: space-between;
	padding: 15px;
	text-align: left;
	color: #48474F;
}

.rightIcon {
	width: 20px;
}

.right {
	display: flex;
	align-items: center;
}

.numberWrap {
	display: flex;
	gap: 5px;
}

.txt {
	padding-right: 4px;
	font-size: 15px;
}

.show-hidden {
	display: none;
}

.show-phone {
	display: inline-block;
}
</style>