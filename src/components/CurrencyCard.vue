<template>
  <div class="currency-card">
    <div class="currency-card__title">
      {{ currency.Name }}
    </div>
    <div class="currency-card-content">
      <div class="currency-card__rate">
        <div class="rate__main">
          {{ currency.Nominal }}
          <span>
            {{ currency.CharCode }}
          </span>
        </div>
        <svg class="rate__arrow" viewBox="0 0 32 32">
          <path
            d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z"
          ></path>
        </svg>
        <div class="rate__amount">
          {{ currency.Value }}
          <span>
            RUB
          </span>
        </div>
      </div>
      <div
        class="currency-card__diff"
        :class="currency.Value - currency.Previous > 0 ? 'up' : 'down'"
      >
        <svg viewBox="0 0 32 32">
          <path
            d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z"
          ></path>
        </svg>
        <p>
          {{ currencyDiff(currency.Value, currency.Previous) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "currency-card",
  props: {
    currency: {
      type: Object,
      required: true,
    },
  },
  methods: {
    currencyDiff(newValue, oldValue) {
      let result = newValue - oldValue;
      if (result < 0) {
        result = result.toString();
        result = result.slice(1, Infinity);
      }
      return (+result).toFixed(4);
    },
  },
};
</script>

<style lang="scss" scoped>
.currency-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 15px;
  padding: 14px;
  box-shadow: 0 5px 10px rgba($color: #000000, $alpha: 0.2);

  &__title {
    color: grey;
    font-size: 16px;
    margin-bottom: 8px;
  }

  &-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  &__rate {
    display: flex;
    align-items: center;
  }

  &__diff {
    display: flex;
    align-items: center;
    font-size: 24px;

    &.up {
      color: #13c913;

      svg {
        width: 20px;
        transform: rotate(-90deg);

        path {
          fill: #13c913;
        }
      }
    }

    &.down {
      color: red;

      svg {
        width: 20px;
        transform: rotate(90deg);

        path {
          fill: red;
        }
      }
    }

    p {
      margin: 0 0 0 8px;
    }
  }

  .rate {
    &__main {
      display: flex;
      align-items: center;
      font-size: 24px;

      span {
        margin-left: 5px;
      }
    }
    &__arrow {
      width: 20px;
      margin: 0 24px;
    }
    &__amount {
      display: flex;
      align-items: center;
      font-size: 24px;

      span {
        margin-left: 5px;
      }
    }
  }
}
</style>
