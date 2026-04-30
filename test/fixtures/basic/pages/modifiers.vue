<template>
  <div>
    <section id="mod-wrapper">
      <div
        v-rellax.center="{ speed: -2, wrapper: '#mod-wrapper' }"
        data-testid="center-modifier-el"
      >
        Center modifier
      </div>
      <div
        v-rellax.horizontal="{ speed: 3, vertical: false, wrapper: '#mod-wrapper' }"
        data-testid="horizontal-modifier-el"
      >
        Horizontal modifier
      </div>
      <div v-rellax="{ speed: -4, wrapper: '#mod-wrapper' }" data-testid="plain-directive-el">
        Plain directive
      </div>
    </section>
  </div>
</template>
