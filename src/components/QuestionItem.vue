<!--
  题目组件
  用于显示测试题目和选项
-->
<script setup lang="ts">
import type { Question } from '@/types'
import { ref, watch } from 'vue'
import { QuestionType } from '@/types'

// 组件属性定义
interface Props {
  question: Question
  questionIndex: number
  modelValue?: string | number | string[] | number[]
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

// 事件定义
interface Emits {
  (e: 'update:modelValue', value: string | number | string[] | number[]): void
  (e: 'change', value: string | number | string[] | number[]): void
}

// 内部状态
const selectedValue = ref<string | number | null>(null)
const selectedValues = ref<(string | number)[]>([])

// 初始化选中值
function initSelectedValue() {
  if (props.question.type === QuestionType.MULTIPLE) {
    const value = props.modelValue as (string | number)[] || []
    selectedValues.value = Array.isArray(value) ? value : []
  }
  else {
    selectedValue.value = props.modelValue as string | number || null
  }
}

// 监听外部值变化
watch(() => props.modelValue, initSelectedValue, { immediate: true })

// 单选题选择
function selectOption(optionId: string | number) {
  if (props.question.type === QuestionType.MULTIPLE) {
    toggleOption(optionId)
  }
  else {
    selectedValue.value = optionId
    emitValue()
  }
}

// 多选题切换
function toggleOption(optionId: string | number) {
  const index = selectedValues.value.indexOf(optionId)
  if (index > -1) {
    selectedValues.value.splice(index, 1)
  }
  else {
    selectedValues.value.push(optionId)
  }
  emitValue()
}

// 发出值变化事件
function emitValue() {
  let value: string | number | string[] | number[]

  if (props.question.type === QuestionType.MULTIPLE) {
    value = selectedValues.value.map(v => String(v))
  }
  else {
    value = selectedValue.value as string | number || ''
  }

  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <view class="question-item">
    <!-- 题目信息 -->
    <view class="question-header">
      <text class="question-number">
        {{ questionIndex + 1 }}.
      </text>
      <text class="question-title">
        {{ question.title }}
      </text>
    </view>

    <!-- 题目描述 -->
    <text v-if="question.description" class="question-description">
      {{ question.description }}
    </text>

    <!-- 单选题 -->
    <view v-if="question.type === 'single'" class="options-list">
      <view
        v-for="option in question.options"
        :key="option.id"
        class="option-item"
        :class="{ 'option-selected': selectedValue === option.id }"
        @click="selectOption(option.id)"
      >
        <view class="option-indicator">
          <view v-if="selectedValue !== option.id" class="option-dot" />
          <view v-else class="option-checked">
            <text class="check-icon">
              ✓
            </text>
          </view>
        </view>
        <text class="option-text">
          {{ option.text }}
        </text>
      </view>
    </view>

    <!-- 多选题 -->
    <view v-else-if="question.type === 'multiple'" class="options-list">
      <view
        v-for="option in question.options"
        :key="option.id"
        class="option-item"
        :class="{ 'option-selected': selectedValues.includes(option.id) }"
        @click="toggleOption(option.id)"
      >
        <view class="option-indicator">
          <view v-if="!selectedValues.includes(option.id)" class="option-square" />
          <view v-else class="option-checkbox">
            <text class="check-icon">
              ✓
            </text>
          </view>
        </view>
        <text class="option-text">
          {{ option.text }}
        </text>
      </view>
    </view>

    <!-- 评分题 -->
    <view v-else-if="question.type === 'scale'" class="scale-list">
      <view
        v-for="option in question.options"
        :key="option.id"
        class="scale-item"
        :class="{ 'scale-selected': selectedValue === option.id }"
        @click="selectOption(option.id)"
      >
        <text class="scale-text">
          {{ option.text }}
        </text>
        <view class="scale-dots">
          <view
            v-for="i in (option.value || 1)"
            :key="i"
            class="scale-dot"
            :class="{ 'dot-filled': selectedValue === option.id }"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.question-item {
  padding: var(--spacing-lg) 0;
}

.question-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
}

.question-number {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--primary-color);
  margin-right: var(--spacing-sm);
  min-width: 28px;
}

.question-title {
  font-size: var(--text-lg);
  font-weight: 500;
  color: var(--text-color);
  line-height: var(--leading-relaxed);
  flex: 1;
}

.question-description {
  display: block;
  font-size: var(--text-sm);
  color: var(--text-color-secondary);
  margin-bottom: var(--spacing-lg);
  line-height: var(--leading-normal);
  padding-left: 36px;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.option-item {
  display: flex;
  align-items: flex-start;
  padding: var(--spacing-md);
  background-color: var(--bg-color);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-fast) ease;

  &:active {
    transform: scale(0.98);
  }

  &.option-selected {
    background-color: rgba(99, 102, 241, 0.05);
    border-color: var(--primary-color);
  }
}

.option-indicator {
  margin-right: var(--spacing-md);
  margin-top: 2px;
}

.option-dot {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  background-color: white;
  transition: all var(--duration-fast) ease;
}

.option-square {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  background-color: white;
  transition: all var(--duration-fast) ease;
}

.option-checked,
.option-checkbox {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-checkbox {
  border-radius: 4px;
}

.check-icon {
  font-size: var(--text-xs);
  color: white;
  font-weight: bold;
}

.option-text {
  font-size: var(--text-base);
  color: var(--text-color);
  line-height: var(--leading-normal);
  flex: 1;
}

.option-selected .option-text {
  color: var(--primary-color);
  font-weight: 500;
}

.scale-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.scale-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  background-color: var(--bg-color);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-fast) ease;

  &:active {
    transform: scale(0.98);
  }

  &.scale-selected {
    background-color: rgba(99, 102, 241, 0.05);
    border-color: var(--primary-color);
  }
}

.scale-text {
  font-size: var(--text-base);
  color: var(--text-color);
  font-weight: 500;
}

.scale-dots {
  display: flex;
  gap: var(--spacing-xs);
}

.scale-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--border-color);
  transition: all var(--duration-fast) ease;

  &.dot-filled {
    background-color: var(--primary-color);
  }
}

.scale-selected .scale-text {
  color: var(--primary-color);
}

.scale-selected .scale-dot {
  background-color: var(--primary-color);
}
</style>
