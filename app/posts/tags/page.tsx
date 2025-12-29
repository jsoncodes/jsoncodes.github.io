import { Metadata } from 'next';
import { getAllTags } from '@/lib/posts';
import { TagsIndexContent } from '@/components/TagsIndexContent';

export const metadata: Metadata = {
  title: 'Post Tags'
};

export default function TagsIndexPage() {
  const tags = getAllTags();

  return <TagsIndexContent tags={tags} />;
}
