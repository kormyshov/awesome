import { taskDescriptionToPlainText } from './task_description.ts';


test('keeps ordinary task descriptions unchanged', () => {
    expect(taskDescriptionToPlainText('Call Alex about the contract')).toBe('Call Alex about the contract');
});

test('turns common Markdown into a compact list excerpt', () => {
    const description = [
        '## Release checklist',
        '',
        '- [x] Review the **final** copy',
        '- [ ] Send it to [Alex](https://example.com/alex)',
    ].join('\n');

    expect(taskDescriptionToPlainText(description)).toBe(
        'Release checklist Review the final copy Send it to Alex'
    );
});

test('truncates long descriptions', () => {
    expect(taskDescriptionToPlainText('A description that is too long', 14)).toBe('A description…');
});
