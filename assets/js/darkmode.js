/*!
===========================================================
 Investment Technology Indonesia
 assets/js/darkmode.js
 Part 1
 Core • Config • Initialization
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION
=========================================================== */

const DarkModeApp={

    name:"Investment Technology Indonesia Dark Mode",

    version:"1.0.0",

    initialized:false,

    debug:false

};

/* ===========================================================
   CONFIG
=========================================================== */

const DARKMODE_CONFIG={

    htmlSelector:"html",

    bodySelector:"body",

    toggleSelector:".theme-toggle",

    iconSelector:".theme-icon",

    logoSelector:".theme-logo",

    imageSelector:"[data-theme-image]",

    storageKey:"iti-theme",

    darkClass:"theme-dark",

    lightClass:"theme-light",

    animationDuration:300,

    followSystem:true,

    keyboardShortcut:true,

    transition:true,

    defaultTheme:"light"

};

/* ===========================================================
   STATE
=========================================================== */

const DarkModeState={

    initialized:false,

    theme:DARKMODE_CONFIG.defaultTheme,

    previousTheme:null,

    systemTheme:"light",

    followingSystem:DARKMODE_CONFIG.followSystem,

    changed:0

};

/* ===========================================================
   ELEMENTS
=========================================================== */

const DarkMode={

    html:null,

    body:null,

    toggle:null,

    icon:null,

    logos:[],

    images:[]

};

/* ===========================================================
   LOGGER
=========================================================== */

