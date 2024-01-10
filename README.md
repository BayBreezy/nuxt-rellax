# Nuxt Rellax

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

![Social image](/playground/public/social.png)

Unlock the power of seamless parallax effects in your Nuxt 3 applications with our Rellax module. Explore the documentation to effortlessly integrate this module, offering composable utilities and directives for an enhanced and dynamic web experience. Elevate your website's visual appeal with SEO-friendly parallax scrolling – the perfect blend of performance and aesthetics

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-rellax?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

- Seamless integration with Nuxt 3
- Composable & directives for easy use

## Quick Setup

1. Add `nuxt-rellax` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-rellax

# Using yarn
yarn add --dev nuxt-rellax

# Using npm
npm install --save-dev nuxt-rellax
```

2. Add `nuxt-rellax` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["nuxt-rellax"],
});
```

That's it! You can now use Nuxt Rellax in your Nuxt app ✨

## Usage

### Add it to the elements you want to have the parallax effect

#### Directive usage

You can pass the options directly to the directive:

```html
<DemoBox v-rellax="{ wrapper: '#custom-wrapper' }">
  <p>I have rellax</p>
</DemoBox>
```

#### Composable usage

You can pass the selector and the options to the composable

```ts
useRellax(".c-rellax", {
  // will apply to all elements
  wrapper: "#custom-wrapper-3",
});
```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-rellax/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-rellax
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-rellax.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-rellax
[license-src]: https://img.shields.io/npm/l/nuxt-rellax.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-rellax
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
