import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const rankyListTheme = {
  name: 'ranky-list',
  properties: {
    // =~= Theme Properties =~=
    '--theme-font-family-base': `system-ui`,
    '--theme-font-family-heading': `system-ui`,
    '--theme-font-color-base': '0 0 0',
    '--theme-font-color-dark': '255 255 255',
    '--theme-rounded-base': '9999px',
    '--theme-rounded-container': '8px',
    '--theme-border-base': '1px',
    // =~= Theme On-X Colors =~=
    '--on-primary': '0 0 0',
    '--on-secondary': '0 0 0',
    '--on-tertiary': '0 0 0',
    '--on-success': '0 0 0',
    '--on-warning': '0 0 0',
    '--on-error': '0 0 0',
    '--on-surface': '255 255 255',
    // =~= Theme Colors  =~=
    // primary | #fb923c
    '--color-primary-50': '254 239 226', // #feefe2
    '--color-primary-100': '254 233 216', // #fee9d8
    '--color-primary-200': '254 228 206', // #fee4ce
    '--color-primary-300': '253 211 177', // #fdd3b1
    '--color-primary-400': '252 179 119', // #fcb377
    '--color-primary-500': '251 146 60', // #fb923c
    '--color-primary-600': '226 131 54', // #e28336
    '--color-primary-700': '188 110 45', // #bc6e2d
    '--color-primary-800': '151 88 36', // #975824
    '--color-primary-900': '123 72 29', // #7b481d
    // secondary | #ea580c
    '--color-secondary-50': '252 230 219', // #fce6db
    '--color-secondary-100': '251 222 206', // #fbdece
    '--color-secondary-200': '250 213 194', // #fad5c2
    '--color-secondary-300': '247 188 158', // #f7bc9e
    '--color-secondary-400': '240 138 85', // #f08a55
    '--color-secondary-500': '234 88 12', // #ea580c
    '--color-secondary-600': '211 79 11', // #d34f0b
    '--color-secondary-700': '176 66 9', // #b04209
    '--color-secondary-800': '140 53 7', // #8c3507
    '--color-secondary-900': '115 43 6', // #732b06
    // tertiary | #00b3c1
    '--color-tertiary-50': '217 244 246', // #d9f4f6
    '--color-tertiary-100': '204 240 243', // #ccf0f3
    '--color-tertiary-200': '191 236 240', // #bfecf0
    '--color-tertiary-300': '153 225 230', // #99e1e6
    '--color-tertiary-400': '77 202 212', // #4dcad4
    '--color-tertiary-500': '0 179 193', // #00b3c1
    '--color-tertiary-600': '0 161 174', // #00a1ae
    '--color-tertiary-700': '0 134 145', // #008691
    '--color-tertiary-800': '0 107 116', // #006b74
    '--color-tertiary-900': '0 88 95', // #00585f
    // success | #1bc56c
    '--color-success-50': '221 246 233', // #ddf6e9
    '--color-success-100': '209 243 226', // #d1f3e2
    '--color-success-200': '198 241 218', // #c6f1da
    '--color-success-300': '164 232 196', // #a4e8c4
    '--color-success-400': '95 214 152', // #5fd698
    '--color-success-500': '27 197 108', // #1bc56c
    '--color-success-600': '24 177 97', // #18b161
    '--color-success-700': '20 148 81', // #149451
    '--color-success-800': '16 118 65', // #107641
    '--color-success-900': '13 97 53', // #0d6135
    // warning | #fbbf24
    '--color-warning-50': '254 245 222', // #fef5de
    '--color-warning-100': '254 242 211', // #fef2d3
    '--color-warning-200': '254 239 200', // #feefc8
    '--color-warning-300': '253 229 167', // #fde5a7
    '--color-warning-400': '252 210 102', // #fcd266
    '--color-warning-500': '251 191 36', // #fbbf24
    '--color-warning-600': '226 172 32', // #e2ac20
    '--color-warning-700': '188 143 27', // #bc8f1b
    '--color-warning-800': '151 115 22', // #977316
    '--color-warning-900': '123 94 18', // #7b5e12
    // error | #f26c6c
    '--color-error-50': '253 233 233', // #fde9e9
    '--color-error-100': '252 226 226', // #fce2e2
    '--color-error-200': '252 218 218', // #fcdada
    '--color-error-300': '250 196 196', // #fac4c4
    '--color-error-400': '246 152 152', // #f69898
    '--color-error-500': '242 108 108', // #f26c6c
    '--color-error-600': '218 97 97', // #da6161
    '--color-error-700': '182 81 81', // #b65151
    '--color-error-800': '145 65 65', // #914141
    '--color-error-900': '119 53 53', // #773535
    // surface | #495a8f
    '--color-surface-50': '228 230 238', // #e4e6ee
    '--color-surface-100': '219 222 233', // #dbdee9
    '--color-surface-200': '210 214 227', // #d2d6e3
    '--color-surface-300': '182 189 210', // #b6bdd2
    '--color-surface-400': '128 140 177', // #808cb1
    '--color-surface-500': '73 90 143', // #495a8f
    '--color-surface-600': '66 81 129', // #425181
    '--color-surface-700': '55 68 107', // #37446b
    '--color-surface-800': '44 54 86', // #2c3656
    '--color-surface-900': '36 44 70', // #242c46
  },
} satisfies CustomThemeConfig;
