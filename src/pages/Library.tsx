import React, { useState } from 'react';
import { Book, Download, PlayCircle, Menu, BookOpen, FileText, GraduationCap, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-lg border-b border-border/50 px-4 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform hover:scale-105">
            <span className="text-primary-foreground font-bold text-sm">OA</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-foreground">Oxford</h1>
            <p className="text-xs text-muted-foreground font-medium">Advantage</p>
          </div>
        </div>
        <Select value={selectedGrade} onValueChange={setSelectedGrade}>
          <SelectTrigger className="w-32 h-10 text-sm font-medium border-border/50 hover:border-primary/50 transition-colors">
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
      <main className="flex-1 p-4 pb-24 overflow-auto">
        {/* Subject Card */}
        <Card className="mb-6 p-5 shadow-lg border-border/50 bg-gradient-to-br from-card via-card to-success/5 hover:shadow-xl transition-all duration-300 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-success/30 to-success/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md">
                <BookOpen className="w-10 h-10 text-success drop-shadow-sm" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-success to-success/80 text-success-foreground text-xs font-bold px-3 py-1 rounded-full border-2 border-background shadow-lg">
                50%
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-foreground mb-2">Subject Title</h2>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <FileText className="w-4 h-4" />
                <span className="font-medium">20 Materials</span>
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-xs px-3 text-primary hover:text-primary-hover hover:bg-primary/10 transition-colors font-medium rounded-full">
                Switch Language
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </Card>

        {/* All Chapters Section */}
        <div className="bg-card rounded-2xl border border-border/50 shadow-lg overflow-hidden animate-fade-in">
          <button
            onClick={() => setChaptersExpanded(!chaptersExpanded)}
            className="w-full px-5 py-4 flex items-center justify-between text-sm font-bold text-foreground hover:bg-accent/50 transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Book className="w-5 h-5 text-primary" />
              </div>
              <span className="text-base">All Chapters</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 ${chaptersExpanded ? 'rotate-180' : ''}`} />
          </button>

          {chaptersExpanded && (
            <div className="divide-y divide-border/30">
              {chapters.map((chapter, index) => (
                <div 
                  key={chapter.id} 
                  className="px-4 py-4 flex items-center gap-4 hover:bg-accent/40 transition-all duration-200 group cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 ${
                    index % 3 === 0 ? 'bg-gradient-to-br from-purple-500/30 to-purple-500/10' : 
                    index % 3 === 1 ? 'bg-gradient-to-br from-primary/30 to-primary/10' : 
                    'bg-gradient-to-br from-success/30 to-success/10'
                  }`}>
                    <Download className={`w-6 h-6 ${
                      index % 3 === 0 ? 'text-purple-500' : index % 3 === 1 ? 'text-primary' : 'text-success'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">
                      {chapter.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2 leading-relaxed">
                      {chapter.description}
                    </p>
                    <Badge variant="secondary" className="text-xs font-semibold bg-warning/15 text-warning hover:bg-warning/25 border-0">
                      {chapter.type}
                    </Badge>
                  </div>
                  <button className="flex-shrink-0 w-11 h-11 rounded-xl hover:bg-warning/20 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm">
                    <PlayCircle className="w-6 h-6 text-warning" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border/50 shadow-2xl z-20">
        <div className="flex items-center justify-around px-2 py-3 max-w-screen-sm mx-auto">
          <button className="flex flex-col items-center gap-1.5 py-2 px-4 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 rounded-xl hover:bg-accent/50 group">
            <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">Menu</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 py-2 px-4 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 rounded-xl hover:bg-accent/50 group">
            <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">Resources</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 py-2 px-4 text-primary transition-all duration-200 scale-110 rounded-xl bg-primary/10 relative">
            <div className="absolute inset-0 bg-primary/10 rounded-xl blur-lg"></div>
            <Book className="w-6 h-6 relative z-10" />
            <span className="text-xs font-bold relative z-10">Books</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 py-2 px-4 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 rounded-xl hover:bg-accent/50 group">
            <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">Tests</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 py-2 px-4 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105 rounded-xl hover:bg-accent/50 group">
            <GraduationCap className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">Lessons</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Library;
