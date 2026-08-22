import { configureTelegramBackButton, shouldShowTelegramBackButton } from './telegram_back_button.ts';

describe('Telegram BackButton', () => {
  const show = jest.fn();
  const hide = jest.fn();
  const onClick = jest.fn();
  const offClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('is visible only on nested routes', () => {
    expect(shouldShowTelegramBackButton('/')).toBe(false);
    expect(shouldShowTelegramBackButton('/projects')).toBe(false);
    expect(shouldShowTelegramBackButton('/tasks/new/inbox')).toBe(true);
    expect(shouldShowTelegramBackButton('/projects/project-1/edit')).toBe(true);
  });

  it('registers the back handler and removes it during cleanup', () => {
    const onBack = jest.fn();
    const backButton = { show, hide, onClick, offClick };
    const cleanup = configureTelegramBackButton(backButton, true, onBack);

    expect(show).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(onBack);

    cleanup?.();

    expect(offClick).toHaveBeenCalledWith(onBack);
    expect(hide).toHaveBeenCalledTimes(1);
  });

  it('hides the button on a root route without adding a handler', () => {
    const backButton = { show, hide, onClick, offClick };

    configureTelegramBackButton(backButton, false, jest.fn());

    expect(hide).toHaveBeenCalledTimes(1);
    expect(show).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });
});
