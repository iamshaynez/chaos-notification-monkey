import { sendMessage } from "./telegram.js";
import { messageProgressBar } from "./progress.js";
import {
    messageWarmFriend,
    messageFuture,
    messageCity,
    messageStranger,
    messageFuturePoor,
    messageFutureRich,
} from "./llm.js";
import { messageCompliment } from "./compliment.js";
import { initEnv } from "./env.js";
import { assistantMessage } from "./utils.js";

const messageMap = {
    messageFuture: messageFuture,
    messageCity: messageCity,
    messageStranger: messageStranger,
    messageWarmFriend: messageWarmFriend,
    messageProgressBar: messageProgressBar,
    messageFuturePoor: messageFuturePoor,
    messageFutureRich: messageFutureRich,
    messageCompliment: messageCompliment,
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

async function process() {
    console.log(`process...`);
    let message = await callRandomMethod(messageMap);
    console.log(`message: ${message}`);
    let messageWithAssistant = assistantMessage(message, `混沌消息助手`);
    await sendMessage(messageWithAssistant);

    return messageWithAssistant;
}

export default {
    // http request handler
    async fetch(request, env) {
        console.log(`http request handler...`);
        initEnv(env);
        let message = await process();
        return new Response(message, { status: 200 });
    },

    // cron handler
    async scheduled(event, env, ctx) {
        console.log(`scheduled request handler...`);
        initEnv(env);

        if(Math.random() < 0.1) {
            // 有 10% 的概率会执行这里的代码
            console.log('执行了');
            await process();
          } else {
            // 有 90% 的概率会跳过这里的代码
            console.log('跳过了'); 
          }
    },
};
