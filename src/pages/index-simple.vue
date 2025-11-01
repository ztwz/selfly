<!--
  简化版首页 - 确保在小程序中正常运行
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 页面状态
const loading = ref(true)

// 页面加载时完成
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<template>
  <view class="simple-home">
    <!-- 顶部标题区域 -->
    <view class="header">
      <text class="title">
        发现真实的自己
      </text>
      <text class="subtitle">
        专业的心理测试，助你深入了解内心世界
      </text>
    </view>

    <!-- 加载状态 -->
    <view v-if="loading" class="loading">
      <text class="loading-text">
        正在加载...
      </text>
    </view>

    <!-- 主要内容 -->
    <view v-else class="content">
      <!-- PDP测试卡片 -->
      <view class="test-card">
        <view class="card-cover">
          <text class="card-icon">
            🐅
          </text>
          <view class="card-badge">
            简单
          </view>
        </view>
        <view class="card-content">
          <text class="card-title">
            PDP动物性格测试
          </text>
          <text class="card-desc">
            发现你的内在动物性格！通过这个有趣的测试，了解你是老虎、孔雀、考拉、猫头鹰还是变色龙。
          </text>
          <view class="card-meta">
            <text class="meta-item">
              📝 10题
            </text>
            <text class="meta-item">
              ⏱️ 8分钟
            </text>
            <text class="meta-item">
              🔥 1.5w人测过
            </text>
          </view>
          <view class="card-tags">
            <text class="tag">
              性格测试
            </text>
            <text class="tag">
              动物性格
            </text>
            <text class="tag">
              PDP
            </text>
          </view>
        </view>
      </view>

      <!-- 分类导航 -->
      <view class="categories">
        <view class="category-item active">
          <text class="category-icon">
            🎯
          </text>
          <text class="category-name">
            全部
          </text>
        </view>
        <view class="category-item">
          <text class="category-icon">
            🧠
          </text>
          <text class="category-name">
            性格测试
          </text>
        </view>
        <view class="category-item">
          <text class="category-icon">
            💡
          </text>
          <text class="category-name">
            智力测试
          </text>
        </view>
        <view class="category-item">
          <text class="category-icon">
            🎭
          </text>
          <text class="category-name">
            心理测试
          </text>
        </view>
        <view class="category-item">
          <text class="category-icon">
            ❤️
          </text>
          <text class="category-name">
            兴趣测试
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.simple-home {
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 24px 16px;
}

.header {
  text-align: center;
  margin-bottom: 32px;
}

.title {
  display: block;
  font-size: 30px;
  font-weight: 700;
  color: #6366f1;
  margin-bottom: 8px;
}

.subtitle {
  display: block;
  font-size: 16px;
  color: #64748b;
  line-height: 1.5;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.loading-text {
  font-size: 14px;
  color: #64748b;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.test-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.card-cover {
  position: relative;
  height: 160px;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon {
  font-size: 48px;
  color: white;
}

.card-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  background-color: rgba(16, 185, 129, 0.9);
  color: white;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.card-content {
  padding: 16px;
}

.card-title {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.card-desc {
  display: block;
  font-size: 14px;
  color: #64748b;
  margin-bottom: 16px;
  line-height: 1.5;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.meta-item {
  font-size: 12px;
  color: #94a3b8;
}

.card-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 8px;
  background-color: #f1f5f9;
  color: #64748b;
  border-radius: 12px;
  font-size: 12px;
}

.categories {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  min-width: 60px;
  transition: all 0.15s ease;
}

.category-item.active {
  background-color: #6366f1;
}

.category-icon {
  font-size: 20px;
}

.category-name {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

.category-item.active .category-name {
  color: white;
}
</style>
