<template>
  <div>
    <section id="re-wrapper">
      <RellaxElement :speed="-2" wrapper="#re-wrapper" data-testid="rellax-element-div">
        RellaxElement content
      </RellaxElement>
      <RellaxElement tag="span" :speed="3" data-testid="rellax-element-span">
        Span content
      </RellaxElement>
      <RellaxElement
        :speed="-1"
        :center="true"
        wrapper="#re-wrapper"
        data-testid="rellax-element-center"
      >
        Center content
      </RellaxElement>
    </section>
  </div>
</template>
