export type CategoryId = 'email' | 'word' | 'presentation';

export type EmotionalState = 'furious' | 'stressed' | 'skeptical' | 'cooperative' | 'relieved';

export interface TacticalOption {
  id: string;
  label: string;
  responseText: string;
  empathyScore: number; // 0-100
  clarityScore: number; // 0-100
  technicalScore: number; // 0-100
  frustrationDelta: number; // e.g., -25 (calms user) or +20 (annoys user)
  coachFeedback: string;
  userReply: string;
  advancesStage: boolean;
}

export interface ConceptGroup {
  name: string;
  description: string;
  keywords: string[];
}

export interface ScenarioStage {
  stageNumber: 1 | 2 | 3;
  title: string;
  objective: string;
  userPrompt: string;
  screenStateDescription: string;
  hint: string;
  conceptGroups: ConceptGroup[];
  modelResponse: string;
  tacticalOptions: TacticalOption[];
  successUserReply: string;
  coldSuccessUserReply: string;
  incompleteUserReply: string;
}

export interface ScenarioTicket {
  id: string;
  code: string;
  category: CategoryId;
  categoryLabel: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  title: string;
  userName: string;
  userRole: string;
  userDepartment: string;
  initialFrustration: number; // 0-100
  initialMoodLabel: string;
  contextSummary: string;
  technicalSkillsTested: string[];
  softSkillsTested: string[];
  stages: ScenarioStage[];
}

export interface TurnEvaluation {
  stageNumber: number;
  stageTitle: string;
  studentMessage: string;
  modeUsed: 'free' | 'tactical';
  empathyScore: number;
  clarityScore: number;
  technicalScore: number;
  frustrationBefore: number;
  frustrationAfter: number;
  matchedConcepts: string[];
  missedConcepts: string[];
  feedbackSummary: string;
  modelResponse: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'student' | 'coach';
  text: string;
  timestamp: string;
  stageNumber: number;
  evaluation?: TurnEvaluation;
  emotionalState?: EmotionalState;
}

export interface CompletedTicketRecord {
  ticketId: string;
  ticketCode: string;
  ticketTitle: string;
  category: CategoryId;
  userName: string;
  completedAt: string;
  finalFrustration: number;
  patienceAndEmpathyAvg: number;
  technicalPrecisionAvg: number;
  clarityAvg: number;
  overallScore: number;
  gradeLabel: string;
  turns: TurnEvaluation[];
}
