<template>
  <div class="content-wrapper">
    <div class="action-buttons dropleft">
      <div
        :id="id"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
          <path d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"/>
        </svg>
      </div>
      <div class="dropdown-menu" :aria-labelledby="id">
        <button
          v-if="showExpandableBtn"
          @click="onExpandBtnClick"
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
    onExpandBtnClick () {
      this.$emit('expand');
    },
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

      svg {
        height: 1rem;
      }
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