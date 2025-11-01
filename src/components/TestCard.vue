<!--
  测试卡片组件
  用于在首页和测试列表页展示测试信息
-->
<script setup lang="ts">
import type { Test } from '@/types'
import { TestCategory, TestDifficulty } from '@/types'

// 组件属性定义
interface Props {
  test: Test
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

// 事件定义
interface Emits {
  (e: 'click', test: Test): void
}

// 处理点击事件
function handleClick() {
  emit('click', props.test)
}

// 获取分类图标
function getCategoryIcon(category: TestCategory): string {
  const icons = {
    [TestCategory.PERSONALITY]: '🧠',
    [TestCategory.INTELLIGENCE]: '💡',
    [TestCategory.PSYCHOLOGY]: '🎭',
    [TestCategory.INTEREST]: '🎯',
  }
  return icons[category] || '📋'
}

// 获取难度文本
function getDifficultyText(difficulty: TestDifficulty): string {
  const texts = {
    [TestDifficulty.EASY]: '简单',
    [TestDifficulty.MEDIUM]: '中等',
    [TestDifficulty.HARD]: '困难',
  }
  return texts[difficulty] || '未知'
}

// 格式化播放次数
function formatCount(count: number): string {
  if (count >= 10000) {
    return `${Math.floor(count / 1000) / 10}w`
  }
  else if (count >= 1000) {
    return `${Math.floor(count / 100) / 10}k`
  }
  return count.toString()
}
</script>

<template>
  <view
    class="test-card card"
    @click="handleClick"
  >
    <!-- 测试封面图 -->
    <view class="test-card__cover">
      <image
        v-if="test.coverImage"
        :src="test.coverImage"
        class="test-card__image"
        mode="aspectFill"
      />
      <view v-else class="test-card__placeholder">
        <text class="test-card__icon">
          {{ getCategoryIcon(test.category) }}
        </text>
      </view>

      <!-- 难度标签 -->
      <view class="test-card__difficulty" :class="`difficulty-${test.difficulty}`">
        <text class="difficulty-text">
          {{ getDifficultyText(test.difficulty) }}
        </text>
      </view>
    </view>

    <!-- 测试信息 -->
    <view class="test-card__content">
      <!-- 测试标题 -->
      <text class="test-card__title">
        {{ test.title }}
      </text>

      <!-- 测试描述 -->
      <text class="test-card__description">
        {{ test.description }}
      </text>

      <!-- 测试信息 -->
      <view class="test-card__meta">
        <view class="meta-item">
          <text class="meta-icon">
            📝
          </text>
          <text class="meta-text">
            {{ test.questionCount }}题
          </text>
        </view>
        <view class="meta-item">
          <text class="meta-icon">
            ⏱️
          </text>
          <text class="meta-text">
            {{ test.duration }}分钟
          </text>
        </view>
        <view class="meta-item">
          <text class="meta-icon">
            🔥
          </text>
          <text class="meta-text">
            {{ formatCount(test.playCount || 0) }}
          </text>
        </view>
      </view>

      <!-- 标签 -->
      <view v-if="test.tags && test.tags.length > 0" class="test-card__tags">
        <text
          v-for="tag in test.tags.slice(0, 3)"
          :key="tag"
          class="tag"
        >
          {{ tag }}
        </text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.test-card {
  overflow: hidden;
  margin-bottom: var(--spacing-md);
  transition: all var(--duration-normal) ease;

  &:active {
    transform: scale(0.98);
  }
}

.test-card__cover {
  position: relative;
  width: 100%;
  height: 160px;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  overflow: hidden;
}

.test-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.test-card__placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  display: flex;
  align-items: center;
  justify-content: center;
}

.test-card__icon {
  font-size: 48px;
  color: white;
}

.test-card__difficulty {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 500;

  &.difficulty-easy {
    background-color: rgba(16, 185, 129, 0.9);
    color: white;
  }

  &.difficulty-medium {
    background-color: rgba(245, 158, 11, 0.9);
    color: white;
  }

  &.difficulty-hard {
    background-color: rgba(239, 68, 68, 0.9);
    color: white;
  }
}

.test-card__content {
  padding: var(--spacing-md);
}

.test-card__title {
  display: block;
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: var(--spacing-xs);
  line-height: var(--leading-tight);
}

.test-card__description {
  display: block;
  font-size: var(--text-sm);
  color: var(--text-color-secondary);
  margin-bottom: var(--spacing-md);
  line-height: var(--leading-normal);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.test-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.meta-icon {
  font-size: var(--text-sm);
}

.meta-text {
  font-size: var(--text-xs);
  color: var(--text-color-tertiary);
}

.test-card__tags {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.tag {
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--bg-color-secondary);
  color: var(--text-color-secondary);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
}
</style>
