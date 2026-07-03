/*!
===========================================================
 Investment Technology Indonesia
 assets/js/navbar.js
 Part 1
 Core • Config • Initialization
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION
=========================================================== */

const NavbarApp={

    version:"1.0.0",

    name:"Investment Technology Indonesia",

    initialized:false,

    debug:false

};

/* ===========================================================
   CONFIG
=========================================================== */

const NAVBAR_CONFIG={

    stickyOffset:80,

    hideOffset:180,

    mobileBreakpoint:992,

    animationDuration:300,

    scrollBehavior:"smooth",

    autoCloseMobile:true,

    highlightActive:true,

    enableSticky:true,

    enableHideOnScroll:true,

    enableBackdrop:true

};

/* ===========================================================
   STATE
=========================================================== */

const NavbarState={

    sticky:false,

    hidden:false,

    mobileOpen:false,

    lastScroll:0,

    activeLink:null

};

/* ===========================================================
   ELEMENTS
=========================================================== */

const Navbar={

    header:document.querySelector("header"),

    navbar:document.querySelector(".navbar"),

    container:document.querySelector(".navbar-container"),

    brand:document.querySelector(".navbar-brand"),

    menu:document.querySelector(".navbar-menu"),

    mobileMenu:document.querySelector(".mobile-menu"),

    toggle:document.querySelector(".navbar-toggle"),

    overlay:document.querySelector(".navbar-overlay"),

    search:document.querySelector(".navbar-search"),

    darkToggle:document.querySelector(".dark-toggle")

};

/* ===========================================================
   LOGGER
=========================================================== */

function navbarLog(...message){

    if(!NavbarApp.debug){

        return;

    }

    console.log(

        "[Navbar]",

        ...message

    );

}

/* ===========================================================
   SELECTOR
=========================================================== */

function $(selector,parent=document){

    return parent.querySelector(selector);

}

function $$(selector,parent=document){

    return [...parent.querySelectorAll(selector)];

}

/* ===========================================================
   EVENTS
=========================================================== */

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

function off(

    element,

    event,

    callback

){

    if(!element){

        return;

    }

    element.removeEventListener(

        event,

        callback

    );

}

/* ===========================================================
   CLASS
=========================================================== */

function addClass(

    element,

    className

){

    if(element){

        element.classList.add(className);

    }

}

function removeClass(

    element,

    className

){

    if(element){

        element.classList.remove(className);

    }

}

function toggleClass(

    element,

    className

){

    if(element){

        element.classList.toggle(className);

    }

}

function hasClass(

    element,

    className

){

    if(!element){

        return false;

    }

    return element.classList.contains(

        className

    );

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

    return(

        viewportWidth()<=

        NAVBAR_CONFIG.mobileBreakpoint

    );

}

/* ===========================================================
   SCROLL
=========================================================== */

function scrollTopPosition(){

    return(

        window.pageYOffset||

        document.documentElement.scrollTop

    );

}

function scrollTop(){

    window.scrollTo({

        top:0,

        behavior:

        NAVBAR_CONFIG.scrollBehavior

    });

}

/* ===========================================================
   STORAGE
=========================================================== */

function saveNavbarStorage(

    key,

    value

){

    localStorage.setItem(

        key,

        JSON.stringify(value)

    );

}

function loadNavbarStorage(key){

    const value=

        localStorage.getItem(key);

    if(!value){

        return null;

    }

    return JSON.parse(value);

}

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeNavbar(){

    if(NavbarApp.initialized){

        return;

    }

    NavbarApp.initialized=true;

    navbarLog(

        "Navbar Initialized"

    );

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeNavbar();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

window.NavbarManager={

    app:NavbarApp,

    config:NAVBAR_CONFIG,

    state:NavbarState,

    initialize:initializeNavbar,

    log:navbarLog,

    isMobile,

    scrollTop

};

/* ===========================================================
   END PART 1
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/navbar.js
 Part 2
 Sticky Navbar • Scroll Detection • Progress
===========================================================
*/

"use strict";

/* ===========================================================
   STICKY NAVBAR
=========================================================== */

function initializeStickyNavbar(){

    if(!NAVBAR.header){

        return;

    }

    updateNavbarOnScroll();

}

/* ===========================================================
   UPDATE NAVBAR
=========================================================== */

function updateNavbarOnScroll(){

    const scroll=scrollTopPosition();

    handleSticky(scroll);

    handleHideOnScroll(scroll);

    handleTransparentNavbar(scroll);

    handleNavbarShadow(scroll);

    updateScrollProgress(scroll);

    NavbarState.lastScroll=scroll;

}

/* ===========================================================
   STICKY
=========================================================== */

function handleSticky(scroll){

    if(!NAVBAR_CONFIG.enableSticky){

        return;

    }

    if(scroll>=NAVBAR_CONFIG.stickyOffset){

        if(!NavbarState.sticky){

            NavbarState.sticky=true;

            addClass(

                Navbar.header,

                "sticky"

            );

        }

    }else{

        NavbarState.sticky=false;

        removeClass(

            Navbar.header,

            "sticky"

        );

    }

}

/* ===========================================================
   HIDE ON SCROLL
=========================================================== */

function handleHideOnScroll(scroll){

    if(!NAVBAR_CONFIG.enableHideOnScroll){

        return;

    }

    if(isMobile()){

        return;

    }

    if(

        scroll>

        NavbarState.lastScroll &&

        scroll>

        NAVBAR_CONFIG.hideOffset

    ){

        if(!NavbarState.hidden){

            NavbarState.hidden=true;

            addClass(

                Navbar.header,

                "navbar-hidden"

            );

        }

    }else{

        NavbarState.hidden=false;

        removeClass(

            Navbar.header,

            "navbar-hidden"

        );

    }

}

/* ===========================================================
   TRANSPARENT HEADER
=========================================================== */

function handleTransparentNavbar(scroll){

    if(scroll<10){

        addClass(

            Navbar.header,

            "transparent"

        );

    }else{

        removeClass(

            Navbar.header,

            "transparent"

        );

    }

}

/* ===========================================================
   SHADOW
=========================================================== */

function handleNavbarShadow(scroll){

    if(scroll>40){

        addClass(

            Navbar.header,

            "navbar-shadow"

        );

    }else{

        removeClass(

            Navbar.header,

            "navbar-shadow"

        );

    }

}

/* ===========================================================
   SCROLL DIRECTION
=========================================================== */

function scrollDirection(){

    return(

        scrollTopPosition()>

        NavbarState.lastScroll

    )

    ? "down"

    : "up";

}

/* ===========================================================
   SCROLL PROGRESS
=========================================================== */

const ScrollProgress={

    bar:document.querySelector(

        ".scroll-progress"

    )

};

function updateScrollProgress(scroll){

    if(!ScrollProgress.bar){

        return;

    }

    const total=

        document.documentElement

        .scrollHeight-

        window.innerHeight;

    const percent=

        Math.max(

            0,

            Math.min(

                100,

                (scroll/total)*100

            )

        );

    ScrollProgress.bar.style.width=

        percent+"%";

}

/* ===========================================================
   BACKDROP
=========================================================== */

function updateBackdrop(){

    if(

        !NAVBAR_CONFIG.enableBackdrop ||

        !Navbar.header

    ){

        return;

    }

    if(scrollTopPosition()>20){

        addClass(

            Navbar.header,

            "backdrop"

        );

    }else{

        removeClass(

            Navbar.header,

            "backdrop"

        );

    }

}

/* ===========================================================
   SHRINK
=========================================================== */

function updateNavbarSize(){

    if(scrollTopPosition()>120){

        addClass(

            Navbar.header,

            "navbar-small"

        );

    }else{

        removeClass(

            Navbar.header,

            "navbar-small"

        );

    }

}

/* ===========================================================
   SCROLL LISTENER
=========================================================== */

function handleWindowScroll(){

    updateNavbarOnScroll();

    updateBackdrop();

    updateNavbarSize();

}

/* ===========================================================
   WINDOW EVENTS
=========================================================== */

window.addEventListener(

    "scroll",

    handleWindowScroll,

    {

        passive:true

    }

);

/* ===========================================================
   RESIZE
=========================================================== */

window.addEventListener(

    "resize",

    ()=>{

        if(!isMobile()){

            removeClass(

                Navbar.header,

                "navbar-mobile-open"

            );

        }

    }

);

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeStickyNavbar();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.NavbarManager,

    {

        update:updateNavbarOnScroll,

        direction:scrollDirection,

        sticky:handleSticky,

        progress:updateScrollProgress

    }

);

