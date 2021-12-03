export default {
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
  }
}