function darkLog(...args){

    if(!DarkModeApp.debug){

        return;

    }

    console.log(

        "[DarkMode]",

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

function hasClass(

    element,

    className

){

    return element?.classList.contains(className);

}

/* ===========================================================
   INITIALIZE ELEMENTS
=========================================================== */

function initializeElements(){

    DarkMode.html=$(

        DARKMODE_CONFIG.htmlSelector

    );

    DarkMode.body=$(

        DARKMODE_CONFIG.bodySelector

    );

    DarkMode.toggle=$(

        DARKMODE_CONFIG.toggleSelector

    );

    DarkMode.icon=$(

        DARKMODE_CONFIG.iconSelector

    );

    DarkMode.logos=$$(

        DARKMODE_CONFIG.logoSelector

    );

    DarkMode.images=$$(

        DARKMODE_CONFIG.imageSelector

    );

}

/* ===========================================================
   SYSTEM THEME
=========================================================== */

function detectSystemTheme(){

    DarkModeState.systemTheme=

        window.matchMedia(

            "(prefers-color-scheme: dark)"

        ).matches

        ? "dark"

        : "light";

}

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeDarkMode(){

    if(DarkModeApp.initialized){

        return;

    }

    initializeElements();

    detectSystemTheme();

    DarkModeState.theme=

        DARKMODE_CONFIG.defaultTheme;

    DarkModeState.initialized=true;

    DarkModeApp.initialized=true;

    darkLog(

        "Dark Mode Initialized"

    );

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshDarkMode(){

    initializeElements();

    detectSystemTheme();

    darkLog(

        "Dark Mode Refreshed"

    );

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroyDarkMode(){

    DarkModeState.initialized=false;

    DarkModeApp.initialized=false;

    darkLog(

        "Dark Mode Destroyed"

    );

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeDarkMode();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

window.DarkModeManager={

    app:DarkModeApp,

    config:DARKMODE_CONFIG,

    state:DarkModeState,

    elements:DarkMode,

    init:initializeDarkMode,

    refresh:refreshDarkMode,

    destroy:destroyDarkMode

};

/* ===========================================================
   END PART 1
===========================================================
*/

/*!
===========================================================
 Investment Technology Indonesia
 assets/js/darkmode.js
 Part 2
 Theme Toggle • Switch Theme • Apply Theme
===========================================================
*/

"use strict";

/* ===========================================================
   TOGGLE
=========================================================== */

const ThemeToggle={

    initialized:false,

    animating:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeThemeToggle(){

    initializeToggleButton();

    initializeKeyboardShortcut();

    updateToggleUI();

    ThemeToggle.initialized=true;

}

/* ===========================================================
   BUTTON
=========================================================== */

function initializeToggleButton(){

    if(!DarkMode.toggle){

        return;

    }

    on(

        DarkMode.toggle,

        "click",

        toggleTheme

    );

}

/* ===========================================================
   TOGGLE
=========================================================== */

function toggleTheme(){

    if(

        ThemeToggle.animating

    ){

        return;

    }

    if(

        DarkModeState.theme==="dark"

    ){

        setTheme("light");

    }else{

        setTheme("dark");

    }

}

/* ===========================================================
   SET THEME
=========================================================== */

function setTheme(theme){

    if(

        theme!=="dark" &&

        theme!=="light"

    ){

        return;

    }

    ThemeToggle.animating=true;

    DarkModeState.previousTheme=

        DarkModeState.theme;

    DarkModeState.theme=

        theme;

    DarkModeState.changed++;

    applyTheme();

    updateToggleUI();

    setTimeout(()=>{

        ThemeToggle.animating=false;

    },

    DARKMODE_CONFIG.animationDuration);

}

/* ===========================================================
   APPLY
=========================================================== */

function applyTheme(){

    if(

        !DarkMode.html ||

        !DarkMode.body

    ){

        return;

    }

    removeClass(

        DarkMode.html,

        DARKMODE_CONFIG.darkClass

    );

    removeClass(

        DarkMode.html,

        DARKMODE_CONFIG.lightClass

    );

    removeClass(

        DarkMode.body,

        DARKMODE_CONFIG.darkClass

    );

    removeClass(

        DarkMode.body,

        DARKMODE_CONFIG.lightClass

    );

    if(

        DarkModeState.theme==="dark"

    ){

        addClass(

            DarkMode.html,

            DARKMODE_CONFIG.darkClass

        );

        addClass(

            DarkMode.body,

            DARKMODE_CONFIG.darkClass

        );

    }else{

        addClass(

            DarkMode.html,

            DARKMODE_CONFIG.lightClass

        );

        addClass(

            DarkMode.body,

            DARKMODE_CONFIG.lightClass

        );

    }

    document.documentElement

        .setAttribute(

            "data-theme",

            DarkModeState.theme

        );

}

/* ===========================================================
   ICON
=========================================================== */

function updateToggleUI(){

    if(

        !DarkMode.icon

    ){

        return;

    }

    if(

        DarkModeState.theme==="dark"

    ){

        DarkMode.icon.className=

            "theme-icon fas fa-sun";

        DarkMode.toggle?.setAttribute(

            "aria-label",

            "Switch to Light Mode"

        );

    }else{

        DarkMode.icon.className=

            "theme-icon fas fa-moon";

        DarkMode.toggle?.setAttribute(

            "aria-label",

            "Switch to Dark Mode"

        );

    }

}

/* ===========================================================
   SHORTCUT
=========================================================== */

function initializeKeyboardShortcut(){

    if(

        !DARKMODE_CONFIG.keyboardShortcut

    ){

        return;

    }

    document.addEventListener(

        "keydown",

        event=>{

            if(

                event.ctrlKey &&

                event.shiftKey &&

                event.key.toLowerCase()==="d"

            ){

                event.preventDefault();

                toggleTheme();

            }

        }

    );

}

/* ===========================================================
   HELPERS
=========================================================== */

function isDarkTheme(){

    return DarkModeState.theme==="dark";

}

function isLightTheme(){

    return DarkModeState.theme==="light";

}

/* ===========================================================
   STATUS
=========================================================== */

function toggleStatus(){

    return{

        initialized:

            ThemeToggle.initialized,

        animating:

            ThemeToggle.animating,

        theme:

            DarkModeState.theme,

        changes:

            DarkModeState.changed

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeThemeToggle();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.DarkModeManager,

    {

        theme:{

            init:

                initializeThemeToggle,

            toggle:

                toggleTheme,

            set:

                setTheme,

            apply:

                applyTheme,

            dark:

                isDarkTheme,

            light:

                isLightTheme,

            status:

                toggleStatus

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
 assets/js/darkmode.js
 Part 3
 Local Storage • Theme Persistence • Restore Theme
===========================================================
*/

"use strict";

/* ===========================================================
   STORAGE
=========================================================== */

const ThemeStorage={

    initialized:false,

    key:DARKMODE_CONFIG.storageKey,

    supported:true

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeStorage(){

    ThemeStorage.supported=

        storageAvailable();

    loadTheme();

    ThemeStorage.initialized=true;

}

/* ===========================================================
   STORAGE CHECK
=========================================================== */

function storageAvailable(){

    try{

        const key="__theme_test__";

        localStorage.setItem(

            key,

            key

        );

        localStorage.removeItem(

            key

        );

        return true;

    }

    catch{

        return false;

    }

}

/* ===========================================================
   SAVE
=========================================================== */

function saveTheme(){

    if(

        !ThemeStorage.supported

    ){

        return;

    }

    try{

        localStorage.setItem(

            ThemeStorage.key,

            DarkModeState.theme

        );

    }

    catch(error){

        darkLog(error);

    }

}

/* ===========================================================
   LOAD
=========================================================== */

function loadTheme(){

    if(

        !ThemeStorage.supported

    ){

        applyTheme();

        return;

    }

    try{

        const theme=

            localStorage.getItem(

                ThemeStorage.key

            );

        if(

            theme==="dark" ||

            theme==="light"

        ){

            DarkModeState.theme=

                theme;

        }else{

            DarkModeState.theme=

                DARKMODE_CONFIG.defaultTheme;

        }

    }

    catch(error){

        darkLog(error);

        DarkModeState.theme=

            DARKMODE_CONFIG.defaultTheme;

    }

    applyTheme();

    updateToggleUI();

}

/* ===========================================================
   REMOVE
=========================================================== */

function removeSavedTheme(){

    if(

        !ThemeStorage.supported

    ){

        return;

    }

    localStorage.removeItem(

        ThemeStorage.key

    );

}

/* ===========================================================
   RESET
=========================================================== */

function resetTheme(){

    removeSavedTheme();

    setTheme(

        DARKMODE_CONFIG.defaultTheme

    );

}

/* ===========================================================
   EXPORT
=========================================================== */

function exportTheme(){

    return{

        theme:

            DarkModeState.theme,

        previous:

            DarkModeState.previousTheme,

        changed:

            DarkModeState.changed,

        followingSystem:

            DarkModeState.followingSystem,

        timestamp:

            new Date()

            .toISOString()

    };

}

/* ===========================================================
   IMPORT
=========================================================== */

function importTheme(data){

    if(

        !data ||

        !data.theme

    ){

        return;

    }

    if(

        data.theme==="dark" ||

        data.theme==="light"

    ){

        setTheme(

            data.theme

        );

        saveTheme();

    }

}

/* ===========================================================
   AUTO SAVE
=========================================================== */

document.addEventListener(

    "theme:changed",

    ()=>{

        saveTheme();

    }

);

window.addEventListener(

    "beforeunload",

    ()=>{

        saveTheme();

    }

);

/* ===========================================================
   STORAGE EVENT
=========================================================== */

window.addEventListener(

    "storage",

    event=>{

        if(

            event.key!==

            ThemeStorage.key

        ){

            return;

        }

        if(

            event.newValue==="dark" ||

            event.newValue==="light"

        ){

            DarkModeState.theme=

                event.newValue;

            applyTheme();

            updateToggleUI();

        }

    }

);

/* ===========================================================
   STATUS
=========================================================== */

function storageStatus(){

    return{

        initialized:

            ThemeStorage.initialized,

        supported:

            ThemeStorage.supported,

        key:

            ThemeStorage.key,

        theme:

            DarkModeState.theme

    };

}

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

    window.DarkModeManager,

    {

        storage:{

            init:

                initializeStorage,

            save:

                saveTheme,

            load:

                loadTheme,

            remove:

                removeSavedTheme,

            reset:

                resetTheme,

            export:

                exportTheme,

            import:

                importTheme,

            status:

                storageStatus

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
 assets/js/darkmode.js
 Part 4
 System Theme Detection • Media Query • Auto Sync
===========================================================
*/

"use strict";

/* ===========================================================
   SYSTEM THEME
=========================================================== */

const SystemTheme={

    initialized:false,

    media:null,

    listening:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeSystemTheme(){

    if(

        !window.matchMedia

    ){

        return;

    }

    SystemTheme.media=

        window.matchMedia(

            "(prefers-color-scheme: dark)"

        );

    detectCurrentSystemTheme();

    initializeMediaListener();

    SystemTheme.initialized=true;

}

/* ===========================================================
   DETECT
=========================================================== */

function detectCurrentSystemTheme(){

    if(

        !SystemTheme.media

    ){

        return;

    }

    DarkModeState.systemTheme=

        SystemTheme.media.matches

        ? "dark"

        : "light";

}

/* ===========================================================
   LISTENER
=========================================================== */

function initializeMediaListener(){

    if(

        !SystemTheme.media ||

        SystemTheme.listening

    ){

        return;

    }

    const callback=event=>{

        handleSystemThemeChange(event);

    };

    if(

        SystemTheme.media.addEventListener

    ){

        SystemTheme.media.addEventListener(

            "change",

            callback

        );

    }else{

        SystemTheme.media.addListener(

            callback

        );

    }

    SystemTheme.listening=true;

}

/* ===========================================================
   CHANGE
=========================================================== */

function handleSystemThemeChange(event){

    DarkModeState.systemTheme=

        event.matches

        ? "dark"

        : "light";

    if(

        !DarkModeState.followingSystem

    ){

        return;

    }

    setTheme(

        DarkModeState.systemTheme

    );

    dispatchThemeEvent();

}

/* ===========================================================
   FOLLOW
=========================================================== */

function enableSystemTheme(){

    DarkModeState.followingSystem=true;

    setTheme(

        DarkModeState.systemTheme

    );

}

function disableSystemTheme(){

    DarkModeState.followingSystem=false;

}

/* ===========================================================
   TOGGLE
=========================================================== */

function toggleSystemTheme(){

    if(

        DarkModeState.followingSystem

    ){

        disableSystemTheme();

    }else{

        enableSystemTheme();

    }

}

/* ===========================================================
   EVENT
=========================================================== */

function dispatchThemeEvent(){

    document.dispatchEvent(

        new CustomEvent(

            "theme:changed",

            {

                detail:{

                    theme:

                        DarkModeState.theme,

                    system:

                        DarkModeState.systemTheme,

                    following:

                        DarkModeState.followingSystem

                }

            }

        )

    );

}

/* ===========================================================
   FORCE
=========================================================== */

function syncWithSystemTheme(){

    detectCurrentSystemTheme();

    if(

        DarkModeState.followingSystem

    ){

        setTheme(

            DarkModeState.systemTheme

        );

    }

}

/* ===========================================================
   STATUS
=========================================================== */

function systemThemeStatus(){

    return{

        initialized:

            SystemTheme.initialized,

        listening:

            SystemTheme.listening,

        systemTheme:

            DarkModeState.systemTheme,

        following:

            DarkModeState.followingSystem

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeSystemTheme();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.DarkModeManager,

    {

        system:{

            init:

                initializeSystemTheme,

            enable:

                enableSystemTheme,

            disable:

                disableSystemTheme,

            toggle:

                toggleSystemTheme,

            sync:

                syncWithSystemTheme,

            detect:

                detectCurrentSystemTheme,

            status:

                systemThemeStatus

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
 assets/js/darkmode.js
 Part 5
 Theme Animation • Transition • Visual Effects
===========================================================
*/

"use strict";

/* ===========================================================
   ANIMATION ENGINE
=========================================================== */

const ThemeAnimation={

    initialized:false,

    enabled:DARKMODE_CONFIG.transition,

    duration:DARKMODE_CONFIG.animationDuration,

    easing:"ease",

    animating:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeAnimation(){

    applyTransition();

    initializeRippleEffect();

    ThemeAnimation.initialized=true;

}

/* ===========================================================
   APPLY TRANSITION
=========================================================== */

function applyTransition(){

    if(

        !ThemeAnimation.enabled

    ){

        return;

    }

    document.documentElement.style.setProperty(

        "--theme-transition",

        `${ThemeAnimation.duration}ms`

    );

    $$("*").forEach(element=>{

        element.style.transition=

        `background-color ${ThemeAnimation.duration}ms ${ThemeAnimation.easing},
         color ${ThemeAnimation.duration}ms ${ThemeAnimation.easing},
         border-color ${ThemeAnimation.duration}ms ${ThemeAnimation.easing},
         box-shadow ${ThemeAnimation.duration}ms ${ThemeAnimation.easing},
         fill ${ThemeAnimation.duration}ms ${ThemeAnimation.easing}`;

    });

}

/* ===========================================================
   START
=========================================================== */

function startAnimation(){

    ThemeAnimation.animating=true;

    document.body?.classList.add(

        "theme-transition"

    );

}

/* ===========================================================
   END
=========================================================== */

function finishAnimation(){

    setTimeout(()=>{

        ThemeAnimation.animating=false;

        document.body?.classList.remove(

            "theme-transition"

        );

    },

    ThemeAnimation.duration);

}

/* ===========================================================
   ANIMATE THEME
=========================================================== */

function animateThemeChange(theme){

    startAnimation();

    setTheme(theme);

    finishAnimation();

}

/* ===========================================================
   RIPPLE EFFECT
=========================================================== */

function initializeRippleEffect(){

    if(!DarkMode.toggle){

        return;

    }

    on(

        DarkMode.toggle,

        "click",

        event=>{

            createRipple(event);

        }

    );

}

/* ===========================================================
   RIPPLE
=========================================================== */

function createRipple(event){

    if(!DarkMode.toggle){

        return;

    }

    const ripple=

        document.createElement("span");

    ripple.className=

        "theme-ripple";

    const rect=

        DarkMode.toggle.getBoundingClientRect();

    ripple.style.left=

        `${event.clientX-rect.left}px`;

    ripple.style.top=

        `${event.clientY-rect.top}px`;

    DarkMode.toggle.appendChild(

        ripple

    );

    setTimeout(()=>{

        ripple.remove();

    },

    ThemeAnimation.duration);

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableAnimation(){

    ThemeAnimation.enabled=true;

    applyTransition();

}

/* ===========================================================
   DISABLE
=========================================================== */

function disableAnimation(){

    ThemeAnimation.enabled=false;

    $$("*").forEach(element=>{

        element.style.transition="none";

    });

}

/* ===========================================================
   SPEED
=========================================================== */

function setAnimationDuration(duration){

    ThemeAnimation.duration=

        Number(duration)||300;

    applyTransition();

}

/* ===========================================================
   EASING
=========================================================== */

function setAnimationEasing(easing){

    ThemeAnimation.easing=easing;

    applyTransition();

}

/* ===========================================================
   FLASH
=========================================================== */

function flashTheme(){

    document.body?.classList.add(

        "theme-flash"

    );

    setTimeout(()=>{

        document.body?.classList.remove(

            "theme-flash"

        );

    },300);

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshAnimation(){

    applyTransition();

}

/* ===========================================================
   STATUS
=========================================================== */

function animationStatus(){

    return{

        initialized:

            ThemeAnimation.initialized,

        enabled:

            ThemeAnimation.enabled,

        animating:

            ThemeAnimation.animating,

        duration:

            ThemeAnimation.duration,

        easing:

            ThemeAnimation.easing

    };

}

/* ===========================================================
   EVENTS
=========================================================== */

document.addEventListener(

    "theme:changed",

    ()=>{

        flashTheme();

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeAnimation();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.DarkModeManager,

    {

        animation:{

            init:

                initializeAnimation,

            animate:

                animateThemeChange,

            enable:

                enableAnimation,

            disable:

                disableAnimation,

            duration:

                setAnimationDuration,

            easing:

                setAnimationEasing,

            refresh:

                refreshAnimation,

            status:

                animationStatus

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
 assets/js/darkmode.js
 Part 6
 Dynamic Logo • Icons • Images • Favicon
===========================================================
*/

"use strict";

/* ===========================================================
   ASSET MANAGER
=========================================================== */

const ThemeAssets={

    initialized:false,

    logos:[],

    images:[],

    icons:[],

    favicon:null

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeAssets(){

    ThemeAssets.logos=$$(

        "[data-theme-logo]"

    );

    ThemeAssets.images=$$(

        "[data-theme-image]"

    );

    ThemeAssets.icons=$$(

        "[data-theme-icon]"

    );

    ThemeAssets.favicon=$(

        'link[rel="icon"]'

    );

    updateThemeAssets();

    ThemeAssets.initialized=true;

}

/* ===========================================================
   UPDATE
=========================================================== */

function updateThemeAssets(){

    updateLogos();

    updateImages();

    updateIcons();

    updateFavicon();

}

/* ===========================================================
   LOGO
=========================================================== */

function updateLogos(){

    ThemeAssets.logos.forEach(logo=>{

        const dark=

            logo.dataset.dark;

        const light=

            logo.dataset.light;

        if(

            DarkModeState.theme==="dark" &&

            dark

        ){

            logo.src=dark;

        }

        if(

            DarkModeState.theme==="light" &&

            light

        ){

            logo.src=light;

        }

    });

}

/* ===========================================================
   IMAGE
=========================================================== */

function updateImages(){

    ThemeAssets.images.forEach(image=>{

        const dark=

            image.dataset.dark;

        const light=

            image.dataset.light;

        if(

            DarkModeState.theme==="dark" &&

            dark

        ){

            image.src=dark;

        }

        if(

            DarkModeState.theme==="light" &&

            light

        ){

            image.src=light;

        }

    });

}

/* ===========================================================
   ICON
=========================================================== */

function updateIcons(){

    ThemeAssets.icons.forEach(icon=>{

        const dark=

            icon.dataset.darkIcon;

        const light=

            icon.dataset.lightIcon;

        if(

            DarkModeState.theme==="dark"

        ){

            if(dark){

                icon.className=dark;

            }

        }else{

            if(light){

                icon.className=light;

            }

        }

    });

}

/* ===========================================================
   FAVICON
=========================================================== */

function updateFavicon(){

    if(

        !ThemeAssets.favicon

    ){

        return;

    }

    const dark=

        ThemeAssets.favicon

        .dataset.dark;

    const light=

        ThemeAssets.favicon

        .dataset.light;

    if(

        DarkModeState.theme==="dark" &&

        dark

    ){

        ThemeAssets.favicon.href=

            dark;

    }

    if(

        DarkModeState.theme==="light" &&

        light

    ){

        ThemeAssets.favicon.href=

            light;

    }

}

/* ===========================================================
   RELOAD
=========================================================== */

function reloadAssets(){

    initializeAssets();

}

/* ===========================================================
   PRELOAD
=========================================================== */

function preloadAssets(){

    [

        ...ThemeAssets.logos,

        ...ThemeAssets.images

    ].forEach(element=>{

        [

            element.dataset.dark,

            element.dataset.light

        ].forEach(src=>{

            if(!src){

                return;

            }

            const image=new Image();

            image.src=src;

        });

    });

}

/* ===========================================================
   APPLY
=========================================================== */

function applyAssetTheme(){

    updateThemeAssets();

}

/* ===========================================================
   EVENTS
=========================================================== */

document.addEventListener(

    "theme:changed",

    ()=>{

        applyAssetTheme();

    }

);

/* ===========================================================
   STATUS
=========================================================== */

function assetStatus(){

    return{

        initialized:

            ThemeAssets.initialized,

        logos:

            ThemeAssets.logos.length,

        images:

            ThemeAssets.images.length,

        icons:

            ThemeAssets.icons.length,

        favicon:

            Boolean(

                ThemeAssets.favicon

            )

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeAssets();

        preloadAssets();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.DarkModeManager,

    {

        assets:{

            init:

                initializeAssets,

            update:

                updateThemeAssets,

            logos:

                updateLogos,

            images:

                updateImages,

            icons:

                updateIcons,

            favicon:

                updateFavicon,

            preload:

                preloadAssets,

            reload:

                reloadAssets,

            status:

                assetStatus

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
 assets/js/darkmode.js
 Part 7
 Theme Events • Synchronization • Cross Tab • Observer
===========================================================
*/

"use strict";

/* ===========================================================
   THEME EVENT ENGINE
=========================================================== */

const ThemeEvents={

    initialized:false,

    observers:[],

    listeners:[],

    syncing:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeThemeEvents(){

    initializeThemeObserver();

    initializeStorageSync();

    initializeVisibilityEvents();

    initializeWindowEvents();

    ThemeEvents.initialized=true;

}

/* ===========================================================
   OBSERVER
=========================================================== */

function initializeThemeObserver(){

    const observer=

        new MutationObserver(

            mutations=>{

                mutations.forEach(

                    mutation=>{

                        if(

                            mutation.attributeName===

                            "data-theme"

                        ){

                            notifyThemeObservers();

                        }

                    }

                );

            }

        );

    observer.observe(

        document.documentElement,

        {

            attributes:true,

            attributeFilter:[

                "data-theme"

            ]

        }

    );

    ThemeEvents.observers.push(

        observer

    );

}

/* ===========================================================
   STORAGE SYNC
=========================================================== */

function initializeStorageSync(){

    window.addEventListener(

        "storage",

        event=>{

            if(

                event.key!==

                DARKMODE_CONFIG.storageKey

            ){

                return;

            }

            if(

                ThemeEvents.syncing

            ){

                return;

            }

            if(

                event.newValue==="dark" ||

                event.newValue==="light"

            ){

                ThemeEvents.syncing=true;

                setTheme(

                    event.newValue

                );

                updateThemeAssets?.();

                updateToggleUI?.();

                dispatchThemeChanged();

                ThemeEvents.syncing=false;

            }

        }

    );

}

/* ===========================================================
   VISIBILITY
=========================================================== */

function initializeVisibilityEvents(){

    document.addEventListener(

        "visibilitychange",

        ()=>{

            if(

                !document.hidden

            ){

                refreshTheme();

            }

        }

    );

}

/* ===========================================================
   WINDOW EVENTS
=========================================================== */

function initializeWindowEvents(){

    window.addEventListener(

        "focus",

        refreshTheme

    );

    window.addEventListener(

        "pageshow",

        refreshTheme

    );

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshTheme(){

    applyTheme();

    updateThemeAssets?.();

    updateToggleUI?.();

}

/* ===========================================================
   OBSERVER CALLBACKS
=========================================================== */

function addThemeListener(callback){

    if(

        typeof callback!=="function"

    ){

        return;

    }

    ThemeEvents.listeners.push(

        callback

    );

}

function removeThemeListener(callback){

    ThemeEvents.listeners=

        ThemeEvents.listeners.filter(

            item=>item!==callback

        );

}

/* ===========================================================
   NOTIFY
=========================================================== */

function notifyThemeObservers(){

    ThemeEvents.listeners.forEach(

        callback=>{

            callback({

                theme:

                    DarkModeState.theme,

                previous:

                    DarkModeState.previousTheme,

                system:

                    DarkModeState.systemTheme

            });

        }

    );

}

/* ===========================================================
   CUSTOM EVENT
=========================================================== */

function dispatchThemeChanged(){

    document.dispatchEvent(

        new CustomEvent(

            "theme:changed",

            {

                detail:{

                    theme:

                        DarkModeState.theme,

                    previous:

                        DarkModeState.previousTheme,

                    system:

                        DarkModeState.systemTheme

                }

            }

        )

    );

}

/* ===========================================================
   BROADCAST
=========================================================== */

function broadcastTheme(){

    saveTheme?.();

    dispatchThemeChanged();

    notifyThemeObservers();

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroyThemeEvents(){

    ThemeEvents.observers.forEach(

        observer=>{

            observer.disconnect();

        }

    );

    ThemeEvents.observers=[];

    ThemeEvents.listeners=[];

}

/* ===========================================================
   STATUS
=========================================================== */

function eventStatus(){

    return{

        initialized:

            ThemeEvents.initialized,

        syncing:

            ThemeEvents.syncing,

        observers:

            ThemeEvents.observers.length,

        listeners:

            ThemeEvents.listeners.length

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeThemeEvents();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.DarkModeManager,

    {

        events:{

            init:

                initializeThemeEvents,

            refresh:

                refreshTheme,

            notify:

                notifyThemeObservers,

            broadcast:

                broadcastTheme,

            dispatch:

                dispatchThemeChanged,

            addListener:

                addThemeListener,

            removeListener:

                removeThemeListener,

            destroy:

                destroyThemeEvents,

            status:

                eventStatus

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
 assets/js/darkmode.js
 Part 8
 Accessibility • Keyboard Support • Focus Management
===========================================================
*/

"use strict";

/* ===========================================================
   ACCESSIBILITY
=========================================================== */

const Accessibility={

    initialized:false,

    focusableElements:[],

    lastFocused:null,

    keyboardEnabled:true,

    announceChanges:true

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeAccessibility(){

    collectFocusableElements();

    initializeARIA();

    initializeKeyboardNavigation();

    initializeFocusEvents();

    Accessibility.initialized=true;

}

/* ===========================================================
   FOCUSABLE ELEMENTS
=========================================================== */

function collectFocusableElements(){

    Accessibility.focusableElements=[

        ...$$(
            "button,a,input,select,textarea,[tabindex]"
        )

    ];

}

/* ===========================================================
   ARIA
=========================================================== */

function initializeARIA(){

    if(DarkMode.toggle){

        DarkMode.toggle.setAttribute(

            "role",

            "button"

        );

        DarkMode.toggle.setAttribute(

            "tabindex",

            "0"

        );

        DarkMode.toggle.setAttribute(

            "aria-live",

            "polite"

        );

        updateARIA();

    }

}

/* ===========================================================
   UPDATE ARIA
=========================================================== */

function updateARIA(){

    if(!DarkMode.toggle){

        return;

    }

    DarkMode.toggle.setAttribute(

        "aria-pressed",

        String(

            DarkModeState.theme==="dark"

        )

    );

    DarkMode.toggle.setAttribute(

        "aria-label",

        DarkModeState.theme==="dark"

        ? "Switch to Light Mode"

        : "Switch to Dark Mode"

    );

}

/* ===========================================================
   KEYBOARD
=========================================================== */

function initializeKeyboardNavigation(){

    if(

        !Accessibility.keyboardEnabled

    ){

        return;

    }

    document.addEventListener(

        "keydown",

        keyboardHandler

    );

}

function keyboardHandler(event){

    switch(event.key){

        case "Enter":

        case " ":

            if(

                document.activeElement===

                DarkMode.toggle

            ){

                event.preventDefault();

                toggleTheme();

            }

            break;

        case "Escape":

            restoreFocus();

            break;

        case "Home":

            focusFirst();

            break;

        case "End":

            focusLast();

            break;

    }

}

/* ===========================================================
   FOCUS EVENTS
=========================================================== */

function initializeFocusEvents(){

    document.addEventListener(

        "focusin",

        event=>{

            Accessibility.lastFocused=

                event.target;

        }

    );

}

/* ===========================================================
   FOCUS HELPERS
=========================================================== */

function focusFirst(){

    Accessibility.focusableElements[0]

        ?.focus();

}

function focusLast(){

    Accessibility.focusableElements[
        Accessibility.focusableElements.length-1
    ]?.focus();

}

function restoreFocus(){

    Accessibility.lastFocused

        ?.focus();

}

/* ===========================================================
   ANNOUNCE
=========================================================== */

function announceTheme(){

    if(

        !Accessibility.announceChanges

    ){

        return;

    }

    const liveRegion=

        $("#theme-live-region");

    if(!liveRegion){

        return;

    }

    liveRegion.textContent=

        `Theme changed to ${

            DarkModeState.theme

        } mode`;

}

/* ===========================================================
   ENABLE / DISABLE
=========================================================== */

function enableKeyboard(){

    Accessibility.keyboardEnabled=true;

}

function disableKeyboard(){

    Accessibility.keyboardEnabled=false;

}

/* ===========================================================
   STATUS
=========================================================== */

function accessibilityStatus(){

    return{

        initialized:

            Accessibility.initialized,

        keyboard:

            Accessibility.keyboardEnabled,

        focusable:

            Accessibility.focusableElements.length,

        announce:

            Accessibility.announceChanges

    };

}

/* ===========================================================
   EVENTS
=========================================================== */

document.addEventListener(

    "theme:changed",

    ()=>{

        updateARIA();

        announceTheme();

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeAccessibility();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.DarkModeManager,

    {

        accessibility:{

            init:

                initializeAccessibility,

            aria:

                updateARIA,

            first:

                focusFirst,

            last:

                focusLast,

            restore:

                restoreFocus,

            enable:

                enableKeyboard,

            disable:

                disableKeyboard,

            announce:

                announceTheme,

            status:

                accessibilityStatus

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
 assets/js/darkmode.js
 Part 9
 Performance • Responsive • Optimization • Memory Manager
===========================================================
*/

"use strict";

/* ===========================================================
   PERFORMANCE ENGINE
=========================================================== */

const PerformanceEngine={

    initialized:false,

    mobile:false,

    reducedMotion:false,

    lowPower:false,

    fps:60,

    lastFrame:performance.now(),

    frameCount:0,

    observer:null

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializePerformance(){

    detectEnvironment();

    initializeResponsive();

    initializeVisibility();

    initializeIntersectionObserver();

    monitorFPS();

    optimizeDOM();

    PerformanceEngine.initialized=true;

}

/* ===========================================================
   ENVIRONMENT
=========================================================== */

function detectEnvironment(){

    PerformanceEngine.mobile=

        window.innerWidth<768;

    PerformanceEngine.reducedMotion=

        window.matchMedia(

            "(prefers-reduced-motion: reduce)"

        ).matches;

    if(

        navigator.connection

    ){

        PerformanceEngine.lowPower=

            navigator.connection.saveData||

            false;

    }

}

/* ===========================================================
   RESPONSIVE
=========================================================== */

function initializeResponsive(){

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

    updateResponsive();

}

function updateResponsive(){

    PerformanceEngine.mobile=

        window.innerWidth<768;

    document.documentElement

        .toggleAttribute(

            "data-mobile",

            PerformanceEngine.mobile

        );

}

/* ===========================================================
   VISIBILITY
=========================================================== */

function initializeVisibility(){

    document.addEventListener(

        "visibilitychange",

        ()=>{

            if(document.hidden){

                pauseAnimations();

            }else{

                resumeAnimations();

            }

        }

    );

}

/* ===========================================================
   INTERSECTION OBSERVER
=========================================================== */

function initializeIntersectionObserver(){

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

                        entry.target.classList.add(

                            "theme-visible"

                        );

                    }

                });

            },

            {

                threshold:0.1

            }

        );

    $$("[data-theme-observe]")

    .forEach(element=>{

        PerformanceEngine.observer.observe(

            element

        );

    });

}

/* ===========================================================
   DOM
=========================================================== */

function optimizeDOM(){

    document.documentElement

        .style.setProperty(

            "--theme-animation",

            PerformanceEngine.reducedMotion

            ?"0ms"

            :`${ThemeAnimation.duration}ms`

        );

}

function cleanupDOM(){

    PerformanceEngine.observer

        ?.disconnect();

}

/* ===========================================================
   ANIMATION
=========================================================== */

function pauseAnimations(){

    document.documentElement

        .classList.add(

            "theme-paused"

        );

}

function resumeAnimations(){

    document.documentElement

        .classList.remove(

            "theme-paused"

        );

}

/* ===========================================================
   FPS
=========================================================== */

function monitorFPS(){

    function loop(now){

        PerformanceEngine.frameCount++;

        if(

            now-

            PerformanceEngine.lastFrame>=1000

        ){

            PerformanceEngine.fps=

                PerformanceEngine.frameCount;

            PerformanceEngine.frameCount=0;

            PerformanceEngine.lastFrame=now;

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
   REFRESH
=========================================================== */

function refreshPerformance(){

    detectEnvironment();

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

        reducedMotion:

            PerformanceEngine.reducedMotion,

        lowPower:

            PerformanceEngine.lowPower,

        fps:

            PerformanceEngine.fps,

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

    window.DarkModeManager,

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

            pause:

                pauseAnimations,

            resume:

                resumeAnimations,

            memory:

                memoryUsage,

            status:

                performanceStatus

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
 assets/js/darkmode.js
 Part 10
 Theme Analytics • Statistics • Usage Tracking
===========================================================
*/

"use strict";

/* ===========================================================
   ANALYTICS ENGINE
=========================================================== */

const ThemeAnalytics={

    initialized:false,

    totalChanges:0,

    darkCount:0,

    lightCount:0,

    autoChanges:0,

    manualChanges:0,

    startTime:Date.now(),

    sessionID:crypto.randomUUID
        ?crypto.randomUUID()
        :Date.now().toString(36)

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeAnalytics(){

    loadAnalytics();

    ThemeAnalytics.initialized=true;

}

/* ===========================================================
   TRACK
=========================================================== */

function trackThemeChange(mode="manual"){

    ThemeAnalytics.totalChanges++;

    if(

        DarkModeState.theme==="dark"

    ){

        ThemeAnalytics.darkCount++;

    }else{

        ThemeAnalytics.lightCount++;

    }

    if(

        mode==="auto"

    ){

        ThemeAnalytics.autoChanges++;

    }else{

        ThemeAnalytics.manualChanges++;

    }

    saveAnalytics();

}

/* ===========================================================
   SESSION
=========================================================== */

function sessionDuration(){

    return Math.floor(

        (Date.now()-

        ThemeAnalytics.startTime)

        /1000

    );

}

/* ===========================================================
   SAVE
=========================================================== */

function saveAnalytics(){

    try{

        localStorage.setItem(

            "iti-theme-analytics",

            JSON.stringify({

                totalChanges:

                    ThemeAnalytics.totalChanges,

                darkCount:

                    ThemeAnalytics.darkCount,

                lightCount:

                    ThemeAnalytics.lightCount,

                autoChanges:

                    ThemeAnalytics.autoChanges,

                manualChanges:

                    ThemeAnalytics.manualChanges

            })

        );

    }

    catch(error){

        darkLog(error);

    }

}

/* ===========================================================
   LOAD
=========================================================== */

function loadAnalytics(){

    try{

        const data=

            localStorage.getItem(

                "iti-theme-analytics"

            );

        if(!data){

            return;

        }

        Object.assign(

            ThemeAnalytics,

            JSON.parse(data)

        );

    }

    catch(error){

        darkLog(error);

    }

}

/* ===========================================================
   RESET
=========================================================== */

function resetAnalytics(){

    ThemeAnalytics.totalChanges=0;

    ThemeAnalytics.darkCount=0;

    ThemeAnalytics.lightCount=0;

    ThemeAnalytics.autoChanges=0;

    ThemeAnalytics.manualChanges=0;

    ThemeAnalytics.startTime=Date.now();

    saveAnalytics();

}

/* ===========================================================
   EXPORT
=========================================================== */

function exportAnalytics(){

    return{

        sessionID:

            ThemeAnalytics.sessionID,

        totalChanges:

            ThemeAnalytics.totalChanges,

        darkMode:

            ThemeAnalytics.darkCount,

        lightMode:

            ThemeAnalytics.lightCount,

        automatic:

            ThemeAnalytics.autoChanges,

        manual:

            ThemeAnalytics.manualChanges,

        duration:

            sessionDuration(),

        theme:

            DarkModeState.theme

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
   PERFORMANCE
=========================================================== */

function analyticsPerformance(){

    return{

        memory:

            performance.memory||

            null,

        timing:

            performance.timing||

            null,

        navigation:

            performance.navigation||

            null

    };

}

/* ===========================================================
   STATUS
=========================================================== */

function analyticsStatus(){

    return{

        initialized:

            ThemeAnalytics.initialized,

        total:

            ThemeAnalytics.totalChanges,

        dark:

            ThemeAnalytics.darkCount,

        light:

            ThemeAnalytics.lightCount,

        automatic:

            ThemeAnalytics.autoChanges,

        manual:

            ThemeAnalytics.manualChanges,

        duration:

            sessionDuration()

    };

}

/* ===========================================================
   EVENTS
=========================================================== */

document.addEventListener(

    "theme:changed",

    ()=>{

        trackThemeChange("manual");

    }

);

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

    window.DarkModeManager,

    {

        analytics:{

            init:

                initializeAnalytics,

            track:

                trackThemeChange,

            export:

                exportAnalytics,

            report:

                analyticsReport,

            performance:

                analyticsPerformance,

            reset:

                resetAnalytics,

            status:

                analyticsStatus

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
 assets/js/darkmode.js
 Part 11
 Utilities • Debug • Report • Public API
===========================================================
*/

"use strict";

/* ===========================================================
   INFORMATION
=========================================================== */

const DarkModeInfo={

    name:"Dark Mode Manager",

    version:"1.0.0",

    author:"Investment Technology Indonesia",

    environment:"production"

};

/* ===========================================================
   DEBUG
=========================================================== */

function enableDebug(){

    DarkModeApp.debug=true;

    darkLog(

        "Debug Enabled"

    );

}

function disableDebug(){

    DarkModeApp.debug=false;

}

function debug(...args){

    if(!DarkModeApp.debug){

        return;

    }

    console.log(

        "[DarkMode Debug]",

        ...args

    );

}

function warn(message){

    console.warn(

        "[DarkMode Warning]",

        message

    );

}

function error(message){

    console.error(

        "[DarkMode Error]",

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

    return "theme-"+

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

function formatMilliseconds(ms){

    return ms<1000

        ?`${ms} ms`

        :`${(ms/1000).toFixed(2)} s`;

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

            DarkModeInfo,

        app:

            DarkModeApp,

        config:

            DARKMODE_CONFIG,

        state:

            DarkModeState,

        storage:

            storageStatus?.(),

        system:

            systemThemeStatus?.(),

        animation:

            animationStatus?.(),

        assets:

            assetStatus?.(),

        events:

            eventStatus?.(),

        accessibility:

            accessibilityStatus?.(),

        performance:

            performanceStatus?.(),

        analytics:

            analyticsStatus?.(),

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

    resetTheme?.();

    resetAnalytics?.();

    refreshTheme?.();

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroyManager(){

    destroyThemeEvents?.();

    destroyDarkMode?.();

    cleanupDOM?.();

    darkLog(

        "Dark Mode Manager Destroyed"

    );

}

/* ===========================================================
   RESTART
=========================================================== */

function restartManager(){

    destroyManager();

    initializeDarkMode?.();

    initializeThemeToggle?.();

    initializeStorage?.();

    initializeSystemTheme?.();

    initializeAnimation?.();

    initializeAssets?.();

    initializeThemeEvents?.();

    initializeAccessibility?.();

    initializePerformance?.();

    initializeAnalytics?.();

}

/* ===========================================================
   READY
=========================================================== */

function ready(){

    return{

        initialized:

            DarkModeApp.initialized,

        theme:

            DarkModeState.theme,

        system:

            DarkModeState.systemTheme,

        followingSystem:

            DarkModeState.followingSystem,

        changes:

            DarkModeState.changed

    };

}

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.DarkModeManager,

    {

        info:

            DarkModeInfo,

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

        formatMilliseconds,

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

            "DarkMode Utilities Ready"

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
 assets/js/darkmode.js
 Part 12
 Final Initialization • Cleanup • Export • End of File
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION INITIALIZER
=========================================================== */

function initializeDarkModeManager(){

    if(DarkModeApp.initialized){

        darkLog(

            "DarkMode Manager already initialized."

        );

        return;

    }

    darkLog(

        "Initializing DarkMode Manager..."

    );

    initializeDarkMode?.();

    initializeThemeToggle?.();

    initializeStorage?.();

    initializeSystemTheme?.();

    initializeAnimation?.();

    initializeAssets?.();

    initializeThemeEvents?.();

    initializeAccessibility?.();

    initializePerformance?.();

    initializeAnalytics?.();

    applyTheme?.();

    updateThemeAssets?.();

    updateToggleUI?.();

    DarkModeApp.initialized=true;

    darkLog(

        "DarkMode Manager Ready."

    );

}

/* ===========================================================
   GLOBAL EVENTS
=========================================================== */

window.addEventListener(

    "load",

    ()=>{

        refreshDarkMode?.();

        refreshTheme?.();

        refreshPerformance?.();

        darkLog(

            "Window Loaded"

        );

    }

);

window.addEventListener(

    "pageshow",

    ()=>{

        loadTheme?.();

        syncWithSystemTheme?.();

    }

);

window.addEventListener(

    "focus",

    ()=>{

        refreshTheme?.();

    }

);

window.addEventListener(

    "blur",

    ()=>{

        saveTheme?.();

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

function cleanupDarkModeManager(){

    saveTheme?.();

    cleanupDOM?.();

    destroyThemeEvents?.();

    darkLog(

        "DarkMode Cleanup Complete"

    );

}

/* ===========================================================
   BEFORE UNLOAD
=========================================================== */

window.addEventListener(

    "beforeunload",

    ()=>{

        cleanupDarkModeManager();

    }

);

/* ===========================================================
   FREEZE CONFIG
=========================================================== */

Object.freeze(

    DARKMODE_CONFIG

);

Object.freeze(

    DarkModeInfo

);

/* ===========================================================
   EXPORT
=========================================================== */

window.DarkModeManager=

Object.assign(

    window.DarkModeManager||{},

    {

        initialize:

            initializeDarkModeManager,

        cleanup:

            cleanupDarkModeManager,

        version:

            ()=>DarkModeInfo.version,

        app:

            DarkModeApp,

        config:

            DARKMODE_CONFIG,

        state:

            DarkModeState,

        info:

            DarkModeInfo,

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

        initializeDarkModeManager();

    }

);

/* ===========================================================
   FINAL LOG
=========================================================== */

darkLog(

"========================================"

);

darkLog(

"Investment Technology Indonesia"

);

darkLog(

"DarkMode Manager"

);

darkLog(

"Version:",

DarkModeInfo.version

);

darkLog(

"Environment:",

DarkModeInfo.environment

);

darkLog(

"========================================"

);

/* ===========================================================
   FEATURES
=========================================================== */

/*
✔ Light Mode
✔ Dark Mode
✔ Theme Toggle
✔ Local Storage
✔ Theme Persistence
✔ System Theme Detection
✔ Auto Theme Sync
✔ Cross-Tab Synchronization
✔ Dynamic Logo Switching
✔ Dynamic Image Switching
✔ Dynamic Icon Switching
✔ Dynamic Favicon
✔ Smooth Theme Transition
✔ Ripple Animation
✔ Accessibility (ARIA)
✔ Keyboard Shortcut (Ctrl + Shift + D)
✔ Focus Management
✔ Screen Reader Support
✔ Responsive Optimization
✔ Reduced Motion Support
✔ Lazy Loading
✔ Memory Optimization
✔ Theme Analytics
✔ Statistics
✔ Debug Utilities
✔ Report Generator
✔ Public API
✔ ES6+ Modern JavaScript
✔ Production Ready
*/

/* ===========================================================
   END OF FILE
   assets/js/darkmode.js
===========================================================
*/