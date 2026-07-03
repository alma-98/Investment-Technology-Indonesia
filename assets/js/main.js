/*!
===========================================================
 Investment Technology Indonesia
 assets/js/main.js
 Part 1
 Core • Config • Utilities
===========================================================
*/

"use strict";

/* ===========================================================
   APP
=========================================================== */

const App = {

    version: "1.0.0",

    name: "Investment Technology Indonesia",

    debug: false,

    initialized: false

};

/* ===========================================================
   CONFIG
=========================================================== */

const CONFIG = {

    scrollOffset: 90,

    animationDuration: 600,

    mobileBreakpoint: 992,

    backToTopOffset: 400,

    loadingDelay: 500,

    toastDuration: 3500,

    chatbotDelay: 800,

    counterSpeed: 2000,

    enableDarkMode: true,

    enableLoading: true,

    enableReveal: true,

    enableLazyLoad: true

};

/* ===========================================================
   SELECTORS
=========================================================== */

const SELECTOR = {

    body: document.body,

    html: document.documentElement,

    header: document.querySelector("header"),

    navbar: document.querySelector(".navbar"),

    mobileMenu: document.querySelector(".mobile-menu"),

    loading: document.querySelector(".loading"),

    backTop: document.querySelector(".back-to-top"),

    chatbot: document.querySelector(".chatbot"),

    darkToggle: document.querySelector(".dark-toggle")

};

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeApplication();

});

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeApplication(){

    if(App.initialized){

        return;

    }

    App.initialized = true;

    log("Application Initialized");

}

/* ===========================================================
   LOGGER
=========================================================== */

function log(...message){

    if(!App.debug){

        return;

    }

    console.log(

        "[Investment Technology Indonesia]",

        ...message

    );

}

/* ===========================================================
   ELEMENT
=========================================================== */

function $(selector,parent=document){

    return parent.querySelector(selector);

}

function $$(selector,parent=document){

    return [...parent.querySelectorAll(selector)];

}

/* ===========================================================
   EVENT
=========================================================== */

function on(element,event,callback,options=false){

    if(!element){

        return;

    }

    element.addEventListener(

        event,

        callback,

        options

    );

}

function off(element,event,callback){

    if(!element){

        return;

    }

    element.removeEventListener(

        event,

        callback

    );

}

/* ===========================================================
   CREATE ELEMENT
=========================================================== */

function createElement(

    tag,

    className="",

    html=""

){

    const element=document.createElement(tag);

    if(className){

        element.className=className;

    }

    if(html){

        element.innerHTML=html;

    }

    return element;

}

/* ===========================================================
   CLASS HELPERS
=========================================================== */

function addClass(element,className){

    if(element){

        element.classList.add(className);

    }

}

function removeClass(element,className){

    if(element){

        element.classList.remove(className);

    }

}

function toggleClass(element,className){

    if(element){

        element.classList.toggle(className);

    }

}

function hasClass(element,className){

    if(!element){

        return false;

    }

    return element.classList.contains(className);

}

/* ===========================================================
   ATTRIBUTE
=========================================================== */

function attr(element,name,value=null){

    if(!element){

        return null;

    }

    if(value===null){

        return element.getAttribute(name);

    }

    element.setAttribute(name,value);

}

/* ===========================================================
   CSS VARIABLE
=========================================================== */

function setCSSVariable(name,value){

    document.documentElement.style.setProperty(

        name,

        value

    );

}

function getCSSVariable(name){

    return getComputedStyle(

        document.documentElement

    ).getPropertyValue(name);

}

/* ===========================================================
   SCROLL
=========================================================== */

function getScrollTop(){

    return window.pageYOffset ||

        document.documentElement.scrollTop;

}

function scrollToTop(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/* ===========================================================
   VIEWPORT
=========================================================== */

function viewportWidth(){

    return window.innerWidth;

}

function viewportHeight(){

    return window.innerHeight;

}

function isMobile(){

    return viewportWidth() <= CONFIG.mobileBreakpoint;

}

/* ===========================================================
   STORAGE
=========================================================== */

function saveStorage(key,value){

    localStorage.setItem(

        key,

        JSON.stringify(value)

    );

}

function loadStorage(key){

    const data=localStorage.getItem(key);

    if(!data){

        return null;

    }

    return JSON.parse(data);

}

function removeStorage(key){

    localStorage.removeItem(key);

}

/* ===========================================================
   THEME
=========================================================== */

function isDarkMode(){

    return document.body.classList.contains("dark");

}

function setDarkMode(enable){

    if(enable){

        addClass(document.body,"dark");

        saveStorage("theme","dark");

    }else{

        removeClass(document.body,"dark");

        saveStorage("theme","light");

    }

}

function initializeTheme(){

    if(!CONFIG.enableDarkMode){

        return;

    }

    const savedTheme=loadStorage("theme");

    if(savedTheme==="dark"){

        addClass(document.body,"dark");

    }

}

/* ===========================================================
   DEVICE
=========================================================== */

const DEVICE={

    touch:

        "ontouchstart" in window,

    retina:

        window.devicePixelRatio>1,

    online:

        navigator.onLine

};

/* ===========================================================
   WINDOW EVENTS
=========================================================== */

window.addEventListener(

    "online",

    ()=>{

        DEVICE.online=true;

    }

);

window.addEventListener(

    "offline",

    ()=>{

        DEVICE.online=false;

    }

);

/* ===========================================================
   END PART 1
=========================================================== */
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/main.js
 Part 2
 Header • Navigation • Mobile Menu
===========================================================
*/

/* ===========================================================
   HEADER
=========================================================== */

const Header = {

    element: $("header"),

    lastScroll: 0

};

/* ===========================================================
   INIT HEADER
=========================================================== */

function initializeHeader(){

    if(!Header.element){

        return;

    }

    updateHeader();

    window.addEventListener("scroll",updateHeader);

}

/* ===========================================================
   UPDATE HEADER
=========================================================== */

function updateHeader(){

    const scroll=getScrollTop();

    if(scroll>40){

        addClass(Header.element,"sticky");

    }else{

        removeClass(Header.element,"sticky");

    }

    if(scroll>Header.lastScroll && scroll>150){

        addClass(Header.element,"header-hidden");

    }else{

        removeClass(Header.element,"header-hidden");

    }

    Header.lastScroll=scroll;

}

/* ===========================================================
   MOBILE MENU
=========================================================== */

const MobileMenu={

    button:$(".menu-toggle"),

    menu:$(".mobile-menu"),

    overlay:$(".mobile-overlay"),

    close:$(".menu-close"),

    opened:false

};

/* ===========================================================
   INIT MOBILE MENU
=========================================================== */

function initializeMobileMenu(){

    if(!MobileMenu.button || !MobileMenu.menu){

        return;

    }

    on(MobileMenu.button,"click",toggleMobileMenu);

    on(MobileMenu.close,"click",closeMobileMenu);

    on(MobileMenu.overlay,"click",closeMobileMenu);

}

/* ===========================================================
   OPEN
=========================================================== */

function openMobileMenu(){

    addClass(MobileMenu.menu,"active");

    addClass(document.body,"menu-open");

    addClass(MobileMenu.button,"active");

    if(MobileMenu.overlay){

        addClass(MobileMenu.overlay,"active");

    }

    MobileMenu.opened=true;

}

/* ===========================================================
   CLOSE
=========================================================== */

function closeMobileMenu(){

    removeClass(MobileMenu.menu,"active");

    removeClass(document.body,"menu-open");

    removeClass(MobileMenu.button,"active");

    if(MobileMenu.overlay){

        removeClass(MobileMenu.overlay,"active");

    }

    MobileMenu.opened=false;

}

/* ===========================================================
   TOGGLE
=========================================================== */

function toggleMobileMenu(){

    MobileMenu.opened

        ? closeMobileMenu()

        : openMobileMenu();

}

/* ===========================================================
   CLOSE ON LINK
=========================================================== */

$$(".mobile-menu a").forEach(link=>{

    on(link,"click",()=>{

        closeMobileMenu();

    });

});

/* ===========================================================
   DROPDOWN
=========================================================== */

function initializeDropdowns(){

    $$(".dropdown").forEach(dropdown=>{

        const button=$(".dropdown-toggle",dropdown);

        if(!button){

            return;

        }

        on(button,"click",(event)=>{

            event.preventDefault();

            dropdown.classList.toggle("open");

        });

    });

    document.addEventListener("click",(event)=>{

        $$(".dropdown.open").forEach(dropdown=>{

            if(!dropdown.contains(event.target)){

                dropdown.classList.remove("open");

            }

        });

    });

}

/* ===========================================================
   SMOOTH SCROLL
=========================================================== */

function initializeSmoothScroll(){

    $$('a[href^="#"]').forEach(anchor=>{

        on(anchor,"click",(event)=>{

            const target=$(anchor.getAttribute("href"));

            if(!target){

                return;

            }

            event.preventDefault();

            window.scrollTo({

                top:

                    target.offsetTop-

                    CONFIG.scrollOffset,

                behavior:"smooth"

            });

        });

    });

}

/* ===========================================================
   ACTIVE NAVIGATION
=========================================================== */

function updateActiveNavigation(){

    const sections=$$("section[id]");

    const scroll=getScrollTop();

    sections.forEach(section=>{

        const top=

            section.offsetTop-

            CONFIG.scrollOffset-40;

        const bottom=

            top+

            section.offsetHeight;

        if(scroll>=top && scroll<bottom){

            $$("nav a").forEach(link=>{

                removeClass(link,"active");

            });

            const current=$(

                `nav a[href="#${section.id}"]`

            );

            if(current){

                addClass(current,"active");

            }

        }

    });

}

window.addEventListener(

    "scroll",

    updateActiveNavigation

);

/* ===========================================================
   SEARCH OVERLAY
=========================================================== */

function initializeSearch(){

    const open=$(".search-toggle");

    const overlay=$(".search-overlay");

    const close=$(".search-close");

    if(open){

        on(open,"click",()=>{

            addClass(overlay,"active");

        });

    }

    if(close){

        on(close,"click",()=>{

            removeClass(overlay,"active");

        });

    }

}

/* ===========================================================
   ESC KEY
=========================================================== */

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        closeMobileMenu();

        removeClass(

            $(".search-overlay"),

            "active"

        );

    }

});

