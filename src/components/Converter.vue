<template>
  <div class="converter">
    <div class="converter-block">
      <div class="converter-block__title">
        {{ mainValue.Name }}
      </div>
      <div class="converter-block-content">
        <el-select
          class="converter__select"
          value-key="ID"
          v-model="mainValue"
          placeholder=""
          size="small"
        >
          <el-option
            v-for="item in currency"
            :key="item.CharCode"
            :label="item.CharCode"
            :value="item"
          >
          </el-option>
        </el-select>
        <input v-model="InputValue" class="converter__input" type="number" />
      </div>
    </div>
    <button class="converter__switcher" @click="switchValue(mainValue, resultValue, result)">
      <svg class="rate__arrow" viewBox="0 0 32 32">
        <path
          d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z"
        ></path>
      </svg>
    </button>
    <div class="converter-block">
      <div class="converter-block__title">
        {{ resultValue.Name }}
      </div>
      <div class="converter-block-content">
        <el-select
          class="converter__select"
          value-key="ID"
          v-model="resultValue"
          placeholder=""
        >
          <el-option
            v-for="item in currency"
            :key="item.ID"
            :label="item.CharCode"
            :value="item"
          >
          </el-option>
        </el-select>
        <input
          v-model="result"
          class="converter__input"
          type="number"
          readonly
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "converter",
  data() {
    return {
      mainValue: {},
      InputValue: "",
      resultValue: {},
    };
  },
  computed: {
    result() {
      if (this.InputValue === "") return "";
      let result = "";
      let resultCopy = [];
      let dotIndex = null;
      let mainRate =
        this.InputValue * (this.mainValue.Value / this.mainValue.Nominal);
      result = mainRate / (this.resultValue.Value / this.resultValue.Nominal);
      resultCopy = result.toString().split("");
      console.log(resultCopy, "out");
      dotIndex = resultCopy.findIndex((el) => el === ",");

      if (resultCopy.length - (dotIndex + 1) > 2) {
        console.log(result, "in");
        result = result.toFixed(2);
      }
      return result;
    },
  },
  methods: {
    switchValue(main, result, resultInput) {
      this.mainValue = result
      this.resultValue = main
      this.InputValue = resultInput
    }
  },
  mounted() {
    this.mainValue = { ...this.currency[0] };
    this.resultValue = { ...this.currency[1] };
  },
  props: {
    currency: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.converter {
  display: flex;
  align-items: center;
  justify-content: center;

  &-wrapper {
    width: fit-content;
  }

  &-block {
    border-radius: 14px;
    background: #fff;
    padding: 12px;

    &__title {
      font-size: 16px;
      color: grey;
      margin-bottom: 5px;
    }

    &-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__switcher {
    margin: 0 30px;
    border-radius: 50%;
    border: 0;
    width: 50px;
    height: 50px;
    transition: 0.2s transform;

    &:active {
      transform: scale(0.8);

      svg {
        transform: rotate(180deg);
      }
    }

    svg path {
      fill: #2d92d4;
    }
  }

  &__select {
    width: 100px;
    margin-right: 24px;

    .el-input__inner {
      padding-left: 0;
      border: 0;
      font-size: 24px;
    }
  }

  &__input {
    border: 0;
    border-bottom: 1px solid grey;
    outline: none;

    &:not(:read-only):focus {
      border-bottom: 1px solid #3879f1;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
