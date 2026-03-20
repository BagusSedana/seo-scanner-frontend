import type { Metadata } from "next";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
   const { slug } = await params;
   return <div>Slug: {slug}</div>;
}
