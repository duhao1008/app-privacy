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
  subtitle: LocalizedText
  description: LocalizedText
  localDataItems: Record<Locale, string[]>
  permissions: Record<Locale, string[]>
  lastUpdated: string
  contactEmail?: string
}

const noSpecialPermissions: Record<Locale, string[]> = {
  zh: ['当前版本不申请定位、通讯录、相册、麦克风、相机等权限。'],
  en: ['The current version does not request location, contacts, photos, microphone, camera, or similar permissions.'],
  ja: ['現在のバージョンでは、位置情報、連絡先、写真、マイク、カメラなどの権限を要求しません。'],
  ko: ['현재 버전은 위치, 연락처, 사진, 마이크, 카메라 등의 권한을 요청하지 않습니다.'],
}

const notificationPermission: Record<Locale, string[]> = {
  zh: ['通知权限：仅用于按你设置的时间发送本地提醒。'],
  en: ['Notifications: used only to send local reminders at the times you set.'],
  ja: ['通知権限：設定した時刻にローカル通知を送るためだけに使用します。'],
  ko: ['알림 권한: 사용자가 설정한 시간에 로컬 알림을 보내는 데에만 사용됩니다.'],
}

export const privacyApps: PrivacyApp[] = [
  {
    slug: 'cableDropCalc',
    appName: {
      zh: '压降计算',
      en: 'Cable Drop Calc',
      ja: 'Cable Drop Calc',
      ko: 'Cable Drop Calc',
    },
    subtitle: {
      zh: '电工线径与电压降离线工具',
      en: 'Offline cable voltage drop calculator',
      ja: 'オフライン電圧降下計算ツール',
      ko: '오프라인 전압 강하 계산 도구',
    },
    description: {
      zh: '压降计算是一款面向电工、弱电施工、设备安装和家庭配电场景的离线计算工具，用于电缆压降、线径估算、负载换算和本地项目记录。',
      en: 'Cable Drop Calc is an offline calculator for electricians, low-voltage installation, equipment setup, and home electrical planning. It supports voltage drop calculation, cable size estimation, load conversion, and local project records.',
      ja: 'Cable Drop Calc は、電気工事、弱電施工、設備設置、家庭配電向けのオフライン計算ツールです。電圧降下計算、ケーブルサイズ推定、負荷換算、ローカルプロジェクト記録に対応します。',
      ko: 'Cable Drop Calc는 전기 작업, 저전압 시공, 장비 설치, 가정 배전 계획을 위한 오프라인 계산 도구입니다. 전압 강하 계산, 케이블 규격 추정, 부하 변환, 로컬 프로젝트 기록을 지원합니다.',
    },
    localDataItems: {
      zh: ['电缆压降计算输入', '线径推荐结果', '功率电流换算记录', '载流量参考偏好', '本地项目记录'],
      en: ['Voltage drop calculation inputs', 'Cable size recommendation results', 'Power and current conversion records', 'Ampacity reference preferences', 'Local project records'],
      ja: ['電圧降下計算の入力', 'ケーブルサイズ推奨結果', '電力・電流換算記録', '許容電流参考設定', 'ローカルプロジェクト記録'],
      ko: ['전압 강하 계산 입력값', '케이블 규격 추천 결과', '전력 및 전류 변환 기록', '허용 전류 참고 설정', '로컬 프로젝트 기록'],
    },
    permissions: noSpecialPermissions,
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
    subtitle: {
      zh: '单机益智游戏',
      en: 'Offline puzzle game',
      ja: 'オフライン計算パズルゲーム',
      ko: '오프라인 퍼즐 게임',
    },
    description: {
      zh: '益智算24是一款纯本地运行的数字益智游戏，用于练习 24 点计算、保存游戏历史和展示本地成绩。',
      en: 'Compute 24 is an offline number puzzle game for practicing 24-point calculations, saving game history, and showing local scores.',
      ja: 'Compute 24 は、24 点計算の練習、ゲーム履歴の保存、ローカル成績の表示を行うオフライン数字パズルゲームです。',
      ko: 'Compute 24는 24점 계산 연습, 게임 기록 저장, 로컬 점수 표시를 위한 오프라인 숫자 퍼즐 게임입니다.',
    },
    localDataItems: {
      zh: ['游戏历史记录', '游戏成绩', '应用内设置'],
      en: ['Game history', 'Game scores', 'In-app settings'],
      ja: ['ゲーム履歴', 'ゲームスコア', 'アプリ内設定'],
      ko: ['게임 기록', '게임 점수', '앱 내 설정'],
    },
    permissions: noSpecialPermissions,
    lastUpdated: '2026-03-17',
  },
  {
    slug: 'pomodoro_focus_timer',
    appName: {
      zh: '番茄专注计时器',
      en: 'Pomodoro Focus Timer',
      ja: 'ポモドーロ集中タイマー',
      ko: '뽀모도로 집중 타이머',
    },
    subtitle: {
      zh: '单机买断制专注工具',
      en: 'Offline focus timer',
      ja: 'オフライン集中タイマー',
      ko: '오프라인 집중 타이머',
    },
    description: {
      zh: '番茄专注计时器是一款纯本地、离线运行的番茄工作法计时工具，用于设置专注时长、休息时长、本地历史和提醒偏好。',
      en: 'Pomodoro Focus Timer is an offline Pomodoro timer for focus duration, break duration, local history, and reminder preferences.',
      ja: 'ポモドーロ集中タイマーは、集中時間、休憩時間、ローカル履歴、通知設定を管理するオフラインのポモドーロタイマーです。',
      ko: '뽀모도로 집중 타이머는 집중 시간, 휴식 시간, 로컬 기록, 알림 설정을 관리하는 오프라인 타이머입니다.',
    },
    localDataItems: {
      zh: ['专注时长设置', '休息时长设置', '专注历史记录', '本地统计数据', '提醒与声音偏好'],
      en: ['Focus duration settings', 'Break duration settings', 'Focus history', 'Local statistics', 'Reminder and sound preferences'],
      ja: ['集中時間設定', '休憩時間設定', '集中履歴', 'ローカル統計', '通知とサウンド設定'],
      ko: ['집중 시간 설정', '휴식 시간 설정', '집중 기록', '로컬 통계', '알림 및 소리 설정'],
    },
    permissions: notificationPermission,
    lastUpdated: '2026-04-10',
  },
  {
    slug: 'shift-calendar',
    appName: {
      zh: '倒班日历 / ShiftCal',
      en: 'ShiftCal',
      ja: 'ShiftCal',
      ko: 'ShiftCal',
    },
    subtitle: {
      zh: '离线倒班日历工具',
      en: 'Offline shift calendar',
      ja: 'オフラインシフトカレンダー',
      ko: '오프라인 교대근무 달력',
    },
    description: {
      zh: '倒班日历用于管理轮班规则、查看日历、设置班次提醒和查看基础统计。当前版本不提供账号系统、不接入服务端。',
      en: 'ShiftCal helps manage shift rules, view calendars, set shift reminders, and review basic statistics. The current version has no account system or server integration.',
      ja: 'ShiftCal は、シフトルールの管理、カレンダー表示、シフト通知、基本統計の確認に使用できます。現在のバージョンにはアカウント機能やサーバー連携はありません。',
      ko: 'ShiftCal은 교대 규칙 관리, 달력 보기, 근무 알림 설정, 기본 통계 확인을 돕습니다. 현재 버전은 계정 시스템이나 서버 연동이 없습니다.',
    },
    localDataItems: {
      zh: ['班次名称与班次颜色配置', '循环排班规则与开始日期', '提醒开关与提醒时间', '应用内部设置项'],
      en: ['Shift names and color settings', 'Cycle rules and start dates', 'Reminder switches and reminder times', 'In-app settings'],
      ja: ['シフト名と色設定', '周期ルールと開始日', '通知オン/オフと通知時刻', 'アプリ内設定'],
      ko: ['근무 이름 및 색상 설정', '반복 규칙 및 시작일', '알림 스위치 및 알림 시간', '앱 내 설정'],
    },
    permissions: notificationPermission,
    lastUpdated: '2026-04-01',
  },
  {
    slug: 'shift-alarm-assistant',
    appName: {
      zh: '倒班闹钟助手 / Shift Alarm Assistant',
      en: 'Shift Alarm Assistant',
      ja: 'Shift Alarm Assistant',
      ko: 'Shift Alarm Assistant',
    },
    subtitle: {
      zh: '本地倒班提醒工具',
      en: 'Local shift reminder tool',
      ja: 'ローカルシフト通知ツール',
      ko: '로컬 교대근무 알림 도구',
    },
    description: {
      zh: '倒班闹钟助手用于设置倒班周期、记录班次规则并按排班发送本地提醒。当前版本不提供账号、云同步、广告或第三方统计。',
      en: 'Shift Alarm Assistant helps set shift cycles, store shift rules, and send local reminders based on your schedule. The current version has no accounts, cloud sync, ads, or third-party analytics.',
      ja: 'Shift Alarm Assistant は、シフト周期の設定、シフトルールの保存、スケジュールに基づくローカル通知に使用できます。現在のバージョンにはアカウント、クラウド同期、広告、第三者分析はありません。',
      ko: 'Shift Alarm Assistant는 교대 주기 설정, 근무 규칙 저장, 일정 기반 로컬 알림을 제공합니다. 현재 버전은 계정, 클라우드 동기화, 광고, 제3자 분석을 포함하지 않습니다.',
    },
    localDataItems: {
      zh: ['班次名称、班次时间、轮班周期、起始日期等排班配置', '闹钟提醒时间、提醒开关、重复规则等本地提醒设置', '应用内显示偏好和基础设置项'],
      en: ['Shift names, shift times, rotation cycles, start dates, and other schedule settings', 'Alarm times, reminder switches, repeat rules, and other local reminder settings', 'Display preferences and basic in-app settings'],
      ja: ['シフト名、シフト時間、ローテーション周期、開始日などのスケジュール設定', 'アラーム時刻、通知オン/オフ、繰り返しルールなどのローカル通知設定', '表示設定と基本的なアプリ内設定'],
      ko: ['근무 이름, 근무 시간, 교대 주기, 시작일 등 일정 설정', '알람 시간, 알림 스위치, 반복 규칙 등 로컬 알림 설정', '표시 환경설정 및 기본 앱 설정'],
    },
    permissions: notificationPermission,
    lastUpdated: '2026-04-03',
  },
]

export const defaultContactEmail = '2241266691@qq.com'

export function findPrivacyApp(slug: string) {
  const normalized = slug.replace(/\.html$/i, '')
  return privacyApps.find((app) => app.slug === normalized)
}