/* ===========================================================
   WINDOW RESIZE
=========================================================== */

window.addEventListener("resize",()=>{

    if(!isMobile()){

        closeMobileMenu();

    }

});

/* ===========================================================
   WINDOW SCROLL
=========================================================== */

window.addEventListener("scroll",()=>{

    updateHeader();

    updateActiveNavigation();

});

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    initializeHeader();

    initializeMobileMenu();

    initializeDropdowns();

    initializeSmoothScroll();

    initializeSearch();

});

/* ===========================================================
   END PART 2
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/main.js
 Part 3
 Hero • Scroll Reveal • Counter • Progress
===========================================================
*/

/* ===========================================================
   HERO ANIMATION
=========================================================== */

const Hero={

    section:$(".hero"),

    title:$(".hero-title"),

    subtitle:$(".hero-subtitle"),

    description:$(".hero-description"),

    buttons:$$(".hero .btn")

};

function initializeHero(){

    if(!Hero.section){

        return;

    }

    addClass(Hero.section,"loaded");

    animateHero();

}

function animateHero(){

    const elements=[

        Hero.subtitle,

        Hero.title,

        Hero.description,

        ...Hero.buttons

    ];

    elements.forEach((element,index)=>{

        if(!element){

            return;

        }

        element.style.opacity="0";

        element.style.transform="translateY(30px)";

        setTimeout(()=>{

            element.style.transition=

                "all .7s ease";

            element.style.opacity="1";

            element.style.transform=

                "translateY(0)";

        },index*180);

    });

}

/* ===========================================================
   INTERSECTION OBSERVER
=========================================================== */

const RevealObserver=

new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            addClass(

                entry.target,

                "revealed"

            );

            RevealObserver.unobserve(

                entry.target

            );

        }

    });

},

{

    threshold:.15,

    rootMargin:"0px 0px -60px 0px"

}

);

/* ===========================================================
   SCROLL REVEAL
=========================================================== */

function initializeReveal(){

    if(!CONFIG.enableReveal){

        return;

    }

    $$("[data-reveal]").forEach(element=>{

        RevealObserver.observe(element);

    });

}

/* ===========================================================
   COUNTER
=========================================================== */

function initializeCounters(){

    const counters=$$("[data-counter]");

    if(!counters.length){

        return;

    }

    const observer=new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting){

                    return;

                }

                animateCounter(entry.target);

                observer.unobserve(entry.target);

            });

        },

        {

            threshold:.4

        }

    );

    counters.forEach(counter=>{

        observer.observe(counter);

    });

}

/* ===========================================================
   COUNTER ANIMATION
=========================================================== */

function animateCounter(element){

    const target=parseInt(

        element.dataset.counter,

        10

    );

    const duration=CONFIG.counterSpeed;

    const start=0;

    let current=start;

    const increment=

        target/

        (duration/16);

    function update(){

        current+=increment;

        if(current>=target){

            element.textContent=

                target.toLocaleString();

            return;

        }

        element.textContent=

            Math.floor(current)

            .toLocaleString();

        requestAnimationFrame(update);

    }

    update();

}

/* ===========================================================
   PROGRESS BAR
=========================================================== */

function initializeProgress(){

    const bars=$$("[data-progress]");

    if(!bars.length){

        return;

    }

    const observer=new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    animateProgress(

                        entry.target

                    );

                    observer.unobserve(

                        entry.target

                    );

                }

            });

        },

        {

            threshold:.25

        }

    );

    bars.forEach(bar=>{

        observer.observe(bar);

    });

}

/* ===========================================================
   PROGRESS ANIMATION
=========================================================== */

function animateProgress(bar){

    const value=

        bar.dataset.progress || 0;

    bar.style.width="0";

    setTimeout(()=>{

        bar.style.transition=

            "width 1.5s ease";

        bar.style.width=

            value+"%";

    },100);

}

/* ===========================================================
   PARALLAX HERO
=========================================================== */

function initializeParallax(){

    if(isMobile()){

        return;

    }

    window.addEventListener(

        "scroll",

        ()=>{

            if(!Hero.section){

                return;

            }

            const scroll=

                getScrollTop();

            Hero.section.style.backgroundPosition=

                `center ${scroll*.3}px`;

        }

    );

}

/* ===========================================================
   FLOATING ELEMENTS
=========================================================== */

function initializeFloating(){

    const items=$$(".floating");

    if(!items.length){

        return;

    }

    items.forEach((item,index)=>{

        item.animate(

            [

                {

                    transform:

                    "translateY(0)"

                },

                {

                    transform:

                    "translateY(-12px)"

                },

                {

                    transform:

                    "translateY(0)"

                }

            ],

            {

                duration:

                    3500+

                    (index*350),

                iterations:

                    Infinity,

                easing:"ease-in-out"

            }

        );

    });

}

/* ===========================================================
   FADE IN ON SCROLL
=========================================================== */

function initializeFadeElements(){

    $$("[data-fade]").forEach(element=>{

        RevealObserver.observe(element);

    });

}

/* ===========================================================
   SCALE ON VIEW
=========================================================== */

function initializeScaleElements(){

    $$("[data-scale]").forEach(element=>{

        RevealObserver.observe(element);

    });

}

/* ===========================================================
   SECTION HIGHLIGHT
=========================================================== */

