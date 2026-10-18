import React, { Suspense, useState } from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type TaskDescriptionEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const VisualEditor = React.lazy(() => import('./task_description_visual_editor.tsx'));

export default function TaskDescriptionEditor({ value, onChange }: TaskDescriptionEditorProps) {
  const [mode, setMode] = useState<'visual' | 'markdown'>('visual');

  const handleModeChange = (_event: React.MouseEvent<HTMLElement>, nextMode: 'visual' | 'markdown' | null) => {
    if (nextMode !== null) {
      setMode(nextMode);
    }
  };

  return (
    <FormControl className="taskDescriptionEditor" fullWidth>
      <Box className="taskDescriptionHeader">
        <FormLabel id="task-description-mode-label">Description</FormLabel>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          aria-labelledby="task-description-mode-label"
          size="small"
        >
          <ToggleButton value="visual" aria-label="Visual editor">
            Visual
          </ToggleButton>
          <ToggleButton value="markdown" aria-label="Markdown source">
            Markdown
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {mode === 'visual' ? (
        <Suspense fallback={<div className="taskDescriptionMilkdown taskDescriptionLoading">Loading editor…</div>}>
          <VisualEditor value={value} onChange={onChange} />
        </Suspense>
      ) : (
        <TextField
          id="task_description"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          inputProps={{ 'aria-label': 'Task description in Markdown' }}
          multiline
          minRows={7}
          maxRows={18}
          fullWidth
        />
      )}

    </FormControl>
  );
}
