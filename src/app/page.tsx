import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <header className="mb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-900">
          Unlock Ultimate TV <br/> with Premium IPTV
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Expert guides, deep-dive reviews, and the best subscription deals for users in the UK, USA, and beyond.
        </p>
      </header>

      <section className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="group relative flex flex-col bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10">
              <span className="sr-only">View Post</span>
            </Link>
            
            <div className="relative h-64 w-full overflow-hidden">
              <img 
                src={post.image || 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80'} 
                alt={post.altText || post.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            <div className="p-8 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-widest">
                  News & Guides
                </span>
                <span className="text-gray-400 text-xs font-medium italic">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              
              <p className="text-gray-500 line-clamp-3 mb-6 flex-1 italic leading-relaxed">
                {post.description}
              </p>
              
              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                <span className="text-blue-600 font-black text-sm group-hover:gap-2 flex items-center transition-all">
                  READ ARTICLE <span className="ml-1">→</span>
                </span>
              </div>
            </div>
          </article>
        ))}
        
        {posts.length === 0 && (
          <div className="col-span-full py-32 text-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium text-lg">No articles have been published to the engine yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}
