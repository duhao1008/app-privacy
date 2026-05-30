<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  defaultContactEmail,
  findPrivacyApp,
  localeLabels,
  locales,
  privacyApps,
  type Locale,
} from './data/apps'

const route = useRoute()

const routeInfo = computed(() => {
  const parts = route.path.split('/').filter(Boolean)
  if (parts[0] === 'app_privacy' && parts[1]) {
    return {
      slug: parts[1].replace(/\.html$/i, ''),
      locale: 'zh' as Locale,
      legacy: true,
    }
  }
  return {
    slug: parts[0] || '',
    locale: locales.includes(parts[1] as Locale) ? (parts[1] as Locale) : ('zh' as Locale),
    legacy: false,
  }
})

const currentApp = computed(() => findPrivacyApp(routeInfo.value.slug))
const locale = computed(() => routeInfo.value.locale)
const email = computed(() => currentApp.value?.contactEmail || defaultContactEmail)

const dateFormatter = computed(() => {
  const localeMap: Record<Locale, string> = {
    zh: 'zh-CN',
    en: 'en-US',
    ja: 'ja-JP',
    ko: 'ko-KR',
  }
  return new Intl.DateTimeFormat(localeMap[locale.value], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const updatedDate = computed(() => {
  if (!currentApp.value) return ''
  return dateFormatter.value.format(new Date(`${currentApp.value.lastUpdated}T00:00:00`))
})

const copy = computed(() => {
  const text = {
    zh: {
      homeTitle: 'App 隐私政策',
      homeLead: '选择一个 App 查看对应隐私政策。',
      policy: '隐私政策',
      collectedTitle: '1. 我们是否收集个人信息',
      collectedBody: '本应用不收集、上传、出售或共享任何用户个人信息。不需要注册或登录账号，不提供云同步，也不集成广告、统计或跟踪 SDK。',
      localTitle: '2. 本地数据',
      localBody: '为了提供核心功能，本应用可能仅在你的设备本地保存以下数据：',
      usageTitle: '3. 数据用途',
      usageBody: '本地数据只用于提供你主动使用的 App 功能，例如保存设置、展示历史记录、生成提醒或显示本地统计。数据不会离开你的设备，也不会用于广告投放、行为分析或跨应用跟踪。',
      permissionTitle: '4. 权限使用说明',
      thirdTitle: '5. 第三方服务',
      thirdBody: '当前版本不使用第三方广告、统计、分析或跟踪服务，也不会向第三方共享用户数据。',
      childrenTitle: '6. 儿童隐私',
      childrenBody: '本应用不主动收集任何用户个人信息，因此也不会主动收集儿童个人信息。',
      updateTitle: '7. 隐私政策更新',
      updateBody: '如果未来版本新增账号、云同步、联网服务、广告、支付或其他会影响数据处理方式的功能，我们会更新本隐私政策。',
      contactTitle: '8. 联系我们',
      contactBody: '如果你对本隐私政策有任何疑问，可以通过以下邮箱联系我们：',
      labelNote: '当前 App Store 隐私标签建议口径：Data Not Collected（未收集数据）。前提是正式提审版本继续保持无服务端、无账号、无第三方统计/广告 SDK，且不上传任何用户数据。',
      lastUpdated: '最后更新',
      notFound: '未找到这个 App 的隐私政策。',
      backHome: '返回列表',
    },
    en: {
      homeTitle: 'App Privacy Policies',
      homeLead: 'Choose an app to view its privacy policy.',
      policy: 'Privacy Policy',
      collectedTitle: '1. Personal Information Collection',
      collectedBody: 'This app does not collect, upload, sell, or share any personal information. It does not require registration or login, does not provide cloud sync, and does not integrate advertising, analytics, or tracking SDKs.',
      localTitle: '2. Local Data',
      localBody: 'To provide core features, this app may store the following data only on your device:',
      usageTitle: '3. Use of Data',
      usageBody: 'Local data is used only for app features you choose to use, such as saving settings, showing history, generating reminders, or displaying local statistics. The data does not leave your device and is not used for advertising, profiling, analytics, or cross-app tracking.',
      permissionTitle: '4. Permissions',
      thirdTitle: '5. Third-Party Services',
      thirdBody: 'The current version does not use third-party advertising, analytics, measurement, or tracking services, and does not share user data with third parties.',
      childrenTitle: '6. Children’s Privacy',
      childrenBody: 'This app does not actively collect personal information from any user, including children.',
      updateTitle: '7. Policy Updates',
      updateBody: 'If a future version adds accounts, cloud sync, online services, ads, payments, or other features that affect data handling, this policy will be updated.',
      contactTitle: '8. Contact Us',
      contactBody: 'If you have questions about this privacy policy, contact us at:',
      labelNote: 'Suggested App Store privacy label: Data Not Collected, as long as the submitted version continues to use no server, no accounts, no third-party analytics or advertising SDKs, and does not upload user data.',
      lastUpdated: 'Last updated',
      notFound: 'No privacy policy was found for this app.',
      backHome: 'Back to list',
    },
    ja: {
      homeTitle: 'アプリのプライバシーポリシー',
      homeLead: 'アプリを選択してプライバシーポリシーを確認してください。',
      policy: 'プライバシーポリシー',
      collectedTitle: '1. 個人情報の収集',
      collectedBody: '本アプリは個人情報を収集、アップロード、販売、共有しません。登録やログインは不要で、クラウド同期、広告、分析、トラッキング SDK も使用していません。',
      localTitle: '2. ローカルデータ',
      localBody: 'コア機能を提供するため、本アプリは以下のデータを端末内にのみ保存する場合があります：',
      usageTitle: '3. データの利用目的',
      usageBody: 'ローカルデータは、設定の保存、履歴の表示、通知の作成、ローカル統計の表示など、ユーザーが利用する機能のためだけに使用されます。データは端末外へ送信されず、広告、分析、プロファイリング、アプリ横断トラッキングには使用されません。',
      permissionTitle: '4. 権限の利用',
      thirdTitle: '5. 第三者サービス',
      thirdBody: '現在のバージョンでは、第三者の広告、分析、測定、トラッキングサービスを使用せず、ユーザーデータを第三者と共有しません。',
      childrenTitle: '6. 児童のプライバシー',
      childrenBody: '本アプリは、児童を含むいかなるユーザーからも個人情報を積極的に収集しません。',
      updateTitle: '7. ポリシーの更新',
      updateBody: '将来のバージョンでアカウント、クラウド同期、オンラインサービス、広告、決済など、データ処理に影響する機能を追加する場合、本ポリシーを更新します。',
      contactTitle: '8. お問い合わせ',
      contactBody: '本プライバシーポリシーに関する質問は、以下のメールアドレスまでお問い合わせください：',
      labelNote: 'App Store のプライバシーラベルは、提出バージョンがサーバー、アカウント、第三者分析・広告 SDK を使用せず、ユーザーデータをアップロードしない限り、Data Not Collected が推奨されます。',
      lastUpdated: '最終更新日',
      notFound: 'このアプリのプライバシーポリシーが見つかりません。',
      backHome: '一覧に戻る',
    },
    ko: {
      homeTitle: '앱 개인정보 처리방침',
      homeLead: '앱을 선택하여 개인정보 처리방침을 확인하세요.',
      policy: '개인정보 처리방침',
      collectedTitle: '1. 개인정보 수집',
      collectedBody: '이 앱은 개인정보를 수집, 업로드, 판매 또는 공유하지 않습니다. 회원가입이나 로그인이 필요 없고, 클라우드 동기화, 광고, 분석, 추적 SDK를 포함하지 않습니다.',
      localTitle: '2. 로컬 데이터',
      localBody: '핵심 기능을 제공하기 위해 이 앱은 다음 데이터를 사용자의 기기에만 저장할 수 있습니다.',
      usageTitle: '3. 데이터 사용 목적',
      usageBody: '로컬 데이터는 설정 저장, 기록 표시, 알림 생성, 로컬 통계 표시 등 사용자가 선택한 기능을 제공하는 데에만 사용됩니다. 데이터는 기기를 벗어나지 않으며 광고, 분석, 프로파일링 또는 앱 간 추적에 사용되지 않습니다.',
      permissionTitle: '4. 권한 사용',
      thirdTitle: '5. 제3자 서비스',
      thirdBody: '현재 버전은 제3자 광고, 분석, 측정 또는 추적 서비스를 사용하지 않으며 사용자 데이터를 제3자와 공유하지 않습니다.',
      childrenTitle: '6. 아동 개인정보',
      childrenBody: '이 앱은 아동을 포함한 어떤 사용자로부터도 개인정보를 적극적으로 수집하지 않습니다.',
      updateTitle: '7. 정책 업데이트',
      updateBody: '향후 계정, 클라우드 동기화, 온라인 서비스, 광고, 결제 등 데이터 처리에 영향을 주는 기능이 추가되면 이 정책을 업데이트합니다.',
      contactTitle: '8. 문의하기',
      contactBody: '이 개인정보 처리방침에 대한 질문은 아래 이메일로 문의해 주세요.',
      labelNote: '제출 버전이 서버, 계정, 제3자 분석 또는 광고 SDK를 사용하지 않고 사용자 데이터를 업로드하지 않는 한 App Store 개인정보 라벨은 Data Not Collected를 권장합니다.',
      lastUpdated: '마지막 업데이트',
      notFound: '이 앱의 개인정보 처리방침을 찾을 수 없습니다.',
      backHome: '목록으로 돌아가기',
    },
  }
  return text[locale.value]
})
</script>

<template>
  <main v-if="!currentApp" class="shell">
    <section class="panel">
      <h1>{{ routeInfo.slug ? copy.notFound : copy.homeTitle }}</h1>
      <p class="lead">{{ routeInfo.slug ? '' : copy.homeLead }}</p>
      <div class="app-list">
        <a v-for="item in privacyApps" :key="item.slug" class="app-link" :href="`/${item.slug}/zh`">
          <strong>{{ item.appName.zh }}</strong>
          <span>{{ item.slug }}</span>
        </a>
      </div>
    </section>
  </main>

  <main v-else class="shell">
    <article class="panel">
      <nav class="lang-nav" aria-label="Language">
        <a v-for="item in locales" :key="item" :href="`/${currentApp.slug}/${item}`" :class="{ active: item === locale }">
          {{ localeLabels[item] }}
        </a>
      </nav>

      <h1>{{ currentApp.appName[locale] }} {{ copy.policy }}</h1>
      <p class="lead">{{ currentApp.slug }} · {{ currentApp.subtitle[locale] }}</p>
      <p>{{ currentApp.description[locale] }}</p>

      <h2>{{ copy.collectedTitle }}</h2>
      <p>{{ copy.collectedBody }}</p>

      <h2>{{ copy.localTitle }}</h2>
      <p>{{ copy.localBody }}</p>
      <ul>
        <li v-for="item in currentApp.localDataItems[locale]" :key="item">{{ item }}</li>
      </ul>

      <h2>{{ copy.usageTitle }}</h2>
      <p>{{ copy.usageBody }}</p>

      <h2>{{ copy.permissionTitle }}</h2>
      <ul>
        <li v-for="item in currentApp.permissions[locale]" :key="item">{{ item }}</li>
      </ul>

      <h2>{{ copy.thirdTitle }}</h2>
      <p>{{ copy.thirdBody }}</p>

      <h2>{{ copy.childrenTitle }}</h2>
      <p>{{ copy.childrenBody }}</p>

      <h2>{{ copy.updateTitle }}</h2>
      <p>{{ copy.updateBody }}</p>

      <h2>{{ copy.contactTitle }}</h2>
      <p>{{ copy.contactBody }}</p>
      <p><a :href="`mailto:${email}`">{{ email }}</a></p>

      <p class="note">{{ copy.labelNote }}</p>

      <footer>
        <p>© 2026 {{ currentApp.appName[locale] }}</p>
        <p>{{ copy.lastUpdated }}: {{ updatedDate }}</p>
      </footer>
    </article>
  </main>
</template>
