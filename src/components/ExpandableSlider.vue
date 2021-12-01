<template>
  <div class="slider-menu" :id="id">
    <div class="slide-menu-header-container">
        <div class="bold menu-title">
            {{title}}
        </div>
        <div class="">
            <i class="fa fa-times" :data-slider-menu-to-close="'expand-slider-' + row.id"></i>
        </div>
    </div>
    <div class="data-container ps">
      <div v-for="(column) in columns" class="slider-row" :key="column.name">
        <p class="title">{{column.uiName}}</p>
        <phone-value
          v-if="column.isPhone && row[column.name] && checkIfValueClickable(index, column)"
          :value="row[column.name]"
          :prefix="column.prefix"
          :suffix="column.suffix"
          :tooltip="column.tooltip"
          :showTooltipOnHover="column.tooltip && checkShouldShowTooltip(index, column) && !column.showTooltipIcon"
        />
        <link-value
          v-else-if="column.route && row[column.name] && checkIfValueClickable(index, column)"
          :value="row[column.name]"
          :route="column.route | replaceLinkId(row)"
          :prefix="column.prefix"
          :suffix="column.suffix"
          :tooltip="column.tooltip"
          :showTooltipOnHover="column.tooltip && checkShouldShowTooltip(index, column) && !column.showTooltipIcon"
        />
        <text-value
          v-else
          :value="row[column.name]"
          :prefix="column.prefix"
          :suffix="column.suffix"
          :tooltip="column.tooltip"
          :showTooltipOnHover="column.tooltip && checkShouldShowTooltip(index, column) && !column.showTooltipIcon"
        />
        <i 
          v-if="column.tooltip && column.showTooltipIcon && checkShouldShowTooltip(index, column)"
          :title="column.tooltip"
          data-toggle="tooltip"
          class="fa fa-question-circle ml-3"
        ></i>
      </div>
    </div>
  </div>
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
}
</script>

<style lang="scss" scoped>
  @import './../scss/vue.scss';

  .slider-menu {
    .data-container {
      text-align: left;
      padding: 15px;

      .slider-row {
        margin-bottom: 1em;

        @include md {
          font-size: 1.2em;
        }
        a {
          text-decoration: underline;
          color: $black;
        }
        .title {
          font-weight: 500!important;
          margin-bottom: .4em;
        }
        .text {
          font-size: .9em;
          margin-bottom: 0;
        }
      }
    }
  }
</style>