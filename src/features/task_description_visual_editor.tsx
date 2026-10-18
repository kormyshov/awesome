import React, { useEffect, useRef } from 'react';

import { Crepe, CrepeFeature } from '@milkdown/crepe';
import { editorViewOptionsCtx } from '@milkdown/kit/core';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';

import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/frame.css';


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
          text: 'Add notes, links, checklists, or code…',
          mode: 'doc',
        },
      },
    }).on((listener) => {
      listener.markdownUpdated((_ctx, markdown) => {
        onChangeRef.current(markdown);
      });
    });

    editor.editor.config((ctx) => {
      ctx.update(editorViewOptionsCtx, (options) => ({
        ...options,
        attributes: {
          'aria-label': 'Task description',
        },
      }));
    });

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
