import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) return { title: 'Not Found' };
  
  return {
    title: post.title,
    description: post.description,
  };
}

const CTAButtons = () => (
  <div className="my-12 p-8 border-2 border-dashed border-blue-100 rounded-3xl bg-blue-50/50 text-center space-y-6">
    <h3 className="text-2xl font-extrabold text-gray-900">Ready to Upgrade Your IPTV Experience? 📺</h3>
    <p className="text-gray-600 max-w-md mx-auto">Get access to premium 4K channels, buffer-free sports, and 24/7 support from our trusted partners.</p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
      <a 
        href="https://xstreamiptv.co.uk/" 
        target="_blank"
        className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition shadow-lg"
      >
        XSTREAM IPTV UK
      </a>
      <a 
        href="https://goodiptvhub.com/" 
        target="_blank"
        className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg"
      >
        GOOD IPTV HUB
      </a>
      <a 
        href="https://iptvmembership.store/" 
        target="_blank"
        className="w-full sm:w-auto px-8 py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition shadow-lg"
      >
        4K MEMBERSHIP
      </a>
    </div>
    <div className="pt-4">
      <a 
        href="https://api.whatsapp.com/send?phone=447871743874&text=I%20WANT%20MY%20TRIAL%20BEFORE%20PURCHASE%20%F0%9F%98%80"
        className="text-green-600 font-bold hover:underline flex items-center justify-center gap-2"
      >
        <span>Or Start a 24H Trial via WhatsApp</span> →
      </a>
    </div>
  </div>
);

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const displayImage = post.image || 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80';

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">
            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-gray-900 mb-8 leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="mb-12 relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src={displayImage} 
            alt={post.altText || post.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-xl prose-blue dark:prose-invert max-w-none 
          prose-headings:font-black prose-headings:tracking-tight
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-3xl prose-img:shadow-lg">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        <CTAButtons />
      </article>
    </main>
  );
}
