const notif = document.getElementById("notification");
const closeBtn = document.getElementById("notif-close");

function hideNotif() {
  notif.classList.add("hide");
}

closeBtn.addEventListener("click", hideNotif);

setTimeout(hideNotif, 3000);
