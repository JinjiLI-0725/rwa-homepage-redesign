(() => {
  const root = document.querySelector(".rwa-concierge");
  if (!root) return;

  const content = {
    en: {
      status: "Online",
      eyebrow: "START WITH YOUR OBJECTIVE",
      title: "How can we help move<br>your project forward?",
      intro: "Ask about project onboarding, platform integration, Consumer RWA, or the right next step for your organisation.",
      placeholder: "Describe your project or ask a question…",
      send: "Send",
      thinking: "Reviewing your question…",
      welcome: "Welcome to RWA.LTD. Tell me what you are building, and I’ll help identify the most relevant route.",
      unavailable: "The AI service is not connected in this preview yet. The interface is ready for the existing HKSTP concierge backend.",
      suggestions: ["I want to launch a Consumer RWA project", "How can my platform integrate?", "Explain the RWA.LTD ecosystem", "I need to speak with the team"]
    },
    "zh-Hant": {
      status: "在線",
      eyebrow: "從您的目標開始",
      title: "我們可以如何推動<br>您的項目向前？",
      intro: "諮詢項目接入、平台整合、消費級 RWA，或尋找適合貴機構的下一步。",
      placeholder: "介紹您的項目或提出問題…",
      send: "發送",
      thinking: "正在分析您的問題…",
      welcome: "歡迎來到 RWA.LTD。請告訴我您正在建設甚麼，我會協助您找到合適的接入路徑。",
      unavailable: "此預覽版本尚未連接 AI 服務。介面已準備好接入現有的 HKSTP Concierge 後端。",
      suggestions: ["我想啟動消費級 RWA 項目", "我的平台可以如何整合？", "介紹 RWA.LTD 生態系統", "我需要聯絡團隊"]
    },
    "zh-Hans": {
      status: "在线",
      eyebrow: "从您的目标开始",
      title: "我们可以如何推动<br>您的项目向前？",
      intro: "咨询项目接入、平台整合、消费级 RWA，或寻找适合贵机构的下一步。",
      placeholder: "介绍您的项目或提出问题…",
      send: "发送",
      thinking: "正在分析您的问题…",
      welcome: "欢迎来到 RWA.LTD。请告诉我您正在建设什么，我会协助您找到合适的接入路径。",
      unavailable: "此预览版本尚未连接 AI 服务。界面已准备好接入现有的 HKSTP Concierge 后端。",
      suggestions: ["我想启动消费级 RWA 项目", "我的平台可以如何整合？", "介绍 RWA.LTD 生态系统", "我需要联系团队"]
    }
  };

  const messages = root.querySelector(".rwa-concierge__messages");
  const suggestions = root.querySelector(".rwa-concierge__suggestions");
  const form = root.querySelector(".rwa-concierge__form");
  const input = form.querySelector("textarea");
  const send = form.querySelector("button");
  let language = document.documentElement.lang || "en";
  let busy = false;

  const copy = () => content[language] || content.en;
  function addMessage(role, text) {
    const bubble = document.createElement("div");
    bubble.className = `rwa-concierge__message rwa-concierge__message--${role}`;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
    return bubble;
  }
  function setBusy(value) {
    busy = value; input.disabled = value; send.disabled = value;
    send.innerHTML = value ? "…" : `${copy().send} <span>→</span>`;
  }
  async function ask(question) {
    const text = question.trim();
    if (!text || busy) return;
    addMessage("user", text); input.value = ""; setBusy(true);
    const responseBubble = addMessage("assistant", copy().thinking);
    try {
      const response = await fetch(root.dataset.aiEndpoint || "/api/ai-chat", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.detail || copy().unavailable);
      responseBubble.textContent = data.reply || copy().unavailable;
    } catch (_) { responseBubble.textContent = copy().unavailable; }
    finally { setBusy(false); input.focus(); }
  }
  function render(nextLanguage) {
    language = content[nextLanguage] ? nextLanguage : "en";
    const c = copy();
    root.querySelector(".rwa-concierge__status").lastChild.textContent = ` ${c.status}`;
    root.querySelector(".rwa-concierge__eyebrow").textContent = c.eyebrow;
    root.querySelector(".rwa-concierge__body>h2").innerHTML = c.title;
    root.querySelector(".rwa-concierge__intro").textContent = c.intro;
    input.placeholder = c.placeholder; send.innerHTML = `${c.send} <span>→</span>`;
    suggestions.replaceChildren();
    c.suggestions.forEach(question => {
      const button = document.createElement("button"); button.type = "button"; button.textContent = question;
      button.addEventListener("click", () => ask(question)); suggestions.appendChild(button);
    });
    if (!messages.children.length) addMessage("assistant", c.welcome);
  }
  form.addEventListener("submit", event => { event.preventDefault(); ask(input.value); });
  window.addEventListener("rwa:languagechange", event => render(event.detail.language));
  render(language);
})();
