module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [require('daisyui')],
  darkMode: ['class', '[data-theme="dark"]'],
  daisyui: {
    styled: true,
    themes: [
      {
        dark: {
          primary: '#3b82f6',
          secondary: '#30aadd',
          accent: '#00ffc6',
          neutral: '#171717',
          info: '#93c5fd',
          success: '#BBF7D0',
          warning: '#fdba74',
          error: '#DC2626',
          'base-content': '#FAFAFA', // Base text content color
          'base-100': '#171717', // Base background color
          '--rounded-box': '16px',
          '--rounded-btn': '8px',
          '--rounded-badge': '2px',
          '--tab-radius': '2px',
          '--btn-text-case': 'normal-case',
          '--navbar-padding': '16px'
        },
        light: {
          primary: '#3b82f6',
          secondary: '#30aadd',
          accent: '#00ffc6',
          neutral: '#171717',
          info: '#bfdbfe',
          success: '#BBF7D0',
          warning: '#fed7aa',
          error: '#DC2626',
          'base-content': '#171717', // Base text content color
          'base-100': '#FAFAFA', // Base background color
          '--rounded-box': '16px',
          '--rounded-btn': '8px',
          '--rounded-badge': '2px',
          '--tab-radius': '2px',
          '--btn-text-case': 'normal-case',
          '--navbar-padding': '16px'
        }
      }
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    darkTheme: 'dark'
  },
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 20s linear infinite'
      },
      aspectRatio: {
        '22/23': '22 / 23'
      },
      boxShadow: {
        orange: '0px 8px 0px rgba(243, 110, 101, 0.2)'
      },
      color: {
        blue: {
          100: '#DBEAFE',
          900: '#1E3A8A'
        },
        green: {
          500: '#22C55E',
          700: '#15803D'
        },
        neutral: {
          50: '#FAFAFA',
          500: '#737373',
          800: '#262626'
        },
        orange: {
          50: '#FFF7ED',
          300: '#F26D64',
          500: '#F36E65',
          600: '#EED082',
          700: '#C2410C'
        },
        red: {
          600: '#DC2626'
        }
      },
      fontFamily: {
        sans: ['UncutSans_Regular'],
        semiBold: ['UncutSans_Medium'],
        bold: ['UncutSans_Bold']
      },
      fontSize: {
        mobileNav: ['24px', { lineHeight: '24px' }],
        deviceCode: ['30px', { lineHeight: '36px' }],
        xxs: ['12px', { lineHeight: '16px' }],
        xs: ['13px', { lineHeight: '24px', letterSpacing: '0.1em' }],
        sm: ['16px', { lineHeight: '24px' }],
        base: ['20px', { lineHeight: '28px' }],
        lg: ['24px', { lineHeight: '32px' }],
        xl: ['38px', { lineHeight: '48px' }],
        '2xl': ['50px', { lineHeight: '62px' }]
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(102%)' },
          '100%': { transform: 'translateX(-100vw)' }
        }
      },
      width: {
        narrowModal: '327px',
        wideModal: '471px'
      },
      zIndex: {
        max: '1000' // High enough to appear above the modal(999)
      }
      // spacing: {
      //   headerHeight: '64px',
      //   footerHeight: '32px',
      // },
    }
  },
  purge: {
    options: {
      safelist: ['alert-success', 'alert-error', 'alert-info', 'alert-warning']
    }
  }
}
