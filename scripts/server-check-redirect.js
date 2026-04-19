const SERVER_URL = "http://home.home/";
const CHECK_TIMEOUT_MS = 1500;

function setRedirectStatus(state, extra = {}) {
  window.localHomeRedirectStatus = { state, url: SERVER_URL, ...extra };
  window.dispatchEvent(
    new CustomEvent("local-home-redirect-status", {
      detail: window.localHomeRedirectStatus,
    }),
  );
}

// Redirect to the Flame server if it is reachable.
async function checkServer() {
  if (window.location.protocol === "https:") {
    console.warn(
      `Automatic redirect skipped: ${SERVER_URL} is HTTP and this page is loaded over HTTPS.`,
    );
    setRedirectStatus("mixed-content-blocked");
    return;
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), CHECK_TIMEOUT_MS);

  try {
    await fetch(SERVER_URL, {
      cache: "no-store",
      mode: "no-cors",
      signal: controller.signal,
    });
    setRedirectStatus("redirecting");
    window.location.replace(SERVER_URL);
  } catch (error) {
    console.log("Server not reachable, staying local.", error);
    setRedirectStatus("unreachable");
  } finally {
    window.clearTimeout(timeoutId);
  }
}

checkServer();
