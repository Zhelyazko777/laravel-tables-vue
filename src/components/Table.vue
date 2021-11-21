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
                    scope="col">
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
                        <td v-for="(column) in columns"
                            :key="column.name"
                            :class="getColumnClass(column)"
                            class="align-middle">
                            <template v-if="column.isPhone && row[column.name] && checkIfValueClickable(index, column)">
                                <div class="table-cell-container">
                                    <div class="text-truncate"
                                         :class="column.tooltip && column.showTooltipIcon && checkShouldShowTooltip(index, column) ? 'has-tooltip-icon' : ''"
                                    >
                                        <a :href="`tel:${row[column.name]}`"
                                           :title="column.tooltip && checkShouldShowTooltip(index, column) && !column.showTooltipIcon ? column.tooltip : ''"
                                           :data-toggle="column.tooltip && checkShouldShowTooltip(index, column) && !column.showTooltipIcon ? 'tooltip' : ''">
                                            {{column.prefix}}{{row[column.name]}}{{column.suffix}}
                                        </a>
                                    </div>
                                    <div v-if="column.tooltip && column.showTooltipIcon && checkShouldShowTooltip(index, column)" class="tooltip-container">
                                        <i data-toggle="tooltip"
                                           :title="column.tooltip"
                                           class="fa fa-question-circle ml-3">
                                        </i>
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="column.route && row[column.name] && checkIfValueClickable(index, column)">
                                <div class="table-cell-container">
                                    <div class="text-truncate"
                                         :class="column.tooltip && column.showTooltipIcon && checkShouldShowTooltip(index, column) ? 'has-tooltip-icon' : ''"
                                    >
                                        <a  :href="column.route | replaceLinkId(row)"
                                            :title="column.tooltip && checkShouldShowTooltip(index, column) && !column.showTooltipIcon  ? column.tooltip : ''"
                                            :data-toggle="column.tooltip && checkShouldShowTooltip(index, column) && !column.showTooltipIcon  ? 'tooltip' : ''"
                                            target="_blank"
                                        >
                                            {{column.prefix}}{{row[column.name]}}{{column.suffix}}
                                        </a>
                                    </div>
                                    <div v-if="column.tooltip && column.showTooltipIcon && checkShouldShowTooltip(index, column)" class="tooltip-container">
                                        <i data-toggle="tooltip"
                                           :title="column.tooltip"
                                           class="fa fa-question-circle ml-3">
                                        </i>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="table-cell-container">
                                    <div class="text-truncate"
                                         :class="column.tooltip && column.showTooltipIcon && checkShouldShowTooltip(index, column) ? 'has-tooltip-icon' : ''"
                                    >
                                        <span :title="column.tooltip && checkShouldShowTooltip(index, column) && !column.showTooltipIcon  ? column.tooltip : ''"
                                              :data-toggle="column.tooltip && checkShouldShowTooltip(index, column) && !column.showTooltipIcon  ? 'tooltip' : ''">
                                              {{row[column.name] ? (column.prefix + row[column.name] + column.suffix) : '-' }}
                                        </span>
                                    </div>
                                    <div v-if="column.tooltip && column.showTooltipIcon && checkShouldShowTooltip(index, column)" class="tooltip-container">
                                        <i data-toggle="tooltip"
                                           :title="column.tooltip"
                                           class="fa fa-question-circle ml-3">
                                        </i>
                                    </div>
                                </div>
                            </template>
                        </td>
                        <td @click="onButtonsMenuContainerClick($event, row.id)" class="text-center btn-td">
                            <div class="content-wrapper">
                              <div class="mobile-action-buttons dropleft">
                                  <i :id="'expand-menu-button-' + row.id"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    class="fa fa-ellipsis-v">
                                  </i>

                                  <div class="dropdown-menu" :aria-labelledby="'expand-menu-button-' + row.id">
                                      <button
                                          v-if="isExpandable"
                                          :data-slider-menu="'expand-slider-' + row.id"
                                          class="dd-item">
                                          {{ translations.tableExpandButton }}
                                      </button>
                                      <template v-for="button in actionButtons">
                                          
                                          <span v-if="button.type === 'text'"
                                            v-on="buildTableButtonSubscriptions(button.subscriptions, row, columns)"
                                            v-bind="button.attrs"
                                            :key="button.name"
                                            :class="getCorrectButtonClass(index, button)"
                                            class="dd-item">
                                              {{ button.text }}
                                          </span>
                                          
                                          <a v-if="button.type === 'link'"
                                            v-on="buildTableButtonSubscriptions(button.subscriptions, row, columns)"
                                            v-bind="button.attrs"
                                            :key="button.name"
                                            :class="getCorrectButtonClass(index, button)"
                                            :href="button.route | replaceLinkId(row)"
                                            class="dd-item">
                                              {{ button.text }}
                                          </a>

                                          <button
                                              v-else-if="button.type === 'modal'"
                                              v-on="buildTableButtonSubscriptions(button.subscriptions, row)"
                                              v-bind="button.attrs"
                                              :key="button.name"
                                              :class="getCorrectButtonClass(index, button)"
                                              :data-target="`#${button.modalId}-${row.id}`"
                                              data-toggle="modal"
                                              class="dd-item">
                                              {{ button.text }}
                                          </button>

                                      </template>
                                  </div>
                              </div>
                            </div>
                            
                        </td>
                    </tr>

                    <div class="slider-menu" :id="'expand-slider-' + row.id" :key="'expand-slider-' + row.id">
                        <div class="loading-overlay">
                          <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div>
                        <div class="slide-menu-header-container">
                            <div class="bold menu-title">
                                {{translations.tableDetailsDefaultTitle}}
                            </div>
                            <div class="">
                                <i class="fa fa-times" :data-slider-menu-to-close="'expand-slider-' + row.id"></i>
                            </div>
                        </div>
                        <div class="data-container ps">
                            <div v-for="(column) in columns" class="slider-row" :key="column.name">
                                <p class="title">{{column.uiName}}</p>
                                <template v-if="column.isPhone && row[column.name] && checkIfValueClickable(index, column)">
                                    <a :href="`tel:${row[column.name]}`"
                                       :title="column.tooltip && checkShouldShowTooltip(index, column) ? column.tooltip : ''"
                                       :data-toggle="column.tooltip && checkShouldShowTooltip(index, column) ? 'tooltip' : ''"
                                       class="text">
                                        {{column.prefix}}{{row[column.name]}}{{column.suffix}}
                                    </a>
                                    <i v-if="column.tooltip && column.showTooltipIcon && checkShouldShowTooltip(index, column)"
                                       data-toggle="tooltip"
                                       :title="column.tooltip"
                                       class="fa fa-question-circle ml-3">
                                    </i>
                                </template>
                                <template v-else-if="column.route && row[column.name] && checkIfValueClickable(index, column)">
                                    <a  :href="column.route | replaceLinkId(row)"
                                        :title="column.tooltip && checkShouldShowTooltip(index, column) ? column.tooltip : ''"
                                        :data-toggle="column.tooltip && checkShouldShowTooltip(index, column) ? 'tooltip' : ''"
                                        target="_blank"
                                        class="text"
                                    >
                                      {{column.prefix}}{{row[column.name]}}{{column.suffix}}
                                    </a>
                                    <i v-if="column.tooltip && column.showTooltipIcon && checkShouldShowTooltip(index, column)"
                                       data-toggle="tooltip"
                                       :title="column.tooltip"
                                       class="fa fa-question-circle ml-3">
                                    </i>
                                </template>
                                <template v-else>
                                    <span :title="column.tooltip && checkShouldShowTooltip(index, column) ? column.tooltip : ''"
                                          :data-toggle="column.tooltip && checkShouldShowTooltip(index, column) ? 'tooltip' : ''"
                                          class="text">
                                        {{row[column.name] ? (column.prefix + row[column.name] + column.suffix) : '-' }}
                                    </span>
                                    <i v-if="column.tooltip && column.showTooltipIcon && checkShouldShowTooltip(index, column)"
                                       data-toggle="tooltip"
                                       :title="column.tooltip"
                                       class="fa fa-question-circle ml-3">
                                    </i>
                                </template>
                            </div>
                        </div>
                    </div>

                    <div v-for="button in actionButtons" :key="button.modalId + '-' + row.id">
                        <div v-if="button.type === 'modal'" class="modal fade" :id="button.modalId + '-' + row.id" role="dialog">
                            <div class="modal-dialog" :class="button.modalColor" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">{{ button.modalHeadingText }}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body" v-html="button.modalBodyText"></div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-link" data-dismiss="modal">{{ button.modalCancelText }}</button>
                                        <form :action="button.modalActionRoute | replaceLinkId(row)" method="post">
                                            <input type="hidden" name="_token" :value="csrf">
                                            <button type="submit" class="btn btn-primary">
                                                {{ button.modalSubmitText }}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data () {
        return {
          csrf: document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
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
    filters: {
        replaceLinkId (link, row) {
            const regex = `${encodeURI('[')}.+\\${encodeURI(']')}`;
            const match = link.match(RegExp(regex));
            if (match && match.length > 0) {
              const itemsToReplace = match[0].split('/');
              for (const item of itemsToReplace) {
                  const trimmedItem = item.replace(encodeURI('['), '').replace(encodeURI(']'), '');
                  if (trimmedItem === 'itemId') {
                      link = link.replace(encodeURI('[itemId]'), row.id);
                  } else {
                      link = link.replace(encodeURI(`[${trimmedItem}]`), row[trimmedItem]);
                  }
              }
            }

            return link;
        },
    },
    methods: {
        buildTableButtonSubscriptions (subscriptions, row, columns) {
            const result = {};
            const subscriptionsNames = Object.keys(subscriptions);
            for (const subscriptionName of subscriptionsNames) {
                result[subscriptionName] = (event) => {
                  const columnsWithValues = columns.map(c => {
                    return {
                        name: c.column,
                        value: row[c.column],
                    };
                  });
                  columnsWithValues.push({ 'name': 'id', 'value': row.id});
                  window[subscriptions[subscriptionName]](event, columnsWithValues);
                } 
            }

            return result;
        },
        checkIfRowSpecifiedInQueryString(rowId) {
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
        getCorrectButtonClass (rowIndex, button) {
            return (Object.keys(button.disableConditions).length > 0 &&
                    this.executeRawDataConditions(
                            rowIndex,
                            button.disableConditions
                    )) ? 'disabled' : '';
        },
        checkShouldShowTooltip(rowIndex, column) {
            if (Object.keys(column.removeTooltipConditions).length === 0) {
                return true;
            }

            return this.executeRawDataConditions(
                    rowIndex,
                    column.removeTooltipConditions
                );
        },
        checkIfValueClickable (rowIndex, column) {
            if (Object.keys(column.clickableConditions).length === 0) {
                return true;
            }

            return this.executeRawDataConditions(
                    rowIndex,
                    column.clickableConditions
                );
        },
        executeRawDataConditions (rawIndex, conditionTypes) {
            const andResults = [];
            const orResults = [];
            for (const conditionType in conditionTypes) {
                for (const condition of conditionTypes[conditionType]) {
                    const firstOperand = this.rows[rawIndex][condition[0]];
                    const operator = condition[1];
                    const secondOperand = condition[2];

                    if (conditionType === 'or') {
                        orResults.push(
                            this.conditionExecute(
                                firstOperand,
                                operator,
                                secondOperand,
                            )
                        );
                    } else if (conditionType === 'and') {
                        andResults.push(
                            this.conditionExecute(
                                firstOperand,
                                operator,
                                secondOperand,
                            )
                        );
                    }
                }
            }

            if (andResults.length !== 0) {
                return andResults.every(x => x === true);
            } else if (orResults.length !== 0) {
                return orResults.some(x => x === true);
            }

            console.warn('Single conditions only supported, add mixed conditions support in Table component');
            return false;
        },
        conditionExecute(firstOperand, operator, secondOperand) {
            switch (operator) {
                case '==':
                    return firstOperand === secondOperand;
                case '!=':
                    return firstOperand !== secondOperand;
                case '>=':
                    return firstOperand >= secondOperand;
                case '<=':
                    return firstOperand <= secondOperand;
            }
        },
        getColumnClass(column) {
            let classes = [];
            if (column.isHiddenOnMobile) {
                classes.push('hide-on-mobile');
            }
            if (column.isHiddenOnDesktop) {
                classes.push('hide-on-desktop');
            }

            return classes.join(' ');
        }
    }
}
</script>

<style lang="scss" scoped>
    @import './../scss/vue.scss';
    
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
                    // padding-bottom: 3px;
                    // padding-top: 3px;
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
                        }
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
                        .tooltip-container {
                            display: inline-block;
                            max-width: 10%;
                        }
                        a {
                            text-decoration: underline;
                            color: $black;
                        }
                    }

                    .mobile-action-buttons {
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
            }
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
        }
    }
</style>
