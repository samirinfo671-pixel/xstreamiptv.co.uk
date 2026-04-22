import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) return { title: 'Not Found' };
  
  return {
    title: `${post.title} | XSTREAM IPTV`,
    description: post.description,
  };
}

const WhatsAppCTA = () => (
  <div className="my-16 p-10 relative overflow-hidden rounded-[2.5rem] bg-slate-900 text-center group ring-8 ring-slate-50">
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -z-0" />
    <div className="relative z-10">
      <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
        Ready to Join the #1 <br className="hidden sm:block"/> IPTV Provider in the UK? 🇬🇧
      </h3>
      <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto font-medium leading-relaxed">
        Don’t settle for buffering. Message our experts now to get your premium 24-hour trial and start watching in 4K immediately.
      </p>
      <div className="flex flex-col items-center gap-6">
        <a 
          href="https://api.whatsapp.com/send?phone=447871743874&text=I%20WANT%20MY%20TRIAL%20BEFORE%20PURCHASE%20%F0%9F%98%80"
          className="w-full sm:w-auto px-12 py-6 bg-green-500 text-white rounded-2xl font-black text-xl hover:bg-green-600 transition-all shadow-[0_20px_40px_-10px_rgba(34,197,94,0.3)] hover:-translate-y-1 active:scale-95"
        >
          Message on WhatsApp →
        </a>
        <div className="flex items-center gap-8 justify-center opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
           <img src="https://xstreamiptv.co.uk/logo.png" alt="Trusted Partner" className="h-4 hidden" />
           <p className="text-[10px] font-black tracking-widest text-white uppercase">Official Partner: XSTREAM IPTV UK | GOOD IPTV HUB | 4K MEMBERSHIP</p>
        </div>
      </div>
    </div>
  </div>
);

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Smart Do-Follow Link Mapping
  // This helps prevent 404s when the AI generates links like /blog/best-iptv
  const contentProcessing = (content: string) => {
    return content.replace(/\[([^\]]+)\]\(\/blog\/([^\)]+)\)/g, (match, text, link) => {
      // Find the closest real slug. If none found, fallback to home
      const allSlugs = getAllPostSlugs();
      if (!allSlugs.includes(link)) {
        // Find if the link is a substring of any real slug
        const closestMatch = allSlugs.find(s => s.includes(link.split('-')[0]));
        return closestMatch ? `[${text}](/blog/${closestMatch})` : `[${text}](/)`;
      }
      return match;
    });
  };

  const processedContent = contentProcessing(post.content);

  return (
    <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 animate-in fade-in duration-700">
      <article className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-16">
          <div className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-6 sm:mb-8 border border-blue-100">
             Official Editorial Guide
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6 sm:mb-10 leading-[1.1] sm:leading-[1.05]">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold text-slate-400">
             <span>By XSTREAM Editor</span>
             <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
             <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>

        <div className="mb-12 sm:mb-20 relative aspect-video sm:aspect-[21/9] w-full rounded-2xl sm:rounded-[3.5rem] overflow-hidden shadow-2xl group ring-1 ring-slate-100">
          <img 
            src={post.image || 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80'} 
            alt={post.altText || post.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
        </div>

        <div className="prose prose-lg sm:prose-xl lg:prose-2xl prose-slate max-w-none 
          prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
          prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium
          prose-a:text-blue-600 prose-a:font-black prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-3xl sm:prose-img:rounded-[2.5rem] prose-img:shadow-2xl 
          prose-blockquote:border-l-blue-600 prose-blockquote:bg-slate-50 prose-blockquote:p-6 sm:prose-blockquote:p-8 
          prose-blockquote:rounded-2xl sm:prose-blockquote:rounded-3xl prose-blockquote:not-italic prose-blockquote:text-lg sm:prose-blockquote:text-xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {processedContent}
          </ReactMarkdown>
        </div>

        <WhatsAppCTA />

        <div className="mt-20 pt-16 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-8">
           <Link href="/" className="p-8 rounded-3xl bg-slate-50 hover:bg-slate-100 transition-colors flex items-center gap-4 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm leading-none group-hover:-translate-x-1 transition-transform">←</div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Navigation</p>
                 <p className="font-bold text-slate-900 uppercase">Back to Expertise Hub</p>
              </div>
           </Link>
           <a href="https://api.whatsapp.com/send?phone=447871743874" className="p-8 rounded-3xl bg-green-50 hover:bg-green-100 transition-colors flex items-center justify-between group">
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-green-600 mb-1">Direct Help</p>
                 <p className="font-bold text-slate-900 uppercase">Need Chat Support?</p>
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm leading-none group-hover:translate-x-1 transition-transform">🚀</div>
           </a>
        </div>
      </article>
    </main>
  );
}
