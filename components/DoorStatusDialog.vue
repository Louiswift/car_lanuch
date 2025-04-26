<template>
    <transition name="fade">
        <view v-if="visible" class="dialog-overlay">
            <view class="dialog-box">
                <text class="dialog-message">{{ message }}</text>
            </view>
        </view>
    </transition>
</template>

<script>
export default {
    name: 'DoorStatusDialog',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: ''
        }
    },
    watch: {
        visible(newVal) {
            if (newVal) {
                setTimeout(() => {
                    this.$emit('update:visible', false);
                }, 1000);
            }
        }
    }
}
</script>

<style scoped>
.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.dialog-box {
    background: rgba(0, 0, 0, 0.7);
    padding: 15px 30px;
    border-radius: 20px;
    max-width: 80%;
    text-align: center;
}

.dialog-message {
    color: white;
    font-size: 16px;
}

/* fade 动画 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
</style>