import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRACTICE_QUESTIONS } from '../../services/mockData';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  ArrowRight, 
  Lightbulb,
  Play
} from 'lucide-react';

export const Scene9PracticePreview: React.FC = () => {
  const { setView, startQuestionPractice, bookmarkedQuestionIds, toggleBookmark } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Domains' },
    { id: 'behavioral', label: 'Behavioral & Leadership' },
    { id: 'technical', label: 'Technical & Coding' },
    { id: 'system-design', label: 'System Design' },
    { id: 'product-management', label: 'Product & Strategy' },
    { id: 'ai-ml', label: 'AI & Machine Learning' }
  ];

  const filteredQuestions = PRACTICE_QUESTIONS.filter(q => {
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="interview-modes" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>CURATED QUESTION BANK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Drill high-frequency questions{' '}
            <span className="gradient-text-brand">with instant AI hints.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Explore hundreds of verified interview questions filtered by domain, difficulty, and company. Get model STAR answers and launch immediate 3D voice practice.
          </p>
        </div>

        {/* Filter Bar & Search Input */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm shadow-cyan-500/30'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-400 border-slate-200 dark:border-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic or keywords..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-cyan-500/50 text-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* Question Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredQuestions.slice(0, 6).map((q) => {
            const isBookmarked = bookmarkedQuestionIds.includes(q.id);
            return (
              <div
                key={q.id}
                className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10 flex flex-col justify-between hover:border-cyan-500/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {q.category}
                    </span>
                    <button
                      onClick={() => toggleBookmark(q.id)}
                      className="text-slate-400 hover:text-cyan-400 transition-colors"
                      aria-label="Bookmark Question"
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-cyan-400 text-cyan-400' : ''}`} />
                    </button>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug mb-3 group-hover:text-cyan-400 transition-colors">
                    {q.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium">
                    Topic: {q.topic}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs text-slate-600 dark:text-slate-300 mb-4">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] mb-1">
                      <Lightbulb className="w-3.5 h-3.5" /> AI Focus Hint:
                    </div>
                    <p className="line-clamp-2 text-[11px] leading-relaxed">
                      {q.hints[0]}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 capitalize">
                    {q.difficulty} Difficulty
                  </span>

                  <button
                    onClick={() => startQuestionPractice(q)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 border border-cyan-500/30 transition-all flex items-center gap-1.5"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Practice Spoken</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Question Bank CTA */}
        <div className="text-center">
          <button
            onClick={() => setView('questions')}
            className="btn-secondary px-6 py-3 text-sm font-semibold inline-flex items-center gap-2"
          >
            <span>Browse All 200+ Practice Questions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
