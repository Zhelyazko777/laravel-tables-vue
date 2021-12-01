<template>
  <span 
    :title="showTooltipOnHover  ? tooltip : ''"
    :data-toggle="showTooltipOnHover  ? 'tooltip' : ''"
  >
    {{value ? (prefix + value + suffix) : '-' }}
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
}
</script>