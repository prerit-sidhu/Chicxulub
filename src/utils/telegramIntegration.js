// Telegram Mini App integration
export const initTelegramApp = () => {
  // Check if running inside Telegram
  const isTelegram = window.Telegram && window.Telegram.WebApp;
  
  if (isTelegram) {
    const tg = window.Telegram.WebApp;
    
    // Initialize the WebApp
    tg.expand();
    
    // Get user data if available
    const user = tg.initDataUnsafe?.user;
    
    return {
      isTelegram: true,
      user,
      tg
    };
  }
  
  return { isTelegram: false };
};

// Get Telegram user data
export const getTelegramUser = () => {
  if (window.Telegram && window.Telegram.WebApp) {
    return window.Telegram.WebApp.initDataUnsafe?.user;
  }
  return null;
};