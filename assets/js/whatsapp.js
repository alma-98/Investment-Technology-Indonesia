/*!
===========================================================
 Investment Technology Indonesia
 assets/js/whatsapp.js
 Part 1
 Core • Config • Initialization
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION
=========================================================== */

const WhatsAppApp={

    name:"Investment Technology Indonesia WhatsApp",

    version:"1.0.0",

    initialized:false,

    debug:false

};

/* ===========================================================
   CONFIG
=========================================================== */

const WHATSAPP_CONFIG={

    selector:".whatsapp",

    buttonSelector:".whatsapp-button",

    popupSelector:".whatsapp-popup",

    closeSelector:".whatsapp-close",

    formSelector:".whatsapp-form",

    inputSelector:".whatsapp-input",

    sendSelector:".whatsapp-send",

    defaultCountry:"62",

    defaultDepartment:"sales",

    animationDuration:300,

    saveHistory:true,

    autoOpen:false,

    autoOpenDelay:10000

};

/* ===========================================================
   STATE
=========================================================== */

const WhatsAppState={

    initialized:false,

    opened:false,

    loading:false,

    selectedDepartment:"sales",

    selectedNumber:null,

    history:[],

    lastMessage:"",

    totalSent:0

};

/* ===========================================================
   ELEMENTS
=========================================================== */

const WhatsApp={

    container:null,

    button:null,

    popup:null,

    close:null,

    form:null,

    input:null,

    send:null

};

/* ===========================================================
   CONTACTS
=========================================================== */

const WhatsAppContacts={

    sales:"6281234567890",

    support:"6281234567891",

    marketing:"6281234567892",

    ceo:"6281234567893"

};

/* ===========================================================
   LOGGER
=========================================================== */

