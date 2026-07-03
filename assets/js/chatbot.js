/*!
===========================================================
 Investment Technology Indonesia
 assets/js/chatbot.js
 Part 1
 Core • Config • Initialization
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION
=========================================================== */

const ChatbotApp={

    name:"Investment Technology Indonesia Chatbot",

    version:"1.0.0",

    initialized:false,

    debug:false

};

/* ===========================================================
   CONFIG
=========================================================== */

const CHATBOT_CONFIG={

    selector:".chatbot",

    toggleSelector:".chatbot-toggle",

    windowSelector:".chatbot-window",

    headerSelector:".chatbot-header",

    bodySelector:".chatbot-body",

    footerSelector:".chatbot-footer",

    inputSelector:".chatbot-input",

    sendSelector:".chatbot-send",

    closeSelector:".chatbot-close",

    typingSpeed:1200,

    autoReply:true,

    saveHistory:true,

    theme:"light",

    position:"right",

    animationDuration:300,

    maxMessages:500

};

/* ===========================================================
   STATE
=========================================================== */

const ChatbotState={

    initialized:false,

    opened:false,

    typing:false,

    loading:false,

    session:null,

    messages:[],

    unread:0,

    minimized:false

};

/* ===========================================================
   ELEMENTS
=========================================================== */

const Chatbot={

    container:null,

    toggle:null,

    window:null,

    header:null,

    body:null,

    footer:null,

    input:null,

    send:null,

    close:null

};

/* ===========================================================
   LOGGER
=========================================================== */

function chatbotLog(...args){

    if(!ChatbotApp.debug){

        return;

    }

    console.log(

        "[Chatbot]",

        ...args

    );

}

/* ===========================================================
   HELPERS
=========================================================== */

function $(selector,parent=document){

    return parent.querySelector(selector);

}

function $$(selector,parent=document){

    return [...parent.querySelectorAll(selector)];

}

function on(

    element,

    event,

    callback,

    options=false

){

    if(!element){

        return;

    }

    element.addEventListener(

        event,

        callback,

        options

    );

}

function addClass(

    element,

    className

){

    element?.classList.add(className);

}

function removeClass(

    element,

    className

){

    element?.classList.remove(className);

}

function toggleClass(

    element,

    className

){

    element?.classList.toggle(className);

}

/* ===========================================================
   INITIALIZE ELEMENTS
=========================================================== */

function initializeElements(){

    Chatbot.container=$(

        CHATBOT_CONFIG.selector

    );

    if(!Chatbot.container){

        return false;

    }

    Chatbot.toggle=$(

        CHATBOT_CONFIG.toggleSelector,

        Chatbot.container

    );

    Chatbot.window=$(

        CHATBOT_CONFIG.windowSelector,

        Chatbot.container

    );

    Chatbot.header=$(

        CHATBOT_CONFIG.headerSelector,

        Chatbot.container

    );

    Chatbot.body=$(

        CHATBOT_CONFIG.bodySelector,

        Chatbot.container

    );

    Chatbot.footer=$(

        CHATBOT_CONFIG.footerSelector,

        Chatbot.container

    );

    Chatbot.input=$(

        CHATBOT_CONFIG.inputSelector,

        Chatbot.container

    );

    Chatbot.send=$(

        CHATBOT_CONFIG.sendSelector,

        Chatbot.container

    );

    Chatbot.close=$(

        CHATBOT_CONFIG.closeSelector,

        Chatbot.container

    );

    return true;

}

/* ===========================================================
   SESSION
=========================================================== */

function createSession(){

    ChatbotState.session=

        "chat-"+

        Date.now()+"-"+

        Math.random()

        .toString(36)

        .substring(2,10);

}

/* ===========================================================
   DEFAULT MESSAGE
=========================================================== */

