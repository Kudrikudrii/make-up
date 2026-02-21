export const NAV_LINKS = [
  { 
    href: '/portfolio', 
    label: 'Портфолио',
    ariaLabel: 'Перейти к портфолио'
  },
  { 
    href: '/about', 
    label: 'Обо мне',
    ariaLabel: 'Узнать больше обо мне'
  },
  { 
    href: '/', 
    label: 'На главную',
    ariaLabel: 'Вернуться на главную страницу'
  }
] as const

export const CONTACT_LINK = {
  href: '#contact',
  label: 'Contact',
  ariaLabel: 'Связаться со мной'
} as const