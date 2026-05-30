<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  defaultContactEmail,
  fallbackPrivacyApps,
  findPrivacyApp,
  loadPrivacyApps,
  localeLabels,
  locales,
  type Locale,
  type PrivacyApp,
} from './data/apps'

const route = useRoute()
const apps = ref<PrivacyApp[]>(fallbackPrivacyApps)

onMounted(async () => {
  apps.value = await loadPrivacyApps()
})

const routeInfo = computed(() => {
  const parts = route.path.split('/').filter(Boolean)
  if (parts[0] === 'app_privacy' && parts[1]) {
    return {
      slug: parts[1].replace(/\.html$/i, ''),
      locale: 'zh' as Locale,
    }
  }
  return {
    slug: parts[0] || '',
    locale: locales.includes(parts[1] as Locale) ? (parts[1] as Locale) : ('zh' as Locale),
  }
})

const currentApp = computed(() => findPrivacyApp(apps.value, routeInfo.value.slug))
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

const t = computed(() => {
  const text = {
    zh: {
      homeTitle: 'App 隐私政策',
      homeLead: '选择一个 App 查看对应隐私政策。',
      policy: '隐私政策',
      intro: (name: string) => `本隐私政策描述了 ${name}（以下简称“本应用”）如何收集、使用和保护用户信息。`,
      collectTitle: '1. 信息收集',
      collectBody: '本应用不收集任何用户个人信息。所有 App 数据仅存储在用户设备本地，不会上传到任何服务器。',
      usageTitle: '2. 数据使用',
      usageBody: '本应用使用存储在设备本地的数据仅用于以下目的：',
      usageItems: ['仅用于本应用展示', '保存用户在本应用内主动创建或设置的数据', '提供本应用相关的本地功能'],
      storageTitle: '3. 数据存储',
      storageBody: '所有数据均存储在用户设备本地，不会被传输到任何外部服务器。',
      rightsTitle: '4. 用户权利',
      rightsBody: '用户可以随时通过以下方式管理本地数据：',
      rightsItems: ['在应用内清除', '卸载应用以删除所有相关数据'],
      thirdTitle: '5. 第三方服务',
      thirdBody: '本应用不使用任何第三方服务，也不集成任何广告网络。',
      childrenTitle: '6. 儿童隐私',
      childrenBody: '本应用适合所有年龄段用户，不收集任何儿童个人信息。',
      updateTitle: '7. 隐私政策更新',
      updateBody: '本隐私政策可能会不时更新。任何更新都会在本页面发布，并在应用更新时通知用户。',
      contactTitle: '8. 联系我们',
      contactBody: '如果您对本隐私政策有任何疑问，请通过以下方式联系我们：',
      lastUpdated: '最后更新',
      notFound: '未找到这个 App 的隐私政策。',
    },
    en: {
      homeTitle: 'App Privacy Policies',
      homeLead: 'Choose an app to view its privacy policy.',
      policy: 'Privacy Policy',
      intro: (name: string) => `This Privacy Policy describes how ${name} (hereinafter referred to as the “App”) collects, uses, and protects user information.`,
      collectTitle: '1. Information Collection',
      collectBody: 'The App does not collect any personal information from users. All app data is stored locally on the user’s device only and is not uploaded to any server.',
      usageTitle: '2. Data Use',
      usageBody: 'The App uses data stored locally on the device only for the following purposes:',
      usageItems: ['For display within the App only', 'To save data that users actively create or set within the App', 'To provide local features related to the App'],
      storageTitle: '3. Data Storage',
      storageBody: 'All data is stored locally on the user’s device and is not transmitted to any external server.',
      rightsTitle: '4. User Rights',
      rightsBody: 'Users can manage local data at any time in the following ways:',
      rightsItems: ['Clear it within the App', 'Uninstall the App to delete all related data'],
      thirdTitle: '5. Third-Party Services',
      thirdBody: 'The App does not use any third-party services and does not integrate any advertising networks.',
      childrenTitle: '6. Children’s Privacy',
      childrenBody: 'The App is suitable for users of all ages and does not collect any personal information from children.',
      updateTitle: '7. Privacy Policy Updates',
      updateBody: 'This Privacy Policy may be updated from time to time. Any updates will be posted on this page and users will be notified when the App is updated.',
      contactTitle: '8. Contact Us',
      contactBody: 'If you have any questions about this Privacy Policy, please contact us at:',
      lastUpdated: 'Last updated',
      notFound: 'No privacy policy was found for this app.',
    },
    ja: {
      homeTitle: 'アプリのプライバシーポリシー',
      homeLead: 'アプリを選択してプライバシーポリシーを確認してください。',
      policy: 'プライバシーポリシー',
      intro: (name: string) => `本プライバシーポリシーは、${name}（以下「本アプリ」といいます）が、ユーザー情報をどのように収集、使用、保護するかについて説明するものです。`,
      collectTitle: '1. 情報の収集',
      collectBody: '本アプリは、ユーザーの個人情報を一切収集しません。すべてのアプリデータはユーザーのデバイス内のみに保存され、いかなるサーバーにもアップロードされません。',
      usageTitle: '2. データの使用',
      usageBody: '本アプリは、デバイス内に保存されたデータを以下の目的にのみ使用します。',
      usageItems: ['本アプリ内での表示のためのみ', 'ユーザーが本アプリ内で作成または設定したデータを保存するため', '本アプリに関連するローカル機能を提供するため'],
      storageTitle: '3. データの保存',
      storageBody: 'すべてのデータはユーザーのデバイス内のみに保存され、外部サーバーには送信されません。',
      rightsTitle: '4. ユーザーの権利',
      rightsBody: 'ユーザーは以下の方法でいつでもローカルデータを管理できます。',
      rightsItems: ['アプリ内で削除する', 'アプリをアンインストールして関連データをすべて削除する'],
      thirdTitle: '5. 第三者サービス',
      thirdBody: '本アプリは第三者サービスを使用せず、広告ネットワークも一切統合していません。',
      childrenTitle: '6. 子どものプライバシー',
      childrenBody: '本アプリはすべての年齢層のユーザーに適しており、子どもの個人情報を一切収集しません。',
      updateTitle: '7. プライバシーポリシーの更新',
      updateBody: '本プライバシーポリシーは、必要に応じて更新される場合があります。更新内容は本ページに掲載され、アプリの更新時にユーザーへ通知されます。',
      contactTitle: '8. お問い合わせ',
      contactBody: '本プライバシーポリシーに関するご質問は、以下の方法でお問い合わせください。',
      lastUpdated: '最終更新日',
      notFound: 'このアプリのプライバシーポリシーが見つかりません。',
    },
    ko: {
      homeTitle: '앱 개인정보 처리방침',
      homeLead: '앱을 선택하여 개인정보 처리방침을 확인하세요.',
      policy: '개인정보 처리방침',
      intro: (name: string) => `본 개인정보 처리방침은 ${name}(이하 “본 앱”)이 사용자 정보를 어떻게 수집, 사용 및 보호하는지 설명합니다.`,
      collectTitle: '1. 정보 수집',
      collectBody: '본 앱은 어떠한 사용자 개인정보도 수집하지 않습니다. 모든 앱 데이터는 사용자 기기에만 로컬로 저장되며, 어떤 서버에도 업로드되지 않습니다.',
      usageTitle: '2. 데이터 사용',
      usageBody: '본 앱은 기기에 로컬로 저장된 데이터를 다음 목적에만 사용합니다.',
      usageItems: ['본 앱 내 표시 용도에만 사용', '사용자가 본 앱에서 직접 생성하거나 설정한 데이터 저장', '본 앱 관련 로컬 기능 제공'],
      storageTitle: '3. 데이터 저장',
      storageBody: '모든 데이터는 사용자 기기에만 로컬로 저장되며 외부 서버로 전송되지 않습니다.',
      rightsTitle: '4. 사용자 권리',
      rightsBody: '사용자는 언제든지 다음 방법으로 로컬 데이터를 관리할 수 있습니다.',
      rightsItems: ['앱 내에서 삭제', '앱을 삭제하여 모든 관련 데이터 제거'],
      thirdTitle: '5. 제3자 서비스',
      thirdBody: '본 앱은 어떠한 제3자 서비스도 사용하지 않으며, 광고 네트워크도 통합하지 않습니다.',
      childrenTitle: '6. 아동 개인정보',
      childrenBody: '본 앱은 모든 연령대의 사용자에게 적합하며, 아동의 개인정보를 수집하지 않습니다.',
      updateTitle: '7. 개인정보 처리방침 업데이트',
      updateBody: '본 개인정보 처리방침은 수시로 업데이트될 수 있습니다. 모든 업데이트는 이 페이지에 게시되며, 앱 업데이트 시 사용자에게 안내됩니다.',
      contactTitle: '8. 문의하기',
      contactBody: '본 개인정보 처리방침에 대해 궁금한 점이 있으면 아래 방법으로 문의해 주세요.',
      lastUpdated: '마지막 업데이트',
      notFound: '이 앱의 개인정보 처리방침을 찾을 수 없습니다.',
    },
  }
  return text[locale.value]
})
</script>

