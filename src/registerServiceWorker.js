const PUBLIC_KEY =
  "BOl7MuAhVzPSK5akzN92T2MYOkVdcaRy0CXhgCD_dWrj3W6HgIbgsEJEO5ThQDz0mUKfrsQT6uxRLCxEYjXe6iE";

const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    send().catch(err => console.error(err));
  }
};

export default registerServiceWorker;

async function send() {
  // register SW, Register PUSH, SEND PUSH
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register(
    "/service-worker.js",
    {
      scope: "/"
    }
  );

  console.log("Service Worker registered...");

  console.log("registering PUSH...");

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY)
  });

  console.log("Push Registered...");

  console.log("Sending Push...");

  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });

  console.log("Push sent...");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