function initializeSectionHighlight(){

    const sections=$$("section");

    const observer=

    new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    addClass(

                        entry.target,

                        "section-active"

                    );

                }

            });

        },

        {

            threshold:.2

        }

    );

    sections.forEach(section=>{

        observer.observe(section);

    });

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeHero();

        initializeReveal();

        initializeCounters();

        initializeProgress();

        initializeParallax();

        initializeFloating();

        initializeFadeElements();

        initializeScaleElements();

        initializeSectionHighlight();

    }

);

/* ===========================================================
   END PART 3
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/main.js
 Part 4
 Portfolio • FAQ • Tabs • Modal • Gallery
===========================================================
*/

/* ===========================================================
   PORTFOLIO FILTER
=========================================================== */

const Portfolio = {

    filters: $$(".portfolio-filter button"),

    items: $$(".portfolio-item")

};

function initializePortfolio(){

    if(!Portfolio.filters.length){

        return;

    }

    Portfolio.filters.forEach(button=>{

        on(button,"click",()=>{

            Portfolio.filters.forEach(btn=>{

                removeClass(btn,"active");

            });

            addClass(button,"active");

            filterPortfolio(

                button.dataset.filter

            );

        });

    });

}

function filterPortfolio(category){

    Portfolio.items.forEach(item=>{

        if(

            category==="all" ||

            item.dataset.category===category

        ){

            item.style.display="block";

            requestAnimationFrame(()=>{

                item.style.opacity="1";

                item.style.transform="scale(1)";

            });

        }else{

            item.style.opacity="0";

            item.style.transform="scale(.9)";

            setTimeout(()=>{

                item.style.display="none";

            },250);

        }

    });

}

/* ===========================================================
   SEARCH FILTER
=========================================================== */

function initializePortfolioSearch(){

    const input=$(".portfolio-search");

    if(!input){

        return;

    }

    on(input,"input",()=>{

        const keyword=

            input.value.toLowerCase();

        Portfolio.items.forEach(item=>{

            const text=

                item.textContent.toLowerCase();

            item.style.display=

                text.includes(keyword)

                ? "block"

                : "none";

        });

    });

}

/* ===========================================================
   FAQ ACCORDION
=========================================================== */

function initializeFAQ(){

    const items=$$(".faq-item");

    if(!items.length){

        return;

    }

    items.forEach(item=>{

        const question=

            $(".faq-question",item);

        if(!question){

            return;

        }

        on(question,"click",()=>{

            items.forEach(other=>{

                if(other!==item){

                    removeClass(other,"active");

                }

            });

            toggleClass(item,"active");

        });

    });

}

/* ===========================================================
   TABS
=========================================================== */

function initializeTabs(){

    $$(".tabs").forEach(group=>{

        const buttons=$$(".tab-button",group);

        const panels=$$(".tab-panel",group);

        buttons.forEach(button=>{

            on(button,"click",()=>{

                const target=

                    button.dataset.tab;

                buttons.forEach(btn=>{

                    removeClass(btn,"active");

                });

                panels.forEach(panel=>{

                    removeClass(panel,"active");

                });

                addClass(button,"active");

                const panel=

                    $("#"+target);

                if(panel){

                    addClass(panel,"active");

                }

            });

        });

    });

}

/* ===========================================================
   MODAL
=========================================================== */

function initializeModal(){

    const opens=$$("[data-modal]");

    const closes=$$(".modal-close");

    opens.forEach(button=>{

        on(button,"click",()=>{

            const modal=$(
                button.dataset.modal
            );

            if(modal){

                addClass(modal,"active");

                document.body.classList.add(

                    "modal-open"

                );

            }

        });

    });

    closes.forEach(button=>{

        on(button,"click",()=>{

            const modal=

                button.closest(".modal");

            if(modal){

                closeModal(modal);

            }

        });

    });

    $$(".modal").forEach(modal=>{

        on(modal,"click",(event)=>{

            if(event.target===modal){

                closeModal(modal);

            }

        });

    });

}

function closeModal(modal){

    removeClass(modal,"active");

    removeClass(

        document.body,

        "modal-open"

    );

}

/* ===========================================================
   LIGHTBOX
=========================================================== */

function initializeLightbox(){

    const images=$$("[data-lightbox]");

    if(!images.length){

        return;

    }

    images.forEach(image=>{

        on(image,"click",()=>{

            openLightbox(

                image.getAttribute("src")

            );

        });

    });

}

function openLightbox(src){

    let overlay=$("#lightbox");

    if(!overlay){

        overlay=createElement(

            "div",

            "lightbox"

        );

        overlay.id="lightbox";

        overlay.innerHTML=

        `
        <div class="lightbox-content">
            <img src="">
            <button class="lightbox-close">
                ×
            </button>
        </div>
        `;

        document.body.appendChild(

            overlay

        );

    }

    $("img",overlay).src=src;

    addClass(overlay,"active");

    on(

        $(".lightbox-close",overlay),

        "click",

        ()=>{

            removeClass(

                overlay,

                "active"

            );

        }

    );

}

/* ===========================================================
   VIDEO POPUP
=========================================================== */

function initializeVideoPopup(){

    $$("[data-video]").forEach(button=>{

        on(button,"click",()=>{

            const url=

                button.dataset.video;

            openVideo(url);

        });

    });

}

function openVideo(url){

    const modal=createElement(

        "div",

        "video-modal active"

    );

    modal.innerHTML=

    `
    <div class="video-wrapper">
        <iframe
        src="${url}"
        allowfullscreen>
        </iframe>

        <button class="video-close">
            ×
        </button>
    </div>
    `;

    document.body.appendChild(modal);

    on(

        $(".video-close",modal),

        "click",

        ()=>{

            modal.remove();

        }

    );

}

/* ===========================================================
   ESCAPE KEY
=========================================================== */

document.addEventListener(

    "keydown",

    event=>{

        if(event.key!=="Escape"){

            return;

        }

        $$(".modal.active").forEach(modal=>{

            closeModal(modal);

        });

        const lightbox=$("#lightbox");

        if(lightbox){

            removeClass(

                lightbox,

                "active"

            );

        }

        const video=$(".video-modal");

        if(video){

            video.remove();

        }

    }

);

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializePortfolio();

        initializePortfolioSearch();

        initializeFAQ();

        initializeTabs();

        initializeModal();

        initializeLightbox();

        initializeVideoPopup();

    }

);

/* ===========================================================
   END PART 4
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/main.js
 Part 5
 Slider • Carousel • Gallery
===========================================================
*/

/* ===========================================================
   SLIDER
=========================================================== */

class Slider{

    constructor(selector,options={}){

        this.container=$(selector);

        if(!this.container){

            return;

        }

        this.track=$(".slider-track",this.container);

        this.slides=$$(".slide",this.container);

        this.prev=$(".slider-prev",this.container);

        this.next=$(".slider-next",this.container);

        this.dots=$(".slider-dots",this.container);

        this.current=0;

        this.timer=null;

        this.options=Object.assign({

            autoplay:true,

            interval:5000,

            loop:true,

            pauseOnHover:true,

            swipe:true

        },options);

        this.initialize();

    }

    initialize(){

        if(!this.track||!this.slides.length){

            return;

        }

        this.createDots();

        this.bindEvents();

        this.update();

        if(this.options.autoplay){

            this.start();

        }

    }

    createDots(){

        if(!this.dots){

            return;

        }

        this.dots.innerHTML="";

        this.slides.forEach((slide,index)=>{

            const dot=createElement(

                "button",

                "slider-dot"

            );

            if(index===0){

                addClass(dot,"active");

            }

            on(dot,"click",()=>{

                this.go(index);

            });

            this.dots.appendChild(dot);

        });

    }

    bindEvents(){

        if(this.next){

            on(this.next,"click",()=>{

                this.nextSlide();

            });

        }

        if(this.prev){

            on(this.prev,"click",()=>{

                this.prevSlide();

            });

        }

        if(this.options.pauseOnHover){

            on(this.container,"mouseenter",()=>{

                this.stop();

            });

            on(this.container,"mouseleave",()=>{

                this.start();

            });

        }

        if(this.options.swipe){

            this.enableSwipe();

        }

    }

