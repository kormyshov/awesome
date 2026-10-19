import type { Node as ProseNode } from '@milkdown/kit/prose/model';

import { inlineCodeSchema, linkSchema } from '@milkdown/kit/preset/commonmark';
import { Plugin } from '@milkdown/kit/prose/state';
import { $prose } from '@milkdown/kit/utils';

import { findLinkCandidates } from './task_description_links.ts';

type TextBlock = {
  positions: number[];
  text: string;
};

function getTextBlock(node: ProseNode, position: number): TextBlock {
  const positions: number[] = [];
  let text = '';

  node.forEach((child, offset) => {
    if (child.isText && child.text) {
      text += child.text;
      for (let index = 0; index < child.text.length; index += 1) {
        positions.push(position + 1 + offset + index);
      }
      return;
    }

    text += '\uFFFC';
    positions.push(position + 1 + offset);
  });

  return { positions, text };
}

export const taskDescriptionAutoLink = $prose((ctx) => {
  const linkType = linkSchema.type(ctx);
  const inlineCodeType = inlineCodeSchema.type(ctx);

  return new Plugin({
    appendTransaction: (transactions, _oldState, newState) => {
      if (!transactions.some((transaction) => transaction.docChanged)) {
        return null;
      }

      const transaction = newState.tr;
      let changed = false;

      newState.doc.descendants((node, position) => {
        if (!node.isTextblock || node.type.name === 'code_block') {
          return;
        }

        const { positions, text } = getTextBlock(node, position);
        const candidates = findLinkCandidates(text).flatMap((candidate) => {
          const from = positions[candidate.start];
          const lastPosition = positions[candidate.end - 1];

          if (from === undefined || lastPosition === undefined) {
            return [];
          }

          return [{ ...candidate, from, to: lastPosition + 1 }];
        });
        const cleanedRanges: Array<{ from: number; to: number }> = [];

        node.forEach((child, offset) => {
          if (!child.isText) {
            return;
          }

          const link = linkType.isInSet(child.marks);
          if (!link) {
            return;
          }

          const from = position + 1 + offset;
          const to = from + child.nodeSize;
          const matchingCandidate = candidates.find((candidate) => (
            link.attrs.href.startsWith(candidate.href) || candidate.href.startsWith(link.attrs.href)
          ));

          if (
            matchingCandidate &&
            (from < matchingCandidate.from || to > matchingCandidate.to || link.attrs.href !== matchingCandidate.href)
          ) {
            transaction.removeMark(from, to, linkType);
            cleanedRanges.push({ from, to });
            changed = true;
          }
        });

        for (const candidate of candidates) {
          const existingHrefs = new Set<string>();
          let containsInlineCode = false;
          let containsUnlinkedText = false;

          newState.doc.nodesBetween(candidate.from, candidate.to, (child) => {
            if (!child.isText) {
              return;
            }

            if (inlineCodeType.isInSet(child.marks)) {
              containsInlineCode = true;
            }

            const link = linkType.isInSet(child.marks);
            if (link) {
              existingHrefs.add(link.attrs.href);
            } else {
              containsUnlinkedText = true;
            }
          });

          const overlapsCleanedRange = cleanedRanges.some(({ from, to }) => (
            from < candidate.to && to > candidate.from
          ));

          if (overlapsCleanedRange) {
            existingHrefs.clear();
            containsUnlinkedText = true;
          }

          if (containsInlineCode) {
            continue;
          }

          if (!containsUnlinkedText && existingHrefs.size === 1 && existingHrefs.has(candidate.href)) {
            continue;
          }

          const canUpdateExistingLink = Array.from(existingHrefs).every((href) => (
            href.startsWith(candidate.href) || candidate.href.startsWith(href)
          ));

          if (existingHrefs.size > 0 && !canUpdateExistingLink) {
            continue;
          }

          transaction
            .removeMark(candidate.from, candidate.to, linkType)
            .addMark(candidate.from, candidate.to, linkType.create({ href: candidate.href, title: null }));
          changed = true;
        }
      });

      return changed ? transaction : null;
    },
  });
});
