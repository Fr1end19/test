<template>
  <div class="convert">
    <div class="convert-wrapper" v-if="searchedCurrencies.length">
      <converter :currency="searchedCurrencies" />
    </div>
  </div>
</template>

<script>
import Converter from "../components/Converter.vue";
import { mapState } from "vuex";

export default {
  name: "Convert-page",
  components: { Converter },
  computed: {
    searchedCurrencies() {
      if (!Object.keys(this.currencies).length) return [];
      let copy = [];
      Object.keys(this.currencies.Valute).forEach((key) => {
        copy.push(this.currencies.Valute[key]);
      });
      return copy;
    },
    ...mapState({
      currencies: (state) => state.currencies,
    }),
  },
  async mounted() {
    await this.$store.dispatch("fetchCurrencies");
  },
};
</script>

<style lang="scss" scoped>
.convert {
  &-wrapper {
    width: 100%;
    padding: 20px;
    border-radius: 14px;
    background: #3879f1;
  }
}
</style>
