/**
 * Takes transactions and returns an object containing the totals for each category of transaction
 * @param {array} transactions
 * @return {object} an object where the keys are categories and the values are the total spent
 */

const addFirstCategoryTransaction = (obj, transaction) => {
  obj[transaction.category] = {
    total: transaction.amount,
    transactions: [transaction]
  };
  return Object.assign({}, obj);
};

module.exports = function calculateCategoryTotals(transactions) {
  const categoryTotals = transactions
    .filter(transaction => {
      const now = new Date();
      const then = new Date(transaction.transactionDate);
      // if not in same month, add thirty days to the days per month difference
      // this is an average of course, and could probably be improved to be specific
      // to each month's number of days
      const monthsDifference = now.getMonth() - then.getMonth();
      const rawDaysDifference = now.getDate() - then.getDate();
      const daysDifference = monthsDifference > 0
        ? monthsDifference * 30 + rawDaysDifference
        : rawDaysDifference;
      return daysDifference <= 31;
    })
    .reduce((prev, curr, i, self) => {
      // first iteration will have the first array item as prev and second as curr
      // last iteration will have last array item as curr
      // on first iteration, need to initialize the categories object
      if (i == 1) {
        prev = addFirstCategoryTransaction({}, prev);
      }
      // prev will contain the category totals up to this iteration
      if (prev[curr.category]) {
        prev[curr.category].total = prev[curr.category].total + curr.amount;
        prev[curr.category].transactions.push(curr);
      } else {
        prev = addFirstCategoryTransaction(prev, curr);
      }
      return prev;
    });

  // return Object.assign(categoryDefaults, categoryTotals);
  return categoryTotals;
};
