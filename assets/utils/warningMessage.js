
const warningMessage = () => {
  return `
    <div class="warning-message">
    <i class="fa fa-exclamation"></i>
    <h4>Delete Member</h4>
    <p>
    Are you sure you want to delete this selected 
    member. This action can not be reversed.
    </p>

    <div>
      <button>Delete</button>
      <button class="close-modal">Close</button>
    </div>

  </div>
  `
}

export default warningMessage