import { sendMessage } from "./telegram.js";
import { messageProgressBar } from "./progress.js";
import { messageWarmFriend, messageFuture, messageCity, messageStranger } from "./llm.js";
import { initEnv } from "./env.js";
import { assistantMessage } from "./utils.js";

const messageMap = {
    messageFuture: messageFuture,
    messageCity: messageCity,
    messageStranger: messageStranger,
    messageWarmFriend: messageWarmFriend,
    messageProgressBar: messageProgressBar,
};

async function callRandomMethod(obj) {
    // 获取对象的所有键（方法名），并存入数组
    const keys = Object.keys(obj);
    // 随机选择一个键
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    // 调用选中的方法
    return await obj[randomKey]();
}

function randomWithProbability(threshold) {
    return Math.random() < threshold ? 1 : 0;
}

export default {
    async fetch(request, env) {
        initEnv(env);
        console.log(`received request...`);

        if (randomWithProbability(1) === 0) {
            return new Response("Nothing happened!", { status: 200 });
        }

        let message = await callRandomMethod(messageMap);

        console.log(`message: ${message}`);
        await sendMessage(assistantMessage(message, `混沌消息助手`));
        return new Response(message, { status: 200 });
    },
};