    update(){

        this.track.style.transform=

        `translateX(-${this.current*100}%)`;

        if(this.dots){

            $$("button",this.dots).forEach(

                (dot,index)=>{

                    dot.classList.toggle(

                        "active",

                        index===this.current

                    );

                }

            );

        }

    }

    go(index){

        this.current=index;

        this.update();

    }

    nextSlide(){

        this.current++;

        if(this.current>=this.slides.length){

            this.current=this.options.loop

                ?0

                :this.slides.length-1;

        }

        this.update();

    }

    prevSlide(){

        this.current--;

        if(this.current<0){

            this.current=this.options.loop

                ?this.slides.length-1

                :0;

        }

        this.update();

    }

    start(){

        if(!this.options.autoplay){

            return;

        }

        this.stop();

        this.timer=setInterval(()=>{

            this.nextSlide();

        },this.options.interval);

    }

    stop(){

        clearInterval(this.timer);

    }

    enableSwipe(){

        let startX=0;

        let endX=0;

        on(this.container,"touchstart",event=>{

            startX=event.touches[0].clientX;

        });

        on(this.container,"touchend",event=>{

            endX=event.changedTouches[0].clientX;

            const diff=startX-endX;

            if(Math.abs(diff)<50){

                return;

            }

            diff>0

                ?this.nextSlide()

                :this.prevSlide();

        });

    }

}

/* ===========================================================
   TESTIMONIAL
=========================================================== */

let testimonialSlider=null;

function initializeTestimonials(){

    testimonialSlider=new Slider(

        ".testimonial-slider",

        {

            autoplay:true,

            interval:6000

        }

    );

}

/* ===========================================================
   CLIENT LOGO
=========================================================== */

function initializeClientCarousel(){

    const track=$(".client-track");

    if(!track){

        return;

    }

    let position=0;

    function animate(){

        position-=1;

        if(

            Math.abs(position)>=

            track.scrollWidth/2

        ){

            position=0;

        }

        track.style.transform=

        `translateX(${position}px)`;

        requestAnimationFrame(animate);

    }

    animate();

}

/* ===========================================================
   GALLERY
=========================================================== */

let gallerySlider=null;

function initializeGallerySlider(){

    gallerySlider=new Slider(

        ".gallery-slider",

        {

            autoplay:true,

            interval:4000

        }

    );

}

/* ===========================================================
   VIDEO
=========================================================== */

let videoSlider=null;

function initializeVideoSlider(){

    videoSlider=new Slider(

        ".video-slider",

        {

            autoplay:false,

            swipe:true

        }

    );

}

/* ===========================================================
   KEYBOARD
=========================================================== */

document.addEventListener(

    "keydown",

    event=>{

        if(

            event.key==="ArrowRight"

        ){

            testimonialSlider?.nextSlide();

        }

        if(

            event.key==="ArrowLeft"

        ){

            testimonialSlider?.prevSlide();

        }

    }

);

/* ===========================================================
   VISIBILITY
=========================================================== */

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(document.hidden){

            testimonialSlider?.stop();

            gallerySlider?.stop();

        }else{

            testimonialSlider?.start();

            gallerySlider?.start();

        }

    }

);

/* ===========================================================
   RESIZE
=========================================================== */

window.addEventListener(

    "resize",

    ()=>{

        testimonialSlider?.update();

        gallerySlider?.update();

        videoSlider?.update();

    }

);

/* ===========================================================
   INIT
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeTestimonials();

        initializeClientCarousel();

        initializeGallerySlider();

        initializeVideoSlider();

    }

);

/* ===========================================================
   END PART 5
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/main.js
 Part 6
 Contact Form • Validation • Newsletter • Toast
===========================================================
*/

/* ===========================================================
   CONTACT FORM
=========================================================== */

const ContactForm={

    form:$("#contactForm"),

    endpoint:""

};

function initializeContactForm(){

    if(!ContactForm.form){

        return;

    }

    on(ContactForm.form,"submit",submitContactForm);

}

async function submitContactForm(event){

    event.preventDefault();

    const form=event.target;

    if(!validateForm(form)){

        showToast(

            "Mohon lengkapi data terlebih dahulu.",

            "error"

        );

        return;

    }

    const button=form.querySelector(

        'button[type="submit"]'

    );

    setButtonLoading(button,true);

    try{

        const data=new FormData(form);

        if(ContactForm.endpoint){

            await fetch(

                ContactForm.endpoint,

                {

                    method:"POST",

                    body:data

                }

            );

        }

        form.reset();

        showToast(

            "Pesan berhasil dikirim.",

            "success"

        );

    }catch(error){

        console.error(error);

        showToast(

            "Gagal mengirim pesan.",

            "error"

        );

    }

    setButtonLoading(button,false);

}

/* ===========================================================
   VALIDATION
=========================================================== */

function validateForm(form){

    let valid=true;

    $$("[required]",form).forEach(field=>{

        if(

            !field.value.trim()

        ){

            valid=false;

            addClass(field,"is-invalid");

        }else{

            removeClass(field,"is-invalid");

        }

    });

    return valid;

}

/* ===========================================================
   EMAIL
=========================================================== */

function validateEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        .test(email);

}

/* ===========================================================
   INPUT VALIDATION
=========================================================== */

$$("input,textarea,select").forEach(field=>{

    on(field,"input",()=>{

        removeClass(field,"is-invalid");

    });

});

/* ===========================================================
   BUTTON LOADING
=========================================================== */

function setButtonLoading(

    button,

    loading

){

    if(!button){

        return;

    }

    if(loading){

        button.disabled=true;

        button.dataset.original=

            button.innerHTML;

        button.innerHTML=

        `
        <span class="spinner"></span>
        Mengirim...
        `;

    }else{

        button.disabled=false;

        button.innerHTML=

            button.dataset.original;

    }

}

/* ===========================================================
   NEWSLETTER
=========================================================== */

function initializeNewsletter(){

    const form=$("#newsletterForm");

    if(!form){

        return;

    }

    on(form,"submit",(event)=>{

        event.preventDefault();

        const email=form.email.value;

        if(!validateEmail(email)){

            showToast(

                "Email tidak valid.",

                "warning"

            );

            return;

        }

        form.reset();

        showToast(

            "Berhasil berlangganan.",

            "success"

        );

    });

}

/* ===========================================================
   TOAST
=========================================================== */

function showToast(

    message,

    type="success"

){

    let container=$("#toastContainer");

    if(!container){

        container=createElement(

            "div",

            "toast-container"

        );

        container.id="toastContainer";

        document.body.appendChild(container);

    }

    const toast=createElement(

        "div",

        `toast toast-${type}`

    );

    toast.innerHTML=`

        <div class="toast-icon">

            ${getToastIcon(type)}

        </div>

        <div class="toast-message">

            ${message}

        </div>

    `;

    container.appendChild(toast);

    requestAnimationFrame(()=>{

        addClass(toast,"show");

    });

    setTimeout(()=>{

        removeClass(toast,"show");

        setTimeout(()=>{

            toast.remove();

        },300);

    },CONFIG.toastDuration);

}

/* ===========================================================
   TOAST ICON
=========================================================== */

function getToastIcon(type){

    switch(type){

        case "success":

            return "✔";

        case "error":

            return "✖";

        case "warning":

            return "⚠";

        case "info":

            return "ℹ";

        default:

            return "•";

    }

}

/* ===========================================================
   ALERT
=========================================================== */

function showAlert(

    text,

    type="info"

){

    showToast(text,type);

}

/* ===========================================================
   COPY
=========================================================== */

async function copyToClipboard(text){

    try{

        await navigator.clipboard.writeText(

            text

        );

        showToast(

            "Berhasil disalin.",

            "success"

        );

    }catch{

        showToast(

            "Tidak dapat menyalin.",

            "error"

        );

    }

}

