<template>
  <div class="currency">
    <div class="currency-search">
      <input type="text" v-model="search" />
    </div>
    <div class="currency-list">
      <div v-if="searchedCurrencies.length" class="currency-list-wrapper">
        <currency-card
          v-for="card in searchedCurrencies"
          :key="card.ID"
          :currency="card"
        />
      </div>
      <div v-else class="currency-list__empty">
        Пока нету никаких информации
      </div>
    </div>
  </div>
</template>

<script>
import CurrencyCard from "../components/CurrencyCard.vue";
import { mapState } from "vuex";
export default {
  name: "Home-page",
  data() {
    return {
      search: "",
    };
  },
  components: {
    CurrencyCard,
  },
  computed: {
    searchedCurrencies() {
      if (!Object.keys(this.currencies).length) return []
      let copy = []
      Object.keys(this.currencies.Valute).forEach(key => {
        copy.push(this.currencies.Valute[key])
      })
      return copy.filter((item) => {
        return this.search
          .toLowerCase()
          .split(" ")
          .every(
            (v) =>
              item.Name.toString()
                .toLowerCase()
                .includes(v) ||
              item.CharCode
                .toString()
                .toLowerCase()
                .includes(v)
          );
      });
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
.currency {
  display: flex;
  flex-direction: column;

  &-search {
    width: 100%;

    input {
      max-width: 150px;
      border-radius: 35px;
      border: 1px solid #3879f1;
      outline: none;
      padding: 5px 60px 5px 10px;
      transition: 0.2s all;
      background-image: url("../assets/images/loop.svg");
      background-repeat: no-repeat;
      background-size: 25px;
      background-position: 90% center;

      &:focus {
        max-width: 350px;
      }
    }
  }

  &-list {
    margin-top: 50px;
    padding: 20px;
    border-radius: 14px;
    background: #3879f1;

    &-wrapper {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 20px;
    }

    &__empty {
      width: 100%;
      text-align: center;
      font-size: 28px;
      color: #fff;
    }
  }
}
</style>
