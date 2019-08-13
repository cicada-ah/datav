<template>
  <div class="footer-link">
    <p>Copyright © 2019 Design and Development By sakura丶</p>
    <p>
      Contact Me by github :
      <a
        href="https://github.com/waiwai948"
        target="_blank"
        title="waiwai948"
        >sakura丶</a
      >
    </p>
  </div>
</template>

<script>
export default {
  name: "foot"
};
</script>

<style lang="scss">
.footer-link {
  position: relative;
  font-size: 18px;
  bottom: 0;
  left: 0;
  color: white;
  text-align: center;
  width: 100%;
  z-index: 1001;
  p {
    a {
      color: #e6e6fa;
      cursor: pointer;
    }
  }
}
</style>
