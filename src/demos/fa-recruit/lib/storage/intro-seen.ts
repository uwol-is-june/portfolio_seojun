const INTRO_SEEN_KEY = 'fa-recruit-intro-seen';

export function hasSeenIntro(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(INTRO_SEEN_KEY) === 'yes';
}

export function markIntroSeen(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(INTRO_SEEN_KEY, 'yes');
}