/* ===========================================================
   SHARE
=========================================================== */

async function sharePage(){

    if(!navigator.share){

        return;

    }

    try{

        await navigator.share({

            title:document.title,

            text:document.title,

            url:location.href

        });

    }catch(error){

        console.log(error);

    }

}

/* ===========================================================
   CHARACTER COUNTER
=========================================================== */

function initializeCharacterCounter(){

    $$("[maxlength]").forEach(field=>{

        const counter=createElement(

            "small",

            "character-counter"

        );

        field.after(counter);

        const update=()=>{

            counter.textContent=

                `${field.value.length}/${field.maxLength}`;

        };

        update();

        on(field,"input",update);

    });

}

/* ===========================================================
   AUTO RESIZE
=========================================================== */

function initializeTextareaResize(){

    $$("textarea").forEach(area=>{

        const resize=()=>{

            area.style.height="auto";

            area.style.height=

                area.scrollHeight+"px";

        };

        resize();

        on(area,"input",resize);

    });

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeContactForm();

        initializeNewsletter();

        initializeCharacterCounter();

        initializeTextareaResize();

    }

);

/* ===========================================================
   END PART 6
===========================================================
*/

/*!
===========================================================
 Investment Technology Indonesia
 assets/js/main.js
 Part 7
 Chatbot • WhatsApp • Back To Top • Floating Buttons
===========================================================
*/

/* ===========================================================
   CHATBOT
=========================================================== */

const Chatbot={

    widget:$(".chatbot"),

    toggle:$(".chatbot-toggle"),

    close:$(".chatbot-close"),

    body:$(".chatbot-body"),

    input:$(".chatbot-input"),

    send:$(".chatbot-send"),

    opened:false

};

/* ===========================================================
   INIT CHATBOT
=========================================================== */

function initializeChatbot(){

    if(!Chatbot.widget){

        return;

    }

    on(Chatbot.toggle,"click",toggleChatbot);

    on(Chatbot.close,"click",closeChatbot);

    on(Chatbot.send,"click",sendChatMessage);

    on(Chatbot.input,"keydown",(event)=>{

        if(event.key==="Enter"){

            event.preventDefault();

            sendChatMessage();

        }

    });

}

/* ===========================================================
   CHATBOT
=========================================================== */

function openChatbot(){

    addClass(Chatbot.widget,"active");

    Chatbot.opened=true;

}

function closeChatbot(){

    removeClass(Chatbot.widget,"active");

    Chatbot.opened=false;

}

function toggleChatbot(){

    Chatbot.opened

        ? closeChatbot()

        : openChatbot();

}

/* ===========================================================
   SEND MESSAGE
=========================================================== */

function sendChatMessage(){

    if(!Chatbot.input){

        return;

    }

    const text=

        Chatbot.input.value.trim();

    if(!text){

        return;

    }

    appendChatMessage(

        text,

        "user"

    );

    Chatbot.input.value="";

    setTimeout(()=>{

        appendChatMessage(

            getBotReply(text),

            "bot"

        );

    },CONFIG.chatbotDelay);

}

/* ===========================================================
   APPEND MESSAGE
=========================================================== */

function appendChatMessage(

    message,

    type

){

    if(!Chatbot.body){

        return;

    }

    const item=createElement(

        "div",

        `chat-message ${type}`,

        message

    );

    Chatbot.body.appendChild(item);

    Chatbot.body.scrollTop=

        Chatbot.body.scrollHeight;

}

/* ===========================================================
   BOT REPLY
=========================================================== */

function getBotReply(){

    return "Terima kasih telah menghubungi Investment Technology Indonesia. Tim kami akan segera membantu Anda.";

}

/* ===========================================================
   WHATSAPP
=========================================================== */

function openWhatsApp(message="Halo, saya ingin konsultasi."){

    const phone="6280000000000";

    window.open(

        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,

        "_blank"

    );

}

function initializeWhatsApp(){

    $$("[data-whatsapp]").forEach(button=>{

        on(button,"click",()=>{

            openWhatsApp(

                button.dataset.message ||

                "Halo"

            );

        });

    });

}

/* ===========================================================
   BACK TO TOP
=========================================================== */

function initializeBackToTop(){

    const button=$(".back-to-top");

    if(!button){

        return;

    }

    on(button,"click",scrollToTop);

    window.addEventListener(

        "scroll",

        ()=>{

            if(

                getScrollTop()>

                CONFIG.backToTopOffset

            ){

                addClass(button,"show");

            }else{

                removeClass(button,"show");

            }

        }

    );

}

/* ===========================================================
   FLOATING BUTTONS
=========================================================== */

function initializeFloatingButtons(){

    $$(".floating-button").forEach(button=>{

        on(button,"mouseenter",()=>{

            addClass(button,"hover");

        });

        on(button,"mouseleave",()=>{

            removeClass(button,"hover");

        });

    });

}

/* ===========================================================
   FLOATING CONTACT
=========================================================== */

function initializeFloatingContact(){

    const panel=$(".floating-contact");

    const toggle=$(".floating-contact-toggle");

    if(!panel||!toggle){

        return;

    }

    on(toggle,"click",()=>{

        toggleClass(panel,"active");

    });

}

/* ===========================================================
   FLOATING SOCIAL
=========================================================== */

function initializeFloatingSocial(){

    $$(".floating-social a").forEach(link=>{

        on(link,"click",()=>{

            log(

                "Social:",

                link.href

            );

        });

    });

}

/* ===========================================================
   QUICK ACTIONS
=========================================================== */

function initializeQuickActions(){

    $$("[data-action]").forEach(button=>{

        on(button,"click",()=>{

            const action=

                button.dataset.action;

            switch(action){

                case "call":

                    window.location.href=

                    "tel:+620000000000";

                    break;

                case "email":

                    window.location.href=

                    "mailto:info@example.com";

                    break;

                case "whatsapp":

                    openWhatsApp();

                    break;

            }

        });

    });

}

/* ===========================================================
   ONLINE STATUS
=========================================================== */

function initializeConnectionStatus(){

    function update(){

        if(DEVICE.online){

            removeClass(

                document.body,

                "offline"

            );

        }else{

            addClass(

                document.body,

                "offline"

            );

            showToast(

                "Koneksi internet terputus.",

                "warning"

            );

        }

    }

    update();

    window.addEventListener(

        "online",

        update

    );

    window.addEventListener(

        "offline",

        update

    );

}

/* ===========================================================
   SHORTCUT
=========================================================== */

document.addEventListener(

    "keydown",

    event=>{

        if(

            event.ctrlKey &&

            event.key.toLowerCase()==="b"

        ){

            event.preventDefault();

            toggleChatbot();

        }

    }

);

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeChatbot();

        initializeWhatsApp();

        initializeBackToTop();

        initializeFloatingButtons();

        initializeFloatingContact();

        initializeFloatingSocial();

        initializeQuickActions();

        initializeConnectionStatus();

    }

);

/* ===========================================================
   END PART 7
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/main.js
 Part 8
 Loading • Page Transition • Dark Mode
===========================================================
*/

/* ===========================================================
   LOADING SCREEN
=========================================================== */

const Loading={

    element:$(".loading"),

    progress:$(".loading-progress-bar"),

    text:$(".loading-status"),

    percent:$(".loading-percent"),

    value:0

};

function initializeLoading(){

    if(

        !CONFIG.enableLoading ||

        !Loading.element

    ){

        return;

    }

    startLoading();

}

function startLoading(){

    Loading.value=0;

    const timer=setInterval(()=>{

        Loading.value+=5;

        updateLoading();

        if(Loading.value>=100){

            clearInterval(timer);

            finishLoading();

        }

    },40);

}

