// Replace this with your actual live Vercel URL
// Ensure it matches the folder path structure exactly (api or API)
const VERCEL_URL ="https://wavenotification.vercel.app";//the url for the current made server
let USER_WHO_GOT_THE_MESSAGE_or_CALL = "";
let call = false;
async function addItems(itemsArray) {
  if (call = false) {
    USER_WHO_GOT_THE_MESSAGE_or_CALL += ":message";
  } else {
    USER_WHO_GOT_THE_MESSAGE_or_CALL += ":call";
  }
    try {
        const response = await fetch(VERCEL_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ payload: USER_WHO_GOT_THE_MESSAGE_or_CALL })
            USER_WHO_GOT_THE_MESSAGE_or_CALL = ""
        });

        const data = await response.json();
        console.log("Success! Server updated list:", data.payload);
    } catch (error) {
        console.error("Failed to post data to Vercel:", error);
    }
}

