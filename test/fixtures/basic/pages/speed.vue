<template>
  <div>
    <section id="speed-wrapper" class="wrapper">
      <div v-rellax="{ wrapper: '#speed-wrapper' }" data-rellax-speed="3" data-testid="speed-3">
        Speed = 3
      </div>
      <div v-rellax="{ wrapper: '#speed-wrapper' }" data-rellax-speed="-5" data-testid="speed-neg5">
        Speed = -5
      </div>
    </section>
  </div>
</template>
