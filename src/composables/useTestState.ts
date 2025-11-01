/**
 * 简单的测试状态管理 composable
 * 替代 Pinia，避免在微信小程序中的兼容性问题
 */
import { ref, computed } from 'vue'

// 全局状态
const currentTest = ref<any>(null)
const currentQuestionIndex = ref(0)
const userAnswers = ref<Record<string, number | number[]>>({})
const isCompleted = ref(false)
const testStartTime = ref<number>(0)

export function useTestState() {
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

  const answeredCount = computed(() => {
    return Object.keys(userAnswers.value).length
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

  // 方法
  const startTest = (test: any) => {
    currentTest.value = test
    currentQuestionIndex.value = 0
    userAnswers.value = {}
    isCompleted.value = false
    testStartTime.value = Date.now()
  }

  const resetTest = () => {
    currentTest.value = null
    currentQuestionIndex.value = 0
    userAnswers.value = {}
    isCompleted.value = false
    testStartTime.value = 0
  }

  const answerQuestion = (answer: number | number[]) => {
    if (!currentQuestion.value)
      return
    userAnswers.value[currentQuestion.value.id] = answer
  }

  const nextQuestion = () => {
    if (canGoNext.value && currentQuestionIndex.value < totalQuestions.value - 1) {
      currentQuestionIndex.value++
    }
  }

  const prevQuestion = () => {
    if (canGoPrev.value) {
      currentQuestionIndex.value--
    }
  }

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < totalQuestions.value) {
      currentQuestionIndex.value = index
    }
  }

  const completeTest = async () => {
    if (!currentTest.value)
      return null

    try {
      // 模拟计算结果
      const result = {
        id: 'tiger',
        testId: 'pdp',
        type: 'tiger',
        title: '老虎型 - 支配型',
        description: '你具有强烈的目标导向和竞争意识，喜欢挑战和冒险。天生的领导者，果断、直接、有野心。',
        traits: [
          '目标导向，追求结果',
          '果断决策，勇于承担',
          '竞争意识强，喜欢挑战',
          '直接坦率，表达清晰',
          '领导能力强，善于激励',
        ],
        suggestions: [
          '学会倾听他人意见，避免过于强势',
          '在决策时多考虑细节和风险',
          '培养耐心，给团队更多时间',
          '关注团队成员的感受',
          '学会授权，不要事事亲力亲为',
        ],
        score: 0,
        color: '#FF6B6B',
        icon: '🐅',
        shareImage: '/static/images/pdp-tiger.jpg',
      }

      currentResult.value = result
      isCompleted.value = true

      return result
    }
    catch (error) {
      console.error('完成测试失败:', error)
      uni.showToast({
        title: '计算结果失败',
        icon: 'error',
      })
      return null
    }
  }

  return {
    // 状态
    currentTest,
    currentQuestionIndex,
    userAnswers,
    isCompleted,
    testStartTime,
    currentResult: ref<any>(null),

    // 计算属性
    currentQuestion,
    totalQuestions,
    progress,
    progressPercent,
    answeredCount,
    canGoNext,
    canGoPrev,

    // 方法
    startTest,
    resetTest,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    completeTest,
  }
}