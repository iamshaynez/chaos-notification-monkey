import { sendMessage } from "./telegram.js";
import { messageProgressBar } from "./progress.js";
import {
    messageWarmFriend,
    messageFuture,
    messageCity,
    messageStranger,
} from "./llm.js";
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

async function process() {
    console.log(`process...`);
    let message = await callRandomMethod(messageMap);
    console.log(`message: ${message}`);
    await sendMessage(assistantMessage(message, `混沌消息助手`));
}


export default {
    // http request handler
    async fetch(request, env) {
        console.log(`http request handler...`);
        initEnv(env);
        await process();
        return new Response(message, { status: 200 });
    },

    // cron handler
    async scheduled(event, env, ctx) {
        console.log(`scheduled request handler...`);
        initEnv(env);

        // 生成一个随机数，在 0 到 23 之间
        const randomHour = Math.floor(Math.random() * 24);

        // 获取当前小时
        const currentHour = new Date().getUTCHours();

        // 如果当前小时等于随机小时，那么执行任务
        if (currentHour === randomHour) {
            await process();
        }
        
    },
};
