import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { APIService, ClassData, SubjectData, ChapterData, ELOData } from '@/lib/api';
import { Sparkles, FileText, BookOpen, Target, Hash } from 'lucide-react';

interface CreateQuizFormProps {
  onQuizGenerated: (quiz: any) => void;
}

export const CreateQuizForm: React.FC<CreateQuizFormProps> = ({ onQuizGenerated }) => {
  const [quizName, setQuizName] = useState('');
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  const [elos, setElos] = useState<ELOData[]>([]);
  
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [selectedELOs, setSelectedELOs] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const questionCountOptions = [
    { value: '5', label: 'Create quiz with 5 questions' },
    { value: '10', label: 'Create quiz with 10 questions' },
    { value: '12', label: 'Create quiz with 12 questions' },
    { value: 'elo', label: 'Create quiz with 3 questions per selected ELO' }
  ];

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedGrade) {
      fetchSubjects(parseInt(selectedGrade));
      setSelectedSubject('');
      setSelectedChapter('');
      setSubjects([]);
      setChapters([]);
      setElos([]);
    }
  }, [selectedGrade]);

  useEffect(() => {
    if (selectedGrade && selectedSubject) {
      fetchChapters(parseInt(selectedGrade), parseInt(selectedSubject));
      setSelectedChapter('');
      setChapters([]);
      setElos([]);
    }
  }, [selectedSubject]);

  useEffect(() => {
    if (selectedChapter) {
      fetchELOs(parseInt(selectedChapter));
    }
  }, [selectedChapter]);

  const fetchClasses = async () => {
    try {
      const data = await APIService.getClasses();
      setClasses(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch classes",
        variant: "destructive",
      });
    }
  };

  const fetchSubjects = async (classId: number) => {
    try {
      const data = await APIService.getSubjects(classId);
      setSubjects(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch subjects",
        variant: "destructive",
      });
    }
  };

  const fetchChapters = async (classId: number, subjectId: number) => {
    try {
      const data = await APIService.getChapters(classId, subjectId);
      setChapters(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch chapters",
        variant: "destructive",
      });
    }
  };

  const fetchELOs = async (chapterId: number) => {
    try {
      const data = await APIService.getELOs(chapterId);
      setElos(data.elo_details);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch ELOs",
        variant: "destructive",
      });
    }
  };

  const handleELOChange = (elo: string, checked: boolean) => {
    if (checked) {
      setSelectedELOs([...selectedELOs, elo]);
    } else {
      setSelectedELOs(selectedELOs.filter(item => item !== elo));
    }
  };

  const handleGenerateQuiz = async () => {
    if (!quizName || !selectedGrade || !selectedSubject || !selectedChapter || selectedELOs.length === 0 || !questionCount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const selectedGradeData = classes.find(c => c.classid.toString() === selectedGrade);
      const selectedSubjectData = subjects.find(s => s.subjectid.toString() === selectedSubject);
      const selectedChapterData = chapters.find(c => c.chapterid.toString() === selectedChapter);
      
      const finalQuestionCount = questionCount === 'elo' ? selectedELOs.length * 3 : parseInt(questionCount);
      
      const request = {
        grade: selectedGradeData?.classname || '',
        subject: selectedSubjectData?.subjectname || '',
        chapter: selectedChapterData?.chaptername || '',
        questionCount: finalQuestionCount,
        selectedELOs: selectedELOs
      };

      const response = await APIService.generateQuiz(request);
      
      const quizData = {
        name: quizName,
        grade: selectedGradeData?.classname,
        subject: selectedSubjectData?.subjectname,
        chapter: selectedChapterData?.chaptername,
        questions: response.questions
      };
      
      onQuizGenerated(quizData);
      
      toast({
        title: "Quiz Generated Successfully!",
        description: `Created ${response.questions.length} questions`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Quiz Details */}
      <div className="lg:col-span-2">
        <Card className="card-shadow animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <span>Quiz Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="quizName">Quiz Name</Label>
              <Input
                id="quizName"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                placeholder="Enter quiz name"
                className="h-11"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Grade</Label>
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.classid} value={cls.classid.toString()}>
                        {cls.classname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject} disabled={!selectedGrade}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.subjectid} value={subject.subjectid.toString()}>
                        {subject.subjectname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Chapter</Label>
                <Select value={selectedChapter} onValueChange={setSelectedChapter} disabled={!selectedSubject}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select chapter" />
                  </SelectTrigger>
                  <SelectContent>
                    {chapters.map((chapter) => (
                      <SelectItem key={chapter.chapterid} value={chapter.chapterid.toString()}>
                        {chapter.chaptername}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Question Count</Label>
              <Select value={questionCount} onValueChange={setQuestionCount}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select question count option" />
                </SelectTrigger>
                <SelectContent>
                  {questionCountOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {elos.length > 0 && (
              <div className="space-y-3">
                <Label className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span>Expected Learning Outcomes (ELOs)</span>
                </Label>
                <div className="space-y-3 max-h-60 overflow-y-auto border border-border rounded-lg p-4">
                  {elos.map((elo, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Checkbox
                        id={`elo-${index}`}
                        checked={selectedELOs.includes(elo.elo)}
                        onCheckedChange={(checked) => handleELOChange(elo.elo, checked as boolean)}
                        className="mt-1"
                      />
                      <Label 
                        htmlFor={`elo-${index}`} 
                        className="text-sm leading-relaxed cursor-pointer flex-1"
                      >
                        {elo.elo}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quiz Summary */}
      <div className="lg:col-span-1">
        <Card className="card-shadow animate-fade-in sticky top-24">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>Quiz Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Quiz Name</span>
                <p className="text-foreground">{quizName || 'Not specified'}</p>
              </div>
              {selectedGrade && (
                <div>
                  <span className="font-medium text-muted-foreground">Grade</span>
                  <p className="text-foreground">{classes.find(c => c.classid.toString() === selectedGrade)?.classname}</p>
                </div>
              )}
              {selectedSubject && (
                <div>
                  <span className="font-medium text-muted-foreground">Subject</span>
                  <p className="text-foreground">{subjects.find(s => s.subjectid.toString() === selectedSubject)?.subjectname}</p>
                </div>
              )}
              {selectedChapter && (
                <div>
                  <span className="font-medium text-muted-foreground">Chapter</span>
                  <p className="text-foreground">{chapters.find(c => c.chapterid.toString() === selectedChapter)?.chaptername}</p>
                </div>
              )}
              {selectedELOs.length > 0 && (
                <div>
                  <span className="font-medium text-muted-foreground">Selected ELOs</span>
                  <p className="text-foreground">{selectedELOs.length} selected</p>
                </div>
              )}
              {questionCount && (
                <div>
                  <span className="font-medium text-muted-foreground">Questions</span>
                  <p className="text-foreground">
                    {questionCount === 'elo' ? `${selectedELOs.length * 3} questions` : `${questionCount} questions`}
                  </p>
                </div>
              )}
            </div>

            <Button
              onClick={handleGenerateQuiz}
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isLoading || !quizName || !selectedGrade || !selectedSubject || !selectedChapter || selectedELOs.length === 0 || !questionCount}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Quiz</span>
                </div>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};