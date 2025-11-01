<!--
  进度条组件
  用于显示测试答题进度
-->
<script setup lang="ts">
import { computed } from 'vue'

// 组件属性定义
interface Props {
  current: number // 当前进度
  total: number // 总数
  type?: 'default' | 'success' | 'warning' | 'error' // 进度条类型
  size?: 'small' | 'medium' | 'large' // 尺寸
  showInfo?: boolean // 是否显示进度信息
  showSteps?: boolean // 是否显示步骤指示器
  animated?: boolean // 是否显示动画
  steps?: Array<{ title?: string }> // 步骤信息
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'medium',
  showInfo: true,
  showSteps: false,
  animated: true,
  steps: () => [],
})

// 计算进度百分比
const percent = computed(() => {
  return Math.min(Math.round((props.current / props.total) * 100), 100)
})

// 进度百分比文本
const percentText = computed(() => {
  return `${percent.value}%`
})

// 进度条样式类
const progressClass = computed(() => {
  return [
    `progress-${props.type}`,
    `progress-${props.size}`,
    { 'progress-animated': props.animated },
  ]
})
</script>

<template>
  <view class="progress-bar">
    <!-- 进度信息 -->
    <view v-if="showInfo" class="progress-info">
      <text class="progress-text">
        {{ current }} / {{ total }}
      </text>
      <text class="progress-percent">
        {{ percentText }}
      </text>
    </view>

    <!-- 进度条 -->
    <view class="progress-track">
      <view
        class="progress-fill"
        :style="{ width: `${percent}%` }"
        :class="progressClass"
      >
        <!-- 动画效果 -->
        <view v-if="animated" class="progress-shine" />
      </view>
    </view>

    <!-- 步骤指示器 -->
    <view v-if="showSteps" class="progress-steps">
      <view
        v-for="(step, index) in steps"
        :key="index"
        class="step-item"
        :class="{
          'step-active': index + 1 <= current,
          'step-completed': index + 1 < current,
          'step-current': index + 1 === current,
        }"
      >
        <view class="step-dot">
          <text v-if="index + 1 < current" class="step-check">
            ✓
          </text>
          <text v-else class="step-number">
            {{ index + 1 }}
          </text>
        </view>
        <text v-if="step.title" class="step-title">
          {{ step.title }}
        </text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.progress-bar {
  width: 100%;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.progress-text {
  font-size: var(--text-sm);
  color: var(--text-color-secondary);
  font-weight: 500;
}

.progress-percent {
  font-size: var(--text-sm);
  color: var(--primary-color);
  font-weight: 600;
}

.progress-track {
  width: 100%;
  height: 8px;
  background-color: var(--bg-color-secondary);
  border-radius: var(--radius-full);
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: var(--radius-full);
  transition: width var(--duration-normal) ease;
  position: relative;
  overflow: hidden;

  &.progress-success {
    background-color: var(--success-color);
  }

  &.progress-warning {
    background-color: var(--warning-color);
  }

  &.progress-error {
    background-color: var(--error-color);
  }

  &.progress-small {
    height: 4px;
  }

  &.progress-large {
    height: 12px;
  }

  &.progress-animated {
    .progress-shine {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
      );
      animation: shine 2s infinite;
    }
  }
}

@keyframes shine {
  0% {
    left: -100%;
  }
  100% {
    left: 200%;
  }
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-md);
  position: relative;
}

.progress-steps::before {
  content: '';
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  height: 2px;
  background-color: var(--bg-color-secondary);
  z-index: 1;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  position: relative;
  z-index: 2;
}

.step-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--bg-color-secondary);
  border: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--duration-normal) ease;
}

.step-active {
  .step-dot {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
  }
}

.step-completed {
  .step-dot {
    background-color: var(--success-color);
    border-color: var(--success-color);
  }
}

.step-current {
  .step-dot {
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  }
}

.step-number {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--text-color-tertiary);
}

.step-active .step-number,
.step-current .step-number {
  color: white;
}

.step-check {
  font-size: var(--text-xs);
  color: white;
  font-weight: bold;
}

.step-title {
  font-size: var(--text-xs);
  color: var(--text-color-secondary);
  text-align: center;
  max-width: 60px;
}

.step-active .step-title,
.step-current .step-title {
  color: var(--text-color);
  font-weight: 500;
}
</style>
