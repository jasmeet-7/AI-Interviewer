import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRACTICE_QUESTIONS } from '../../services/mockData';
import { 
  Search, 
  Bookmark, 
  Play, 
  Lightbulb, 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

export const QuestionBank: React.FC = () => {
  const { 
    startQuestionPractice, 
    bookmarkedQuestionIds, 
    toggleBookmark, 
    setView 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [onlyBookmarks, setOnlyBookmarks] = useState<boolean>(false);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'behavioral', label: 'Behavioral (STAR)' },
    { id: 'technical', label: 'Technical' },
    { id: 'system-design', label: 'System Design' },
    { id: 'product-management', label: 'Product Management' },
    { id: 'ai-ml', label: 'AI & Machine Learning' }
  ];

  const filteredQuestions = PRACTICE_QUESTIONS.filter(q => {
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBookmark = !onlyBookmarks || bookmarkedQuestionIds.includes(q.id);

    return matchesCategory && matchesDifficulty && matchesSearch && matchesBookmark;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={() => setView('dashboard')}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Curated Practice Question Bank
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Master high-frequency interview questions with structured STAR models and instant AI practice.
          </p>
        </div>

        <button
          onClick={() => setOnlyBookmarks(!onlyBookmarks)}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
            onlyBookmarks 
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold' 
              : 'bg-white/5 text-slate-300 border-white/10 hover:text-white'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${onlyBookmarks ? 'fill-current' : ''}`} />
          <span>Bookmarked ({bookmarkedQuestionIds.length})</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel rounded-2xl p-4 mb-8 border border-slate-200 dark:border-white/10 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, topic, or role..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const isBookmarked = bookmarkedQuestionIds.includes(q.id);
          const isExpanded = expandedQuestionId === q.id;

          return (
            <div
              key={q.id}
              className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {q.category}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 capitalize">
                      {q.difficulty} Difficulty
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[11px] text-slate-400">
                      Topic: <strong>{q.topic}</strong>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug mb-2">
                    {q.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark(q.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-colors"
                    title="Bookmark"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-cyan-400 text-cyan-400' : ''}`} />
                  </button>

                  <button
                    onClick={() => startQuestionPractice(q)}
                    className="btn-primary px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Practice in 3D</span>
                  </button>
                </div>
              </div>

              {/* Accordion Trigger for Model STAR Answer & Hints */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                  className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isExpanded ? 'Hide Model STAR Answer & Hints' : 'View Model STAR Answer & AI Hints'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Expanded STAR Breakdown */}
              {isExpanded && (
                <div className="mt-4 p-5 rounded-2xl bg-slate-900/70 border border-cyan-500/20 text-xs text-slate-300 space-y-4 animate-in fade-in duration-200">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                      Structured STAR Model Answer
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <strong className="text-cyan-300 block mb-1">Situation:</strong>
                        <p className="text-slate-300 leading-relaxed">{q.sampleStarAnswer.situation}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <strong className="text-cyan-300 block mb-1">Task:</strong>
                        <p className="text-slate-300 leading-relaxed">{q.sampleStarAnswer.task}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <strong className="text-emerald-300 block mb-1">Action:</strong>
                        <p className="text-slate-300 leading-relaxed">{q.sampleStarAnswer.action}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <strong className="text-amber-300 block mb-1">Result:</strong>
                        <p className="text-slate-300 leading-relaxed">{q.sampleStarAnswer.result}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                      Key Interviewer Evaluation Criteria
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-400">
                      {q.keyEvaluationCriteria.map((crit, cIdx) => (
                        <li key={cIdx}>{crit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
