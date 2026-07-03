/*!
===========================================================
 Investment Technology Indonesia
 assets/js/aos.js
 Part 1
 Core • Configuration • Initialization
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION
=========================================================== */

const AOSApp={

    name:"Investment Technology Indonesia AOS",

    version:"1.0.0",

    initialized:false,

    debug:false

};

/* ===========================================================
   CONFIG
=========================================================== */

const AOS_CONFIG={

    selector:"[data-aos]",

    once:true,

    mirror:false,

    threshold:0.15,

    root:null,

    rootMargin:"0px 0px -10% 0px",

    duration:800,

    delay:0,

    easing:"ease",

    disable:false,

    mobile:true,

    tablet:true,

    desktop:true,

    observeMutations:true

};

/* ===========================================================
   STATE
=========================================================== */

const AOSState={

    observer:null,

    mutationObserver:null,

    elements:[],

    initialized:false,

    running:false,

    viewportWidth:window.innerWidth,

    viewportHeight:window.innerHeight

};

/* ===========================================================
   LOGGER
=========================================================== */

function aosLog(...message){

    if(!AOSApp.debug){

        return;

    }

    console.log(

        "[AOS]",

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

function hasClass(

    element,

    className

){

    return element

        ? element.classList.contains(className)

        : false;

}

/* ===========================================================
   DEVICE
=========================================================== */

function isMobile(){

    return window.innerWidth<768;

}

function isTablet(){

    return(

        window.innerWidth>=768 &&

        window.innerWidth<992

    );

}

function isDesktop(){

    return window.innerWidth>=992;

}

/* ===========================================================
   CHECK ENABLE
=========================================================== */

function isAOSEnabled(){

    if(AOS_CONFIG.disable){

        return false;

    }

    if(

        isMobile() &&

        !AOS_CONFIG.mobile

    ){

        return false;

    }

    if(

        isTablet() &&

        !AOS_CONFIG.tablet

    ){

        return false;

    }

    if(

        isDesktop() &&

        !AOS_CONFIG.desktop

    ){

        return false;

    }

    return true;

}

/* ===========================================================
   ELEMENTS
=========================================================== */

function collectAOSElements(){

    AOSState.elements=$$(

        AOS_CONFIG.selector

    );

    aosLog(

        "Elements:",

        AOSState.elements.length

    );

}

/* ===========================================================
   PREPARE
=========================================================== */

function prepareElements(){

    AOSState.elements.forEach(element=>{

        addClass(

            element,

            "aos-init"

        );

        removeClass(

            element,

            "aos-animate"

        );

        element.style.transitionDuration=

            `${
                element.dataset.aosDuration ||

                AOS_CONFIG.duration
            }ms`;

        element.style.transitionDelay=

            `${
                element.dataset.aosDelay ||

                AOS_CONFIG.delay
            }ms`;

        element.style.transitionTimingFunction=

            element.dataset.aosEasing ||

            AOS_CONFIG.easing;

    });

}

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeAOS(){

    if(

        AOSApp.initialized ||

        !isAOSEnabled()

    ){

        return;

    }

    AOSApp.initialized=true;

    AOSState.initialized=true;

    collectAOSElements();

    prepareElements();

    aosLog(

        "AOS Initialized"

    );

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshAOS(){

    collectAOSElements();

    prepareElements();

    aosLog(

        "AOS Refreshed"

    );

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroyAOS(){

    AOSState.elements.forEach(element=>{

        removeClass(

            element,

            "aos-init"

        );

        removeClass(

            element,

            "aos-animate"

        );

    });

    AOSState.elements=[];

    aosLog(

        "AOS Destroyed"

    );

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeAOS();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

window.AOSManager={

    app:AOSApp,

    config:AOS_CONFIG,

    state:AOSState,

    init:initializeAOS,

    refresh:refreshAOS,

    destroy:destroyAOS

};

/* ===========================================================
   END PART 1
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/aos.js
 Part 2
 Intersection Observer • Animation Engine
===========================================================
*/

"use strict";

/* ===========================================================
   OBSERVER
=========================================================== */

function initializeObserver(){

    if(!("IntersectionObserver" in window)){

        animateAllElements();

        return;

    }

    if(AOSState.observer){

        AOSState.observer.disconnect();

    }

    AOSState.observer=new IntersectionObserver(

        handleIntersection,

        {

            root:AOS_CONFIG.root,

            rootMargin:

                AOS_CONFIG.rootMargin,

            threshold:

                AOS_CONFIG.threshold

        }

    );

    observeElements();

}

/* ===========================================================
   OBSERVE
=========================================================== */

function observeElements(){

    AOSState.elements.forEach(element=>{

        AOSState.observer.observe(element);

    });

}

/* ===========================================================
   UNOBSERVE
=========================================================== */

function unobserveElement(element){

    if(!AOSState.observer){

        return;

    }

    AOSState.observer.unobserve(element);

}

/* ===========================================================
   CALLBACK
=========================================================== */

function handleIntersection(entries){

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            animateElement(entry.target);

        }else{

            resetElement(entry.target);

        }

    });

}

/* ===========================================================
   ANIMATE
=========================================================== */

function animateElement(element){

    if(

        hasClass(

            element,

            "aos-animate"

        ) &&

        AOS_CONFIG.once

    ){

        return;

    }

    requestAnimationFrame(()=>{

        addClass(

            element,

            "aos-animate"

        );

    });

    if(AOS_CONFIG.once){

        unobserveElement(element);

    }

}

/* ===========================================================
   RESET
=========================================================== */

function resetElement(element){

    if(AOS_CONFIG.once){

        return;

    }

    if(AOS_CONFIG.mirror){

        removeClass(

            element,

            "aos-animate"

        );

    }

}

/* ===========================================================
   ANIMATE ALL
=========================================================== */

function animateAllElements(){

    AOSState.elements.forEach(element=>{

        animateElement(element);

    });

}

/* ===========================================================
   RESET ALL
=========================================================== */

function resetAllElements(){

    AOSState.elements.forEach(element=>{

        removeClass(

            element,

            "aos-animate"

        );

    });

}

/* ===========================================================
   FORCE
=========================================================== */

function forceAnimation(){

    resetAllElements();

    requestAnimationFrame(()=>{

        animateAllElements();

    });

}

/* ===========================================================
   VISIBILITY
=========================================================== */

function isVisible(element){

    const rect=

        element.getBoundingClientRect();

    return(

        rect.top<

        window.innerHeight*

        (1-AOS_CONFIG.threshold)

        &&

        rect.bottom>0

    );

}

/* ===========================================================
   UPDATE
=========================================================== */

function updateVisibleElements(){

    AOSState.elements.forEach(element=>{

        if(isVisible(element)){

            animateElement(element);

        }else{

            resetElement(element);

        }

    });

}

/* ===========================================================
   SCROLL
=========================================================== */

function handleScroll(){

    if(

        !AOSState.observer

    ){

        updateVisibleElements();

    }

}

/* ===========================================================
   RESIZE
=========================================================== */

function handleResize(){

    AOSState.viewportWidth=

        window.innerWidth;

    AOSState.viewportHeight=

        window.innerHeight;

    refreshAOS();

    initializeObserver();

}

/* ===========================================================
   PAGE SHOW
=========================================================== */

window.addEventListener(

    "pageshow",

    ()=>{

        forceAnimation();

    }

);

/* ===========================================================
   EVENTS
=========================================================== */

window.addEventListener(

    "scroll",

    handleScroll,

    {

        passive:true

    }

);

window.addEventListener(

    "resize",

    handleResize,

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

        initializeObserver();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.AOSManager,

    {

        observer:

            initializeObserver,

        animate:

            animateElement,

        reset:

            resetElement,

        refreshHard:

            forceAnimation,

        update:

            updateVisibleElements

    }

);

/* ===========================================================
   END PART 2
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/aos.js
 Part 3
 Fade Animations
===========================================================
*/

"use strict";

/* ===========================================================
   FADE ANIMATIONS
=========================================================== */

const FadeAnimations={

    "fade":"aos-fade",

    "fade-up":"aos-fade-up",

    "fade-down":"aos-fade-down",

    "fade-left":"aos-fade-left",

    "fade-right":"aos-fade-right",

    "fade-up-right":"aos-fade-up-right",

    "fade-up-left":"aos-fade-up-left",

    "fade-down-right":"aos-fade-down-right",

    "fade-down-left":"aos-fade-down-left"

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeFadeAnimations(){

    AOSState.elements.forEach(element=>{

        const animation=

            element.dataset.aos;

        if(

            FadeAnimations[animation]

        ){

            prepareFade(

                element,

                animation

            );

        }

    });

}

/* ===========================================================
   PREPARE
=========================================================== */

function prepareFade(

    element,

    animation

){

    addClass(

        element,

        FadeAnimations[animation]

    );

}

/* ===========================================================
   APPLY
=========================================================== */

function applyFadeAnimation(element){

    addClass(

        element,

        "aos-animate"

    );

}

/* ===========================================================
   REMOVE
=========================================================== */

function removeFadeAnimation(element){

    removeClass(

        element,

        "aos-animate"

    );

}

/* ===========================================================
   DIRECTION
=========================================================== */

function animationDirection(element){

    return(

        element.dataset.aos ||

        "fade-up"

    );

}

/* ===========================================================
   OFFSET
=========================================================== */

function animationOffset(element){

    return Number(

        element.dataset.aosOffset ||

        120

    );

}

/* ===========================================================
   DELAY
=========================================================== */

function animationDelay(element){

    return Number(

        element.dataset.aosDelay ||

        AOS_CONFIG.delay

    );

}

/* ===========================================================
   DURATION
=========================================================== */

function animationDuration(element){

    return Number(

        element.dataset.aosDuration ||

        AOS_CONFIG.duration

    );

}

/* ===========================================================
   EASING
=========================================================== */

function animationEasing(element){

    return(

        element.dataset.aosEasing ||

        AOS_CONFIG.easing

    );

}

/* ===========================================================
   STYLE
=========================================================== */

function applyFadeStyle(element){

    element.style.transitionDuration=

        animationDuration(element)+"ms";

    element.style.transitionDelay=

        animationDelay(element)+"ms";

    element.style.transitionTimingFunction=

        animationEasing(element);

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshFadeAnimations(){

    AOSState.elements.forEach(element=>{

        if(

            FadeAnimations[

                animationDirection(element)

            ]

        ){

            applyFadeStyle(element);

        }

    });

}

/* ===========================================================
   RESET
=========================================================== */

function resetFadeAnimations(){

    AOSState.elements.forEach(element=>{

        Object.values(

            FadeAnimations

        ).forEach(className=>{

            removeClass(

                element,

                className

            );

        });

    });

}

/* ===========================================================
   SCROLL CHECK
=========================================================== */

function checkFadeVisibility(){

    AOSState.elements.forEach(element=>{

        if(

            !FadeAnimations[

                animationDirection(element)

            ]

        ){

            return;

        }

        if(isVisible(element)){

            applyFadeAnimation(

                element

            );

        }else if(

            !AOS_CONFIG.once

        ){

            removeFadeAnimation(

                element

            );

        }

    });

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeFadeAnimations();

        refreshFadeAnimations();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.AOSManager,

    {

        fade:{

            init:

                initializeFadeAnimations,

            refresh:

                refreshFadeAnimations,

            reset:

                resetFadeAnimations,

            update:

                checkFadeVisibility

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
 assets/js/aos.js
 Part 4
 Zoom • Scale • Pop • Bounce Animations
===========================================================
*/

"use strict";

/* ===========================================================
   ZOOM ANIMATIONS
=========================================================== */

const ZoomAnimations={

    "zoom-in":"aos-zoom-in",

    "zoom-out":"aos-zoom-out",

    "zoom-in-up":"aos-zoom-in-up",

    "zoom-in-down":"aos-zoom-in-down",

    "zoom-in-left":"aos-zoom-in-left",

    "zoom-in-right":"aos-zoom-in-right",

    "zoom-out-up":"aos-zoom-out-up",

    "zoom-out-down":"aos-zoom-out-down",

    "zoom-out-left":"aos-zoom-out-left",

    "zoom-out-right":"aos-zoom-out-right"

};

/* ===========================================================
   SCALE ANIMATIONS
=========================================================== */

const ScaleAnimations={

    "scale-up":"aos-scale-up",

    "scale-down":"aos-scale-down",

    "scale-x":"aos-scale-x",

    "scale-y":"aos-scale-y",

    "grow":"aos-grow",

    "shrink":"aos-shrink"

};

/* ===========================================================
   POP ANIMATIONS
=========================================================== */

const PopAnimations={

    "pop":"aos-pop",

    "pop-up":"aos-pop-up",

    "pop-down":"aos-pop-down",

    "bounce":"aos-bounce",

    "bounce-in":"aos-bounce-in"

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeZoomAnimations(){

    AOSState.elements.forEach(element=>{

        const animation=

            element.dataset.aos;

        if(

            ZoomAnimations[animation]

        ){

            addClass(

                element,

                ZoomAnimations[animation]

            );

        }

        if(

            ScaleAnimations[animation]

        ){

            addClass(

                element,

                ScaleAnimations[animation]

            );

        }

        if(

            PopAnimations[animation]

        ){

            addClass(

                element,

                PopAnimations[animation]

            );

        }

    });

}

/* ===========================================================
   APPLY
=========================================================== */

function applyZoomAnimation(element){

    addClass(

        element,

        "aos-animate"

    );

}

/* ===========================================================
   REMOVE
=========================================================== */

function removeZoomAnimation(element){

    removeClass(

        element,

        "aos-animate"

    );

}

/* ===========================================================
   STYLE
=========================================================== */

function applyZoomStyle(element){

    element.style.transitionDuration=

        `${

            animationDuration(element)

        }ms`;

    element.style.transitionDelay=

        `${

            animationDelay(element)

        }ms`;

    element.style.transitionTimingFunction=

        animationEasing(element);

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshZoomAnimations(){

    AOSState.elements.forEach(element=>{

        const animation=

            animationDirection(element);

        if(

            ZoomAnimations[animation] ||

            ScaleAnimations[animation] ||

            PopAnimations[animation]

        ){

            applyZoomStyle(element);

        }

    });

}

/* ===========================================================
   RESET
=========================================================== */

function resetZoomAnimations(){

    AOSState.elements.forEach(element=>{

        [

            ...Object.values(

                ZoomAnimations

            ),

            ...Object.values(

                ScaleAnimations

            ),

            ...Object.values(

                PopAnimations

            )

        ].forEach(className=>{

            removeClass(

                element,

                className

            );

        });

    });

}

/* ===========================================================
   UPDATE
=========================================================== */

function updateZoomAnimations(){

    AOSState.elements.forEach(element=>{

        const animation=

            animationDirection(element);

        if(

            !ZoomAnimations[animation] &&

            !ScaleAnimations[animation] &&

            !PopAnimations[animation]

        ){

            return;

        }

        if(isVisible(element)){

            applyZoomAnimation(element);

        }else if(

            !AOS_CONFIG.once

        ){

            removeZoomAnimation(element);

        }

    });

}

/* ===========================================================
   SCALE VALUE
=========================================================== */

function scaleValue(element){

    return Number(

        element.dataset.scale ||

        1

    );

}

/* ===========================================================
   CUSTOM SCALE
=========================================================== */

function applyCustomScale(element){

    if(

        !element.dataset.scale

    ){

        return;

    }

    element.style.setProperty(

        "--aos-scale",

        scaleValue(element)

    );

}

/* ===========================================================
   CUSTOM ORIGIN
=========================================================== */

function applyTransformOrigin(element){

    const origin=

        element.dataset.origin;

    if(!origin){

        return;

    }

    element.style.transformOrigin=

        origin;

}

/* ===========================================================
   CUSTOM ROTATION
=========================================================== */

function applyRotation(element){

    if(

        !element.dataset.rotate

    ){

        return;

    }

    element.style.setProperty(

        "--aos-rotate",

        `${element.dataset.rotate}deg`

    );

}

/* ===========================================================
   PREPARE
=========================================================== */

function prepareZoomElements(){

    AOSState.elements.forEach(element=>{

        applyCustomScale(element);

        applyTransformOrigin(element);

        applyRotation(element);

    });

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeZoomAnimations();

        prepareZoomElements();

        refreshZoomAnimations();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.AOSManager,

    {

        zoom:{

            init:

                initializeZoomAnimations,

            refresh:

                refreshZoomAnimations,

            reset:

                resetZoomAnimations,

            update:

                updateZoomAnimations

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
 assets/js/aos.js
 Part 5
 Slide Animations • Direction Engine
===========================================================
*/

"use strict";

/* ===========================================================
   SLIDE ANIMATIONS
=========================================================== */

const SlideAnimations={

    "slide-up":"aos-slide-up",

    "slide-down":"aos-slide-down",

    "slide-left":"aos-slide-left",

    "slide-right":"aos-slide-right",

    "slide-up-left":"aos-slide-up-left",

    "slide-up-right":"aos-slide-up-right",

    "slide-down-left":"aos-slide-down-left",

    "slide-down-right":"aos-slide-down-right"

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeSlideAnimations(){

    AOSState.elements.forEach(element=>{

        const animation=

            element.dataset.aos;

        if(

            SlideAnimations[animation]

        ){

            prepareSlideAnimation(

                element,

                animation

            );

        }

    });

}

/* ===========================================================
   PREPARE
=========================================================== */

function prepareSlideAnimation(

    element,

    animation

){

    addClass(

        element,

        SlideAnimations[animation]

    );

    applySlideStyle(element);

}

/* ===========================================================
   STYLE
=========================================================== */

function applySlideStyle(element){

    element.style.transitionDuration=

        `${animationDuration(element)}ms`;

    element.style.transitionDelay=

        `${animationDelay(element)}ms`;

    element.style.transitionTimingFunction=

        animationEasing(element);

}

/* ===========================================================
   DISTANCE
=========================================================== */

function slideDistance(element){

    return Number(

        element.dataset.aosDistance ||

        80

    );

}

/* ===========================================================
   OFFSET
=========================================================== */

function applySlideOffset(element){

    element.style.setProperty(

        "--aos-distance",

        `${slideDistance(element)}px`

    );

}

/* ===========================================================
   APPLY
=========================================================== */

function applySlideAnimation(element){

    addClass(

        element,

        "aos-animate"

    );

}

/* ===========================================================
   REMOVE
=========================================================== */

function removeSlideAnimation(element){

    removeClass(

        element,

        "aos-animate"

    );

}

/* ===========================================================
   UPDATE
=========================================================== */

function updateSlideAnimations(){

    AOSState.elements.forEach(element=>{

        const animation=

            animationDirection(element);

        if(

            !SlideAnimations[animation]

        ){

            return;

        }

        if(isVisible(element)){

            applySlideAnimation(element);

        }else if(

            !AOS_CONFIG.once

        ){

            removeSlideAnimation(element);

        }

    });

}

/* ===========================================================
   RESET
=========================================================== */

function resetSlideAnimations(){

    AOSState.elements.forEach(element=>{

        Object.values(

            SlideAnimations

        ).forEach(className=>{

            removeClass(

                element,

                className

            );

        });

    });

}

/* ===========================================================
   PREPARE ALL
=========================================================== */

function prepareSlideElements(){

    AOSState.elements.forEach(element=>{

        if(

            SlideAnimations[

                animationDirection(element)

            ]

        ){

            applySlideOffset(element);

        }

    });

}

/* ===========================================================
   STAGGER
=========================================================== */

function staggerSlides(){

    const slides=$$(

        '[data-aos^="slide"]'

    );

    slides.forEach((element,index)=>{

        if(

            element.dataset.aosDelay

        ){

            return;

        }

        element.style.transitionDelay=

            `${index*80}ms`;

    });

}

/* ===========================================================
   GROUP
=========================================================== */

function animateSlideGroup(selector){

    const group=$$(selector);

    group.forEach((element,index)=>{

        setTimeout(()=>{

            applySlideAnimation(element);

        },index*100);

    });

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshSlideAnimations(){

    prepareSlideElements();

    staggerSlides();

    updateSlideAnimations();

}

/* ===========================================================
   FORCE
=========================================================== */

function forceSlideAnimation(){

    resetSlideAnimations();

    requestAnimationFrame(()=>{

        refreshSlideAnimations();

    });

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeSlideAnimations();

        prepareSlideElements();

        staggerSlides();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.AOSManager,

    {

        slide:{

            init:

                initializeSlideAnimations,

            refresh:

                refreshSlideAnimations,

            reset:

                resetSlideAnimations,

            update:

                updateSlideAnimations,

            group:

                animateSlideGroup,

            force:

                forceSlideAnimation

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
 assets/js/aos.js
 Part 6
 Flip • Rotate • Skew • 3D Animations
===========================================================
*/

"use strict";

/* ===========================================================
   FLIP ANIMATIONS
=========================================================== */

const FlipAnimations={

    "flip-left":"aos-flip-left",

    "flip-right":"aos-flip-right",

    "flip-up":"aos-flip-up",

    "flip-down":"aos-flip-down",

    "flip-x":"aos-flip-x",

    "flip-y":"aos-flip-y"

};

/* ===========================================================
   ROTATE ANIMATIONS
=========================================================== */

const RotateAnimations={

    "rotate":"aos-rotate",

    "rotate-left":"aos-rotate-left",

    "rotate-right":"aos-rotate-right",

    "rotate-in":"aos-rotate-in",

    "rotate-out":"aos-rotate-out"

};

/* ===========================================================
   SKEW ANIMATIONS
=========================================================== */

const SkewAnimations={

    "skew-left":"aos-skew-left",

    "skew-right":"aos-skew-right",

    "skew-up":"aos-skew-up",

    "skew-down":"aos-skew-down"

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeTransformAnimations(){

    AOSState.elements.forEach(element=>{

        const animation=

            animationDirection(element);

        if(FlipAnimations[animation]){

            addClass(

                element,

                FlipAnimations[animation]

            );

        }

        if(RotateAnimations[animation]){

            addClass(

                element,

                RotateAnimations[animation]

            );

        }

        if(SkewAnimations[animation]){

            addClass(

                element,

                SkewAnimations[animation]

            );

        }

        applyTransformStyle(element);

    });

}

/* ===========================================================
   STYLE
=========================================================== */

function applyTransformStyle(element){

    element.style.transitionDuration=

        `${animationDuration(element)}ms`;

    element.style.transitionDelay=

        `${animationDelay(element)}ms`;

    element.style.transitionTimingFunction=

        animationEasing(element);

    element.style.transformStyle=

        "preserve-3d";

    element.style.backfaceVisibility=

        "hidden";

}

/* ===========================================================
   APPLY
=========================================================== */

function applyTransformAnimation(element){

    addClass(

        element,

        "aos-animate"

    );

}

/* ===========================================================
   REMOVE
=========================================================== */

function removeTransformAnimation(element){

    removeClass(

        element,

        "aos-animate"

    );

}

/* ===========================================================
   UPDATE
=========================================================== */

function updateTransformAnimations(){

    AOSState.elements.forEach(element=>{

        const animation=

            animationDirection(element);

        const valid=

            FlipAnimations[animation] ||

            RotateAnimations[animation] ||

            SkewAnimations[animation];

        if(!valid){

            return;

        }

        if(isVisible(element)){

            applyTransformAnimation(element);

        }else if(!AOS_CONFIG.once){

            removeTransformAnimation(element);

        }

    });

}

/* ===========================================================
   RESET
=========================================================== */

function resetTransformAnimations(){

    AOSState.elements.forEach(element=>{

        [

            ...Object.values(

                FlipAnimations

            ),

            ...Object.values(

                RotateAnimations

            ),

            ...Object.values(

                SkewAnimations

            )

        ].forEach(className=>{

            removeClass(

                element,

                className

            );

        });

    });

}

/* ===========================================================
   CUSTOM ROTATE
=========================================================== */

function applyCustomRotation(element){

    const rotate=

        element.dataset.rotate;

    if(!rotate){

        return;

    }

    element.style.setProperty(

        "--aos-rotate",

        `${rotate}deg`

    );

}

/* ===========================================================
   CUSTOM SKEW
=========================================================== */

function applyCustomSkew(element){

    const skew=

        element.dataset.skew;

    if(!skew){

        return;

    }

    element.style.setProperty(

        "--aos-skew",

        `${skew}deg`

    );

}

/* ===========================================================
   CUSTOM PERSPECTIVE
=========================================================== */

function applyPerspective(element){

    const perspective=

        element.dataset.perspective||

        "1000px";

    element.style.perspective=

        perspective;

}

/* ===========================================================
   PREPARE
=========================================================== */

function prepareTransformElements(){

    AOSState.elements.forEach(element=>{

        applyPerspective(element);

        applyCustomRotation(element);

        applyCustomSkew(element);

    });

}

/* ===========================================================
   GROUP
=========================================================== */

function animateTransformGroup(selector){

    const elements=$$(selector);

    elements.forEach((element,index)=>{

        setTimeout(()=>{

            applyTransformAnimation(element);

        },index*120);

    });

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshTransformAnimations(){

    prepareTransformElements();

    updateTransformAnimations();

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeTransformAnimations();

        prepareTransformElements();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.AOSManager,

    {

        transform:{

            init:

                initializeTransformAnimations,

            refresh:

                refreshTransformAnimations,

            reset:

                resetTransformAnimations,

            update:

                updateTransformAnimations,

            group:

                animateTransformGroup

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
 assets/js/aos.js
 Part 7
 Delay • Duration • Easing • Animation Timing Engine
===========================================================
*/

"use strict";

/* ===========================================================
   TIMING CONFIG
=========================================================== */

const TimingEngine={

    defaultDuration:800,

    defaultDelay:0,

    defaultEasing:"ease",

    staggerDelay:100,

    enabled:true

};

/* ===========================================================
   EASING MAP
=========================================================== */

const EasingMap={

    "linear":"linear",

    "ease":"ease",

    "ease-in":"ease-in",

    "ease-out":"ease-out",

    "ease-in-out":"ease-in-out",

    "bounce":"cubic-bezier(.68,-0.55,.27,1.55)",

    "back":"cubic-bezier(.34,1.56,.64,1)",

    "elastic":"cubic-bezier(.68,-0.6,.32,1.6)",

    "expo":"cubic-bezier(.19,1,.22,1)",

    "circ":"cubic-bezier(.075,.82,.165,1)"

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeTimingEngine(){

    applyTimingToAll();

}

/* ===========================================================
   APPLY ALL
=========================================================== */

function applyTimingToAll(){

    AOSState.elements.forEach(element=>{

        applyTiming(element);

    });

}

/* ===========================================================
   APPLY
=========================================================== */

function applyTiming(element){

    if(!TimingEngine.enabled){

        return;

    }

    element.style.transitionDuration=

        `${getDuration(element)}ms`;

    element.style.transitionDelay=

        `${getDelay(element)}ms`;

    element.style.transitionTimingFunction=

        getEasing(element);

}

/* ===========================================================
   DURATION
=========================================================== */

function getDuration(element){

    return Number(

        element.dataset.aosDuration ||

        TimingEngine.defaultDuration ||

        AOS_CONFIG.duration

    );

}

/* ===========================================================
   DELAY
=========================================================== */

function getDelay(element){

    return Number(

        element.dataset.aosDelay ||

        TimingEngine.defaultDelay ||

        AOS_CONFIG.delay

    );

}

/* ===========================================================
   EASING
=========================================================== */

function getEasing(element){

    const easing=

        element.dataset.aosEasing ||

        TimingEngine.defaultEasing;

    return(

        EasingMap[easing] ||

        easing

    );

}

/* ===========================================================
   STAGGER
=========================================================== */

function staggerAnimation(

    selector,

    delay=

    TimingEngine.staggerDelay

){

    const items=$$(selector);

    items.forEach((element,index)=>{

        element.style.transitionDelay=

            `${index*delay}ms`;

    });

}

/* ===========================================================
   RESET DELAY
=========================================================== */

function resetDelay(selector){

    $$(selector).forEach(element=>{

        element.style.transitionDelay="0ms";

    });

}

/* ===========================================================
   CUSTOM SPEED
=========================================================== */

function setAnimationSpeed(speed){

    TimingEngine.defaultDuration=speed;

    applyTimingToAll();

}

/* ===========================================================
   CUSTOM EASING
=========================================================== */

function setAnimationEasing(easing){

    TimingEngine.defaultEasing=easing;

    applyTimingToAll();

}

/* ===========================================================
   CUSTOM DELAY
=========================================================== */

function setAnimationDelay(delay){

    TimingEngine.defaultDelay=delay;

    applyTimingToAll();

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableTimingEngine(){

    TimingEngine.enabled=true;

    applyTimingToAll();

}

/* ===========================================================
   DISABLE
=========================================================== */

function disableTimingEngine(){

    TimingEngine.enabled=false;

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshTimingEngine(){

    applyTimingToAll();

}

/* ===========================================================
   REPORT
=========================================================== */

function timingReport(){

    return{

        duration:

            TimingEngine.defaultDuration,

        delay:

            TimingEngine.defaultDelay,

        easing:

            TimingEngine.defaultEasing,

        stagger:

            TimingEngine.staggerDelay,

        enabled:

            TimingEngine.enabled

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeTimingEngine();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.AOSManager,

    {

        timing:{

            init:

                initializeTimingEngine,

            refresh:

                refreshTimingEngine,

            stagger:

                staggerAnimation,

            resetDelay,

            setSpeed:

                setAnimationSpeed,

            setDelay:

                setAnimationDelay,

            setEasing:

                setAnimationEasing,

            enable:

                enableTimingEngine,

            disable:

                disableTimingEngine,

            report:

                timingReport

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
 assets/js/aos.js
 Part 8
 Repeat Animation • Responsive Mode • Breakpoints
===========================================================
*/

"use strict";

/* ===========================================================
   RESPONSIVE
=========================================================== */

const ResponsiveAOS={

    enabled:true,

    current:"desktop",

    breakpoint:{

        mobile:576,

        tablet:768,

        desktop:992,

        widescreen:1400

    }

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeResponsiveAOS(){

    detectResponsiveMode();

    applyResponsiveSettings();

    initializeBreakpointWatcher();

}

/* ===========================================================
   DEVICE
=========================================================== */

function detectResponsiveMode(){

    const width=window.innerWidth;

    if(width<ResponsiveAOS.breakpoint.mobile){

        ResponsiveAOS.current="mobile";

    }

    else if(

        width<ResponsiveAOS.breakpoint.desktop

    ){

        ResponsiveAOS.current="tablet";

    }

    else{

        ResponsiveAOS.current="desktop";

    }

}

/* ===========================================================
   SETTINGS
=========================================================== */

function applyResponsiveSettings(){

    switch(

        ResponsiveAOS.current

    ){

        case "mobile":

            AOS_CONFIG.threshold=.08;

            AOS_CONFIG.duration=500;

            break;

        case "tablet":

            AOS_CONFIG.threshold=.12;

            AOS_CONFIG.duration=650;

            break;

        default:

            AOS_CONFIG.threshold=.15;

            AOS_CONFIG.duration=800;

            break;

    }

    refreshAOS();

}

/* ===========================================================
   BREAKPOINT
=========================================================== */

function initializeBreakpointWatcher(){

    window.addEventListener(

        "resize",

        debounceResponsiveResize,

        {

            passive:true

        }

    );

}

let responsiveTimer=null;

function debounceResponsiveResize(){

    clearTimeout(

        responsiveTimer

    );

    responsiveTimer=setTimeout(

        ()=>{

            detectResponsiveMode();

            applyResponsiveSettings();

        },

        200

    );

}

/* ===========================================================
   REPEAT
=========================================================== */

function enableRepeatAnimation(){

    AOS_CONFIG.once=false;

}

function disableRepeatAnimation(){

    AOS_CONFIG.once=true;

}

/* ===========================================================
   MIRROR
=========================================================== */

function enableMirrorAnimation(){

    AOS_CONFIG.mirror=true;

}

function disableMirrorAnimation(){

    AOS_CONFIG.mirror=false;

}

/* ===========================================================
   RESET WHEN LEAVE
=========================================================== */

function resetHiddenElements(){

    if(AOS_CONFIG.once){

        return;

    }

    AOSState.elements.forEach(element=>{

        if(

            !isVisible(element)

        ){

            removeClass(

                element,

                "aos-animate"

            );

        }

    });

}

/* ===========================================================
   FORCE UPDATE
=========================================================== */

function refreshVisibleAnimations(){

    AOSState.elements.forEach(element=>{

        if(isVisible(element)){

            animateElement(element);

        }

    });

}

/* ===========================================================
   SCREEN SIZE
=========================================================== */

function screenCategory(){

    return ResponsiveAOS.current;

}

/* ===========================================================
   DISABLE DEVICE
=========================================================== */

function disableMobileAnimations(){

    AOS_CONFIG.mobile=false;

}

function disableTabletAnimations(){

    AOS_CONFIG.tablet=false;

}

function disableDesktopAnimations(){

    AOS_CONFIG.desktop=false;

}

/* ===========================================================
   ENABLE DEVICE
=========================================================== */

function enableMobileAnimations(){

    AOS_CONFIG.mobile=true;

}

function enableTabletAnimations(){

    AOS_CONFIG.tablet=true;

}

function enableDesktopAnimations(){

    AOS_CONFIG.desktop=true;

}

/* ===========================================================
   STATUS
=========================================================== */

function responsiveStatus(){

    return{

        mode:

            ResponsiveAOS.current,

        mobile:

            AOS_CONFIG.mobile,

        tablet:

            AOS_CONFIG.tablet,

        desktop:

            AOS_CONFIG.desktop,

        repeat:

            !AOS_CONFIG.once,

        mirror:

            AOS_CONFIG.mirror

    };

}

/* ===========================================================
   ORIENTATION
=========================================================== */

window.addEventListener(

    "orientationchange",

    ()=>{

        setTimeout(()=>{

            detectResponsiveMode();

            applyResponsiveSettings();

            refreshVisibleAnimations();

        },300);

    }

);

/* ===========================================================
   VISIBILITY
=========================================================== */

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(

            document.hidden

        ){

            return;

        }

        refreshVisibleAnimations();

    }

);

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeResponsiveAOS();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.AOSManager,

    {

        responsive:{

            init:

                initializeResponsiveAOS,

            mode:

                screenCategory,

            status:

                responsiveStatus,

            enableRepeat:

                enableRepeatAnimation,

            disableRepeat:

                disableRepeatAnimation,

            enableMirror:

                enableMirrorAnimation,

            disableMirror:

                disableMirrorAnimation,

            enableMobile:

                enableMobileAnimations,

            enableTablet:

                enableTabletAnimations,

            enableDesktop:

                enableDesktopAnimations,

            disableMobile:

                disableMobileAnimations,

            disableTablet:

                disableTabletAnimations,

            disableDesktop:

                disableDesktopAnimations

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
 assets/js/aos.js
 Part 9
 MutationObserver • Dynamic Elements • Auto Refresh
===========================================================
*/

"use strict";

/* ===========================================================
   MUTATION OBSERVER
=========================================================== */

const MutationEngine={

    observer:null,

    enabled:true,

    watching:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeMutationObserver(){

    if(

        !AOS_CONFIG.observeMutations ||

        !MutationEngine.enabled ||

        !("MutationObserver" in window)

    ){

        return;

    }

    if(MutationEngine.observer){

        MutationEngine.observer.disconnect();

    }

    MutationEngine.observer=

        new MutationObserver(

            handleMutations

        );

    MutationEngine.observer.observe(

        document.body,

        {

            childList:true,

            subtree:true,

            attributes:true,

            attributeFilter:[

                "data-aos",

                "class"

            ]

        }

    );

    MutationEngine.watching=true;

    aosLog(

        "Mutation Observer Ready"

    );

}

/* ===========================================================
   CALLBACK
=========================================================== */

function handleMutations(records){

    let refresh=false;

    records.forEach(record=>{

        if(

            record.type==="childList"

        ){

            if(

                record.addedNodes.length ||

                record.removedNodes.length

            ){

                refresh=true;

            }

        }

        if(

            record.type==="attributes"

        ){

            refresh=true;

        }

    });

    if(refresh){

        refreshDynamicElements();

    }

}

/* ===========================================================
   REFRESH
=========================================================== */

let refreshTimer=null;

function refreshDynamicElements(){

    clearTimeout(refreshTimer);

    refreshTimer=setTimeout(()=>{

        collectAOSElements();

        prepareElements();

        initializeObserver();

        initializeFadeAnimations?.();

        initializeZoomAnimations?.();

        initializeSlideAnimations?.();

        initializeTransformAnimations?.();

        initializeTimingEngine?.();

        aosLog(

            "Dynamic Elements Refreshed"

        );

    },100);

}

/* ===========================================================
   ADD
=========================================================== */

function registerDynamicElement(element){

    if(!element){

        return;

    }

    if(

        !element.matches(

            AOS_CONFIG.selector

        )

    ){

        return;

    }

    AOSState.elements.push(element);

    prepareElements();

    AOSState.observer?.observe(

        element

    );

}

/* ===========================================================
   REMOVE
=========================================================== */

function unregisterDynamicElement(element){

    AOSState.elements=

        AOSState.elements.filter(

            item=>item!==element

        );

    AOSState.observer?.unobserve(

        element

    );

}

/* ===========================================================
   SCAN
=========================================================== */

function scanDynamicElements(){

    $$(
        AOS_CONFIG.selector
    ).forEach(element=>{

        if(

            !AOSState.elements.includes(

                element

            )

        ){

            registerDynamicElement(

                element

            );

        }

    });

}

/* ===========================================================
   START
=========================================================== */

function startMutationObserver(){

    if(

        MutationEngine.watching

    ){

        return;

    }

    initializeMutationObserver();

}

/* ===========================================================
   STOP
=========================================================== */

function stopMutationObserver(){

    if(

        !MutationEngine.observer

    ){

        return;

    }

    MutationEngine.observer.disconnect();

    MutationEngine.watching=false;

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableMutationObserver(){

    MutationEngine.enabled=true;

    startMutationObserver();

}

/* ===========================================================
   DISABLE
=========================================================== */

function disableMutationObserver(){

    MutationEngine.enabled=false;

    stopMutationObserver();

}

/* ===========================================================
   STATUS
=========================================================== */

function mutationStatus(){

    return{

        enabled:

            MutationEngine.enabled,

        watching:

            MutationEngine.watching,

        elements:

            AOSState.elements.length

    };

}

/* ===========================================================
   MANUAL
=========================================================== */

function refreshHard(){

    stopMutationObserver();

    collectAOSElements();

    prepareElements();

    initializeObserver();

    startMutationObserver();

}

/* ===========================================================
   WINDOW LOAD
=========================================================== */

window.addEventListener(

    "load",

    ()=>{

        scanDynamicElements();

    }

);

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeMutationObserver();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.AOSManager,

    {

        mutation:{

            init:

                initializeMutationObserver,

            refresh:

                refreshDynamicElements,

            refreshHard,

            register:

                registerDynamicElement,

            unregister:

                unregisterDynamicElement,

            scan:

                scanDynamicElements,

            start:

                startMutationObserver,

            stop:

                stopMutationObserver,

            enable:

                enableMutationObserver,

            disable:

                disableMutationObserver,

            status:

                mutationStatus

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
 assets/js/aos.js
 Part 10
 Performance • Optimization • Lazy Refresh • Visibility
===========================================================
*/

"use strict";

/* ===========================================================
   PERFORMANCE
=========================================================== */

const PerformanceEngine={

    enabled:true,

    fps:0,

    frames:0,

    lastFrame:performance.now(),

    rafId:null,

    refreshQueued:false,

    idleSupported:
        "requestIdleCallback" in window

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializePerformanceEngine(){

    if(!PerformanceEngine.enabled){

        return;

    }

    monitorFPS();

    preloadVisibleAnimations();

    initializeVisibilityObserver();

}

/* ===========================================================
   FPS
=========================================================== */

function monitorFPS(){

    function frame(now){

        PerformanceEngine.frames++;

        if(

            now-

            PerformanceEngine.lastFrame>=1000

        ){

            PerformanceEngine.fps=

                PerformanceEngine.frames;

            PerformanceEngine.frames=0;

            PerformanceEngine.lastFrame=now;
        }

        PerformanceEngine.rafId=

            requestAnimationFrame(frame);

    }

    PerformanceEngine.rafId=

        requestAnimationFrame(frame);

}

/* ===========================================================
   IDLE
=========================================================== */

function runWhenIdle(callback){

    if(

        PerformanceEngine.idleSupported

    ){

        requestIdleCallback(callback);

    }else{

        setTimeout(callback,1);

    }

}

/* ===========================================================
   QUEUE REFRESH
=========================================================== */

function queueRefresh(){

    if(

        PerformanceEngine.refreshQueued

    ){

        return;

    }

    PerformanceEngine.refreshQueued=true;

    runWhenIdle(()=>{

        refreshAOS();

        initializeObserver();

        PerformanceEngine.refreshQueued=false;

    });

}

/* ===========================================================
   PRELOAD
=========================================================== */

function preloadVisibleAnimations(){

    AOSState.elements.forEach(element=>{

        if(isVisible(element)){

            animateElement(element);

        }

    });

}

/* ===========================================================
   VISIBILITY OBSERVER
=========================================================== */

let VisibilityObserver=null;

function initializeVisibilityObserver(){

    if(

        !("IntersectionObserver" in window)

    ){

        return;

    }

    VisibilityObserver=

        new IntersectionObserver(

            entries=>{

                entries.forEach(entry=>{

                    if(

                        entry.isIntersecting

                    ){

                        animateElement(

                            entry.target

                        );

                    }

                });

            },

            {

                threshold:.05

            }

        );

    AOSState.elements.forEach(element=>{

        VisibilityObserver.observe(element);

    });

}

/* ===========================================================
   PREFETCH
=========================================================== */

function prefetchNearbyElements(){

    const viewport=

        window.innerHeight;

    AOSState.elements.forEach(element=>{

        const rect=

            element.getBoundingClientRect();

        if(

            rect.top<

            viewport*1.5 &&

            rect.bottom>-viewport*.5

        ){

            addClass(

                element,

                "aos-ready"

            );

        }

    });

}

/* ===========================================================
   MEMORY
=========================================================== */

function cleanupPerformance(){

    cancelAnimationFrame(

        PerformanceEngine.rafId

    );

    VisibilityObserver?.disconnect();

}

/* ===========================================================
   LOW POWER
=========================================================== */

function enableLowPowerMode(){

    AOS_CONFIG.duration=400;

    AOS_CONFIG.threshold=.2;

}

function disableLowPowerMode(){

    AOS_CONFIG.duration=800;

    AOS_CONFIG.threshold=.15;

}

/* ===========================================================
   PAGE VISIBILITY
=========================================================== */

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(document.hidden){

            cancelAnimationFrame(

                PerformanceEngine.rafId

            );

            return;

        }

        monitorFPS();

        queueRefresh();

    }

);

/* ===========================================================
   NETWORK
=========================================================== */

window.addEventListener(

    "online",

    ()=>{

        queueRefresh();

    }

);

window.addEventListener(

    "offline",

    ()=>{

        aosLog(

            "Offline Mode"

        );

    }

);

/* ===========================================================
   SCROLL
=========================================================== */

window.addEventListener(

    "scroll",

    ()=>{

        prefetchNearbyElements();

    },

    {

        passive:true

    }

);

/* ===========================================================
   REPORT
=========================================================== */

function performanceStatus(){

    return{

        fps:

            PerformanceEngine.fps,

        queued:

            PerformanceEngine.refreshQueued,

        elements:

            AOSState.elements.length,

        observer:

            Boolean(

                VisibilityObserver

            )

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializePerformanceEngine();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.AOSManager,

    {

        performance:{

            init:

                initializePerformanceEngine,

            queueRefresh,

            preload:

                preloadVisibleAnimations,

            cleanup:

                cleanupPerformance,

            enableLowPower:

                enableLowPowerMode,

            disableLowPower:

                disableLowPowerMode,

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
 assets/js/aos.js
 Part 11
 Utilities • Debug • Report • Public API
===========================================================
*/

"use strict";

/* ===========================================================
   INFORMATION
=========================================================== */

const AOSInfo={

    name:"AOS Manager",

    version:"1.0.0",

    author:"Investment Technology Indonesia",

    environment:"production"

};

/* ===========================================================
   DEBUG
=========================================================== */

function enableAOSDebug(){

    AOSApp.debug=true;

    aosLog("Debug Enabled");

}

function disableAOSDebug(){

    AOSApp.debug=false;

}

function debug(...args){

    if(!AOSApp.debug){

        return;

    }

    console.log(

        "[AOS Debug]",

        ...args

    );

}

function warn(message){

    console.warn(

        "[AOS Warning]",

        message

    );

}

function error(message){

    console.error(

        "[AOS Error]",

        message

    );

}

/* ===========================================================
   UUID
=========================================================== */

function aosID(){

    if(window.crypto?.randomUUID){

        return crypto.randomUUID();

    }

    return "aos-"+

        Date.now()+"-"+

        Math.random()

        .toString(36)

        .substring(2,10);

}

/* ===========================================================
   WAIT
=========================================================== */

function wait(milliseconds=300){

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
   FORMAT
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

function timestamp(){

    return new Date()

        .toLocaleString(

            "id-ID"

        );

}

/* ===========================================================
   REPORT
=========================================================== */

function aosReport(){

    return{

        info:AOSInfo,

        app:AOSApp,

        config:AOS_CONFIG,

        state:{

            initialized:

                AOSState.initialized,

            elements:

                AOSState.elements.length,

            viewport:{

                width:

                    window.innerWidth,

                height:

                    window.innerHeight

            }

        },

        responsive:

            responsiveStatus?.(),

        timing:

            timingReport?.(),

        mutation:

            mutationStatus?.(),

        performance:

            performanceStatus?.(),

        timestamp:

            timestamp()

    };

}

/* ===========================================================
   PRINT REPORT
=========================================================== */

function printReport(){

    console.table(

        aosReport()

    );

}

/* ===========================================================
   RESET
=========================================================== */

function resetAOS(){

    resetAllElements?.();

    resetFadeAnimations?.();

    resetZoomAnimations?.();

    resetSlideAnimations?.();

    resetTransformAnimations?.();

    refreshAOS();

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroyManager(){

    cleanupPerformance?.();

    stopMutationObserver?.();

    destroyAOS();

    aosLog(

        "AOS Manager Destroyed"

    );

}

/* ===========================================================
   RESTART
=========================================================== */

function restart(){

    destroyManager();

    initializeAOS();

    initializeObserver?.();

}

/* ===========================================================
   READY
=========================================================== */

function ready(){

    return{

        initialized:

            AOSApp.initialized,

        elements:

            AOSState.elements.length,

        observer:

            Boolean(

                AOSState.observer

            )

    };

}

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.AOSManager,

    {

        info:AOSInfo,

        report:aosReport,

        printReport,

        reset:resetAOS,

        destroy:destroyManager,

        restart,

        ready,

        enableDebug:

            enableAOSDebug,

        disableDebug:

            disableAOSDebug,

        debug,

        warn,

        error,

        wait,

        debounce,

        throttle,

        clamp,

        formatMilliseconds,

        formatPercent,

        timestamp,

        aosID

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        debug(

            "Utilities Ready"

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
 assets/js/aos.js
 Part 12
 Final Initialization • Cleanup • Export • End of File
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION INITIALIZER
=========================================================== */

function initializeAOSManager(){

    if(AOSApp.initialized){

        aosLog(

            "AOS Manager already initialized."

        );

        return;

    }

    AOSApp.initialized=true;

    aosLog(

        "Initializing AOS Manager..."

    );

    initializeAOS?.();

    initializeObserver?.();

    initializeFadeAnimations?.();

    initializeZoomAnimations?.();

    initializeSlideAnimations?.();

    initializeTransformAnimations?.();

    initializeTimingEngine?.();

    initializeResponsiveAOS?.();

    initializeMutationObserver?.();

    initializePerformanceEngine?.();

    aosLog(

        "AOS Manager Ready."

    );

}

/* ===========================================================
   GLOBAL EVENTS
=========================================================== */

window.addEventListener(

    "load",

    ()=>{

        refreshAOS?.();

        initializeObserver?.();

        aosLog(

            "Window Loaded"

        );

    }

);

window.addEventListener(

    "pageshow",

    ()=>{

        refreshHard?.();

    }

);

window.addEventListener(

    "focus",

    ()=>{

        queueRefresh?.();

    }

);

window.addEventListener(

    "blur",

    ()=>{

        aosLog(

            "Window Blur"

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

            event.reason

        );

    }

);

/* ===========================================================
   CLEANUP
=========================================================== */

function cleanupAOSManager(){

    cleanupPerformance?.();

    stopMutationObserver?.();

    AOSState.observer?.disconnect();

    AOSState.observer=null;

    aosLog(

        "Cleanup Complete"

    );

}

/* ===========================================================
   BEFORE UNLOAD
=========================================================== */

window.addEventListener(

    "beforeunload",

    ()=>{

        cleanupAOSManager();

    }

);

/* ===========================================================
   FREEZE CONFIG
=========================================================== */

Object.freeze(

    AOS_CONFIG

);

Object.freeze(

    AOSInfo

);

/* ===========================================================
   EXPORT
=========================================================== */

window.AOSManager=Object.assign(

    window.AOSManager||{},

    {

        initialize:

            initializeAOSManager,

        cleanup:

            cleanupAOSManager,

        version:

            ()=>AOSInfo.version,

        report:

            aosReport,

        ready,

        state:

            AOSState,

        config:

            AOS_CONFIG,

        app:

            AOSApp,

        info:

            AOSInfo

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeAOSManager();

    }

);

/* ===========================================================
   FINAL REPORT
=========================================================== */

aosLog(

"========================================"

);

aosLog(

"Investment Technology Indonesia"

);

aosLog(

"AOS Manager"

);

aosLog(

"Version:",

AOSInfo.version

);

aosLog(

"Environment:",

AOSInfo.environment

);

aosLog(

"========================================"

);

/* ===========================================================
   FEATURES
=========================================================== */

/*
✔ Core AOS Engine
✔ Intersection Observer
✔ Fade Animations
✔ Zoom Animations
✔ Scale Animations
✔ Pop & Bounce Effects
✔ Slide Animations
✔ Flip Animations
✔ Rotate Animations
✔ Skew Animations
✔ Delay Engine
✔ Duration Engine
✔ Easing Engine
✔ Responsive Breakpoints
✔ Repeat Animation
✔ Mirror Animation
✔ MutationObserver
✔ Dynamic Elements
✔ Auto Refresh
✔ Lazy Refresh
✔ Performance Optimization
✔ FPS Monitor
✔ Visibility Observer
✔ Accessibility Friendly
✔ Debug Utilities
✔ Report Generator
✔ Public API
✔ ES6+ Modern JavaScript
✔ Responsive
✔ Optimized
*/

/* ===========================================================
   END OF FILE
   assets/js/aos.js
=========================================================== */