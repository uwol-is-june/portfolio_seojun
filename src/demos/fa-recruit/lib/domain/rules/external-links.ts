export const EXTERNAL_URLS = {

  bond: 'https://www.sgic.co.kr/?p=CCPMAN000001F01',
  eClean: 'https://www.e-cleanins.or.kr/',

  nonLifeExam: 'https://isi.knia.or.kr/',

  lifeExam: 'https://exam.insure.or.kr/',
  insuranceInstitute: 'https://www.in.or.kr/',
  iims: '#demo-internal-system',
  cyberCampus: '#demo-internal-system',

  nonLifeMalso: 'https://isi.knia.or.kr/cancellation/cancelInfo.do',

  lifeMalso: 'https://fp.insure.or.kr/process/process01',

  nonLifeHistory: 'https://isi.knia.or.kr/confirm/login.do',

  lifeHistory: 'https://fp.insure.or.kr/register/privacy',

  lifeHistoryVerify: 'https://fp.insure.or.kr/register/verify',
} as const;

export type ExternalLink = {
  key: string;
  icon: string;
  label: string;
  url: string;
};

export const RECRUIT_SITES: readonly ExternalLink[] = [
  { key: 'sgi', icon: '📋', label: '보증보험 동의', url: EXTERNAL_URLS.bond },
  { key: 'eclean', icon: '🔍', label: 'E-클린서비스', url: EXTERNAL_URLS.eClean },
  { key: 'knia', icon: '🏢', label: '손해보험협회', url: EXTERNAL_URLS.nonLifeExam },
  { key: 'insure', icon: '🏢', label: '생명보험협회', url: EXTERNAL_URLS.lifeExam },
  { key: 'in', icon: '🎓', label: '보험연수원', url: EXTERNAL_URLS.insuranceInstitute },
] as const;
