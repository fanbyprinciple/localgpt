function showButton() {
    var upButton = document.getElementById('up_button');
    var downButton = document.getElementById('down_button');

    if (upButton) {
        if (upButton.style.visibility == 'hidden') {
            upButton.style.visibility = 'visible';
        } else {
            upButton.style.visibility = 'hidden';
        }
        console.log('clicked');
    } else {
        console.log('up_button not found');
    }

    downButton.style.visibility = upButton.style.visibility;
  }

  function decreaseNumber() {
    // Retrieve current values from localStorage or set default if not present
    let totalWorkUps = parseInt(localStorage.getItem('totalWorkUps') || '1752');
    let currentCycle = parseInt(localStorage.getItem('currentCycle') || '129');
    
    // Check to prevent numbers from going below a certain threshold, e.g., 0
    totalWorkUps = totalWorkUps > 0 ? totalWorkUps - 1 : 0;
    currentCycle = currentCycle > 0 ? currentCycle - 1 : 0;
    
    // Update localStorage with new values
    localStorage.setItem('totalWorkUps', totalWorkUps.toString());
    localStorage.setItem('currentCycle', currentCycle.toString());
    
    // Update the elements' text with new values
    document.getElementById('totalWorkUps').innerText = totalWorkUps;
    document.getElementById('currentCycle').innerText = currentCycle;
    
    // Optionally update the date as well, similar to the increaseNumber function
    let currentDate = new Date();
    let formattedDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    let dateString = `Work up statistics updated ${formattedDate}`;
    document.getElementById('updateDate').innerText = dateString;
    
    // Persist the date as well
    localStorage.setItem('updatedDate', dateString);
  }

  
  function increaseNumber() {
    // Retrieve current values from localStorage or set default if not present
    let totalWorkUps = parseInt(localStorage.getItem('totalWorkUps') || '1752');
    let currentCycle = parseInt(localStorage.getItem('currentCycle') || '129');
    
    // Increase the numbers
    totalWorkUps += 1;
    currentCycle += 1;
    
    // Update localStorage with new values
    localStorage.setItem('totalWorkUps', totalWorkUps.toString());
    localStorage.setItem('currentCycle', currentCycle.toString());
    
    // Update the elements' text with new values
    document.getElementById('totalWorkUps').innerText = totalWorkUps;
    document.getElementById('currentCycle').innerText = currentCycle;
    
    // Update date to current system date
    let currentDate = new Date();
    let formattedDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    let dateString = `Work up statistics updated ${formattedDate}`;
    document.getElementById('updateDate').innerText = dateString;
    
    // Persist the date as well
    localStorage.setItem('updatedDate', dateString);
  }
  
  // Function to load stored values on page load
  function loadStoredValues() {
    // Load and display the stored values if they exist
    if (localStorage.getItem('totalWorkUps')) {
      document.getElementById('totalWorkUps').innerText = localStorage.getItem('totalWorkUps');
    }
    if (localStorage.getItem('currentCycle')) {
      document.getElementById('currentCycle').innerText = localStorage.getItem('currentCycle');
    }
    if (localStorage.getItem('updatedDate')) {
      document.getElementById('updateDate').innerText = localStorage.getItem('updatedDate');
    }
  }
  
  // Call loadStoredValues() when the page loads
  document.addEventListener('DOMContentLoaded', loadStoredValues);