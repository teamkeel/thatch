import { Slackmessage, SubscriberContextAPI } from '@teamkeel/sdk';
import fetch from "node-fetch";

// To learn more about events and subscribers, visit https://docs.keel.so/events
export default Slackmessage(async (ctx, event) => {

    const SLACK_URL = ctx.secrets.SLACK_URL;

    if (!SLACK_URL) {
        throw new Error("Missing required secrets");
    }

    return fetch(ctx.secrets.SLACK_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: "New plan created! " + event.target.data.name + " in " + event.target.data.state
        }),
    })
        .then(async (response) => {
            if (!response.ok) {
                const text = await response.text();
                console.log("Slack response:", text);
                throw new Error(
                    `Failed to send slack message. status: ${response.status}`
                );
            }
        })
        .catch((error) => console.error("Fetch Error:", error));
})