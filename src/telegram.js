import { ENV } from "./env.js";

// send text message to telegram
export async function sendMessage(text) {
    console.log(`sending ${text} to ${ENV.TG_CHAT_ID}`);
    return await fetch(
        `${ENV.TELEGRAM_API_DOMAIN}/bot${ENV.TG_BOT_TOKEN}/sendMessage`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                method: "post",
                text: text,
                chat_id: ENV.TG_CHAT_ID,
                //parse_mode: "Markdown",
            }),
        }
    );
}
