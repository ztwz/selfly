<!--
  美观有趣的首页设计
  参考现代UI风格，渐变背景，圆角卡片，有趣的图标
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 页面状态
const loading = ref(true)
const selectedCategory = ref(0)

// 测试分类
const categories = [
  { id: 0, name: '推荐', icon: '✨', color: '#667eea' },
  { id: 1, name: '性格', icon: '🧠', color: '#f56565' },
  { id: 2, name: '心理', icon: '💝', color: '#48bb78' },
  { id: 3, name: '情商', icon: '💡', color: '#ed8936' },
  { id: 4, name: '职业', icon: '💼', color: '#9f7aea' },
]

// 测试列表
const tests = [
  {
    id: 1,
    title: 'PDP动物性格',
    subtitle: '发现你的内在动物性格',
    icon: '🐅',
    color: '#667eea',
    bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    tags: ['性格', '热门'],
    participants: '12.3k',
    time: '8分钟',
    difficulty: '简单',
  },
  {
    id: 2,
    title: 'MBTI人格测试',
    subtitle: '探索你的16型人格',
    icon: '🎭',
    color: '#f56565',
    bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    tags: ['人格', '专业'],
    participants: '8.7k',
    time: '12分钟',
    difficulty: '中等',
  },
  {
    id: 3,
    title: '爱情语言测试',
    subtitle: '发现你的爱情表达方式',
    icon: '💝',
    color: '#ed64a6',
    bgColor: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    tags: ['情感', '热门'],
    participants: '15.2k',
    time: '6分钟',
    difficulty: '简单',
  },
  {
    id: 4,
    title: '隐藏人格测试',
    subtitle: '揭示你内心的真实面貌',
    icon: '👤',
    color: '#4299e1',
    bgColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    tags: ['心理', '深度'],
    participants: '6.8k',
    time: '15分钟',
    difficulty: '困难',
  },
]

// 页面加载
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1500)
})

// 选择分类
function selectCategory(index: number) {
  selectedCategory.value = index
}

// 开始测试
function startTest(testId: number) {
  // 跳转到测试答题页面
  uni.navigateTo({
    url: '/pages/test/quiz/index?testId=' + testId
  })
}
</script>

<template>
  <view class="home-container">
    <!-- 背景装饰 -->
    <view class="bg-decoration">
      <view class="bg-circle circle-1" />
      <view class="bg-circle circle-2" />
      <view class="bg-circle circle-3" />
    </view>

    <!-- 顶部导航栏 -->
    <view class="navbar">
      <view class="nav-title">
        <text class="title-text">
          发现真实的
        </text>
        <text class="title-highlight">
          自己
        </text>
      </view>
      <view class="nav-subtitle">
        <text class="subtitle-text">
          专业心理测试，探索内心世界
        </text>
      </view>
    </view>

    <!-- 分类标签 -->
    <view class="category-section">
      <scroll-view class="category-scroll" :scroll-x="true" :show-scrollbar="false">
        <view class="category-list">
          <view
            v-for="(category, index) in categories"
            :key="category.id"
            class="category-item"
            :class="{ 'category-active': selectedCategory === index }"
            :style="{ '--category-color': category.color }"
            @tap="selectCategory(index)"
          >
            <text class="category-icon">
              {{ category.icon }}
            </text>
            <text class="category-name">
              {{ category.name }}
            </text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 加载状态 -->
    <view v-if="loading" class="loading-container">
      <view class="loading-spinner" />
      <text class="loading-text">
        正在发现精彩测试...
      </text>
    </view>

    <!-- 测试卡片列表 -->
    <view v-else class="test-section">
      <view class="test-grid">
        <view
          v-for="test in tests"
          :key="test.id"
          class="test-card"
          @tap="startTest(test.id)"
        >
          <!-- 卡片背景 -->
          <view class="card-bg" :style="{ background: test.bgColor }" />

          <!-- 卡片内容 -->
          <view class="card-content">
            <!-- 图标区域 -->
            <view class="card-icon-wrapper">
              <text class="card-icon">
                {{ test.icon }}
              </text>
              <view class="card-icon-bg" />
            </view>

            <!-- 文字内容 -->
            <view class="card-text">
              <text class="card-title">
                {{ test.title }}
              </text>
              <text class="card-subtitle">
                {{ test.subtitle }}
              </text>
            </view>

            <!-- 标签 -->
            <view class="card-tags">
              <text
                v-for="tag in test.tags"
                :key="tag"
                class="card-tag"
                :style="{ color: test.color }"
              >
                {{ tag }}
              </text>
            </view>

            <!-- 统计信息 -->
            <view class="card-stats">
              <view class="stat-item">
                <text class="stat-icon">
                  👥
                </text>
                <text class="stat-text">
                  {{ test.participants }}
                </text>
              </view>
              <view class="stat-item">
                <text class="stat-icon">
                  ⏰
                </text>
                <text class="stat-text">
                  {{ test.time }}
                </text>
              </view>
              <view class="stat-item">
                <text class="stat-icon">
                  📊
                </text>
                <text class="stat-text">
                  {{ test.difficulty }}
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部装饰 -->
    <view class="bottom-decoration">
      <text class="bottom-text">
        ✨ 发现更多精彩测试
      </text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #f7fafc 0%, #edf2f7 100%);
  position: relative;
  overflow: hidden;
}