function updateLoading(){

    if(Loading.progress){

        Loading.progress.style.width=

            Loading.value+"%";

    }

    if(Loading.percent){

        Loading.percent.textContent=

            Loading.value+"%";

    }

    if(Loading.text){

        if(Loading.value<30){

            Loading.text.textContent=

                "Memuat aset...";

        }else if(Loading.value<70){

            Loading.text.textContent=

                "Menyiapkan halaman...";

        }else{

            Loading.text.textContent=

                "Selesai...";

        }

    }

}

function finishLoading(){

    setTimeout(()=>{

        addClass(

            Loading.element,

            "loaded"

        );

        setTimeout(()=>{

            Loading.element.remove();

        },600);

    },CONFIG.loadingDelay);

}

/* ===========================================================
   PAGE TRANSITION
=========================================================== */

function initializePageTransition(){

    $$("a").forEach(link=>{

        const href=

            link.getAttribute("href");

        if(

            !href ||

            href.startsWith("#") ||

            href.startsWith("mailto:") ||

            href.startsWith("tel:") ||

            link.target==="_blank"

        ){

            return;

        }

        on(link,"click",(event)=>{

            event.preventDefault();

            fadeOutPage(()=>{

                window.location.href=href;

            });

        });

    });

}

function fadeOutPage(callback){

    document.body.style.opacity="0";

    document.body.style.transition=

        "opacity .35s ease";

    setTimeout(callback,350);

}

window.addEventListener(

    "pageshow",

    ()=>{

        document.body.style.opacity="1";

    }

);

/* ===========================================================
   DARK MODE
=========================================================== */

const DarkMode={

    button:$(".dark-toggle"),

    enabled:false

};

function initializeDarkMode(){

    if(!CONFIG.enableDarkMode){

        return;

    }

    initializeTheme();

    DarkMode.enabled=isDarkMode();

    if(DarkMode.button){

        on(

            DarkMode.button,

            "click",

            toggleDarkMode

        );

    }

}

function toggleDarkMode(){

    DarkMode.enabled=

        !DarkMode.enabled;

    setDarkMode(

        DarkMode.enabled

    );

    updateDarkIcon();

}

function updateDarkIcon(){

    if(!DarkMode.button){

        return;

    }

    const icon=$("i",DarkMode.button);

    if(!icon){

        return;

    }

    icon.className=

        DarkMode.enabled

        ? "fas fa-sun"

        : "fas fa-moon";

}

/* ===========================================================
   SYSTEM THEME
=========================================================== */

function watchSystemTheme(){

    const media=

    window.matchMedia(

        "(prefers-color-scheme: dark)"

    );

    if(loadStorage("theme")){

        return;

    }

    setDarkMode(media.matches);

    media.addEventListener(

        "change",

        event=>{

            setDarkMode(event.matches);

        }

    );

}

/* ===========================================================
   PAGE VISIBILITY
=========================================================== */

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(document.hidden){

            log("Hidden");

        }else{

            log("Visible");

        }

    }

);

/* ===========================================================
   WINDOW LOAD
=========================================================== */

window.addEventListener(

    "load",

    ()=>{

        finishLoading();

    }

);

/* ===========================================================
   PRELOAD IMAGE
=========================================================== */

function preloadImages(){

    $$("img[data-src]").forEach(image=>{

        const preload=new Image();

        preload.src=image.dataset.src;

    });

}

/* ===========================================================
   PRELOAD FONTS
=========================================================== */

function preloadFonts(){

    document.fonts?.ready.then(()=>{

        log("Fonts Loaded");

    });

}

/* ===========================================================
   PAGE READY
=========================================================== */

function pageReady(){

    addClass(

        document.body,

        "page-ready"

    );

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeLoading();

        initializePageTransition();

        initializeDarkMode();

        watchSystemTheme();

        preloadImages();

        preloadFonts();

        pageReady();

    }

);

/* ===========================================================
   END PART 8
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/main.js
 Part 9
 Dashboard • Charts • Statistics • Widgets
===========================================================
*/

/* ===========================================================
   DASHBOARD
=========================================================== */

const Dashboard={

    initialized:false,

    widgets:$$(".dashboard-widget"),

    charts:$$("canvas[data-chart]"),

    cards:$$(".dashboard-card")

};

function initializeDashboard(){

    if(Dashboard.initialized){

        return;

    }

    Dashboard.initialized=true;

    initializeDashboardCards();

    initializeStatistics();

    initializeCharts();

    initializeWidgetRefresh();

    initializeProgressCircle();

}

/* ===========================================================
   DASHBOARD CARD
=========================================================== */

function initializeDashboardCards(){

    Dashboard.cards.forEach(card=>{

        on(card,"mouseenter",()=>{

            addClass(card,"hover");

        });

        on(card,"mouseleave",()=>{

            removeClass(card,"hover");

        });

    });

}

/* ===========================================================
   STATISTICS
=========================================================== */

function initializeStatistics(){

    $$("[data-stat]").forEach(stat=>{

        animateStatistic(stat);

    });

}

function animateStatistic(element){

    const target=

        Number(

            element.dataset.stat

        );

    const duration=1500;

    const startTime=performance.now();

    function frame(now){

        const progress=Math.min(

            (now-startTime)/duration,

            1

        );

        element.textContent=

            Math.floor(

                progress*target

            ).toLocaleString();

        if(progress<1){

            requestAnimationFrame(frame);

        }

    }

    requestAnimationFrame(frame);

}

/* ===========================================================
   CHART PLACEHOLDER
=========================================================== */

function initializeCharts(){

    Dashboard.charts.forEach(chart=>{

        drawChartPlaceholder(chart);

    });

}

function drawChartPlaceholder(canvas){

    const ctx=canvas.getContext("2d");

    if(!ctx){

        return;

    }

    const width=canvas.width;

    const height=canvas.height;

    ctx.clearRect(

        0,

        0,

        width,

        height

    );

    ctx.lineWidth=3;

    ctx.strokeStyle="#d60000";

    ctx.beginPath();

    const values=[

        120,

        90,

        110,

        60,

        80,

        40,

        70

    ];

    values.forEach((value,index)=>{

        const x=

            (width/(values.length-1))*index;

        const y=value;

        if(index===0){

            ctx.moveTo(x,y);

        }else{

            ctx.lineTo(x,y);

        }

    });

    ctx.stroke();

}

/* ===========================================================
   CIRCLE PROGRESS
=========================================================== */

function initializeProgressCircle(){

    $$("[data-circle]").forEach(circle=>{

        const percent=

            Number(

                circle.dataset.circle

            );

        circle.style.setProperty(

            "--progress",

            percent

        );

    });

}

/* ===========================================================
   LIVE CLOCK
=========================================================== */

function initializeClock(){

    const clock=$(".dashboard-clock");

    if(!clock){

        return;

    }

    function update(){

        const now=new Date();

        clock.textContent=

            now.toLocaleTimeString(

                "id-ID"

            );

    }

    update();

    setInterval(update,1000);

}

/* ===========================================================
   REFRESH WIDGET
=========================================================== */

function initializeWidgetRefresh(){

    $$("[data-refresh]").forEach(button=>{

        on(button,"click",()=>{

            const widget=

                button.closest(

                    ".dashboard-widget"

                );

            refreshWidget(widget);

        });

    });

}

function refreshWidget(widget){

    if(!widget){

        return;

    }

    addClass(widget,"loading");

    setTimeout(()=>{

        removeClass(widget,"loading");

        showToast(

            "Widget berhasil diperbarui.",

            "success"

        );

    },1200);

}

/* ===========================================================
   RECENT ACTIVITY
=========================================================== */

function addActivity(message){

    const list=$(".activity-list");

    if(!list){

        return;

    }

    const item=createElement(

        "li",

        "activity-item"

    );

    item.innerHTML=`

        <strong>

            ${new Date()

            .toLocaleTimeString("id-ID")}

        </strong>

        <span>${message}</span>

    `;

    list.prepend(item);

}

/* ===========================================================
   KPI
=========================================================== */

function updateKPI(

    selector,

    value

){

    const element=$(selector);

    if(!element){

        return;

    }

    element.textContent=

        value.toLocaleString();

}

