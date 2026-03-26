
  const now = new Date();

  document.getElementById("date").innerText =
    now.toLocaleDateString(undefined, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).toUpperCase();

  const hour = now.getHours();
  let greeting = "Hello";

  if (hour < 12) greeting = "Good morning!";
  else if (hour < 18) greeting = "Good afternoon!";
  else greeting = "Good evening!";

  document.getElementById("greeting").innerText = greeting;
