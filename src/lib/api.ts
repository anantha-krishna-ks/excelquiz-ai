const API_BASE_URL = "https://ai.excelsoftcorp.com";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  usercode: string;
  custcode: string;
  orgcode: string;
  username: string;
  userrole: string;
}

export interface ClassData {
  classid: number;
  classname: string;
}

export interface SubjectData {
  subjectid: number;
  subjectname: string;
}

export interface ChapterData {
  chapterid: number;
  chaptername: string;
  chaptercode: string;
  classid: number;
  subjectid: number;
  unitsids: string | null;
}

export interface ELOData {
  elo: string;
  chapterid: number;
}

export interface ELOResponse {
  elo_details: ELOData[];
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: string;
  elo: string;
  taxonomy: string;
}

export interface QuizResponse {
  questions: QuizQuestion[];
}

export interface GenerateQuizRequest {
  grade: string;
  subject: string;
  chapter: string;
  questionCount: number;
  selectedELOs: string[];
}

export class APIService {
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/aiapps/AIToolKit/UnitPlanGen/check-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  }

  static async getClasses(): Promise<ClassData[]> {
    const response = await fetch(`${API_BASE_URL}/aiapps/EXAMPREP/get_classes`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch classes');
    }

    return response.json();
  }

  static async getSubjects(classId: number): Promise<SubjectData[]> {
    const response = await fetch(`${API_BASE_URL}/aiapps/EXAMPREP/get_subject?classid=${classId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch subjects');
    }

    return response.json();
  }

  static async getChapters(classId: number, subjectId: number): Promise<ChapterData[]> {
    const response = await fetch(`${API_BASE_URL}/aiapps/EXAMPREP/get_chapters?classid=${classId}&subjectid=${subjectId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch chapters');
    }

    return response.json();
  }

  static async getELOs(chapterId: number): Promise<ELOResponse> {
    const response = await fetch(`${API_BASE_URL}/aiapps/EXAMPREP/get-elo-details?chapterid=${chapterId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch ELOs');
    }

    return response.json();
  }

  static async generateQuiz(request: GenerateQuizRequest): Promise<QuizResponse> {
    const response = await fetch(`${API_BASE_URL}/ExcelAIQuizGen/generate-questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to generate quiz');
    }

    return response.json();
  }
}