/* ===========================================================
   SIMULATION
=========================================================== */

function simulateDashboard(){

    setInterval(()=>{

        updateKPI(

            "#visitorCount",

            Math.floor(

                Math.random()*10000

            )

        );

        updateKPI(

            "#leadCount",

            Math.floor(

                Math.random()*500

            )

        );

    },5000);

}

/* ===========================================================
   NOTIFICATION
=========================================================== */

function dashboardNotification(){

    setTimeout(()=>{

        showToast(

            "Dashboard berhasil dimuat.",

            "info"

        );

    },800);

}

/* ===========================================================
   EXPORT CSV
=========================================================== */

function exportDashboardCSV(){

    const table=$(".dashboard-table");

    if(!table){

        return;

    }

    let csv="";

    table.querySelectorAll("tr")

    .forEach(row=>{

        const data=[

            ...row.children

        ].map(cell=>

            `"${cell.innerText}"`

        );

        csv+=

            data.join(",")+"\n";

    });

    const blob=new Blob(

        [csv],

        {

            type:"text/csv"

        }

    );

    const link=createElement("a");

    link.href=

        URL.createObjectURL(blob);

    link.download="dashboard.csv";

    link.click();

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeDashboard();

        initializeClock();

        simulateDashboard();

        dashboardNotification();

    }

);

/* ===========================================================
   END PART 9
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/main.js
 Part 10
 Performance • Lazy Load • Scroll Optimization
===========================================================
*/

/* ===========================================================
   LAZY LOAD IMAGE
=========================================================== */

function initializeLazyLoad(){

    if(!("IntersectionObserver" in window)){

        loadAllLazyImages();

        return;

    }

    const observer=new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting){

                    return;

                }

                const image=entry.target;

                loadLazyImage(image);

                observer.unobserve(image);

            });

        },

        {

            rootMargin:"150px"

        }

    );

    $$("img[data-src]").forEach(image=>{

        observer.observe(image);

    });

}

function loadLazyImage(image){

    image.src=image.dataset.src;

    image.onload=()=>{

        addClass(image,"loaded");

    };

}

function loadAllLazyImages(){

    $$("img[data-src]").forEach(loadLazyImage);

}

/* ===========================================================
   LAZY VIDEO
=========================================================== */

function initializeLazyVideo(){

    $$("iframe[data-src]").forEach(frame=>{

        const observer=new IntersectionObserver(

            entries=>{

                entries.forEach(entry=>{

                    if(!entry.isIntersecting){

                        return;

                    }

                    frame.src=frame.dataset.src;

                    observer.disconnect();

                });

            }

        );

        observer.observe(frame);

    });

}

/* ===========================================================
   SCROLL PROGRESS
=========================================================== */

function initializeScrollProgress(){

    const bar=$(".scroll-progress");

    if(!bar){

        return;

    }

    window.addEventListener(

        "scroll",

        ()=>{

            const total=

                document.documentElement.scrollHeight-

                window.innerHeight;

            const percent=

                (getScrollTop()/total)*100;

            bar.style.width=

                percent+"%";

        }

    );

}

/* ===========================================================
   SCROLL TO ELEMENT
=========================================================== */

function scrollToElement(

    selector,

    offset=CONFIG.scrollOffset

){

    const element=$(selector);

    if(!element){

        return;

    }

    window.scrollTo({

        top:

            element.offsetTop-offset,

        behavior:"smooth"

    });

}

/* ===========================================================
   DEBOUNCE
=========================================================== */

function debounce(

    callback,

    delay=200

){

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

function throttle(

    callback,

    limit=150

){

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
   RESIZE HANDLER
=========================================================== */

const handleResize=debounce(()=>{

    log("Resize");

});

window.addEventListener(

    "resize",

    handleResize

);

/* ===========================================================
   SCROLL HANDLER
=========================================================== */

const handleScroll=throttle(()=>{

    updateHeader?.();

},50);

window.addEventListener(

    "scroll",

    handleScroll

);

/* ===========================================================
   PRELOAD SECTION
=========================================================== */

function initializeSectionObserver(){

    const observer=new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    addClass(

                        entry.target,

                        "visible"

                    );

                }

            });

        },

        {

            threshold:.08

        }

    );

    $$("section").forEach(section=>{

        observer.observe(section);

    });

}

/* ===========================================================
   PERFORMANCE METRICS
=========================================================== */

function reportPerformance(){

    if(

        !("performance" in window)

    ){

        return;

    }

    window.addEventListener(

        "load",

        ()=>{

            const timing=

                performance.now();

            log(

                "Page Ready:",

                timing.toFixed(2),

                "ms"

            );

        }

    );

}

/* ===========================================================
   REQUEST IDLE
=========================================================== */

function runIdle(callback){

    if("requestIdleCallback" in window){

        requestIdleCallback(callback);

    }else{

        setTimeout(callback,1);

    }

}

/* ===========================================================
   MEMORY CLEANUP
=========================================================== */

function cleanup(){

    $$("[data-temp]").forEach(node=>{

        node.removeAttribute("data-temp");

    });

}

/* ===========================================================
   NETWORK STATUS
=========================================================== */

function monitorNetwork(){

    window.addEventListener(

        "online",

        ()=>{

            showToast(

                "Koneksi kembali normal.",

                "success"

            );

        }

    );

    window.addEventListener(

        "offline",

        ()=>{

            showToast(

                "Anda sedang offline.",

                "warning"

            );

        }

    );

}

/* ===========================================================
   PAGE CACHE
=========================================================== */

window.addEventListener(

    "beforeunload",

    ()=>{

        cleanup();

    }

);

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeLazyLoad();

        initializeLazyVideo();

        initializeScrollProgress();

        initializeSectionObserver();

        reportPerformance();

        monitorNetwork();

        runIdle(cleanup);

    }

);

/* ===========================================================
   END PART 10
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/main.js
 Part 11
 Accessibility • Keyboard • Utilities
===========================================================
*/

/* ===========================================================
   ACCESSIBILITY
=========================================================== */

function initializeAccessibility(){

    document.documentElement.setAttribute(

        "lang",

        "id"

    );

    document.body.setAttribute(

        "data-app",

        App.name

    );

}

/* ===========================================================
   SKIP LINK
=========================================================== */

