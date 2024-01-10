# Nuxt Rellax

![Social image](/public/social.png)

Unlock the power of seamless parallax effects in your Nuxt 3 applications with our Rellax module. Explore the documentation to effortlessly integrate this module, offering composable utilities and directives for an enhanced and dynamic web experience. Elevate your website's visual appeal with SEO-friendly parallax scrolling – the perfect blend of performance and aesthetics

## Get started

### Install the module

To get started, install the module with your preferred package manager:

```bash
npm install nuxt-rellax -D

# or

yarn add nuxt-rellax -D

# or

pnpm i nuxt-rellax -D
```

### Add it to your list of modules in `nuxt.config`

```ts
export default defineNuxtConfig({
  modules: ["nuxt-rellax"],
});
```

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
