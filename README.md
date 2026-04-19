# LocalHome
A static local homepage alternative to Flame for when the server is not running.

## Usage

The aim is to have the static homepage `home.html` used when the Flame instance is not available. The address for the homepage in the browser should be set to the local `home.html` and that will run some JS that will check if the flame server is running and if so redirect to the flame server homepage, otherwise the local file will be used instead.

### Redirect logic

The fallback page only probes `http://home.home/` when it is itself loaded from a non-HTTPS origin. If the fallback page is served over HTTPS, browsers block background requests to that HTTP address as mixed content, so the page stays local and offers a direct link instead.

```javascript
const SERVER_URL = "http://home.home/";

async function checkServer() {
  if (window.location.protocol === "https:") {
    return;
  }

  try {
    await fetch(SERVER_URL, { mode: "no-cors" });
    window.location.replace(SERVER_URL);
  } catch (e) {
    console.log("Server not reachable, staying local.");
  }
}
checkServer();
```