<template>
  <main v-if="!currentApp" class="shell">
    <section class="panel">
      <h1>{{ routeInfo.slug ? t.notFound : t.homeTitle }}</h1>
      <p class="lead">{{ routeInfo.slug ? '' : t.homeLead }}</p>
      <div class="app-list">
        <a v-for="item in apps" :key="item.slug" class="app-link" :href="`/${item.slug}/zh`">
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

      <h1>{{ currentApp.appName[locale] }} - {{ t.policy }}</h1>
      <p>{{ t.intro(currentApp.appName[locale]) }}</p>

      <h2>{{ t.collectTitle }}</h2>
      <p>{{ t.collectBody }}</p>

      <h2>{{ t.usageTitle }}</h2>
      <p>{{ t.usageBody }}</p>
      <ul>
        <li v-for="item in t.usageItems" :key="item">{{ item }}</li>
      </ul>

      <h2>{{ t.storageTitle }}</h2>
      <p>{{ t.storageBody }}</p>

      <h2>{{ t.rightsTitle }}</h2>
      <p>{{ t.rightsBody }}</p>
      <ul>
        <li v-for="item in t.rightsItems" :key="item">{{ item }}</li>
      </ul>

      <h2>{{ t.thirdTitle }}</h2>
      <p>{{ t.thirdBody }}</p>

      <h2>{{ t.childrenTitle }}</h2>
      <p>{{ t.childrenBody }}</p>

      <h2>{{ t.updateTitle }}</h2>
      <p>{{ t.updateBody }}</p>

      <h2>{{ t.contactTitle }}</h2>
      <p>{{ t.contactBody }}</p>
      <p><a :href="`mailto:${email}`">{{ email }}</a></p>

      <footer>
        <p>© 2026 {{ currentApp.appName[locale] }}</p>
        <p>{{ t.lastUpdated }}: {{ updatedDate }}</p>
      </footer>
    </article>
  </main>
</template>
