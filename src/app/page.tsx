import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-blue-50/50 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-32">
        <header className="mb-24 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black uppercase tracking-widest mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            #1 Rated IPTV Intelligence 2026
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tightest leading-[0.9] mb-10 text-slate-900 drop-shadow-sm">
            Experience TV <br/> Without <span className="text-blue-600">Limits.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-medium leading-relaxed mb-12">
            The ultimate blueprint for premium streaming. We analyze, rate, and guide you through the best 4K IPTV providers in the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://api.whatsapp.com/send?phone=447871743874&text=I%20WANT%20MY%20TRIAL%20BEFORE%20PURCHASE" 
              className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-blue-200 hover:bg-blue-700 transition hover:-translate-y-1 active:scale-95"
            >
              Get Instant Web Access ⚡️
            </a>
          </div>
        </header>

        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="group relative flex flex-col bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10" />
              
              <div className="relative h-72 w-full overflow-hidden">
                <img 
                  src={post.image || 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80'} 
                  alt={post.altText || post.title} 
                  className="w-full h-full object-cover grayscale-[0.2] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute top-6 left-6 z-20">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-xl border border-white/20">
                    Must Read
                  </span>
                </div>
              </div>
              
              <div className="p-10 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-1 h-3 bg-blue-600 rounded-full" />
                   <span className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                  </span>
                </div>
                
                <h2 className="text-3xl font-black text-slate-900 mb-6 leading-[1.1] group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-slate-500 line-clamp-3 mb-8 flex-1 leading-relaxed font-body">
                  {post.description}
                </p>
                
                <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-slate-900 font-black text-sm tracking-tight flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    Explore Setup <span className="text-blue-600">→</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
          
          {posts.length === 0 && (
            <div className="col-span-full py-40 text-center bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <div className="w-8 h-8 rounded-full border-2 border-slate-100 border-t-blue-600 animate-spin" />
               </div>
               <p className="text-slate-400 font-bold text-xl">The AI content engine is initializing...</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
