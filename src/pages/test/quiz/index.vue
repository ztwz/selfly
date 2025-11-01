<!--
  测试答题页面
  显示测试题目，支持上一题/下一题导航
-->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

// 页面状态
const loading = ref(true)
const selectedOption = ref<number | null>(null)
const testId = ref<string>('')

// 当前题目索引
const currentQuestionIndex = ref(0)

// 模拟题目数据
const mockQuestions = [
  {
    id: 'q1',
    testId: 'pdp',
    type: 'single',
    title: '在社交场合中，你通常是：',
    options: [
      { id: 'q1_opt1', text: '主动与人交谈，容易成为焦点', value: 5 },
      { id: 'q1_opt2', text: '比较内向，喜欢观察', value: 1 },
      { id: 'q1_opt3', text: '看情况而定，会适应环境', value: 3 },
    ],
    required: true,
    sortOrder: 1,
  },
  {
    id: 'q2',
    testId: 'pdp',
    type: 'single',
    title: '面对工作中的挑战，你倾向于：',
    options: [
      { id: 'q2_opt1', text: '直接面对，快速解决', value: 5 },
      { id: 'q2_opt2', text: '仔细分析，制定计划', value: 2 },
      { id: 'q2_opt3', text: '寻求团队合作', value: 4 },
      { id: 'q2_opt4', text: '避免冲突，寻求和谐', value: 1 },
    ],
    required: true,
    sortOrder: 2,
  },
  {
    id: 'q3',
    testId: 'pdp',
    type: 'single',
    title: '在做决定时，你更依赖：',
    options: [
      { id: 'q3_opt1', text: '直觉和感觉', value: 4 },
      { id: 'q3_opt2', text: '逻辑分析', value: 2 },
      { id: 'q3_opt3', text: '他人意见', value: 3 },
      { id: 'q3_opt4', text: '过往经验', value: 1 },
    ],
    required: true,
    sortOrder: 3,
  },
]

// 用户答案
const userAnswers = ref<Record<string, number>>({})

// 计算属性
const currentQuestion = computed(() => {
  return mockQuestions[currentQuestionIndex.value] || null
})

const totalQuestions = computed(() => {
  return mockQuestions.length
})

const progress = computed(() => {
  return Math.min(currentQuestionIndex.value + 1, totalQuestions.value)
})

const progressPercent = computed(() => {
  if (totalQuestions.value === 0)
    return 0
  return Math.round((progress.value / totalQuestions.value) * 100)
})

const canGoNext = computed(() => {
  if (!currentQuestion.value)
    return false
  const answer = userAnswers.value[currentQuestion.value.id]
  return answer !== undefined && answer !== null
})

const canGoPrev = computed(() => {
  return currentQuestionIndex.value > 0
})

// 页面加载
onMounted(() => {
  // 获取页面参数
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options as any

  console.log('页面参数:', options)
  console.log('题目数据:', mockQuestions)

  if (options.testId) {
    testId.value = options.testId
    console.log('测试ID:', testId.value)
  }

  // 模拟加载测试数据
  setTimeout(() => {
    loading.value = false
    console.log('加载完成，loading:', loading.value)
    console.log('当前题目:', currentQuestion.value)
    console.log('总题目数:', totalQuestions.value)
  }, 500) // 缩短加载时间
})

// 选择答案
function selectOption(optionIndex: number) {
  selectedOption.value = optionIndex
  // 保存答案
  if (currentQuestion.value) {
    userAnswers.value[currentQuestion.value.id] = optionIndex
    console.log('保存答案:', currentQuestion.value.id, optionIndex)
  }
}

// 上一题
function prevQuestion() {
  if (canGoPrev.value) {
    currentQuestionIndex.value--
    // 恢复之前的选择
    if (currentQuestion.value) {
      const savedAnswer = userAnswers.value[currentQuestion.value.id]
      selectedOption.value = savedAnswer !== undefined ? savedAnswer : null
    }
  }
}

// 下一题
function nextQuestion() {
  if (canGoNext.value && currentQuestionIndex.value < totalQuestions.value - 1) {
    currentQuestionIndex.value++
    selectedOption.value = null
  }
}

// 完成测试
function completeTest() {
  console.log('测试完成，答案:', userAnswers.value)
  uni.showToast({
    title: '测试完成',
    icon: 'success',
  })
}
</script>