function createWelcomeMessage(){

    ChatbotState.messages.push({

        id:1,

        sender:"bot",

        text:

        "Halo 👋 Selamat datang di Investment Technology Indonesia. Ada yang bisa kami bantu?",

        time:new Date()

    });

}

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeChatbot(){

    if(ChatbotApp.initialized){

        return;

    }

    if(!initializeElements()){

        return;

    }

    ChatbotApp.initialized=true;

    ChatbotState.initialized=true;

    createSession();

    createWelcomeMessage();

    chatbotLog(

        "Chatbot Initialized"

    );

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshChatbot(){

    initializeElements();

    chatbotLog(

        "Chatbot Refreshed"

    );

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroyChatbot(){

    ChatbotState.messages=[];

    ChatbotState.opened=false;

    ChatbotState.initialized=false;

    chatbotLog(

        "Chatbot Destroyed"

    );

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeChatbot();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

window.ChatbotManager={

    app:ChatbotApp,

    config:CHATBOT_CONFIG,

    state:ChatbotState,

    chatbot:Chatbot,

    init:initializeChatbot,

    refresh:refreshChatbot,

    destroy:destroyChatbot

};

/* ===========================================================
   END PART 1
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/chatbot.js
 Part 2
 Chat Window • Toggle • UI Controls
===========================================================
*/

"use strict";

/* ===========================================================
   WINDOW
=========================================================== */

const ChatWindow={

    opened:false,

    minimized:false,

    initialized:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeWindow(){

    initializeToggle();

    initializeControls();

    initializeResize();

    ChatWindow.initialized=true;

}

/* ===========================================================
   TOGGLE BUTTON
=========================================================== */

function initializeToggle(){

    if(!Chatbot.toggle){

        return;

    }

    on(

        Chatbot.toggle,

        "click",

        toggleChatWindow

    );

}

/* ===========================================================
   CONTROLS
=========================================================== */

function initializeControls(){

    if(Chatbot.close){

        on(

            Chatbot.close,

            "click",

            closeChatWindow

        );

    }

    if(Chatbot.header){

        on(

            Chatbot.header,

            "dblclick",

            toggleMinimize

        );

    }

}

/* ===========================================================
   OPEN
=========================================================== */

function openChatWindow(){

    if(!Chatbot.window){

        return;

    }

    addClass(

        Chatbot.window,

        "active"

    );

    removeClass(

        Chatbot.window,

        "minimized"

    );

    ChatWindow.opened=true;

    ChatbotState.opened=true;

    ChatbotState.unread=0;

    updateUnreadBadge();

    focusInput();

}

/* ===========================================================
   CLOSE
=========================================================== */

function closeChatWindow(){

    if(!Chatbot.window){

        return;

    }

    removeClass(

        Chatbot.window,

        "active"

    );

    ChatWindow.opened=false;

    ChatbotState.opened=false;

}

/* ===========================================================
   TOGGLE
=========================================================== */

function toggleChatWindow(){

    if(ChatWindow.opened){

        closeChatWindow();

    }else{

        openChatWindow();

    }

}

/* ===========================================================
   MINIMIZE
=========================================================== */

function minimizeChatWindow(){

    if(!Chatbot.window){

        return;

    }

    addClass(

        Chatbot.window,

        "minimized"

    );

    ChatWindow.minimized=true;

    ChatbotState.minimized=true;

}

/* ===========================================================
   RESTORE
=========================================================== */

function restoreChatWindow(){

    if(!Chatbot.window){

        return;

    }

    removeClass(

        Chatbot.window,

        "minimized"

    );

    ChatWindow.minimized=false;

    ChatbotState.minimized=false;

}

/* ===========================================================
   TOGGLE MINIMIZE
=========================================================== */

function toggleMinimize(){

    if(ChatWindow.minimized){

        restoreChatWindow();

    }else{

        minimizeChatWindow();

    }

}

/* ===========================================================
   FOCUS INPUT
=========================================================== */

function focusInput(){

    Chatbot.input?.focus();

}

/* ===========================================================
   UNREAD BADGE
=========================================================== */

function updateUnreadBadge(){

    const badge=$(

        ".chatbot-badge",

        Chatbot.container

    );

    if(!badge){

        return;

    }

    if(

        ChatbotState.unread>0

    ){

        badge.textContent=

            ChatbotState.unread;

        badge.style.display="flex";

    }else{

        badge.style.display="none";

    }

}

/* ===========================================================
   WINDOW RESIZE
=========================================================== */

function initializeResize(){

    window.addEventListener(

        "resize",

        handleResize,

        {

            passive:true

        }

    );

}

function handleResize(){

    if(!Chatbot.window){

        return;

    }

    if(

        window.innerWidth<768

    ){

        addClass(

            Chatbot.window,

            "mobile"

        );

    }else{

        removeClass(

            Chatbot.window,

            "mobile"

        );

    }

}

/* ===========================================================
   ESC KEY
=========================================================== */

document.addEventListener(

    "keydown",

    event=>{

        if(

            event.key==="Escape" &&

            ChatWindow.opened

        ){

            closeChatWindow();

        }

    }

);

/* ===========================================================
   STATUS
=========================================================== */

function windowStatus(){

    return{

        initialized:

            ChatWindow.initialized,

        opened:

            ChatWindow.opened,

        minimized:

            ChatWindow.minimized,

        unread:

            ChatbotState.unread

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeWindow();

        handleResize();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ChatbotManager,

    {

        window:{

            init:

                initializeWindow,

            open:

                openChatWindow,

            close:

                closeChatWindow,

            toggle:

                toggleChatWindow,

            minimize:

                minimizeChatWindow,

            restore:

                restoreChatWindow,

            status:

                windowStatus

        }

    }

);

/* ===========================================================
   END PART 2
===========================================================
*/

/*!
===========================================================
 Investment Technology Indonesia
 assets/js/chatbot.js
 Part 3
 Message Engine • Conversation Manager
===========================================================
*/

"use strict";

/* ===========================================================
   MESSAGE ENGINE
=========================================================== */

const MessageEngine={

    messages:[],

    queue:[],

    lastID:0,

    initialized:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeMessageEngine(){

    renderMessages();

    initializeInput();

    initializeSendButton();

    MessageEngine.initialized=true;

}

/* ===========================================================
   INPUT
=========================================================== */

function initializeInput(){

    if(!Chatbot.input){

        return;

    }

    on(

        Chatbot.input,

        "keydown",

        event=>{

            if(

                event.key==="Enter" &&

                !event.shiftKey

            ){

                event.preventDefault();

                sendCurrentMessage();

            }

        }

    );

}

/* ===========================================================
   SEND BUTTON
=========================================================== */

function initializeSendButton(){

    if(!Chatbot.send){

        return;

    }

    on(

        Chatbot.send,

        "click",

        sendCurrentMessage

    );

}

/* ===========================================================
   SEND
=========================================================== */

function sendCurrentMessage(){

    const text=

        Chatbot.input?.value

        .trim();

    if(!text){

        return;

    }

    sendUserMessage(text);

    Chatbot.input.value="";

}

/* ===========================================================
   USER MESSAGE
=========================================================== */

function sendUserMessage(text){

    const message={

        id:++MessageEngine.lastID,

        sender:"user",

        text,

        time:new Date()

    };

    MessageEngine.messages.push(message);

    ChatbotState.messages.push(message);

    renderSingleMessage(message);

    scrollConversation();

    if(

        CHATBOT_CONFIG.autoReply

    ){

        simulateAutoReply(text);

    }

}

/* ===========================================================
   BOT MESSAGE
=========================================================== */

function sendBotMessage(text){

    const message={

        id:++MessageEngine.lastID,

        sender:"bot",

        text,

        time:new Date()

    };

    MessageEngine.messages.push(message);

    ChatbotState.messages.push(message);

    renderSingleMessage(message);

    scrollConversation();

}

/* ===========================================================
   RENDER ALL
=========================================================== */

function renderMessages(){

    if(!Chatbot.body){

        return;

    }

    Chatbot.body.innerHTML="";

    ChatbotState.messages.forEach(message=>{

        renderSingleMessage(message);

    });

}

/* ===========================================================
   RENDER ONE
=========================================================== */

function renderSingleMessage(message){

    if(!Chatbot.body){

        return;

    }

    const bubble=

        document.createElement("div");

    bubble.className=

        `chat-message ${message.sender}`;

    bubble.dataset.id=

        message.id;

    bubble.innerHTML=`

<div class="chat-message-content">

${escapeHTML(message.text)}

</div>

<div class="chat-message-time">

${formatMessageTime(

    message.time

)}

</div>

`;

    Chatbot.body.appendChild(

        bubble

    );

}

/* ===========================================================
   REMOVE MESSAGE
=========================================================== */

function removeMessage(id){

    MessageEngine.messages=

        MessageEngine.messages.filter(

            message=>message.id!==id

        );

    ChatbotState.messages=

        ChatbotState.messages.filter(

            message=>message.id!==id

        );

    const element=

        $(`[data-id="${id}"]`);

    element?.remove();

}

/* ===========================================================
   CLEAR
=========================================================== */

function clearConversation(){

    MessageEngine.messages=[];

    ChatbotState.messages=[];

    if(Chatbot.body){

        Chatbot.body.innerHTML="";

    }

}

/* ===========================================================
   SCROLL
=========================================================== */

function scrollConversation(){

    if(!Chatbot.body){

        return;

    }

    Chatbot.body.scrollTop=

        Chatbot.body.scrollHeight;

}

/* ===========================================================
   TIME
=========================================================== */

function formatMessageTime(time){

    return new Date(time)

    .toLocaleTimeString(

        "id-ID",

        {

            hour:"2-digit",

            minute:"2-digit"

        }

    );

}

/* ===========================================================
   ESCAPE HTML
=========================================================== */

function escapeHTML(text){

    const div=

        document.createElement("div");

    div.textContent=text;

    return div.innerHTML;

}

/* ===========================================================
   HISTORY
=========================================================== */

function exportConversation(){

    return[

        ...ChatbotState.messages

    ];

}

function importConversation(messages=[]){

    clearConversation();

    ChatbotState.messages=[

        ...messages

    ];

    MessageEngine.messages=[

        ...messages

    ];

    renderMessages();

}

/* ===========================================================
   STATUS
=========================================================== */

function messageStatus(){

    return{

        initialized:

            MessageEngine.initialized,

        total:

            MessageEngine.messages.length,

        queue:

            MessageEngine.queue.length,

        lastID:

            MessageEngine.lastID

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeMessageEngine();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ChatbotManager,

    {

        messages:{

            init:

                initializeMessageEngine,

            sendUser:

                sendUserMessage,

            sendBot:

                sendBotMessage,

            remove:

                removeMessage,

            clear:

                clearConversation,

            export:

                exportConversation,

            import:

                importConversation,

            render:

                renderMessages,

            status:

                messageStatus

        }

    }

);

/* ===========================================================
   END PART 3
===========================================================
*/

/*!
===========================================================
 Investment Technology Indonesia
 assets/js/chatbot.js
 Part 4
 Typing Indicator • Auto Reply • Smart Response Engine
===========================================================
*/

"use strict";

/* ===========================================================
   TYPING ENGINE
=========================================================== */

const TypingEngine={

    active:false,

    timeout:null,

    indicator:null,

    initialized:false

};

/* ===========================================================
   AUTO REPLY
=========================================================== */

const AutoReply={

    enabled:CHATBOT_CONFIG.autoReply,

    delay:CHATBOT_CONFIG.typingSpeed,

    fallback:

        "Terima kasih telah menghubungi Investment Technology Indonesia. Tim kami akan segera membantu Anda.",

    initialized:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeTypingEngine(){

    createTypingIndicator();

    AutoReply.initialized=true;

    TypingEngine.initialized=true;

}

/* ===========================================================
   CREATE INDICATOR
=========================================================== */

function createTypingIndicator(){

    if(!Chatbot.body){

        return;

    }

    const indicator=

        document.createElement("div");

    indicator.className=

        "chat-typing";

    indicator.style.display="none";

    indicator.innerHTML=`

<div class="chat-message bot">

<div class="chat-message-content">

<span></span>

<span></span>

<span></span>

</div>

</div>

`;

    Chatbot.body.appendChild(indicator);

    TypingEngine.indicator=

        indicator;

}

/* ===========================================================
   SHOW
=========================================================== */

function showTypingIndicator(){

    if(

        !TypingEngine.indicator

    ){

        return;

    }

    TypingEngine.active=true;

    ChatbotState.typing=true;

    TypingEngine.indicator.style.display=

        "block";

    scrollConversation();

}

/* ===========================================================
   HIDE
=========================================================== */

function hideTypingIndicator(){

    if(

        !TypingEngine.indicator

    ){

        return;

    }

    TypingEngine.active=false;

    ChatbotState.typing=false;

    TypingEngine.indicator.style.display=

        "none";

}

/* ===========================================================
   AUTO REPLY
=========================================================== */

function simulateAutoReply(message){

    if(

        !AutoReply.enabled

    ){

        return;

    }

    showTypingIndicator();

    clearTimeout(

        TypingEngine.timeout

    );

    TypingEngine.timeout=

    setTimeout(()=>{

        hideTypingIndicator();

        sendBotMessage(

            generateReply(message)

        );

    },AutoReply.delay);

}

/* ===========================================================
   SMART REPLY
=========================================================== */

function generateReply(message){

    const text=

        message.toLowerCase();

    if(

        text.includes("website")

    ){

        return "Kami menyediakan jasa pembuatan website company profile, e-commerce, landing page, portal berita, dan aplikasi web.";

    }

    if(

        text.includes("aplikasi") ||

        text.includes("mobile")

    ){

        return "Kami mengembangkan aplikasi Android, iOS, Flutter, React Native, serta sistem enterprise.";

    }

    if(

        text.includes("harga") ||

        text.includes("biaya")

    ){

        return "Silakan jelaskan kebutuhan proyek Anda. Tim kami akan memberikan estimasi harga terbaik.";

    }

    if(

        text.includes("ai")

    ){

        return "Kami juga menyediakan solusi Artificial Intelligence, Chatbot AI, Automation, dan Machine Learning.";

    }

    if(

        text.includes("hosting") ||

        text.includes("server")

    ){

        return "Kami menyediakan VPS, Dedicated Server, Cloud Infrastructure, Email Hosting, dan Domain.";

    }

    if(

        text.includes("halo") ||

        text.includes("hai") ||

        text.includes("hello")

    ){

        return "Halo 👋 Senang bertemu dengan Anda. Ada yang bisa kami bantu hari ini?";

    }

    if(

        text.includes("terima kasih")

    ){

        return "Sama-sama 😊 Semoga informasi yang kami berikan bermanfaat.";

    }

    return AutoReply.fallback;

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableAutoReply(){

    AutoReply.enabled=true;

}

/* ===========================================================
   DISABLE
=========================================================== */

function disableAutoReply(){

    AutoReply.enabled=false;

}

/* ===========================================================
   DELAY
=========================================================== */

function setTypingDelay(milliseconds){

    AutoReply.delay=milliseconds;

}

/* ===========================================================
   CANCEL
=========================================================== */

function cancelTyping(){

    clearTimeout(

        TypingEngine.timeout

    );

    hideTypingIndicator();

}

/* ===========================================================
   STATUS
=========================================================== */

function typingStatus(){

    return{

        initialized:

            TypingEngine.initialized,

        active:

            TypingEngine.active,

        autoReply:

            AutoReply.enabled,

        delay:

            AutoReply.delay

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeTypingEngine();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ChatbotManager,

    {

        typing:{

            init:

                initializeTypingEngine,

            show:

                showTypingIndicator,

            hide:

                hideTypingIndicator,

            cancel:

                cancelTyping,

            delay:

                setTypingDelay,

            enable:

                enableAutoReply,

            disable:

                disableAutoReply,

            reply:

                simulateAutoReply,

            status:

                typingStatus

        }

    }

);

/* ===========================================================
   END PART 4
===========================================================
*/

/*!
===========================================================
 Investment Technology Indonesia
 assets/js/chatbot.js
 Part 5
 FAQ Integration • Quick Replies • Suggested Questions
===========================================================
*/

"use strict";

/* ===========================================================
   FAQ ENGINE
=========================================================== */

const ChatFAQ={

    initialized:false,

    quickReplies:[],

    suggestions:[

        "Layanan Website",

        "Pembuatan Aplikasi",

        "Harga Jasa",

        "AI & Chatbot",

        "Cloud Server",

        "Hubungi Admin"

    ]

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeFAQEngine(){

    createQuickReplies();

    initializeQuickReplyEvents();

    ChatFAQ.initialized=true;

}

/* ===========================================================
   QUICK REPLIES
=========================================================== */

function createQuickReplies(){

    const container=$(

        ".chatbot-quick-replies",

        Chatbot.container

    );

    if(!container){

        return;

    }

    container.innerHTML="";

    ChatFAQ.quickReplies=[];

    ChatFAQ.suggestions.forEach(text=>{

        const button=

            document.createElement("button");

        button.type="button";

        button.className=

            "chatbot-quick-reply";

        button.textContent=text;

        container.appendChild(button);

        ChatFAQ.quickReplies.push(button);

    });

}

/* ===========================================================
   EVENTS
=========================================================== */

function initializeQuickReplyEvents(){

    ChatFAQ.quickReplies.forEach(button=>{

        on(

            button,

            "click",

            ()=>{

                sendQuickReply(

                    button.textContent

                );

            }

        );

    });

}

/* ===========================================================
   SEND
=========================================================== */

function sendQuickReply(text){

    sendUserMessage(text);

}

/* ===========================================================
   FAQ DATABASE
=========================================================== */

const FAQDatabase={

    "layanan website":

        "Kami menyediakan Website Company Profile, Landing Page, Portal Berita, E-Commerce, ERP, CRM, dan Custom Web Application.",

    "pembuatan aplikasi":

        "Kami mengembangkan aplikasi Android, iOS, Flutter, React Native, Web App, hingga Enterprise System.",

    "harga jasa":

        "Harga disesuaikan dengan kebutuhan proyek. Silakan konsultasikan spesifikasi agar kami dapat memberikan penawaran terbaik.",

    "ai & chatbot":

        "Kami menyediakan AI Chatbot, Automation, Machine Learning, Integrasi AI API, dan AI Assistant untuk bisnis.",

    "cloud server":

        "Kami menyediakan VPS, Dedicated Server, Cloud Infrastructure, Domain, SSL, Email Hosting, dan Backup Server.",

    "hubungi admin":

        "Silakan klik tombol WhatsApp agar langsung terhubung dengan tim Investment Technology Indonesia."

};

/* ===========================================================
   FAQ RESPONSE
=========================================================== */

function findFAQAnswer(question){

    const key=

        question.toLowerCase();

    return(

        FAQDatabase[key] ||

        null

    );

}

/* ===========================================================
   SMART FAQ
=========================================================== */

function processFAQ(question){

    const answer=

        findFAQAnswer(question);

    if(answer){

        sendBotMessage(answer);

        return true;

    }

    return false;

}

/* ===========================================================
   RECOMMENDATIONS
=========================================================== */

function showSuggestions(){

    if(

        !ChatFAQ.quickReplies.length

    ){

        return;

    }

    ChatFAQ.quickReplies.forEach(button=>{

        button.style.display="";

    });

}

function hideSuggestions(){

    ChatFAQ.quickReplies.forEach(button=>{

        button.style.display="none";

    });

}

/* ===========================================================
   ADD SUGGESTION
=========================================================== */

function addSuggestion(text){

    if(

        ChatFAQ.suggestions.includes(text)

    ){

        return;

    }

    ChatFAQ.suggestions.push(text);

    createQuickReplies();

    initializeQuickReplyEvents();

}

/* ===========================================================
   REMOVE
=========================================================== */

function removeSuggestion(text){

    ChatFAQ.suggestions=

        ChatFAQ.suggestions.filter(

            item=>item!==text

        );

    createQuickReplies();

    initializeQuickReplyEvents();

}

/* ===========================================================
   RESET
=========================================================== */

function resetSuggestions(){

    ChatFAQ.suggestions=[

        "Layanan Website",

        "Pembuatan Aplikasi",

        "Harga Jasa",

        "AI & Chatbot",

        "Cloud Server",

        "Hubungi Admin"

    ];

    createQuickReplies();

    initializeQuickReplyEvents();

}

/* ===========================================================
   STATUS
=========================================================== */

function faqEngineStatus(){

    return{

        initialized:

            ChatFAQ.initialized,

        quickReplies:

            ChatFAQ.quickReplies.length,

        suggestions:

            ChatFAQ.suggestions.length

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeFAQEngine();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ChatbotManager,

    {

        faq:{

            init:

                initializeFAQEngine,

            ask:

                processFAQ,

            reply:

                sendQuickReply,

            show:

                showSuggestions,

            hide:

                hideSuggestions,

            add:

                addSuggestion,

            remove:

                removeSuggestion,

            reset:

                resetSuggestions,

            status:

                faqEngineStatus

        }

    }

);

/* ===========================================================
   END PART 5
===========================================================
*/

/*!
===========================================================
 Investment Technology Indonesia
 assets/js/chatbot.js
 Part 6
 WhatsApp Integration • Contact Actions • External Links
===========================================================
*/

"use strict";

/* ===========================================================
   WHATSAPP
=========================================================== */

const WhatsAppEngine={

    initialized:false,

    phone:"6281234567890",

    defaultMessage:
`Halo Investment Technology Indonesia,

Saya ingin berkonsultasi mengenai layanan IT.

Nama :
Perusahaan :
Kebutuhan :

Terima kasih.`

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeWhatsApp(){

    initializeWhatsAppButtons();

    WhatsAppEngine.initialized=true;

}

/* ===========================================================
   BUTTONS
=========================================================== */

function initializeWhatsAppButtons(){

    $$(
        ".chatbot-whatsapp",
        Chatbot.container
    ).forEach(button=>{

        on(

            button,

            "click",

            ()=>{

                openWhatsApp();

            }

        );

    });

}

/* ===========================================================
   URL
=========================================================== */

function createWhatsAppURL(message){

    return `https://wa.me/${

        WhatsAppEngine.phone

    }?text=${

        encodeURIComponent(message)

    }`;

}

/* ===========================================================
   OPEN
=========================================================== */

function openWhatsApp(

    message=

    WhatsAppEngine.defaultMessage

){

    window.open(

        createWhatsAppURL(message),

        "_blank",

        "noopener"

    );

}

/* ===========================================================
   SEND CURRENT CHAT
=========================================================== */

function sendConversationToWhatsApp(){

    const history=

        ChatbotState.messages

        .map(message=>

            `${

                message.sender==="user"

                ?"Anda"

                :"Bot"

            }: ${message.text}`

        )

        .join("\n\n");

    openWhatsApp(history);

}

/* ===========================================================
   CONTACT SALES
=========================================================== */

function contactSales(){

    openWhatsApp(

`Halo Investment Technology Indonesia,

Saya ingin berkonsultasi mengenai layanan Software Development.

Mohon informasi lebih lanjut.

Terima kasih.`

    );

}

/* ===========================================================
   CONTACT SUPPORT
=========================================================== */

function contactSupport(){

    openWhatsApp(

`Halo Tim Support,

Saya mengalami kendala dan membutuhkan bantuan teknis.

Terima kasih.`

    );

}

/* ===========================================================
   CONTACT CEO
=========================================================== */

function contactCEO(){

    openWhatsApp(

`Halo,

Saya ingin menghubungi CEO Investment Technology Indonesia mengenai peluang kerja sama bisnis.

Terima kasih.`

    );

}

/* ===========================================================
   COPY NUMBER
=========================================================== */

async function copyWhatsAppNumber(){

    try{

        await navigator.clipboard.writeText(

            WhatsAppEngine.phone

        );

        sendBotMessage(

            "Nomor WhatsApp berhasil disalin."

        );

    }

    catch{

        sendBotMessage(

            WhatsAppEngine.phone

        );

    }

}

/* ===========================================================
   CHANGE NUMBER
=========================================================== */

function setWhatsAppNumber(number){

    WhatsAppEngine.phone=

        String(number)

        .replace(/\D/g,"");

}

/* ===========================================================
   CHANGE TEMPLATE
=========================================================== */

function setDefaultMessage(message){

    WhatsAppEngine.defaultMessage=

        message;

}

/* ===========================================================
   EMAIL
=========================================================== */

function sendEmail(){

    window.location.href=

`mailto:info@investmenttechnologyindonesia.com?subject=Konsultasi&body=Halo Investment Technology Indonesia`;

}

/* ===========================================================
   WEBSITE
=========================================================== */

function openWebsite(){

    window.open(

        "https://investmenttechnologyindonesia.com",

        "_blank",

        "noopener"

    );

}

/* ===========================================================
   STATUS
=========================================================== */

function whatsappStatus(){

    return{

        initialized:

            WhatsAppEngine.initialized,

        phone:

            WhatsAppEngine.phone,

        messageLength:

            WhatsAppEngine.defaultMessage.length

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeWhatsApp();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ChatbotManager,

    {

        whatsapp:{

            init:

                initializeWhatsApp,

            open:

                openWhatsApp,

            sales:

                contactSales,

            support:

                contactSupport,

            ceo:

                contactCEO,

            sendHistory:

                sendConversationToWhatsApp,

            copyNumber:

                copyWhatsAppNumber,

            setNumber:

                setWhatsAppNumber,

            setMessage:

                setDefaultMessage,

            email:

                sendEmail,

            website:

                openWebsite,

            status:

                whatsappStatus

        }

    }

);

/* ===========================================================
   END PART 6
===========================================================
*/

/*!
===========================================================
 Investment Technology Indonesia
 assets/js/chatbot.js
 Part 7
 File Upload • Emoji • Attachment Support
===========================================================
*/

"use strict";

/* ===========================================================
   ATTACHMENT ENGINE
=========================================================== */

const AttachmentEngine={

    initialized:false,

    maxFileSize:10*1024*1024,

    allowedTypes:[

        "image/",

        "application/pdf",

        "text/",

        "application/msword",

        "application/vnd.openxmlformats-officedocument"

    ],

    files:[]

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeAttachmentEngine(){

    initializeFileInput();

    initializeEmojiPicker();

    initializePasteSupport();

    AttachmentEngine.initialized=true;

}

/* ===========================================================
   FILE INPUT
=========================================================== */

function initializeFileInput(){

    const input=$(

        ".chatbot-file",

        Chatbot.container

    );

    if(!input){

        return;

    }

    on(

        input,

        "change",

        event=>{

            handleFiles(

                [...event.target.files]

            );

        }

    );

}

/* ===========================================================
   HANDLE FILES
=========================================================== */

function handleFiles(files){

    files.forEach(file=>{

        if(

            !validateFile(file)

        ){

            return;

        }

        AttachmentEngine.files.push(file);

        renderAttachment(file);

    });

}

/* ===========================================================
   VALIDATE
=========================================================== */

function validateFile(file){

    if(

        file.size>

        AttachmentEngine.maxFileSize

    ){

        sendBotMessage(

            "Ukuran file melebihi 10 MB."

        );

        return false;

    }

    const allowed=

        AttachmentEngine.allowedTypes.some(

            type=>

                file.type.startsWith(type)

        );

    if(!allowed){

        sendBotMessage(

            "Format file tidak didukung."

        );

        return false;

    }

    return true;

}

/* ===========================================================
   RENDER
=========================================================== */

function renderAttachment(file){

    const element=

        document.createElement("div");

    element.className=

        "chat-attachment";

    element.innerHTML=`

<div class="attachment-name">

📎 ${escapeHTML(file.name)}

</div>

<div class="attachment-size">

${formatFileSize(file.size)}

</div>

`;

    Chatbot.body?.appendChild(element);

    scrollConversation();

}

/* ===========================================================
   REMOVE
=========================================================== */

function removeAttachment(index){

    AttachmentEngine.files.splice(

        index,

        1

    );

}

/* ===========================================================
   CLEAR
=========================================================== */

function clearAttachments(){

    AttachmentEngine.files=[];

    $$(
        ".chat-attachment",
        Chatbot.body
    ).forEach(item=>{

        item.remove();

    });

}

/* ===========================================================
   FILE SIZE
=========================================================== */

function formatFileSize(size){

    if(size<1024){

        return `${size} B`;

    }

    if(size<1048576){

        return `${

            (size/1024)

            .toFixed(1)

        } KB`;

    }

    return `${

        (size/1048576)

        .toFixed(2)

    } MB`;

}

/* ===========================================================
   EMOJI
=========================================================== */

function initializeEmojiPicker(){

    const button=$(

        ".chatbot-emoji",

        Chatbot.container

    );

    if(!button){

        return;

    }

    on(

        button,

        "click",

        ()=>{

            insertEmoji("😊");

        }

    );

}

function insertEmoji(emoji){

    if(!Chatbot.input){

        return;

    }

    Chatbot.input.value+=emoji;

    Chatbot.input.focus();

}

/* ===========================================================
   PASTE SUPPORT
=========================================================== */

function initializePasteSupport(){

    if(!Chatbot.input){

        return;

    }

    on(

        Chatbot.input,

        "paste",

        event=>{

            const files=[

                ...event.clipboardData.files

            ];

            if(files.length){

                handleFiles(files);

            }

        }

    );

}

/* ===========================================================
   IMAGE PREVIEW
=========================================================== */

function previewImage(file){

    if(

        !file.type.startsWith(

            "image/"

        )

    ){

        return;

    }

    const reader=

        new FileReader();

    reader.onload=()=>{

        sendBotMessage(

            "Gambar berhasil dipilih."

        );

    };

    reader.readAsDataURL(file);

}

/* ===========================================================
   STATUS
=========================================================== */

function attachmentStatus(){

    return{

        initialized:

            AttachmentEngine.initialized,

        totalFiles:

            AttachmentEngine.files.length,

        maxSize:

            AttachmentEngine.maxFileSize

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeAttachmentEngine();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ChatbotManager,

    {

        attachment:{

            init:

                initializeAttachmentEngine,

            add:

                handleFiles,

            remove:

                removeAttachment,

            clear:

                clearAttachments,

            preview:

                previewImage,

            emoji:

                insertEmoji,

            status:

                attachmentStatus

        }

    }

);

/* ===========================================================
   END PART 7
===========================================================
*/

/*!
===========================================================
 Investment Technology Indonesia
 assets/js/chatbot.js
 Part 8
 Voice Input • Speech Synthesis • Accessibility
===========================================================
*/

"use strict";

/* ===========================================================
   VOICE ENGINE
=========================================================== */

const VoiceEngine={

    initialized:false,

    recognition:null,

    synthesis:window.speechSynthesis,

    listening:false,

    supported:

        "SpeechRecognition" in window ||

        "webkitSpeechRecognition" in window

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeVoiceEngine(){

    initializeSpeechRecognition();

    initializeVoiceButtons();

    initializeAccessibility();

    VoiceEngine.initialized=true;

}

/* ===========================================================
   SPEECH RECOGNITION
=========================================================== */

function initializeSpeechRecognition(){

    if(

        !VoiceEngine.supported

    ){

        return;

    }

    const Recognition=

        window.SpeechRecognition ||

        window.webkitSpeechRecognition;

    VoiceEngine.recognition=

        new Recognition();

    VoiceEngine.recognition.lang="id-ID";

    VoiceEngine.recognition.interimResults=false;

    VoiceEngine.recognition.maxAlternatives=1;

    VoiceEngine.recognition.continuous=false;

    VoiceEngine.recognition.onstart=()=>{

        VoiceEngine.listening=true;

        chatbotLog(

            "Voice Listening..."

        );

    };

    VoiceEngine.recognition.onend=()=>{

        VoiceEngine.listening=false;

    };

    VoiceEngine.recognition.onresult=event=>{

        const text=

            event.results[0][0]

            .transcript;

        if(Chatbot.input){

            Chatbot.input.value=text;

        }

    };

    VoiceEngine.recognition.onerror=()=>{

        VoiceEngine.listening=false;

    };

}

/* ===========================================================
   BUTTONS
=========================================================== */

function initializeVoiceButtons(){

    const voice=$(

        ".chatbot-voice",

        Chatbot.container

    );

    const speak=$(

        ".chatbot-speak",

        Chatbot.container

    );

    if(voice){

        on(

            voice,

            "click",

            toggleVoiceRecognition

        );

    }

    if(speak){

        on(

            speak,

            "click",

            ()=>{

                speakLastMessage();

            }

        );

    }

}

/* ===========================================================
   START
=========================================================== */

function startListening(){

    if(

        !VoiceEngine.recognition ||

        VoiceEngine.listening

    ){

        return;

    }

    VoiceEngine.recognition.start();

}

/* ===========================================================
   STOP
=========================================================== */

function stopListening(){

    if(

        !VoiceEngine.recognition ||

        !VoiceEngine.listening

    ){

        return;

    }

    VoiceEngine.recognition.stop();

}

/* ===========================================================
   TOGGLE
=========================================================== */

function toggleVoiceRecognition(){

    if(

        VoiceEngine.listening

    ){

        stopListening();

    }else{

        startListening();

    }

}

/* ===========================================================
   SPEAK
=========================================================== */

function speak(text){

    if(

        !VoiceEngine.synthesis ||

        !text

    ){

        return;

    }

    const utterance=

        new SpeechSynthesisUtterance(text);

    utterance.lang="id-ID";

    utterance.rate=1;

    utterance.pitch=1;

    VoiceEngine.synthesis.cancel();

    VoiceEngine.synthesis.speak(

        utterance

    );

}

/* ===========================================================
   LAST BOT MESSAGE
=========================================================== */

function speakLastMessage(){

    const message=

        [...ChatbotState.messages]

        .reverse()

        .find(

            item=>

                item.sender==="bot"

        );

    if(message){

        speak(message.text);

    }

}

/* ===========================================================
   STOP SPEAKING
=========================================================== */

function stopSpeaking(){

    VoiceEngine.synthesis?.cancel();

}

/* ===========================================================
   ACCESSIBILITY
=========================================================== */

function initializeAccessibility(){

    Chatbot.toggle?.setAttribute(

        "aria-label",

        "Open Chat"

    );

    Chatbot.input?.setAttribute(

        "aria-label",

        "Chat Input"

    );

    Chatbot.send?.setAttribute(

        "aria-label",

        "Send Message"

    );

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableVoice(){

    VoiceEngine.supported=true;

}

/* ===========================================================
   DISABLE
=========================================================== */

function disableVoice(){

    stopListening();

    stopSpeaking();

}

/* ===========================================================
   STATUS
=========================================================== */

function voiceStatus(){

    return{

        initialized:

            VoiceEngine.initialized,

        supported:

            VoiceEngine.supported,

        listening:

            VoiceEngine.listening,

        speaking:

            VoiceEngine.synthesis?.speaking ||

            false

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeVoiceEngine();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ChatbotManager,

    {

        voice:{

            init:

                initializeVoiceEngine,

            start:

                startListening,

            stop:

                stopListening,

            toggle:

                toggleVoiceRecognition,

            speak,

            speakLast:

                speakLastMessage,

            cancel:

                stopSpeaking,

            enable:

                enableVoice,

            disable:

                disableVoice,

            status:

                voiceStatus

        }

    }

);

/* ===========================================================
   END PART 8
===========================================================
*/

/*!
===========================================================
 Investment Technology Indonesia
 assets/js/chatbot.js
 Part 9
 Local Storage • Chat History • Session Manager
===========================================================
*/

"use strict";

/* ===========================================================
   STORAGE
=========================================================== */

const ChatStorage={

    initialized:false,

    historyKey:"iti-chat-history",

    sessionKey:"iti-chat-session",

    settingsKey:"iti-chat-settings"

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeStorage(){

    loadSession();

    loadHistory();

    loadSettings();

    ChatStorage.initialized=true;

}

/* ===========================================================
   SAVE HISTORY
=========================================================== */

function saveHistory(){

    if(

        !CHATBOT_CONFIG.saveHistory

    ){

        return;

    }

    try{

        localStorage.setItem(

            ChatStorage.historyKey,

            JSON.stringify(

                ChatbotState.messages

            )

        );

    }

    catch(error){

        chatbotLog(error);

    }

}

/* ===========================================================
   LOAD HISTORY
=========================================================== */

function loadHistory(){

    try{

        const data=

            localStorage.getItem(

                ChatStorage.historyKey

            );

        if(!data){

            return;

        }

        const messages=

            JSON.parse(data);

        if(

            Array.isArray(messages)

        ){

            ChatbotState.messages=

                messages;

            MessageEngine.messages=[

                ...messages

            ];

            renderMessages();

        }

    }

    catch(error){

        chatbotLog(error);

    }

}

/* ===========================================================
   CLEAR HISTORY
=========================================================== */

function clearHistory(){

    ChatbotState.messages=[];

    MessageEngine.messages=[];

    localStorage.removeItem(

        ChatStorage.historyKey

    );

    renderMessages();

}

/* ===========================================================
   SAVE SESSION
=========================================================== */

function saveSession(){

    try{

        localStorage.setItem(

            ChatStorage.sessionKey,

            JSON.stringify({

                id:

                    ChatbotState.session,

                opened:

                    ChatbotState.opened,

                minimized:

                    ChatbotState.minimized,

                unread:

                    ChatbotState.unread,

                timestamp:

                    Date.now()

            })

        );

    }

    catch(error){

        chatbotLog(error);

    }

}

/* ===========================================================
   LOAD SESSION
=========================================================== */

function loadSession(){

    try{

        const data=

            localStorage.getItem(

                ChatStorage.sessionKey

            );

        if(!data){

            return;

        }

        const session=

            JSON.parse(data);

        ChatbotState.session=

            session.id||

            ChatbotState.session;

        ChatbotState.opened=

            session.opened||

            false;

        ChatbotState.minimized=

            session.minimized||

            false;

        ChatbotState.unread=

            session.unread||

            0;

    }

    catch(error){

        chatbotLog(error);

    }

}

/* ===========================================================
   SETTINGS
=========================================================== */

function saveSettings(){

    try{

        localStorage.setItem(

            ChatStorage.settingsKey,

            JSON.stringify({

                theme:

                    CHATBOT_CONFIG.theme,

                position:

                    CHATBOT_CONFIG.position,

                autoReply:

                    CHATBOT_CONFIG.autoReply

            })

        );

    }

    catch(error){

        chatbotLog(error);

    }

}

function loadSettings(){

    try{

        const data=

            localStorage.getItem(

                ChatStorage.settingsKey

            );

        if(!data){

            return;

        }

        const settings=

            JSON.parse(data);

        CHATBOT_CONFIG.theme=

            settings.theme||

            CHATBOT_CONFIG.theme;

        CHATBOT_CONFIG.position=

            settings.position||

            CHATBOT_CONFIG.position;

        CHATBOT_CONFIG.autoReply=

            settings.autoReply??

            CHATBOT_CONFIG.autoReply;

    }

    catch(error){

        chatbotLog(error);

    }

}

/* ===========================================================
   EXPORT
=========================================================== */

function exportHistory(){

    return JSON.stringify(

        ChatbotState.messages,

        null,

        2

    );

}

/* ===========================================================
   IMPORT
=========================================================== */

function importHistory(json){

    try{

        const messages=

            JSON.parse(json);

        if(

            Array.isArray(messages)

        ){

            ChatbotState.messages=

                messages;

            MessageEngine.messages=[

                ...messages

            ];

            renderMessages();

            saveHistory();

        }

    }

    catch(error){

        chatbotLog(error);

    }

}

/* ===========================================================
   RESET
=========================================================== */

function resetStorage(){

    localStorage.removeItem(

        ChatStorage.historyKey

    );

    localStorage.removeItem(

        ChatStorage.sessionKey

    );

    localStorage.removeItem(

        ChatStorage.settingsKey

    );

    clearConversation();

}

/* ===========================================================
   AUTO SAVE
=========================================================== */

window.addEventListener(

    "beforeunload",

    ()=>{

        saveHistory();

        saveSession();

        saveSettings();

    }

);

/* ===========================================================
   STATUS
=========================================================== */

function storageStatus(){

    return{

        initialized:

            ChatStorage.initialized,

        session:

            ChatbotState.session,

        messages:

            ChatbotState.messages.length,

        saveHistory:

            CHATBOT_CONFIG.saveHistory

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeStorage();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ChatbotManager,

    {

        storage:{

            init:

                initializeStorage,

            saveHistory,

            loadHistory,

            clearHistory,

            saveSession,

            loadSession,

            saveSettings,

            loadSettings,

            export:

                exportHistory,

            import:

                importHistory,

            reset:

                resetStorage,

            status:

                storageStatus

        }

    }

);

/* ===========================================================
   END PART 9
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/chatbot.js
 Part 10
 Statistics • Analytics • Performance • Responsive
===========================================================
*/

"use strict";

/* ===========================================================
   CHATBOT STATISTICS
=========================================================== */

const ChatStatistics={

    initialized:false,

    totalMessages:0,

    userMessages:0,

    botMessages:0,

    sessions:0,

    opened:0,

    responseTime:0

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeStatistics(){

    calculateStatistics();

    updateStatisticsUI();

    initializeStatisticsObserver();

    ChatStatistics.initialized=true;

}

/* ===========================================================
   CALCULATE
=========================================================== */

function calculateStatistics(){

    ChatStatistics.totalMessages=

        ChatbotState.messages.length;

    ChatStatistics.userMessages=

        ChatbotState.messages.filter(

            message=>

                message.sender==="user"

        ).length;

    ChatStatistics.botMessages=

        ChatbotState.messages.filter(

            message=>

                message.sender==="bot"

        ).length;

    ChatStatistics.sessions=1;

    ChatStatistics.opened=

        ChatbotState.opened

        ?1

        :0;

    ChatStatistics.responseTime=

        CHATBOT_CONFIG.typingSpeed;

}

/* ===========================================================
   UPDATE UI
=========================================================== */

function updateStatisticsUI(){

    updateStatistic(

        ".chat-total",

        ChatStatistics.totalMessages

    );

    updateStatistic(

        ".chat-user",

        ChatStatistics.userMessages

    );

    updateStatistic(

        ".chat-bot",

        ChatStatistics.botMessages

    );

    updateStatistic(

        ".chat-session",

        ChatStatistics.sessions

    );

}

/* ===========================================================
   UPDATE VALUE
=========================================================== */

function updateStatistic(

    selector,

    value

){

    const element=$(

        selector,

        Chatbot.container

    );

    if(!element){

        return;

    }

    animateStatistic(

        element,

        Number(value)

    );

}

/* ===========================================================
   COUNTER
=========================================================== */

function animateStatistic(

    element,

    target

){

    const duration=800;

    const start=0;

    const startTime=

        performance.now();

    function animate(now){

        const progress=

            Math.min(

                (now-startTime)/duration,

                1

            );

        const value=Math.floor(

            start+

            (target-start)*progress

        );

        element.textContent=value;

        if(progress<1){

            requestAnimationFrame(

                animate

            );

        }

    }

    requestAnimationFrame(

        animate

    );

}

/* ===========================================================
   PROGRESS BAR
=========================================================== */

function updateProgressBar(){

    const progress=$(

        ".chat-progress-bar",

        Chatbot.container

    );

    if(!progress){

        return;

    }

    const percent=

        ChatStatistics.totalMessages===0

        ?0

        :Math.min(

            100,

            (ChatStatistics.userMessages/

            ChatStatistics.totalMessages)

            *100

        );

    progress.style.width=

        `${percent}%`;

}

/* ===========================================================
   PERFORMANCE
=========================================================== */

function optimizePerformance(){

    if(!Chatbot.body){

        return;

    }

    if(

        Chatbot.body.children.length>

        CHATBOT_CONFIG.maxMessages

    ){

        while(

            Chatbot.body.children.length>

            CHATBOT_CONFIG.maxMessages

        ){

            Chatbot.body.firstElementChild

                ?.remove();

        }

    }

}

/* ===========================================================
   RESPONSIVE
=========================================================== */

function updateResponsiveLayout(){

    if(!Chatbot.window){

        return;

    }

    if(

        window.innerWidth<768

    ){

        addClass(

            Chatbot.window,

            "chat-mobile"

        );

    }else{

        removeClass(

            Chatbot.window,

            "chat-mobile"

        );

    }

}

/* ===========================================================
   OBSERVER
=========================================================== */

function initializeStatisticsObserver(){

    if(

        !("IntersectionObserver"

        in window)

    ){

        return;

    }

    const observer=

        new IntersectionObserver(

            entries=>{

                entries.forEach(entry=>{

                    if(

                        entry.isIntersecting

                    ){

                        refreshStatistics();

                    }

                });

            },

            {

                threshold:0.2

            }

        );

    observer.observe(

        Chatbot.container

    );

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshStatistics(){

    calculateStatistics();

    updateStatisticsUI();

    updateProgressBar();

    optimizePerformance();

}

/* ===========================================================
   EXPORT
=========================================================== */

function exportStatistics(){

    return{

        totalMessages:

            ChatStatistics.totalMessages,

        userMessages:

            ChatStatistics.userMessages,

        botMessages:

            ChatStatistics.botMessages,

        sessions:

            ChatStatistics.sessions,

        responseTime:

            ChatStatistics.responseTime,

        timestamp:

            new Date()

            .toISOString()

    };

}

/* ===========================================================
   STATUS
=========================================================== */

function statisticsStatus(){

    return{

        initialized:

            ChatStatistics.initialized,

        total:

            ChatStatistics.totalMessages,

        user:

            ChatStatistics.userMessages,

        bot:

            ChatStatistics.botMessages,

        sessions:

            ChatStatistics.sessions,

        responseTime:

            ChatStatistics.responseTime

    };

}

/* ===========================================================
   EVENTS
=========================================================== */

window.addEventListener(

    "resize",

    updateResponsiveLayout,

    {

        passive:true

    }

);

window.addEventListener(

    "load",

    ()=>{

        optimizePerformance();

        updateResponsiveLayout();

    }

);

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeStatistics();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ChatbotManager,

    {

        statistics:{

            init:

                initializeStatistics,

            refresh:

                refreshStatistics,

            export:

                exportStatistics,

            progress:

                updateProgressBar,

            optimize:

                optimizePerformance,

            responsive:

                updateResponsiveLayout,

            status:

                statisticsStatus

        }

    }

);

/* ===========================================================
   END PART 10
===========================================================
*/

/*!
===========================================================
 Investment Technology Indonesia
 assets/js/chatbot.js
 Part 11
 Utilities • Debug • Report • Public API
===========================================================
*/

"use strict";

/* ===========================================================
   INFORMATION
=========================================================== */

const ChatbotInfo={

    name:"Chatbot Manager",

    version:"1.0.0",

    author:"Investment Technology Indonesia",

    environment:"production"

};

/* ===========================================================
   DEBUG
=========================================================== */

function enableChatbotDebug(){

    ChatbotApp.debug=true;

    chatbotLog(

        "Debug Enabled"

    );

}

function disableChatbotDebug(){

    ChatbotApp.debug=false;

}

function chatbotDebug(...args){

    if(!ChatbotApp.debug){

        return;

    }

    console.log(

        "[Chatbot Debug]",

        ...args

    );

}

function chatbotWarn(message){

    console.warn(

        "[Chatbot Warning]",

        message

    );

}

function chatbotError(message){

    console.error(

        "[Chatbot Error]",

        message

    );

}

/* ===========================================================
   UNIQUE ID
=========================================================== */

function chatbotID(){

    if(window.crypto?.randomUUID){

        return crypto.randomUUID();

    }

    return "chatbot-"+

        Date.now()+"-"+

        Math.random()

        .toString(36)

        .substring(2,10);

}

/* ===========================================================
   WAIT
=========================================================== */

function chatbotWait(milliseconds=300){

    return new Promise(resolve=>{

        setTimeout(

            resolve,

            milliseconds

        );

    });

}

/* ===========================================================
   DEBOUNCE
=========================================================== */

function debounce(callback,delay=200){

    let timer;

    return(...args)=>{

        clearTimeout(timer);

        timer=setTimeout(()=>{

            callback(...args);

        },delay);

    };

}

/* ===========================================================
   THROTTLE
=========================================================== */

function throttle(callback,limit=120){

    let waiting=false;

    return(...args)=>{

        if(waiting){

            return;

        }

        callback(...args);

        waiting=true;

        setTimeout(()=>{

            waiting=false;

        },limit);

    };

}

/* ===========================================================
   CLAMP
=========================================================== */

function clamp(value,min,max){

    return Math.min(

        Math.max(value,min),

        max

    );

}

/* ===========================================================
   FORMATTERS
=========================================================== */

function formatMilliseconds(ms){

    return ms<1000

        ? `${ms} ms`

        : `${(ms/1000).toFixed(2)} s`;

}

function formatPercent(value){

    return `${

        clamp(value,0,100)

    }%`;

}

/* ===========================================================
   TIMESTAMP
=========================================================== */

function chatbotTimestamp(){

    return new Date()

        .toLocaleString(

            "id-ID"

        );

}

/* ===========================================================
   REPORT
=========================================================== */

function chatbotReport(){

    return{

        info:ChatbotInfo,

        app:ChatbotApp,

        config:CHATBOT_CONFIG,

        state:ChatbotState,

        window:

            windowStatus?.(),

        messages:

            messageStatus?.(),

        typing:

            typingStatus?.(),

        faq:

            faqEngineStatus?.(),

        whatsapp:

            whatsappStatus?.(),

        attachment:

            attachmentStatus?.(),

        voice:

            voiceStatus?.(),

        storage:

            storageStatus?.(),

        statistics:

            statisticsStatus?.(),

        timestamp:

            chatbotTimestamp()

    };

}

/* ===========================================================
   PRINT REPORT
=========================================================== */

function printChatbotReport(){

    console.table(

        chatbotReport()

    );

}

/* ===========================================================
   RESET
=========================================================== */

function resetChatbotManager(){

    clearConversation?.();

    clearAttachments?.();

    clearHistory?.();

    cancelTyping?.();

    refreshStatistics?.();

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroyChatbotManager(){

    destroyChatbot?.();

    stopListening?.();

    stopSpeaking?.();

    chatbotLog(

        "Chatbot Manager Destroyed"

    );

}

/* ===========================================================
   RESTART
=========================================================== */

function restartChatbotManager(){

    destroyChatbotManager();

    initializeChatbot?.();

    initializeWindow?.();

    initializeMessageEngine?.();

    initializeTypingEngine?.();

    initializeFAQEngine?.();

    initializeWhatsApp?.();

    initializeAttachmentEngine?.();

    initializeVoiceEngine?.();

    initializeStorage?.();

    initializeStatistics?.();

}

/* ===========================================================
   READY
=========================================================== */

function chatbotReady(){

    return{

        initialized:

            ChatbotApp.initialized,

        session:

            ChatbotState.session,

        opened:

            ChatbotState.opened,

        typing:

            ChatbotState.typing,

        totalMessages:

            ChatbotState.messages.length

    };

}

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ChatbotManager,

    {

        info:ChatbotInfo,

        report:chatbotReport,

        printReport:printChatbotReport,

        ready:chatbotReady,

        reset:resetChatbotManager,

        restart:restartChatbotManager,

        destroy:destroyChatbotManager,

        enableDebug:enableChatbotDebug,

        disableDebug:disableChatbotDebug,

        debug:chatbotDebug,

        warn:chatbotWarn,

        error:chatbotError,

        wait:chatbotWait,

        debounce,

        throttle,

        clamp,

        chatbotID,

        formatMilliseconds,

        formatPercent,

        timestamp:chatbotTimestamp

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        chatbotDebug(

            "Chatbot Utilities Ready"

        );

    }

);

/* ===========================================================
   END PART 11
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/chatbot.js
 Part 12
 Final Initialization • Cleanup • Export • End of File
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION INITIALIZER
=========================================================== */

function initializeChatbotManager(){

    if(ChatbotApp.initialized){

        chatbotLog(

            "Chatbot Manager already initialized."

        );

        return;

    }

    ChatbotApp.initialized=true;

    chatbotLog(

        "Initializing Chatbot Manager..."

    );

    initializeChatbot?.();

    initializeWindow?.();

    initializeMessageEngine?.();

    initializeTypingEngine?.();

    initializeFAQEngine?.();

    initializeWhatsApp?.();

    initializeAttachmentEngine?.();

    initializeVoiceEngine?.();

    initializeStorage?.();

    initializeStatistics?.();

    chatbotLog(

        "Chatbot Manager Ready."

    );

}

/* ===========================================================
   GLOBAL EVENTS
=========================================================== */

window.addEventListener(

    "load",

    ()=>{

        refreshChatbot?.();

        refreshStatistics?.();

        chatbotLog(

            "Window Loaded"

        );

    }

);

window.addEventListener(

    "pageshow",

    ()=>{

        loadHistory?.();

        loadSession?.();

    }

);

window.addEventListener(

    "focus",

    ()=>{

        refreshStatistics?.();

    }

);

window.addEventListener(

    "blur",

    ()=>{

        saveHistory?.();

        saveSession?.();

    }

);

/* ===========================================================
   ERROR HANDLER
=========================================================== */

window.addEventListener(

    "error",

    event=>{

        chatbotError?.(

            event.message

        );

    }

);

window.addEventListener(

    "unhandledrejection",

    event=>{

        chatbotError?.(

            event.reason

        );

    }

);

/* ===========================================================
   CLEANUP
=========================================================== */

function cleanupChatbotManager(){

    stopListening?.();

    stopSpeaking?.();

    saveHistory?.();

    saveSession?.();

    saveSettings?.();

    chatbotLog(

        "Chatbot Cleanup Complete"

    );

}

/* ===========================================================
   BEFORE UNLOAD
=========================================================== */

window.addEventListener(

    "beforeunload",

    ()=>{

        cleanupChatbotManager();

    }

);

/* ===========================================================
   FREEZE CONFIG
=========================================================== */

Object.freeze(

    CHATBOT_CONFIG

);

Object.freeze(

    ChatbotInfo

);

/* ===========================================================
   EXPORT
=========================================================== */

window.ChatbotManager=Object.assign(

    window.ChatbotManager||{},

    {

        initialize:

            initializeChatbotManager,

        cleanup:

            cleanupChatbotManager,

        version:

            ()=>ChatbotInfo.version,

        report:

            chatbotReport,

        ready:

            chatbotReady,

        app:

            ChatbotApp,

        config:

            CHATBOT_CONFIG,

        state:

            ChatbotState,

        info:

            ChatbotInfo

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeChatbotManager();

    }

);

/* ===========================================================
   FINAL REPORT
=========================================================== */

chatbotLog(

"========================================"

);

chatbotLog(

"Investment Technology Indonesia"

);

chatbotLog(

"Chatbot Manager"

);

chatbotLog(

"Version:",

ChatbotInfo.version

);

chatbotLog(

"Environment:",

ChatbotInfo.environment

);

chatbotLog(

"========================================"

);

/* ===========================================================
   FEATURES
=========================================================== */

/*
✔ Floating Chat Button
✔ Modern Chat Window
✔ Open / Close Animation
✔ Minimize / Restore
✔ Conversation Manager
✔ Message Queue
✔ Typing Indicator
✔ Smart Auto Reply
✔ FAQ Integration
✔ Quick Reply Buttons
✔ WhatsApp Integration
✔ Contact Sales / Support / CEO
✔ Email & Website Shortcut
✔ File Upload
✔ Attachment Support
✔ Emoji Picker
✔ Clipboard Paste
✔ Voice Recognition
✔ Text-to-Speech
✔ Accessibility Support
✔ Local Storage History
✔ Session Manager
✔ Responsive Layout
✔ Statistics & Analytics
✔ Performance Optimization
✔ Debug Utilities
✔ Report Generator
✔ Public API
✔ ES6+ Modern JavaScript
✔ Responsive
✔ Optimized
*/

/* ===========================================================
   END OF FILE
   assets/js/chatbot.js
===========================================================
*/
