export type Locale = 'zh' | 'en' | 'ja' | 'ko'

export const locales: Locale[] = ['zh', 'en', 'ja', 'ko']

export const localeLabels: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語',
  ko: '한국어',
}

export interface LocalizedText {
  zh: string
  en: string
  ja: string
  ko: string
}

export interface PrivacyApp {
  slug: string
  appName: LocalizedText
  lastUpdated: string
  contactEmail?: string
}

export interface AppsJson {
  apps: PrivacyApp[]
}

export const defaultContactEmail = 'duhao1008@126.com'

export const fallbackPrivacyApps: PrivacyApp[] = [
  {
    slug: 'cableDropCalc',
    appName: {
      zh: '压降计算',
      en: 'Cable Drop Calc',
      ja: 'Cable Drop Calc',
      ko: 'Cable Drop Calc',
    },
    lastUpdated: '2026-05-30',
  },
  {
    slug: 'compute24',
    appName: {
      zh: '益智算24',
      en: 'Compute 24',
      ja: 'Compute 24',
      ko: 'Compute 24',
    },
    lastUpdated: '2026-03-17',
  },
]

export async function loadPrivacyApps(): Promise<PrivacyApp[]> {
  try {
    const response = await fetch('/apps.json', { cache: 'no-cache' })
    if (!response.ok) {
      return fallbackPrivacyApps
    }
    const data = (await response.json()) as AppsJson
    if (!Array.isArray(data.apps)) {
      return fallbackPrivacyApps
    }
    return data.apps.filter(isPrivacyApp)
  } catch {
    return fallbackPrivacyApps
  }
}

function isPrivacyApp(value: unknown): value is PrivacyApp {
  if (!value || typeof value !== 'object') {
    return false
  }
  const app = value as PrivacyApp
  return Boolean(
    app.slug &&
      app.appName?.zh &&
      app.appName?.en &&
      app.appName?.ja &&
      app.appName?.ko &&
      app.lastUpdated,
  )
}

export function findPrivacyApp(apps: PrivacyApp[], slug: string) {
  const normalized = slug.replace(/\.html$/i, '')
  return apps.find((app) => app.slug === normalized)
}
