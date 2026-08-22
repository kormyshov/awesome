import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { configureTelegramBackButton, shouldShowTelegramBackButton } from './telegram_back_button.ts';

export default function TelegramBackButton() {
  const location = useLocation();
  const navigate = useNavigate();
  const shouldShow = shouldShowTelegramBackButton(location.pathname);

  useEffect(() => {
    const handleClick = () => navigate(-1);

    return configureTelegramBackButton(
      window.Telegram?.WebApp?.BackButton,
      shouldShow,
      handleClick,
    );
  }, [navigate, shouldShow]);

  return null;
}
