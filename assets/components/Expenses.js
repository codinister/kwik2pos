import expensesEvent from '../state/events/pages/expensesEvent.js';
const expenses = () => {
  expensesEvent()
  return `
    <div class="container">expenses</div>
  `
}

export default expenses