import type { 
  CandidateProfile, 
  InterviewSessionReport, 
  PracticeQuestion, 
  PricingPlan 
} from '../types';

export const DEFAULT_CANDIDATE_PROFILE: CandidateProfile = {
  name: 'Alex Chen',
  email: 'alex.chen@example.com',
  experienceLevel: 'mid',
  currentStatus: 'Actively preparing for Senior Software Engineer interviews',
  targetRole: 'Senior Full-Stack Engineer',
  industry: 'Technology & Cloud SaaS',
  targetCompany: 'Stripe / Cloudflare / Figma',
  jobDescription: `We are looking for a Senior Full-Stack Engineer with deep experience in React, TypeScript, Node.js, distributed microservices, and database optimization. You will design scalable architectures, mentor engineers, and drive technical decision-making.`,
  resumeFileName: 'Alex_Chen_Senior_SWE_Resume.pdf',
  resumeSummary: 'Full-stack software engineer with 5+ years of experience building high-throughput web applications, microservices, and design systems using React, TypeScript, PostgreSQL, and AWS.',
  extractedSkills: [
    'React & Next.js',
    'TypeScript',
    'Distributed Systems',
    'PostgreSQL & Redis',
    'System Architecture',
    'CI/CD & Kubernetes',
    'API Design & GraphQL',
    'Performance Optimization'
  ],
  strengths: [
    'Clear architectural reasoning',
    'Strong technical vocabulary',
    'Structured STAR storytelling'
  ],
  weaknesses: [
    'Occasional filler words under pressure ("basically", "you know")',
    'Answers can sometimes exceed conciseness target',
    'Need sharper quantification of business results'
  ],
  interviewReadiness: 78,
  streakDays: 4,
  totalInterviewsTaken: 5
};

