/*!
===========================================================
 Investment Technology Indonesia
 assets/js/slider.js
 Part 1
 Core • Config • Initialization
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION
=========================================================== */

const SliderApp={

    name:"Investment Technology Indonesia Slider",

    version:"1.0.0",

    initialized:false,

    debug:false

};

/* ===========================================================
   CONFIG
=========================================================== */

const SLIDER_CONFIG={

    selector:".slider",

    slideSelector:".slide",

    wrapperSelector:".slider-wrapper",

    autoplay:true,

    autoplaySpeed:5000,

    transitionSpeed:600,

    pauseOnHover:true,

    infinite:true,

    keyboard:true,

    touch:true,

    draggable:true,

    lazyLoad:true,

    loop:true,

    effect:"slide",

    startIndex:0

};

/* ===========================================================
   STATE
=========================================================== */

const SliderState={

    current:0,

    previous:0,

    total:0,

    playing:false,

    paused:false,

    dragging:false,

    initialized:false,

    timer:null,

    touchStartX:0,

    touchEndX:0,

    dragStartX:0,

    translate:0

};

/* ===========================================================
   ELEMENTS
=========================================================== */

const Slider={

    container:document.querySelector(

        SLIDER_CONFIG.selector

    ),

    wrapper:null,

    slides:[],

    prev:null,

    next:null,

    dots:null,

    progress:null

};

/* ===========================================================
   LOGGER
=========================================================== */

