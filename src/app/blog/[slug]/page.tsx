import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Head from 'next/head';

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
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [{ url: post.image, alt: post.altText }] : [],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Schema generation
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: [{
      '@type': 'Organization',
      name: 'IPTV Blog',
      url: 'https://yourwebsite.com'
    }]
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <article>
        <header className="mb-10 text-center">
          <p className="text-sm text-gray-500 mb-2">
            Published on {new Date(post.date).toLocaleDateString()}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            {post.title}
          </h1>
        </header>

        {post.image && (
          <div className="mb-10">
            <img 
              src={post.image} 
              alt={post.altText || post.title} 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none prose-a:text-blue-600 hover:prose-a:text-blue-500">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
