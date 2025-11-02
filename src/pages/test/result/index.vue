<!--
  MBTI测试结果页面
  显示详细的性格分析结果
-->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import mbtiTypes from '@/data/mbti-types'

// 页面状态
const loading = ref(true)
const resultData = ref<any>(null)
const showFallbackIcon = ref(false)

// MBTI类型数据
const mbtiType = computed(() => {
  if (!resultData.value?.type)
    return null
  return mbtiTypes[resultData.value.type]
})

// 计算属性
const dimensionScores = computed(() => {
  if (!resultData.value?.scores)
    return []

  return [
    {
      label: '内向(I) vs 外向(E)',
      left: { label: 'I', value: resultData.value.scores.I, color: '#6B8CAF' },
      right: { label: 'E', value: resultData.value.scores.E, color: '#FF6B6B' },
    },
    {
      label: '感觉(S) vs 直觉(N)',
      left: { label: 'S', value: resultData.value.scores.S, color: '#8FBC8F' },
      right: { label: 'N', value: resultData.value.scores.N, color: '#9B59B6' },
    },
    {
      label: '思考(T) vs 情感(F)',
      left: { label: 'T', value: resultData.value.scores.T, color: '#3498DB' },
      right: { label: 'F', value: resultData.value.scores.F, color: '#E91E63' },
    },
    {
      label: '判断(J) vs 感知(P)',
      left: { label: 'J', value: resultData.value.scores.J, color: '#F39C12' },
      right: { label: 'P', value: resultData.value.scores.P, color: '#4CAF50' },
    },
  ]
})

// 页面加载
onMounted(() => {
  // 获取页面参数
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options as any

  console.log('结果页面参数:', options)

  try {
    if (options.type) {
      // 直接从参数获取结果类型
      const scores = options.scores ? JSON.parse(decodeURIComponent(options.scores)) : {}
      resultData.value = {
        type: options.type,
        scores,
      }
      console.log('解析后的结果:', resultData.value)
    }
    else {
      // 模拟结果数据
      resultData.value = {
        type: 'ENFP',
        scores: {
          E: 15,
          I: 8,
          S: 6,
          N: 17,
          T: 9,
          F: 14,
          J: 7,
          P: 16,
        },
      }
      console.log('使用模拟数据:', resultData.value)
    }
  }
  catch (error) {
    console.error('解析参数失败:', error)
    uni.showToast({
      title: '参数解析失败',
      icon: 'error',
    })
    // 使用模拟数据
    resultData.value = {
      type: 'ENFP',
      scores: {
        E: 15,
        I: 8,
        S: 6,
        N: 17,
        T: 9,
        F: 14,
        J: 7,
        P: 16,
      },
    }
  }

  console.log('最终测试结果:', resultData.value)

  // 模拟加载延迟
  setTimeout(() => {
    loading.value = false
  }, 800)
})

// 分享功能
function shareResult() {
  uni.showToast({
    title: '分享功能开发中',
    icon: 'none',
  })
}

// 重新测试
function retakeTest() {
  uni.navigateBack()
}

// 返回首页
function goHome() {
  uni.reLaunch({
    url: '/pages/index',
  })
}

// 图片加载错误处理
function onImageError() {
  console.log('MBTI类型图片加载失败，使用备用图标')
  showFallbackIcon.value = true
}

// 测试函数 - 临时用于验证数据显示
function testNavigation() {
  // 测试不同的MBTI类型
  const testTypes = ['ENFP', 'INTJ', 'ISFJ', 'ESTP', 'INFP']
  const randomType = testTypes[Math.floor(Math.random() * testTypes.length)]

  // 重置备用图标状态
  showFallbackIcon.value = false

  resultData.value = {
    type: randomType,
    scores: {
      E: randomType.includes('E') ? 15 : 8,
      I: randomType.includes('I') ? 15 : 8,
      S: randomType.includes('S') ? 15 : 8,
      N: randomType.includes('N') ? 15 : 8,
      T: randomType.includes('T') ? 15 : 8,
      F: randomType.includes('F') ? 15 : 8,
      J: randomType.includes('J') ? 15 : 8,
      P: randomType.includes('P') ? 15 : 8,
    },
  }

  uni.showToast({
    title: `测试类型: ${randomType}`,
    icon: 'success',
  })
}
</script>