<template>
  <view class="quiz-container">
    <!-- 背景装饰 -->
    <view class="bg-decoration">
      <view class="bg-circle circle-1" />
      <view class="bg-circle circle-2" />
    </view>

    <!-- 顶部导航 -->
    <view class="navbar">
      <view class="nav-back" @tap="() => uni.navigateBack()">
        <text class="back-icon">←</text>
      </view>
      <view class="nav-title">
        <text class="title-text">PDP动物性格测试</text>
      </view>
      <view class="nav-placeholder" />
    </view>

    <!-- 进度条 -->
    <view class="progress-section">
      <view class="progress-info">
        <text class="progress-text">
          第 {{ progress }} 题 / 共 {{ totalQuestions }} 题
        </text>
        <text class="progress-percent">
          {{ progressPercent }}%
        </text>
      </view>
      <view class="progress-bar">
        <view
          class="progress-fill"
          :style="{ width: `${progressPercent}%` }"
        />
      </view>
    </view>

    <!-- 加载状态 -->
    <view v-if="loading" class="loading-container">
      <view class="loading-spinner" />
      <text class="loading-text">
        正在加载题目...
      </text>
    </view>

    <!-- 题目内容 -->
    <view v-else-if="currentQuestion" class="question-section">
      <view class="question-card">
        <!-- 题目编号 -->
        <view class="question-number">
          <text class="number-text">
            {{ progress }}
          </text>
        </view>

        <!-- 题目内容 -->
        <view class="question-content">
          <text class="question-text">
            {{ currentQuestion.title }}
          </text>
        </view>

        <!-- 选项列表 -->
        <view class="options-list">
          <view
            v-for="(option, index) in currentQuestion.options"
            :key="option.id"
            class="option-item"
            :class="{ 'option-selected': selectedOption === index }"
            @tap="selectOption(index)"
          >
            <view class="option-indicator">
              <view class="indicator-dot" />
            </view>
            <text class="option-text">
              {{ option.text }}
            </text>
          </view>
        </view>

        <!-- 集成导航区域 -->
        <view class="card-navigation">
          <!-- 上一题按钮 -->
          <view
            class="card-nav-btn prev-btn"
            :class="{ 'nav-disabled': !canGoPrev }"
            @tap="prevQuestion"
          >
            <text class="nav-icon">←</text>
          </view>

          <!-- 进度指示器 -->
          <!-- <view class="progress-indicator">
            <text class="progress-text">{{ progress }}/{{ totalQuestions }}</text>
          </view> -->

          <!-- 下一题/完成按钮 -->
          <view
            class="card-nav-btn next-btn"
            :class="{ 'nav-disabled': !canGoNext }"
            @tap="progress === totalQuestions ? completeTest() : nextQuestion"
          >
            <text class="nav-icon">{{ progress === totalQuestions ? '✓' : '→' }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.quiz-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #f7fafc 0%, #edf2f7 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
  bottom: -30px;
  left: -30px;
  animation: float 8s ease-in-out infinite;
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
}

.nav-back {
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

.nav-back:active {
  transform: scale(0.95);
}

.back-icon {
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

.nav-placeholder {
  width: 40px;
}

/* 进度条 */
.progress-section {
  position: relative;
  z-index: 10;
  padding: 0 20px 24px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.progress-text {
  font-size: 14px;
  color: #718096;
  font-weight: 500;
}

.progress-percent {
  font-size: 14px;
  color: #667eea;
  font-weight: 600;
}

.progress-bar {
  height: 6px;
  background: rgba(102, 126, 234, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
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
  flex: 1;
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

/* 题目区域 */
.question-section {
  position: relative;
  z-index: 10;
  padding: 0 20px 40px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.question-card {
  background: white;
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 32px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.question-number {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.number-text {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
}

.question-content {
  text-align: center;
  margin-bottom: 32px;
}

.question-text {
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  line-height: 1.6;
}

/* 选项列表 */
.options-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

/* 集成导航区域 */
.card-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.card-nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
  justify-content: center;
}

.prev-btn {
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.prev-btn:not(.nav-disabled):active {
  transform: scale(0.95);
  background: rgba(102, 126, 234, 0.15);
}

.next-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: 1px solid transparent;
}

.next-btn:not(.nav-disabled):active {
  transform: scale(0.95);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.nav-icon {
  font-size: 16px;
  font-weight: 600;
}

.prev-btn .nav-icon {
  color: #667eea;
}

.next-btn .nav-icon {
  color: white;
}

.nav-text {
  font-size: 14px;
  font-weight: 500;
}

.prev-btn .nav-text {
  color: #667eea;
}

.next-btn .nav-text {
  color: white;
}

.nav-disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.nav-disabled:active {
  transform: none;
}

.progress-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 20px;
}

.progress-text {
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
}

.option-item {
  display: flex;
  align-items: center;
  padding: 20px 16px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 16px;
}

.option-item:active {
  transform: scale(0.98);
}

.option-item.option-selected {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-color: #667eea;
}

.option-indicator {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.indicator-dot {
  width: 12px;
  height: 12px;
  background: #cbd5e0;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.option-item.option-selected .indicator-dot {
  background: #667eea;
  transform: scale(1.2);
}

.option-text {
  font-size: 16px;
  color: #4a5568;
  font-weight: 500;
  line-height: 1.5;
  flex: 1;
}

.option-item.option-selected .option-text {
  color: #2d3748;
  font-weight: 600;
}
</style>
