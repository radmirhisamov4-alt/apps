window.RADMIR_APPS = [
  {
    id: "algomotion",
    name: "AlgoMotion",
    platform: "windows",
    platformLabel: "Windows 10 / 11",
    description: "Пошаговая анимация пяти сортировок и трёх видов поиска. Управляйте скоростью, ставьте выполнение на паузу и изучайте теорию прямо в приложении.",
    features: ["8 алгоритмов", "Пошаговый режим", "Java внутри"],
    visual: "algomotion",
    fileType: "EXE",
    versions: [{ version: "1.0.0", size: "46,69 МБ", date: "18 июля 2026", status: "Стабильная", url: "https://github.com/radmirhisamov4-alt/apps/releases/download/v1.0.0/AlgoMotion-1.0.0-windows-x64.exe" }]
  },
  {
    id: "cryptosafe",
    name: "CryptoSafe",
    platform: "android",
    platformLabel: "Android 8+",
    description: "Офлайн-сейф для файлов и папок с AES-256-GCM, PIN-кодом и биометрией. Без регистрации, рекламы, облака и доступа к интернету.",
    features: ["Файлы и папки", "Биометрия", "RU / EN"],
    visual: "cryptosafe",
    icon: "cryptosafe-icon.svg",
    fileType: "APK",
    updated: true,
    versions: [
      {
        version: "1.0.29", size: "21,04 МБ", date: "31 июля 2026", status: "Тестовая",
        url: "https://github.com/radmirhisamov4-alt/apps/raw/refs/heads/main/downloads/CryptoSafe-1.0.29.apk",
        changes: { added: "Автоматический запрос биометрии при входе и короткие беззвучные превью видео в хранилище.", removed: "—" }
      },
      {
        version: "1.0.28", size: "21,02 МБ", date: "18 июля 2026", status: "Предыдущая",
        url: "https://github.com/radmirhisamov4-alt/apps/releases/download/v1.0.0/CryptoSafe-1.0.28.apk",
        changes: { added: "Первая опубликованная версия приложения.", removed: "—" }
      }
    ]
  },
  {
    id: "privacy-keyboard",
    name: "Offline Privacy Keyboard",
    platform: "android",
    platformLabel: "Android 6+",
    description: "Русско-английская клавиатура с локальными подсказками, автозаменами, emoji, шаблонами и секретным режимом. Работает полностью офлайн.",
    features: ["Полностью офлайн", "RU / EN", "Локальное обучение"],
    visual: "keyboard",
    icon: "privacy-keyboard-icon.svg",
    fileType: "APK",
    updated: true,
    versions: [
      {
        version: "1.2.1", size: "49,61 МБ", date: "31 июля 2026", status: "Тестовая",
        url: "https://github.com/radmirhisamov4-alt/apps/raw/refs/heads/main/downloads/Offline-Privacy-Keyboard-1.2.1.apk",
        changes: { added: "Живой предпросмотр оформления, настройка размера текста и интервалов клавиш, несколько вариантов автозамены и команда /gmail.", removed: "Упрощённый режим оформления клавиатуры." }
      },
      {
        version: "1.1.0", size: "49,60 МБ", date: "18 июля 2026", status: "Предыдущая",
        url: "https://github.com/radmirhisamov4-alt/apps/releases/download/privacy-keyboard-v1.1.0/Offline-Privacy-Keyboard-1.1.0.apk",
        changes: { added: "Увеличенный шрифт клавиш и расстояние между ними.", removed: "Генератор паролей и вибрация." }
      },
      {
        version: "1.0.0", size: "49,62 МБ", date: "18 июля 2026", status: "Предыдущая",
        url: "https://github.com/radmirhisamov4-alt/apps/releases/download/v1.0.0/Offline-Privacy-Keyboard-1.0.0.apk",
        changes: { added: "Первая опубликованная версия приложения.", removed: "—" }
      }
    ]
  },
  {
    id: "password-vault",
    name: "Password Vault",
    platform: "android",
    platformLabel: "Android 8+",
    description: "Офлайн-менеджер паролей с мастер-паролем, биометрией и зашифрованными резервными копиями. Не требует интернета, регистрации или облака.",
    features: ["AES-256-GCM", "Биометрия", "Импорт / экспорт"],
    visual: "password",
    fileType: "APK",
    updated: true,
    versions: [
      {
        version: "1.1.0", size: "11,19 МБ", date: "16 августа 2026", status: "Тестовая",
        url: "https://github.com/radmirhisamov4-alt/apps/raw/refs/heads/main/downloads/Password-Vault-1.1.0.apk",
        changes: {
          added: "Резервные копии теперь сохраняют настройки и совместимы с форматом 1.0. Добавлены сохранение сгенерированного пароля в новую запись, предупреждение о несохранённых изменениях и улучшенная биометрия.",
          removed: "—"
        }
      },
      {
        version: "1.0.0", size: "11,16 МБ", date: "31 июля 2026", status: "Предыдущая",
        url: "https://github.com/radmirhisamov4-alt/apps/raw/refs/heads/main/downloads/Password-Vault-1.0.0.apk",
        changes: { added: "Первая версия: безопасное хранение и генерация паролей, поиск, избранное, биометрия и зашифрованные резервные копии.", removed: "—" }
      }
    ]
  }
];