/* 背景装饰 */
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.circle-1 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  top: -50px;
  right: -50px;
  animation: float 6s ease-in-out infinite;
}

.circle-2 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  top: 30%;
  left: -30px;
  animation: float 8s ease-in-out infinite;
}

.circle-3 {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  bottom: 20%;
  right: -20px;
  animation: float 7s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

/* 导航栏 */
.navbar {
  position: relative;
  z-index: 10;
  padding: 40px 20px 20px;
  text-align: center;
}

.nav-title {
  margin-bottom: 8px;
}

.title-text {
  font-size: 32px;
  font-weight: 700;
  color: #2d3748;
  line-height: 1.2;
}

.title-highlight {
  font-size: 32px;
  font-weight: 700;
  color: #667eea;
  line-height: 1.2;
}

.nav-subtitle {
  opacity: 0.8;
}

.subtitle-text {
  font-size: 14px;
  color: #718096;
  font-weight: 400;
}

/* 分类标签 */
.category-section {
  position: relative;
  z-index: 10;
  margin-bottom: 24px;
  padding-top: 4px;
  padding-bottom: 8px;
}

.category-scroll {
  width: 100%;
}

.category-list {
  display: flex;
  margin-top:5rpx;
  padding: 10px 20px;
  gap: 12px;
  min-height: 60px;
  align-items: center;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  min-width: 70px;
}

.category-item.category-active {
  border-color: var(--category-color);
  // transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.category-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.category-name {
  font-size: 12px;
  color: #4a5568;
  font-weight: 500;
}

.category-item.category-active .category-name {
  color: var(--category-color);
  font-weight: 600;
}

/* 加载状态 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  position: relative;
  z-index: 10;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(102, 126, 234, 0.2);
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 14px;
  color: #718096;
  font-weight: 400;
}

/* 测试卡片区域 */
.test-section {
  position: relative;
  z-index: 10;
  padding: 0 20px 80px;
}

.test-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.test-card {
  position: relative;
  min-height: 200px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.test-card:active {
  transform: scale(0.98);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.card-content {
  position: relative;
  z-index: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-icon {
  font-size: 48px;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-icon-bg {
  position: absolute;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  z-index: 1;
}

.card-text {
  flex: 1;
}

.card-title {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-subtitle {
  display: block;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.card-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.card-tag {
  padding: 3px 8px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.3);
  white-space: nowrap;
}

.card-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-icon {
  font-size: 14px;
}

.stat-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

/* 底部装饰 */
.bottom-decoration {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 20px;
}

.bottom-text {
  font-size: 14px;
  color: #a0aec0;
  font-weight: 400;
}
</style>