function sliderLog(...message){

    if(!SliderApp.debug){

        return;

    }

    console.log(

        "[Slider]",

        ...message

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

    if(!Slider.container){

        return false;

    }

    Slider.wrapper=$(

        SLIDER_CONFIG.wrapperSelector,

        Slider.container

    );

    Slider.slides=$$(

        SLIDER_CONFIG.slideSelector,

        Slider.container

    );

    Slider.prev=$(

        ".slider-prev",

        Slider.container

    );

    Slider.next=$(

        ".slider-next",

        Slider.container

    );

    Slider.dots=$(

        ".slider-pagination",

        Slider.container

    );

    Slider.progress=$(

        ".slider-progress-bar",

        Slider.container

    );

    SliderState.total=

        Slider.slides.length;

    return true;

}

/* ===========================================================
   PREPARE
=========================================================== */

function prepareSlides(){

    Slider.slides.forEach(

        (slide,index)=>{

            slide.dataset.index=index;

            removeClass(

                slide,

                "active"

            );

            removeClass(

                slide,

                "previous"

            );

            removeClass(

                slide,

                "next"

            );

        }

    );

}

/* ===========================================================
   INITIAL SLIDE
=========================================================== */

function setInitialSlide(){

    SliderState.current=

        Math.min(

            SLIDER_CONFIG.startIndex,

            SliderState.total-1

        );

    updateSlides();

}

/* ===========================================================
   UPDATE
=========================================================== */

function updateSlides(){

    Slider.slides.forEach(

        (slide,index)=>{

            removeClass(

                slide,

                "active"

            );

            removeClass(

                slide,

                "previous"

            );

            removeClass(

                slide,

                "next"

            );

            if(

                index===SliderState.current

            ){

                addClass(

                    slide,

                    "active"

                );

            }

            if(

                index===

                SliderState.current-1

            ){

                addClass(

                    slide,

                    "previous"

                );

            }

            if(

                index===

                SliderState.current+1

            ){

                addClass(

                    slide,

                    "next"

                );

            }

        }

    );

}

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeSlider(){

    if(

        SliderApp.initialized

    ){

        return;

    }

    if(

        !initializeElements()

    ){

        return;

    }

    SliderApp.initialized=true;

    SliderState.initialized=true;

    prepareSlides();

    setInitialSlide();

    sliderLog(

        "Slider Initialized"

    );

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroySlider(){

    clearTimeout(

        SliderState.timer

    );

    Slider.slides.forEach(slide=>{

        slide.className="slide";

    });

    SliderState.initialized=false;

    sliderLog(

        "Slider Destroyed"

    );

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshSlider(){

    initializeElements();

    prepareSlides();

    updateSlides();

    sliderLog(

        "Slider Refreshed"

    );

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeSlider();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

window.SliderManager={

    app:SliderApp,

    config:SLIDER_CONFIG,

    state:SliderState,

    slider:Slider,

    init:initializeSlider,

    refresh:refreshSlider,

    destroy:destroySlider

};

/* ===========================================================
   END PART 1
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/slider.js
 Part 2
 Hero Slider • Auto Play • Pause / Resume
===========================================================
*/

"use strict";

/* ===========================================================
   AUTOPLAY
=========================================================== */

const AutoPlay={

    enabled:SLIDER_CONFIG.autoplay,

    running:false,

    interval:SLIDER_CONFIG.autoplaySpeed

};

/* ===========================================================
   START
=========================================================== */

function startAutoplay(){

    if(

        !AutoPlay.enabled ||

        SliderState.total<=1

    ){

        return;

    }

    stopAutoplay();

    AutoPlay.running=true;

    SliderState.playing=true;

    SliderState.timer=setInterval(

        ()=>{

            nextSlide();

        },

        AutoPlay.interval

    );

    sliderLog(

        "Autoplay Started"

    );

}

/* ===========================================================
   STOP
=========================================================== */

function stopAutoplay(){

    clearInterval(

        SliderState.timer

    );

    SliderState.timer=null;

    AutoPlay.running=false;

    SliderState.playing=false;

}

/* ===========================================================
   PAUSE
=========================================================== */

function pauseAutoplay(){

    if(!AutoPlay.running){

        return;

    }

    SliderState.paused=true;

    stopAutoplay();

}

/* ===========================================================
   RESUME
=========================================================== */

function resumeAutoplay(){

    if(

        !SliderState.paused

    ){

        return;

    }

    SliderState.paused=false;

    startAutoplay();

}

/* ===========================================================
   NEXT
=========================================================== */

function nextSlide(){

    SliderState.previous=

        SliderState.current;

    SliderState.current++;

    if(

        SliderState.current>=

        SliderState.total

    ){

        SliderState.current=

            SLIDER_CONFIG.loop

            ? 0

            : SliderState.total-1;

    }

    updateSlides();

    updatePagination?.();

    updateProgress?.();

}

/* ===========================================================
   PREVIOUS
=========================================================== */

function previousSlide(){

    SliderState.previous=

        SliderState.current;

    SliderState.current--;

    if(

        SliderState.current<0

    ){

        SliderState.current=

            SLIDER_CONFIG.loop

            ? SliderState.total-1

            : 0;

    }

    updateSlides();

    updatePagination?.();

    updateProgress?.();

}

/* ===========================================================
   GOTO
=========================================================== */

function goToSlide(index){

    if(

        index<0 ||

        index>=SliderState.total

    ){

        return;

    }

    SliderState.previous=

        SliderState.current;

    SliderState.current=index;

    updateSlides();

    updatePagination?.();

    updateProgress?.();

}

/* ===========================================================
   HERO EFFECT
=========================================================== */

function animateHeroSlide(){

    const current=

        Slider.slides[

            SliderState.current

        ];

    if(!current){

        return;

    }

    addClass(

        current,

        "hero-active"

    );

    setTimeout(()=>{

        removeClass(

            current,

            "hero-active"

        );

    },SLIDER_CONFIG.transitionSpeed);

}

/* ===========================================================
   CHANGE
=========================================================== */

function changeSlide(index){

    goToSlide(index);

    animateHeroSlide();

}

/* ===========================================================
   HOVER
=========================================================== */

function initializeHoverControl(){

    if(

        !SLIDER_CONFIG.pauseOnHover ||

        !Slider.container

    ){

        return;

    }

    on(

        Slider.container,

        "mouseenter",

        pauseAutoplay

    );

    on(

        Slider.container,

        "mouseleave",

        resumeAutoplay

    );

}

/* ===========================================================
   VISIBILITY
=========================================================== */

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(document.hidden){

            pauseAutoplay();

        }else{

            resumeAutoplay();

        }

    }

);

/* ===========================================================
   WINDOW
=========================================================== */

window.addEventListener(

    "focus",

    resumeAutoplay

);

window.addEventListener(

    "blur",

    pauseAutoplay

);

/* ===========================================================
   STATUS
=========================================================== */

function autoplayStatus(){

    return{

        enabled:

            AutoPlay.enabled,

        running:

            AutoPlay.running,

        paused:

            SliderState.paused,

        interval:

            AutoPlay.interval

    };

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableAutoplay(){

    AutoPlay.enabled=true;

    startAutoplay();

}

/* ===========================================================
   DISABLE
=========================================================== */

function disableAutoplay(){

    AutoPlay.enabled=false;

    stopAutoplay();

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeHoverControl();

        startAutoplay();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.SliderManager,

    {

        next:nextSlide,

        previous:previousSlide,

        goTo:goToSlide,

        change:changeSlide,

        autoplay:{

            start:startAutoplay,

            stop:stopAutoplay,

            pause:pauseAutoplay,

            resume:resumeAutoplay,

            enable:enableAutoplay,

            disable:disableAutoplay,

            status:autoplayStatus

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
 assets/js/slider.js
 Part 3
 Navigation • Keyboard • Mouse Wheel
===========================================================
*/

"use strict";

/* ===========================================================
   NAVIGATION
=========================================================== */

const Navigation={

    enabled:true,

    keyboard:SLIDER_CONFIG.keyboard,

    wheel:true,

    buttons:true

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeNavigation(){

    initializeButtons();

    initializeKeyboard();

    initializeMouseWheel();

}

/* ===========================================================
   BUTTONS
=========================================================== */

function initializeButtons(){

    if(!Navigation.buttons){

        return;

    }

    if(Slider.prev){

        on(

            Slider.prev,

            "click",

            ()=>{

                previousSlide();

                restartAutoplay();

            }

        );

    }

    if(Slider.next){

        on(

            Slider.next,

            "click",

            ()=>{

                nextSlide();

                restartAutoplay();

            }

        );

    }

}

/* ===========================================================
   KEYBOARD
=========================================================== */

function initializeKeyboard(){

    if(!Navigation.keyboard){

        return;

    }

    document.addEventListener(

        "keydown",

        handleKeyboardNavigation

    );

}

function handleKeyboardNavigation(event){

    switch(event.key){

        case "ArrowLeft":

            previousSlide();

            restartAutoplay();

            break;

        case "ArrowRight":

            nextSlide();

            restartAutoplay();

            break;

        case "Home":

            goToSlide(0);

            restartAutoplay();

            break;

        case "End":

            goToSlide(

                SliderState.total-1

            );

            restartAutoplay();

            break;

        case " ":

            event.preventDefault();

            toggleAutoplay();

            break;

    }

}

/* ===========================================================
   MOUSE WHEEL
=========================================================== */

function initializeMouseWheel(){

    if(

        !Navigation.wheel ||

        !Slider.container

    ){

        return;

    }

    on(

        Slider.container,

        "wheel",

        handleMouseWheel,

        {

            passive:false

        }

    );

}

function handleMouseWheel(event){

    event.preventDefault();

    if(event.deltaY>0){

        nextSlide();

    }else{

        previousSlide();

    }

    restartAutoplay();

}

/* ===========================================================
   RESTART
=========================================================== */

function restartAutoplay(){

    if(

        !AutoPlay.enabled

    ){

        return;

    }

    stopAutoplay();

    startAutoplay();

}

/* ===========================================================
   TOGGLE
=========================================================== */

function toggleAutoplay(){

    if(

        AutoPlay.running

    ){

        pauseAutoplay();

    }else{

        resumeAutoplay();

    }

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableKeyboardNavigation(){

    Navigation.keyboard=true;

}

function disableKeyboardNavigation(){

    Navigation.keyboard=false;

}

/* ===========================================================
   ENABLE WHEEL
=========================================================== */

function enableMouseWheel(){

    Navigation.wheel=true;

}

function disableMouseWheel(){

    Navigation.wheel=false;

}

/* ===========================================================
   STATUS
=========================================================== */

function navigationStatus(){

    return{

        keyboard:

            Navigation.keyboard,

        wheel:

            Navigation.wheel,

        buttons:

            Navigation.buttons,

        enabled:

            Navigation.enabled

    };

}

/* ===========================================================
   SHORTCUTS
=========================================================== */

document.addEventListener(

    "keydown",

    event=>{

        if(

            event.altKey &&

            event.key==="1"

        ){

            goToSlide(0);

        }

        if(

            event.altKey &&

            event.key==="2"

        ){

            goToSlide(1);

        }

        if(

            event.altKey &&

            event.key==="3"

        ){

            goToSlide(2);

        }

    }

);

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeNavigation();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.SliderManager,

    {

        navigation:{

            init:

                initializeNavigation,

            restart:

                restartAutoplay,

            toggle:

                toggleAutoplay,

            enableKeyboard:

                enableKeyboardNavigation,

            disableKeyboard:

                disableKeyboardNavigation,

            enableWheel:

                enableMouseWheel,

            disableWheel:

                disableMouseWheel,

            status:

                navigationStatus

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
 assets/js/slider.js
 Part 4
 Pagination • Dots • Progress Bar
===========================================================
*/

"use strict";

/* ===========================================================
   PAGINATION
=========================================================== */

const Pagination={

    container:Slider.dots,

    dots:[],

    progress:Slider.progress,

    enabled:true

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializePagination(){

    if(

        !Pagination.enabled ||

        !Slider.container

    ){

        return;

    }

    createPagination();

    updatePagination();

    initializeProgressBar();

}

/* ===========================================================
   CREATE DOTS
=========================================================== */

function createPagination(){

    if(!Slider.dots){

        return;

    }

    Slider.dots.innerHTML="";

    Pagination.dots=[];

    Slider.slides.forEach((slide,index)=>{

        const dot=document.createElement("button");

        dot.type="button";

        dot.className="slider-dot";

        dot.dataset.index=index;

        dot.setAttribute(

            "aria-label",

            `Go to slide ${index+1}`

        );

        on(

            dot,

            "click",

            ()=>{

                goToSlide(index);

                restartAutoplay();

            }

        );

        Slider.dots.appendChild(dot);

        Pagination.dots.push(dot);

    });

}

/* ===========================================================
   UPDATE DOTS
=========================================================== */

function updatePagination(){

    Pagination.dots.forEach((dot,index)=>{

        removeClass(

            dot,

            "active"

        );

        dot.setAttribute(

            "aria-current",

            "false"

        );

        if(index===SliderState.current){

            addClass(

                dot,

                "active"

            );

            dot.setAttribute(

                "aria-current",

                "true"

            );

        }

    });

}

/* ===========================================================
   PROGRESS BAR
=========================================================== */

function initializeProgressBar(){

    if(!Slider.progress){

        return;

    }

    updateProgress();

}

/* ===========================================================
   UPDATE PROGRESS
=========================================================== */

function updateProgress(){

    if(!Slider.progress){

        return;

    }

    const percent=

        SliderState.total<=1

        ? 100

        : (

            SliderState.current/

            (SliderState.total-1)

        )*100;

    Slider.progress.style.width=

        `${percent}%`;

}

/* ===========================================================
   AUTOPLAY PROGRESS
=========================================================== */

let progressAnimation=null;

function animateProgressBar(){

    if(

        !Slider.progress ||

        !AutoPlay.enabled

    ){

        return;

    }

    cancelAnimationFrame(

        progressAnimation

    );

    Slider.progress.style.transition="none";

    Slider.progress.style.width="0%";

    requestAnimationFrame(()=>{

        Slider.progress.style.transition=

            `width ${AutoPlay.interval}ms linear`;

        Slider.progress.style.width="100%";

    });

}

function resetProgressAnimation(){

    if(!Slider.progress){

        return;

    }

    cancelAnimationFrame(

        progressAnimation

    );

    Slider.progress.style.transition="none";

    Slider.progress.style.width="0%";

}

/* ===========================================================
   FRACTION
=========================================================== */

function updateFractionCounter(){

    const current=$(

        ".slider-current",

        Slider.container

    );

    const total=$(

        ".slider-total",

        Slider.container

    );

    if(current){

        current.textContent=

            SliderState.current+1;

    }

    if(total){

        total.textContent=

            SliderState.total;

    }

}

/* ===========================================================
   STATUS
=========================================================== */

function paginationStatus(){

    return{

        totalDots:

            Pagination.dots.length,

        current:

            SliderState.current,

        progress:

            Slider.progress

                ? Slider.progress.style.width

                : null,

        enabled:

            Pagination.enabled

    };

}

/* ===========================================================
   ENABLE
=========================================================== */

function enablePagination(){

    Pagination.enabled=true;

    initializePagination();

}

function disablePagination(){

    Pagination.enabled=false;

    if(Slider.dots){

        Slider.dots.innerHTML="";

    }

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializePagination();

        updateFractionCounter();

        if(AutoPlay.enabled){

            animateProgressBar();

        }

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.SliderManager,

    {

        pagination:{

            init:

                initializePagination,

            create:

                createPagination,

            update:

                updatePagination,

            progress:

                updateProgress,

            animate:

                animateProgressBar,

            reset:

                resetProgressAnimation,

            fraction:

                updateFractionCounter,

            enable:

                enablePagination,

            disable:

                disablePagination,

            status:

                paginationStatus

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
 assets/js/slider.js
 Part 5
 Touch Swipe • Mouse Drag • Gesture Navigation
===========================================================
*/

"use strict";

/* ===========================================================
   TOUCH
=========================================================== */

const Touch={

    enabled:SLIDER_CONFIG.touch,

    startX:0,

    startY:0,

    endX:0,

    endY:0,

    threshold:60,

    dragging:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeTouch(){

    if(

        !Touch.enabled ||

        !Slider.container

    ){

        return;

    }

    on(

        Slider.container,

        "touchstart",

        handleTouchStart,

        {

            passive:true

        }

    );

    on(

        Slider.container,

        "touchmove",

        handleTouchMove,

        {

            passive:true

        }

    );

    on(

        Slider.container,

        "touchend",

        handleTouchEnd

    );

}

/* ===========================================================
   TOUCH START
=========================================================== */

function handleTouchStart(event){

    const touch=

        event.changedTouches[0];

    Touch.startX=

        touch.clientX;

    Touch.startY=

        touch.clientY;

}

/* ===========================================================
   TOUCH MOVE
=========================================================== */

function handleTouchMove(event){

    const touch=

        event.changedTouches[0];

    Touch.endX=

        touch.clientX;

    Touch.endY=

        touch.clientY;

}

/* ===========================================================
   TOUCH END
=========================================================== */

function handleTouchEnd(){

    const diffX=

        Touch.startX-

        Touch.endX;

    const diffY=

        Touch.startY-

        Touch.endY;

    if(

        Math.abs(diffX)<

        Touch.threshold ||

        Math.abs(diffX)<

        Math.abs(diffY)

    ){

        return;

    }

    if(diffX>0){

        nextSlide();

    }else{

        previousSlide();

    }

    restartAutoplay();

}

/* ===========================================================
   DRAG
=========================================================== */

const Drag={

    enabled:SLIDER_CONFIG.draggable,

    startX:0,

    currentX:0,

    active:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeDrag(){

    if(

        !Drag.enabled ||

        !Slider.wrapper

    ){

        return;

    }

    on(

        Slider.wrapper,

        "mousedown",

        dragStart

    );

    on(

        window,

        "mousemove",

        dragMove

    );

    on(

        window,

        "mouseup",

        dragEnd

    );

}

/* ===========================================================
   START
=========================================================== */

function dragStart(event){

    Drag.active=true;

    Drag.startX=

        event.clientX;

    Slider.wrapper.style.cursor=

        "grabbing";

}

/* ===========================================================
   MOVE
=========================================================== */

function dragMove(event){

    if(!Drag.active){

        return;

    }

    Drag.currentX=

        event.clientX;

}

/* ===========================================================
   END
=========================================================== */

function dragEnd(){

    if(!Drag.active){

        return;

    }

    const distance=

        Drag.currentX-

        Drag.startX;

    Slider.wrapper.style.cursor="";

    Drag.active=false;

    if(

        Math.abs(distance)<50

    ){

        return;

    }

    if(distance<0){

        nextSlide();

    }else{

        previousSlide();

    }

    restartAutoplay();

}

/* ===========================================================
   POINTER EVENTS
=========================================================== */

function initializePointerEvents(){

    if(!Slider.wrapper){

        return;

    }

    Slider.wrapper.style.touchAction=

        "pan-y";

    Slider.wrapper.style.userSelect=

        "none";

}

/* ===========================================================
   CURSOR
=========================================================== */

function updateCursor(){

    if(!Slider.wrapper){

        return;

    }

    Slider.wrapper.style.cursor=

        Drag.active

        ? "grabbing"

        : "grab";

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableTouch(){

    Touch.enabled=true;

}

function disableTouch(){

    Touch.enabled=false;

}

function enableDrag(){

    Drag.enabled=true;

}

function disableDrag(){

    Drag.enabled=false;

}

/* ===========================================================
   STATUS
=========================================================== */

function touchStatus(){

    return{

        touch:

            Touch.enabled,

        drag:

            Drag.enabled,

        threshold:

            Touch.threshold,

        dragging:

            Drag.active

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeTouch();

        initializeDrag();

        initializePointerEvents();

        updateCursor();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.SliderManager,

    {

        touch:{

            init:

                initializeTouch,

            enable:

                enableTouch,

            disable:

                disableTouch,

            status:

                touchStatus

        },

        drag:{

            init:

                initializeDrag,

            enable:

                enableDrag,

            disable:

                disableDrag

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
 assets/js/slider.js
 Part 6
 Infinite Loop • Clone Slides • Loop Engine
===========================================================
*/

"use strict";

/* ===========================================================
   LOOP
=========================================================== */

const Loop={

    enabled:SLIDER_CONFIG.loop,

    clonesBefore:[],

    clonesAfter:[],

    initialized:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeLoop(){

    if(

        !Loop.enabled ||

        !Slider.wrapper ||

        SliderState.total<=1

    ){

        return;

    }

    createSlideClones();

    Loop.initialized=true;

    sliderLog(

        "Infinite Loop Ready"

    );

}

/* ===========================================================
   CREATE CLONES
=========================================================== */

function createSlideClones(){

    removeSlideClones();

    const first=

        Slider.slides[0];

    const last=

        Slider.slides[

            Slider.slides.length-1

        ];

    if(

        !first ||

        !last

    ){

        return;

    }

    const firstClone=

        first.cloneNode(true);

    const lastClone=

        last.cloneNode(true);

    addClass(

        firstClone,

        "slide-clone"

    );

    addClass(

        lastClone,

        "slide-clone"

    );

    Slider.wrapper.appendChild(

        firstClone

    );

    Slider.wrapper.insertBefore(

        lastClone,

        Slider.wrapper.firstChild

    );

    Loop.clonesBefore=[

        lastClone

    ];

    Loop.clonesAfter=[

        firstClone

    ];

}

/* ===========================================================
   REMOVE CLONES
=========================================================== */

function removeSlideClones(){

    $$(
        ".slide-clone",
        Slider.wrapper
    ).forEach(clone=>{

        clone.remove();

    });

    Loop.clonesBefore=[];

    Loop.clonesAfter=[];

}

/* ===========================================================
   LOOP NEXT
=========================================================== */

function loopNext(){

    if(

        SliderState.current>=

        SliderState.total-1

    ){

        SliderState.previous=

            SliderState.current;

        SliderState.current=0;

    }else{

        SliderState.previous=

            SliderState.current;

        SliderState.current++;

    }

    updateSlides();

}

/* ===========================================================
   LOOP PREVIOUS
=========================================================== */

function loopPrevious(){

    if(

        SliderState.current<=0

    ){

        SliderState.previous=

            SliderState.current;

        SliderState.current=

            SliderState.total-1;

    }else{

        SliderState.previous=

            SliderState.current;

        SliderState.current--;

    }

    updateSlides();

}

/* ===========================================================
   NORMALIZE
=========================================================== */

function normalizeLoopIndex(){

    if(

        SliderState.current<0

    ){

        SliderState.current=

            SliderState.total-1;

    }

    if(

        SliderState.current>=

        SliderState.total

    ){

        SliderState.current=0;

    }

}

/* ===========================================================
   JUMP
=========================================================== */

function jumpWithoutAnimation(index){

    if(

        !Slider.wrapper

    ){

        return;

    }

    Slider.wrapper.style.transition=

        "none";

    SliderState.current=index;

    updateSlides();

    requestAnimationFrame(()=>{

        Slider.wrapper.style.transition="";

    });

}

/* ===========================================================
   UPDATE POSITION
=========================================================== */

function updateLoopPosition(){

    normalizeLoopIndex();

    updateSlides();

    updatePagination?.();

    updateProgress?.();

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshLoop(){

    removeSlideClones();

    createSlideClones();

    updateLoopPosition();

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableLoop(){

    Loop.enabled=true;

    initializeLoop();

}

/* ===========================================================
   DISABLE
=========================================================== */

function disableLoop(){

    Loop.enabled=false;

    removeSlideClones();

}

/* ===========================================================
   STATUS
=========================================================== */

function loopStatus(){

    return{

        enabled:

            Loop.enabled,

        initialized:

            Loop.initialized,

        before:

            Loop.clonesBefore.length,

        after:

            Loop.clonesAfter.length,

        current:

            SliderState.current

    };

}

/* ===========================================================
   WINDOW RESIZE
=========================================================== */

window.addEventListener(

    "resize",

    ()=>{

        if(

            Loop.enabled

        ){

            refreshLoop();

        }

    },

    {

        passive:true

    }

);

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeLoop();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.SliderManager,

    {

        loop:{

            init:

                initializeLoop,

            next:

                loopNext,

            previous:

                loopPrevious,

            refresh:

                refreshLoop,

            normalize:

                normalizeLoopIndex,

            jump:

                jumpWithoutAnimation,

            enable:

                enableLoop,

            disable:

                disableLoop,

            status:

                loopStatus

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
 assets/js/slider.js
 Part 7
 Responsive Breakpoints • Resize • Adaptive Layout
===========================================================
*/

"use strict";

/* ===========================================================
   RESPONSIVE
=========================================================== */

const Responsive={

    current:"desktop",

    width:window.innerWidth,

    height:window.innerHeight,

    breakpoints:{

        mobile:576,

        tablet:768,

        laptop:992,

        desktop:1200,

        widescreen:1400

    }

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeResponsive(){

    detectBreakpoint();

    applyResponsiveSettings();

    initializeResizeListener();

}

/* ===========================================================
   BREAKPOINT
=========================================================== */

function detectBreakpoint(){

    Responsive.width=

        window.innerWidth;

    Responsive.height=

        window.innerHeight;

    const width=

        Responsive.width;

    if(

        width<Responsive.breakpoints.mobile

    ){

        Responsive.current="mobile";

    }

    else if(

        width<Responsive.breakpoints.laptop

    ){

        Responsive.current="tablet";

    }

    else if(

        width<Responsive.breakpoints.desktop

    ){

        Responsive.current="laptop";

    }

    else if(

        width<Responsive.breakpoints.widescreen

    ){

        Responsive.current="desktop";

    }

    else{

        Responsive.current="widescreen";

    }

}

/* ===========================================================
   SETTINGS
=========================================================== */

function applyResponsiveSettings(){

    switch(

        Responsive.current

    ){

        case "mobile":

            SLIDER_CONFIG.transitionSpeed=400;

            SLIDER_CONFIG.autoplaySpeed=3500;

            break;

        case "tablet":

            SLIDER_CONFIG.transitionSpeed=500;

            SLIDER_CONFIG.autoplaySpeed=4000;

            break;

        case "laptop":

            SLIDER_CONFIG.transitionSpeed=600;

            SLIDER_CONFIG.autoplaySpeed=4500;

            break;

        default:

            SLIDER_CONFIG.transitionSpeed=700;

            SLIDER_CONFIG.autoplaySpeed=5000;

            break;

    }

    refreshSlider();

}

/* ===========================================================
   RESIZE
=========================================================== */

let resizeTimeout=null;

function initializeResizeListener(){

    window.addEventListener(

        "resize",

        debounceResize,

        {

            passive:true

        }

    );

}

function debounceResize(){

    clearTimeout(

        resizeTimeout

    );

    resizeTimeout=setTimeout(

        handleResize,

        200

    );

}

function handleResize(){

    detectBreakpoint();

    applyResponsiveSettings();

    updateResponsiveSlides();

}

/* ===========================================================
   UPDATE
=========================================================== */

function updateResponsiveSlides(){

    if(

        !Slider.wrapper

    ){

        return;

    }

    Slider.wrapper.style.transitionDuration=

        `${SLIDER_CONFIG.transitionSpeed}ms`;

    updateSlides();

}

/* ===========================================================
   SLIDES PER VIEW
=========================================================== */

function slidesPerView(){

    switch(

        Responsive.current

    ){

        case "mobile":

            return 1;

        case "tablet":

            return 2;

        case "laptop":

            return 2;

        default:

            return 3;

    }

}

/* ===========================================================
   GAP
=========================================================== */

function slideGap(){

    switch(

        Responsive.current

    ){

        case "mobile":

            return 12;

        case "tablet":

            return 18;

        default:

            return 24;

    }

}

/* ===========================================================
   APPLY STYLE
=========================================================== */

function applyResponsiveStyle(){

    Slider.wrapper?.style.setProperty(

        "--slides-per-view",

        slidesPerView()

    );

    Slider.wrapper?.style.setProperty(

        "--slide-gap",

        `${slideGap()}px`

    );

}

/* ===========================================================
   ORIENTATION
=========================================================== */

window.addEventListener(

    "orientationchange",

    ()=>{

        setTimeout(()=>{

            handleResize();

        },300);

    }

);

/* ===========================================================
   STATUS
=========================================================== */

function responsiveStatus(){

    return{

        breakpoint:

            Responsive.current,

        width:

            Responsive.width,

        height:

            Responsive.height,

        slides:

            slidesPerView(),

        gap:

            slideGap()

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeResponsive();

        applyResponsiveStyle();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.SliderManager,

    {

        responsive:{

            init:

                initializeResponsive,

            resize:

                handleResize,

            detect:

                detectBreakpoint,

            apply:

                applyResponsiveStyle,

            status:

                responsiveStatus,

            slidesPerView,

            slideGap

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
 assets/js/slider.js
 Part 8
 Lazy Load Images • Performance • Image Optimization
===========================================================
*/

"use strict";

/* ===========================================================
   LAZY LOAD
=========================================================== */

const LazyLoader={

    enabled:SLIDER_CONFIG.lazyLoad,

    observer:null,

    loaded:0,

    total:0

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeLazyLoad(){

    if(

        !LazyLoader.enabled ||

        !("IntersectionObserver" in window)

    ){

        loadAllImages();

        return;

    }

    LazyLoader.observer=

        new IntersectionObserver(

            handleLazyLoad,

            {

                root:null,

                threshold:0.15,

                rootMargin:"200px"

            }

        );

    observeImages();

}

/* ===========================================================
   OBSERVE
=========================================================== */

function observeImages(){

    const images=$$(

        "img[data-src]",

        Slider.container

    );

    LazyLoader.total=

        images.length;

    images.forEach(image=>{

        LazyLoader.observer.observe(image);

    });

}

/* ===========================================================
   CALLBACK
=========================================================== */

function handleLazyLoad(entries){

    entries.forEach(entry=>{

        if(

            !entry.isIntersecting

        ){

            return;

        }

        loadImage(

            entry.target

        );

        LazyLoader.observer.unobserve(

            entry.target

        );

    });

}

/* ===========================================================
   LOAD IMAGE
=========================================================== */

function loadImage(image){

    const source=

        image.dataset.src;

    if(!source){

        return;

    }

    image.src=source;

    image.removeAttribute(

        "data-src"

    );

    image.onload=()=>{

        addClass(

            image,

            "loaded"

        );

        LazyLoader.loaded++;

    };

}

/* ===========================================================
   LOAD ALL
=========================================================== */

function loadAllImages(){

    $$(
        "img[data-src]",
        Slider.container
    ).forEach(loadImage);

}

/* ===========================================================
   PRELOAD
=========================================================== */

function preloadNextSlide(){

    const next=

        Slider.slides[

            (SliderState.current+1)

            %

            SliderState.total

        ];

    if(!next){

        return;

    }

    $$(
        "img[data-src]",
        next
    ).forEach(loadImage);

}

/* ===========================================================
   PRELOAD PREVIOUS
=========================================================== */

function preloadPreviousSlide(){

    const index=

        SliderState.current===0

        ? SliderState.total-1

        : SliderState.current-1;

    const previous=

        Slider.slides[index];

    if(!previous){

        return;

    }

    $$(
        "img[data-src]",
        previous
    ).forEach(loadImage);

}

/* ===========================================================
   OPTIMIZE
=========================================================== */

function optimizeImages(){

    $$("img",Slider.container)

    .forEach(image=>{

        image.loading="lazy";

        image.decoding="async";

        image.draggable=false;

    });

}

/* ===========================================================
   MEMORY
=========================================================== */

function releaseUnusedImages(){

    Slider.slides.forEach((slide,index)=>{

        if(

            Math.abs(

                index-

                SliderState.current

            )>2

        ){

            $$("img",slide)

            .forEach(image=>{

                image.removeAttribute(

                    "srcset"

                );

            });

        }

    });

}

/* ===========================================================
   PERFORMANCE
=========================================================== */

function optimizePerformance(){

    preloadNextSlide();

    preloadPreviousSlide();

    releaseUnusedImages();

}

/* ===========================================================
   STATUS
=========================================================== */

function lazyStatus(){

    return{

        enabled:

            LazyLoader.enabled,

        loaded:

            LazyLoader.loaded,

        total:

            LazyLoader.total

    };

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableLazyLoad(){

    LazyLoader.enabled=true;

    initializeLazyLoad();

}

function disableLazyLoad(){

    LazyLoader.enabled=false;

    LazyLoader.observer?.disconnect();

    loadAllImages();

}

/* ===========================================================
   EVENTS
=========================================================== */

window.addEventListener(

    "load",

    ()=>{

        optimizeImages();

        optimizePerformance();

    }

);

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(!document.hidden){

            optimizePerformance();

        }

    }

);

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeLazyLoad();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.SliderManager,

    {

        lazy:{

            init:

                initializeLazyLoad,

            load:

                loadImage,

            preload:

                preloadNextSlide,

            optimize:

                optimizePerformance,

            enable:

                enableLazyLoad,

            disable:

                disableLazyLoad,

            status:

                lazyStatus

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
 assets/js/slider.js
 Part 9
 Thumbnail Slider • Sync Navigation • Preview Gallery
===========================================================
*/

"use strict";

/* ===========================================================
   THUMBNAILS
=========================================================== */

const Thumbnail={

    container:document.querySelector(".slider-thumbnails"),

    items:[],

    active:0,

    enabled:true,

    scrollIntoView:true

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeThumbnails(){

    if(

        !Thumbnail.enabled ||

        !Thumbnail.container

    ){

        return;

    }

    createThumbnails();

    updateThumbnails();

    initializeThumbnailNavigation();

}

/* ===========================================================
   CREATE
=========================================================== */

function createThumbnails(){

    Thumbnail.container.innerHTML="";

    Thumbnail.items=[];

    Slider.slides.forEach((slide,index)=>{

        const thumbnail=

            document.createElement("button");

        thumbnail.type="button";

        thumbnail.className="slider-thumbnail";

        thumbnail.dataset.index=index;

        thumbnail.setAttribute(

            "aria-label",

            `Slide ${index+1}`

        );

        const image=

            slide.querySelector("img");

        if(image){

            const thumb=

                document.createElement("img");

            thumb.src=

                image.dataset.src ||

                image.src;

            thumb.alt=

                image.alt ||

                `Thumbnail ${index+1}`;

            thumb.loading="lazy";

            thumbnail.appendChild(thumb);

        }else{

            thumbnail.textContent=

                index+1;

        }

        Thumbnail.container.appendChild(

            thumbnail

        );

        Thumbnail.items.push(

            thumbnail

        );

    });

}

/* ===========================================================
   NAVIGATION
=========================================================== */

function initializeThumbnailNavigation(){

    Thumbnail.items.forEach((item,index)=>{

        on(

            item,

            "click",

            ()=>{

                goToSlide(index);

                updateThumbnails();

                restartAutoplay?.();

            }

        );

    });

}

/* ===========================================================
   UPDATE
=========================================================== */

function updateThumbnails(){

    Thumbnail.items.forEach((item,index)=>{

        removeClass(

            item,

            "active"

        );

        if(index===SliderState.current){

            addClass(

                item,

                "active"

            );

            Thumbnail.active=index;

        }

    });

    if(

        Thumbnail.scrollIntoView

    ){

        scrollThumbnailIntoView();

    }

}

/* ===========================================================
   SCROLL
=========================================================== */

function scrollThumbnailIntoView(){

    const current=

        Thumbnail.items[

            Thumbnail.active

        ];

    if(!current){

        return;

    }

    current.scrollIntoView({

        behavior:"smooth",

        block:"nearest",

        inline:"center"

    });

}

/* ===========================================================
   NEXT
=========================================================== */

function nextThumbnail(){

    let index=

        Thumbnail.active+1;

    if(index>=Thumbnail.items.length){

        index=0;

    }

    goToSlide(index);

    updateThumbnails();

}

/* ===========================================================
   PREVIOUS
=========================================================== */

function previousThumbnail(){

    let index=

        Thumbnail.active-1;

    if(index<0){

        index=

            Thumbnail.items.length-1;

    }

    goToSlide(index);

    updateThumbnails();

}

/* ===========================================================
   SYNC
=========================================================== */

function synchronizeSlider(){

    updateSlides();

    updatePagination?.();

    updateProgress?.();

    updateThumbnails();

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshThumbnails(){

    createThumbnails();

    updateThumbnails();

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableThumbnails(){

    Thumbnail.enabled=true;

    initializeThumbnails();

}

/* ===========================================================
   DISABLE
=========================================================== */

function disableThumbnails(){

    Thumbnail.enabled=false;

    Thumbnail.container?.replaceChildren();

    Thumbnail.items=[];

}

/* ===========================================================
   STATUS
=========================================================== */

function thumbnailStatus(){

    return{

        enabled:

            Thumbnail.enabled,

        total:

            Thumbnail.items.length,

        active:

            Thumbnail.active,

        autoScroll:

            Thumbnail.scrollIntoView

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeThumbnails();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.SliderManager,

    {

        thumbnails:{

            init:

                initializeThumbnails,

            refresh:

                refreshThumbnails,

            sync:

                synchronizeSlider,

            next:

                nextThumbnail,

            previous:

                previousThumbnail,

            update:

                updateThumbnails,

            enable:

                enableThumbnails,

            disable:

                disableThumbnails,

            status:

                thumbnailStatus

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
 assets/js/slider.js
 Part 10
 Animation Engine • Fade • Slide • Zoom • Cube
===========================================================
*/

"use strict";

/* ===========================================================
   ANIMATION ENGINE
=========================================================== */

const Animation={

    current:SLIDER_CONFIG.effect,

    duration:SLIDER_CONFIG.transitionSpeed,

    supported:[

        "slide",

        "fade",

        "zoom",

        "cube",

        "flip"

    ]

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeAnimationEngine(){

    applyAnimationEffect();

    applyAnimationDuration();

}

/* ===========================================================
   EFFECT
=========================================================== */

function applyAnimationEffect(){

    if(!Slider.wrapper){

        return;

    }

    Animation.supported.forEach(effect=>{

        removeClass(

            Slider.wrapper,

            `effect-${effect}`

        );

    });

    addClass(

        Slider.wrapper,

        `effect-${Animation.current}`

    );

}

/* ===========================================================
   DURATION
=========================================================== */

function applyAnimationDuration(){

    if(!Slider.wrapper){

        return;

    }

    Slider.wrapper.style.setProperty(

        "--slider-duration",

        `${Animation.duration}ms`

    );

}

/* ===========================================================
   CHANGE EFFECT
=========================================================== */

function setAnimationEffect(effect){

    if(

        !Animation.supported.includes(effect)

    ){

        sliderLog(

            "Unsupported Effect:",

            effect

        );

        return;

    }

    Animation.current=effect;

    applyAnimationEffect();

}

/* ===========================================================
   FADE
=========================================================== */

function playFadeAnimation(){

    Slider.slides.forEach((slide,index)=>{

        slide.style.opacity=

            index===SliderState.current

            ? "1"

            : "0";

        slide.style.zIndex=

            index===SliderState.current

            ? "2"

            : "1";

    });

}

/* ===========================================================
   SLIDE
=========================================================== */

function playSlideAnimation(){

    if(!Slider.wrapper){

        return;

    }

    Slider.wrapper.style.transform=

        `translateX(-${SliderState.current*100}%)`;

}

/* ===========================================================
   ZOOM
=========================================================== */

function playZoomAnimation(){

    Slider.slides.forEach((slide,index)=>{

        slide.style.transform=

            index===SliderState.current

            ? "scale(1)"

            : "scale(.92)";

        slide.style.opacity=

            index===SliderState.current

            ? "1"

            : ".45";

    });

}

/* ===========================================================
   CUBE
=========================================================== */

function playCubeAnimation(){

    Slider.slides.forEach((slide,index)=>{

        const rotate=

            (index-SliderState.current)*90;

        slide.style.transform=

            `rotateY(${rotate}deg)`;

    });

}

/* ===========================================================
   FLIP
=========================================================== */

function playFlipAnimation(){

    Slider.slides.forEach((slide,index)=>{

        slide.style.transform=

            index===SliderState.current

            ? "rotateY(0deg)"

            : "rotateY(180deg)";

    });

}

/* ===========================================================
   PLAY
=========================================================== */

function playAnimation(){

    switch(

        Animation.current

    ){

        case "fade":

            playFadeAnimation();

            break;

        case "zoom":

            playZoomAnimation();

            break;

        case "cube":

            playCubeAnimation();

            break;

        case "flip":

            playFlipAnimation();

            break;

        default:

            playSlideAnimation();

            break;

    }

}

/* ===========================================================
   RESET
=========================================================== */

function resetAnimation(){

    Slider.slides.forEach(slide=>{

        slide.style.opacity="";

        slide.style.transform="";

        slide.style.zIndex="";

    });

}

/* ===========================================================
   NEXT EFFECT
=========================================================== */

function nextAnimationEffect(){

    const current=

        Animation.supported.indexOf(

            Animation.current

        );

    const next=

        (current+1)

        %

        Animation.supported.length;

    setAnimationEffect(

        Animation.supported[next]

    );

}

/* ===========================================================
   PREVIOUS EFFECT
=========================================================== */

function previousAnimationEffect(){

    let index=

        Animation.supported.indexOf(

            Animation.current

        )-1;

    if(index<0){

        index=

            Animation.supported.length-1;

    }

    setAnimationEffect(

        Animation.supported[index]

    );

}

/* ===========================================================
   SPEED
=========================================================== */

function setAnimationSpeed(speed){

    Animation.duration=speed;

    applyAnimationDuration();

}

/* ===========================================================
   STATUS
=========================================================== */

function animationStatus(){

    return{

        effect:

            Animation.current,

        duration:

            Animation.duration,

        supported:

            Animation.supported

    };

}

/* ===========================================================
   AUTO PLAY ANIMATION
=========================================================== */

window.addEventListener(

    "slider:change",

    ()=>{

        playAnimation();

    }

);

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeAnimationEngine();

        playAnimation();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.SliderManager,

    {

        animation:{

            init:

                initializeAnimationEngine,

            play:

                playAnimation,

            reset:

                resetAnimation,

            setEffect:

                setAnimationEffect,

            nextEffect:

                nextAnimationEffect,

            previousEffect:

                previousAnimationEffect,

            setSpeed:

                setAnimationSpeed,

            status:

                animationStatus

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
 assets/js/slider.js
 Part 11
 Utilities • Debug • Report • Public API
===========================================================
*/

"use strict";

/* ===========================================================
   INFORMATION
=========================================================== */

const SliderInfo={

    name:"Slider Manager",

    version:"1.0.0",

    author:"Investment Technology Indonesia",

    environment:"production"

};

/* ===========================================================
   DEBUG
=========================================================== */

function enableSliderDebug(){

    SliderApp.debug=true;

    sliderLog("Debug Enabled");

}

function disableSliderDebug(){

    SliderApp.debug=false;

}

function sliderDebug(...args){

    if(!SliderApp.debug){

        return;

    }

    console.log(

        "[Slider Debug]",

        ...args

    );

}

function sliderWarn(message){

    console.warn(

        "[Slider Warning]",

        message

    );

}

function sliderError(message){

    console.error(

        "[Slider Error]",

        message

    );

}

/* ===========================================================
   UNIQUE ID
=========================================================== */

function sliderID(){

    if(window.crypto?.randomUUID){

        return crypto.randomUUID();

    }

    return "slider-"+

        Date.now()+"-"+

        Math.random()

        .toString(36)

        .substring(2,9);

}

/* ===========================================================
   WAIT
=========================================================== */

function sliderWait(milliseconds=300){

    return new Promise(resolve=>{

        setTimeout(resolve,milliseconds);

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

    return `${clamp(value,0,100)}%`;

}

/* ===========================================================
   TIMESTAMP
=========================================================== */

function sliderTimestamp(){

    return new Date()

        .toLocaleString(

            "id-ID"

        );

}

/* ===========================================================
   REPORT
=========================================================== */

function sliderReport(){

    return{

        info:SliderInfo,

        app:SliderApp,

        config:SLIDER_CONFIG,

        state:SliderState,

        responsive:

            responsiveStatus?.(),

        autoplay:

            autoplayStatus?.(),

        navigation:

            navigationStatus?.(),

        pagination:

            paginationStatus?.(),

        lazy:

            lazyStatus?.(),

        thumbnails:

            thumbnailStatus?.(),

        animation:

            animationStatus?.(),

        timestamp:

            sliderTimestamp()

    };

}

/* ===========================================================
   PRINT REPORT
=========================================================== */

function printSliderReport(){

    console.table(

        sliderReport()

    );

}

/* ===========================================================
   RESET
=========================================================== */

function resetSlider(){

    stopAutoplay?.();

    SliderState.current=0;

    SliderState.previous=0;

    updateSlides?.();

    updatePagination?.();

    updateProgress?.();

    updateThumbnails?.();

    playAnimation?.();

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroySliderManager(){

    stopAutoplay?.();

    destroySlider?.();

    sliderLog(

        "Slider Manager Destroyed"

    );

}

/* ===========================================================
   RESTART
=========================================================== */

function restartSlider(){

    destroySliderManager();

    initializeSlider?.();

}

/* ===========================================================
   READY
=========================================================== */

function sliderReady(){

    return{

        initialized:

            SliderApp.initialized,

        totalSlides:

            SliderState.total,

        current:

            SliderState.current,

        autoplay:

            SliderState.playing

    };

}

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.SliderManager,

    {

        info:SliderInfo,

        report:sliderReport,

        printReport:printSliderReport,

        ready:sliderReady,

        reset:resetSlider,

        restart:restartSlider,

        destroy:destroySliderManager,

        enableDebug:enableSliderDebug,

        disableDebug:disableSliderDebug,

        debug:sliderDebug,

        warn:sliderWarn,

        error:sliderError,

        wait:sliderWait,

        debounce,

        throttle,

        clamp,

        sliderID,

        formatMilliseconds,

        formatPercent,

        timestamp:sliderTimestamp

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        sliderDebug(

            "Slider Utilities Ready"

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
 assets/js/slider.js
 Part 12
 Final Initialization • Cleanup • Export • End of File
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION INITIALIZER
=========================================================== */

function initializeSliderManager(){

    if(SliderApp.initialized){

        sliderLog(

            "Slider Manager already initialized."

        );

        return;

    }

    SliderApp.initialized=true;

    sliderLog(

        "Initializing Slider Manager..."

    );

    initializeSlider?.();

    initializeNavigation?.();

    initializePagination?.();

    initializeTouch?.();

    initializeDrag?.();

    initializeLoop?.();

    initializeResponsive?.();

    initializeLazyLoad?.();

    initializeThumbnails?.();

    initializeAnimationEngine?.();

    startAutoplay?.();

    sliderLog(

        "Slider Manager Ready."

    );

}

/* ===========================================================
   GLOBAL EVENTS
=========================================================== */

window.addEventListener(

    "load",

    ()=>{

        refreshSlider?.();

        playAnimation?.();

        sliderLog(

            "Window Loaded"

        );

    }

);

window.addEventListener(

    "pageshow",

    ()=>{

        refreshSlider?.();

        resumeAutoplay?.();

    }

);

window.addEventListener(

    "focus",

    ()=>{

        resumeAutoplay?.();

    }

);

window.addEventListener(

    "blur",

    ()=>{

        pauseAutoplay?.();

    }

);

/* ===========================================================
   ERROR HANDLER
=========================================================== */

window.addEventListener(

    "error",

    event=>{

        sliderError?.(

            event.message

        );

    }

);

window.addEventListener(

    "unhandledrejection",

    event=>{

        sliderError?.(

            event.reason

        );

    }

);

/* ===========================================================
   CLEANUP
=========================================================== */

function cleanupSliderManager(){

    stopAutoplay?.();

    LazyLoader.observer?.disconnect();

    removeSlideClones?.();

    sliderLog(

        "Cleanup Complete"

    );

}

/* ===========================================================
   BEFORE UNLOAD
=========================================================== */

window.addEventListener(

    "beforeunload",

    ()=>{

        cleanupSliderManager();

    }

);

/* ===========================================================
   FREEZE CONFIG
=========================================================== */

Object.freeze(

    SLIDER_CONFIG

);

Object.freeze(

    SliderInfo

);

/* ===========================================================
   EXPORT
=========================================================== */

window.SliderManager=Object.assign(

    window.SliderManager||{},

    {

        initialize:

            initializeSliderManager,

        cleanup:

            cleanupSliderManager,

        version:

            ()=>SliderInfo.version,

        report:

            sliderReport,

        ready:

            sliderReady,

        app:

            SliderApp,

        config:

            SLIDER_CONFIG,

        state:

            SliderState,

        info:

            SliderInfo

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeSliderManager();

    }

);

/* ===========================================================
   FINAL REPORT
=========================================================== */

sliderLog(

"========================================"

);

sliderLog(

"Investment Technology Indonesia"

);

sliderLog(

"Slider Manager"

);

sliderLog(

"Version:",

SliderInfo.version

);

sliderLog(

"Environment:",

SliderInfo.environment

);

sliderLog(

"========================================"

);

/* ===========================================================
   FEATURES
=========================================================== */

/*
✔ Hero Slider
✔ Auto Play
✔ Pause On Hover
✔ Resume On Focus
✔ Previous / Next Navigation
✔ Keyboard Navigation
✔ Mouse Wheel Navigation
✔ Pagination Dots
✔ Progress Bar
✔ Fraction Counter
✔ Touch Swipe
✔ Mouse Drag
✔ Infinite Loop
✔ Clone Slides
✔ Responsive Breakpoints
✔ Lazy Load Images
✔ Image Optimization
✔ Thumbnail Navigation
✔ Thumbnail Sync
✔ Fade Animation
✔ Slide Animation
✔ Zoom Animation
✔ Cube Animation
✔ Flip Animation
✔ Animation Engine
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
   assets/js/slider.js
===========================================================
*/
