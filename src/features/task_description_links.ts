export type LinkCandidate = {
  end: number;
  href: string;
  start: number;
  text: string;
};

const LINK_PATTERN = /\b(?:https?:\/\/|www\.)[^\s<>{}\u005B\u005D"']+/gi;
const SIMPLE_TRAILING_PUNCTUATION = /[.,!?;:]$/;

function trimLinkText(value: string) {
  let result = value;

  while (SIMPLE_TRAILING_PUNCTUATION.test(result)) {
    result = result.slice(0, -1);
  }

  const pairs: Array<[string, string]> = [
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
  ];

  for (const [opening, closing] of pairs) {
    while (
      result.endsWith(closing) &&
      result.split(closing).length > result.split(opening).length
    ) {
      result = result.slice(0, -1);
    }
  }

  return result;
}

export function findLinkCandidates(text: string): LinkCandidate[] {
  return Array.from(text.matchAll(LINK_PATTERN)).flatMap((match) => {
    const rawText = match[0];
    const linkText = trimLinkText(rawText);
    const start = match.index;

    if (start === undefined || !linkText) {
      return [];
    }

    return [{
      start,
      end: start + linkText.length,
      href: linkText.toLowerCase().startsWith('www.') ? `https://${linkText}` : linkText,
      text: linkText,
    }];
  });
}
