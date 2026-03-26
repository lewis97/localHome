# localHome
A static local homepage alternative to Flame for when the server is not running.

## Usage

The aim is to have the static homepage `home.html` used when the Flame instance is not available. The address for the homepage in the browser should be set to the local `home.html` and that will run some JS that will check if the flame server is running and if so redirect to the flame server homepage, otherwise the local file will be used instead.

### Redirect logic

The following is used to determine if the flame server is runnning and if so redirect to it...

```javascript
async function checkServer() {
  try {
    const res = await fetch("http://home.home", { mode: "no-cors" });
    window.location.href = "http://home.home";
  } catch (e) {
    console.log("Server not reachable, staying local.");
  }
}
checkServer();
```
