const notif = document.getElementById("notification");
const closeBtn = document.getElementById("notif-close");
const notifMessage = document.getElementById("notification-message");
const notifAction = document.getElementById("notification-action");

let hideTimeout;
let remaining = 3000; // total time before auto-hide in ms
let start;

function syncProgressDuration() {
  const progressBar = notif?.querySelector(".notif-progress");
  if (progressBar) {
    progressBar.style.animationDuration = `${remaining}ms`;
  }
}

function updateNotification(status = window.localHomeRedirectStatus) {
  if (!notif || !status) {
    return;
  }

  if (status.state === "mixed-content-blocked") {
    notifMessage.textContent =
      "This fallback page is loaded over HTTPS, so the browser blocked the automatic check to http://home.home/.";
    notifAction.hidden = false;
    notifAction.href = status.url;
    remaining = 8000;
    return;
  }

  notifMessage.textContent =
    "The Flame homepage on the server could not be reached. Serving an alternative instead.";
  notifAction.hidden = true;
}

// Function to start the auto-hide timer
function startTimer() {
  syncProgressDuration();
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
window.addEventListener("local-home-redirect-status", (event) => {
  clearTimeout(hideTimeout);
  remaining = 3000;
  updateNotification(event.detail);
  startTimer();
});

// Start timer initially
updateNotification();
startTimer();
