// GLOBAL VARIABLES
var currentHour = moment().hours(); // Get current hour using moment.js
var timeBlockEl = document.querySelector('.container');

// REFERENCES
// Display the current date and time on the paragraph with an id of "currentDay"
document.getElementById('currentDay').textContent = moment().format('LLLL');

// EVENT LISTENER
// Event listener for saveBtn click
document.querySelectorAll('.saveBtn').forEach(function (saveBtn) {
  saveBtn.addEventListener('click', function () {
    // get nearby values of the description
    var textValue = this.previousElementSibling.value;
    // get the id attribute of the parent div element
    var timeKey = this.parentNode.id;

    // save in local storage
    localStorage.setItem(timeKey, textValue);
  });
});

// Get item from local storage if any
document.getElementById('hour8').querySelector('.description').value = localStorage.getItem('hour8');
document.getElementById('hour9').querySelector('.description').value = localStorage.getItem('hour9');
document.getElementById('hour10').querySelector('.description').value = localStorage.getItem('hour10');
document.getElementById('hour11').querySelector('.description').value = localStorage.getItem('hour11');
document.getElementById('hour12').querySelector('.description').value = localStorage.getItem('hour12');
document.getElementById('hour13').querySelector('.description').value = localStorage.getItem('hour13');
document.getElementById('hour14').querySelector('.description').value = localStorage.getItem('hour14');
document.getElementById('hour15').querySelector('.description').value = localStorage.getItem('hour15');
document.getElementById('hour16').querySelector('.description').value = localStorage.getItem('hour16');
document.getElementById('hour17').querySelector('.description').value = localStorage.getItem('hour17');

// FUNCTION TO AUDIT TASKS AND MAKE THEM CHANGE COLORS
function auditTask() {
  // loop over each time block
  document.querySelectorAll('.time-block').forEach(function (timeBlock) {
    var timeId = parseInt(timeBlock.id.split('hour')[1]);

    // if the time block is before the current time, add the 'past' class
    if (timeId < currentHour) {
      timeBlock.classList.add('past');
    }
    // if the time block is the current time, remove the 'past' and 'future' classes and add the 'present' class
    else if (timeId === currentHour) {
      timeBlock.classList.remove('past');
      timeBlock.classList.remove('future');
      timeBlock.classList.add('present');
    }
    // if the time block is in the future, remove the 'past' and 'present' classes and add the 'future' class
    else {
      timeBlock.classList.remove('past');
      timeBlock.classList.remove('present');
      timeBlock.classList.add('future');
    }
  });
}

// CALL THE AUDIT TASK FUNCTION
auditTask();

// USE SETTIMEOUT TO UPDATE THE TIME EVERY MINUTE (1000ms * 60s)
setInterval(function () {
  currentHour = moment().hours(); // Update current hour
  auditTask();
}, 1000 * 60); // Run every minute