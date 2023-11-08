import { sendMessage } from "./telegram.js";
import { messageProgressBar } from './progress.js';
import { initEnv } from "./env.js";
import { assistantMessage } from './utils.js';

function randomWithProbability(threshold) {
    return Math.random() < threshold ? 1 : 0;
}

export default {
    async fetch(request, env) {
        initEnv(env);
        console.log(`received request...`)

        if(randomWithProbability(0.1) === 0){
            return new Response("Nothing happened!", { status: 200 });
        }

        let message = messageProgressBar();

        await sendMessage(assistantMessage(message, `混沌消息助手`))
        return new Response("Success!", { status: 200 });
    },
};
