import { ItemListPredicate } from '@blueprintjs/select';
import { Option } from './types';

function escapeRegExpChars(text: string) {
  return text.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
}

// Default `highglightText` function provdied by Blueprint docs
// https://github.com/palantir/blueprint/blob/develop/packages/docs-app/src/common/films.tsx
export function highlightText(text: string, query: string) {
  let lastIndex = 0;
  const words = query
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(escapeRegExpChars);
  if (words.length === 0) {
    return [text];
  }
  const regexp = new RegExp(words.join('|'), 'gi');
  const tokens: React.ReactNode[] = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const match = regexp.exec(text);
    if (!match) {
      break;
    }
    const length = match[0].length;
    const before = text.slice(lastIndex, regexp.lastIndex - length);
    if (before.length > 0) {
      tokens.push(before);
    }
    lastIndex = regexp.lastIndex;
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }
  const rest = text.slice(lastIndex);
  if (rest.length > 0) {
    tokens.push(rest);
  }
  return tokens;
}

/**
 * Returns the list of suggested items after a query input by the user
 *
 * Our select implementation supports suggesting items either from the label or value;
 * if we found an exact match, we should just return that item. Otherwise, return approximated items.
 * All comparisons are normalized to lower case to extend results
 */
export const getFilteredList: ItemListPredicate<Option> = (
  currQuery,
  items,
) => {
  const normalizedQuery = currQuery.toLowerCase();

  const exactMatch = items.find(
    item =>
      item.label.toLowerCase() === normalizedQuery ||
      item.value.toLowerCase() === normalizedQuery,
  );
  if (exactMatch) {
    return [exactMatch];
  }

  return items.filter(
    item => getText(item).toLowerCase().indexOf(normalizedQuery) >= 0,
  );
};

export const getText = (item: Option) => `${item.label} | ${item.value}`;
