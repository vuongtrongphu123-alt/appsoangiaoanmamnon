export type DomainId = 'nhan_thuc' | 'ngon_ngu' | 'the_chat' | 'tham_my' | 'tinh_cam';

export type AgeGroupId = '3-12m' | '12-18m' | '18-24m' | '24-36m' | '3-4t' | '4-5t' | '5-6t';

export interface LessonPlan {
  id: string;
  title: string;
  domain: DomainId;
  domainName: string;
  ageGroup: AgeGroupId;
  ageName: string;
  duration: string;
  theme: string;
  subTheme: string;
  style: string;
  year: string;
  school: string;
  className: string;
  contentHtml: string;
  createdAt?: string;
  updatedAt?: string;
  isPilot?: boolean;
}

export interface UserProfile {
  name: string;
  school: string;
  className: string;
  academicYear: string;
  email: string;
}

export interface GameItem {
  id: string;
  title: string;
  type: 'individual' | 'group' | 'steam';
  typeName: string;
  purpose: string;
  preparation: string;
  howToPlay: string;
  rules: string;
}

export interface PptSlide {
  id: string;
  stepName: string;
  timeEst: string;
  title: string;
  visualCue: string;
  animationCue: string;
  teacherNarration: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface AuditResult {
  score: number;
  strengths: string[];
  improvements: string[];
  suggestedQuestions: string[];
  improvedSnippet?: string;
  fullAnalysis?: string;
}

export type TabId =
  | 'dashboard'
  | 'create'
  | 'check'
  | 'library'
  | 'games'
  | 'materials'
  | 'powerpoint'
  | 'assistant'
  | 'documents';