<template>
  <view class="result-container">
    <!-- 背景装饰 -->
    <view class="bg-decoration">
      <view class="bg-circle circle-1" />
      <view class="bg-circle circle-2" />
      <view class="bg-circle circle-3" />
    </view>

    <!-- 顶部导航 -->
    <view class="navbar">
      <view class="nav-back" @tap="goHome">
        <text class="back-icon">←</text>
      </view>
      <view class="nav-title">
        <text class="title-text">测试结果</text>
      </view>
    </view>

    <!-- 加载状态 -->
    <view v-if="loading" class="loading-container">
      <view class="loading-spinner" />
      <text class="loading-text">正在生成结果...</text>
    </view>

    <!-- 结果内容 -->
    <view v-else-if="mbtiType" class="result-content">
      <!-- 结果卡片 -->
      <view class="result-card">
        <!-- 类型图片 -->
        <view class="type-image-container">
          <view class="type-icon">
            <image
              :src="`https://qny.tigeryear.vip/mbti/${mbtiType.type.toLowerCase()}.jpg`"
              class="type-image"
              mode="aspectFit"
              @error="onImageError"
            />
            <!-- 备用图标 -->
            <view v-if="showFallbackIcon" class="fallback-icon">
              {{ mbtiType.icon }}
            </view>
          </view>
        </view>

        <!-- 类型标题 -->
        <!-- <view class="type-title-section">
          <text class="type-name">{{ mbtiType.type }}</text>
          <text class="type-title">{{ mbtiType.title }}</text>
          <text class="type-category">{{ mbtiType.category }}</text>
        </view> -->

        <!-- 类型描述 -->
        <view class="type-description">
          <text class="description-text">{{ mbtiType.description }}</text>
        </view>

        <!-- 格言 -->
        <view class="type-motto">
          <text class="motto-text">「 {{ mbtiType.motto }} 」</text>
        </view>
      </view>

      <!-- 维度得分 -->
      <view class="dimensions-card">
        <view class="card-title">
          <text class="title-text">性格维度分析</text>
        </view>
        <view class="dimensions-list">
          <view
            v-for="(dimension, index) in dimensionScores"
            :key="index"
            class="dimension-item"
          >
            <text class="dimension-label">{{ dimension.label }}</text>
            <view class="dimension-bar">
              <view class="bar-side left-side">
                <text class="bar-label">{{ dimension.left.label }}</text>
                <view
                  class="bar-fill" :style="{
                    width: `${(dimension.left.value / (dimension.left.value + dimension.right.value)) * 100}%`,
                    backgroundColor: dimension.left.color,
                  }"
                />
                <text class="bar-value">{{ dimension.left.value }}</text>
              </view>
              <view class="bar-side right-side">
                <view
                  class="bar-fill" :style="{
                    width: `${(dimension.right.value / (dimension.left.value + dimension.right.value)) * 100}%`,
                    backgroundColor: dimension.right.color,
                  }"
                />
                <text class="bar-value">{{ dimension.right.value }}</text>
                <text class="bar-label">{{ dimension.right.label }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 性格特征 -->
      <view class="traits-card">
        <view class="card-title">
          <text class="title-text">性格特征</text>
        </view>
        <view class="traits-grid">
          <view
            v-for="(trait, index) in mbtiType.traits"
            :key="index"
            class="trait-item"
          >
            <text class="trait-text">{{ trait }}</text>
          </view>
        </view>
      </view>

      <!-- 优势与劣势 -->
      <view class="strengths-card">
        <view class="card-title">
          <text class="title-text">优势</text>
        </view>
        <view class="strengths-list">
          <view
            v-for="(strength, index) in mbtiType.strengths"
            :key="index"
            class="strength-item"
          >
            <view class="strength-icon">✓</view>
            <text class="strength-text">{{ strength }}</text>
          </view>
        </view>
      </view>

      <view class="weaknesses-card">
        <view class="card-title">
          <text class="title-text">待提升方面</text>
        </view>
        <view class="weaknesses-list">
          <view
            v-for="(weakness, index) in mbtiType.weaknesses"
            :key="index"
            class="weakness-item"
          >
            <view class="weakness-icon">!</view>
            <text class="weakness-text">{{ weakness }}</text>
          </view>
        </view>
      </view>

      <!-- 职业建议 -->
      <view class="careers-card">
        <view class="card-title">
          <text class="title-text">适合的职业方向</text>
        </view>
        <view class="careers-list">
          <view
            v-for="(career, index) in mbtiType.careers"
            :key="index"
            class="career-item"
          >
            <text class="career-text">{{ career }}</text>
          </view>
        </view>
      </view>

      <!-- 感情关系 -->
      <view class="relationships-card">
        <view class="card-title">
          <text class="title-text">感情关系</text>
        </view>
        <view class="relationships-content">
          <text class="relationships-text">{{ mbtiType.relationships }}</text>
        </view>
      </view>

      <!-- 操作按钮 -->
      <view class="action-buttons">
        <view class="action-btn secondary-btn" @tap="retakeTest">
          <text class="btn-text">重新测试</text>
        </view>
        <view class="action-btn primary-btn" @tap="shareResult">
          <text class="btn-text">分享结果</text>
        </view>
        <!-- 临时测试按钮 -->
        <view class="action-btn test-btn" @tap="testNavigation">
          <text class="btn-text">测试数据</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.result-container {
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
  bottom: 200px;
  left: -30px;
  animation: float 8s ease-in-out infinite;
}

.circle-3 {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  bottom: -30px;
  right: 100px;
  animation: float 10s ease-in-out infinite;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 20px 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.nav-back, .nav-share {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-back:active, .nav-share:active {
  transform: scale(0.95);
}

.back-icon, .share-icon {
  font-size: 18px;
  font-weight: 600;
  color: #4a5568;
}

.nav-title {
  flex: 1;
  text-align: center;
  margin: 0 16px;
}

.title-text {
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
}

/* 加载状态 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
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

/* 结果内容 */
.result-content {
  position: relative;
  z-index: 10;
  padding: 0 20px 40px;
}

/* 结果卡片 */
.result-card {
  // background: white;
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 12px 24px;
  margin-bottom: 24px;
  text-align: center;
}

.type-image-container {
  display: flex;
  justify-content: center;
  // margin-bottom: 24px;
}

.type-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // background: #f8fafc;
  // border-radius: 20px;
  overflow: hidden;
  // border: 3px solid #e2e8f0;
  // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.type-image {
  width: 100%;
  height: 250px;
  border-radius: 17px;
}

.fallback-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  background: #f8fafc;
  border-radius: 17px;
}

.type-title-section {
  text-align: center;
  margin-bottom: 20px;
}

.type-name {
  font-size: 32px;
  font-weight: 700;
  color: #2d3748;
  display: block;
  margin-bottom: 4px;
}

.type-title {
  font-size: 20px;
  font-weight: 600;
  color: #4a5568;
  display: block;
  margin-bottom: 2px;
}

.type-category {
  font-size: 14px;
  color: #718096;
  display: block;
}

.type-description {
  margin-bottom: 20px;
}

.description-text {
  font-size: 16px;
  line-height: 1.6;
  color: #4a5568;
}

.type-motto {
  padding: 16px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 12px;
}

.motto-text {
  font-size: 14px;
  font-style: italic;
  color: #667eea;
  font-weight: 500;
}

/* 通用卡片样式 */
.dimensions-card,
.traits-card,
.strengths-card,
.weaknesses-card,
.careers-card,
.relationships-card {
  background: white;
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
}

.card-title {
  margin-bottom: 20px;
}

.card-title .title-text {
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
}

/* 维度得分 */
.dimensions-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dimension-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dimension-label {
  font-size: 14px;
  color: #718096;
  font-weight: 500;
}

.dimension-bar {
  display: flex;
  height: 24px;
  border-radius: 12px;
  overflow: hidden;
  background: #f7fafc;
}

.bar-side {
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
}

.bar-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 12px;
  transition: width 0.8s ease;
}

