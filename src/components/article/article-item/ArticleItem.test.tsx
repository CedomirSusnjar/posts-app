import { render, screen } from '@testing-library/react';
import { describe } from 'node:test';
import '@testing-library/jest-dom';

import { ArticleItem } from './ArticleItem';
import { AppProvider } from '@/context/AppContext';

const article = {
  author: 'Mark Markoni',
  title: 'Test article',
  description: 'Test article description',
  url: 'fake-url.com',
  urlToImage: '/fake-url-to-image.com',
  publishedAt: '07-07-22',
  content: 'This is content for testing article',
  source: { id: null, name: 'article publisher name' },
};

describe('<ArticleItem />', () => {
  test('renders with provided data', () => {
    render(
      <AppProvider>
        <ArticleItem {...article} />
      </AppProvider>,
    );
    expect(screen.getByTestId('article-author')).toBeInTheDocument();
  });
});
