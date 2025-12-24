import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, XCircle, ArrowRight, Search, MessageCircle, Target, Scale } from 'lucide-react';

export default function GoNoGoEngine() {
  const [activePhase, setActivePhase] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scores, setScores] = useState({ problem: 0, market: 0, presale: 0 });
  const [showScorecard, setShowScorecard] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalScore = scores.problem + scores.market + scores.presale;
  const verdict = totalScore >= 20 ? 'GO' : totalScore >= 15 ? 'CAUTION' : 'NO-GO';

  const phases = [
    {
      id: 1,
      title: "Problem Archeology",
      days: "Days 1-4",
      icon: Search,
      color: "#42a5f5",
      goal: "Prove the problem exists in the wild",
      tasks: [
        "Document 30+ public pain signals",
        "Define ICP with surgical precision",
        "Craft one-sentence problem statement",
        "Map current workarounds"
      ],
      killSignal: "Can't find 30 strangers complaining publicly? STOP HERE.",
      deliverables: ["Problem Audit Worksheet", "Signal Documentation", "ICP Definition"]
    },
    {
      id: 2,
      title: "The Outreach Machine",
      days: "Days 5-9",
      icon: MessageCircle,
      color: "#66bb6a",
      goal: "Interview 20 strangers. No pitching. Pure listening.",
      tasks: [
        "Send 60 cold outreach messages",
        "Book 20 interviews using Anti-Pitch Script",
        "Extract willingness-to-pay data",
        "Categorize: Must-have vs Nice-to-have"
      ],
      killSignal: "Fewer than 10 out of 20 currently pay for solutions? RED FLAG.",
      deliverables: ["20 Interview Transcripts", "Willingness-to-Pay Matrix", "Feature Priority List"]
    },
    {
      id: 3,
      title: "The Smoke Test",
      days: "Days 10-12",
      icon: Target,
      color: "#ffa726",
      goal: "Get strangers to click a button. If they won't, don't build.",
      tasks: [
        "Build landing page in 60 minutes",
        "Drive 200+ cold visitors ($50-100 ads)",
        "Measure conversion on hard CTA",
        "Calculate objective conversion rate"
      ],
      killSignal: "Below 2% conversion on cold traffic? MARKET IS SPEAKING.",
      deliverables: ["Live Landing Page", "Conversion Data", "Traffic Analytics"]
    },
    {
      id: 4,
      title: "The Final Verdict",
      days: "Days 13-14",
      icon: Scale,
      color: "#ef5350",
      goal: "Let the math make the decision. No emotion. Just data.",
      tasks: [
        "Score Problem Severity (0-10)",
        "Score Market Opportunity (0-10)",
        "Score Pre-Sale Interest (0-10)",
        "Calculate total: Go if 20+, No-Go if <15"
      ],
      killSignal: "Score below 15? KILL IT. Move to next idea.",
      deliverables: ["Completed Scorecard", "Go/No-Go Decision", "Next Steps Roadmap"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-blue-50">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-800 z-50">
        <div 
          className="h-full bg-blue-400 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Blueprint Grid Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(66, 165, 245, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(66, 165, 245, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="border-4 border-blue-400 bg-slate-900/80 backdrop-blur p-12 mb-16 relative shadow-2xl shadow-blue-500/30">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-400 -mt-1 -ml-1" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-400 -mt-1 -mr-1" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-400 -mb-1 -ml-1" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-400 -mb-1 -mr-1" />
          
          <h1 className="text-6xl font-bold text-blue-400 text-center mb-4 tracking-wider uppercase">
            The Go/No-Go Engine
          </h1>
          <p className="text-2xl text-blue-300 text-center mb-8 font-light">
            14 Days to Validate Any Product Idea Before You Build
          </p>
          
          <div className="bg-red-900/30 border-l-4 border-red-500 p-6 backdrop-blur">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <p className="text-lg font-bold text-red-300 mb-2">Stop building products nobody wants.</p>
                <p className="text-blue-200">
                  The biggest risk for solo founders isn't bad code—it's spending six months building the wrong thing. 
                  You fall in love with an idea, develop the MVP, and launch to crickets. That is time you cannot get back.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Journey Map */}
        <div className="border-3 border-blue-400 bg-slate-900/60 backdrop-blur p-8 mb-16">
          <h2 className="text-4xl font-bold text-blue-400 text-center mb-12 uppercase tracking-widest">
            ⚡ Your 14-Day Validation Journey
          </h2>

          <div className="space-y-8">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isActive = activePhase === phase.id;
              
              return (
                <div key={phase.id}>
                  <div 
                    className={`border-2 bg-slate-800/50 p-6 cursor-pointer transition-all duration-300 ${
                      isActive ? 'border-blue-400 shadow-lg shadow-blue-500/50 scale-[1.02]' : 'border-slate-600 hover:border-blue-500'
                    }`}
                    onClick={() => setActivePhase(isActive ? null : phase.id)}
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-full border-3 flex items-center justify-center text-2xl font-bold transition-colors duration-300`}
                          style={{ 
                            borderColor: phase.color,
                            backgroundColor: isActive ? phase.color : 'transparent',
                            color: isActive ? '#0f172a' : phase.color
                          }}
                        >
                          {phase.id}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon size={32} style={{ color: phase.color }} />
                          <div>
                            <h3 className="text-2xl font-bold" style={{ color: phase.color }}>
                              {phase.title}
                            </h3>
                            <p className="text-blue-300 italic">{phase.days}</p>
                          </div>
                        </div>

                        <p className="text-blue-100 text-lg mb-4">{phase.goal}</p>

                        {isActive && (
                          <div className="mt-6 space-y-4 animate-in fade-in duration-300">
                            <div>
                              <h4 className="text-blue-400 font-bold mb-2">Tasks:</h4>
                              {phase.tasks.map((task, i) => (
                                <div key={i} className="flex items-start gap-2 mb-2">
                                  <ArrowRight size={16} className="text-blue-400 flex-shrink-0 mt-1" />
                                  <span className="text-blue-200">{task}</span>
                                </div>
                              ))}
                            </div>

                            <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-4">
                              <div className="flex items-start gap-2">
                                <AlertCircle size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                                <p className="text-yellow-200 font-bold">{phase.killSignal}</p>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-blue-400 font-bold mb-2">Deliverables:</h4>
                              <div className="flex flex-wrap gap-2">
                                {phase.deliverables.map((item, i) => (
                                  <span key={i} className="px-3 py-1 bg-blue-500/20 border border-blue-400 text-blue-300 text-sm">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <ArrowRight 
                        size={24} 
                        className={`text-blue-400 transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`}
                      />
                    </div>
                  </div>

                  {index < phases.length - 1 && (
                    <div className="flex justify-center py-4">
                      <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-transparent" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Scorecard */}
        <div className="border-3 border-red-400 bg-red-900/20 backdrop-blur p-8 mb-16">
          <h2 className="text-4xl font-bold text-red-400 text-center mb-6 uppercase tracking-widest">
            🎲 The Decision Framework
          </h2>
          <p className="text-center text-blue-200 mb-8 text-lg">
            This system replaces "I hope this works" with "The data says they want this."
          </p>

          <button
            onClick={() => setShowScorecard(!showScorecard)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 mb-6 transition-all duration-300 uppercase tracking-wider"
          >
            {showScorecard ? 'Hide' : 'Try'} Interactive Scorecard
          </button>

          {showScorecard && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {[
                { key: 'problem', label: 'Problem Severity', desc: 'Do people currently pay to solve this?' },
                { key: 'market', label: 'Market Opportunity', desc: 'Can you reach 10,000+ potential customers?' },
                { key: 'presale', label: 'Pre-Sale Interest', desc: 'Did 5%+ convert on your landing page?' }
              ].map(({ key, label, desc }) => (
                <div key={key} className="border-2 border-blue-400 bg-slate-800/50 p-6">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-blue-400">{label}</h3>
                      <p className="text-sm text-blue-300">{desc}</p>
                    </div>
                    <span className="text-4xl font-bold text-blue-400">{scores[key]}/10</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={scores[key]}
                    onChange={(e) => setScores({ ...scores, [key]: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              ))}

              <div className={`border-4 p-8 text-center ${
                verdict === 'GO' ? 'border-green-400 bg-green-900/30' :
                verdict === 'CAUTION' ? 'border-yellow-400 bg-yellow-900/30' :
                'border-red-400 bg-red-900/30'
              }`}>
                <div className="flex items-center justify-center gap-4 mb-4">
                  {verdict === 'GO' && <CheckCircle size={48} className="text-green-400" />}
                  {verdict === 'CAUTION' && <AlertCircle size={48} className="text-yellow-400" />}
                  {verdict === 'NO-GO' && <XCircle size={48} className="text-red-400" />}
                  <div>
                    <p className="text-sm text-blue-300">Total Score</p>
                    <p className="text-6xl font-bold" style={{
                      color: verdict === 'GO' ? '#4ade80' : verdict === 'CAUTION' ? '#fbbf24' : '#f87171'
                    }}>
                      {totalScore}/30
                    </p>
                  </div>
                </div>
                <p className="text-3xl font-bold mb-2" style={{
                  color: verdict === 'GO' ? '#4ade80' : verdict === 'CAUTION' ? '#fbbf24' : '#f87171'
                }}>
                  {verdict}
                </p>
                <p className="text-blue-200">
                  {verdict === 'GO' && '✓ Strong signal. Build the Concierge MVP immediately.'}
                  {verdict === 'CAUTION' && '⚠ Mixed signals. Address gaps before committing.'}
                  {verdict === 'NO-GO' && '✗ Kill it. Save yourself months. Move to next idea.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Value Stack */}
        <div className="border-3 border-blue-400 bg-slate-900/80 backdrop-blur p-8 mb-16">
          <h2 className="text-4xl font-bold text-blue-400 text-center mb-8 uppercase tracking-widest">
            What You Get: The Complete Validation Toolkit
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              { title: '📘 40-Page Blueprint', items: ['Problem Audit Worksheet', 'Interview Matrix', 'Landing Page Checklist', 'Scoring Matrix'] },
              { title: '📊 Decision Scorecard', items: ['Automated Spreadsheet', 'Weighted Evaluation', 'Visual Dashboard', 'Go/No-Go Thresholds'] },
              { title: '💬 60+ Script Library', items: ['Anti-Pitch Templates', 'LinkedIn Outreach', 'Reddit Approaches', 'Follow-Up Sequences'] },
              { title: '🛠️ No-Code Toolkit', items: ['Landing Page Builders', 'Ad Platform Guide', 'Conversion Tracking', 'Budget Framework'] }
            ].map((section, i) => (
              <div key={i} className="border-2 border-green-400 bg-green-900/10 p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-blue-200">
                      <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">
              Built for Analytical Solo Founders Who Hate Ambiguity
            </h3>
            <p className="text-xl text-blue-200 mb-6">
              Kill bad ideas fast. Protect your time. Launch with confidence.
            </p>
            
            {/* IMPORTANT: Replace YOUR-GUMROAD-LINK-HERE with your actual Gumroad product URL */}
            <a href="https://YOUR-GUMROAD-LINK-HERE.gumroad.com/l/gonogo-engine" target="_blank" rel="noopener noreferrer">
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold py-4 px-12 transition-all duration-300 uppercase tracking-wider shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70">
                Download The Complete System - $49
              </button>
            </a>
            
            <p className="text-blue-300 mt-4">
              ✓ Instant download • ✓ All templates included • ✓ No subscription
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t-2 border-blue-400 pt-8">
          <p className="text-blue-300 text-lg">
            Stop guessing. Stop wasting time on weak launches. Get objective proof.
          </p>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #42a5f5;
          cursor: pointer;
          border: 2px solid #1e293b;
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #42a5f5;
          cursor: pointer;
          border: 2px solid #1e293b;
        }
      `}</style>
    </div>
  );
}