function initializeSkipLink(){

    const skip=$(".skip-link");

    if(!skip){

        return;

    }

    on(skip,"click",(event)=>{

        event.preventDefault();

        const target=$("#main");

        if(target){

            target.focus();

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

}

/* ===========================================================
   KEYBOARD NAVIGATION
=========================================================== */

function initializeKeyboardNavigation(){

    document.addEventListener(

        "keydown",

        event=>{

            switch(event.key){

                case "Home":

                    scrollToTop();

                    break;

                case "End":

                    window.scrollTo({

                        top:

                        document.body.scrollHeight,

                        behavior:"smooth"

                    });

                    break;

            }

        }

    );

}

/* ===========================================================
   FOCUS TRAP
=========================================================== */

function trapFocus(container){

    if(!container){

        return;

    }

    const focusable=[

        ...container.querySelectorAll(

            'a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])'

        )

    ];

    if(!focusable.length){

        return;

    }

    const first=focusable[0];

    const last=focusable[

        focusable.length-1

    ];

    on(container,"keydown",(event)=>{

        if(event.key!=="Tab"){

            return;

        }

        if(

            event.shiftKey &&

            document.activeElement===first

        ){

            event.preventDefault();

            last.focus();

        }

        if(

            !event.shiftKey &&

            document.activeElement===last

        ){

            event.preventDefault();

            first.focus();

        }

    });

}

/* ===========================================================
   AUTO FOCUS
=========================================================== */

function autoFocus(selector){

    const element=$(selector);

    if(element){

        element.focus();

    }

}

/* ===========================================================
   COPY TEXT
=========================================================== */

async function copyText(text){

    try{

        await navigator.clipboard.writeText(text);

        showToast(

            "Berhasil disalin.",

            "success"

        );

    }catch{

        showToast(

            "Gagal menyalin.",

            "error"

        );

    }

}

/* ===========================================================
   FORMAT NUMBER
=========================================================== */

function formatNumber(number){

    return Number(number)

        .toLocaleString("id-ID");

}

/* ===========================================================
   FORMAT CURRENCY
=========================================================== */

function formatCurrency(number){

    return new Intl.NumberFormat(

        "id-ID",

        {

            style:"currency",

            currency:"IDR",

            maximumFractionDigits:0

        }

    ).format(number);

}

/* ===========================================================
   FORMAT DATE
=========================================================== */

function formatDate(date){

    return new Intl.DateTimeFormat(

        "id-ID",

        {

            day:"2-digit",

            month:"long",

            year:"numeric"

        }

    ).format(new Date(date));

}

/* ===========================================================
   RANDOM ID
=========================================================== */

function generateID(

    prefix="id"

){

    return `${prefix}-${

        Math.random()

        .toString(36)

        .substring(2,10)

    }`;

}

/* ===========================================================
   UUID
=========================================================== */

function uuid(){

    return crypto.randomUUID

        ? crypto.randomUUID()

        : generateID("uuid");

}

/* ===========================================================
   WAIT
=========================================================== */

function wait(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}

/* ===========================================================
   CLAMP
=========================================================== */

function clamp(

    value,

    min,

    max

){

    return Math.min(

        Math.max(value,min),

        max

    );

}

/* ===========================================================
   RANDOM
=========================================================== */

function random(

    min,

    max

){

    return Math.floor(

        Math.random()*

        (max-min+1)

    )+min;

}

/* ===========================================================
   TOGGLE ATTRIBUTE
=========================================================== */

function toggleAttribute(

    element,

    attribute

){

    if(!element){

        return;

    }

    if(

        element.hasAttribute(attribute)

    ){

        element.removeAttribute(attribute);

    }else{

        element.setAttribute(

            attribute,

            ""

        );

    }

}

/* ===========================================================
   REMOVE EMPTY
=========================================================== */

function removeEmptyNodes(){

    $$("*").forEach(node=>{

        if(

            node.children.length===0 &&

            node.textContent.trim()==="" &&

            !node.hasAttributes()

        ){

            node.remove();

        }

    });

}

/* ===========================================================
   VERSION
=========================================================== */

function printVersion(){

    log(

        `${App.name} ${App.version}`

    );

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeAccessibility();

        initializeSkipLink();

        initializeKeyboardNavigation();

        removeEmptyNodes();

        printVersion();

    }

);

/* ===========================================================
   END PART 11
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/main.js
 Part 12
 Final Initialization • Global Events • End of File
===========================================================
*/

/* ===========================================================
   APPLICATION INIT
=========================================================== */

function initializeModules(){

    log("Initializing modules...");

    try{

        initializeTheme?.();

        initializeHeader?.();

        initializeMobileMenu?.();

        initializeDropdowns?.();

        initializeSmoothScroll?.();

        initializeHero?.();

        initializeReveal?.();

        initializeCounters?.();

        initializeProgress?.();

        initializePortfolio?.();

        initializePortfolioSearch?.();

        initializeFAQ?.();

        initializeTabs?.();

        initializeModal?.();

        initializeLightbox?.();

        initializeVideoPopup?.();

        initializeTestimonials?.();

        initializeClientCarousel?.();

        initializeGallerySlider?.();

        initializeVideoSlider?.();

        initializeContactForm?.();

        initializeNewsletter?.();

        initializeCharacterCounter?.();

        initializeTextareaResize?.();

        initializeChatbot?.();

        initializeWhatsApp?.();

        initializeBackToTop?.();

        initializeFloatingButtons?.();

        initializeFloatingContact?.();

        initializeFloatingSocial?.();

        initializeQuickActions?.();

        initializeConnectionStatus?.();

        initializeLoading?.();

        initializePageTransition?.();

        initializeDarkMode?.();

        initializeDashboard?.();

        initializeClock?.();

        initializeLazyLoad?.();

        initializeLazyVideo?.();

        initializeScrollProgress?.();

        initializeSectionObserver?.();

        initializeAccessibility?.();

        initializeSkipLink?.();

        initializeKeyboardNavigation?.();

    }catch(error){

        console.error(

            "Initialization Error:",

            error

        );

    }

}

/* ===========================================================
   GLOBAL EVENTS
=========================================================== */

function registerGlobalEvents(){

    window.addEventListener(

        "resize",

        debounce(()=>{

            log("Window resized");

        },200)

    );

    window.addEventListener(

        "scroll",

        throttle(()=>{

            updateHeader?.();

            updateActiveNavigation?.();

        },50)

    );

    window.addEventListener(

        "focus",

        ()=>{

            log("Window Focus");

        }

    );

    window.addEventListener(

        "blur",

        ()=>{

            log("Window Blur");

        }

    );

}

/* ===========================================================
   ERROR HANDLER
=========================================================== */

window.addEventListener(

    "error",

    event=>{

        console.error(

            "JavaScript Error:",

            event.error

        );

    }

);

window.addEventListener(

    "unhandledrejection",

    event=>{

        console.error(

            "Promise Error:",

            event.reason

        );

    }

);

/* ===========================================================
   PAGE READY
=========================================================== */

window.addEventListener(

    "load",

    ()=>{

        addClass(

            document.body,

            "loaded"

        );

        removeClass(

            document.body,

            "loading"

        );

        log("Website Ready");

    }

);

/* ===========================================================
   BEFORE UNLOAD
=========================================================== */

window.addEventListener(

    "beforeunload",

    ()=>{

        cleanup?.();

    }

);

/* ===========================================================
   DESTROY
=========================================================== */

function destroyApplication(){

    log("Destroy Application");

    removeEmptyNodes?.();

}

/* ===========================================================
   PUBLIC API
=========================================================== */

window.ITI={

    App,

    CONFIG,

    log,

    wait,

    random,

    clamp,

    formatDate,

    formatNumber,

    formatCurrency,

    copyText,

    scrollToTop,

    scrollToElement,

    openWhatsApp,

    showToast,

    toggleDarkMode,

    initializeModules,

    destroyApplication

};

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeModules();

        registerGlobalEvents();

        printVersion?.();

    }

);

/* ===========================================================
   FREEZE CONFIG
=========================================================== */

Object.freeze(CONFIG);

Object.freeze(App);

/* ===========================================================
   END OF FILE
=========================================================== */

/*
=============================================================

 Investment Technology Indonesia
 assets/js/main.js

 Version : 1.0.0
 Language: JavaScript ES6+
 License : Internal Project

 Features
 ------------------------------------------------------------
 ✔ Sticky Header
 ✔ Responsive Navigation
 ✔ Mobile Menu
 ✔ Hero Animation
 ✔ Scroll Reveal
 ✔ Counter Animation
 ✔ Progress Bar
 ✔ Portfolio Filter
 ✔ FAQ Accordion
 ✔ Tabs
 ✔ Modal
 ✔ Lightbox Gallery
 ✔ Video Popup
 ✔ Testimonial Slider
 ✔ Client Carousel
 ✔ Gallery Slider
 ✔ Contact Form Validation
 ✔ Newsletter
 ✔ Toast Notification
 ✔ Chatbot
 ✔ WhatsApp Floating Button
 ✔ Back To Top
 ✔ Floating Actions
 ✔ Loading Screen
 ✔ Page Transition
 ✔ Dark Mode
 ✔ Dashboard Widgets
 ✔ Charts Placeholder
 ✔ Lazy Loading
 ✔ Scroll Progress
 ✔ Accessibility
 ✔ Keyboard Navigation
 ✔ Performance Optimization
 ✔ Utility Functions

=============================================================
 END OF assets/js/main.js
=============================================================
*/