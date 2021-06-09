<template>
  <div class="layout main">
    <div class="main-nav">
      <div class="container">
        <div class="main-nav-wrapper">
          <router-link class="main-nav__link" to="/">
            Список валют
          </router-link>
          <router-link class="main-nav__link" to="/convert">
            Конвертор
          </router-link>
        </div>
      </div>
    </div>
    <div class="main-page">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-layout",
};
</script>

<style lang="scss">
.main {
  &-nav {
    background: #3879f1;
    padding: 15px 0;
    box-shadow: 0 5px 10px rgba(#000, 0.3);
    z-index: 100;

    &-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__link {
      position: relative;
      color: #fff;
      text-decoration: none;
      font-size: 24px;
      opacity: 0.9;

      &:hover {
        color: #fff;

        &::after {
          width: 100%;
        }
      }

      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        width: 0;
        height: 2px;
        background: #fff;
        transition: .2s width;
      }

      &.router-link-exact-active::after {
        width: 100%;
      }

      &:not(:last-child) {
        margin-right: 24px;
      }
    }
  }
  &-page {
    padding: 50px 0;
  }
}
</style>
