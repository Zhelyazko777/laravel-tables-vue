<template>
  <slider ref="slider" :title="title">
    <div v-for="column in shownColumns" class="slider-row" :key="column.name">
      <p class="title">{{column.uiName}}</p>
      <div class="row-body">
        <phone-value
          v-if="column.isPhone && row[column.name] && checkIfValueClickable(row, column)"
          :value="row[column.name]"
          :prefix="column.prefix"
          :suffix="column.suffix"
          :tooltip="column.tooltip"
          :showTooltipOnHover="column.tooltip && checkShouldShowTooltip(row, column) && !column.showTooltipIcon"
        />
        <link-value
          v-else-if="column.route && row[column.name] && checkIfValueClickable(row, column)"
          :value="row[column.name]"
          :route="column.route | replaceLinkId(row)"
          :prefix="column.prefix"
          :suffix="column.suffix"
          :tooltip="column.tooltip"
          :showTooltipOnHover="column.tooltip && checkShouldShowTooltip(row, column) && !column.showTooltipIcon"
        />
        <text-value
          v-else-if="row[column.name]"
          :value="row[column.name]"
          :prefix="column.prefix"
          :suffix="column.suffix"
          :tooltip="column.tooltip"
          :showTooltipOnHover="column.tooltip && checkShouldShowTooltip(row, column) && !column.showTooltipIcon"
        />
        <span v-if="!row[column.name]" v-html="'&mdash;'" class="empty-value"></span>
        <div
          v-if="column.tooltip && column.showTooltipIcon && checkShouldShowTooltip(row, column)"
          :title="column.tooltip"
          data-toggle="tooltip"
          class="ml-3 row-tooltip"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"/>
          </svg>
        </div>
      </div>
    </div>
  </slider>
</template>

<script>
import PresentableMixin from './../mixins/presentable.mixin.js';

export default {
  props: {
    id: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    columns: {
      required: true,
      type: Array,
    },
    row: {
      required: true,
      type: Object,
    },
  },
  mixins: [PresentableMixin],
  computed: {
      shownColumns () {
        return this.columns.filter(c => !c.isHidden);
      }
  },
  methods: {
    open () {
      this.$refs.slider?.open();
    }
  }
}
</script>

<style lang="scss">
  .slider-menu {
    .data-container {
      text-align: left;
      padding: 15px;

      .slider-row {
        margin-bottom: 1em;

        @include md {
          font-size: 1.2em;
        }
        .row-tooltip svg {
          height: 1rem;
        }
        a {
          text-decoration: underline;
          color: $black;
        }
        .title {
          font-weight: 500!important;
          margin-bottom: .4em;
        }
        .row-body {
          display: flex;
        }
      }
    }
  }
</style>