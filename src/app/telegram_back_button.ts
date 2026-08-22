interface TelegramBackButtonApi {
  show: () => void;
  hide: () => void;
  onClick: (callback: () => void) => void;
  offClick: (callback: () => void) => void;
}

const ROOT_PATHS = new Set([
  '/',
  '/inbox',
  '/next',
  '/waiting',
  '/scheduled',
  '/someday',
  '/focus',
  '/areas',
  '/projects',
  '/contacts',
]);

export function shouldShowTelegramBackButton(pathname: string) {
  return !ROOT_PATHS.has(pathname);
}

export function configureTelegramBackButton(
  backButton: TelegramBackButtonApi | undefined,
  shouldShow: boolean,
  onBack: () => void,
) {
  if (backButton === undefined) {
    return undefined;
  }

  if (!shouldShow) {
    backButton.hide();
    return undefined;
  }

  backButton.onClick(onBack);
  backButton.show();

  return () => {
    backButton.offClick(onBack);
    backButton.hide();
  };
}
