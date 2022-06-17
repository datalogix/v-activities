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
      py-6
      px-10
      rounded-xl
      shadow-xl
      max-w-lg
    >
      <header
        class="activity-modal-header"
        flex
        items-center
        justify-center
        space-x-4
      >
        <slot name="header" />
      </header>
      <main class="activity-modal-main">
        <slot />
      </main>
      <footer class="activity-modal-footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>
