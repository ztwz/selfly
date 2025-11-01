/**
 * 项目类型定义
 */

// 测试类型枚举
export enum TestCategory {
  PERSONALITY = 'personality', // 性格测试
  INTELLIGENCE = 'intelligence', // 智力测试
  PSYCHOLOGY = 'psychology', // 心理测试
  INTEREST = 'interest', // 兴趣测试
}

// 测试难度枚举
export enum TestDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

// 题目类型枚举
export enum QuestionType {
  SINGLE = 'single', // 单选题
  MULTIPLE = 'multiple', // 多选题
  SCALE = 'scale', // 评分题
}

// 测试接口
export interface Test {
  id: string
  title: string
  description: string
  category: TestCategory
  coverImage?: string
  duration: number // 预计完成时间(分钟)
  difficulty: TestDifficulty
  questionCount: number
  tags: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
  questions?: Question[] // 题目列表
  results?: TestResult[] // 结果列表
  playCount?: number // 播放次数
}

// 题目选项接口
export interface Option {
  id: string
  text: string
  value: number
  type?: string // 选项类型标识
}

// 题目接口
export interface Question {
  id: string
  testId: string
  type: QuestionType
  title: string
  description?: string
  options: Option[]
  required: boolean
  sortOrder: number
}

// 测试结果接口
export interface TestResult {
  id: string
  testId: string
  type: string // 结果类型标识
  title: string
  description: string
  traits: string[]
  suggestions: string[]
  score: number
  color?: string // 主题色
  icon?: string // 图标
  shareImage?: string // 分享图片
}

// 用户测试记录接口
export interface UserTestRecord {
  id: string
  userId: string
  testId: string
  resultType: string
  answers: Record<string, number | number[]>
  completedAt: string
  shareCount?: number
}

// 用户接口
export interface User {
  id: string
  openid: string
  nickname?: string
  avatarUrl?: string
  gender?: 0 | 1 | 2 // 0=未知, 1=男, 2=女
  age?: number
  testCount?: number
  shareCount?: number
  createdAt: string
}

// API响应接口
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  code?: number
}

// 分页接口
export interface PaginationParams {
  page: number
  pageSize: number
}

// 分页响应接口
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
