<!--
  首页 - 测试列表和推荐
-->
<script setup lang="ts">
import type { Test } from '@/types'
import { computed, onMounted, ref } from 'vue'
import TestCard from '@/components/TestCard.vue'
import { pdpQuestions, pdpResults, pdpTest } from '@/data/pdp-test'

// 页面状态
const loading = ref(false)
const testList = ref<Test[]>([])
const categories = ref([
  { id: 'all', name: '全部', icon: '🎯' },
  { id: 'personality', name: '性格测试', icon: '🧠' },
  { id: 'intelligence', name: '智力测试', icon: '💡' },
  { id: 'psychology', name: '心理测试', icon: '🎭' },
  { id: 'interest', name: '兴趣测试', icon: '❤️' },
])
const currentCategory = ref('all')

// 模拟获取测试数据
const fetchTestList = async () => {
  try {
    loading.value = true

    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 目前只有PDP测试，后续会添加更多测试
    const mockTests: Test[] = [
      {
        ...pdpTest,
        playCount: 15234, // 模拟播放次数
        questions: pdpQuestions, // 添加题目数据
        results: pdpResults, // 添加结果数据
      },
    ]

    testList.value = mockTests
  }
  catch (error) {
    console.error('获取测试列表失败:', error)
    uni.showToast({
      title: '加载失败',
      icon: 'error',
    })
  }
  finally {
    loading.value = false
  }
}

// 筛选测试
const filteredTests = computed(() => {
  if (currentCategory.value === 'all') {
    return testList.value
  }
  return testList.value.filter(test => test.category === currentCategory.value)
})

// 处理测试卡片点击
const handleTestClick = (test: Test) => {
  // 跳转到测试详情页
  uni.navigateTo({
    url: `/pages/test/detail?id=${test.id}`,
  })
}

// 处理分类切换
const handleCategoryChange = (categoryId: string) => {
  currentCategory.value = categoryId
}

// 页面加载时获取数据
onMounted(() => {
  fetchTestList()
})
</script>

<template>
  <view class="home-page">
    <!-- 顶部标题区域 -->
    <view class="home-header">
      <text class="home-title">
        发现真实的自己
      </text>
      <text class="home-subtitle">
        专业的心理测试，助你深入了解内心世界
      </text>
    </view>

    <!-- 分类导航 -->
    <view class="category-nav">
      <scroll-view
        class="category-scroll"
        scroll-x
        :show-scrollbar="false"
      >
        <view class="category-list">
          <view
            v-for="category in categories"
            :key="category.id"
            class="category-item"
            :class="{ 'category-active': currentCategory === category.id }"
            @click="handleCategoryChange(category.id)"
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

    <!-- 测试列表 -->
    <view class="test-section">
      <!-- 加载状态 -->
      <view v-if="loading" class="loading-container">
        <view class="loading-spinner" />
        <text class="loading-text">
          正在加载测试...
        </text>
      </view>

      <!-- 测试卡片列表 -->
      <view v-else-if="filteredTests.length > 0" class="test-list">
        <TestCard
          v-for="test in filteredTests"
          :key="test.id"
          :test="test"
          @click="handleTestClick"
        />
      </view>

      <!-- 空状态 -->
      <view v-else class="empty-state">
        <text class="empty-icon">
          📋
        </text>
        <text class="empty-title">
          暂无测试
        </text>
        <text class="empty-description">
          该分类下还没有测试，请选择其他分类
        </text>
      </view>
    </view>

    <!-- 底部间距 -->
    <view class="bottom-spacer" />
  </view>
</template>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  background-color: var(--bg-color);
}

.home-header {
  padding: var(--spacing-xl) var(--spacing-md) var(--spacing-lg);
  text-align: center;
}

.home-title {
  display: block;
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: var(--spacing-sm);
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.home-subtitle {
  display: block;
  font-size: var(--text-base);
  color: var(--text-color-secondary);
  line-height: var(--leading-normal);
}

.category-nav {
  margin-bottom: var(--spacing-lg);
}

.category-scroll {
  white-space: nowrap;
}

.category-list {
  display: flex;
  gap: var(--spacing-md);
  padding: 0 var(--spacing-md);
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: all var(--duration-fast) ease;
  cursor: pointer;
  white-space: nowrap;
  min-width: 80px;

  &:active {
    transform: scale(0.95);
  }

  &.category-active {
    background-color: var(--primary-color);
    box-shadow: var(--shadow-md);

    .category-icon,
    .category-name {
      color: white;
    }
  }
}

.category-icon {
  font-size: 24px;
}

.category-name {
  font-size: var(--text-xs);
  color: var(--text-color-secondary);
  font-weight: 500;
}

.test-section {
  padding: 0 var(--spacing-md);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl) 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-md);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: var(--text-sm);
  color: var(--text-color-secondary);
}

.test-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl) 0;
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: var(--spacing-md);
  opacity: 0.5;
}

.empty-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: var(--spacing-xs);
}

.empty-description {
  font-size: var(--text-sm);
  color: var(--text-color-secondary);
  line-height: var(--leading-normal);
}

.bottom-spacer {
  height: var(--spacing-xl);
}
</style>
