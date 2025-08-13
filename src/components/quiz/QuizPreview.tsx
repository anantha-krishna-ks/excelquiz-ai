import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Edit3, 
  Eye, 
  Download, 
  Save, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Printer
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

interface QuizPreviewProps {
  quiz: QuizData;
  onBack: () => void;
  onEdit: (quiz: QuizData) => void;
}

export const QuizPreview: React.FC<QuizPreviewProps> = ({ quiz, onBack, onEdit }) => {
  const [isStudentView, setIsStudentView] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSaveQuiz = () => {
    // Implementation for saving quiz
    console.log('Saving quiz:', quiz);
  };

  const handleExportPDF = () => {
    // Implementation for PDF export
    console.log('Exporting to PDF:', quiz);
  };

  if (isStudentView) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => setIsStudentView(false)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Teacher View</span>
          </Button>
          <div className="text-sm text-muted-foreground">
            Student Display Mode
          </div>
        </div>

        <Card className="card-shadow">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{quiz.name}</CardTitle>
            <p className="text-muted-foreground">
              {quiz.grade} • {quiz.subject} • {quiz.chapter}
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            {quiz.questions.map((question, index) => (
              <div key={question.id} className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-foreground mb-3">
                      {question.text}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="p-3 border border-border rounded-lg bg-background hover:bg-accent transition-colors"
                        >
                          <span className="font-medium mr-2">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Create</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{quiz.name}</h1>
            <p className="text-muted-foreground">
              {quiz.grade} • {quiz.subject} • {quiz.chapter} • {quiz.questions.length} Questions
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={() => onEdit(quiz)}
            className="flex items-center space-x-2"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsStudentView(true)}
            className="flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>Display</span>
          </Button>
          <Button
            variant="outline"
            onClick={handleExportPDF}
            className="flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
          <Button
            variant="default"
            onClick={handleSaveQuiz}
            className="flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Quiz</span>
          </Button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {quiz.questions.map((question, index) => (
          <Card key={question.id} className="card-shadow animate-fade-in">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium text-sm">
                    Q{index + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {question.text}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={getDifficultyColor(question.difficulty)}
                      >
                        {question.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        {question.taxonomy}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Options */}
              <div className="grid grid-cols-1 gap-2">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`p-3 border rounded-lg transition-colors ${
                      option === question.correctAnswer
                        ? 'bg-success-light border-success text-success-foreground'
                        : 'border-border bg-background'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {option === question.correctAnswer && (
                        <CheckCircle className="w-4 h-4 text-success" />
                      )}
                      <span className="font-medium">
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>
                      <span>{option}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Correct Answer & Explanation */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="font-medium text-success">Correct Answer:</span>
                  <span>{question.correctAnswer}</span>
                </div>
                
                <div className="bg-accent/50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-foreground mb-1">Explanation:</p>
                      <p className="text-sm text-muted-foreground">{question.explanation}</p>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  <strong>ELO:</strong> {question.elo}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};