function whatsappLog(...args){

    if(!WhatsAppApp.debug){

        return;

    }

    console.log(

        "[WhatsApp]",

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

/* ===========================================================
   INITIALIZE ELEMENTS
=========================================================== */

function initializeElements(){

    WhatsApp.container=$(

        WHATSAPP_CONFIG.selector

    );

    if(!WhatsApp.container){

        return false;

    }

    WhatsApp.button=$(

        WHATSAPP_CONFIG.buttonSelector,

        WhatsApp.container

    );

    WhatsApp.popup=$(

        WHATSAPP_CONFIG.popupSelector,

        WhatsApp.container

    );

    WhatsApp.close=$(

        WHATSAPP_CONFIG.closeSelector,

        WhatsApp.container

    );

    WhatsApp.form=$(

        WHATSAPP_CONFIG.formSelector,

        WhatsApp.container

    );

    WhatsApp.input=$(

        WHATSAPP_CONFIG.inputSelector,

        WhatsApp.container

    );

    WhatsApp.send=$(

        WHATSAPP_CONFIG.sendSelector,

        WhatsApp.container

    );

    return true;

}

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeWhatsApp(){

    if(WhatsAppApp.initialized){

        return;

    }

    if(!initializeElements()){

        return;

    }

    WhatsAppState.selectedNumber=

        WhatsAppContacts.sales;

    WhatsAppApp.initialized=true;

    WhatsAppState.initialized=true;

    whatsappLog(

        "WhatsApp Initialized"

    );

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshWhatsApp(){

    initializeElements();

    whatsappLog(

        "WhatsApp Refreshed"

    );

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroyWhatsApp(){

    WhatsAppState.opened=false;

    WhatsAppState.loading=false;

    WhatsAppState.history=[];

    WhatsAppState.initialized=false;

    whatsappLog(

        "WhatsApp Destroyed"

    );

}

/* ===========================================================
   DOM READY
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

window.WhatsAppManager={

    app:WhatsAppApp,

    config:WHATSAPP_CONFIG,

    state:WhatsAppState,

    contacts:WhatsAppContacts,

    whatsapp:WhatsApp,

    init:initializeWhatsApp,

    refresh:refreshWhatsApp,

    destroy:destroyWhatsApp

};

/* ===========================================================
   END PART 1
===========================================================
*/

/*!
===========================================================
 Investment Technology Indonesia
 assets/js/whatsapp.js
 Part 2
 Floating Button • Popup • Toggle • UI Controls
===========================================================
*/

"use strict";

/* ===========================================================
   WINDOW
=========================================================== */

const WhatsAppWindow={

    initialized:false,

    opened:false,

    minimized:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeWindow(){

    initializeButton();

    initializeControls();

    initializeAutoOpen();

    initializeResponsive();

    WhatsAppWindow.initialized=true;

}

/* ===========================================================
   FLOATING BUTTON
=========================================================== */

function initializeButton(){

    if(!WhatsApp.button){

        return;

    }

    on(

        WhatsApp.button,

        "click",

        togglePopup

    );

}

/* ===========================================================
   CONTROLS
=========================================================== */

function initializeControls(){

    if(WhatsApp.close){

        on(

            WhatsApp.close,

            "click",

            closePopup

        );

    }

    if(WhatsApp.popup){

        on(

            WhatsApp.popup,

            "click",

            event=>{

                if(

                    event.target===

                    WhatsApp.popup

                ){

                    closePopup();

                }

            }

        );

    }

}

/* ===========================================================
   OPEN
=========================================================== */

function openPopup(){

    if(!WhatsApp.popup){

        return;

    }

    addClass(

        WhatsApp.popup,

        "active"

    );

    removeClass(

        WhatsApp.popup,

        "minimized"

    );

    WhatsAppWindow.opened=true;

    WhatsAppState.opened=true;

    focusMessageInput();

}

/* ===========================================================
   CLOSE
=========================================================== */

function closePopup(){

    if(!WhatsApp.popup){

        return;

    }

    removeClass(

        WhatsApp.popup,

        "active"

    );

    WhatsAppWindow.opened=false;

    WhatsAppState.opened=false;

}

/* ===========================================================
   TOGGLE
=========================================================== */

function togglePopup(){

    if(

        WhatsAppWindow.opened

    ){

        closePopup();

    }else{

        openPopup();

    }

}

/* ===========================================================
   MINIMIZE
=========================================================== */

function minimizePopup(){

    if(!WhatsApp.popup){

        return;

    }

    addClass(

        WhatsApp.popup,

        "minimized"

    );

    WhatsAppWindow.minimized=true;

}

/* ===========================================================
   RESTORE
=========================================================== */

function restorePopup(){

    if(!WhatsApp.popup){

        return;

    }

    removeClass(

        WhatsApp.popup,

        "minimized"

    );

    WhatsAppWindow.minimized=false;

}

/* ===========================================================
   TOGGLE MINIMIZE
=========================================================== */

function toggleMinimize(){

    if(

        WhatsAppWindow.minimized

    ){

        restorePopup();

    }else{

        minimizePopup();

    }

}

/* ===========================================================
   INPUT
=========================================================== */

function focusMessageInput(){

    WhatsApp.input?.focus();

}

/* ===========================================================
   AUTO OPEN
=========================================================== */

function initializeAutoOpen(){

    if(

        !WHATSAPP_CONFIG.autoOpen

    ){

        return;

    }

    setTimeout(()=>{

        if(

            !WhatsAppWindow.opened

        ){

            openPopup();

        }

    },

    WHATSAPP_CONFIG.autoOpenDelay);

}

/* ===========================================================
   RESPONSIVE
=========================================================== */

function initializeResponsive(){

    window.addEventListener(

        "resize",

        updateResponsive,

        {

            passive:true

        }

    );

    updateResponsive();

}

function updateResponsive(){

    if(!WhatsApp.popup){

        return;

    }

    if(

        window.innerWidth<768

    ){

        addClass(

            WhatsApp.popup,

            "mobile"

        );

    }else{

        removeClass(

            WhatsApp.popup,

            "mobile"

        );

    }

}

/* ===========================================================
   ESC
=========================================================== */

document.addEventListener(

    "keydown",

    event=>{

        if(

            event.key==="Escape" &&

            WhatsAppWindow.opened

        ){

            closePopup();

        }

    }

);

/* ===========================================================
   STATUS
=========================================================== */

function windowStatus(){

    return{

        initialized:

            WhatsAppWindow.initialized,

        opened:

            WhatsAppWindow.opened,

        minimized:

            WhatsAppWindow.minimized

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeWindow();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.WhatsAppManager,

    {

        window:{

            init:

                initializeWindow,

            open:

                openPopup,

            close:

                closePopup,

            toggle:

                togglePopup,

            minimize:

                minimizePopup,

            restore:

                restorePopup,

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
 assets/js/whatsapp.js
 Part 3
 Message Engine • Send Message • URL Generator
===========================================================
*/

"use strict";

/* ===========================================================
   MESSAGE ENGINE
=========================================================== */

const MessageEngine={

    initialized:false,

    queue:[],

    sending:false,

    lastMessage:"",

    maxLength:4000

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeMessageEngine(){

    initializeSendButton();

    initializeInputEvents();

    MessageEngine.initialized=true;

}

/* ===========================================================
   INPUT EVENTS
=========================================================== */

function initializeInputEvents(){

    if(!WhatsApp.input){

        return;

    }

    on(

        WhatsApp.input,

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

    on(

        WhatsApp.input,

        "input",

        updateCharacterCounter

    );

}

/* ===========================================================
   SEND BUTTON
=========================================================== */

function initializeSendButton(){

    if(!WhatsApp.send){

        return;

    }

    on(

        WhatsApp.send,

        "click",

        sendCurrentMessage

    );

}

/* ===========================================================
   SEND
=========================================================== */

function sendCurrentMessage(){

    const message=

        WhatsApp.input?.value

        .trim();

    if(!message){

        return;

    }

    sendMessage(message);

    WhatsApp.input.value="";

}

/* ===========================================================
   SEND MESSAGE
=========================================================== */

function sendMessage(message){

    if(

        MessageEngine.sending

    ){

        MessageEngine.queue.push(message);

        return;

    }

    MessageEngine.sending=true;

    MessageEngine.lastMessage=message;

    WhatsAppState.lastMessage=message;

    WhatsAppState.totalSent++;

    addHistory(message);

    openWhatsAppURL(message);

    MessageEngine.sending=false;

    processQueue();

}

/* ===========================================================
   PROCESS QUEUE
=========================================================== */

function processQueue(){

    if(

        MessageEngine.queue.length===0

    ){

        return;

    }

    const message=

        MessageEngine.queue.shift();

    sendMessage(message);

}

/* ===========================================================
   URL
=========================================================== */

function generateWhatsAppURL(message){

    const phone=

        WhatsAppState.selectedNumber ||

        WhatsAppContacts.sales;

    return `https://wa.me/${phone}?text=${

        encodeURIComponent(message)

    }`;

}

/* ===========================================================
   OPEN
=========================================================== */

function openWhatsAppURL(message){

    window.open(

        generateWhatsAppURL(message),

        "_blank",

        "noopener,noreferrer"

    );

}

/* ===========================================================
   HISTORY
=========================================================== */

function addHistory(message){

    WhatsAppState.history.push({

        text:message,

        date:new Date(),

        number:

            WhatsAppState.selectedNumber

    });

}

/* ===========================================================
   CLEAR
=========================================================== */

function clearHistory(){

    WhatsAppState.history=[];

}

/* ===========================================================
   CHARACTER COUNTER
=========================================================== */

function updateCharacterCounter(){

    const counter=$(

        ".whatsapp-counter",

        WhatsApp.container

    );

    if(

        !counter ||

        !WhatsApp.input

    ){

        return;

    }

    counter.textContent=

        `${

            WhatsApp.input.value.length

        } / ${

            MessageEngine.maxLength

        }`;

}

/* ===========================================================
   TEMPLATE
=========================================================== */

function sendTemplate(template){

    WhatsApp.input.value=

        template;

    sendCurrentMessage();

}

/* ===========================================================
   RESEND
=========================================================== */

function resendLastMessage(){

    if(

        !MessageEngine.lastMessage

    ){

        return;

    }

    sendMessage(

        MessageEngine.lastMessage

    );

}

/* ===========================================================
   EXPORT
=========================================================== */

function exportHistory(){

    return[

        ...WhatsAppState.history

    ];

}

/* ===========================================================
   STATUS
=========================================================== */

function messageStatus(){

    return{

        initialized:

            MessageEngine.initialized,

        sending:

            MessageEngine.sending,

        queued:

            MessageEngine.queue.length,

        totalSent:

            WhatsAppState.totalSent,

        history:

            WhatsAppState.history.length

    };

}

/* ===========================================================
   DOM READY
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

    window.WhatsAppManager,

    {

        message:{

            init:

                initializeMessageEngine,

            send:

                sendMessage,

            sendCurrent:

                sendCurrentMessage,

            resend:

                resendLastMessage,

            template:

                sendTemplate,

            clear:

                clearHistory,

            export:

                exportHistory,

            url:

                generateWhatsAppURL,

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
 assets/js/whatsapp.js
 Part 4
 Contact List • Department Routing • Contact Manager
===========================================================
*/

"use strict";

/* ===========================================================
   CONTACT MANAGER
=========================================================== */

const ContactManager={

    initialized:false,

    activeDepartment:

        WHATSAPP_CONFIG.defaultDepartment,

    contacts:{

        sales:{
            name:"Sales",
            number:WhatsAppContacts.sales,
            icon:"💼"
        },

        support:{
            name:"Support",
            number:WhatsAppContacts.support,
            icon:"🛠️"
        },

        marketing:{
            name:"Marketing",
            number:WhatsAppContacts.marketing,
            icon:"📢"
        },

        ceo:{
            name:"CEO",
            number:WhatsAppContacts.ceo,
            icon:"👨‍💼"
        }

    }

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeContacts(){

    initializeDepartmentButtons();

    renderContactList();

    ContactManager.initialized=true;

}

/* ===========================================================
   DEPARTMENT BUTTONS
=========================================================== */

function initializeDepartmentButtons(){

    $$(
        "[data-department]",
        WhatsApp.container
    ).forEach(button=>{

        on(

            button,

            "click",

            ()=>{

                selectDepartment(

                    button.dataset.department

                );

            }

        );

    });

}

/* ===========================================================
   SELECT
=========================================================== */

function selectDepartment(department){

    if(

        !ContactManager.contacts[department]

    ){

        return;

    }

    ContactManager.activeDepartment=

        department;

    WhatsAppState.selectedDepartment=

        department;

    WhatsAppState.selectedNumber=

        ContactManager.contacts[
            department
        ].number;

    updateDepartmentUI();

}

/* ===========================================================
   UI
=========================================================== */

function updateDepartmentUI(){

    $$(
        "[data-department]",
        WhatsApp.container
    ).forEach(button=>{

        removeClass(

            button,

            "active"

        );

        if(

            button.dataset.department===

            ContactManager.activeDepartment

        ){

            addClass(

                button,

                "active"

            );

        }

    });

}

/* ===========================================================
   CONTACT LIST
=========================================================== */

function renderContactList(){

    const list=$(

        ".whatsapp-contact-list",

        WhatsApp.container

    );

    if(!list){

        return;

    }

    list.innerHTML="";

    Object.entries(

        ContactManager.contacts

    ).forEach(

        ([key,contact])=>{

            const item=

                document.createElement("button");

            item.type="button";

            item.className=

                "whatsapp-contact-item";

            item.dataset.department=

                key;

            item.innerHTML=`

<span class="contact-icon">

${contact.icon}

</span>

<span class="contact-name">

${contact.name}

</span>

`;

            on(

                item,

                "click",

                ()=>{

                    selectDepartment(key);

                }

            );

            list.appendChild(item);

        }

    );

    updateDepartmentUI();

}

/* ===========================================================
   GET CONTACT
=========================================================== */

function getCurrentContact(){

    return ContactManager.contacts[

        ContactManager.activeDepartment

    ];

}

/* ===========================================================
   NUMBER
=========================================================== */

function getCurrentNumber(){

    return getCurrentContact()

        ?.number||

        WhatsAppContacts.sales;

}

/* ===========================================================
   NAME
=========================================================== */

function getCurrentDepartment(){

    return ContactManager.activeDepartment;

}

/* ===========================================================
   UPDATE
=========================================================== */

function updateContact(

    department,

    number

){

    if(

        !ContactManager.contacts[department]

    ){

        return;

    }

    ContactManager.contacts[
        department
    ].number=

        String(number)

        .replace(/\D/g,"");

}

/* ===========================================================
   ADD
=========================================================== */

function addContact(

    key,

    name,

    number,

    icon="📱"

){

    ContactManager.contacts[key]={

        name,

        number,

        icon

    };

    renderContactList();

}

/* ===========================================================
   REMOVE
=========================================================== */

function removeContact(key){

    if(

        !ContactManager.contacts[key]

    ){

        return;

    }

    delete ContactManager.contacts[key];

    renderContactList();

}

/* ===========================================================
   RESET
=========================================================== */

function resetContacts(){

    ContactManager.activeDepartment=

        WHATSAPP_CONFIG.defaultDepartment;

    WhatsAppState.selectedDepartment=

        ContactManager.activeDepartment;

    WhatsAppState.selectedNumber=

        WhatsAppContacts.sales;

    renderContactList();

}

/* ===========================================================
   STATUS
=========================================================== */

function contactStatus(){

    return{

        initialized:

            ContactManager.initialized,

        active:

            ContactManager.activeDepartment,

        number:

            getCurrentNumber(),

        total:

            Object.keys(

                ContactManager.contacts

            ).length

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeContacts();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.WhatsAppManager,

    {

        contacts:{

            init:

                initializeContacts,

            select:

                selectDepartment,

            current:

                getCurrentContact,

            number:

                getCurrentNumber,

            department:

                getCurrentDepartment,

            update:

                updateContact,

            add:

                addContact,

            remove:

                removeContact,

            reset:

                resetContacts,

            status:

                contactStatus

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
 assets/js/whatsapp.js
 Part 5
 Quick Message Templates • Preset Messages • Smart Templates
===========================================================
*/

"use strict";

/* ===========================================================
   TEMPLATE ENGINE
=========================================================== */

const TemplateEngine={

    initialized:false,

    active:"general",

    templates:{

        general:
`Halo Investment Technology Indonesia,

Saya ingin berkonsultasi mengenai layanan IT.

Terima kasih.`,

        website:
`Halo Investment Technology Indonesia,

Saya ingin membuat Website Company Profile.

Mohon informasi penawaran dan estimasi biaya.

Terima kasih.`,

        mobile:
`Halo Investment Technology Indonesia,

Saya ingin membuat aplikasi Android / iOS.

Mohon informasi lebih lanjut.

Terima kasih.`,

        ai:
`Halo Investment Technology Indonesia,

Saya tertarik dengan layanan AI Chatbot dan Automation.

Mohon informasi detailnya.

Terima kasih.`,

        server:
`Halo Investment Technology Indonesia,

Saya membutuhkan layanan VPS / Cloud Server.

Mohon penawarannya.

Terima kasih.`,

        support:
`Halo Tim Support,

Saya membutuhkan bantuan teknis.

Mohon dibantu.

Terima kasih.`

    }

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeTemplates(){

    renderTemplateButtons();

    initializeTemplateEvents();

    TemplateEngine.initialized=true;

}

/* ===========================================================
   BUTTONS
=========================================================== */

function renderTemplateButtons(){

    const container=$(

        ".whatsapp-templates",

        WhatsApp.container

    );

    if(!container){

        return;

    }

    container.innerHTML="";

    Object.keys(

        TemplateEngine.templates

    ).forEach(key=>{

        const button=

            document.createElement("button");

        button.type="button";

        button.className=

            "whatsapp-template";

        button.dataset.template=key;

        button.textContent=

            key.charAt(0)

            .toUpperCase()

            +key.slice(1);

        container.appendChild(button);

    });

}

/* ===========================================================
   EVENTS
=========================================================== */

function initializeTemplateEvents(){

    $$(
        ".whatsapp-template",

        WhatsApp.container

    ).forEach(button=>{

        on(

            button,

            "click",

            ()=>{

                loadTemplate(

                    button.dataset.template

                );

            }

        );

    });

}

/* ===========================================================
   LOAD
=========================================================== */

function loadTemplate(name){

    const template=

        TemplateEngine.templates[name];

    if(!template){

        return;

    }

    TemplateEngine.active=name;

    if(WhatsApp.input){

        WhatsApp.input.value=

            template;

        WhatsApp.input.focus();

    }

    updateTemplateUI();

}

/* ===========================================================
   UI
=========================================================== */

function updateTemplateUI(){

    $$(
        ".whatsapp-template",

        WhatsApp.container

    ).forEach(button=>{

        removeClass(

            button,

            "active"

        );

        if(

            button.dataset.template===

            TemplateEngine.active

        ){

            addClass(

                button,

                "active"

            );

        }

    });

}

/* ===========================================================
   SEND
=========================================================== */

function sendActiveTemplate(){

    if(!WhatsApp.input){

        return;

    }

    const text=

        WhatsApp.input.value.trim();

    if(!text){

        return;

    }

    sendMessage(text);

}

/* ===========================================================
   ADD TEMPLATE
=========================================================== */

function addTemplate(

    name,

    message

){

    TemplateEngine.templates[name]=

        message;

    renderTemplateButtons();

    initializeTemplateEvents();

}

/* ===========================================================
   REMOVE
=========================================================== */

function removeTemplate(name){

    delete TemplateEngine.templates[name];

    renderTemplateButtons();

    initializeTemplateEvents();

}

/* ===========================================================
   UPDATE
=========================================================== */

function updateTemplate(

    name,

    message

){

    if(

        !TemplateEngine.templates[name]

    ){

        return;

    }

    TemplateEngine.templates[name]=

        message;

}

/* ===========================================================
   RESET
=========================================================== */

function clearTemplate(){

    TemplateEngine.active="general";

    if(WhatsApp.input){

        WhatsApp.input.value="";

    }

    updateTemplateUI();

}

/* ===========================================================
   GET
=========================================================== */

function getTemplate(name){

    return(

        TemplateEngine.templates[name]

        ||null

    );

}

/* ===========================================================
   EXPORT
=========================================================== */

function exportTemplates(){

    return{

        ...TemplateEngine.templates

    };

}

/* ===========================================================
   STATUS
=========================================================== */

function templateStatus(){

    return{

        initialized:

            TemplateEngine.initialized,

        active:

            TemplateEngine.active,

        total:

            Object.keys(

                TemplateEngine.templates

            ).length

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeTemplates();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.WhatsAppManager,

    {

        templates:{

            init:

                initializeTemplates,

            load:

                loadTemplate,

            send:

                sendActiveTemplate,

            get:

                getTemplate,

            add:

                addTemplate,

            update:

                updateTemplate,

            remove:

                removeTemplate,

            clear:

                clearTemplate,

            export:

                exportTemplates,

            status:

                templateStatus

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
 assets/js/whatsapp.js
 Part 6
 Form Integration • Contact • Quote • Consultation
===========================================================
*/

"use strict";

/* ===========================================================
   FORM ENGINE
=========================================================== */

const FormEngine={

    initialized:false,

    forms:[],

    autoClear:true

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeForms(){

    FormEngine.forms=$$(

        "form[data-whatsapp]",

        document

    );

    bindForms();

    FormEngine.initialized=true;

}

/* ===========================================================
   BIND
=========================================================== */

function bindForms(){

    FormEngine.forms.forEach(form=>{

        on(

            form,

            "submit",

            event=>{

                event.preventDefault();

                submitForm(form);

            }

        );

    });

}

/* ===========================================================
   SUBMIT
=========================================================== */

function submitForm(form){

    const data=getFormData(form);

    const message=

        buildMessage(data);

    if(

        data.department

    ){

        selectDepartment(

            data.department

        );

    }

    sendMessage(message);

    if(

        FormEngine.autoClear

    ){

        form.reset();

    }

}

/* ===========================================================
   GET DATA
=========================================================== */

function getFormData(form){

    const data={};

    new FormData(form)

    .forEach(

        (value,key)=>{

            data[key]=String(value).trim();

        }

    );

    return data;

}

/* ===========================================================
   BUILD MESSAGE
=========================================================== */

function buildMessage(data){

    let message=

`Halo Investment Technology Indonesia

`;

    Object.entries(data)

    .forEach(

        ([key,value])=>{

            if(value){

                message+=`\n${

                    capitalize(key)

                } : ${value}`;

            }

        }

    );

    message+=

`\n\nTerima kasih.`;

    return message;

}

/* ===========================================================
   CONTACT FORM
=========================================================== */

function sendContactForm(form){

    submitForm(form);

}

/* ===========================================================
   CONSULTATION
=========================================================== */

function sendConsultation(form){

    const data=

        getFormData(form);

    data.type=

        "Konsultasi";

    sendMessage(

        buildMessage(data)

    );

}

/* ===========================================================
   QUOTATION
=========================================================== */

function sendQuotation(form){

    const data=

        getFormData(form);

    data.type=

        "Permintaan Penawaran";

    sendMessage(

        buildMessage(data)

    );

}

/* ===========================================================
   SUPPORT
=========================================================== */

function sendSupportRequest(form){

    const data=

        getFormData(form);

    data.type=

        "Support";

    selectDepartment(

        "support"

    );

    sendMessage(

        buildMessage(data)

    );

}

/* ===========================================================
   CAPITALIZE
=========================================================== */

function capitalize(text){

    return text

        .charAt(0)

        .toUpperCase()

        +text.slice(1);

}

/* ===========================================================
   AUTO FILL
=========================================================== */

function fillForm(values={}){

    FormEngine.forms.forEach(form=>{

        Object.entries(values)

        .forEach(

            ([key,value])=>{

                const field=

                    form.elements[key];

                if(field){

                    field.value=value;

                }

            }

        );

    });

}

/* ===========================================================
   RESET
=========================================================== */

function resetForms(){

    FormEngine.forms

    .forEach(form=>{

        form.reset();

    });

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableAutoClear(){

    FormEngine.autoClear=true;

}

/* ===========================================================
   DISABLE
=========================================================== */

function disableAutoClear(){

    FormEngine.autoClear=false;

}

/* ===========================================================
   STATUS
=========================================================== */

function formStatus(){

    return{

        initialized:

            FormEngine.initialized,

        forms:

            FormEngine.forms.length,

        autoClear:

            FormEngine.autoClear

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeForms();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.WhatsAppManager,

    {

        forms:{

            init:

                initializeForms,

            submit:

                submitForm,

            contact:

                sendContactForm,

            consultation:

                sendConsultation,

            quotation:

                sendQuotation,

            support:

                sendSupportRequest,

            fill:

                fillForm,

            reset:

                resetForms,

            enable:

                enableAutoClear,

            disable:

                disableAutoClear,

            status:

                formStatus

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
 assets/js/whatsapp.js
 Part 7
 File Attachment • Share Support • Clipboard • QR Sharing
===========================================================
*/

"use strict";

/* ===========================================================
   SHARE ENGINE
=========================================================== */

const ShareEngine={

    initialized:false,

    attachments:[],

    maxFileSize:10*1024*1024,

    supported:

        "share" in navigator

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeShareEngine(){

    initializeFileInput();

    initializeShareButtons();

    initializeClipboard();

    ShareEngine.initialized=true;

}

/* ===========================================================
   FILE INPUT
=========================================================== */

function initializeFileInput(){

    const input=$(

        ".whatsapp-file",

        WhatsApp.container

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

            file.size>

            ShareEngine.maxFileSize

        ){

            whatsappLog(

                "File terlalu besar."

            );

            return;

        }

        ShareEngine.attachments.push(file);

        renderAttachment(file);

    });

}

/* ===========================================================
   ATTACHMENT
=========================================================== */

function renderAttachment(file){

    const container=$(

        ".whatsapp-attachments",

        WhatsApp.container

    );

    if(!container){

        return;

    }

    const item=

        document.createElement("div");

    item.className=

        "whatsapp-attachment";

    item.innerHTML=`

<div class="attachment-icon">

📎

</div>

<div class="attachment-info">

<div>${escapeHTML(file.name)}</div>

<small>${formatSize(file.size)}</small>

</div>

`;

    container.appendChild(item);

}

/* ===========================================================
   REMOVE
=========================================================== */

function removeAttachment(index){

    ShareEngine.attachments.splice(

        index,

        1

    );

    refreshAttachments();

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshAttachments(){

    const container=$(

        ".whatsapp-attachments",

        WhatsApp.container

    );

    if(!container){

        return;

    }

    container.innerHTML="";

    ShareEngine.attachments.forEach(file=>{

        renderAttachment(file);

    });

}

/* ===========================================================
   CLEAR
=========================================================== */

function clearAttachments(){

    ShareEngine.attachments=[];

    refreshAttachments();

}

/* ===========================================================
   FILE SIZE
=========================================================== */

function formatSize(size){

    if(size<1024){

        return `${size} B`;

    }

    if(size<1024*1024){

        return `${

            (size/1024)

            .toFixed(1)

        } KB`;

    }

    return `${

        (size/1024/1024)

        .toFixed(2)

    } MB`;

}

/* ===========================================================
   SHARE CURRENT PAGE
=========================================================== */

async function shareCurrentPage(){

    const data={

        title:document.title,

        text:document.title,

        url:window.location.href

    };

    if(

        ShareEngine.supported

    ){

        try{

            await navigator.share(data);

        }

        catch(error){

            whatsappLog(error);

        }

        return;

    }

    copyCurrentURL();

}

/* ===========================================================
   COPY URL
=========================================================== */

async function copyCurrentURL(){

    try{

        await navigator.clipboard.writeText(

            window.location.href

        );

        whatsappLog(

            "URL copied."

        );

    }

    catch(error){

        whatsappLog(error);

    }

}

/* ===========================================================
   COPY MESSAGE
=========================================================== */

async function copyMessage(){

    if(

        !WhatsApp.input

    ){

        return;

    }

    try{

        await navigator.clipboard.writeText(

            WhatsApp.input.value

        );

    }

    catch(error){

        whatsappLog(error);

    }

}

/* ===========================================================
   QR SHARE
=========================================================== */

function openQRCode(){

    const image=$(

        ".whatsapp-qr",

        WhatsApp.container

    );

    if(image){

        image.classList.toggle(

            "active"

        );

    }

}

/* ===========================================================
   CLIPBOARD
=========================================================== */

function initializeClipboard(){

    const button=$(

        ".whatsapp-copy",

        WhatsApp.container

    );

    if(button){

        on(

            button,

            "click",

            copyMessage

        );

    }

}

/* ===========================================================
   SHARE BUTTON
=========================================================== */

function initializeShareButtons(){

    $$(
        ".whatsapp-share",

        WhatsApp.container

    ).forEach(button=>{

        on(

            button,

            "click",

            shareCurrentPage

        );

    });

}

/* ===========================================================
   STATUS
=========================================================== */

function shareStatus(){

    return{

        initialized:

            ShareEngine.initialized,

        attachments:

            ShareEngine.attachments.length,

        supported:

            ShareEngine.supported

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeShareEngine();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.WhatsAppManager,

    {

        share:{

            init:

                initializeShareEngine,

            files:

                handleFiles,

            remove:

                removeAttachment,

            clear:

                clearAttachments,

            page:

                shareCurrentPage,

            copy:

                copyMessage,

            copyURL:

                copyCurrentURL,

            qr:

                openQRCode,

            status:

                shareStatus

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
 assets/js/whatsapp.js
 Part 8
 Analytics • Click Tracking • Statistics • Performance
===========================================================
*/

"use strict";

/* ===========================================================
   ANALYTICS ENGINE
=========================================================== */

const AnalyticsEngine={

    initialized:false,

    clicks:0,

    opens:0,

    messages:0,

    shares:0,

    attachments:0,

    startTime:Date.now(),

    sessionID:

        Date.now().toString(36)

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeAnalytics(){

    initializeTracking();

    loadAnalytics();

    AnalyticsEngine.initialized=true;

}

/* ===========================================================
   TRACKING
=========================================================== */

function initializeTracking(){

    if(WhatsApp.button){

        on(

            WhatsApp.button,

            "click",

            ()=>{

                trackOpen();

            }

        );

    }

    if(WhatsApp.send){

        on(

            WhatsApp.send,

            "click",

            ()=>{

                trackMessage();

            }

        );

    }

}

/* ===========================================================
   OPEN
=========================================================== */

function trackOpen(){

    AnalyticsEngine.opens++;

    AnalyticsEngine.clicks++;

    saveAnalytics();

}

/* ===========================================================
   MESSAGE
=========================================================== */

function trackMessage(){

    AnalyticsEngine.messages++;

    saveAnalytics();

}

/* ===========================================================
   SHARE
=========================================================== */

function trackShare(){

    AnalyticsEngine.shares++;

    saveAnalytics();

}

/* ===========================================================
   ATTACHMENT
=========================================================== */

function trackAttachment(){

    AnalyticsEngine.attachments++;

    saveAnalytics();

}

/* ===========================================================
   SAVE
=========================================================== */

function saveAnalytics(){

    try{

        localStorage.setItem(

            "wa-analytics",

            JSON.stringify(

                exportAnalytics()

            )

        );

    }

    catch(error){

        whatsappLog(error);

    }

}

/* ===========================================================
   LOAD
=========================================================== */

function loadAnalytics(){

    try{

        const data=

            localStorage.getItem(

                "wa-analytics"

            );

        if(!data){

            return;

        }

        const analytics=

            JSON.parse(data);

        Object.assign(

            AnalyticsEngine,

            analytics

        );

    }

    catch(error){

        whatsappLog(error);

    }

}

/* ===========================================================
   RESET
=========================================================== */

function resetAnalytics(){

    AnalyticsEngine.clicks=0;

    AnalyticsEngine.opens=0;

    AnalyticsEngine.messages=0;

    AnalyticsEngine.shares=0;

    AnalyticsEngine.attachments=0;

    AnalyticsEngine.startTime=

        Date.now();

    saveAnalytics();

}

/* ===========================================================
   SESSION
=========================================================== */

function sessionDuration(){

    return Math.floor(

        (Date.now()-

        AnalyticsEngine.startTime)

        /1000

    );

}

/* ===========================================================
   PERFORMANCE
=========================================================== */

function performanceInfo(){

    return{

        memory:

            performance.memory||

            null,

        navigation:

            performance.navigation||

            null,

        timing:

            performance.timing||

            null

    };

}

/* ===========================================================
   EXPORT
=========================================================== */

function exportAnalytics(){

    return{

        sessionID:

            AnalyticsEngine.sessionID,

        clicks:

            AnalyticsEngine.clicks,

        opens:

            AnalyticsEngine.opens,

        messages:

            AnalyticsEngine.messages,

        shares:

            AnalyticsEngine.shares,

        attachments:

            AnalyticsEngine.attachments,

        duration:

            sessionDuration()

    };

}

/* ===========================================================
   REPORT
=========================================================== */

function analyticsReport(){

    console.table(

        exportAnalytics()

    );

}

/* ===========================================================
   STATUS
=========================================================== */

function analyticsStatus(){

    return{

        initialized:

            AnalyticsEngine.initialized,

        clicks:

            AnalyticsEngine.clicks,

        opens:

            AnalyticsEngine.opens,

        messages:

            AnalyticsEngine.messages,

        shares:

            AnalyticsEngine.shares,

        attachments:

            AnalyticsEngine.attachments,

        duration:

            sessionDuration()

    };

}

/* ===========================================================
   AUTO SAVE
=========================================================== */

window.addEventListener(

    "beforeunload",

    ()=>{

        saveAnalytics();

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeAnalytics();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.WhatsAppManager,

    {

        analytics:{

            init:

                initializeAnalytics,

            open:

                trackOpen,

            message:

                trackMessage,

            share:

                trackShare,

            attachment:

                trackAttachment,

            reset:

                resetAnalytics,

            export:

                exportAnalytics,

            report:

                analyticsReport,

            performance:

                performanceInfo,

            status:

                analyticsStatus

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
 assets/js/whatsapp.js
 Part 9
 Local Storage • Recent Contacts • Session Manager
===========================================================
*/

"use strict";

/* ===========================================================
   STORAGE ENGINE
=========================================================== */

const StorageEngine={

    initialized:false,

    historyKey:"iti-whatsapp-history",

    recentKey:"iti-whatsapp-recent",

    sessionKey:"iti-whatsapp-session",

    settingsKey:"iti-whatsapp-settings"

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeStorage(){

    loadHistory();

    loadRecentContacts();

    loadSession();

    loadSettings();

    StorageEngine.initialized=true;

}

/* ===========================================================
   HISTORY
=========================================================== */

function saveHistory(){

    try{

        localStorage.setItem(

            StorageEngine.historyKey,

            JSON.stringify(

                WhatsAppState.history

            )

        );

    }

    catch(error){

        whatsappLog(error);

    }

}

function loadHistory(){

    try{

        const data=

            localStorage.getItem(

                StorageEngine.historyKey

            );

        if(!data){

            return;

        }

        WhatsAppState.history=

            JSON.parse(data)||[];

    }

    catch(error){

        whatsappLog(error);

    }

}

function clearHistory(){

    WhatsAppState.history=[];

    localStorage.removeItem(

        StorageEngine.historyKey

    );

}

/* ===========================================================
   RECENT CONTACTS
=========================================================== */

function saveRecentContact(number){

    let contacts=getRecentContacts();

    contacts=contacts.filter(

        item=>item!==number

    );

    contacts.unshift(number);

    contacts=contacts.slice(0,10);

    localStorage.setItem(

        StorageEngine.recentKey,

        JSON.stringify(contacts)

    );

}

function getRecentContacts(){

    try{

        return JSON.parse(

            localStorage.getItem(

                StorageEngine.recentKey

            )

        )||[];

    }

    catch{

        return[];

    }

}

function loadRecentContacts(){

    WhatsAppState.recent=

        getRecentContacts();

}

/* ===========================================================
   SESSION
=========================================================== */

function saveSession(){

    const session={

        opened:

            WhatsAppState.opened,

        department:

            WhatsAppState.selectedDepartment,

        number:

            WhatsAppState.selectedNumber,

        timestamp:

            Date.now()

    };

    localStorage.setItem(

        StorageEngine.sessionKey,

        JSON.stringify(session)

    );

}

function loadSession(){

    try{

        const session=

            JSON.parse(

                localStorage.getItem(

                    StorageEngine.sessionKey

                )

            );

        if(!session){

            return;

        }

        WhatsAppState.opened=

            session.opened;

        WhatsAppState.selectedDepartment=

            session.department;

        WhatsAppState.selectedNumber=

            session.number;

    }

    catch(error){

        whatsappLog(error);

    }

}

/* ===========================================================
   SETTINGS
=========================================================== */

function saveSettings(){

    const settings={

        autoOpen:

            WHATSAPP_CONFIG.autoOpen,

        animation:

            WHATSAPP_CONFIG.animationDuration,

        defaultDepartment:

            WHATSAPP_CONFIG.defaultDepartment

    };

    localStorage.setItem(

        StorageEngine.settingsKey,

        JSON.stringify(settings)

    );

}

function loadSettings(){

    try{

        const settings=

            JSON.parse(

                localStorage.getItem(

                    StorageEngine.settingsKey

                )

            );

        if(!settings){

            return;

        }

        WHATSAPP_CONFIG.autoOpen=

            settings.autoOpen;

        WHATSAPP_CONFIG.animationDuration=

            settings.animation;

        WHATSAPP_CONFIG.defaultDepartment=

            settings.defaultDepartment;

    }

    catch(error){

        whatsappLog(error);

    }

}

/* ===========================================================
   EXPORT
=========================================================== */

function exportStorage(){

    return{

        history:

            WhatsAppState.history,

        recent:

            getRecentContacts(),

        session:

            WhatsAppState.selectedDepartment,

        settings:{

            autoOpen:

                WHATSAPP_CONFIG.autoOpen,

            animation:

                WHATSAPP_CONFIG.animationDuration

        }

    };

}

/* ===========================================================
   IMPORT
=========================================================== */

function importStorage(data){

    if(!data){

        return;

    }

    if(data.history){

        WhatsAppState.history=data.history;

        saveHistory();

    }

    if(data.recent){

        localStorage.setItem(

            StorageEngine.recentKey,

            JSON.stringify(data.recent)

        );

    }

}

/* ===========================================================
   RESET
=========================================================== */

function resetStorage(){

    localStorage.removeItem(

        StorageEngine.historyKey

    );

    localStorage.removeItem(

        StorageEngine.recentKey

    );

    localStorage.removeItem(

        StorageEngine.sessionKey

    );

    localStorage.removeItem(

        StorageEngine.settingsKey

    );

}

/* ===========================================================
   STATUS
=========================================================== */

function storageStatus(){

    return{

        initialized:

            StorageEngine.initialized,

        history:

            WhatsAppState.history.length,

        recent:

            getRecentContacts().length,

        department:

            WhatsAppState.selectedDepartment

    };

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
   DOM READY
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

    window.WhatsAppManager,

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

            saveRecent:

                saveRecentContact,

            recent:

                getRecentContacts,

            export:

                exportStorage,

            import:

                importStorage,

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
 assets/js/whatsapp.js
 Part 10
 Responsive • Animation • Performance Optimization
===========================================================
*/

"use strict";

/* ===========================================================
   PERFORMANCE ENGINE
=========================================================== */

const PerformanceEngine={

    initialized:false,

    animationEnabled:true,

    lazyLoad:true,

    mobile:false,

    fps:60,

    observer:null

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializePerformance(){

    initializeResponsive();

    initializeAnimation();

    initializeLazyLoad();

    monitorPerformance();

    PerformanceEngine.initialized=true;

}

/* ===========================================================
   RESPONSIVE
=========================================================== */

function initializeResponsive(){

    updateResponsive();

    window.addEventListener(

        "resize",

        debounce(

            updateResponsive,

            150

        ),

        {

            passive:true

        }

    );

}

function updateResponsive(){

    PerformanceEngine.mobile=

        window.innerWidth<768;

    if(

        !WhatsApp.popup

    ){

        return;

    }

    if(

        PerformanceEngine.mobile

    ){

        addClass(

            WhatsApp.popup,

            "whatsapp-mobile"

        );

    }else{

        removeClass(

            WhatsApp.popup,

            "whatsapp-mobile"

        );

    }

}

/* ===========================================================
   ANIMATION
=========================================================== */

function initializeAnimation(){

    if(

        !WhatsApp.popup

    ){

        return;

    }

    WhatsApp.popup.style.transition=

        `all ${

            WHATSAPP_CONFIG.animationDuration

        }ms ease`;

}

function enableAnimation(){

    PerformanceEngine.animationEnabled=true;

    initializeAnimation();

}

function disableAnimation(){

    PerformanceEngine.animationEnabled=false;

    if(WhatsApp.popup){

        WhatsApp.popup.style.transition="none";

    }

}

/* ===========================================================
   LAZY LOAD
=========================================================== */

function initializeLazyLoad(){

    if(

        !("IntersectionObserver" in window)

    ){

        return;

    }

    PerformanceEngine.observer=

        new IntersectionObserver(

            entries=>{

                entries.forEach(entry=>{

                    if(

                        entry.isIntersecting

                    ){

                        addClass(

                            entry.target,

                            "loaded"

                        );

                    }

                });

            },

            {

                threshold:0.1

            }

        );

    $$(
        ".lazy-whatsapp"
    ).forEach(item=>{

        PerformanceEngine.observer.observe(item);

    });

}

/* ===========================================================
   PERFORMANCE
=========================================================== */

function optimizeDOM(){

    if(

        !WhatsApp.popup

    ){

        return;

    }

    WhatsApp.popup.style.willChange=

        "transform, opacity";

}

function cleanupDOM(){

    if(

        !WhatsApp.popup

    ){

        return;

    }

    WhatsApp.popup.style.willChange=

        "auto";

}

/* ===========================================================
   FPS
=========================================================== */

function monitorPerformance(){

    let last=

        performance.now();

    let frames=0;

    function loop(now){

        frames++;

        if(

            now-last>=1000

        ){

            PerformanceEngine.fps=

                frames;

            frames=0;

            last=now;

        }

        requestAnimationFrame(loop);

    }

    requestAnimationFrame(loop);

}

/* ===========================================================
   MEMORY
=========================================================== */

function memoryUsage(){

    if(

        performance.memory

    ){

        return{

            used:

                performance.memory.usedJSHeapSize,

            total:

                performance.memory.totalJSHeapSize,

            limit:

                performance.memory.jsHeapSizeLimit

        };

    }

    return null;

}

/* ===========================================================
   VISIBILITY
=========================================================== */

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(

            document.hidden

        ){

            cleanupDOM();

        }else{

            optimizeDOM();

        }

    }

);

/* ===========================================================
   REFRESH
=========================================================== */

function refreshPerformance(){

    updateResponsive();

    optimizeDOM();

}

/* ===========================================================
   STATUS
=========================================================== */

function performanceStatus(){

    return{

        initialized:

            PerformanceEngine.initialized,

        mobile:

            PerformanceEngine.mobile,

        animation:

            PerformanceEngine.animationEnabled,

        fps:

            PerformanceEngine.fps,

        lazyLoad:

            PerformanceEngine.lazyLoad,

        memory:

            memoryUsage()

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializePerformance();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.WhatsAppManager,

    {

        performance:{

            init:

                initializePerformance,

            refresh:

                refreshPerformance,

            optimize:

                optimizeDOM,

            cleanup:

                cleanupDOM,

            enableAnimation,

            disableAnimation,

            memory:

                memoryUsage,

            status:

                performanceStatus

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
 assets/js/whatsapp.js
 Part 11
 Utilities • Debug • Report • Public API
===========================================================
*/

"use strict";

/* ===========================================================
   INFORMATION
=========================================================== */

const WhatsAppInfo={

    name:"WhatsApp Manager",

    version:"1.0.0",

    author:"Investment Technology Indonesia",

    environment:"production"

};

/* ===========================================================
   DEBUG
=========================================================== */

function enableDebug(){

    WhatsAppApp.debug=true;

    whatsappLog(

        "Debug Enabled"

    );

}

function disableDebug(){

    WhatsAppApp.debug=false;

}

function debug(...args){

    if(!WhatsAppApp.debug){

        return;

    }

    console.log(

        "[WhatsApp Debug]",

        ...args

    );

}

function warn(message){

    console.warn(

        "[WhatsApp Warning]",

        message

    );

}

function error(message){

    console.error(

        "[WhatsApp Error]",

        message

    );

}

/* ===========================================================
   UTILITIES
=========================================================== */

function uniqueID(){

    if(window.crypto?.randomUUID){

        return crypto.randomUUID();

    }

    return "wa-"+

        Date.now()+"-"+

        Math.random()

        .toString(36)

        .substring(2,10);

}

function wait(milliseconds=300){

    return new Promise(resolve=>{

        setTimeout(

            resolve,

            milliseconds

        );

    });

}

function clamp(value,min,max){

    return Math.min(

        Math.max(value,min),

        max

    );

}

function formatBytes(bytes){

    if(bytes<1024){

        return `${bytes} B`;

    }

    if(bytes<1024*1024){

        return `${

            (bytes/1024)

            .toFixed(1)

        } KB`;

    }

    return `${

        (bytes/1024/1024)

        .toFixed(2)

    } MB`;

}

function timestamp(){

    return new Date()

        .toLocaleString(

            "id-ID"

        );

}

/* ===========================================================
   REPORT
=========================================================== */

function generateReport(){

    return{

        info:

            WhatsAppInfo,

        app:

            WhatsAppApp,

        config:

            WHATSAPP_CONFIG,

        state:

            WhatsAppState,

        contacts:

            contactStatus?.(),

        messages:

            messageStatus?.(),

        templates:

            templateStatus?.(),

        forms:

            formStatus?.(),

        share:

            shareStatus?.(),

        analytics:

            analyticsStatus?.(),

        storage:

            storageStatus?.(),

        performance:

            performanceStatus?.(),

        timestamp:

            timestamp()

    };

}

function printReport(){

    console.table(

        generateReport()

    );

}

/* ===========================================================
   RESET
=========================================================== */

function resetManager(){

    clearHistory?.();

    clearAttachments?.();

    resetAnalytics?.();

    resetStorage?.();

    resetContacts?.();

    clearTemplate?.();

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroyManager(){

    destroyWhatsApp?.();

    PerformanceEngine

        ?.observer

        ?.disconnect();

    whatsappLog(

        "WhatsApp Manager Destroyed"

    );

}

/* ===========================================================
   RESTART
=========================================================== */

function restartManager(){

    destroyManager();

    initializeWhatsApp?.();

    initializeWindow?.();

    initializeMessageEngine?.();

    initializeContacts?.();

    initializeTemplates?.();

    initializeForms?.();

    initializeShareEngine?.();

    initializeAnalytics?.();

    initializeStorage?.();

    initializePerformance?.();

}

/* ===========================================================
   READY
=========================================================== */

function ready(){

    return{

        initialized:

            WhatsAppApp.initialized,

        opened:

            WhatsAppState.opened,

        department:

            WhatsAppState.selectedDepartment,

        number:

            WhatsAppState.selectedNumber,

        messages:

            WhatsAppState.totalSent

    };

}

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.WhatsAppManager,

    {

        info:

            WhatsAppInfo,

        ready,

        report:

            generateReport,

        printReport,

        reset:

            resetManager,

        restart:

            restartManager,

        destroy:

            destroyManager,

        enableDebug,

        disableDebug,

        debug,

        warn,

        error,

        wait,

        clamp,

        uniqueID,

        formatBytes,

        timestamp

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        debug(

            "WhatsApp Utilities Ready"

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
 assets/js/whatsapp.js
 Part 12
 Final Initialization • Cleanup • Export • End of File
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION INITIALIZER
=========================================================== */

function initializeWhatsAppManager(){

    if(WhatsAppApp.initialized){

        whatsappLog(

            "WhatsApp Manager already initialized."

        );

        return;

    }

    whatsappLog(

        "Initializing WhatsApp Manager..."

    );

    initializeWhatsApp?.();

    initializeWindow?.();

    initializeMessageEngine?.();

    initializeContacts?.();

    initializeTemplates?.();

    initializeForms?.();

    initializeShareEngine?.();

    initializeAnalytics?.();

    initializeStorage?.();

    initializePerformance?.();

    WhatsAppApp.initialized=true;

    whatsappLog(

        "WhatsApp Manager Ready."

    );

}

/* ===========================================================
   GLOBAL EVENTS
=========================================================== */

window.addEventListener(

    "load",

    ()=>{

        refreshWhatsApp?.();

        refreshPerformance?.();

        whatsappLog(

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

        refreshPerformance?.();

    }

);

window.addEventListener(

    "blur",

    ()=>{

        saveHistory?.();

        saveSession?.();

        saveSettings?.();

    }

);

/* ===========================================================
   ERROR HANDLER
=========================================================== */

window.addEventListener(

    "error",

    event=>{

        error?.(

            event.message

        );

    }

);

window.addEventListener(

    "unhandledrejection",

    event=>{

        error?.(

            String(event.reason)

        );

    }

);

/* ===========================================================
   CLEANUP
=========================================================== */

function cleanupWhatsAppManager(){

    saveHistory?.();

    saveSession?.();

    saveSettings?.();

    cleanupDOM?.();

    PerformanceEngine

        ?.observer

        ?.disconnect();

    whatsappLog(

        "WhatsApp Cleanup Complete"

    );

}

/* ===========================================================
   BEFORE UNLOAD
=========================================================== */

window.addEventListener(

    "beforeunload",

    ()=>{

        cleanupWhatsAppManager();

    }

);

/* ===========================================================
   FREEZE CONFIG
=========================================================== */

Object.freeze(

    WHATSAPP_CONFIG

);

Object.freeze(

    WhatsAppInfo

);

/* ===========================================================
   EXPORT
=========================================================== */

window.WhatsAppManager=

Object.assign(

    window.WhatsAppManager||{},

    {

        initialize:

            initializeWhatsAppManager,

        cleanup:

            cleanupWhatsAppManager,

        version:

            ()=>WhatsAppInfo.version,

        app:

            WhatsAppApp,

        config:

            WHATSAPP_CONFIG,

        state:

            WhatsAppState,

        info:

            WhatsAppInfo,

        report:

            generateReport,

        ready

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeWhatsAppManager();

    }

);

/* ===========================================================
   FINAL LOG
=========================================================== */

whatsappLog(

"========================================"

);

whatsappLog(

"Investment Technology Indonesia"

);

whatsappLog(

"WhatsApp Manager"

);

whatsappLog(

"Version:",

WhatsAppInfo.version

);

whatsappLog(

"Environment:",

WhatsAppInfo.environment

);

whatsappLog(

"========================================"

);

/* ===========================================================
   FEATURES
=========================================================== */

/*
✔ Floating WhatsApp Button
✔ Popup Window
✔ Open / Close
✔ Responsive Layout
✔ Department Routing
✔ Multiple Contact Numbers
✔ Message Engine
✔ Queue System
✔ Character Counter
✔ Quick Templates
✔ Contact Form Integration
✔ Consultation Form
✔ Quotation Form
✔ Support Form
✔ Clipboard Support
✔ Share Current Page
✔ QR Code Toggle
✔ File Attachment
✔ Recent Contacts
✔ Local Storage
✔ Session Manager
✔ Analytics
✔ Statistics
✔ Performance Optimization
✔ Lazy Loading
✔ Animation Engine
✔ Debug Utilities
✔ Report Generator
✔ Public API
✔ ES6+ Modern JavaScript
✔ Optimized
*/

/* ===========================================================
   END OF FILE
   assets/js/whatsapp.js
===========================================================
*/
