export function getLanguage(): string {
  const key = 'selectedLanguage';
  let savedLanguage = 'en';
  let storageLanguage: string;
  try {
    storageLanguage =
      JSON.parse(global.localStorage.getItem('language') as string) || {};
    if (storageLanguage) {
      // @ts-ignore
      savedLanguage = storageLanguage[key];
    }
  } catch (e) {
    console.log(e);
  }
  return savedLanguage;
}
