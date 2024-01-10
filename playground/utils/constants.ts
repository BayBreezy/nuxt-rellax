export default () => {
  return {
    customWrapper: `<section id="custom-wrapper" class="h-[500px] scroll-mt-[300px] overflow-y-auto rounded-lg bg-muted p-5 lg:scroll-mt-[200px] lg:p-10">
  <div class="flex h-dvh items-center justify-center gap-5">
    <DemoBox v-rellax="{ wrapper: '#custom-wrapper' }">
      <p>I have rellax</p>
    </DemoBox>
    <DemoBox>
      <p>I have no rellax</p>
    </DemoBox>
  </div>
</section>`,
    speedWrapper: `<section id="custom-wrapper-2" class="h-[500px] scroll-mt-[300px] overflow-y-auto rounded-lg bg-muted p-5 lg:scroll-mt-[200px] lg:p-10">
  <div class="flex h-dvh items-center justify-center gap-5">
    <DemoBox v-rellax="{ wrapper: '#custom-wrapper-2' }" data-rellax-speed="3">
      <p>Speed = 3</p>
    </DemoBox>
    <DemoBox v-rellax="{ wrapper: '#custom-wrapper-2' }" data-rellax-speed="-1">
      <p>Speed = -1</p>
    </DemoBox>
    <DemoBox v-rellax="{ wrapper: '#custom-wrapper-2' }" data-rellax-speed="-5">
      <p>Speed = -5</p>
    </DemoBox>
  </div>
</section>`,
    composableHtml: `<section id="custom-wrapper-3" class="h-[500px] scroll-mt-[300px] overflow-y-auto rounded-lg bg-muted p-5 lg:scroll-mt-[200px] lg:p-10">
  <div class="flex h-dvh items-center justify-center gap-5">
    <DemoBox class="c-rellax" data-rellax-speed="-3">
      <p>Speed = -3</p>
    </DemoBox>
    <DemoBox class="c-rellax" data-rellax-speed="-1">
      <p>Speed = -1</p>
    </DemoBox>
  </div>
</section>`,
    composableScript: `<script lang="ts" setup>
  const rellaxInstance = useRellax(".c-rellax", {
    // will apply to all elements
    wrapper: "#custom-wrapper-3",
  });
</script>`,
  };
};
