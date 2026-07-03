/*!
===========================================================
 Investment Technology Indonesia
 assets/js/scrolltop.js
 Part 1
 Core • Config • Initialization
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION
=========================================================== */

const ScrollTopApp={

    name:"Investment Technology Indonesia ScrollTop",

    version:"1.0.0",

    initialized:false,

    running:false,

    debug:false

};

/* ===========================================================
   CONFIG
=========================================================== */

const SCROLLTOP_CONFIG={

    selector:".scroll-top",

    progressSelector:".scroll-progress",

    iconSelector:".scroll-top-icon",

    showOffset:300,

    duration:600,

    easing:"easeInOutCubic",

    autoHide:true,

    showProgress:true,

    keyboardShortcut:true,

    animationDuration:300,

    throttle:16

};

/* ===========================================================
   STATE
=========================================================== */

const ScrollTopState={

    initialized:false,

    visible:false,

    scrolling:false,

    progress:0,

    scrollY:0,

    maxScroll:0,

    clicks:0,

    lastScroll:0

};

/* ===========================================================
   ELEMENTS
=========================================================== */

const ScrollTop={

    button:null,

    progress:null,

    icon:null

};

/* ===========================================================
   LOGGER
=========================================================== */

function scrollLog(...args){

    if(!ScrollTopApp.debug){

        return;

    }

    console.log(

        "[ScrollTop]",

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

function clamp(value,min,max){

    return Math.min(

        Math.max(value,min),

        max

    );

}

/* ===========================================================
   INITIALIZE ELEMENTS
=========================================================== */

function initializeElements(){

    ScrollTop.button=$(

        SCROLLTOP_CONFIG.selector

    );

    ScrollTop.progress=$(

        SCROLLTOP_CONFIG.progressSelector

    );

    ScrollTop.icon=$(

        SCROLLTOP_CONFIG.iconSelector

    );

}

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeScrollTop(){

    if(

        ScrollTopApp.initialized

    ){

        return;

    }

    initializeElements();

    updateScrollMetrics();

    ScrollTopState.initialized=true;

    ScrollTopApp.initialized=true;

    scrollLog(

        "ScrollTop Initialized"

    );

}

/* ===========================================================
   METRICS
=========================================================== */

function updateScrollMetrics(){

    ScrollTopState.scrollY=

        window.pageYOffset||

        document.documentElement.scrollTop||

        0;

    ScrollTopState.maxScroll=

        Math.max(

            document.body.scrollHeight,

            document.documentElement.scrollHeight

        )-

        window.innerHeight;

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshScrollTop(){

    initializeElements();

    updateScrollMetrics();

    scrollLog(

        "ScrollTop Refreshed"

    );

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroyScrollTop(){

    ScrollTopState.initialized=false;

    ScrollTopApp.initialized=false;

    ScrollTopApp.running=false;

    scrollLog(

        "ScrollTop Destroyed"

    );

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeScrollTop();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

window.ScrollTopManager={

    app:ScrollTopApp,

    config:SCROLLTOP_CONFIG,

    state:ScrollTopState,

    elements:ScrollTop,

    init:initializeScrollTop,

    refresh:refreshScrollTop,

    destroy:destroyScrollTop

};

/* ===========================================================
   END PART 1
===========================================================
*/

/*!
===========================================================
 Investment Technology Indonesia
 assets/js/scrolltop.js
 Part 2
 Scroll Detection • Button Manager • Visibility Control
===========================================================
*/

"use strict";

/* ===========================================================
   SCROLL ENGINE
=========================================================== */

const ScrollEngine={

    initialized:false,

    ticking:false,

    threshold:
        SCROLLTOP_CONFIG.showOffset,

    direction:"down",

    lastPosition:0

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeScrollEngine(){

    initializeScrollEvents();

    initializeButton();

    updateScroll();

    ScrollEngine.initialized=true;

}

/* ===========================================================
   BUTTON
=========================================================== */

function initializeButton(){

    if(

        !ScrollTop.button

    ){

        return;

    }

    on(

        ScrollTop.button,

        "click",

        scrollToTop

    );

}

/* ===========================================================
   SCROLL EVENTS
=========================================================== */

function initializeScrollEvents(){

    window.addEventListener(

        "scroll",

        handleScroll,

        {

            passive:true

        }

    );

}

/* ===========================================================
   HANDLE
=========================================================== */

function handleScroll(){

    ScrollTopState.scrollY=

        window.pageYOffset||

        document.documentElement.scrollTop||

        0;

    detectDirection();

    if(

        ScrollEngine.ticking

    ){

        return;

    }

    ScrollEngine.ticking=true;

    requestAnimationFrame(

        ()=>{

            updateScroll();

            ScrollEngine.ticking=false;

        }

    );

}

/* ===========================================================
   UPDATE
=========================================================== */

function updateScroll(){

    updateScrollMetrics();

    updateVisibility();

    updateProgress?.();

}

/* ===========================================================
   DIRECTION
=========================================================== */

function detectDirection(){

    ScrollEngine.direction=

        ScrollTopState.scrollY>

        ScrollEngine.lastPosition

        ?"down"

        :"up";

    ScrollEngine.lastPosition=

        ScrollTopState.scrollY;

}

/* ===========================================================
   SHOW
=========================================================== */

function showButton(){

    if(

        !ScrollTop.button

    ){

        return;

    }

    addClass(

        ScrollTop.button,

        "active"

    );

    removeClass(

        ScrollTop.button,

        "hidden"

    );

    ScrollTopState.visible=true;

}

/* ===========================================================
   HIDE
=========================================================== */

function hideButton(){

    if(

        !ScrollTop.button

    ){

        return;

    }

    removeClass(

        ScrollTop.button,

        "active"

    );

    addClass(

        ScrollTop.button,

        "hidden"

    );

    ScrollTopState.visible=false;

}

/* ===========================================================
   VISIBILITY
=========================================================== */

function updateVisibility(){

    if(

        ScrollTopState.scrollY>

        ScrollEngine.threshold

    ){

        showButton();

    }

    else{

        hideButton();

    }

}

/* ===========================================================
   TOGGLE
=========================================================== */

function toggleButton(){

    if(

        ScrollTopState.visible

    ){

        hideButton();

    }

    else{

        showButton();

    }

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableScrollButton(){

    ScrollTop.button?.removeAttribute(

        "disabled"

    );

}

/* ===========================================================
   DISABLE
=========================================================== */

function disableScrollButton(){

    ScrollTop.button?.setAttribute(

        "disabled",

        "true"

    );

}

/* ===========================================================
   STATUS
=========================================================== */

function scrollStatus(){

    return{

        initialized:

            ScrollEngine.initialized,

        visible:

            ScrollTopState.visible,

        scrollY:

            ScrollTopState.scrollY,

        direction:

            ScrollEngine.direction,

        threshold:

            ScrollEngine.threshold

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeScrollEngine();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ScrollTopManager,

    {

        scroll:{

            init:

                initializeScrollEngine,

            update:

                updateScroll,

            show:

                showButton,

            hide:

                hideButton,

            toggle:

                toggleButton,

            enable:

                enableScrollButton,

            disable:

                disableScrollButton,

            status:

                scrollStatus

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
 assets/js/scrolltop.js
 Part 3
 Smooth Scroll Engine • Animation • Easing
===========================================================
*/

"use strict";

/* ===========================================================
   SMOOTH SCROLL ENGINE
=========================================================== */

const SmoothScroll={

    initialized:false,

    running:false,

    startY:0,

    targetY:0,

    startTime:0,

    duration:SCROLLTOP_CONFIG.duration,

    requestID:null

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeSmoothScroll(){

    SmoothScroll.initialized=true;

}

/* ===========================================================
   SCROLL TO TOP
=========================================================== */

function scrollToTop(){

    if(

        SmoothScroll.running

    ){

        return;

    }

    ScrollTopState.clicks++;

    SmoothScroll.startY=

        window.pageYOffset||

        document.documentElement.scrollTop;

    SmoothScroll.targetY=0;

    SmoothScroll.startTime=

        performance.now();

    SmoothScroll.running=true;

    ScrollTopState.scrolling=true;

    animateScroll(

        SmoothScroll.startTime

    );

}

/* ===========================================================
   ANIMATION
=========================================================== */

function animateScroll(timestamp){

    if(

        !SmoothScroll.running

    ){

        return;

    }

    const elapsed=

        timestamp-

        SmoothScroll.startTime;

    const progress=

        clamp(

            elapsed/

            SmoothScroll.duration,

            0,

            1

        );

    const eased=

        easing(

            progress

        );

    const position=

        SmoothScroll.startY+

        (

            SmoothScroll.targetY-

            SmoothScroll.startY

        )*

        eased;

    window.scrollTo(

        0,

        position

    );

    if(

        progress<1

    ){

        SmoothScroll.requestID=

            requestAnimationFrame(

                animateScroll

            );

    }

    else{

        finishScroll();

    }

}

/* ===========================================================
   FINISH
=========================================================== */

function finishScroll(){

    cancelAnimationFrame(

        SmoothScroll.requestID

    );

    SmoothScroll.running=false;

    ScrollTopState.scrolling=false;

    window.scrollTo(

        0,

        0

    );

}

/* ===========================================================
   STOP
=========================================================== */

function stopSmoothScroll(){

    cancelAnimationFrame(

        SmoothScroll.requestID

    );

    SmoothScroll.running=false;

    ScrollTopState.scrolling=false;

}

/* ===========================================================
   SCROLL TO POSITION
=========================================================== */

function scrollToPosition(position){

    position=

        Math.max(

            0,

            position

        );

    SmoothScroll.startY=

        window.pageYOffset;

    SmoothScroll.targetY=

        position;

    SmoothScroll.startTime=

        performance.now();

    SmoothScroll.running=true;

    animateScroll(

        SmoothScroll.startTime

    );

}

/* ===========================================================
   EASING
=========================================================== */

function easing(value){

    switch(

        SCROLLTOP_CONFIG.easing

    ){

        case "linear":

            return value;

        case "easeOut":

            return 1-

            Math.pow(

                1-value,

                3

            );

        case "easeIn":

            return value*

                value*

                value;

        default:

            return value<0.5

                ?4*

                 value*

                 value*

                 value

                :1-

                Math.pow(

                    -2*

                    value+

                    2,

                    3

                )/2;

    }

}

/* ===========================================================
   DURATION
=========================================================== */

function setScrollDuration(duration){

    SmoothScroll.duration=

        Math.max(

            100,

            Number(duration)||600

        );

}

/* ===========================================================
   EASING MODE
=========================================================== */

function setEasing(mode){

    SCROLLTOP_CONFIG.easing=

        mode;

}

/* ===========================================================
   STATUS
=========================================================== */

function smoothStatus(){

    return{

        initialized:

            SmoothScroll.initialized,

        running:

            SmoothScroll.running,

        duration:

            SmoothScroll.duration,

        easing:

            SCROLLTOP_CONFIG.easing,

        clicks:

            ScrollTopState.clicks

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeSmoothScroll();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ScrollTopManager,

    {

        smooth:{

            init:

                initializeSmoothScroll,

            top:

                scrollToTop,

            to:

                scrollToPosition,

            stop:

                stopSmoothScroll,

            duration:

                setScrollDuration,

            easing:

                setEasing,

            status:

                smoothStatus

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
 assets/js/scrolltop.js
 Part 4
 Scroll Progress • Circular Progress • Percentage Indicator
===========================================================
*/

"use strict";

/* ===========================================================
   PROGRESS ENGINE
=========================================================== */

const ProgressEngine={

    initialized:false,

    percentage:0,

    circumference:0,

    radius:26,

    visible:true

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeProgress(){

    calculateCircle();

    updateProgress();

    ProgressEngine.initialized=true;

}

/* ===========================================================
   CALCULATE
=========================================================== */

function calculateCircle(){

    ProgressEngine.circumference=

        2*

        Math.PI*

        ProgressEngine.radius;

}

/* ===========================================================
   UPDATE
=========================================================== */

function updateProgress(){

    updateScrollMetrics();

    if(

        ScrollTopState.maxScroll<=0

    ){

        ProgressEngine.percentage=0;

    }

    else{

        ProgressEngine.percentage=

            clamp(

                (

                    ScrollTopState.scrollY/

                    ScrollTopState.maxScroll

                )*100,

                0,

                100

            );

    }

    updateCircularProgress();

    updateProgressLabel();

}

/* ===========================================================
   CIRCLE
=========================================================== */

function updateCircularProgress(){

    if(

        !ScrollTop.progress

    ){

        return;

    }

    const offset=

        ProgressEngine.circumference-

        (

            ProgressEngine.percentage/

            100

        )*

        ProgressEngine.circumference;

    ScrollTop.progress.style.strokeDasharray=

        ProgressEngine.circumference;

    ScrollTop.progress.style.strokeDashoffset=

        offset;

}

/* ===========================================================
   LABEL
=========================================================== */

function updateProgressLabel(){

    if(

        !ScrollTop.button

    ){

        return;

    }

    ScrollTop.button.setAttribute(

        "data-progress",

        `${

            Math.round(

                ProgressEngine.percentage

            )

        }%`

    );

}

/* ===========================================================
   TEXT
=========================================================== */

function updateProgressText(){

    const label=

        $(".scroll-progress-text");

    if(!label){

        return;

    }

    label.textContent=

        `${

            Math.round(

                ProgressEngine.percentage

            )

        }%`;

}

/* ===========================================================
   SHOW
=========================================================== */

function showProgress(){

    ProgressEngine.visible=true;

    ScrollTop.progress?.classList.remove(

        "hidden"

    );

}

/* ===========================================================
   HIDE
=========================================================== */

function hideProgress(){

    ProgressEngine.visible=false;

    ScrollTop.progress?.classList.add(

        "hidden"

    );

}

/* ===========================================================
   TOGGLE
=========================================================== */

function toggleProgress(){

    if(

        ProgressEngine.visible

    ){

        hideProgress();

    }

    else{

        showProgress();

    }

}

/* ===========================================================
   RESET
=========================================================== */

function resetProgress(){

    ProgressEngine.percentage=0;

    updateCircularProgress();

    updateProgressLabel();

}

/* ===========================================================
   COLOR
=========================================================== */

function setProgressColor(color){

    if(

        ScrollTop.progress

    ){

        ScrollTop.progress.style.stroke=

            color;

    }

}

/* ===========================================================
   WIDTH
=========================================================== */

function setProgressWidth(width){

    if(

        ScrollTop.progress

    ){

        ScrollTop.progress.style.strokeWidth=

            `${width}`;

    }

}

/* ===========================================================
   STATUS
=========================================================== */

function progressStatus(){

    return{

        initialized:

            ProgressEngine.initialized,

        visible:

            ProgressEngine.visible,

        percentage:

            Math.round(

                ProgressEngine.percentage

            ),

        circumference:

            ProgressEngine.circumference,

        radius:

            ProgressEngine.radius

    };

}

/* ===========================================================
   EVENTS
=========================================================== */

window.addEventListener(

    "scroll",

    ()=>{

        updateProgress();

        updateProgressText();

    },

    {

        passive:true

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeProgress();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ScrollTopManager,

    {

        progress:{

            init:

                initializeProgress,

            update:

                updateProgress,

            reset:

                resetProgress,

            show:

                showProgress,

            hide:

                hideProgress,

            toggle:

                toggleProgress,

            color:

                setProgressColor,

            width:

                setProgressWidth,

            status:

                progressStatus

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
 assets/js/scrolltop.js
 Part 5
 Animation • Transition • Effects
===========================================================
*/

"use strict";

/* ===========================================================
   ANIMATION ENGINE
=========================================================== */

const AnimationEngine={

    initialized:false,

    enabled:true,

    animating:false,

    duration:

        SCROLLTOP_CONFIG.animationDuration,

    easing:"ease",

    scale:1,

    rotation:0,

    opacity:1

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeAnimation(){

    applyTransition();

    initializeHoverEffects();

    initializeClickEffects();

    AnimationEngine.initialized=true;

}

/* ===========================================================
   TRANSITION
=========================================================== */

function applyTransition(){

    if(

        !ScrollTop.button ||

        !AnimationEngine.enabled

    ){

        return;

    }

    ScrollTop.button.style.transition=

`opacity ${AnimationEngine.duration}ms ${AnimationEngine.easing},
transform ${AnimationEngine.duration}ms ${AnimationEngine.easing},
background-color ${AnimationEngine.duration}ms ${AnimationEngine.easing},
box-shadow ${AnimationEngine.duration}ms ${AnimationEngine.easing}`;

}

/* ===========================================================
   SHOW
=========================================================== */

function animateShow(){

    if(

        !ScrollTop.button

    ){

        return;

    }

    AnimationEngine.animating=true;

    ScrollTop.button.style.opacity="0";

    ScrollTop.button.style.transform=

        "translateY(30px) scale(.8)";

    requestAnimationFrame(()=>{

        ScrollTop.button.style.opacity="1";

        ScrollTop.button.style.transform=

            "translateY(0) scale(1)";

    });

    finishAnimation();

}

/* ===========================================================
   HIDE
=========================================================== */

function animateHide(){

    if(

        !ScrollTop.button

    ){

        return;

    }

    AnimationEngine.animating=true;

    ScrollTop.button.style.opacity="0";

    ScrollTop.button.style.transform=

        "translateY(30px) scale(.8)";

    finishAnimation();

}

/* ===========================================================
   FINISH
=========================================================== */

function finishAnimation(){

    setTimeout(()=>{

        AnimationEngine.animating=false;

    },

    AnimationEngine.duration);

}

/* ===========================================================
   HOVER
=========================================================== */

function initializeHoverEffects(){

    if(

        !ScrollTop.button

    ){

        return;

    }

    on(

        ScrollTop.button,

        "mouseenter",

        ()=>{

            ScrollTop.button.style.transform=

                "scale(1.08)";

            ScrollTop.button.style.boxShadow=

                "0 10px 25px rgba(0,0,0,.25)";

        }

    );

    on(

        ScrollTop.button,

        "mouseleave",

        ()=>{

            ScrollTop.button.style.transform=

                "scale(1)";

            ScrollTop.button.style.boxShadow="";

        }

    );

}

/* ===========================================================
   CLICK EFFECT
=========================================================== */

function initializeClickEffects(){

    if(

        !ScrollTop.button

    ){

        return;

    }

    on(

        ScrollTop.button,

        "click",

        clickAnimation

    );

}

function clickAnimation(){

    ScrollTop.button.animate(

        [

            {

                transform:

                    "scale(1)"

            },

            {

                transform:

                    "scale(.88)"

            },

            {

                transform:

                    "scale(1.1)"

            },

            {

                transform:

                    "scale(1)"

            }

        ],

        {

            duration:250,

            easing:"ease-out"

        }

    );

}

/* ===========================================================
   ROTATE ICON
=========================================================== */

function rotateIcon(){

    if(

        !ScrollTop.icon

    ){

        return;

    }

    AnimationEngine.rotation+=360;

    ScrollTop.icon.style.transform=

        `rotate(${AnimationEngine.rotation}deg)`;

}

/* ===========================================================
   PULSE
=========================================================== */

function pulseButton(){

    if(

        !ScrollTop.button

    ){

        return;

    }

    ScrollTop.button.animate(

        [

            {

                transform:

                    "scale(1)"

            },

            {

                transform:

                    "scale(1.12)"

            },

            {

                transform:

                    "scale(1)"

            }

        ],

        {

            duration:700,

            easing:"ease-in-out"

        }

    );

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableAnimation(){

    AnimationEngine.enabled=true;

    applyTransition();

}

/* ===========================================================
   DISABLE
=========================================================== */

function disableAnimation(){

    AnimationEngine.enabled=false;

    if(

        ScrollTop.button

    ){

        ScrollTop.button.style.transition=

            "none";

    }

}

/* ===========================================================
   DURATION
=========================================================== */

function setAnimationDuration(duration){

    AnimationEngine.duration=

        Math.max(

            100,

            Number(duration)||300

        );

    applyTransition();

}

/* ===========================================================
   STATUS
=========================================================== */

function animationStatus(){

    return{

        initialized:

            AnimationEngine.initialized,

        enabled:

            AnimationEngine.enabled,

        animating:

            AnimationEngine.animating,

        duration:

            AnimationEngine.duration,

        rotation:

            AnimationEngine.rotation

    };

}

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

    window.ScrollTopManager,

    {

        animation:{

            init:

                initializeAnimation,

            show:

                animateShow,

            hide:

                animateHide,

            rotate:

                rotateIcon,

            pulse:

                pulseButton,

            enable:

                enableAnimation,

            disable:

                disableAnimation,

            duration:

                setAnimationDuration,

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
 assets/js/scrolltop.js
 Part 6
 Responsive • Mobile Optimization • Adaptive Layout
===========================================================
*/

"use strict";

/* ===========================================================
   RESPONSIVE ENGINE
=========================================================== */

const ResponsiveEngine={

    initialized:false,

    mobile:false,

    tablet:false,

    desktop:true,

    touch:false,

    orientation:"portrait",

    adaptive:true

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeResponsive(){

    detectDevice();

    detectTouch();

    detectOrientation();

    initializeResize();

    initializeOrientationChange();

    applyResponsive();

    ResponsiveEngine.initialized=true;

}

/* ===========================================================
   DEVICE
=========================================================== */

function detectDevice(){

    const width=

        window.innerWidth;

    ResponsiveEngine.mobile=

        width<768;

    ResponsiveEngine.tablet=

        width>=768 &&

        width<1200;

    ResponsiveEngine.desktop=

        width>=1200;

}

/* ===========================================================
   TOUCH
=========================================================== */

function detectTouch(){

    ResponsiveEngine.touch=

        ("ontouchstart" in window) ||

        navigator.maxTouchPoints>0;

}

/* ===========================================================
   ORIENTATION
=========================================================== */

function detectOrientation(){

    ResponsiveEngine.orientation=

        window.innerWidth>

        window.innerHeight

        ?"landscape"

        :"portrait";

}

/* ===========================================================
   APPLY
=========================================================== */

function applyResponsive(){

    if(

        !ScrollTop.button

    ){

        return;

    }

    ScrollTop.button.classList.remove(

        "mobile",

        "tablet",

        "desktop"

    );

    if(

        ResponsiveEngine.mobile

    ){

        ScrollTop.button.classList.add(

            "mobile"

        );

        ScrollTop.button.style.right="18px";

        ScrollTop.button.style.bottom="18px";

        ScrollTop.button.style.width="52px";

        ScrollTop.button.style.height="52px";

    }

    else if(

        ResponsiveEngine.tablet

    ){

        ScrollTop.button.classList.add(

            "tablet"

        );

        ScrollTop.button.style.right="24px";

        ScrollTop.button.style.bottom="24px";

        ScrollTop.button.style.width="56px";

        ScrollTop.button.style.height="56px";

    }

    else{

        ScrollTop.button.classList.add(

            "desktop"

        );

        ScrollTop.button.style.right="30px";

        ScrollTop.button.style.bottom="30px";

        ScrollTop.button.style.width="60px";

        ScrollTop.button.style.height="60px";

    }

}

/* ===========================================================
   RESIZE
=========================================================== */

function initializeResize(){

    window.addEventListener(

        "resize",

        debounceResponsive,

        {

            passive:true

        }

    );

}

let responsiveTimer=null;

function debounceResponsive(){

    clearTimeout(

        responsiveTimer

    );

    responsiveTimer=setTimeout(()=>{

        refreshResponsive();

    },150);

}

/* ===========================================================
   ORIENTATION CHANGE
=========================================================== */

function initializeOrientationChange(){

    window.addEventListener(

        "orientationchange",

        ()=>{

            setTimeout(

                refreshResponsive,

                200

            );

        }

    );

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshResponsive(){

    detectDevice();

    detectTouch();

    detectOrientation();

    applyResponsive();

}

/* ===========================================================
   SAFE AREA
=========================================================== */

function applySafeArea(){

    if(

        !ResponsiveEngine.touch ||

        !ScrollTop.button

    ){

        return;

    }

    ScrollTop.button.style.bottom=

        "calc(env(safe-area-inset-bottom,0px)+20px)";

}

/* ===========================================================
   ENABLE / DISABLE
=========================================================== */

function enableAdaptive(){

    ResponsiveEngine.adaptive=true;

    applyResponsive();

}

function disableAdaptive(){

    ResponsiveEngine.adaptive=false;

}

/* ===========================================================
   STATUS
=========================================================== */

function responsiveStatus(){

    return{

        initialized:

            ResponsiveEngine.initialized,

        mobile:

            ResponsiveEngine.mobile,

        tablet:

            ResponsiveEngine.tablet,

        desktop:

            ResponsiveEngine.desktop,

        touch:

            ResponsiveEngine.touch,

        orientation:

            ResponsiveEngine.orientation,

        adaptive:

            ResponsiveEngine.adaptive

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeResponsive();

        applySafeArea();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ScrollTopManager,

    {

        responsive:{

            init:

                initializeResponsive,

            refresh:

                refreshResponsive,

            apply:

                applyResponsive,

            enable:

                enableAdaptive,

            disable:

                disableAdaptive,

            safeArea:

                applySafeArea,

            status:

                responsiveStatus

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
 assets/js/scrolltop.js
 Part 7
 Auto Hide • Auto Show • Smart Visibility
===========================================================
*/

"use strict";

/* ===========================================================
   AUTO HIDE ENGINE
=========================================================== */

const AutoHideEngine={

    initialized:false,

    enabled:true,

    idleDelay:2000,

    lastActivity:Date.now(),

    timer:null,

    hidden:false,

    scrollThreshold:10,

    previousScroll:0

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeAutoHide(){

    initializeActivityEvents();

    initializeScrollDirection();

    startIdleWatcher();

    AutoHideEngine.initialized=true;

}

/* ===========================================================
   ACTIVITY EVENTS
=========================================================== */

function initializeActivityEvents(){

    [

        "mousemove",

        "touchstart",

        "keydown",

        "wheel"

    ].forEach(event=>{

        document.addEventListener(

            event,

            resetIdleTimer,

            {

                passive:true

            }

        );

    });

}

/* ===========================================================
   RESET TIMER
=========================================================== */

function resetIdleTimer(){

    AutoHideEngine.lastActivity=

        Date.now();

    showScrollButton();

}

/* ===========================================================
   IDLE WATCHER
=========================================================== */

function startIdleWatcher(){

    clearInterval(

        AutoHideEngine.timer

    );

    AutoHideEngine.timer=

        setInterval(()=>{

            if(

                !AutoHideEngine.enabled ||

                !SCROLLTOP_CONFIG.autoHide

            ){

                return;

            }

            const idle=

                Date.now()-

                AutoHideEngine.lastActivity;

            if(

                idle>=

                AutoHideEngine.idleDelay

            ){

                hideScrollButton();

            }

        },500);

}

/* ===========================================================
   SCROLL DIRECTION
=========================================================== */

function initializeScrollDirection(){

    window.addEventListener(

        "scroll",

        handleAutoHideScroll,

        {

            passive:true

        }

    );

}

function handleAutoHideScroll(){

    const current=

        window.pageYOffset||

        document.documentElement.scrollTop;

    if(

        Math.abs(

            current-

            AutoHideEngine.previousScroll

        )<

        AutoHideEngine.scrollThreshold

    ){

        return;

    }

    if(

        current<

        AutoHideEngine.previousScroll

    ){

        showScrollButton();

    }

    else{

        if(

            current>

            SCROLLTOP_CONFIG.showOffset

        ){

            hideScrollButton();

        }

    }

    AutoHideEngine.previousScroll=

        current;

    AutoHideEngine.lastActivity=

        Date.now();

}

/* ===========================================================
   SHOW
=========================================================== */

function showScrollButton(){

    if(

        !ScrollTop.button ||

        !AutoHideEngine.hidden

    ){

        return;

    }

    ScrollTop.button.classList.remove(

        "scroll-hidden"

    );

    ScrollTop.button.classList.add(

        "scroll-visible"

    );

    ScrollTop.button.style.opacity="1";

    ScrollTop.button.style.pointerEvents="auto";

    AutoHideEngine.hidden=false;

}

/* ===========================================================
   HIDE
=========================================================== */

function hideScrollButton(){

    if(

        !ScrollTop.button ||

        AutoHideEngine.hidden

    ){

        return;

    }

    ScrollTop.button.classList.remove(

        "scroll-visible"

    );

    ScrollTop.button.classList.add(

        "scroll-hidden"

    );

    ScrollTop.button.style.opacity="0";

    ScrollTop.button.style.pointerEvents="none";

    AutoHideEngine.hidden=true;

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableAutoHide(){

    AutoHideEngine.enabled=true;

}

/* ===========================================================
   DISABLE
=========================================================== */

function disableAutoHide(){

    AutoHideEngine.enabled=false;

    showScrollButton();

}

/* ===========================================================
   SET IDLE DELAY
=========================================================== */

function setIdleDelay(delay){

    AutoHideEngine.idleDelay=

        Math.max(

            500,

            Number(delay)||2000

        );

}

/* ===========================================================
   STATUS
=========================================================== */

function autoHideStatus(){

    return{

        initialized:

            AutoHideEngine.initialized,

        enabled:

            AutoHideEngine.enabled,

        hidden:

            AutoHideEngine.hidden,

        idleDelay:

            AutoHideEngine.idleDelay,

        lastActivity:

            AutoHideEngine.lastActivity

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeAutoHide();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ScrollTopManager,

    {

        autoHide:{

            init:

                initializeAutoHide,

            show:

                showScrollButton,

            hide:

                hideScrollButton,

            enable:

                enableAutoHide,

            disable:

                disableAutoHide,

            delay:

                setIdleDelay,

            status:

                autoHideStatus

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
 assets/js/scrolltop.js
 Part 8
 Accessibility • Keyboard Support • Focus Management
===========================================================
*/

"use strict";

/* ===========================================================
   ACCESSIBILITY ENGINE
=========================================================== */

const AccessibilityEngine={

    initialized:false,

    keyboardEnabled:true,

    announceEnabled:true,

    lastFocused:null,

    focusableElements:[]

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeAccessibility(){

    collectFocusableElements();

    initializeARIA();

    initializeKeyboard();

    initializeFocusTracking();

    AccessibilityEngine.initialized=true;

}

/* ===========================================================
   FOCUSABLE ELEMENTS
=========================================================== */

function collectFocusableElements(){

    AccessibilityEngine.focusableElements=[

        ...document.querySelectorAll(

            'a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])'

        )

    ];

}

/* ===========================================================
   ARIA
=========================================================== */

function initializeARIA(){

    if(

        !ScrollTop.button

    ){

        return;

    }

    ScrollTop.button.setAttribute(

        "role",

        "button"

    );

    ScrollTop.button.setAttribute(

        "tabindex",

        "0"

    );

    ScrollTop.button.setAttribute(

        "aria-label",

        "Scroll to top"

    );

    ScrollTop.button.setAttribute(

        "aria-live",

        "polite"

    );

    ScrollTop.button.setAttribute(

        "aria-hidden",

        "true"

    );

}

/* ===========================================================
   UPDATE ARIA
=========================================================== */

function updateARIA(){

    if(

        !ScrollTop.button

    ){

        return;

    }

    ScrollTop.button.setAttribute(

        "aria-hidden",

        ScrollTopState.visible

            ? "false"

            : "true"

    );

}

/* ===========================================================
   KEYBOARD
=========================================================== */

function initializeKeyboard(){

    if(

        !AccessibilityEngine.keyboardEnabled

    ){

        return;

    }

    document.addEventListener(

        "keydown",

        keyboardHandler

    );

}

function keyboardHandler(event){

    if(

        document.activeElement!==

        ScrollTop.button

    ){

        return;

    }

    switch(event.key){

        case "Enter":

        case " ":

            event.preventDefault();

            scrollToTop();

            break;

        case "Escape":

            restoreFocus();

            break;

        case "Home":

            event.preventDefault();

            scrollToTop();

            break;

    }

}

/* ===========================================================
   FOCUS TRACKING
=========================================================== */

function initializeFocusTracking(){

    document.addEventListener(

        "focusin",

        event=>{

            AccessibilityEngine.lastFocused=

                event.target;

        }

    );

}

/* ===========================================================
   FOCUS HELPERS
=========================================================== */

function focusButton(){

    ScrollTop.button?.focus();

}

function restoreFocus(){

    AccessibilityEngine.lastFocused?.focus();

}

/* ===========================================================
   ANNOUNCEMENT
=========================================================== */

function announce(message){

    if(

        !AccessibilityEngine.announceEnabled

    ){

        return;

    }

    let region=

        document.getElementById(

            "scrolltop-live-region"

        );

    if(

        !region

    ){

        region=

            document.createElement(

                "div"

            );

        region.id=

            "scrolltop-live-region";

        region.setAttribute(

            "aria-live",

            "polite"

        );

        region.setAttribute(

            "aria-atomic",

            "true"

        );

        region.style.position="absolute";

        region.style.left="-9999px";

        document.body.appendChild(

            region

        );

    }

    region.textContent=

        message;

}

/* ===========================================================
   ENABLE / DISABLE
=========================================================== */

function enableKeyboard(){

    AccessibilityEngine.keyboardEnabled=true;

}

function disableKeyboard(){

    AccessibilityEngine.keyboardEnabled=false;

}

function enableAnnouncements(){

    AccessibilityEngine.announceEnabled=true;

}

function disableAnnouncements(){

    AccessibilityEngine.announceEnabled=false;

}

/* ===========================================================
   STATUS
=========================================================== */

function accessibilityStatus(){

    return{

        initialized:

            AccessibilityEngine.initialized,

        keyboard:

            AccessibilityEngine.keyboardEnabled,

        announcements:

            AccessibilityEngine.announceEnabled,

        focusables:

            AccessibilityEngine.focusableElements.length

    };

}

/* ===========================================================
   EVENTS
=========================================================== */

document.addEventListener(

    "scroll",

    ()=>{

        updateARIA();

    },

    {

        passive:true

    }

);

document.addEventListener(

    "scrolltop:clicked",

    ()=>{

        announce(

            "Scrolling to top"

        );

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

    window.ScrollTopManager,

    {

        accessibility:{

            init:

                initializeAccessibility,

            aria:

                updateARIA,

            focus:

                focusButton,

            restore:

                restoreFocus,

            announce,

            enableKeyboard,

            disableKeyboard,

            enableAnnouncements,

            disableAnnouncements,

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
 assets/js/scrolltop.js
 Part 9
 Performance • Optimization • Lifecycle Manager
===========================================================
*/

"use strict";

/* ===========================================================
   PERFORMANCE ENGINE
=========================================================== */

const PerformanceEngine={

    initialized:false,

    enabled:true,

    visible:true,

    paused:false,

    reducedMotion:false,

    mobile:false,

    fps:60,

    frameCount:0,

    lastFrame:performance.now(),

    observer:null,

    resizeObserver:null

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializePerformance(){

    detectEnvironment();

    initializeVisibility();

    initializeIntersection();

    initializeResizeObserver();

    monitorFPS();

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

}

/* ===========================================================
   VISIBILITY
=========================================================== */

function initializeVisibility(){

    document.addEventListener(

        "visibilitychange",

        ()=>{

            if(document.hidden){

                pausePerformance();

            }else{

                resumePerformance();

            }

        }

    );

}

/* ===========================================================
   INTERSECTION OBSERVER
=========================================================== */

function initializeIntersection(){

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

                        entry.target===

                        ScrollTop.button

                    ){

                        PerformanceEngine.visible=

                            entry.isIntersecting;

                    }

                });

            },

            {

                threshold:0.1

            }

        );

    if(

        ScrollTop.button

    ){

        PerformanceEngine.observer.observe(

            ScrollTop.button

        );

    }

}

/* ===========================================================
   RESIZE OBSERVER
=========================================================== */

function initializeResizeObserver(){

    if(

        !window.ResizeObserver ||

        !ScrollTop.button

    ){

        return;

    }

    PerformanceEngine.resizeObserver=

        new ResizeObserver(

            ()=>{

                refreshResponsive?.();

            }

        );

    PerformanceEngine.resizeObserver.observe(

        document.body

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
   PAUSE
=========================================================== */

function pausePerformance(){

    PerformanceEngine.paused=true;

    ScrollTop.button?.classList.add(

        "performance-paused"

    );

}

/* ===========================================================
   RESUME
=========================================================== */

function resumePerformance(){

    PerformanceEngine.paused=false;

    ScrollTop.button?.classList.remove(

        "performance-paused"

    );

}

/* ===========================================================
   OPTIMIZE
=========================================================== */

function optimizePerformance(){

    if(

        PerformanceEngine.reducedMotion

    ){

        disableAnimation?.();

    }

    if(

        PerformanceEngine.mobile

    ){

        setAnimationDuration?.(

            150

        );

    }

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

    optimizePerformance();

}

/* ===========================================================
   CLEANUP
=========================================================== */

function cleanupPerformance(){

    PerformanceEngine.observer

        ?.disconnect();

    PerformanceEngine.resizeObserver

        ?.disconnect();

}

/* ===========================================================
   STATUS
=========================================================== */

function performanceStatus(){

    return{

        initialized:

            PerformanceEngine.initialized,

        visible:

            PerformanceEngine.visible,

        paused:

            PerformanceEngine.paused,

        mobile:

            PerformanceEngine.mobile,

        reducedMotion:

            PerformanceEngine.reducedMotion,

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

    window.ScrollTopManager,

    {

        performance:{

            init:

                initializePerformance,

            pause:

                pausePerformance,

            resume:

                resumePerformance,

            optimize:

                optimizePerformance,

            refresh:

                refreshPerformance,

            cleanup:

                cleanupPerformance,

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
 assets/js/scrolltop.js
 Part 10
 Analytics • Statistics • Usage Tracking
===========================================================
*/

"use strict";

/* ===========================================================
   ANALYTICS ENGINE
=========================================================== */

const AnalyticsEngine={

    initialized:false,

    startTime:Date.now(),

    totalClicks:0,

    totalScrolls:0,

    totalDistance:0,

    highestScroll:0,

    averageScroll:0,

    lastScroll:0,

    scrollSessions:0,

    visibleCount:0,

    hiddenCount:0,

    reportHistory:[]

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeAnalytics(){

    AnalyticsEngine.lastScroll=

        window.pageYOffset||

        document.documentElement.scrollTop;

    AnalyticsEngine.initialized=true;

}

/* ===========================================================
   TRACK SCROLL
=========================================================== */

function trackScroll(){

    const current=

        window.pageYOffset||

        document.documentElement.scrollTop;

    AnalyticsEngine.totalScrolls++;

    AnalyticsEngine.totalDistance+=

        Math.abs(

            current-

            AnalyticsEngine.lastScroll

        );

    AnalyticsEngine.highestScroll=

        Math.max(

            AnalyticsEngine.highestScroll,

            current

        );

    AnalyticsEngine.averageScroll=

        Math.round(

            AnalyticsEngine.totalDistance/

            Math.max(

                AnalyticsEngine.totalScrolls,

                1

            )

        );

    AnalyticsEngine.lastScroll=current;

}

/* ===========================================================
   TRACK CLICK
=========================================================== */

function trackClick(){

    AnalyticsEngine.totalClicks++;

}

/* ===========================================================
   VISIBILITY
=========================================================== */

function trackVisible(){

    AnalyticsEngine.visibleCount++;

}

function trackHidden(){

    AnalyticsEngine.hiddenCount++;

}

/* ===========================================================
   SESSION
=========================================================== */

function startSession(){

    AnalyticsEngine.scrollSessions++;

}

function sessionDuration(){

    return Math.floor(

        (

            Date.now()-

            AnalyticsEngine.startTime

        )/1000

    );

}

/* ===========================================================
   EXPORT
=========================================================== */

function exportAnalytics(){

    return{

        duration:

            sessionDuration(),

        clicks:

            AnalyticsEngine.totalClicks,

        scrolls:

            AnalyticsEngine.totalScrolls,

        highest:

            AnalyticsEngine.highestScroll,

        average:

            AnalyticsEngine.averageScroll,

        distance:

            AnalyticsEngine.totalDistance,

        sessions:

            AnalyticsEngine.scrollSessions,

        visible:

            AnalyticsEngine.visibleCount,

        hidden:

            AnalyticsEngine.hiddenCount

    };

}

/* ===========================================================
   RESET
=========================================================== */

function resetAnalytics(){

    AnalyticsEngine.totalClicks=0;

    AnalyticsEngine.totalScrolls=0;

    AnalyticsEngine.totalDistance=0;

    AnalyticsEngine.highestScroll=0;

    AnalyticsEngine.averageScroll=0;

    AnalyticsEngine.visibleCount=0;

    AnalyticsEngine.hiddenCount=0;

    AnalyticsEngine.scrollSessions=0;

    AnalyticsEngine.startTime=

        Date.now();

}

/* ===========================================================
   SAVE REPORT
=========================================================== */

function saveAnalyticsReport(){

    AnalyticsEngine.reportHistory.push(

        exportAnalytics()

    );

}

/* ===========================================================
   REPORT
=========================================================== */

function analyticsReport(){

    const report=

        exportAnalytics();

    console.table(

        report

    );

    saveAnalyticsReport();

}

/* ===========================================================
   STATUS
=========================================================== */

function analyticsStatus(){

    return{

        initialized:

            AnalyticsEngine.initialized,

        clicks:

            AnalyticsEngine.totalClicks,

        scrolls:

            AnalyticsEngine.totalScrolls,

        distance:

            AnalyticsEngine.totalDistance,

        highest:

            AnalyticsEngine.highestScroll,

        duration:

            sessionDuration(),

        sessions:

            AnalyticsEngine.scrollSessions

    };

}

/* ===========================================================
   EVENTS
=========================================================== */

window.addEventListener(

    "scroll",

    trackScroll,

    {

        passive:true

    }

);

document.addEventListener(

    "scrolltop:clicked",

    trackClick

);

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(document.hidden){

            trackHidden();

        }else{

            trackVisible();

        }

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeAnalytics();

        startSession();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ScrollTopManager,

    {

        analytics:{

            init:

                initializeAnalytics,

            trackScroll,

            trackClick,

            trackVisible,

            trackHidden,

            export:

                exportAnalytics,

            reset:

                resetAnalytics,

            report:

                analyticsReport,

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
 assets/js/scrolltop.js
 Part 11
 Utilities • Debug • Report • Public API
===========================================================
*/

"use strict";

/* ===========================================================
   INFORMATION
=========================================================== */

const ScrollTopInfo={

    name:"ScrollTop Manager",

    version:"1.0.0",

    author:"Investment Technology Indonesia",

    environment:"production",

    build:"1.0.0",

    license:"MIT"

};

/* ===========================================================
   DEBUG
=========================================================== */

function enableDebug(){

    ScrollTopApp.debug=true;

    scrollLog(

        "Debug mode enabled."

    );

}

function disableDebug(){

    ScrollTopApp.debug=false;

}

function debug(...args){

    if(!ScrollTopApp.debug){

        return;

    }

    console.log(

        "[ScrollTop]",

        ...args

    );

}

function warn(...args){

    console.warn(

        "[ScrollTop]",

        ...args

    );

}

function error(...args){

    console.error(

        "[ScrollTop]",

        ...args

    );

}

/* ===========================================================
   UTILITIES
=========================================================== */

function uniqueID(){

    if(window.crypto?.randomUUID){

        return crypto.randomUUID();

    }

    return "scrolltop-"+

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

function timestamp(){

    return new Date()

        .toISOString();

}

function formatMilliseconds(ms){

    if(ms<1000){

        return `${ms} ms`;

    }

    return `${

        (ms/1000)

        .toFixed(2)

    } s`;

}

function clone(object){

    return JSON.parse(

        JSON.stringify(object)

    );

}

/* ===========================================================
   REPORT
=========================================================== */

function generateReport(){

    return{

        info:

            clone(

                ScrollTopInfo

            ),

        application:{

            initialized:

                ScrollTopApp.initialized,

            running:

                ScrollTopApp.running,

            debug:

                ScrollTopApp.debug

        },

        scroll:

            scrollStatus(),

        smooth:

            smoothStatus(),

        progress:

            progressStatus(),

        animation:

            animationStatus(),

        responsive:

            responsiveStatus(),

        autoHide:

            autoHideStatus(),

        accessibility:

            accessibilityStatus(),

        performance:

            performanceStatus(),

        analytics:

            analyticsStatus(),

        generated:

            timestamp()

    };

}

function printReport(){

    console.group(

        "ScrollTop Report"

    );

    console.table(

        generateReport()

    );

    console.groupEnd();

}

/* ===========================================================
   RESET
=========================================================== */

function resetManager(){

    resetProgress?.();

    resetAnalytics?.();

    refreshScrollTop?.();

    refreshPerformance?.();

    scrollLog(

        "Manager reset."

    );

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroyManager(){

    cleanupPerformance?.();

    destroyScrollTop?.();

    scrollLog(

        "Manager destroyed."

    );

}

/* ===========================================================
   RESTART
=========================================================== */

function restartManager(){

    destroyManager();

    initializeScrollTop?.();

    initializeScrollEngine?.();

    initializeSmoothScroll?.();

    initializeProgress?.();

    initializeAnimation?.();

    initializeResponsive?.();

    initializeAutoHide?.();

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

            ScrollTopApp.initialized,

        visible:

            ScrollTopState.visible,

        scrolling:

            ScrollTopState.scrolling,

        progress:

            ScrollTopState.progress,

        clicks:

            ScrollTopState.clicks

    };

}

/* ===========================================================
   VERSION
=========================================================== */

function version(){

    return ScrollTopInfo.version;

}

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ScrollTopManager,

    {

        info:

            ScrollTopInfo,

        ready,

        version,

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

        uniqueID,

        timestamp,

        formatMilliseconds

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        debug(

            "Utilities initialized."

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
 assets/js/scrolltop.js
 Part 12
 Final Initialization • Cleanup • Export • End of File
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION INITIALIZER
=========================================================== */

function initializeScrollTopManager(){

    if(ScrollTopApp.initialized){

        scrollLog(

            "ScrollTop Manager already initialized."

        );

        return;

    }

    scrollLog(

        "Initializing ScrollTop Manager..."

    );

    initializeScrollTop?.();

    initializeScrollEngine?.();

    initializeSmoothScroll?.();

    initializeProgress?.();

    initializeAnimation?.();

    initializeResponsive?.();

    initializeAutoHide?.();

    initializeAccessibility?.();

    initializePerformance?.();

    initializeAnalytics?.();

    updateScroll?.();

    updateProgress?.();

    ScrollTopApp.running=true;

    ScrollTopApp.initialized=true;

    scrollLog(

        "ScrollTop Manager Ready."

    );

}

/* ===========================================================
   GLOBAL EVENTS
=========================================================== */

window.addEventListener(

    "load",

    ()=>{

        refreshScrollTop?.();

        refreshPerformance?.();

        updateProgress?.();

        scrollLog(

            "Window Loaded"

        );

    }

);

window.addEventListener(

    "pageshow",

    ()=>{

        refreshScrollTop?.();

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

        debug?.(

            "Window blurred."

        );

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

function cleanupScrollTopManager(){

    cleanupPerformance?.();

    scrollLog(

        "Cleanup complete."

    );

}

/* ===========================================================
   BEFORE UNLOAD
=========================================================== */

window.addEventListener(

    "beforeunload",

    ()=>{

        cleanupScrollTopManager();

    }

);

/* ===========================================================
   FREEZE CONFIG
=========================================================== */

Object.freeze(

    SCROLLTOP_CONFIG

);

Object.freeze(

    ScrollTopInfo

);

/* ===========================================================
   EXPORT
=========================================================== */

window.ScrollTopManager=

Object.assign(

    window.ScrollTopManager||{},

    {

        initialize:

            initializeScrollTopManager,

        cleanup:

            cleanupScrollTopManager,

        version:

            ()=>ScrollTopInfo.version,

        app:

            ScrollTopApp,

        config:

            SCROLLTOP_CONFIG,

        state:

            ScrollTopState,

        info:

            ScrollTopInfo,

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

        initializeScrollTopManager();

    }

);

/* ===========================================================
   FINAL LOG
=========================================================== */

scrollLog(

"========================================"

);

scrollLog(

"Investment Technology Indonesia"

);

scrollLog(

"ScrollTop Manager"

);

scrollLog(

"Version:",

ScrollTopInfo.version

);

scrollLog(

"Environment:",

ScrollTopInfo.environment

);

scrollLog(

"========================================"

);

/* ===========================================================
   FEATURES
=========================================================== */

/*
✔ Scroll To Top Button
✔ Smooth Scrolling Animation
✔ Scroll Progress Indicator
✔ Circular Progress Ring
✔ Auto Hide / Auto Show
✔ Fade & Scale Animation
✔ Responsive Layout
✔ Mobile Optimization
✔ Safe Area Support
✔ Keyboard Accessibility
✔ ARIA Support
✔ Focus Management
✔ Performance Optimization
✔ Visibility Detection
✔ Analytics & Statistics
✔ Debug Utilities
✔ Report Generator
✔ Public API
✔ ES6+ Modern JavaScript
✔ Production Ready
*/

/* ===========================================================
   END OF FILE
   assets/js/scrolltop.js
===========================================================
*/