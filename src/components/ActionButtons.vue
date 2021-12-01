<template>
  <div class="content-wrapper">
    <div class="action-buttons dropleft">
      <i 
        :id="id"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        class="fa fa-ellipsis-v"
      ></i>
      <div class="dropdown-menu" :aria-labelledby="id">
        <button
          v-if="showExpandableBtn"
          :data-slider-menu="generateExpandSliderId(row.id)"
          class="dd-item"
        >
          {{ expandableBtnText }}
        </button>
        <template v-for="button in buttons">
      
          <span 
            v-if="button.type === 'text'"
            v-on="buildTableButtonSubscriptions(button.subscriptions)"
            v-bind="button.attrs"
            :key="button.name"
            :class="checkIsButtonDisabled(button) ? 'disabled' : ''"
            class="dd-item">
              {{ button.text }}
          </span>
          
          <a 
            v-if="button.type === 'link'"
            v-on="buildTableButtonSubscriptions(button.subscriptions)"
            v-bind="button.attrs"
            :key="button.name"
            :class="checkIsButtonDisabled(button) ? 'disabled' : ''"
            :href="button.route | replaceLinkId(row)"
            class="dd-item">
              {{ button.text }}
          </a>

          <button
              v-else-if="button.type === 'modal'"
              v-on="buildTableButtonSubscriptions(button.subscriptions)"
              v-bind="button.attrs"
              :key="button.name"
              :class="checkIsButtonDisabled(button) ? 'disabled' : ''"
              :data-target="`#${generateModalId(row.id, button.modalId)}`"
              data-toggle="modal"
              class="dd-item">
              {{ button.text }}
          </button>

        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ModalMixin from '../mixins/modal.mixin';
import ExpandableSliderMixin from './../mixins/expandable-slider.mixin.js';

export default {
  props: {
    id: {
      required: true,
      type: String,
    },
    showExpandableBtn: {
      required: true,
      type: Boolean,
    },
    expandableBtnText: {
      required: true,
      type: String,
    },
    buttons: {
      required: true,
      type: Array,
    },
    columns: {
      required: true,
      type: Array,
    },
    row: {
      required: true,
      type: Object,
    },
    rowIndex: {
      required: true,
      type: Number,
    }
  },
  mixins: [ ModalMixin, ExpandableSliderMixin ],
  methods: {
    buildTableButtonSubscriptions (subscriptions) {
        const result = {};
        const subscriptionsNames = Object.keys(subscriptions);
        for (const subscriptionName of subscriptionsNames) {
            result[subscriptionName] = (event) => {
              const columnsWithValues = this.columns.map(c => {
                return {
                    name: c.column,
                    value: this.row[c.column],
                };
              });
              columnsWithValues.push({ 'name': 'id', 'value': this.row.id});
              window[subscriptions[subscriptionName]](event, columnsWithValues);
            } 
        }

        return result;
    },
    checkIsButtonDisabled (button) {
        return Object.keys(button.disableConditions).length > 0 && 
          this.executeRawDataConditions(this.rowIndex, button.disableConditions);
    },
  }
}
</script>

<style lang="scss" scoped>
  @import './../scss/vue.scss';
  .content-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      border-left: 1px solid $black;
      height: 70%;

      @include md {
        content: none;
      }
    }
    .action-buttons {
      color: $default-text-color;
      cursor: pointer;

      .dropdown-menu {
        .dd-item {
          display: block;
          padding: .2em 1em;
          width: 100%;
          border-bottom: 1px solid $grey;

          &:last-child {
            border-bottom: 0;
          }
          &:hover {
            background-color: $grey;
          }
          &.disabled {
            pointer-events: none;
            cursor: default;
            text-decoration: none;
            color: $grey-darker;

            &:hover {
              background-color: $white;
            }
          }
        }
      }
      a {
        color: $default-text-color;
        user-select: none;
        text-decoration: none;

        &:hover {
          text-decoration: none;
        }
      }
      button:not(.btn) {
        color: $default-text-color;
        background-color: transparent;
        border: none;
        padding: 0;
        text-align: left;
      }
    }
  }
</style>