import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          IPTV Subscriptions & Guides
        </h1>
        <p className="text-xl text-gray-500">
          Your reliable source for everything IPTV.
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
            {post.image && (
              <img 
                src={post.image} 
                alt={post.altText || post.title} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 line-clamp-2">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-500 mb-4 line-clamp-3">{post.description}</p>
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                Read full article →
              </Link>
            </div>
          </article>
        ))}
        {posts.length === 0 && (
          <p className="text-gray-500 col-span-full text-center py-10">No articles published yet.</p>
        )}
      </div>
    </main>
  );
}
