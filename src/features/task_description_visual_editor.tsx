import React, { useEffect, useRef } from 'react';

import { Crepe, CrepeFeature } from '@milkdown/crepe';
import type { TopBarFeatureConfig } from '@milkdown/crepe/feature/top-bar';
import { editorViewOptionsCtx } from '@milkdown/kit/core';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';

import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/frame.css';

import { taskDescriptionAutoLink } from './task_description_autolink.ts';


const hiddenTopBarItems = new Set(['heading-selector', 'code', 'code-block', 'hr', 'quote']);
type TopBarBuilder = Parameters<NonNullable<TopBarFeatureConfig['buildTopBar']>>[0];

function simplifyTopBar(builder: TopBarBuilder) {
  const groups = builder.build();

  for (const group of groups) {
    group.items = group.items.filter((item) => !hiddenTopBarItems.has(item.key));
  }

  groups.splice(0, groups.length, ...groups.filter((group) => group.items.length > 0));
}


type TaskDescriptionVisualEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

function MilkdownEditor({ value, onChange }: TaskDescriptionVisualEditorProps) {
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const { loading } = useEditor((root) => {
    const editor = new Crepe({
      root,
      defaultValue: value,
      features: {
        [CrepeFeature.ImageBlock]: false,
        [CrepeFeature.BlockEdit]: false,
        [CrepeFeature.Table]: false,
        [CrepeFeature.Latex]: false,
        [CrepeFeature.TopBar]: true,
        [CrepeFeature.AI]: false,
      },
      featureConfigs: {
        [CrepeFeature.Placeholder]: {
          text: 'Add notes, links, or checklists…',
          mode: 'doc',
        },
        [CrepeFeature.TopBar]: {
          buildTopBar: simplifyTopBar,
        },
      },
    }).on((listener) => {
      listener.markdownUpdated((_ctx, markdown) => {
        onChangeRef.current(markdown);
      });
    });

    editor.editor
      .config((ctx) => {
        ctx.update(editorViewOptionsCtx, (options) => ({
          ...options,
          attributes: {
            'aria-label': 'Task description',
          },
        }));
      })
      .use(taskDescriptionAutoLink);

    return editor;
  }, []);

  return (
    <div className={`taskDescriptionMilkdown${loading ? ' isLoading' : ''}`}>
      <Milkdown />
      {loading ? <div className="taskDescriptionLoading">Loading editor…</div> : null}
    </div>
  );
}

export default function TaskDescriptionVisualEditor(props: TaskDescriptionVisualEditorProps) {
  return (
    <MilkdownProvider>
      <MilkdownEditor {...props} />
    </MilkdownProvider>
  );
}
