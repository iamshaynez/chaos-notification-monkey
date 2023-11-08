function getDayOfWeek() {
    let date = new Date();
    let dayOfWeek = date.getDay() || 7; // 如果是星期天，getDay() 返回 0，这里将其修改为 7
    return dayOfWeek;
}

// 获取今天是本月的第几天
function getDayOfMonth() {
    const now = new Date();
    return now.getDate();
}

// 获取本月总共有多少天
function getDaysInMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    return new Date(year, month, 0).getDate();
}

// 返回今天是今年的第几天
function getDayOfYear() {
    let now = new Date();
    let start = new Date(now.getFullYear(), 0, 0); // 本年的开始
    let diff =
        now -
        start +
        (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);
    return day;
}

// 返回今年一共多少天
function getDaysInYear() {
    let now = new Date();
    // 判断是否为闰年
    if (
        (now.getFullYear() % 4 == 0 && now.getFullYear() % 100 != 0) ||
        now.getFullYear() % 400 == 0
    ) {
        return 366;
    } else {
        return 365;
    }
}

// Make progress bar
function createProgressBar(value, total) {
    let percentage = value / total;
    let progress = Math.round(percentage * 100);

    let filledPart = Array(Math.round(percentage * 20)).join("█");
    let emptyPart = Array(20 - Math.round(percentage * 20)).join("░");

    return `Progress: [${filledPart}${emptyPart}] ${progress}%`;
}

export function messageProgressBar() {
    let messages = [];
    messages.push(`这是一条产生焦虑的消息...`);
    messages.push(``);
    const dayOfWeek = getDayOfWeek();
    messages.push(`今天是本周的第${dayOfWeek}天，本周已完成进度：`);
    messages.push(`${createProgressBar(dayOfWeek, 7)}`);
    messages.push(``);
    const dayOfMonth = getDayOfMonth();
    const daysInMonth = getDaysInMonth();
    messages.push(`今天是本月的第${dayOfMonth}天，本月已完成进度：`);
    messages.push(`${createProgressBar(dayOfMonth, daysInMonth)}`);
    messages.push(``);
    const dayOfYear = getDayOfYear();
    const daysInYear = getDaysInYear();
    messages.push(`今天是本年的第${dayOfYear}天，本年已完成进度：`);
    messages.push(`${createProgressBar(dayOfYear, daysInYear)}`);
    messages.push(``);
    messages.push(`你的计划都完成了吗，请继续焦虑，下次见...`);
    let message = messages.join("\n");
    console.log(message);

    return message;
}
