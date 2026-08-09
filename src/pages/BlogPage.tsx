import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Sparkles, Clock, ArrowRight, User } from 'lucide-react';

interface BlogPageProps {
  navigate: (path: string) => void;
  selectedSlug?: string;
}

export const BlogPage: React.FC<BlogPageProps> = ({ navigate, selectedSlug }) => {
  const { blogs } = useApp();

  const selectedPost = selectedSlug ? blogs.find((b) => b.slug === selectedSlug) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {selectedPost ? (
        <div className="space-y-8 max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            ← Back to Insights Blog
          </button>

          <article className="bg-[#080808] border border-white/10 rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[#F27D26] text-[10px] font-extrabold uppercase tracking-widest">
                {selectedPost.category} • {selectedPost.readTime}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
                {selectedPost.title}
              </h1>

              <div className="flex items-center gap-3 pt-2">
                <img
                  src={selectedPost.author.avatar}
                  alt={selectedPost.author.name}
                  className="w-10 h-10 rounded-full border border-white/10 object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-white uppercase">{selectedPost.author.name}</div>
                  <div className="text-[11px] text-zinc-500">{selectedPost.author.role} • {selectedPost.publishedAt}</div>
                </div>
              </div>
            </div>

            <img
              src={selectedPost.coverImage}
              alt={selectedPost.title}
              className="w-full h-80 object-cover rounded-2xl border border-white/10"
            />

            <div className="text-zinc-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-4 font-normal">
              {selectedPost.content}
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
              {selectedPost.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-zinc-950 border border-white/10 text-[11px] font-bold text-zinc-400 rounded-md uppercase">
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        </div>
      ) : (
        <>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-[#F27D26] text-[10px] font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
              Industry Insights & Strategies
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Engineering & Digital Growth Blog
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Actionable guides on web performance, Gemini AI automation, branding conversion strategies, and scaling digital products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((post) => (
              <div
                key={post.id}
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="bg-[#080808] hover:bg-zinc-900 border border-white/10 hover:border-[#F27D26] rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer shadow-xl flex flex-col justify-between"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#050505]/90 border border-white/10 rounded-full text-[10px] font-extrabold text-[#F27D26] uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-[11px] text-zinc-500 font-semibold">{post.publishedAt} • {post.readTime}</div>
                    <h3 className="text-lg font-black text-white group-hover:text-[#F27D26] transition-colors uppercase tracking-tight">
                      {post.title}
                    </h3>
                    <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white group-hover:text-[#F27D26]">
                    <span className="uppercase tracking-wider">Read Full Article</span>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#F27D26] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
