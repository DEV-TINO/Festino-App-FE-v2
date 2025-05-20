/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  important: true,
  theme: {
    extend: {
      colors: {
        'white-opacity': 'rgba(255, 255, 255, 0.68)',
        primary: {
          900: {
            DEFAULT: '#0073F0',
            'light-68': 'rgba(0, 115, 240, 0.68)',
            'light-40': 'rgba(0, 115, 240, 0.4)',
            'light-20': 'rgba(0, 115, 240, 0.2)',
            'light-16': 'rgba(0, 115, 240, 0.16)',
            'light-12': 'rgba(0, 115, 240, 0.12)',
            'light-6': 'rgba(0, 115, 240, 0.06)',
          },
          700: {
            DEFAULT: '#06D1FF',
            light: 'rgba(6, 209, 255, 0.4)',
            lighter: 'rgba(6, 209, 255, 0.1)',
          },
          50: {
            DEFAULT: '#FAFEFF',
          },
        },
        secondary: {
          700: {
            DEFAULT: '#222222',
            'light-50': 'rgba(34, 34, 34, 0.5)',
            'light-3': 'rgba(0, 0, 0, 0.03)', //secondary-200, primary-50
          },
          500: {
            DEFAULT: '#444444',
            'light-20': 'rgba(68, 68, 68, 0.2)',
          },
          400: '#888888',
          300: '#999999',
          100: '#CCCCCC',
          50: {
            DEFAULT: '#EEEEEE',
            light: '#E1E1E1',
          },
        },
        prepared: {
          DEFAULT: '#66CF55',
          light: '#E2F4E1',
        },
        cooking: {
          DEFAULT: '#3082F6',
          light: '#DAE8FA',
        },
        cancel: {
          DEFAULT: '#888888',
        },
        waiting: {
          DEFAULT: '#FF6D6D',
          light: '#FBE4E4',
        },
        close: {
          DEFAULT: '#F00E00',
          light: 'rgba(240, 14, 0, 0.12)',
        },
        open: {
          DEFAULT: '#0073F0',
          light: 'rgba(0, 115, 240, 0.12)',
        },
      },
      textColor: (theme) => ({
        ...theme('colors'),
        danger: '#FF3F3F',
        warning: '#FF5252',
      }),
      backgroundColor: (theme) => ({
        ...theme('colors'),
        'map-color': 'rgba(211, 211, 211, 0.1)',
        tag: '#F5F6F8',
        error: 'rgba(255, 109, 109, 0.16)',
      }),
      fontSize: {
        '3xs': '0.5rem', // 8px
        '2xs': '0.625rem', // 10px
        '3xl': '1.75rem', // 28px
        '10xl': '6.25rem', //100px
      },
      fontFamily: {
        pretendard: ['Pretendard Variable'],
        jalnan2: ['jalnan2'],
      },
      backgroundImage: {
        // tino
        'cheer-up-tino': "url('/images/tinos/cheer-up.svg')",
        'error-half': "url('/images/tinos/error-half.svg')",
        'error-full': "url('/images/tinos/error.svg')",
        // common
        'instagram': "url('/icons/commons/instagram.png')",
        'x-button': "url('/icons/commons/x.png')",
        // header
        'header-festino-logo': "url('/icons/headers/festino-logo.svg')",
        'header-team-introduction': "url('/icons/headers/festino-icon.svg')",
        'header-navigation-bar': "url('/icons/headers/nav.svg')",
        //home
        'home-banner': "url('/images/homes/home-banner.svg')",
        'slide-banner-1': "url('/images/homes/slide-banner-1.svg')",
        'slide-banner-2': "url('/images/homes/slide-banner-2.svg')",
        'slide-banner-3': "url('/images/homes/slide-banner-3.svg')",
        'angle-bracket': "url('/icons/homes/angle-bracket.svg')",
        'talent-icon': "url('/icons/homes/talent.svg')",
        'arrow-back-black': "url('/icons/homes/arrow-back.svg')",
        'pin-icon': "url('icons/homes/pin.svg')",
        'tino-cd': "url('icons/homes/tino-cd.svg')",
        // booth
        'booth-banner': "url('/images/booths/banners/booth.svg')",
        'booth-detail-banner': "url('/images/booths/banners/booth-detail.svg')",
        'default': "url('/images/booths/default.svg')",
        'arrow-back-white': "url('/icons/booths/arrow-back.svg')",
        'arrow-forward': "url('/icons/booths/arrow-forward.svg')",
        'booth-map': "url('/images/booths/map.svg')",
        'reservation-status': "url('/images/booths/reserve.svg')",
        // timetable
        'timetable-banner': "url('/images/timetables/timetable-banner.svg')",
        // tabling
        'tabling-banner': "url('/images/tablings/tino-tabling.svg')",
        // event
        'like': "url('/icons/events/full-heart.svg')",
        'unlike': "url('/icons/events/full-heart.svg')",
        'delete': "url('/icons/events/delete.svg')"
      },
      borderRadius: {
        '2.5xl': '1.25rem', // 20px
        '10xl': '3.125rem', // 50px
      },
      borderColor: (theme) => ({
        ...theme('colors'),
      }),
      borderWidth: {
        1: '0.5px',
        2: '1px',
      },
      boxShadow: {
        '4xl': '0px 0px 16px rgba(0, 0, 0, 0.04)',
        'white-md': '0px 0px 2px rgba(255, 255, 255, 1)',
      },
      translate: {
        'sub-btn-1': '-65px',
        'sub-btn-2': '-130px',
        'sub-btn-3': '-195px',
      },
    },
    screens: {
      xs: '405px',
      sm: '470px',
    },
  },
  plugins: [],
};
