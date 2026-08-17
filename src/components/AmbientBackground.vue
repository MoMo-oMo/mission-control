<template>
  <div class="ambient">
    <div class="ambient__orb ambient__orb--one" />
    <div class="ambient__orb ambient__orb--two" />
    <div class="ambient__orb ambient__orb--three" />
    <div class="ambient__grid" />
  </div>
</template>

<script setup></script>

<style scoped>
.ambient {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}
.ambient__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.4;
}
.ambient__orb--one {
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, #a855f7, transparent 70%);
  top: -160px;
  left: -120px;
  animation: float-a 24s ease-in-out infinite;
}
.ambient__orb--two {
  width: 560px;
  height: 560px;
  background: radial-gradient(circle, #ec4899, transparent 70%);
  top: 15%;
  right: -200px;
  animation: float-b 28s ease-in-out infinite;
}
.ambient__orb--three {
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, #3b82f6, transparent 70%);
  bottom: -180px;
  left: 20%;
  animation: float-c 32s ease-in-out infinite;
}
.ambient__grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(120, 100, 170, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(120, 100, 170, 0.06) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(circle at 50% 0%, black, transparent 70%);
  mask-image: radial-gradient(circle at 50% 0%, black, transparent 70%);
}
@keyframes float-a {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(50px, 60px); }
}
@keyframes float-b {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-60px, 40px); }
}
@keyframes float-c {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(40px, -50px); }
}
@media (prefers-reduced-motion: reduce) {
  .ambient__orb {
    animation: none;
  }
}
</style>
