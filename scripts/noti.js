const notif = document.getElementById("notification");
const closeBtn = document.getElementById("notif-close");

let hideTimeout;
let remaining = 3000; // total time before auto-hide in ms
let start;

// Function to start the auto-hide timer
function startTimer() {
  start = Date.now();
  hideTimeout = setTimeout(() => {
    hideNotif(); // trigger fade-out
  }, remaining);
}

// Function to pause the timer (on hover)
function pauseTimer() {
  clearTimeout(hideTimeout);
  remaining -= Date.now() - start; // adjust remaining time
}

// Function to hide the notification with fade-out
function hideNotif() {
  notif.classList.add("hide");
}

// Resume timer (on mouse leave)
function resumeTimer() {
  startTimer();
}

// Remove notification after fade-out finishes
notif.addEventListener("animationend", (e) => {
  if (e.animationName === "fadeOut") {
    notif.remove(); // remove from DOM only after fade-out
  }
});

// Event listeners
closeBtn.addEventListener("click", hideNotif);   // manual close
notif.addEventListener("mouseenter", pauseTimer);  // pause on hover
notif.addEventListener("mouseleave", resumeTimer); // resume on leave

// Start timer initially
startTimer();
