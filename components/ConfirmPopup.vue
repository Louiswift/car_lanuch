<template>
  <uni-popup ref="popupRef" type="center">
    <view class="popup-content">
      <text class="popup-title">注销账号</text>
      <text class="popup-text">
        注销账号是不可恢复的操作，该账号绑定的邮箱 15 天后方可重新申请注册。
      </text>
      
      <view class="popup-buttons">
        <button class="cancel-btn" @click="close">取消</button>
        <button 
          class="confirm-btn" 
          :disabled="countdown > 0" 
          @click="confirm"
        >
          {{ countdown > 0 ? `注销 (${countdown}s)` : "注销" }}
        </button>
      </view>
    </view>
  </uni-popup>
</template>

<script>
export default {
  data() {
    return {
      countdown: 15,
      timer: null
    };
  },
  methods: {
    open() {
      this.$refs.popupRef.open();
      this.startCountdown();
    },
    close() {
      this.$refs.popupRef.close();
      clearInterval(this.timer);
      this.countdown = 15;
    },
    startCountdown() {
      this.countdown = 15;
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    confirm() {
      this.$emit("confirm");
      this.close();
    }
  }
};
</script>

<style>
.popup-content {
  width: 320px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.popup-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
}

.popup-text {
  font-size: 14px;
  margin-bottom: 20px;
  display: block;
  color: #666;
}

.popup-buttons {
  display: flex;
  justify-content: space-between;
}

.cancel-btn {
  background-color: #ccc;
  flex: 1;
  margin-right: 10px;
  font-size: 24rpx;
  padding: 10px;
}

.confirm-btn {
  background-color: #007aff;
  color: white;
  flex: 1;
  font-size: 24rpx;
  padding: 10px;
}
.confirm-btn:disabled {
  background-color: #ccc;
}
</style>
