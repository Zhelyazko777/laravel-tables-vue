import ConditionsMixin from "./conditions.mixin";
import LinkMixin from "./link.mixin";

export default {
  mixins: [ConditionsMixin, LinkMixin],
  methods: {
      checkShouldShowTooltip(row, column) {
        if (Object.keys(column.removeTooltipConditions).length === 0) {
            return true;
        }

        return this.executeRawDataConditions(
                row,
                column.removeTooltipConditions
            );
    },
    checkIfValueClickable (row, column) {
        if (Object.keys(column.clickableConditions).length === 0) {
            return true;
        }

        return this.executeRawDataConditions(
                row,
                column.clickableConditions
            );
    },
  }
}