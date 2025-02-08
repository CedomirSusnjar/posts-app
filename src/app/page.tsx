import { Page } from '@/components';

export const metadata = {
  title: 'Homepage',
  description: 'This is a description of home page',
  openGraph: {
    title: 'Articles',
    description: 'This is a description of home page',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function Homepage() {
  return (
    <Page>
      <div className="flex justify-center items-center text-2xl mb-5">
        Welcome to your favourite website for surfing the news!
      </div>
      <div className="flex justify-center items-center text-2xl mb-5">
        Check &apos;Articles&apos; link to see best articles today!
      </div>
      <div className="flex justify-center items-center text-2xl">
        Under &apos;Favourites&apos; you will see articles you marked as your&apos;s best
      </div>
    </Page>
  );
}