export const SAMPLE_RESUME_PRESETS = [
  {
    role: 'Senior Full-Stack Engineer',
    name: 'Alex Chen',
    experience: '5+ Years',
    summary: 'Lead engineer specializing in React, TypeScript, GraphQL, Distributed Systems, and Node.js microservices.',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'GraphQL', 'AWS', 'System Design']
  },
  {
    role: 'AI / ML Engineer',
    name: 'Priya Sharma',
    experience: '3+ Years',
    summary: 'Machine Learning specialist focused on LLM fine-tuning, RAG pipelines, PyTorch, LangChain, and high-scale inference.',
    skills: ['Python', 'PyTorch', 'Transformers', 'RAG & Vector DBs', 'FastAPI', 'MLOps', 'AWS SageMaker', 'LangChain']
  },
  {
    role: 'Product Manager (Tech)',
    name: 'Marcus Vance',
    experience: '4+ Years',
    summary: 'Product Manager with strong data-driven execution, user journey mapping, Agile leadership, and monetization scaling.',
    skills: ['Product Strategy', 'Roadmapping', 'A/B Testing', 'User Research', 'SQL & Analytics', 'Go-To-Market', 'Scrum']
  }
];

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'pq-1',
    title: 'Describe a time you resolved a major production outage under severe time constraints.',
    category: 'behavioral',
    difficulty: 'medium',
    targetRoles: ['Software Engineer', 'DevOps', 'Engineering Manager'],
    topic: 'Crisis Management & Ownership',
    frequencyRating: 5,
    hints: [
      'Focus on the systematic triage process rather than just fixing the code.',
      'Highlight cross-team communication and stakeholder updates during the crisis.',
      'Describe the post-mortem action items implemented to prevent recurrence.'
    ],
    sampleStarAnswer: {
      situation: 'At my previous company, our payment gateway service experienced a 45% spike in failed transactions during Black Friday peak traffic.',
      task: 'As the on-call tech lead, I needed to urgently identify the bottleneck, stabilize the payment cluster, and minimize transaction drop-offs.',
      action: 'I quickly isolated Redis connection pool starvation, scaled the read replicas horizontally, and enabled graceful rate limiting with circuit breakers.',
      result: 'The error rate dropped back to 0.02% within 14 minutes, recovering over $280,000 in at-risk checkouts, and we followed up with an automated connection pooling redesign.'
    },
    keyEvaluationCriteria: [
      'Systematic troubleshooting methodology',
      'Stakeholder communication under pressure',
      'Quantified business outcome in Result'
    ]
  },
  {
    id: 'pq-2',
    title: 'How would you design a real-time collaborative document editing system like Google Docs?',
    category: 'system-design',
    difficulty: 'hard',
    targetRoles: ['Senior Software Engineer', 'System Architect', 'Tech Lead'],
    topic: 'Distributed Systems & Operational Transformation',
    frequencyRating: 5,
    hints: [
      'Compare Operational Transformation (OT) vs CRDTs for conflict resolution.',
      'Explain WebSocket connection pooling and sticky session management.',
      'Address snapshotting, version history storage, and offline persistence.'
    ],
    sampleStarAnswer: {
      situation: 'Designing a real-time collaborative editor capable of supporting 50 concurrent active typists per document with sub-50ms latency.',
      task: 'Architect the client-server synchronization, conflict resolution protocol, and storage tier.',
      action: 'I recommend using Conflict-free Replicated Data Types (CRDTs) with WebSockets terminated at edge proxies, backed by an event-driven Kafka stream and document state snapshots stored in S3/DynamoDB.',
      result: 'Provides seamless peer-to-peer eventual consistency, zero data loss during network blips, and scales horizontally with partitioned document room IDs.'
    },
    keyEvaluationCriteria: [
      'Understanding of CRDTs vs OT',
      'WebSocket state & connection management',
      'Scalable storage & partition strategy'
    ]
  },
  {
    id: 'pq-3',
    title: 'Tell me about a time you strongly disagreed with a senior stakeholder or peer. How did you handle it?',
    category: 'behavioral',
    difficulty: 'medium',
    targetRoles: ['All Roles', 'Product Manager', 'Engineering Manager'],
    topic: 'Conflict Resolution & Influence',
    frequencyRating: 5,
    hints: [
      'Avoid portraying the other person as simply wrong.',
      'Use data and prototypes rather than subjective opinions.',
      'Demonstrate "disagree and commit" if the decision did not go your way, or how consensus was reached.'
    ],
    sampleStarAnswer: {
      situation: 'Our VP of Product wanted to rush an unoptimized algorithmic feed to production to boost 1-week vanity engagement metrics.',
      task: 'I had to communicate the long-term technical risk and user retention drops without creating adversarial tension.',
      action: 'I set up a controlled 10% A/B canary test and presented hard cohort data showing a 15% increase in 30-day churn alongside user feedback surveys.',
      result: 'The stakeholder agreed to delay the rollout by 3 weeks for relevance tuning, resulting in a 22% sustained increase in 90-day retention.'
    },
    keyEvaluationCriteria: [
      'Emotional maturity and empathy',
      'Data-driven persuasion',
      'Constructive collaboration'
    ]
  },
  {
    id: 'pq-4',
    title: 'How do you optimize a slow React application experiencing noticeable frame drops during user interaction?',
    category: 'technical',
    difficulty: 'medium',
    targetRoles: ['Frontend Engineer', 'Full-Stack Engineer'],
    topic: 'Frontend Performance & Profiling',
    frequencyRating: 4,
    hints: [
      'Mention React DevTools Profiler, Flamegraphs, and identifying unnecessary re-renders.',
      'Discuss virtualization (react-window/virtual), memoization trade-offs, and Web Workers for heavy computations.'
    ],
    sampleStarAnswer: {
      situation: 'Our analytics dashboard lagged with 200ms input latency when filtering through a 15,000-row tabular data grid.',
      task: 'Identify rendering bottlenecks and achieve smooth 60fps scrolling and instant filtering.',
      action: 'I used Chrome Performance profiler to spot layout thrashing, implemented row windowing virtualization, debounced text search, and memoized derived computations with useMemo.',
      result: 'Reduced memory footprint by 65%, cut re-render times from 180ms to 8ms, and restored a silky 60fps experience.'
    },
    keyEvaluationCriteria: [
      'Tooling proficiency (Profiler, DevTools)',
      'Root cause diagnosis vs blind optimization',
      'Clear metric improvements'
    ]
  },
  {
    id: 'pq-5',
    title: 'How do you prioritize features when you have competing demands from Sales, Engineering, and Executive leadership?',
    category: 'product-management',
    difficulty: 'hard',
    targetRoles: ['Product Manager', 'Director of Product', 'Founder'],
    topic: 'Prioritization Frameworks & Strategic Alignment',
    frequencyRating: 5,
    hints: [
      'Mention structured prioritization frameworks (RICE, Kano, Cost of Delay).',
      'Explain how you tie feature prioritization directly to company North Star OKRs.',
      'Show how you communicate trade-offs transparently.'
    ],
    sampleStarAnswer: {
      situation: 'Sales demanded custom enterprise integrations, Engineering needed tech-debt refactoring, and the CEO wanted a mobile companion app.',
      task: 'Establish a unified scoring model and transparent roadmap without alienating team leads.',
      action: 'I adopted the RICE framework tied to our quarterly North Star metric of ARR retention, holding joint sprint workshops to score reach and impact collectively.',
      result: 'Delivered 80% of top enterprise requests, reduced tech debt tickets by 40%, and achieved full leadership alignment with zero missed deadlines.'
    },
    keyEvaluationCriteria: [
      'Framework rigor (RICE, Kano)',
      'Stakeholder negotiation & transparency',
      'Alignment with North Star business objectives'
    ]
  },
  {
    id: 'pq-6',
    title: 'Explain the difference between Fine-Tuning and Retrieval-Augmented Generation (RAG). When would you choose one over the other?',
    category: 'ai-ml',
    difficulty: 'medium',
    targetRoles: ['AI Engineer', 'ML Scientist', 'Data Scientist'],
    topic: 'LLM Architecture & Practical Applications',
    frequencyRating: 5,
    hints: [
      'Contrast parametric knowledge (weights) vs non-parametric retrieved context.',
      'Discuss data freshness, hallucinations, computational cost, and domain terminology adaptation.'
    ],
    sampleStarAnswer: {
      situation: 'Selecting the optimal architecture for an enterprise compliance assistant analyzing frequently changing legal bylaws.',
      task: 'Evaluate trade-offs between fine-tuning a base model vs implementing a RAG pipeline with vector search.',
      action: 'I recommended RAG because legal statutes change weekly and require traceable citation links, whereas fine-tuning is better suited for learning a specific tone, dialect, or deterministic output format.',
      result: 'Reduced implementation cost by 85%, eliminated stale knowledge hallucinations, and provided verifiable source citations for all generated answers.'
    },
    keyEvaluationCriteria: [
      'Deep architectural distinction (Parametric vs Non-Parametric)',
      'Cost, freshness, and citation trade-offs',
      'Practical business application decision matrix'
    ]
  }
];

