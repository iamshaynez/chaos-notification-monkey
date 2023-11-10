import { Ai } from "@cloudflare/ai";
import { AI } from "./env";


export async function messageWarmFriend(){
    let messages = [];
    messages.push(`这是一条来自暖心的朋友的消息...`);
    messages.push(``);

    const messageEnglish = await completion("You are a warm friend", `Please say something very nice to me to cheer me up.`);
    const messageChinese = await translate(messageEnglish);
    messages.push(messageChinese);
    messages.push(``);
    messages.push(`希望能让你开心些，下次见...`);
    let message = messages.join("\n");
    //console.log(message);

    return message;
}

export async function messageCity(){
    let messages = [];
    messages.push(`这是一条来自旅行家的消息...`);
    messages.push(``);

    const messageEnglish = await completion("You are a happy tour guide", `please find a city in the world, make a brief introduction, and then invite me to definitely go there to play.`);
    const messageChinese = await translate(messageEnglish);
    messages.push(messageChinese);
    messages.push(``);
    messages.push(`希望能让你对未来更有目标和希望些，下次见...`);
    let message = messages.join("\n");
    //console.log(message);

    return message;
}

export async function messageFuture(){
    let messages = [];
    messages.push(`这是一条来自未来的消息...`);
    messages.push(``);

    const messageEnglish = await completion("You are a guy from future", `Please describe some random thing of future and let me know how good it will be to cheer me up.`);
    const messageChinese = await translate(messageEnglish);
    messages.push(messageChinese);
    messages.push(``);
    messages.push(`希望能让你更愿意活下去，下次见...`);
    let message = messages.join("\n");
    //console.log(message);

    return message;
}

export async function messageStranger(){
    let messages = [];
    messages.push(`这是一条来陌生人的消息...`);
    messages.push(``);

    const messageEnglish = await completion("You are a stranger saw me on street", `Say hello to me and hope me have a good day.`);
    //const messageChinese = await translate(messageEnglish);
    messages.push(messageEnglish);
    messages.push(``);
    messages.push(`希望至少今天开心，下次见...`);
    let message = messages.join("\n");
    //console.log(message);

    return message;
}

export async function messageFutureRich(){
    let messages = [];
    messages.push(`这是一条来未来的你的消息...`);
    messages.push(``);

    const messageEnglish = await completion("You are Future version of me", `Just tell me I am going to be very rich in future, choose your own words.`);
    //const messageChinese = await translate(messageEnglish);
    messages.push(messageEnglish);
    messages.push(``);
    messages.push(`希望你有力气继续搬砖，下次见...`);
    let message = messages.join("\n");
    //console.log(message);

    return message;
}

export async function messageFuturePoor(){
    let messages = [];
    messages.push(`这是一条来未来的你的消息...`);
    messages.push(``);

    const messageEnglish = await completion("You are Future version of me", `Just tell me I am not going to be very rich in future, I am still be very poor very sad. choose your own words.`);
    //const messageChinese = await translate(messageEnglish);
    messages.push(messageEnglish);
    messages.push(``);
    messages.push(`希望你继续活着，也许将来情况有变，下次见...`);
    let message = messages.join("\n");
    //console.log(message);

    return message;
}


async function completion(systemPrompt, userPrompt) {
    const ai = new Ai(AI);

    const messages = [
        { role: "system", content: systemPrompt },
        {
            role: "user",
            content: userPrompt,
        },
    ];
    const response = await ai.run("@cf/meta/llama-2-7b-chat-int8", {
        messages,
    });

    return response["response"];
}

async function translate(sentence, from = "english", to = "chinese") {
    const ai = new Ai(AI);

    const response = await ai.run("@cf/meta/m2m100-1.2b", {
        text: sentence,
        source_lang: from, // defaults to english
        target_lang: to,
    });
    return response["translated_text"];
}
