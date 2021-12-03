<template>
  <div>
    <table class="table abstract-table">
      <thead>
        <tr>
          <th class="padding"></th>
          <th
            v-for="column in columns"
            :key="column.name"
            :class="getColumnClass(column)"
            scope="col"
          >
            {{column.uiName}}
          </th>
          <th scope="col" class="btn-th"></th>
        </tr>
      </thead>
        <tbody>

          <tr v-if="rows.length == 0">
            <td class="no-items-text">{{ noItemsText }}</td>
          </tr>

          <template v-for="(row, index) in rows">
            <tr :key="row.id" :class="checkIfRowSpecifiedInQueryString(row.id) ? 'marked' : ''">
              <td></td>
              <td 
                v-for="(column) in columns"
                :key="column.name"
                :class="getColumnClass(column)"
                class="align-middle"
              >
                <div class="table-cell-container">
                  <div 
                    class="text-truncate"
                    :class="column.tooltip && column.showTooltipIcon && checkShouldShowTooltip(index, column) ? 'has-tooltip-icon' : ''"
                  >
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
                  </div>
                  <div
                    v-if="column.tooltip && column.showTooltipIcon && checkShouldShowTooltip(index, column)"
                    :title="column.tooltip"
                    data-toggle="tooltip"
                    class="ml-3 row-tooltip"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"/>
                    </svg>
                  </div>
                </div>
              </td>
              <td @click="onButtonsMenuContainerClick($event, row.id)" class="text-center btn-td">
                <action-buttons
                  :id="'expand-menu-button-' + row.id"
                  :showExpandableBtn="isExpandable"
                  :expandableBtnText="translations.tableExpandButton"
                  :buttons="actionButtons"
                  :row="row"
                  :rowIndex="index"
                  :columns="columns"
                  @expand="onExpanedBtnClick(index)"
                />
              </td>
            </tr>

            <expandable-slider
              :ref="`expandable-slider-${index}`"
              :key="generateExpandSliderId(row.id)"
              :id="generateExpandSliderId(row.id)"
              :title="translations.tableDetailsDefaultTitle"
              :row="row"
              :columns="columns"
            />
            
            <div v-for="button in actionButtons" :key="generateModalId(row.id, button.modalId)">
              <confirmation-modal 
                v-if="button.type === 'modal'" 
                :id="generateModalId(row.id, button.modalId)"
                :heading="button.modalHeadingText"
                :body="button.modalBodyText"
                :actionRoute="button.modalActionRoute | replaceLinkId(row)"
                :cancelBtnText="button.modalCancelText"
                :submitBtnText="button.modalSubmitText"
              />
            </div>
          </template>

        </tbody>
    </table>
  </div>
</template>

<script>
import { initJqueryCode } from './../jquery';
import PresentableMixin from './../mixins/presentable.mixin.js';
import ExpandableSliderMixin from './../mixins/expandable-slider.mixin.js';
import ModalMixin from './../mixins/modal.mixin.js';
import CsrfMixin from './../mixins/csrf.mixin.js';

export default {
    data () {
      return {
        translations: this.$laravelFormsConfig.componentTranslations,
      };
    },
    props: {
      columns: {
        type: Array,
        required: true,
      },
      rows: {
        type: Array,
        required: true,
      },
      actionButtons: {
        type: Array,
        required: true,
      },
      noItemsText: {
        type: String,
        required: true,
      },
      isExpandable: {
        type: Boolean,
        required: true,
      },
      sliderTitle: {
        type: String,
      }
    },
    mixins: [
      CsrfMixin,
      ExpandableSliderMixin,
      PresentableMixin, 
      ModalMixin, 
    ],
    methods: {
      onExpanedBtnClick (index) {
        this.$refs[`expandable-slider-${index}`][0].open();
      },
        checkIfRowSpecifiedInQueryString (rowId) {
          const itemId = new URLSearchParams(window.location.search).get('itemId');
          return itemId && itemId == rowId;
        },
        onButtonsMenuContainerClick ($event, rowId) {
            if (!$event.target.classList.contains('dd-item')) {
              setTimeout(() => {
                $(`#expand-menu-button-${rowId}`).click();
              })
            }
        },
        checkShouldShowTooltip (rowIndex, column) {
            if (Object.keys(column.removeTooltipConditions).length === 0) {
              return true;
            }

            return this.executeRawDataConditions(
                    rowIndex,
                    column.removeTooltipConditions
                  );
        },
        getColumnClass (column) {
          let classes = [];
          if (column.isHiddenOnMobile) {
            classes.push('hide-on-mobile');
          }
          if (column.isHiddenOnDesktop) {
            classes.push('hide-on-desktop');
          }

          return classes.join(' ');
        },
        initSliders () {
          initJqueryCode();
        },
    }
}
</script>

<style lang="scss" scoped>
    table {
      table-layout: fixed;
      position: relative;

      thead {
        th {
          background-color: #EDEDED;
          border: none;
          height: 45px;
          padding-left: 0!important;

          @include md {
            font-size: $mobile-font-size;
          }
          &:first-of-type {
            width: $profile-table-left-right-padding!important;

            @include md {
              width: 20px!important;
            }
          }
          &:last-of-type {
            width: $profile-table-left-right-padding;
          }
          &.hide-on-desktop {
            display: none;
          }
          &.hide-on-mobile {
            @include md {
              display: none;
            }
          }
          &.btn-th {
            position: relative;

            &:before {
              content: '';
              position: absolute;
              left: 0;
              border-left: 1px solid $black;
              height: 70%;
              top: 50%;
              transform: translateY(-50%);

              @include md {
                content: none;
              }
            }
          }
        }
      }
      tbody {
        tr {
          &.marked {
            background-color: #68cb2b2e;
          }
          td {
            border-left: none;
            border-right: none;
            height: 45px;
            padding-left: 0!important;

            @include md {
              font-size: $mobile-font-size;
            }
            &:not(td:last-of-type) {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            &.no-items-text {
              border-top: none;
              padding-left: 0;
              width: 100%;
              margin-top: 1em;
              position: absolute;
              text-align: center;
            }
            &.btn-td {
              padding-left: 0;
              padding-right: 0;
              position: relative;
              cursor: pointer;
            }
            &.hide-on-desktop {
              display: none;
            }
            &.hide-on-mobile {
              @include md {
                display: none;
              }
            }
            .table-cell-container {
              display: flex;

              .text-truncate.has-tooltip-icon {
                max-width: calc(80% - 1rem);
              }
              .row-tooltip {
                display: inline-block;
                max-width: 10%;

                svg {
                  height: 1rem;
                }
              }
              a {
                text-decoration: underline;
                color: $black;
              }
            }
          }
        }
      }
    }
</style>

<style lang="scss">
  @import './../scss/right-panel.scss';
</style>