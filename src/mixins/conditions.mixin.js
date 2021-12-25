export default {
  methods: {
    executeRawDataConditions (row, conditionTypes) {
      const andResults = [];
      const orResults = [];
      for (const conditionType in conditionTypes) {
          for (const condition of conditionTypes[conditionType]) {
              const firstOperand = row[condition[0]];
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