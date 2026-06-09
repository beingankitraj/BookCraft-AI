
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { BookOpen, PenTool, Library, Sparkles } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  const navigationItems = [
    {
      title: "Create Book",
      url: createPageUrl("Create"),
      icon: PenTool,
      description: "Generate new books with AI"
    },
    {
      title: "My Library",
      url: createPageUrl("Library"),
      icon: Library,
      description: "Browse your created books"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-slate-100">
      <style>
        {`
          :root {
            --primary-navy: #1a2b4c;
            --warm-white: #fefcf6;
            --gold-accent: #c9a96e;
            --soft-gray: #f8f6f0;
            --text-primary: #2d3748;
            --text-secondary: #718096;
          }
        `}
      </style>
      
      <header className="border-b border-amber-200/30 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl("Create")} className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">BookCraft AI</h1>
                <p className="text-xs text-slate-500">Intelligent Book Generation</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.url
                      ? 'bg-amber-100 text-amber-800 shadow-sm'
                      : 'text-slate-600 hover:bg-white/80 hover:text-slate-800 hover:shadow-sm'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.title}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-slate-600">AI Powered</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-amber-200/30 bg-white/50 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-slate-500 text-sm">
              Create beautiful books with the power of artificial intelligence
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-sm border-t border-amber-200/30 px-4 py-2">
        <div className="flex justify-around">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-200 ${
                location.pathname === item.url
                  ? 'bg-amber-100 text-amber-800'
                  : 'text-slate-600 hover:bg-amber-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
