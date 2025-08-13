import React, { useState } from 'react';
import { CreateQuizForm } from './CreateQuizForm';
import { QuizPreview } from './QuizPreview';
import { Header } from '@/components/layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PlusCircle, 
  FileText, 
  BarChart3, 
  Clock,
  BookOpen,
  Target,
  Zap
} from 'lucide-react';

interface QuizData {
  name: string;
  grade: string;
  subject: string;
  chapter: string;
  questions: Array<{
    id: string;
    text: string;
    type: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    difficulty: string;
    elo: string;
    taxonomy: string;
  }>;
}

export const QuizDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'create' | 'preview' | 'edit'>('dashboard');
  const [currentQuiz, setCurrentQuiz] = useState<QuizData | null>(null);

  const handleQuizGenerated = (quiz: QuizData) => {
    setCurrentQuiz(quiz);
    setCurrentView('preview');
  };

  const handleBackToCreate = () => {
    setCurrentView('create');
  };

  const handleEditQuiz = (quiz: QuizData) => {
    setCurrentQuiz(quiz);
    setCurrentView('edit');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentQuiz(null);
  };

  if (currentView === 'preview' && currentQuiz) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <QuizPreview 
            quiz={currentQuiz} 
            onBack={handleBackToCreate}
            onEdit={handleEditQuiz}
          />
        </div>
      </div>
    );
  }

  if (currentView === 'create') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="mb-6">
            <button 
              onClick={handleBackToDashboard}
              className="text-primary hover:text-primary-hover transition-colors mb-4 flex items-center space-x-2"
            >
              <span>← Back to Dashboard</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Create Quiz</h1>
              <p className="text-muted-foreground">Define quiz parameters and generate questions</p>
            </div>
          </div>
          <CreateQuizForm onQuizGenerated={handleQuizGenerated} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Generator Dashboard</h1>
          <p className="text-muted-foreground">Create AI-powered quizzes aligned with your curriculum</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card 
            className="card-shadow hover:shadow-lg transition-all duration-200 cursor-pointer group"
            onClick={() => setCurrentView('create')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary-light rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Create Quiz</h3>
                  <p className="text-sm text-muted-foreground">Generate new quiz</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-accent rounded-lg">
                  <FileText className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Saved Quizzes</h3>
                  <p className="text-sm text-muted-foreground">0 quizzes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-accent rounded-lg">
                  <BarChart3 className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Analytics</h3>
                  <p className="text-sm text-muted-foreground">View usage stats</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-accent rounded-lg">
                  <Clock className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Recent Activity</h3>
                  <p className="text-sm text-muted-foreground">No recent activity</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>AI-Powered Generation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Generate curriculum-aligned quizzes using advanced AI that understands your specific learning outcomes and chapter content.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-success" />
                  <span>ELO-aligned questions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-success" />
                  <span>Multiple difficulty levels</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-success" />
                  <span>Detailed explanations</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>Curriculum Integration</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Seamlessly integrates with your existing lesson plans and follows CBSE framework guidelines for comprehensive coverage.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-success" />
                  <span>Grade-wise organization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-success" />
                  <span>Subject-specific content</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-success" />
                  <span>Chapter-based structure</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recent Quizzes */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Recent Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No quizzes yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first quiz to get started with AI-powered question generation.
              </p>
              <button
                onClick={() => setCurrentView('create')}
                className="hero-gradient text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2 mx-auto"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Create Your First Quiz</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};