<template>
  <a 
    :href="route"
    :title="showTooltipOnHover ? tooltip : ''"
    :data-toggle="showTooltipOnHover ? 'tooltip' : ''"
  >
      <span class="prefix">{{prefix}}</span>
      <span class="value">{{value}}</span>
      <span class="suffix">{{suffix}}</span>
  </a>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      type: String|null,
    },
    route: {
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
}
</script>