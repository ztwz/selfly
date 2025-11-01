/**
 * PDP动物性格测试数据
 * PDP (Professional Dyna-Metric Programs) 动物性格测试
 * 将人分为5种动物类型：老虎、孔雀、考拉、猫头鹰、变色龙
 */
import type { Question, Test, TestResult } from '@/types'
import { QuestionType, TestCategory, TestDifficulty } from '@/types'

// PDP测试题目数据
const pdpQuestions: Question[] = [
  {
    id: 'q1',
    testId: 'pdp',
    type: QuestionType.SINGLE,
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
    type: QuestionType.SINGLE,
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
    type: QuestionType.SINGLE,
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
  {
    id: 'q4',
    testId: 'pdp',
    type: QuestionType.SINGLE,
    title: '你的工作风格是：',
    options: [
      { id: 'q4_opt1', text: '快速高效，注重结果', value: 5 },
      { id: 'q4_opt2', text: '细致认真，追求完美', value: 2 },
      { id: 'q4_opt3', text: '创新多变，喜欢新鲜', value: 3 },
      { id: 'q4_opt4', text: '稳定持续，有条理', value: 1 },
    ],
    required: true,
    sortOrder: 4,
  },
  {
    id: 'q5',
    testId: 'pdp',
    type: QuestionType.SINGLE,
    title: '在团队中，你通常扮演的角色是：',
    options: [
      { id: 'q5_opt1', text: '领导者，指挥方向', value: 5 },
      { id: 'q5_opt2', text: '协调者，维护和谐', value: 1 },
      { id: 'q5_opt3', text: '创意者，提供新想法', value: 4 },
      { id: 'q5_opt4', text: '执行者，完成任务', value: 2 },
    ],
    required: true,
    sortOrder: 5,
  },
  {
    id: 'q6',
    testId: 'pdp',
    type: QuestionType.SINGLE,
    title: '面对变化时，你的反应是：',
    options: [
      { id: 'q6_opt1', text: '兴奋，喜欢新鲜感', value: 4 },
      { id: 'q6_opt2', text: '谨慎，需要时间适应', value: 2 },
      { id: 'q6_opt3', text: '灵活，快速调整', value: 3 },
      { id: 'q6_opt4', text: '抗拒，喜欢稳定', value: 1 },
    ],
    required: true,
    sortOrder: 6,
  },
  {
    id: 'q7',
    testId: 'pdp',
    type: QuestionType.SINGLE,
    title: '你的沟通方式偏向于：',
    options: [
      { id: 'q7_opt1', text: '直接坦率，表达清晰', value: 5 },
      { id: 'q7_opt2', text: '委婉含蓄，顾及他人感受', value: 1 },
      { id: 'q7_opt3', text: '生动有趣，富有表现力', value: 4 },
      { id: 'q7_opt4', text: '准确详细，逻辑清晰', value: 2 },
    ],
    required: true,
    sortOrder: 7,
  },
  {
    id: 'q8',
    testId: 'pdp',
    type: QuestionType.SINGLE,
    title: '处理冲突的方式是：',
    options: [
      { id: 'q8_opt1', text: '直接面对，快速解决', value: 5 },
      { id: 'q8_opt2', text: '避免冲突，寻求妥协', value: 1 },
      { id: 'q8_opt3', text: '理性分析，寻找最佳方案', value: 2 },
      { id: 'q8_opt4', text: '灵活变通，寻找共赢', value: 3 },
    ],
    required: true,
    sortOrder: 8,
  },
  {
    id: 'q9',
    testId: 'pdp',
    type: QuestionType.SINGLE,
    title: '你的时间管理特点是：',
    options: [
      { id: 'q9_opt1', text: '高效利用，争分夺秒', value: 5 },
      { id: 'q9_opt2', text: '有条不紊，按计划进行', value: 2 },
      { id: 'q9_opt3', text: '灵活调整，随机应变', value: 3 },
      { id: 'q9_opt4', text: '从容不迫，稳扎稳打', value: 1 },
    ],
    required: true,
    sortOrder: 9,
  },
  {
    id: 'q10',
    testId: 'pdp',
    type: QuestionType.SINGLE,
    title: '在学习新事物时，你更喜欢：',
    options: [
      { id: 'q10_opt1', text: '实践操作，边做边学', value: 5 },
      { id: 'q10_opt2', text: '理论学习，深入了解', value: 2 },
      { id: 'q10_opt3', text: '互动讨论，交流学习', value: 4 },
      { id: 'q10_opt4', text: '循序渐进，稳步掌握', value: 1 },
    ],
    required: true,
    sortOrder: 10,
  },
]

// PDP测试结果数据
const pdpResults: TestResult[] = [
  {
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
  },
  {
    id: 'peacock',
    testId: 'pdp',
    type: 'peacock',
    title: '孔雀型 - 表达型',
    description: '你充满活力和魅力，善于表达和交际。喜欢成为焦点，具有很强的人际交往能力。',
    traits: [
      '善于表达，沟通能力强',
      '乐观积极，富有感染力',
      '人际关系好，善于交际',
      '创意丰富，思维活跃',
      '喜欢成为焦点，表现欲强',
    ],
    suggestions: [
      '提高专注力，避免分心',
      '加强执行力，落实想法',
      '学会控制情绪，保持冷静',
      '注重细节，提高工作质量',
      '合理安排时间，平衡工作与社交',
    ],
    score: 0,
    color: '#4ECDC4',
    icon: '🦚',
    shareImage: '/static/images/pdp-peacock.jpg',
  },
  {
    id: 'koala',
    testId: 'pdp',
    type: 'koala',
    title: '考拉型 - 和谐型',
    description: '你温和友善，重视和谐与稳定。具有很强的同理心，是优秀的团队合作者。',
    traits: [
      '温和友善，善于倾听',
      '重视团队，合作精神强',
      '有耐心，稳定性好',
      '善于处理人际关系',
      '忠诚可靠，值得信赖',
    ],
    suggestions: [
      '提高决策效率，避免犹豫不决',
      '学会表达自己的想法',
      '增强抗压能力，应对挑战',
      '适当冒险，突破舒适区',
      '提高工作效率，避免拖延',
    ],
    score: 0,
    color: '#95E77E',
    icon: '🐨',
    shareImage: '/static/images/pdp-koala.jpg',
  },
  {
    id: 'owl',
    testId: 'pdp',
    type: 'owl',
    title: '猫头鹰型 - 分析型',
    description: '你理性谨慎，注重细节和准确性。具有很强分析能力，追求完美和精确。',
    traits: [
      '理性分析，逻辑思维强',
      '注重细节，追求准确',
      '谨慎稳重，风险意识强',
      '做事有条理，计划性好',
      '学习能力强，专业知识深',
    ],
    suggestions: [
      '提高决策速度，适当冒险',
      '加强人际沟通能力',
      '学会变通，适应变化',
      '控制完美主义倾向',
      '培养大局观，关注整体',
    ],
    score: 0,
    color: '#A8DADC',
    icon: '🦉',
    shareImage: '/static/images/pdp-owl.jpg',
  },
  {
    id: 'chameleon',
    testId: 'pdp',
    type: 'chameleon',
    title: '变色龙型 - 适应型',
    description: '你灵活多变，具有很强的适应能力。能够根据环境和情况调整自己的行为方式。',
    traits: [
      '适应能力强，灵活多变',
      '善于观察，洞察力强',
      '人际关系好，容易相处',
      '学习能力强，成长快速',
      '平衡各种特质，全面发展',
    ],
    suggestions: [
      '明确个人价值观和原则',
      '提高专注度，避免分散',
      '加强决策的果断性',
      '培养专业技能和特长',
      '建立长期目标和规划',
    ],
    score: 0,
    color: '#E056FD',
    icon: '🦎',
    shareImage: '/static/images/pdp-chameleon.jpg',
  },
]

// PDP完整测试数据
export const pdpTest: Test = {
  id: 'pdp',
  title: 'PDP动物性格测试',
  description: '发现你的内在动物性格！通过这个有趣的测试，了解你是老虎、孔雀、考拉、猫头鹰还是变色龙，更好地认识自己的性格特点和优势。',
  category: TestCategory.PERSONALITY,
  coverImage: '/static/images/pdp-cover.jpg',
  duration: 8,
  difficulty: TestDifficulty.EASY,
  questionCount: pdpQuestions.length,
  tags: ['性格测试', '动物性格', 'PDP', '职业规划'],
  isActive: true,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
}

// 导出PDP测试数据
export { pdpQuestions, pdpResults }

// PDP专用结果计算方法
export const calculatePDPResult = (answers: Record<string, number | number[]>): TestResult | null => {
  // PDP测试特殊计算逻辑
  // 统计各个维度的得分

  let tigerScore = 0 // 支配型得分
  let peacockScore = 0 // 表达型得分
  let koalaScore = 0 // 和谐型得分
  let owlScore = 0 // 分析型得分
  let chameleonScore = 0 // 适应型得分

  // 根据答案计算各类型得分
  Object.values(answers).forEach((answer) => {
    const score = typeof answer === 'number' ? answer : 0

    // 根据题目类型和答案计算各类型得分
    // 这里是简化的计算逻辑，实际PDP测试会更复杂
    if (score >= 4) {
      tigerScore += score
    }
    else if (score >= 3) {
      peacockScore += score
    }
    else if (score >= 2) {
      owlScore += score
    }
    else {
      koalaScore += score
    }

    // 适应性得分（所有答案的平均值）
    chameleonScore += score
  })

  // 计算适应性得分
  chameleonScore = chameleonScore / Object.keys(answers).length

  // 找出得分最高的类型
  const scores = {
    tiger: tigerScore,
    peacock: peacockScore,
    koala: koalaScore,
    owl: owlScore,
    chameleon: chameleonScore,
  }

  const maxScore = Math.max(...Object.values(scores))
  const resultType = Object.keys(scores).find(key => scores[key as keyof typeof scores] === maxScore) as string

  // 返回对应的结果
  return pdpResults.find(result => result.type === resultType) || pdpResults[0]
}
