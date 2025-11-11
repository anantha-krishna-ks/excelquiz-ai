import React, { useState } from 'react';
import { Book, Download, PlayCircle, Menu, BookOpen, FileText, GraduationCap, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Library = () => {
  const [selectedGrade, setSelectedGrade] = useState('1');
  const [chaptersExpanded, setChaptersExpanded] = useState(true);

  const chapters = [
    {
      id: 1,
      title: '2020 For Primary & Pre Primary Bookmarks (English)',
      description: 'Explainer video on how to bookmark learning resources and accessing them on the LMS.',
      type: 'Ebook',
      icon: 'download'
    },
    {
      id: 2,
      title: '2020 For Primary & Pre Primary Bookmarks (English)',
      description: 'Explainer video on how to bookmark learning resources and accessing them on the LMS.',
      type: 'Ebook',
      icon: 'download'
    },
    {
      id: 3,
      title: '2020 For Primary & Pre Primary Bookmarks (English)',
      description: 'Explainer video on how to bookmark learning resources and accessing them on the LMS.',
      type: 'Ebook',
      icon: 'download'
    },
    {
      id: 4,
      title: '2020 For Primary & Pre Primary Bookmarks (English)',
      description: 'Explainer video on how to bookmark learning resources and accessing them on the LMS.',
      type: 'Ebook',
      icon: 'download'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-background border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">OA</span>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">Oxford</h1>
            <p className="text-xs text-muted-foreground">Advantage</p>
          </div>
        </div>
        <Select value={selectedGrade} onValueChange={setSelectedGrade}>
          <SelectTrigger className="w-28 h-9 text-sm">
            <SelectValue placeholder="Grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Grade 1</SelectItem>
            <SelectItem value="2">Grade 2</SelectItem>
            <SelectItem value="3">Grade 3</SelectItem>
            <SelectItem value="4">Grade 4</SelectItem>
            <SelectItem value="5">Grade 5</SelectItem>
          </SelectContent>
        </Select>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-20 overflow-auto">
        {/* Subject Card */}
        <Card className="mb-4 p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-success" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-muted text-muted-foreground text-xs font-semibold px-2 py-0.5 rounded-full border-2 border-background">
                50%
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold text-foreground mb-1">Subject Title</h2>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <FileText className="w-3 h-3" />
                <span>20 Materials</span>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs px-2 text-primary hover:text-primary-hover">
                Switch Language
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </Card>

        {/* All Chapters Section */}
        <div className="bg-card rounded-lg border border-border shadow-sm">
          <button
            onClick={() => setChaptersExpanded(!chaptersExpanded)}
            className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium text-foreground hover:bg-accent/50 transition-colors rounded-t-lg"
          >
            <div className="flex items-center gap-2">
              <Book className="w-4 h-4 text-muted-foreground" />
              <span>All Chapters</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${chaptersExpanded ? 'rotate-180' : ''}`} />
          </button>

          {chaptersExpanded && (
            <div className="divide-y divide-border">
              {chapters.map((chapter, index) => (
                <div key={chapter.id} className="px-4 py-3 flex items-center gap-3 hover:bg-accent/30 transition-colors">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    index % 3 === 0 ? 'bg-purple-500/20' : index % 3 === 1 ? 'bg-primary/20' : 'bg-success/20'
                  }`}>
                    <Download className={`w-5 h-5 ${
                      index % 3 === 0 ? 'text-purple-500' : index % 3 === 1 ? 'text-primary' : 'text-success'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground mb-1 line-clamp-2">
                      {chapter.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                      {chapter.description}
                    </p>
                    <span className="text-xs font-medium text-warning">{chapter.type}</span>
                  </div>
                  <button className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-warning/10 flex items-center justify-center transition-colors">
                    <PlayCircle className="w-5 h-5 text-warning" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="flex items-center justify-around px-4 py-2">
          <button className="flex flex-col items-center gap-1 py-2 px-3 text-muted-foreground hover:text-foreground transition-colors">
            <Menu className="w-5 h-5" />
            <span className="text-xs">Menu</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-2 px-3 text-muted-foreground hover:text-foreground transition-colors">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs">Resources</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-2 px-3 text-primary transition-colors">
            <Book className="w-5 h-5" />
            <span className="text-xs font-medium">Books</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-2 px-3 text-muted-foreground hover:text-foreground transition-colors">
            <FileText className="w-5 h-5" />
            <span className="text-xs">Tests</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-2 px-3 text-muted-foreground hover:text-foreground transition-colors">
            <GraduationCap className="w-5 h-5" />
            <span className="text-xs">Lessons</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Library;
