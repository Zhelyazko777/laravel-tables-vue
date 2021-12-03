<template>
  <span 
    :title="showTooltipOnHover  ? tooltip : ''"
    :data-toggle="showTooltipOnHover  ? 'tooltip' : ''"
  >
    <span class="prefix">{{prefix}}</span>
    <span class="value">{{value}}</span>
    <span class="suffix">{{suffix}}</span>
  </span>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      type: String|null,
    },
    prefix: {
      required: true,
      type: String|null,
    },
    suffix: {
      required: true,
      type: String|null,
    },
    tooltip: {
      required: true,
      type: String|null,
    },
    showTooltipOnHover: {
      required: true,
      type: Boolean|null,
    },
  },
  computed: {
    cellValue () {
      let result = '-';

      if (this.value) {
        result = this.value;
      }
      if (this.prefix) {
        result = this.prefix + result;
      }
      if (this.suffix) {
        result = result + this.suffix;
      }

      return result;
    }
  }
}
</script>