.bar-label {
  font-size: 12px;
  font-weight: 600;
  color: #4a5568;
  padding: 0 8px;
  z-index: 1;
}

.bar-value {
  font-size: 12px;
  font-weight: 600;
  color: white;
  padding: 0 8px;
  z-index: 1;
}

.left-side .bar-label {
  margin-left: 4px;
}

.right-side .bar-label {
  margin-right: 4px;
}

.right-side .bar-fill {
  right: 0;
  left: auto;
}

.right-side {
  justify-content: flex-end;
}

/* 性格特征 */
.traits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.trait-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.trait-text {
  font-size: 14px;
  color: #4a5568;
  font-weight: 500;
}

/* 优势列表 */
.strengths-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.strength-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.strength-icon {
  width: 20px;
  height: 20px;
  background: #48bb78;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.strength-text {
  font-size: 14px;
  color: #4a5568;
  line-height: 1.4;
}

/* 劣势列表 */
.weaknesses-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.weakness-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.weakness-icon {
  width: 20px;
  height: 20px;
  background: #ed8936;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.weakness-text {
  font-size: 14px;
  color: #4a5568;
  line-height: 1.4;
}

/* 职业列表 */
.careers-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.career-item {
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 20px;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.career-text {
  font-size: 14px;
  color: #667eea;
  font-weight: 500;
}

/* 感情关系 */
.relationships-content {
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.relationships-text {
  font-size: 14px;
  color: #4a5568;
  line-height: 1.6;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 32px;
}

.action-btn {
  flex: 1;
  min-width: 120px;
  padding: 16px 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.secondary-btn {
  background: white;
  border: 2px solid #e2e8f0;
}

.secondary-btn:active {
  transform: scale(0.95);
  background: #f7fafc;
}

.primary-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: 2px solid transparent;
}

.primary-btn:active {
  transform: scale(0.95);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-text {
  font-size: 16px;
  font-weight: 600;
}

.secondary-btn .btn-text {
  color: #4a5568;
}

.primary-btn .btn-text {
  color: white;
}

.test-btn {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border: 2px solid transparent;
}

.test-btn:active {
  transform: scale(0.95);
  box-shadow: 0 4px 12px rgba(240, 147, 251, 0.3);
}

.test-btn .btn-text {
  color: white;
}
</style>