/* ===========================================================
   END PART 2
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/navbar.js
 Part 3
 Mobile Menu • Hamburger • Overlay
===========================================================
*/

"use strict";

/* ===========================================================
   MOBILE MENU
=========================================================== */

const MobileMenu={

    opened:false,

    menu:Navbar.mobileMenu,

    toggle:Navbar.toggle,

    overlay:Navbar.overlay,

    body:document.body

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeMobileMenu(){

    if(

        !MobileMenu.menu ||

        !MobileMenu.toggle

    ){

        return;

    }

    on(

        MobileMenu.toggle,

        "click",

        toggleMobileMenu

    );

    on(

        MobileMenu.overlay,

        "click",

        closeMobileMenu

    );

    initializeMobileLinks();

    initializeSubMenus();

}

/* ===========================================================
   OPEN
=========================================================== */

function openMobileMenu(){

    if(MobileMenu.opened){

        return;

    }

    MobileMenu.opened=true;

    NavbarState.mobileOpen=true;

    addClass(

        MobileMenu.menu,

        "active"

    );

    addClass(

        MobileMenu.toggle,

        "active"

    );

    addClass(

        MobileMenu.body,

        "menu-open"

    );

    addClass(

        Navbar.header,

        "navbar-mobile-open"

    );

    if(MobileMenu.overlay){

        addClass(

            MobileMenu.overlay,

            "active"

        );

    }

    lockBodyScroll();

}

/* ===========================================================
   CLOSE
=========================================================== */

function closeMobileMenu(){

    if(!MobileMenu.opened){

        return;

    }

    MobileMenu.opened=false;

    NavbarState.mobileOpen=false;

    removeClass(

        MobileMenu.menu,

        "active"

    );

    removeClass(

        MobileMenu.toggle,

        "active"

    );

    removeClass(

        MobileMenu.body,

        "menu-open"

    );

    removeClass(

        Navbar.header,

        "navbar-mobile-open"

    );

    if(MobileMenu.overlay){

        removeClass(

            MobileMenu.overlay,

            "active"

        );

    }

    unlockBodyScroll();

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
   MOBILE LINKS
=========================================================== */

function initializeMobileLinks(){

    $$("a",MobileMenu.menu)

    .forEach(link=>{

        on(

            link,

            "click",

            ()=>{

                if(

                    NAVBAR_CONFIG.autoCloseMobile

                ){

                    closeMobileMenu();

                }

            }

        );

    });

}

/* ===========================================================
   SUB MENU
=========================================================== */

function initializeSubMenus(){

    $$(
        ".has-submenu",
        MobileMenu.menu
    )

    .forEach(item=>{

        const trigger=$(

            ".submenu-toggle",

            item

        );

        if(!trigger){

            return;

        }

        on(

            trigger,

            "click",

            event=>{

                event.preventDefault();

                toggleSubMenu(item);

            }

        );

    });

}

/* ===========================================================
   TOGGLE SUBMENU
=========================================================== */

function toggleSubMenu(item){

    const opened=

        hasClass(

            item,

            "open"

        );

    $$(
        ".has-submenu.open",
        MobileMenu.menu
    )

    .forEach(menu=>{

        removeClass(

            menu,

            "open"

        );

    });

    if(!opened){

        addClass(

            item,

            "open"

        );

    }

}

/* ===========================================================
   BODY LOCK
=========================================================== */

function lockBodyScroll(){

    document.body.style.overflow="hidden";

}

function unlockBodyScroll(){

    document.body.style.overflow="";

}

/* ===========================================================
   HAMBURGER
=========================================================== */

function animateHamburger(){

    if(!MobileMenu.toggle){

        return;

    }

    toggleClass(

        MobileMenu.toggle,

        "is-active"

    );

}

/* ===========================================================
   ESCAPE
=========================================================== */

document.addEventListener(

    "keydown",

    event=>{

        if(

            event.key==="Escape" &&

            MobileMenu.opened

        ){

            closeMobileMenu();

        }

    }

);

/* ===========================================================
   RESIZE
=========================================================== */

window.addEventListener(

    "resize",

    ()=>{

        if(

            !isMobile() &&

            MobileMenu.opened

        ){

            closeMobileMenu();

        }

    }

);

/* ===========================================================
   TOUCH SWIPE
=========================================================== */

let touchStartX=0;

let touchEndX=0;

on(

    document,

    "touchstart",

    event=>{

        touchStartX=

            event.changedTouches[0]

            .clientX;

    }

);

on(

    document,

    "touchend",

    event=>{

        touchEndX=

            event.changedTouches[0]

            .clientX;

        const distance=

            touchEndX-touchStartX;

        if(

            distance>120 &&

            !MobileMenu.opened

        ){

            openMobileMenu();

        }

        if(

            distance<-120 &&

            MobileMenu.opened

        ){

            closeMobileMenu();

        }

    }

);

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeMobileMenu();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.NavbarManager,

    {

        openMenu:openMobileMenu,

        closeMenu:closeMobileMenu,

        toggleMenu:toggleMobileMenu,

        lockScroll:lockBodyScroll,

        unlockScroll:unlockBodyScroll

    }

);

/* ===========================================================
   END PART 3
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/navbar.js
 Part 4
 Dropdown Menu • Mega Menu • Hover Navigation
===========================================================
*/

"use strict";

/* ===========================================================
   DROPDOWN
=========================================================== */

const Dropdown={

    items:$$(".dropdown"),

    mega:$$(".mega-menu"),

    active:null

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeDropdown(){

    if(!Dropdown.items.length){

        return;

    }

    Dropdown.items.forEach(item=>{

        initializeDropdownItem(item);

    });

    initializeMegaMenu();

    initializeOutsideClick();

}

/* ===========================================================
   ITEM
=========================================================== */

function initializeDropdownItem(item){

    const toggle=$(

        ".dropdown-toggle",

        item

    );

    if(!toggle){

        return;

    }

    if(isMobile()){

        on(

            toggle,

            "click",

            event=>{

                event.preventDefault();

                toggleDropdown(item);

            }

        );

    }else{

        on(

            item,

            "mouseenter",

            ()=>{

                openDropdown(item);

            }

        );

        on(

            item,

            "mouseleave",

            ()=>{

                closeDropdown(item);

            }

        );

    }

}

/* ===========================================================
   OPEN
=========================================================== */

function openDropdown(item){

    closeAllDropdowns();

    addClass(item,"open");

    Dropdown.active=item;

}

/* ===========================================================
   CLOSE
=========================================================== */

function closeDropdown(item){

    removeClass(item,"open");

    if(Dropdown.active===item){

        Dropdown.active=null;

    }

}

/* ===========================================================
   TOGGLE
=========================================================== */

function toggleDropdown(item){

    if(hasClass(item,"open")){

        closeDropdown(item);

    }else{

        openDropdown(item);

    }

}

/* ===========================================================
   CLOSE ALL
=========================================================== */

function closeAllDropdowns(){

    Dropdown.items.forEach(item=>{

        removeClass(item,"open");

    });

}

/* ===========================================================
   MEGA MENU
=========================================================== */

function initializeMegaMenu(){

    Dropdown.mega.forEach(menu=>{

        const parent=

            menu.closest(".dropdown");

        if(!parent){

            return;

        }

        on(

            parent,

            "mouseenter",

            ()=>{

                addClass(menu,"visible");

            }

        );

        on(

            parent,

            "mouseleave",

            ()=>{

                removeClass(menu,"visible");

            }

        );

    });

}

/* ===========================================================
   OUTSIDE CLICK
=========================================================== */

function initializeOutsideClick(){

    document.addEventListener(

        "click",

        event=>{

            if(

                Dropdown.active &&

                !Dropdown.active.contains(

                    event.target

                )

            ){

                closeAllDropdowns();

            }

        }

    );

}

/* ===========================================================
   KEYBOARD
=========================================================== */

document.addEventListener(

    "keydown",

    event=>{

        if(event.key==="Escape"){

            closeAllDropdowns();

        }
    }

);

/* ===========================================================
   SUBMENU
=========================================================== */

function initializeNestedSubmenu(){

    $$(
        ".submenu-toggle"
    ).forEach(toggle=>{

        on(

            toggle,

            "click",

            event=>{

                if(!isMobile()){

                    return;

                }

                event.preventDefault();

                toggleClass(

                    toggle.parentElement,

                    "submenu-open"

                );

            }

        );

    });

}

/* ===========================================================
   MEGA GRID
=========================================================== */

function equalizeMegaColumns(){

    Dropdown.mega.forEach(menu=>{

        const columns=$$(".mega-column",menu);

        if(!columns.length){

            return;

        }

        let height=0;

        columns.forEach(column=>{

            column.style.minHeight="";

            height=Math.max(

                height,

                column.offsetHeight

            );

        });

        columns.forEach(column=>{

            column.style.minHeight=

                height+"px";

        });

    });

}

/* ===========================================================
   WINDOW RESIZE
=========================================================== */

window.addEventListener(

    "resize",

    ()=>{

        closeAllDropdowns();

        equalizeMegaColumns();

    }

);

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeDropdown();

        initializeNestedSubmenu();

        equalizeMegaColumns();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.NavbarManager,

    {

        openDropdown,

        closeDropdown,

        toggleDropdown,

        closeAllDropdowns

    }

);

/* ===========================================================
   END PART 4
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/navbar.js
 Part 5
 Active Navigation • Smooth Scroll • ScrollSpy
===========================================================
*/

"use strict";

/* ===========================================================
   NAVIGATION
=========================================================== */

const Navigation={

    links:$$(".navbar a[href^='#']"),

    sections:$$("section[id]"),

    current:null

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeNavigation(){

    initializeSmoothScroll();

    initializeScrollSpy();

    initializeExternalLinks();

    initializeActiveLink();

}

/* ===========================================================
   SMOOTH SCROLL
=========================================================== */

function initializeSmoothScroll(){

    Navigation.links.forEach(link=>{

        on(

            link,

            "click",

            event=>{

                const href=

                    link.getAttribute("href");

                if(

                    !href ||

                    href==="#"

                ){

                    return;

                }

                const target=$(href);

                if(!target){

                    return;

                }

                event.preventDefault();

                scrollToSection(target);

            }

        );

    });

}

/* ===========================================================
   SCROLL TO SECTION
=========================================================== */

function scrollToSection(section){

    const offset=

        Navbar.header

        ? Navbar.header.offsetHeight

        : 0;

    window.scrollTo({

        top:

            section.offsetTop-offset,

        behavior:

            NAVBAR_CONFIG.scrollBehavior

    });

}

/* ===========================================================
   SCROLL SPY
=========================================================== */

function initializeScrollSpy(){

    if(!Navigation.sections.length){

        return;

    }

    const observer=

        new IntersectionObserver(

            entries=>{

                entries.forEach(entry=>{

                    if(entry.isIntersecting){

                        setActiveLink(

                            entry.target.id

                        );

                    }

                });

            },

            {

                threshold:0.35,

                rootMargin:

                "-80px 0px -45% 0px"

            }

        );

    Navigation.sections.forEach(section=>{

        observer.observe(section);

    });

}

/* ===========================================================
   ACTIVE LINK
=========================================================== */

function setActiveLink(id){

    Navigation.links.forEach(link=>{

        removeClass(

            link,

            "active"

        );

    });

    const current=$(

        `.navbar a[href="#${id}"]`

    );

    if(current){

        addClass(

            current,

            "active"

        );

        Navigation.current=current;

        NavbarState.activeLink=current;

    }

}

/* ===========================================================
   INITIAL ACTIVE
=========================================================== */

function initializeActiveLink(){

    const hash=

        window.location.hash;

    if(hash){

        setActiveLink(

            hash.replace("#","")

        );

    }

}

/* ===========================================================
   UPDATE ACTIVE
=========================================================== */

function updateActiveLink(){

    const scroll=

        scrollTopPosition();

    let current=null;

    Navigation.sections.forEach(section=>{

        const offset=

            section.offsetTop-

            (Navbar.header

            ? Navbar.header.offsetHeight

            : 80);

        if(scroll>=offset){

            current=section.id;

        }

    });

    if(current){

        setActiveLink(current);

    }

}

/* ===========================================================
   EXTERNAL LINKS
=========================================================== */

function initializeExternalLinks(){

    $$("a[target='_blank']").forEach(link=>{

        if(

            !link.rel.includes(

                "noopener"

            )

        ){

            link.rel=

                "noopener noreferrer";

        }

    });

}

/* ===========================================================
   HASH CHANGE
=========================================================== */

window.addEventListener(

    "hashchange",

    ()=>{

        const hash=

            location.hash.replace(

                "#",

                ""

            );

        if(hash){

            setActiveLink(hash);

        }

    }

);

/* ===========================================================
   SCROLL
=========================================================== */

window.addEventListener(

    "scroll",

    ()=>{

        updateActiveLink();

    },

    {

        passive:true

    }

);

/* ===========================================================
   KEYBOARD SHORTCUT
=========================================================== */

document.addEventListener(

    "keydown",

    event=>{

        if(

            event.altKey &&

            event.key==="Home"

        ){

            event.preventDefault();

            scrollTop();

        }

    }

);

/* ===========================================================
   SCROLL TO HASH
=========================================================== */

window.addEventListener(

    "load",

    ()=>{

        if(!location.hash){

            return;

        }

        const target=$(

            location.hash

        );

        if(target){

            setTimeout(()=>{

                scrollToSection(target);

            },150);

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

    window.NavbarManager,

    {

        navigateTo:scrollToSection,

        setActiveLink,

        updateActiveLink,

        currentLink:()=>

            Navigation.current

    }

);

/* ===========================================================
   END PART 5
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/navbar.js
 Part 6
 Search Bar • Search Overlay • Search Suggestions
===========================================================
*/

"use strict";

/* ===========================================================
   SEARCH
=========================================================== */

const Search={

    toggle:document.querySelector(".search-toggle"),

    overlay:document.querySelector(".search-overlay"),

    close:document.querySelector(".search-close"),

    input:document.querySelector(".search-input"),

    form:document.querySelector(".search-form"),

    suggestions:document.querySelector(".search-suggestions"),

    results:document.querySelector(".search-results"),

    opened:false

};

/* ===========================================================
   SAMPLE DATA
=========================================================== */

const SearchData=[

    "Home",

    "About",

    "Services",

    "Portfolio",

    "Products",

    "Solutions",

    "Digital Transformation",

    "Cloud Computing",

    "Cyber Security",

    "Software Development",

    "Website Development",

    "Mobile App",

    "Artificial Intelligence",

    "Machine Learning",

    "IoT",

    "ERP",

    "CRM",

    "Contact"

];

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeSearch(){

    if(!Search.toggle){

        return;

    }

    on(Search.toggle,"click",openSearch);

    on(Search.close,"click",closeSearch);

    on(Search.overlay,"click",(event)=>{

        if(event.target===Search.overlay){

            closeSearch();

        }

    });

    if(Search.input){

        on(Search.input,"input",handleSearchInput);

        on(Search.input,"keydown",handleSearchKeydown);

    }

    if(Search.form){

        on(Search.form,"submit",submitSearch);

    }

}

/* ===========================================================
   OPEN
=========================================================== */

function openSearch(){

    if(Search.opened){

        return;

    }

    Search.opened=true;

    addClass(Search.overlay,"active");

    document.body.classList.add("search-open");

    setTimeout(()=>{

        Search.input?.focus();

    },150);

}

/* ===========================================================
   CLOSE
=========================================================== */

function closeSearch(){

    Search.opened=false;

    removeClass(Search.overlay,"active");

    document.body.classList.remove("search-open");

    clearSearch();

}

/* ===========================================================
   CLEAR
=========================================================== */

function clearSearch(){

    if(Search.input){

        Search.input.value="";

    }

    if(Search.results){

        Search.results.innerHTML="";

    }

}

/* ===========================================================
   INPUT
=========================================================== */

function handleSearchInput(){

    const keyword=

        Search.input.value

        .trim()

        .toLowerCase();

    if(keyword===""){

        renderSuggestions(

            SearchData

        );

        return;

    }

    const result=

        SearchData.filter(item=>

            item

            .toLowerCase()

            .includes(keyword)

        );

    renderSuggestions(result);

}

/* ===========================================================
   RENDER
=========================================================== */

function renderSuggestions(items){

    if(!Search.suggestions){

        return;

    }

    Search.suggestions.innerHTML="";

    if(items.length===0){

        Search.suggestions.innerHTML=`

            <div class="search-empty">

                No results found

            </div>

        `;

        return;

    }

    items.forEach(item=>{

        const element=

            document.createElement("button");

        element.type="button";

        element.className="search-item";

        element.textContent=item;

        on(element,"click",()=>{

            Search.input.value=item;

            performSearch(item);

        });

        Search.suggestions.appendChild(element);

    });

}

/* ===========================================================
   SEARCH
=========================================================== */

function performSearch(keyword){

    if(Search.results){

        Search.results.innerHTML=`

            <div class="search-result">

                Searching for

                <strong>${keyword}</strong>

            </div>

        `;

    }

    navbarLog(

        "Search:",

        keyword

    );

}

/* ===========================================================
   SUBMIT
=========================================================== */

function submitSearch(event){

    event.preventDefault();

    const keyword=

        Search.input.value.trim();

    if(!keyword){

        return;

    }

    performSearch(keyword);

}

/* ===========================================================
   KEYBOARD
=========================================================== */

function handleSearchKeydown(event){

    if(event.key==="Escape"){

        closeSearch();

    }

    if(event.key==="Enter"){

        submitSearch(event);

    }

}

/* ===========================================================
   SHORTCUT
=========================================================== */

document.addEventListener(

    "keydown",

    event=>{

        if(

            (event.ctrlKey || event.metaKey) &&

            event.key.toLowerCase()==="k"

        ){

            event.preventDefault();

            openSearch();

        }

    }

);

/* ===========================================================
   CLICK OUTSIDE
=========================================================== */

document.addEventListener(

    "click",

    event=>{

        if(

            Search.opened &&

            Search.overlay &&

            event.target===Search.overlay

        ){

            closeSearch();

        }

    }

);

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeSearch();

        renderSuggestions(SearchData);

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.NavbarManager,

    {

        openSearch,

        closeSearch,

        performSearch,

        clearSearch

    }

);

/* ===========================================================
   END PART 6
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/navbar.js
 Part 7
 Notification • User Menu • Profile Dropdown
===========================================================
*/

"use strict";

/* ===========================================================
   NOTIFICATION
=========================================================== */

const Notification={

    toggle:document.querySelector(".notification-toggle"),

    dropdown:document.querySelector(".notification-dropdown"),

    badge:document.querySelector(".notification-badge"),

    items:document.querySelector(".notification-items"),

    clear:document.querySelector(".notification-clear"),

    opened:false,

    total:0

};

/* ===========================================================
   USER MENU
=========================================================== */

const UserMenu={

    toggle:document.querySelector(".user-toggle"),

    dropdown:document.querySelector(".user-dropdown"),

    avatar:document.querySelector(".user-avatar"),

    opened:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeUserInterface(){

    initializeNotification();

    initializeUserMenu();

}

/* ===========================================================
   NOTIFICATION
=========================================================== */

function initializeNotification(){

    if(!Notification.toggle){

        return;

    }

    on(

        Notification.toggle,

        "click",

        toggleNotification

    );

    on(

        Notification.clear,

        "click",

        clearNotifications

    );

}

/* ===========================================================
   TOGGLE
=========================================================== */

function toggleNotification(){

    Notification.opened

        ? closeNotification()

        : openNotification();

}

/* ===========================================================
   OPEN
=========================================================== */

function openNotification(){

    Notification.opened=true;

    addClass(

        Notification.dropdown,

        "active"

    );

}

/* ===========================================================
   CLOSE
=========================================================== */

function closeNotification(){

    Notification.opened=false;

    removeClass(

        Notification.dropdown,

        "active"

    );

}

/* ===========================================================
   ADD
=========================================================== */

function addNotification(

    title,

    message,

    time="Now"

){

    if(!Notification.items){

        return;

    }

    const item=document.createElement("div");

    item.className="notification-item";

    item.innerHTML=`

        <h6>${title}</h6>

        <p>${message}</p>

        <small>${time}</small>

    `;

    Notification.items.prepend(item);

    Notification.total++;

    updateNotificationBadge();

}

/* ===========================================================
   CLEAR
=========================================================== */

function clearNotifications(){

    if(Notification.items){

        Notification.items.innerHTML="";

    }

    Notification.total=0;

    updateNotificationBadge();

}

/* ===========================================================
   BADGE
=========================================================== */

function updateNotificationBadge(){

    if(!Notification.badge){

        return;

    }

    Notification.badge.textContent=

        Notification.total;

    Notification.badge.style.display=

        Notification.total

        ? "flex"

        : "none";

}

/* ===========================================================
   USER MENU
=========================================================== */

function initializeUserMenu(){

    if(!UserMenu.toggle){

        return;

    }

    on(

        UserMenu.toggle,

        "click",

        toggleUserMenu

    );

}

/* ===========================================================
   TOGGLE USER
=========================================================== */

function toggleUserMenu(){

    UserMenu.opened

        ? closeUserMenu()

        : openUserMenu();

}

/* ===========================================================
   OPEN USER
=========================================================== */

function openUserMenu(){

    UserMenu.opened=true;

    addClass(

        UserMenu.dropdown,

        "active"

    );

}

/* ===========================================================
   CLOSE USER
=========================================================== */

function closeUserMenu(){

    UserMenu.opened=false;

    removeClass(

        UserMenu.dropdown,

        "active"

    );

}

/* ===========================================================
   PROFILE
=========================================================== */

function updateUserProfile(

    name,

    email,

    avatar

){

    const nameElement=$(".user-name");

    const emailElement=$(".user-email");

    if(nameElement){

        nameElement.textContent=name;

    }

    if(emailElement){

        emailElement.textContent=email;

    }

    if(

        UserMenu.avatar &&

        avatar

    ){

        UserMenu.avatar.src=avatar;

    }

}

/* ===========================================================
   OUTSIDE CLICK
=========================================================== */

document.addEventListener(

    "click",

    event=>{

        if(

            Notification.opened &&

            !Notification.dropdown?.contains(event.target) &&

            !Notification.toggle?.contains(event.target)

        ){

            closeNotification();

        }

        if(

            UserMenu.opened &&

            !UserMenu.dropdown?.contains(event.target) &&

            !UserMenu.toggle?.contains(event.target)

        ){

            closeUserMenu();

        }

    }

);

/* ===========================================================
   ESC
=========================================================== */

document.addEventListener(

    "keydown",

    event=>{

        if(event.key==="Escape"){

            closeNotification();

            closeUserMenu();

        }

    }

);

/* ===========================================================
   DEMO
=========================================================== */

function loadDemoNotifications(){

    addNotification(

        "Welcome",

        "Investment Technology Indonesia",

        "Today"

    );

    addNotification(

        "Portfolio",

        "New project published.",

        "5 min ago"

    );

    addNotification(

        "System",

        "Website updated successfully.",

        "10 min ago"

    );

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeUserInterface();

        loadDemoNotifications();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.NavbarManager,

    {

        openNotification,

        closeNotification,

        addNotification,

        clearNotifications,

        openUserMenu,

        closeUserMenu,

        updateUserProfile

    }

);

/* ===========================================================
   END PART 7
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/navbar.js
 Part 8
 Dark Mode • Theme Switcher • Theme Sync
===========================================================
*/

"use strict";

/* ===========================================================
   THEME
=========================================================== */

const Theme={

    toggle:document.querySelector(".theme-toggle"),

    icon:document.querySelector(".theme-toggle i"),

    current:"light"

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeTheme(){

    loadSavedTheme();

    initializeThemeToggle();

    watchSystemTheme();

}

/* ===========================================================
   TOGGLE
=========================================================== */

function initializeThemeToggle(){

    if(!Theme.toggle){

        return;

    }

    on(

        Theme.toggle,

        "click",

        toggleTheme

    );

}

/* ===========================================================
   TOGGLE THEME
=========================================================== */

function toggleTheme(){

    Theme.current=

        Theme.current==="dark"

        ? "light"

        : "dark";

    applyTheme(

        Theme.current

    );

}

/* ===========================================================
   APPLY
=========================================================== */

function applyTheme(theme){

    Theme.current=theme;

    document.documentElement

        .setAttribute(

            "data-theme",

            theme

        );

    document.body.classList.toggle(

        "dark-mode",

        theme==="dark"

    );

    updateThemeIcon();

    saveNavbarStorage(

        "theme",

        theme

    );

}

/* ===========================================================
   ICON
=========================================================== */

function updateThemeIcon(){

    if(!Theme.icon){

        return;

    }

    Theme.icon.className=

        Theme.current==="dark"

        ? "fas fa-sun"

        : "fas fa-moon";

}

/* ===========================================================
   LOAD
=========================================================== */

function loadSavedTheme(){

    const saved=

        loadNavbarStorage(

            "theme"

        );

    if(saved){

        applyTheme(saved);

        return;

    }

    const prefersDark=

        window.matchMedia(

            "(prefers-color-scheme: dark)"

        ).matches;

    applyTheme(

        prefersDark

        ? "dark"

        : "light"

    );

}

/* ===========================================================
   SYSTEM
=========================================================== */

function watchSystemTheme(){

    const media=

        window.matchMedia(

            "(prefers-color-scheme: dark)"

        );

    media.addEventListener(

        "change",

        event=>{

            if(

                loadNavbarStorage(

                    "theme"

                )

            ){

                return;

            }

            applyTheme(

                event.matches

                ? "dark"

                : "light"

            );

        }

    );

}

/* ===========================================================
   SET
=========================================================== */

function setTheme(theme){

    if(

        theme!=="light" &&

        theme!=="dark"

    ){

        return;

    }

    applyTheme(theme);

}

/* ===========================================================
   RESET
=========================================================== */

function resetTheme(){

    localStorage.removeItem(

        "theme"

    );

    loadSavedTheme();

}

/* ===========================================================
   CURRENT
=========================================================== */

function currentTheme(){

    return Theme.current;

}

/* ===========================================================
   SHORTCUT
=========================================================== */

document.addEventListener(

    "keydown",

    event=>{

        if(

            event.altKey &&

            event.key.toLowerCase()==="d"

        ){

            event.preventDefault();

            toggleTheme();

        }

    }

);

/* ===========================================================
   TRANSITION
=========================================================== */

function enableThemeTransition(){

    document.documentElement.classList.add(

        "theme-transition"

    );

    setTimeout(()=>{

        document.documentElement.classList.remove(

            "theme-transition"

        );

    },300);

}

const originalApplyTheme=

    applyTheme;

applyTheme=function(theme){

    enableThemeTransition();

    originalApplyTheme(theme);

};

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeTheme();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.NavbarManager,

    {

        toggleTheme,

        setTheme,

        resetTheme,

        currentTheme

    }

);

/* ===========================================================
   END PART 8
===========================================================
*/

/*!
===========================================================
 Investment Technology Indonesia
 assets/js/navbar.js
 Part 9
 Responsive Navigation • Resize Handler • Device Detection
===========================================================
*/

"use strict";

/* ===========================================================
   RESPONSIVE
=========================================================== */

const Responsive={

    width:window.innerWidth,

    height:window.innerHeight,

    device:"desktop",

    orientation:"landscape"

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeResponsiveNavbar(){

    detectDevice();

    detectOrientation();

    updateResponsiveNavbar();

    initializeResizeHandler();

}

/* ===========================================================
   DEVICE
=========================================================== */

function detectDevice(){

    const width=window.innerWidth;

    Responsive.width=width;

    if(width<576){

        Responsive.device="mobile";

    }else if(width<992){

        Responsive.device="tablet";

    }else{

        Responsive.device="desktop";

    }

    document.body.dataset.device=

        Responsive.device;

}

/* ===========================================================
   ORIENTATION
=========================================================== */

function detectOrientation(){

    Responsive.orientation=

        window.innerWidth>

        window.innerHeight

        ? "landscape"

        : "portrait";

    document.body.dataset.orientation=

        Responsive.orientation;

}

/* ===========================================================
   UPDATE
=========================================================== */

function updateResponsiveNavbar(){

    if(

        Responsive.device==="desktop"

    ){

        closeMobileMenu?.();

        closeAllDropdowns?.();

    }

    Navbar.header?.classList.toggle(

        "navbar-mobile",

        Responsive.device==="mobile"

    );

}

/* ===========================================================
   RESIZE
=========================================================== */

let resizeTimer=null;

function initializeResizeHandler(){

    window.addEventListener(

        "resize",

        ()=>{

            clearTimeout(

                resizeTimer

            );

            resizeTimer=setTimeout(

                handleResize,

                150

            );

        },

        {

            passive:true

        }

    );

}

/* ===========================================================
   HANDLE
=========================================================== */

function handleResize(){

    Responsive.width=

        window.innerWidth;

    Responsive.height=

        window.innerHeight;

    detectDevice();

    detectOrientation();

    updateResponsiveNavbar();

    equalizeMegaColumns?.();

    navbarLog(

        "Resize:",

        Responsive.width,

        Responsive.height

    );

}

/* ===========================================================
   BREAKPOINT
=========================================================== */

function isBreakpoint(name){

    switch(name){

        case "mobile":

            return Responsive.width<576;

        case "tablet":

            return(

                Responsive.width>=576 &&

                Responsive.width<992

            );

        case "desktop":

            return Responsive.width>=992;

        default:

            return false;

    }

}

/* ===========================================================
   VIEWPORT
=========================================================== */

function viewport(){

    return{

        width:Responsive.width,

        height:Responsive.height,

        device:Responsive.device,

        orientation:

            Responsive.orientation

    };

}

/* ===========================================================
   SAFE AREA
=========================================================== */

function updateSafeArea(){

    document.documentElement.style.setProperty(

        "--vh",

        `${window.innerHeight*0.01}px`

    );

}

/* ===========================================================
   TOUCH
=========================================================== */

function detectTouch(){

    const touch=

        "ontouchstart" in window ||

        navigator.maxTouchPoints>0;

    document.body.classList.toggle(

        "touch-device",

        touch

    );

}

/* ===========================================================
   HOVER
=========================================================== */

function detectHover(){

    const hover=

        window.matchMedia(

            "(hover:hover)"

        ).matches;

    document.body.classList.toggle(

        "hover-device",

        hover

    );

}

/* ===========================================================
   PIXEL RATIO
=========================================================== */

function updatePixelRatio(){

    document.body.dataset.pixelRatio=

        window.devicePixelRatio;

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeResponsiveNavbar();

        updateSafeArea();

        detectTouch();

        detectHover();

        updatePixelRatio();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.NavbarManager,

    {

        responsive:Responsive,

        viewport,

        handleResize,

        detectDevice,

        detectOrientation,

        isBreakpoint

    }

);

/* ===========================================================
   END PART 9
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/navbar.js
 Part 10
 Accessibility • Keyboard Navigation • Focus Management
===========================================================
*/

"use strict";

/* ===========================================================
   ACCESSIBILITY
=========================================================== */

const Accessibility={

    enabled:true,

    focusableSelector:

        'a[href],button,input,textarea,select,[tabindex]:not([tabindex="-1"])'

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeAccessibility(){

    initializeKeyboardNavigation();

    initializeFocusTrap();

    initializeAriaAttributes();

    initializeSkipLink();

}

/* ===========================================================
   ARIA
=========================================================== */

function initializeAriaAttributes(){

    if(Navbar.toggle){

        Navbar.toggle.setAttribute(

            "aria-expanded",

            "false"

        );

    }

    if(Navbar.menu){

        Navbar.menu.setAttribute(

            "role",

            "navigation"

        );

    }

}

/* ===========================================================
   UPDATE ARIA
=========================================================== */

function updateAriaExpanded(){

    if(!Navbar.toggle){

        return;

    }

    Navbar.toggle.setAttribute(

        "aria-expanded",

        NavbarState.mobileOpen

            ? "true"

            : "false"

    );

}

/* ===========================================================
   KEYBOARD
=========================================================== */

function initializeKeyboardNavigation(){

    document.addEventListener(

        "keydown",

        handleKeyboardNavigation

    );

}

function handleKeyboardNavigation(event){

    switch(event.key){

        case "Escape":

            closeMobileMenu?.();

            closeSearch?.();

            closeAllDropdowns?.();

            break;

        case "Home":

            if(event.ctrlKey){

                event.preventDefault();

                scrollTop();

            }

            break;

        case "End":

            if(event.ctrlKey){

                event.preventDefault();

                window.scrollTo({

                    top:document.body.scrollHeight,

                    behavior:"smooth"

                });

            }

            break;

    }

}

/* ===========================================================
   FOCUS TRAP
=========================================================== */

function initializeFocusTrap(){

    document.addEventListener(

        "keydown",

        trapMenuFocus

    );

}

function trapMenuFocus(event){

    if(

        !NavbarState.mobileOpen ||

        event.key!=="Tab"

    ){

        return;

    }

    const focusable=[

        ...Navbar.mobileMenu.querySelectorAll(

            Accessibility.focusableSelector

        )

    ];

    if(!focusable.length){

        return;

    }

    const first=focusable[0];

    const last=focusable[

        focusable.length-1

    ];

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

}

/* ===========================================================
   SKIP LINK
=========================================================== */

function initializeSkipLink(){

    const skip=$(".skip-link");

    if(!skip){

        return;

    }

    on(

        skip,

        "click",

        event=>{

            event.preventDefault();

            const main=$("#main");

            if(main){

                main.focus();

                main.scrollIntoView({

                    behavior:"smooth"

                });

            }

        }

    );

}

/* ===========================================================
   AUTO FOCUS
=========================================================== */

function focusFirstMenuItem(){

    if(!Navbar.mobileMenu){

        return;

    }

    const first=

        Navbar.mobileMenu.querySelector(

            Accessibility.focusableSelector

        );

    first?.focus();

}

/* ===========================================================
   RESTORE FOCUS
=========================================================== */

function restoreNavbarFocus(){

    Navbar.toggle?.focus();

}

/* ===========================================================
   TAB INDEX
=========================================================== */

function updateTabIndex(disabled){

    if(!Navbar.mobileMenu){

        return;

    }

    Navbar.mobileMenu

        .querySelectorAll(

            Accessibility.focusableSelector

        )

        .forEach(element=>{

            element.tabIndex=

                disabled

                ? -1

                : 0;

        });

}

/* ===========================================================
   LIVE REGION
=========================================================== */

function announce(message){

    let live=$("#navbar-live");

    if(!live){

        live=document.createElement("div");

        live.id="navbar-live";

        live.setAttribute(

            "aria-live",

            "polite"

        );

        live.className="sr-only";

        document.body.appendChild(live);

    }

    live.textContent=message;

}

/* ===========================================================
   REDUCED MOTION
=========================================================== */

function prefersReducedMotion(){

    return window.matchMedia(

        "(prefers-reduced-motion: reduce)"

    ).matches;

}

/* ===========================================================
   HIGH CONTRAST
=========================================================== */

function prefersHighContrast(){

    return window.matchMedia(

        "(prefers-contrast: more)"

    ).matches;

}

/* ===========================================================
   ACCESSIBILITY STATUS
=========================================================== */

function accessibilityStatus(){

    return{

        reducedMotion:

            prefersReducedMotion(),

        highContrast:

            prefersHighContrast(),

        mobileMenu:

            NavbarState.mobileOpen

    };

}

/* ===========================================================
   INITIALIZE
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

    window.NavbarManager,

    {

        announce,

        focusFirstMenuItem,

        restoreNavbarFocus,

        updateAriaExpanded,

        updateTabIndex,

        accessibilityStatus

    }

);

/* ===========================================================
   END PART 10
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/navbar.js
 Part 11
 Utilities • Debug • Helpers • Public API
===========================================================
*/

"use strict";

/* ===========================================================
   VERSION
=========================================================== */

const NavbarInfo={

    name:"Navbar Manager",

    version:"1.0.0",

    author:"Investment Technology Indonesia",

    environment:"production"

};

/* ===========================================================
   DEBUG
=========================================================== */

function enableNavbarDebug(){

    NavbarApp.debug=true;

}

function disableNavbarDebug(){

    NavbarApp.debug=false;

}

function debugNavbar(...args){

    if(!NavbarApp.debug){

        return;

    }

    console.log(

        "[Navbar Debug]",

        ...args

    );

}

function warnNavbar(message){

    console.warn(

        "[Navbar Warning]",

        message

    );

}

function errorNavbar(message){

    console.error(

        "[Navbar Error]",

        message

    );

}

/* ===========================================================
   RANDOM ID
=========================================================== */

function navbarID(){

    if(window.crypto?.randomUUID){

        return crypto.randomUUID();

    }

    return "navbar-"+

        Date.now()+"-"+

        Math.random()

        .toString(36)

        .substring(2,9);

}

/* ===========================================================
   WAIT
=========================================================== */

function navbarWait(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

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

function formatPixels(value){

    return `${value}px`;

}

function formatPercent(value){

    return `${clamp(value,0,100)}%`;

}

/* ===========================================================
   REPORT
=========================================================== */

function navbarReport(){

    return{

        app:NavbarApp,

        info:NavbarInfo,

        state:NavbarState,

        responsive:Responsive,

        accessibility:

            accessibilityStatus?.(),

        theme:

            currentTheme?.()

    };

}

/* ===========================================================
   PRINT REPORT
=========================================================== */

function printNavbarReport(){

    console.table(

        navbarReport()

    );

}

/* ===========================================================
   RESET
=========================================================== */

function resetNavbar(){

    closeMobileMenu?.();

    closeSearch?.();

    closeAllDropdowns?.();

    closeNotification?.();

    closeUserMenu?.();

    NavbarState.mobileOpen=false;

    NavbarState.hidden=false;

    NavbarState.sticky=false;

    NavbarState.activeLink=null;

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroyNavbar(){

    resetNavbar();

    navbarLog(

        "Navbar Destroyed"

    );

}

/* ===========================================================
   RESTART
=========================================================== */

function restartNavbar(){

    destroyNavbar();

    initializeNavbar();

}

/* ===========================================================
   STATUS
=========================================================== */

function navbarReady(){

    return{

        initialized:

            NavbarApp.initialized,

        mobile:

            NavbarState.mobileOpen,

        sticky:

            NavbarState.sticky,

        hidden:

            NavbarState.hidden

    };

}

/* ===========================================================
   TIMESTAMP
=========================================================== */

function navbarTimestamp(){

    return new Date()

        .toLocaleString(

            "id-ID"

        );

}

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.NavbarManager,

    {

        info:NavbarInfo,

        report:navbarReport,

        printReport:printNavbarReport,

        ready:navbarReady,

        reset:resetNavbar,

        destroy:destroyNavbar,

        restart:restartNavbar,

        enableDebug:enableNavbarDebug,

        disableDebug:disableNavbarDebug,

        debug:debugNavbar,

        warn:warnNavbar,

        error:errorNavbar,

        wait:navbarWait,

        debounce,

        throttle,

        clamp,

        navbarID,

        formatPixels,

        formatPercent,

        timestamp:navbarTimestamp

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        debugNavbar(

            "Navbar Utilities Ready"

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
 assets/js/navbar.js
 Part 12
 Final Initialization • Cleanup • Export • End of File
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION INITIALIZER
=========================================================== */

function initializeNavbarManager(){

    if(NavbarApp.initialized){

        navbarLog(

            "Navbar Manager already initialized."

        );

        return;

    }

    NavbarApp.initialized=true;

    navbarLog(

        "Initializing Navbar Manager..."

    );

    initializeStickyNavbar?.();

    initializeMobileMenu?.();

    initializeDropdown?.();

    initializeNavigation?.();

    initializeSearch?.();

    initializeUserInterface?.();

    initializeTheme?.();

    initializeResponsiveNavbar?.();

    initializeAccessibility?.();

    navbarLog(

        "Navbar Manager Ready."

    );

}

/* ===========================================================
   GLOBAL EVENTS
=========================================================== */

window.addEventListener(

    "load",

    ()=>{

        updateNavbarOnScroll?.();

        updateResponsiveNavbar?.();

        updateActiveLink?.();

        navbarLog(

            "Window Loaded"

        );

    }

);

window.addEventListener(

    "pageshow",

    ()=>{

        updateNavbarOnScroll?.();

    }

);

window.addEventListener(

    "focus",

    ()=>{

        navbarLog(

            "Window Focus"

        );

    }

);

window.addEventListener(

    "blur",

    ()=>{

        navbarLog(

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

        errorNavbar?.(

            event.message

        );

    }

);

window.addEventListener(

    "unhandledrejection",

    event=>{

        errorNavbar?.(

            event.reason

        );

    }

);

/* ===========================================================
   CLEANUP
=========================================================== */

function cleanupNavbarManager(){

    closeMobileMenu?.();

    closeSearch?.();

    closeNotification?.();

    closeUserMenu?.();

    closeAllDropdowns?.();

    navbarLog(

        "Cleanup Complete"

    );

}

/* ===========================================================
   BEFORE UNLOAD
=========================================================== */

window.addEventListener(

    "beforeunload",

    ()=>{

        cleanupNavbarManager();

    }

);

/* ===========================================================
   FREEZE CONFIG
=========================================================== */

Object.freeze(

    NAVBAR_CONFIG

);

Object.freeze(

    NavbarInfo

);

/* ===========================================================
   EXPORT
=========================================================== */

window.NavbarManager=Object.assign(

    window.NavbarManager||{},

    {

        initialize:

            initializeNavbarManager,

        cleanup:

            cleanupNavbarManager,

        version:

            ()=>NavbarInfo.version,

        report:

            navbarReport,

        ready:

            navbarReady,

        state:

            NavbarState,

        config:

            NAVBAR_CONFIG,

        app:

            NavbarApp,

        info:

            NavbarInfo

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeNavbarManager();

    }

);

/* ===========================================================
   FINAL REPORT
=========================================================== */

navbarLog(

"======================================"

);

navbarLog(

"Investment Technology Indonesia"

);

navbarLog(

"Navbar Manager"

);

navbarLog(

"Version:",

NavbarInfo.version

);

navbarLog(

"Environment:",

NavbarInfo.environment

);

navbarLog(

"======================================"

);

/* ===========================================================
   FEATURES
=========================================================== */

/*
✔ Sticky Navbar
✔ Transparent Header
✔ Hide On Scroll
✔ Navbar Shadow
✔ Scroll Progress
✔ Responsive Navigation
✔ Mobile Menu
✔ Hamburger Animation
✔ Overlay Navigation
✔ Dropdown Menu
✔ Multi-Level Dropdown
✔ Mega Menu
✔ Active Navigation
✔ ScrollSpy
✔ Smooth Scroll
✔ Search Overlay
✔ Search Suggestions
✔ Notification Dropdown
✔ User Profile Menu
✔ Dark Mode Toggle
✔ Theme Synchronization
✔ Resize Handler
✔ Device Detection
✔ Accessibility
✔ Keyboard Navigation
✔ Focus Trap
✔ ARIA Support
✔ Skip Link
✔ Utility Functions
✔ Debug Tools
✔ Report Generator
✔ Public API
✔ ES6+
✔ Responsive
✔ Optimized
*/

/* ===========================================================
   END OF FILE
   assets/js/navbar.js
=========================================================== */