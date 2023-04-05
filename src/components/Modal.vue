<template>
  <div
    class="activity-modal"
    bg-black
    bg-opacity-40
    absolute
    inset-0
    flex
    items-center
    justify-center
    z-20
  >
    <div
      class="activity-modal-container"
      bg-white
      py-4
      px-10
      rounded-xl
      shadow-xl
      m-4
    >
      <header
        v-if="$slots.header"
        class="activity-modal-header"
        flex
        items-center
        space-x-4
      >
        <slot name="header" />
      </header>

      <main
        v-if="$slots.default"
        class="activity-modal-main"
      >
        <slot />
      </main>

      <footer
        v-if="$slots.footer"
        class="activity-modal-footer"
      >
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>
