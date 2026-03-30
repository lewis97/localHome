// Redirect to the flame server if it is running:
async function checkServer() {
  try {
    const res = await fetch("http://home.home", { mode: "no-cors" });
    window.location.href = "http://home.home";
  } catch (e) {
    console.log("Server not reachable, staying local.");
  }
}

// Comment out for testing - force using local version
checkServer()
