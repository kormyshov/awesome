import { findLinkCandidates } from './task_description_links.ts';

describe('findLinkCandidates', () => {
  it('finds HTTP links and trims sentence punctuation', () => {
    expect(findLinkCandidates('See https://ya.ru, then http://example.com/path.')).toEqual([
      {
        start: 4,
        end: 17,
        href: 'https://ya.ru',
        text: 'https://ya.ru',
      },
      {
        start: 24,
        end: 47,
        href: 'http://example.com/path',
        text: 'http://example.com/path',
      },
    ]);
  });

  it('normalizes www links to HTTPS', () => {
    expect(findLinkCandidates('Open www.example.com')).toEqual([
      {
        start: 5,
        end: 20,
        href: 'https://www.example.com',
        text: 'www.example.com',
      },
    ]);
  });

  it('ignores ordinary text and email addresses', () => {
    expect(findLinkCandidates('ya.ru and mail@example.com')).toEqual([]);
  });
});
