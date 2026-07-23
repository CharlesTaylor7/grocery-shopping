import "@/client/styles.css";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
} else {
  console.error("Client doesn't support Service Workers!");
}