export const HISTORICAL_INTERVIEWS: InterviewSessionReport[] = [
  {
    id: 'int-005',
    date: 'Yesterday at 4:15 PM',
    targetRole: 'Senior Full-Stack Engineer',
    category: 'technical',
    mode: 'full-mock',
    difficulty: 'hard',
    durationSeconds: 1240,
    readinessScore: 78,
    deltaScore: 10,
    metrics: {
      communication: 82,
      reasoning: 84,
      answerQuality: 79,
      confidenceSignals: 71,
      grammar: 88,
      conciseness: 68,
      relevance: 91,
      technicalDepth: 86
    },
    observableSignals: {
      avgWpm: 142,
      totalFillerWords: 7,
      longPausesCount: 3,
      eyeContactScore: 88,
      clarityDelivery: 'Confident and articulate with minor hesitation before complex architectural questions.'
    },
    qualitativeFeedback: {
      whatWentWell: [
        'Exceptional depth in explaining microservice decoupled caching and cache invalidation.',
        'High STAR structure adherence with clear ownership verbs ("I architected", "I deployed").',
        'Strong technical terminology usage with zero ambiguity.'
      ],
      whatNeedsImprovement: [
        'Used uncertainty phrases ("I guess", "probably") when answering questions regarding unfamiliar edge cases.',
        'Over-elaborated on background context for the database indexing question (conciseness: 68%).'
      ],
      strongestAnswer: {
        question: 'Tell me about a difficult technical problem you solved.',
        answerExcerpt: 'We observed severe database connection lockups under sudden 10x traffic spikes. I diagnosed our connection pool exhaustion, migrated the hot read queries to a distributed Redis cluster, and implemented exponential backoff retries.',
        whyStrong: 'Direct problem diagnosis, immediate actionable solution, and crisp technical explanation without unnecessary fluff.'
      },
      answerToImprove: {
        question: 'What would you do if a production microservice drops to 50% throughput?',
        originalAnswerExcerpt: 'Um, I guess I would probably check the logs first and maybe see if CPU is high, and you know, ask around if someone pushed code recently.',
        modelSTARApproach: 'I initiate our standard incident protocol: First, check APM dashboards for p99 latency spikes and memory/CPU exhaustion. Second, inspect recent deployment commits and rollback if a regression is detected. Third, isolate downstream dependency timeouts using circuit breakers.',
        actionableAdvice: 'Start directly with the structured protocol. Eliminate hesitation qualifiers like "I guess" or "maybe".'
      },
      recommendedPracticeAreas: [
        'Concise 60-second architectural summaries',
        'Eliminating hesitation qualifiers under technical ambiguity',
        'STAR Quantification (metrics & dollar impact)'
      ]
    },
    exchanges: []
  },
  {
    id: 'int-004',
    date: '3 days ago',
    targetRole: 'Senior Full-Stack Engineer',
    category: 'system-design',
    mode: 'real',
    difficulty: 'medium',
    durationSeconds: 1100,
    readinessScore: 72,
    deltaScore: 4,
    metrics: {
      communication: 74,
      reasoning: 78,
      answerQuality: 73,
      confidenceSignals: 66,
      grammar: 85,
      conciseness: 64,
      relevance: 86,
      technicalDepth: 80
    },
    observableSignals: {
      avgWpm: 158,
      totalFillerWords: 12,
      longPausesCount: 5,
      eyeContactScore: 82,
      clarityDelivery: 'Good structure but spoke rapidly when feeling nervous.'
    },
    qualitativeFeedback: {
      whatWentWell: ['Good high-level component diagrams', 'Clear explanation of load balancing'],
      whatNeedsImprovement: ['Fast speaking rate (158 WPM)', 'Several filler words'],
      strongestAnswer: {
        question: 'How do you handle database sharding?',
        answerExcerpt: 'I prefer consistent hashing based on tenant ID to avoid unbalanced hot partitions.',
        whyStrong: 'Clean, accurate, and direct.'
      },
      answerToImprove: {
        question: 'How do you handle distributed transactions?',
        originalAnswerExcerpt: 'Basically 2PC is good, but you know it has blocking issues so Sagas might be better.',
        modelSTARApproach: 'I evaluate 2-Phase Commit vs Saga Pattern based on consistency requirements. For high-throughput services, I implement an Orchestration-based Saga with compensating transactions.',
        actionableAdvice: 'Avoid using "basically" and "you know" as conversational crutches.'
      },
      recommendedPracticeAreas: ['Speaking cadence control (Target 130-145 WPM)', 'Distributed consensus concepts']
    },
    exchanges: []
  },
  {
    id: 'int-001',
    date: '10 days ago',
    targetRole: 'Senior Full-Stack Engineer',
    category: 'behavioral',
    mode: 'practice',
    difficulty: 'medium',
    durationSeconds: 950,
    readinessScore: 68,
    metrics: {
      communication: 65,
      reasoning: 70,
      answerQuality: 68,
      confidenceSignals: 58,
      grammar: 82,
      conciseness: 60,
      relevance: 80,
      technicalDepth: 72
    },
    observableSignals: {
      avgWpm: 165,
      totalFillerWords: 18,
      longPausesCount: 6,
      eyeContactScore: 75,
      clarityDelivery: 'Rushed answers with frequent pauses.'
    },
    qualitativeFeedback: {
      whatWentWell: ['Good examples from past experience', 'Honest reflections on failures'],
      whatNeedsImprovement: ['Lack of STAR structure in answers', 'Excessive filler words'],
      strongestAnswer: {
        question: 'Tell me about a time you made a mistake.',
        answerExcerpt: 'I pushed a database migration without running integration tests on staging, which broke the signup form for 20 minutes.',
        whyStrong: 'High accountability and honest ownership.'
      },
      answerToImprove: {
        question: 'Why do you want to join our company?',
        originalAnswerExcerpt: 'I really like the tech stack and the product looks super cool and interesting.',
        modelSTARApproach: 'I have followed your distributed infrastructure scaling challenges for the past two years, specifically your engineering blog post on geo-replicated data pipelines. My 5 years optimizing latency at scale directly aligns with your current expansion goals.',
        actionableAdvice: 'Tie your personal technical strengths directly to the company specific challenges.'
      },
      recommendedPracticeAreas: ['STAR Storytelling Framework', 'Pacing and deliberate breathing']
    },
    exchanges: []
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free Interviewer',
    description: 'Perfect for experiencing your first realistic AI mock interview with basic analytics.',
    priceMonthlyUSD: 0,
    priceYearlyUSD: 0,
    priceMonthlyINR: 0,
    priceYearlyINR: 0,
    features: [
      '1 Full Mock Interview (Voice + Camera)',
      'Basic Interview Readiness Score (0-100)',
      'Core Communication & Pace Analysis',
      'Access to 25+ Curated Practice Questions',
      'Standard AI Avatar'
    ],
    ctaText: 'Start Free Interview',
    isPopular: false
  },
  {
    id: 'pro',
    name: 'Pro Candidate',
    badge: 'MOST POPULAR',
    description: 'Unlimited realistic mock interviews, intelligent adaptive follow-ups, and resume intelligence.',
    priceMonthlyUSD: 24,
    priceYearlyUSD: 18,
    priceMonthlyINR: 1499,
    priceYearlyINR: 999,
    features: [
      'Unlimited AI Mock Interviews',
      'Live Intelligent Follow-Ups & Challenge Engine',
      'Resume & Job Description Intelligence Parser',
      'STAR Answer Reframing & Model Rewrites',
      'Grammar & Communication Deep Analysis',
      'Observable Confidence & Pause Signals',
      'Full Question Bank (200+ Questions with AI Hints)',
      'Complete Interview History & PDF Reports',
      'Custom Role & Difficulty Calibration'
    ],
    ctaText: 'Unlock Pro Preparation',
    isPopular: true
  },
  {
    id: 'mastery',
    name: 'Executive Mastery',
    badge: 'CAREER ACCELERATOR',
    description: 'For candidates aiming for top-tier tech, executive, or competitive leadership positions.',
    priceMonthlyUSD: 49,
    priceYearlyUSD: 36,
    priceMonthlyINR: 2999,
    priceYearlyINR: 2199,
    features: [
      'Everything in Pro Candidate Plan',
      'Executive & System Design Deep Dive Simulator',
      'Custom Company-Specific Interview Personas',
      'Advanced 3D Studio & Multi-Avatar Personas',
      'Video Posture & Eye Contact Signal Analytics',
      'Priority AI Processing & Ultra-Low Latency Voice',
      'Exportable Portfolio of Interview Readiness'
    ],
    ctaText: 'Start Executive Prep',
    isPopular: false
  }
];
