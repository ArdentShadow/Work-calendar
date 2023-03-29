
  // Display current date at top of page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));

  // Get saved schedule from local storage or create empty array
  var schedule = JSON.parse(localStorage.getItem("schedule")) || [];

  // Function to render timeblocks with saved schedule data
  function renderSchedule() {
    // Loop through each timeblock
    $(".time-block").each(function(index) {
      // Set the time for this timeblock based on its position in the loop
      var time = moment().hour(9 + index);

      // Set the text content of the timeblock's hour div
      $(this).find(".hour").text(time.format("hA"));

      // Set the class of the description textarea based on whether it's in the past, present, or future
      if (time.isBefore(moment(), "hour")) {
        $(this).find(".description").addClass("past");
      } else if (time.isSame(moment(), "hour")) {
        $(this).find(".description").addClass("present");
      } else {
        $(this).find(".description").addClass("future");
      }

      // Get the schedule data for this timeblock from the saved schedule array
      var scheduleData = schedule.find(function(item) {
        return item.time === time.format("hA");
      });

      // If there is saved schedule data for this timeblock, set the textarea's text to it
      if (scheduleData) {
        $(this).find(".description").val(scheduleData.text);
      }
    });
  }

  // Call renderSchedule to initially render the timeblocks
  renderSchedule();

  // Save schedule data to local storage when save button is clicked
  $(".saveBtn").on("click", function() {
    // Get the text content of the description textarea and the corresponding hour div
    var text = $(this).siblings(".description").val();
    var time = $(this).siblings(".hour").text();

    // Find the index of any existing schedule data with this time and overwrite it, or create new schedule data and push it to the array
    var index = schedule.findIndex(function(item) {
      return item.time === time;
    });

    if (index !== -1) {
      schedule[index].text = text;
    } else {
      schedule.push({
        time: time,
        text: text
      });
    }

    // Save the updated schedule array to local storage
    localStorage.setItem("schedule", JSON.stringify(schedule));
  });

function validateForm() {
    var name = document.forms["contactForm"]["name"].value;
    var email = document.forms["contactForm"]["email"].value;
    var message = document.forms["contactForm"]["message"].value;
  
    if (name == "") {
      alert("Name must be filled out");
      return false;
    }
  
    if (email == "") {
      alert("Email must be filled out");
      return false;
    }
  
    if (message == "") {
      alert("Message must be filled out");
      return false;
    }
  
    return true;
  }
  
  function toggleMenu() {
    var menu = document.getElementById("nav-links");
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  }
  
  function initMap() {
    var myLatLng = { lat: 40.7128, lng: -74.006 };
  
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: myLatLng,
    });
  
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: "New York, NY",
    });
  }