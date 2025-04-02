<template>
    <view class="container" :style="{ height: containerHeight + 'px' }">
        <view class="content">
            <uni-collapse v-model="activeIndex" :accordion="true" class="wrap">
                <uni-collapse-item v-for="(item, index) in items" :key="index" :title="item.title"
                    :name="String(index)">
                    <view class="itemdate">{{ item.date }}</view>
                    <view class="panel">
                        <text>{{ item.content }}</text>
                    </view>
                </uni-collapse-item>
            </uni-collapse>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            containerHeight: 0,
            activeIndex: '',
            items: [
                { title: '苍穹车机 3.9.0主要更新', date: '2025-04-02', content: '修复已知BUG,增加功能等等' },
                { title: '苍穹车机 3.0.1主要更新', date: '2025-04-02', content: '修复已知BUG,增加功能等等' },
                { title: '苍穹车机 3.0.0主要更新', date: '2025-04-02', content: '修复已知BUG,增加功能等等' },
                { title: '苍穹车机 2.2.1主要更新', date: '2025-04-02', content: '修复已知BUG,增加功能等等' },
                { title: '苍穹车机 2.1.0主要更新', date: '2025-04-02', content: '修复已知BUG,增加功能等等' },
                { title: '苍穹车机 2.0.0主要更新', date: '2025-04-02', content: '修复已知BUG,增加功能等等' },
                { title: '苍穹车机 1.0.0主要更新', date: '2025-04-02', content: '修复已知BUG,增加功能等等' },
            ]
        }
    },
    onReady() {
        const systemInfo = uni.getSystemInfoSync();
        this.containerHeight = systemInfo.windowHeight;
    },
    methods: {

    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}

.wrap {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 10rpx;
}

.itemdate {
    color: #737373;
    font-size: 24rpx;
    font-weight: bold;
    padding-left: 10px;
    padding-bottom: 5px;
}

.panel {
    padding: 10px;
    background-color: #ffffff;
    border-top: 1px solid #ccc;;
}
</style>