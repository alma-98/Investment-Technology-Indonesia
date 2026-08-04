/*!
===========================================================
 Investment Technology Indonesia
 assets/js/portfolio.js
 Part 1
 Core • Config • Initialization
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION
=========================================================== */

const PortfolioApp={

    name:"Investment Technology Indonesia Portfolio",

    version:"1.0.0",

    initialized:false,

    debug:false

};

/* ===========================================================
   CONFIG
=========================================================== */

const PORTFOLIO_CONFIG={

    selector:".portfolio",

    gridSelector:".portfolio-grid",

    itemSelector:".portfolio-item",

    filterSelector:".portfolio-filter",

    searchSelector:".portfolio-search",

    loadMoreSelector:".portfolio-load-more",

    modalSelector:"#portfolioModal",

    animationDuration:400,

    itemsPerPage:9,

    lazyLoad:true,

    masonry:true,

    responsive:true,

    infiniteScroll:false,

    defaultCategory:"all",

    defaultSort:"newest"

};

/* ===========================================================
   STATE
=========================================================== */

const PortfolioState={

    initialized:false,

    category:"all",

    search:"",

    sort:"newest",

    page:1,

    totalItems:0,

    visibleItems:0,

    loading:false,

    selected:null,

    observer:null

};

/* ===========================================================
   ELEMENTS
=========================================================== */

const Portfolio={

    container:null,

    grid:null,

    items:[],

    filters:[],

    search:null,

    loadMore:null,

    modal:null

};

/* ===========================================================
   LOGGER
=========================================================== */

function portfolioLog(...args){

    if(!PortfolioApp.debug){

        return;

    }

    console.log(

        "[Portfolio]",

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

    Portfolio.container=$(

        PORTFOLIO_CONFIG.selector

    );

    if(!Portfolio.container){

        return false;

    }

    Portfolio.grid=$(

        PORTFOLIO_CONFIG.gridSelector,

        Portfolio.container

    );

    Portfolio.items=$$(

        PORTFOLIO_CONFIG.itemSelector,

        Portfolio.container

    );

    Portfolio.filters=$$(

        PORTFOLIO_CONFIG.filterSelector,

        Portfolio.container

    );

    Portfolio.search=$(

        PORTFOLIO_CONFIG.searchSelector,

        Portfolio.container

    );

    Portfolio.loadMore=$(

        PORTFOLIO_CONFIG.loadMoreSelector,

        Portfolio.container

    );

    Portfolio.modal=$(

        PORTFOLIO_CONFIG.modalSelector

    );

    PortfolioState.totalItems=

        Portfolio.items.length;

    return true;

}

/* ===========================================================
   PREPARE ITEMS
=========================================================== */

function preparePortfolioItems(){

    Portfolio.items.forEach((item,index)=>{

        item.dataset.index=index;

        addClass(

            item,

            "portfolio-ready"

        );

    });

}

/* ===========================================================
   UPDATE STATE
=========================================================== */

function updatePortfolioState(){

    PortfolioState.visibleItems=

        Portfolio.items.filter(item=>

            item.style.display!=="none"

        ).length;

}

/* ===========================================================
   SHOW ALL
=========================================================== */

function showAllItems(){

    Portfolio.items.forEach(item=>{

        item.style.display="";

    });

    updatePortfolioState();

}

/* ===========================================================
   HIDE ALL
=========================================================== */

function hideAllItems(){

    Portfolio.items.forEach(item=>{

        item.style.display="none";

    });

    updatePortfolioState();

}

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializePortfolio(){

    if(PortfolioApp.initialized){

        return;

    }

    if(!initializeElements()){

        return;

    }

    PortfolioApp.initialized=true;

    PortfolioState.initialized=true;

    preparePortfolioItems();

    showAllItems();

    portfolioLog(

        "Portfolio Initialized"

    );

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshPortfolio(){

    initializeElements();

    preparePortfolioItems();

    updatePortfolioState();

    portfolioLog(

        "Portfolio Refreshed"

    );

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroyPortfolio(){

    Portfolio.items.forEach(item=>{

        item.removeAttribute(

            "style"

        );

        removeClass(

            item,

            "portfolio-ready"

        );

    });

    PortfolioState.initialized=false;

    portfolioLog(

        "Portfolio Destroyed"

    );

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializePortfolio();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

window.PortfolioManager={

    app:PortfolioApp,

    config:PORTFOLIO_CONFIG,

    state:PortfolioState,

    portfolio:Portfolio,

    init:initializePortfolio,

    refresh:refreshPortfolio,

    destroy:destroyPortfolio

};

/* ===========================================================
   END PART 1
===========================================================
*/
/*!
===========================================================
 Investment Technology Indonesia
 assets/js/portfolio.js
 Part 2
 Portfolio Grid • Masonry Layout • Responsive Grid
===========================================================
*/

"use strict";

/* ===========================================================
   GRID
=========================================================== */

const PortfolioGrid={

    masonry:PORTFOLIO_CONFIG.masonry,

    columns:3,

    gap:24,

    initialized:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializePortfolioGrid(){

    if(!Portfolio.grid){

        return;

    }

    detectGridColumns();

    applyGridLayout();

    initializeGridResize();

    PortfolioGrid.initialized=true;

}

/* ===========================================================
   DETECT COLUMNS
=========================================================== */

function detectGridColumns(){

    const width=window.innerWidth;

    if(width<576){

        PortfolioGrid.columns=1;

    }

    else if(width<992){

        PortfolioGrid.columns=2;

    }

    else if(width<1400){

        PortfolioGrid.columns=3;

    }

    else{

        PortfolioGrid.columns=4;

    }

}

/* ===========================================================
   GRID STYLE
=========================================================== */

function applyGridLayout(){

    if(!Portfolio.grid){

        return;

    }

    Portfolio.grid.style.display="grid";

    Portfolio.grid.style.gridTemplateColumns=

        `repeat(${PortfolioGrid.columns}, minmax(0,1fr))`;

    Portfolio.grid.style.gap=

        `${PortfolioGrid.gap}px`;

}

/* ===========================================================
   MASONRY
=========================================================== */

function applyMasonryLayout(){

    if(

        !PortfolioGrid.masonry ||

        !Portfolio.grid

    ){

        return;

    }

    Portfolio.items.forEach(item=>{

        const image=$("img",item);

        if(!image){

            return;

        }

        image.addEventListener(

            "load",

            ()=>{

                resizeMasonryItem(item);

            }

        );

        resizeMasonryItem(item);

    });

}

/* ===========================================================
   RESIZE ITEM
=========================================================== */

function resizeMasonryItem(item){

    if(!Portfolio.grid){

        return;

    }

    const rowGap=parseInt(

        getComputedStyle(

            Portfolio.grid

        ).getPropertyValue(

            "grid-row-gap"

        )

    )||PortfolioGrid.gap;

    const rowHeight=10;

    const content=item.querySelector(

        ".portfolio-card"

    )||item;

    const height=

        content.getBoundingClientRect()

        .height;

    const span=Math.ceil(

        (height+rowGap)/

        (rowHeight+rowGap)

    );

    item.style.gridRowEnd=

        `span ${span}`;

}

/* ===========================================================
   RESIZE ALL
=========================================================== */

function resizeAllMasonry(){

    Portfolio.items.forEach(item=>{

        resizeMasonryItem(item);

    });

}

/* ===========================================================
   GRID ANIMATION
=========================================================== */

function animateGrid(){

    Portfolio.items.forEach((item,index)=>{

        item.style.transition=

            "opacity .35s ease, transform .35s ease";

        item.style.transitionDelay=

            `${index*40}ms`;

    });

}

/* ===========================================================
   SHOW ITEM
=========================================================== */

function showPortfolioItem(item){

    item.style.display="";

    item.style.opacity="1";

    item.style.transform="translateY(0)";

}

/* ===========================================================
   HIDE ITEM
=========================================================== */

function hidePortfolioItem(item){

    item.style.opacity="0";

    item.style.transform="translateY(20px)";

    setTimeout(()=>{

        item.style.display="none";

    },PORTFOLIO_CONFIG.animationDuration);

}

/* ===========================================================
   REFRESH GRID
=========================================================== */

function refreshGrid(){

    detectGridColumns();

    applyGridLayout();

    resizeAllMasonry();

    animateGrid();

}

/* ===========================================================
   RESIZE
=========================================================== */

let portfolioResizeTimer=null;

function initializeGridResize(){

    window.addEventListener(

        "resize",

        ()=>{

            clearTimeout(

                portfolioResizeTimer

            );

            portfolioResizeTimer=

            setTimeout(()=>{

                refreshGrid();

            },150);

        },

        {

            passive:true

        }

    );

}

/* ===========================================================
   GAP
=========================================================== */

function setGridGap(value){

    PortfolioGrid.gap=value;

    applyGridLayout();

}

/* ===========================================================
   COLUMNS
=========================================================== */

function setGridColumns(value){

    PortfolioGrid.columns=value;

    applyGridLayout();

}

/* ===========================================================
   STATUS
=========================================================== */

function gridStatus(){

    return{

        masonry:

            PortfolioGrid.masonry,

        columns:

            PortfolioGrid.columns,

        gap:

            PortfolioGrid.gap,

        initialized:

            PortfolioGrid.initialized

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializePortfolioGrid();

        applyMasonryLayout();

        animateGrid();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.PortfolioManager,

    {

        grid:{

            init:

                initializePortfolioGrid,

            refresh:

                refreshGrid,

            masonry:

                applyMasonryLayout,

            resize:

                resizeAllMasonry,

            show:

                showPortfolioItem,

            hide:

                hidePortfolioItem,

            setGap:

                setGridGap,

            setColumns:

                setGridColumns,

            status:

                gridStatus

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
 assets/js/portfolio.js
 Part 3
 Portfolio Filter • Category • Live Search
===========================================================
*/

"use strict";

/* ===========================================================
   FILTER
=========================================================== */

const PortfolioFilter={

    current:PORTFOLIO_CONFIG.defaultCategory,

    search:"",

    total:0,

    visible:0,

    initialized:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializePortfolioFilter(){

    initializeCategoryFilter();

    initializeSearchFilter();

    updateFilterCounter();

    PortfolioFilter.initialized=true;

}

/* ===========================================================
   CATEGORY
=========================================================== */

function initializeCategoryFilter(){

    Portfolio.filters.forEach(button=>{

        on(

            button,

            "click",

            ()=>{

                const category=

                    button.dataset.filter ||

                    "all";

                filterPortfolio(

                    category

                );

            }

        );

    });

}

/* ===========================================================
   FILTER
=========================================================== */

function filterPortfolio(category){

    PortfolioFilter.current=category;

    PortfolioState.category=category;

    Portfolio.items.forEach(item=>{

        const itemCategory=

            item.dataset.category ||

            "all";

        const match=

            category==="all" ||

            itemCategory===category;

        if(match){

            showPortfolioItem(item);

        }else{

            hidePortfolioItem(item);

        }

    });

    updateActiveFilter();

    updateFilterCounter();

    refreshGrid?.();

}

/* ===========================================================
   ACTIVE
=========================================================== */

function updateActiveFilter(){

    Portfolio.filters.forEach(button=>{

        removeClass(

            button,

            "active"

        );

        if(

            button.dataset.filter===

            PortfolioFilter.current

        ){

            addClass(

                button,

                "active"

            );

        }

    });

}

/* ===========================================================
   SEARCH
=========================================================== */

function initializeSearchFilter(){

    if(!Portfolio.search){

        return;

    }

    on(

        Portfolio.search,

        "input",

        event=>{

            searchPortfolio(

                event.target.value

            );

        }

    );

}

/* ===========================================================
   SEARCH ENGINE
=========================================================== */

function searchPortfolio(keyword){

    keyword=

        keyword

        .trim()

        .toLowerCase();

    PortfolioFilter.search=keyword;

    PortfolioState.search=keyword;

    Portfolio.items.forEach(item=>{

        const text=

            item.textContent

            .toLowerCase();

        const category=

            PortfolioFilter.current;

        const itemCategory=

            item.dataset.category ||

            "all";

        const categoryMatch=

            category==="all" ||

            category===itemCategory;

        const searchMatch=

            keyword==="" ||

            text.includes(keyword);

        if(

            categoryMatch &&

            searchMatch

        ){

            showPortfolioItem(item);

        }else{

            hidePortfolioItem(item);

        }

    });

    updateFilterCounter();

    refreshGrid?.();

}

/* ===========================================================
   RESET
=========================================================== */

function resetPortfolioFilter(){

    PortfolioFilter.current="all";

    PortfolioFilter.search="";

    PortfolioState.category="all";

    PortfolioState.search="";

    if(Portfolio.search){

        Portfolio.search.value="";

    }

    showAllItems();

    updateActiveFilter();

    updateFilterCounter();

}

/* ===========================================================
   COUNTER
=========================================================== */

function updateFilterCounter(){

    PortfolioFilter.total=

        Portfolio.items.length;

    PortfolioFilter.visible=

        Portfolio.items.filter(item=>

            item.style.display!=="none"

        ).length;

    const counter=$(

        ".portfolio-counter",

        Portfolio.container

    );

    if(counter){

        counter.textContent=

            `${PortfolioFilter.visible} / ${PortfolioFilter.total}`;

    }

}

/* ===========================================================
   EMPTY
=========================================================== */

function updateEmptyState(){

    const empty=$(

        ".portfolio-empty",

        Portfolio.container

    );

    if(!empty){

        return;

    }

    empty.style.display=

        PortfolioFilter.visible===0

        ? "block"

        : "none";

}

/* ===========================================================
   APPLY
=========================================================== */

function applyCurrentFilter(){

    if(

        PortfolioFilter.search

    ){

        searchPortfolio(

            PortfolioFilter.search

        );

    }else{

        filterPortfolio(

            PortfolioFilter.current

        );

    }

    updateEmptyState();

}

/* ===========================================================
   STATUS
=========================================================== */

function filterStatus(){

    return{

        category:

            PortfolioFilter.current,

        search:

            PortfolioFilter.search,

        visible:

            PortfolioFilter.visible,

        total:

            PortfolioFilter.total

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializePortfolioFilter();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.PortfolioManager,

    {

        filter:{

            init:

                initializePortfolioFilter,

            apply:

                filterPortfolio,

            search:

                searchPortfolio,

            reset:

                resetPortfolioFilter,

            refresh:

                applyCurrentFilter,

            status:

                filterStatus

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
 assets/js/portfolio.js
 Part 4
 Portfolio Card Animation • Hover • Reveal Effects
===========================================================
*/

"use strict";

/* ===========================================================
   CARD ANIMATION
=========================================================== */

const PortfolioAnimation={

    hover:true,

    reveal:true,

    tilt:true,

    glow:true,

    duration:300,

    initialized:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializePortfolioAnimation(){

    initializeHoverAnimation();

    initializeRevealAnimation();

    initializeTiltAnimation();

    PortfolioAnimation.initialized=true;

}

/* ===========================================================
   HOVER
=========================================================== */

function initializeHoverAnimation(){

    Portfolio.items.forEach(item=>{

        on(

            item,

            "mouseenter",

            ()=>{

                playHoverAnimation(item);

            }

        );

        on(

            item,

            "mouseleave",

            ()=>{

                resetHoverAnimation(item);

            }

        );

    });

}

/* ===========================================================
   PLAY HOVER
=========================================================== */

function playHoverAnimation(item){

    addClass(

        item,

        "portfolio-hover"

    );

    item.style.transition=

        `all ${PortfolioAnimation.duration}ms ease`;

    item.style.transform=

        "translateY(-8px) scale(1.02)";

    item.style.boxShadow=

        "0 20px 50px rgba(0,0,0,.18)";

}

/* ===========================================================
   RESET HOVER
=========================================================== */

function resetHoverAnimation(item){

    removeClass(

        item,

        "portfolio-hover"

    );

    item.style.transform="";

    item.style.boxShadow="";

}

/* ===========================================================
   REVEAL
=========================================================== */

function initializeRevealAnimation(){

    if(

        !("IntersectionObserver" in window)

    ){

        revealAllCards();

        return;

    }

    const observer=

        new IntersectionObserver(

            entries=>{

                entries.forEach(entry=>{

                    if(

                        entry.isIntersecting

                    ){

                        revealCard(

                            entry.target

                        );

                        observer.unobserve(

                            entry.target

                        );

                    }

                });

            },

            {

                threshold:.15

            }

        );

    Portfolio.items.forEach(item=>{

        observer.observe(item);

    });

}

/* ===========================================================
   REVEAL CARD
=========================================================== */

function revealCard(item){

    addClass(

        item,

        "portfolio-visible"

    );

    item.style.opacity="1";

    item.style.transform=

        "translateY(0)";

}

/* ===========================================================
   REVEAL ALL
=========================================================== */

function revealAllCards(){

    Portfolio.items.forEach(item=>{

        revealCard(item);

    });

}

/* ===========================================================
   TILT
=========================================================== */

function initializeTiltAnimation(){

    if(

        !PortfolioAnimation.tilt

    ){

        return;

    }

    Portfolio.items.forEach(item=>{

        on(

            item,

            "mousemove",

            event=>{

                tiltCard(

                    item,

                    event

                );

            }

        );

        on(

            item,

            "mouseleave",

            ()=>{

                resetTilt(item);

            }

        );

    });

}

/* ===========================================================
   TILT EFFECT
=========================================================== */

function tiltCard(

    item,

    event

){

    const rect=

        item.getBoundingClientRect();

    const x=

        event.clientX-rect.left;

    const y=

        event.clientY-rect.top;

    const rotateX=

        (y/rect.height-.5)*-10;

    const rotateY=

        (x/rect.width-.5)*10;

    item.style.transform=

        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-8px)`;

}

/* ===========================================================
   RESET TILT
=========================================================== */

function resetTilt(item){

    item.style.transform="";

}

/* ===========================================================
   GLOW
=========================================================== */

function enableGlowEffect(){

    Portfolio.items.forEach(item=>{

        addClass(

            item,

            "portfolio-glow"

        );

    });

}

function disableGlowEffect(){

    Portfolio.items.forEach(item=>{

        removeClass(

            item,

            "portfolio-glow"

        );

    });

}

/* ===========================================================
   STAGGER
=========================================================== */

function staggerReveal(){

    Portfolio.items.forEach((item,index)=>{

        item.style.transitionDelay=

            `${index*70}ms`;

    });

}

/* ===========================================================
   RIPPLE
=========================================================== */

function addRippleEffect(item,event){

    const ripple=

        document.createElement("span");

    ripple.className=

        "portfolio-ripple";

    ripple.style.left=

        `${event.offsetX}px`;

    ripple.style.top=

        `${event.offsetY}px`;

    item.appendChild(ripple);

    setTimeout(()=>{

        ripple.remove();

    },600);

}

/* ===========================================================
   CLICK EFFECT
=========================================================== */

function initializeClickAnimation(){

    Portfolio.items.forEach(item=>{

        on(

            item,

            "click",

            event=>{

                addRippleEffect(

                    item,

                    event

                );

            }

        );

    });

}

/* ===========================================================
   STATUS
=========================================================== */

function animationStatus(){

    return{

        hover:

            PortfolioAnimation.hover,

        reveal:

            PortfolioAnimation.reveal,

        tilt:

            PortfolioAnimation.tilt,

        glow:

            PortfolioAnimation.glow,

        initialized:

            PortfolioAnimation.initialized

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializePortfolioAnimation();

        initializeClickAnimation();

        staggerReveal();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.PortfolioManager,

    {

        animation:{

            init:

                initializePortfolioAnimation,

            hover:

                playHoverAnimation,

            reset:

                resetHoverAnimation,

            reveal:

                revealCard,

            revealAll:

                revealAllCards,

            glowOn:

                enableGlowEffect,

            glowOff:

                disableGlowEffect,

            status:

                animationStatus

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
 assets/js/portfolio.js
 Part 5
 Lightbox • Gallery Viewer • Image Navigation
===========================================================
*/

"use strict";

/* ===========================================================
   LIGHTBOX
=========================================================== */

const PortfolioLightbox={

    overlay:null,

    image:null,

    title:null,

    description:null,

    counter:null,

    close:null,

    previous:null,

    next:null,

    items:[],

    current:0,

    opened:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeLightbox(){

    createLightbox();

    initializeLightboxItems();

    initializeLightboxEvents();

}

/* ===========================================================
   CREATE
=========================================================== */

function createLightbox(){

    if(

        document.querySelector(

            ".portfolio-lightbox"

        )

    ){

        PortfolioLightbox.overlay=

            document.querySelector(

                ".portfolio-lightbox"

            );

        return;

    }

    const lightbox=

        document.createElement("div");

    lightbox.className=

        "portfolio-lightbox";

    lightbox.innerHTML=`

<div class="portfolio-lightbox-backdrop"></div>

<div class="portfolio-lightbox-container">

<button class="portfolio-lightbox-close">&times;</button>

<button class="portfolio-lightbox-prev">&#10094;</button>

<button class="portfolio-lightbox-next">&#10095;</button>

<div class="portfolio-lightbox-image">

<img src="" alt="">

</div>

<div class="portfolio-lightbox-content">

<h3></h3>

<p></p>

<div class="portfolio-lightbox-counter"></div>

</div>

</div>

`;

    document.body.appendChild(lightbox);

    PortfolioLightbox.overlay=lightbox;

    PortfolioLightbox.image=

        $("img",lightbox);

    PortfolioLightbox.title=

        $("h3",lightbox);

    PortfolioLightbox.description=

        $("p",lightbox);

    PortfolioLightbox.counter=

        $(".portfolio-lightbox-counter",lightbox);

    PortfolioLightbox.close=

        $(".portfolio-lightbox-close",lightbox);

    PortfolioLightbox.previous=

        $(".portfolio-lightbox-prev",lightbox);

    PortfolioLightbox.next=

        $(".portfolio-lightbox-next",lightbox);

}

/* ===========================================================
   ITEMS
=========================================================== */

function initializeLightboxItems(){

    PortfolioLightbox.items=

        Portfolio.items;

    Portfolio.items.forEach((item,index)=>{

        on(

            item,

            "click",

            ()=>{

                openLightbox(index);

            }

        );

    });

}

/* ===========================================================
   OPEN
=========================================================== */

function openLightbox(index){

    PortfolioLightbox.current=index;

    PortfolioLightbox.opened=true;

    updateLightbox();

    addClass(

        PortfolioLightbox.overlay,

        "active"

    );

    document.body.classList.add(

        "lightbox-open"

    );

}

/* ===========================================================
   CLOSE
=========================================================== */

function closeLightbox(){

    PortfolioLightbox.opened=false;

    removeClass(

        PortfolioLightbox.overlay,

        "active"

    );

    document.body.classList.remove(

        "lightbox-open"

    );

}

/* ===========================================================
   UPDATE
=========================================================== */

function updateLightbox(){

    const item=

        PortfolioLightbox.items[

            PortfolioLightbox.current

        ];

    if(!item){

        return;

    }

    const image=

        $("img",item);

    PortfolioLightbox.image.src=

        image?.dataset.src ||

        image?.src ||

        "";

    PortfolioLightbox.image.alt=

        image?.alt ||

        "";

    PortfolioLightbox.title.textContent=

        item.dataset.title ||

        "Portfolio Project";

    PortfolioLightbox.description.textContent=

        item.dataset.description ||

        "";

    PortfolioLightbox.counter.textContent=

        `${PortfolioLightbox.current+1} / ${PortfolioLightbox.items.length}`;

}

/* ===========================================================
   NEXT
=========================================================== */

function nextLightbox(){

    PortfolioLightbox.current++;

    if(

        PortfolioLightbox.current>=

        PortfolioLightbox.items.length

    ){

        PortfolioLightbox.current=0;

    }

    updateLightbox();

}

/* ===========================================================
   PREVIOUS
=========================================================== */

function previousLightbox(){

    PortfolioLightbox.current--;

    if(

        PortfolioLightbox.current<0

    ){

        PortfolioLightbox.current=

            PortfolioLightbox.items.length-1;

    }

    updateLightbox();

}

/* ===========================================================
   EVENTS
=========================================================== */

function initializeLightboxEvents(){

    on(

        PortfolioLightbox.close,

        "click",

        closeLightbox

    );

    on(

        PortfolioLightbox.next,

        "click",

        nextLightbox

    );

    on(

        PortfolioLightbox.previous,

        "click",

        previousLightbox

    );

    on(

        PortfolioLightbox.overlay,

        "click",

        event=>{

            if(

                event.target===

                PortfolioLightbox.overlay

            ){

                closeLightbox();

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

        if(

            !PortfolioLightbox.opened

        ){

            return;

        }

        switch(event.key){

            case "Escape":

                closeLightbox();

                break;

            case "ArrowRight":

                nextLightbox();

                break;

            case "ArrowLeft":

                previousLightbox();

                break;

        }

    }

);

/* ===========================================================
   STATUS
=========================================================== */

function lightboxStatus(){

    return{

        opened:

            PortfolioLightbox.opened,

        current:

            PortfolioLightbox.current,

        total:

            PortfolioLightbox.items.length

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeLightbox();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.PortfolioManager,

    {

        lightbox:{

            init:

                initializeLightbox,

            open:

                openLightbox,

            close:

                closeLightbox,

            next:

                nextLightbox,

            previous:

                previousLightbox,

            update:

                updateLightbox,

            status:

                lightboxStatus

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
 assets/js/portfolio.js
 Part 6
 Project Detail Modal • Project Information • Actions
===========================================================
*/

"use strict";

/* ===========================================================
   PROJECT MODAL
=========================================================== */

const ProjectModal={

    modal:null,

    content:null,

    image:null,

    title:null,

    category:null,

    client:null,

    date:null,

    description:null,

    technologies:null,

    website:null,

    github:null,

    close:null,

    opened:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeProjectModal(){

    createProjectModal();

    initializeProjectButtons();

    initializeProjectEvents();

}

/* ===========================================================
   CREATE
=========================================================== */

function createProjectModal(){

    if(document.querySelector(".project-modal")){

        ProjectModal.modal=

            document.querySelector(

                ".project-modal"

            );

        return;

    }

    const modal=document.createElement("div");

    modal.className="project-modal";

    modal.innerHTML=`

<div class="project-modal-overlay"></div>

<div class="project-modal-container">

<button class="project-modal-close">

&times;

</button>

<div class="project-modal-image">

<img src="" alt="">

</div>

<div class="project-modal-body">

<h2 class="project-title"></h2>

<span class="project-category"></span>

<div class="project-meta">

<p><strong>Client :</strong>

<span class="project-client"></span></p>

<p><strong>Date :</strong>

<span class="project-date"></span></p>

</div>

<div class="project-description"></div>

<div class="project-technologies"></div>

<div class="project-actions">

<a class="project-website"

target="_blank">

Visit Website

</a>

<a class="project-github"

target="_blank">

GitHub

</a>

</div>

</div>

</div>

`;

    document.body.appendChild(modal);

    ProjectModal.modal=modal;

    ProjectModal.image=$("img",modal);

    ProjectModal.title=$(".project-title",modal);

    ProjectModal.category=$(".project-category",modal);

    ProjectModal.client=$(".project-client",modal);

    ProjectModal.date=$(".project-date",modal);

    ProjectModal.description=$(

        ".project-description",

        modal

    );

    ProjectModal.technologies=$(

        ".project-technologies",

        modal

    );

    ProjectModal.website=$(

        ".project-website",

        modal

    );

    ProjectModal.github=$(

        ".project-github",

        modal

    );

    ProjectModal.close=$(

        ".project-modal-close",

        modal

    );

}

/* ===========================================================
   BUTTONS
=========================================================== */

function initializeProjectButtons(){

    Portfolio.items.forEach(item=>{

        const button=

            $(".portfolio-detail",item);

        if(!button){

            return;

        }

        on(

            button,

            "click",

            event=>{

                event.preventDefault();

                event.stopPropagation();

                openProjectModal(item);

            }

        );

    });

}

/* ===========================================================
   OPEN
=========================================================== */

function openProjectModal(item){

    populateProjectModal(item);

    addClass(

        ProjectModal.modal,

        "active"

    );

    document.body.classList.add(

        "project-modal-open"

    );

    ProjectModal.opened=true;

}

/* ===========================================================
   CLOSE
=========================================================== */

function closeProjectModal(){

    removeClass(

        ProjectModal.modal,

        "active"

    );

    document.body.classList.remove(

        "project-modal-open"

    );

    ProjectModal.opened=false;

}

/* ===========================================================
   POPULATE
=========================================================== */

function populateProjectModal(item){

    const image=$("img",item);

    ProjectModal.image.src=

        image?.dataset.src ||

        image?.src ||

        "";

    ProjectModal.image.alt=

        image?.alt ||

        "";

    ProjectModal.title.textContent=

        item.dataset.title ||

        "Portfolio Project";

    ProjectModal.category.textContent=

        item.dataset.category ||

        "General";

    ProjectModal.client.textContent=

        item.dataset.client ||

        "-";

    ProjectModal.date.textContent=

        item.dataset.date ||

        "-";

    ProjectModal.description.innerHTML=

        item.dataset.description ||

        "";

    renderTechnologies(

        item.dataset.tech ||

        ""

    );

    updateProjectLinks(item);

}

/* ===========================================================
   TECHNOLOGIES
=========================================================== */

function renderTechnologies(tech){

    ProjectModal.technologies.innerHTML="";

    if(!tech){

        return;

    }

    tech.split(",")

    .forEach(item=>{

        const badge=

            document.createElement("span");

        badge.className=

            "project-tech";

        badge.textContent=

            item.trim();

        ProjectModal.technologies

            .appendChild(badge);

    });

}

/* ===========================================================
   LINKS
=========================================================== */

function updateProjectLinks(item){

    const website=

        item.dataset.website;

    const github=

        item.dataset.github;

    if(website){

        ProjectModal.website.href=

            website;

        ProjectModal.website.style.display="";

    }else{

        ProjectModal.website.style.display=

            "none";

    }

    if(github){

        ProjectModal.github.href=

            github;

        ProjectModal.github.style.display="";

    }else{

        ProjectModal.github.style.display=

            "none";

    }

}

/* ===========================================================
   EVENTS
=========================================================== */

function initializeProjectEvents(){

    on(

        ProjectModal.close,

        "click",

        closeProjectModal

    );

    on(

        ProjectModal.modal,

        "click",

        event=>{

            if(

                event.target===

                ProjectModal.modal ||

                event.target.classList.contains(

                    "project-modal-overlay"

                )

            ){

                closeProjectModal();

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

        if(

            !ProjectModal.opened

        ){

            return;

        }

        if(event.key==="Escape"){

            closeProjectModal();

        }

    }

);

/* ===========================================================
   STATUS
=========================================================== */

function projectModalStatus(){

    return{

        opened:

            ProjectModal.opened,

        title:

            ProjectModal.title?.textContent ||

            "",

        category:

            ProjectModal.category?.textContent ||

            ""

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeProjectModal();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.PortfolioManager,

    {

        project:{

            init:

                initializeProjectModal,

            open:

                openProjectModal,

            close:

                closeProjectModal,

            update:

                populateProjectModal,

            status:

                projectModalStatus

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
 assets/js/portfolio.js
 Part 7
 Load More • Pagination • Infinite Scroll
===========================================================
*/

"use strict";

/* ===========================================================
   PAGINATION
=========================================================== */

const PortfolioPagination={

    page:1,

    perPage:PORTFOLIO_CONFIG.itemsPerPage,

    totalPages:1,

    infinite:PORTFOLIO_CONFIG.infiniteScroll,

    initialized:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializePagination(){

    calculatePagination();

    renderPagination();

    initializeLoadMore();

    initializeInfiniteScroll();

    PortfolioPagination.initialized=true;

}

/* ===========================================================
   CALCULATE
=========================================================== */

function calculatePagination(){

    PortfolioPagination.totalPages=

        Math.max(

            1,

            Math.ceil(

                Portfolio.items.length/

                PortfolioPagination.perPage

            )

        );

}

/* ===========================================================
   RENDER
=========================================================== */

function renderPagination(){

    Portfolio.items.forEach((item,index)=>{

        if(

            index<

            PortfolioPagination.page*

            PortfolioPagination.perPage

        ){

            item.style.display="";

        }else{

            item.style.display="none";

        }

    });

    updatePaginationInfo();

}

/* ===========================================================
   LOAD MORE
=========================================================== */

function initializeLoadMore(){

    if(

        !Portfolio.loadMore

    ){

        return;

    }

    on(

        Portfolio.loadMore,

        "click",

        ()=>{

            loadMoreItems();

        }

    );

}

/* ===========================================================
   LOAD
=========================================================== */

function loadMoreItems(){

    if(

        PortfolioPagination.page>=

        PortfolioPagination.totalPages

    ){

        hideLoadMoreButton();

        return;

    }

    PortfolioPagination.page++;

    renderPagination();

    refreshGrid?.();

}

/* ===========================================================
   LOAD BUTTON
=========================================================== */

function hideLoadMoreButton(){

    if(

        Portfolio.loadMore

    ){

        Portfolio.loadMore.style.display=

            "none";

    }

}

function showLoadMoreButton(){

    if(

        Portfolio.loadMore

    ){

        Portfolio.loadMore.style.display=

            "";

    }

}

/* ===========================================================
   PAGINATION INFO
=========================================================== */

function updatePaginationInfo(){

    const visible=

        Math.min(

            PortfolioPagination.page*

            PortfolioPagination.perPage,

            Portfolio.items.length

        );

    const info=$(

        ".portfolio-pagination-info",

        Portfolio.container

    );

    if(info){

        info.textContent=

            `${visible} of ${Portfolio.items.length}`;

    }

    if(

        visible>=

        Portfolio.items.length

    ){

        hideLoadMoreButton();

    }else{

        showLoadMoreButton();

    }

}

/* ===========================================================
   PAGE
=========================================================== */

function goToPortfolioPage(page){

    page=Math.max(

        1,

        Math.min(

            page,

            PortfolioPagination.totalPages

        )

    );

    PortfolioPagination.page=page;

    renderPagination();

    refreshGrid?.();

}

/* ===========================================================
   NEXT
=========================================================== */

function nextPortfolioPage(){

    goToPortfolioPage(

        PortfolioPagination.page+1

    );

}

/* ===========================================================
   PREVIOUS
=========================================================== */

function previousPortfolioPage(){

    goToPortfolioPage(

        PortfolioPagination.page-1

    );

}

/* ===========================================================
   RESET
=========================================================== */

function resetPagination(){

    PortfolioPagination.page=1;

    renderPagination();

}

/* ===========================================================
   INFINITE SCROLL
=========================================================== */

function initializeInfiniteScroll(){

    if(

        !PortfolioPagination.infinite

    ){

        return;

    }

    window.addEventListener(

        "scroll",

        handleInfiniteScroll,

        {

            passive:true

        }

    );

}

function handleInfiniteScroll(){

    if(

        !PortfolioPagination.infinite

    ){

        return;

    }

    const scroll=

        window.scrollY+

        window.innerHeight;

    const height=

        document.documentElement.scrollHeight;

    if(

        scroll>=height-200

    ){

        loadMoreItems();

    }

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableInfiniteScroll(){

    PortfolioPagination.infinite=true;

}

/* ===========================================================
   DISABLE
=========================================================== */

function disableInfiniteScroll(){

    PortfolioPagination.infinite=false;

}

/* ===========================================================
   STATUS
=========================================================== */

function paginationStatus(){

    return{

        page:

            PortfolioPagination.page,

        totalPages:

            PortfolioPagination.totalPages,

        perPage:

            PortfolioPagination.perPage,

        infinite:

            PortfolioPagination.infinite,

        initialized:

            PortfolioPagination.initialized

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializePagination();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.PortfolioManager,

    {

        pagination:{

            init:

                initializePagination,

            next:

                nextPortfolioPage,

            previous:

                previousPortfolioPage,

            goTo:

                goToPortfolioPage,

            loadMore:

                loadMoreItems,

            reset:

                resetPagination,

            enableInfinite:

                enableInfiniteScroll,

            disableInfinite:

                disableInfiniteScroll,

            status:

                paginationStatus

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
 assets/js/portfolio.js
 Part 8
 Sorting • Responsive Layout • View Mode
===========================================================
*/

"use strict";

/* ===========================================================
   SORT ENGINE
=========================================================== */

const PortfolioSort={

    current:PORTFOLIO_CONFIG.defaultSort,

    initialized:false,

    responsive:true,

    view:"grid"

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeSorting(){

    initializeSortButtons();

    initializeViewButtons();

    initializeResponsiveLayout();

    PortfolioSort.initialized=true;

}

/* ===========================================================
   SORT BUTTONS
=========================================================== */

function initializeSortButtons(){

    $$(
        ".portfolio-sort button",
        Portfolio.container
    ).forEach(button=>{

        on(

            button,

            "click",

            ()=>{

                const sort=

                    button.dataset.sort ||

                    "newest";

                sortPortfolio(sort);

            }

        );

    });

}

/* ===========================================================
   SORT
=========================================================== */

function sortPortfolio(type){

    PortfolioSort.current=type;

    PortfolioState.sort=type;

    const items=[

        ...Portfolio.items

    ];

    items.sort((a,b)=>{

        switch(type){

            case "az":

                return (

                    a.dataset.title||

                    ""

                ).localeCompare(

                    b.dataset.title||

                    ""

                );

            case "za":

                return (

                    b.dataset.title||

                    ""

                ).localeCompare(

                    a.dataset.title||

                    ""

                );

            case "oldest":

                return new Date(

                    a.dataset.date||0

                )-

                new Date(

                    b.dataset.date||0

                );

            case "featured":

                return (

                    b.dataset.featured==="true"

                )-

                (

                    a.dataset.featured==="true"

                );

            default:

                return new Date(

                    b.dataset.date||0

                )-

                new Date(

                    a.dataset.date||0

                );

        }

    });

    items.forEach(item=>{

        Portfolio.grid.appendChild(item);

    });

    Portfolio.items=[...items];

    refreshGrid?.();

}

/* ===========================================================
   VIEW MODE
=========================================================== */

function initializeViewButtons(){

    $$(
        ".portfolio-view button",
        Portfolio.container
    ).forEach(button=>{

        on(

            button,

            "click",

            ()=>{

                setViewMode(

                    button.dataset.view||

                    "grid"

                );

            }

        );

    });

}

/* ===========================================================
   GRID VIEW
=========================================================== */

function setGridView(){

    PortfolioSort.view="grid";

    removeClass(

        Portfolio.grid,

        "portfolio-list"

    );

    addClass(

        Portfolio.grid,

        "portfolio-grid-view"

    );

}

/* ===========================================================
   LIST VIEW
=========================================================== */

function setListView(){

    PortfolioSort.view="list";

    removeClass(

        Portfolio.grid,

        "portfolio-grid-view"

    );

    addClass(

        Portfolio.grid,

        "portfolio-list"

    );

}

/* ===========================================================
   VIEW
=========================================================== */

function setViewMode(view){

    if(view==="list"){

        setListView();

    }else{

        setGridView();

    }

}

/* ===========================================================
   RESPONSIVE
=========================================================== */

function initializeResponsiveLayout(){

    if(

        !PortfolioSort.responsive

    ){

        return;

    }

    window.addEventListener(

        "resize",

        debounceResponsive,

        {

            passive:true

        }

    );

    applyResponsivePortfolio();

}

let responsiveTimer=null;

function debounceResponsive(){

    clearTimeout(

        responsiveTimer

    );

    responsiveTimer=

    setTimeout(

        applyResponsivePortfolio,

        150

    );

}

/* ===========================================================
   APPLY
=========================================================== */

function applyResponsivePortfolio(){

    const width=

        window.innerWidth;

    if(width<768){

        setGridColumns?.(1);

    }

    else if(width<1200){

        setGridColumns?.(2);

    }

    else{

        setGridColumns?.(3);

    }

}

/* ===========================================================
   SHUFFLE
=========================================================== */

function shufflePortfolio(){

    const items=[

        ...Portfolio.items

    ];

    items.sort(

        ()=>Math.random()-.5

    );

    items.forEach(item=>{

        Portfolio.grid.appendChild(item);

    });

    Portfolio.items=[...items];

}

/* ===========================================================
   STATUS
=========================================================== */

function sortingStatus(){

    return{

        sort:

            PortfolioSort.current,

        view:

            PortfolioSort.view,

        responsive:

            PortfolioSort.responsive,

        initialized:

            PortfolioSort.initialized

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeSorting();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.PortfolioManager,

    {

        sorting:{

            init:

                initializeSorting,

            sort:

                sortPortfolio,

            grid:

                setGridView,

            list:

                setListView,

            view:

                setViewMode,

            shuffle:

                shufflePortfolio,

            status:

                sortingStatus

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
 assets/js/portfolio.js
 Part 9
 Lazy Loading • Performance • Image Optimization
===========================================================
*/

"use strict";

/* ===========================================================
   LAZY LOADER
=========================================================== */

const PortfolioLazy={

    enabled:PORTFOLIO_CONFIG.lazyLoad,

    observer:null,

    loaded:0,

    total:0,

    initialized:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeLazyLoading(){

    if(!PortfolioLazy.enabled){

        loadAllPortfolioImages();

        return;

    }

    if(!("IntersectionObserver" in window)){

        loadAllPortfolioImages();

        return;

    }

    PortfolioLazy.observer=

        new IntersectionObserver(

            handleLazyImages,

            {

                root:null,

                rootMargin:"250px",

                threshold:0.15

            }

        );

    observePortfolioImages();

    PortfolioLazy.initialized=true;

}

/* ===========================================================
   OBSERVE
=========================================================== */

function observePortfolioImages(){

    const images=$$(

        "img[data-src]",

        Portfolio.container

    );

    PortfolioLazy.total=

        images.length;

    images.forEach(image=>{

        PortfolioLazy.observer.observe(image);

    });

}

/* ===========================================================
   CALLBACK
=========================================================== */

function handleLazyImages(entries){

    entries.forEach(entry=>{

        if(!entry.isIntersecting){

            return;

        }

        loadPortfolioImage(

            entry.target

        );

        PortfolioLazy.observer.unobserve(

            entry.target

        );

    });

}

/* ===========================================================
   LOAD IMAGE
=========================================================== */

function loadPortfolioImage(image){

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

        PortfolioLazy.loaded++;

    };

}

/* ===========================================================
   LOAD ALL
=========================================================== */

function loadAllPortfolioImages(){

    $$(
        "img[data-src]",
        Portfolio.container
    ).forEach(image=>{

        loadPortfolioImage(image);

    });

}

/* ===========================================================
   PRELOAD NEXT
=========================================================== */

function preloadVisibleImages(){

    Portfolio.items.forEach(item=>{

        if(

            item.style.display==="none"

        ){

            return;

        }

        $$(
            "img[data-src]",
            item
        ).forEach(image=>{

            loadPortfolioImage(image);

        });

    });

}

/* ===========================================================
   IMAGE OPTIMIZATION
=========================================================== */

function optimizePortfolioImages(){

    $$(
        "img",
        Portfolio.container
    ).forEach(image=>{

        image.loading="lazy";

        image.decoding="async";

        image.draggable=false;

        image.setAttribute(

            "fetchpriority",

            "low"

        );

    });

}

/* ===========================================================
   MEMORY CLEANUP
=========================================================== */

function cleanupUnusedImages(){

    Portfolio.items.forEach(item=>{

        if(

            item.style.display==="none"

        ){

            $$(
                "img",
                item
            ).forEach(image=>{

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

function optimizePortfolioPerformance(){

    optimizePortfolioImages();

    preloadVisibleImages();

    cleanupUnusedImages();

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshLazyLoading(){

    PortfolioLazy.observer?.disconnect();

    initializeLazyLoading();

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableLazyLoading(){

    PortfolioLazy.enabled=true;

    refreshLazyLoading();

}

/* ===========================================================
   DISABLE
=========================================================== */

function disableLazyLoading(){

    PortfolioLazy.enabled=false;

    PortfolioLazy.observer?.disconnect();

    loadAllPortfolioImages();

}

/* ===========================================================
   STATUS
=========================================================== */

function lazyLoadingStatus(){

    return{

        enabled:

            PortfolioLazy.enabled,

        initialized:

            PortfolioLazy.initialized,

        loaded:

            PortfolioLazy.loaded,

        total:

            PortfolioLazy.total

    };

}

/* ===========================================================
   WINDOW LOAD
=========================================================== */

window.addEventListener(

    "load",

    ()=>{

        optimizePortfolioPerformance();

    }

);

/* ===========================================================
   VISIBILITY
=========================================================== */

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(document.hidden){

            return;

        }

        preloadVisibleImages();

    }

);

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeLazyLoading();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.PortfolioManager,

    {

        lazy:{

            init:

                initializeLazyLoading,

            refresh:

                refreshLazyLoading,

            preload:

                preloadVisibleImages,

            optimize:

                optimizePortfolioPerformance,

            enable:

                enableLazyLoading,

            disable:

                disableLazyLoading,

            status:

                lazyLoadingStatus

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
 assets/js/portfolio.js
 Part 10
 Statistics • Counter • Progress • Analytics
===========================================================
*/

"use strict";

/* ===========================================================
   PORTFOLIO STATS
=========================================================== */

const PortfolioStats={

    projects:0,

    visible:0,

    categories:0,

    featured:0,

    initialized:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializePortfolioStatistics(){

    calculatePortfolioStatistics();

    updateStatisticsUI();

    initializeStatisticsObserver();

    PortfolioStats.initialized=true;

}

/* ===========================================================
   CALCULATE
=========================================================== */

function calculatePortfolioStatistics(){

    PortfolioStats.projects=

        Portfolio.items.length;

    PortfolioStats.visible=

        Portfolio.items.filter(item=>

            item.style.display!=="none"

        ).length;

    PortfolioStats.categories=

        new Set(

            Portfolio.items.map(item=>

                item.dataset.category||

                "General"

            )

        ).size;

    PortfolioStats.featured=

        Portfolio.items.filter(item=>

            item.dataset.featured==="true"

        ).length;

}

/* ===========================================================
   UPDATE UI
=========================================================== */

function updateStatisticsUI(){

    updateStatistic(

        ".portfolio-total",

        PortfolioStats.projects

    );

    updateStatistic(

        ".portfolio-visible",

        PortfolioStats.visible

    );

    updateStatistic(

        ".portfolio-categories",

        PortfolioStats.categories

    );

    updateStatistic(

        ".portfolio-featured",

        PortfolioStats.featured

    );

}

/* ===========================================================
   UPDATE SINGLE
=========================================================== */

function updateStatistic(

    selector,

    value

){

    const element=$(

        selector,

        Portfolio.container

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

    const duration=1200;

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

function updatePortfolioProgress(){

    const progress=$(

        ".portfolio-progress-bar",

        Portfolio.container

    );

    if(!progress){

        return;

    }

    const percent=

        PortfolioStats.projects===0

        ? 0

        :

        (PortfolioStats.visible/

        PortfolioStats.projects)*100;

    progress.style.width=

        `${percent}%`;

}

/* ===========================================================
   CATEGORY PROGRESS
=========================================================== */

function updateCategoryProgress(){

    $$(
        ".portfolio-category-progress",

        Portfolio.container

    ).forEach(bar=>{

        const category=

            bar.dataset.category;

        const total=

            Portfolio.items.filter(item=>

                item.dataset.category===category

            ).length;

        const percent=

            PortfolioStats.projects===0

            ?0

            :(total/

            PortfolioStats.projects)*100;

        bar.style.width=

            `${percent}%`;

    });

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

                        calculatePortfolioStatistics();

                        updateStatisticsUI();

                        updatePortfolioProgress();

                        updateCategoryProgress();

                    }

                });

            },

            {

                threshold:.2

            }

        );

    observer.observe(

        Portfolio.container

    );

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshStatistics(){

    calculatePortfolioStatistics();

    updateStatisticsUI();

    updatePortfolioProgress();

    updateCategoryProgress();

}

/* ===========================================================
   EXPORT
=========================================================== */

function exportStatistics(){

    return{

        totalProjects:

            PortfolioStats.projects,

        visibleProjects:

            PortfolioStats.visible,

        featuredProjects:

            PortfolioStats.featured,

        categories:

            PortfolioStats.categories,

        timestamp:

            new Date().toISOString()

    };

}

/* ===========================================================
   STATUS
=========================================================== */

function statisticsStatus(){

    return{

        initialized:

            PortfolioStats.initialized,

        total:

            PortfolioStats.projects,

        visible:

            PortfolioStats.visible,

        featured:

            PortfolioStats.featured,

        categories:

            PortfolioStats.categories

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializePortfolioStatistics();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.PortfolioManager,

    {

        statistics:{

            init:

                initializePortfolioStatistics,

            refresh:

                refreshStatistics,

            export:

                exportStatistics,

            progress:

                updatePortfolioProgress,

            categoryProgress:

                updateCategoryProgress,

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
 assets/js/portfolio.js
 Part 11
 Utilities • Debug • Report • Public API
===========================================================
*/

"use strict";

/* ===========================================================
   INFORMATION
=========================================================== */

const PortfolioInfo={

    name:"Portfolio Manager",

    version:"1.0.0",

    author:"Investment Technology Indonesia",

    environment:"production"

};

/* ===========================================================
   DEBUG
=========================================================== */

function enablePortfolioDebug(){

    PortfolioApp.debug=true;

    portfolioLog("Debug Enabled");

}

function disablePortfolioDebug(){

    PortfolioApp.debug=false;

}

function portfolioDebug(...args){

    if(!PortfolioApp.debug){

        return;

    }

    console.log(

        "[Portfolio Debug]",

        ...args

    );

}

function portfolioWarn(message){

    console.warn(

        "[Portfolio Warning]",

        message

    );

}

function portfolioError(message){

    console.error(

        "[Portfolio Error]",

        message

    );

}

/* ===========================================================
   UUID
=========================================================== */

function portfolioID(){

    if(window.crypto?.randomUUID){

        return crypto.randomUUID();

    }

    return "portfolio-"+

        Date.now()+"-"+

        Math.random()

        .toString(36)

        .substring(2,10);

}

/* ===========================================================
   WAIT
=========================================================== */

function portfolioWait(milliseconds=300){

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

    return `${

        clamp(value,0,100)

    }%`;

}

/* ===========================================================
   TIMESTAMP
=========================================================== */

function portfolioTimestamp(){

    return new Date()

        .toLocaleString(

            "id-ID"

        );

}

/* ===========================================================
   REPORT
=========================================================== */

function portfolioReport(){

    return{

        info:PortfolioInfo,

        app:PortfolioApp,

        config:PORTFOLIO_CONFIG,

        state:PortfolioState,

        grid:

            gridStatus?.(),

        filter:

            filterStatus?.(),

        animation:

            animationStatus?.(),

        lightbox:

            lightboxStatus?.(),

        project:

            projectModalStatus?.(),

        pagination:

            paginationStatus?.(),

        sorting:

            sortingStatus?.(),

        lazy:

            lazyLoadingStatus?.(),

        statistics:

            statisticsStatus?.(),

        timestamp:

            portfolioTimestamp()

    };

}

/* ===========================================================
   PRINT REPORT
=========================================================== */

function printPortfolioReport(){

    console.table(

        portfolioReport()

    );

}

/* ===========================================================
   RESET
=========================================================== */

function resetPortfolioManager(){

    resetPortfolioFilter?.();

    resetPagination?.();

    refreshGrid?.();

    refreshStatistics?.();

    refreshLazyLoading?.();

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroyPortfolioManager(){

    destroyPortfolio?.();

    PortfolioLazy.observer?.disconnect();

    portfolioLog(

        "Portfolio Manager Destroyed"

    );

}

/* ===========================================================
   RESTART
=========================================================== */

function restartPortfolioManager(){

    destroyPortfolioManager();

    initializePortfolio?.();

    initializePortfolioGrid?.();

    initializePortfolioFilter?.();

    initializePortfolioAnimation?.();

    initializeLightbox?.();

    initializeProjectModal?.();

    initializePagination?.();

    initializeSorting?.();

    initializeLazyLoading?.();

    initializePortfolioStatistics?.();

}

/* ===========================================================
   READY
=========================================================== */

function portfolioReady(){

    return{

        initialized:

            PortfolioApp.initialized,

        totalItems:

            PortfolioState.totalItems,

        visibleItems:

            PortfolioState.visibleItems,

        category:

            PortfolioState.category,

        search:

            PortfolioState.search

    };

}

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.PortfolioManager,

    {

        info:PortfolioInfo,

        report:portfolioReport,

        printReport:printPortfolioReport,

        ready:portfolioReady,

        reset:resetPortfolioManager,

        restart:restartPortfolioManager,

        destroy:destroyPortfolioManager,

        enableDebug:enablePortfolioDebug,

        disableDebug:disablePortfolioDebug,

        debug:portfolioDebug,

        warn:portfolioWarn,

        error:portfolioError,

        wait:portfolioWait,

        debounce,

        throttle,

        clamp,

        portfolioID,

        formatMilliseconds,

        formatPercent,

        timestamp:portfolioTimestamp

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        portfolioDebug(

            "Portfolio Utilities Ready"

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
 assets/js/portfolio.js
 Part 12
 Final Initialization • Cleanup • Export • End of File
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION INITIALIZER
=========================================================== */

function initializePortfolioManager(){

    if(PortfolioApp.initialized){

        portfolioLog(

            "Portfolio Manager already initialized."

        );

        return;

    }

    PortfolioApp.initialized=true;

    portfolioLog(

        "Initializing Portfolio Manager..."

    );

    initializePortfolio?.();

    initializePortfolioGrid?.();

    initializePortfolioFilter?.();

    initializePortfolioAnimation?.();

    initializeLightbox?.();

    initializeProjectModal?.();

    initializePagination?.();

    initializeSorting?.();

    initializeLazyLoading?.();

    initializePortfolioStatistics?.();

    portfolioLog(

        "Portfolio Manager Ready."

    );

}

/* ===========================================================
   GLOBAL EVENTS
=========================================================== */

window.addEventListener(

    "load",

    ()=>{

        refreshPortfolio?.();

        refreshGrid?.();

        refreshStatistics?.();

        portfolioLog(

            "Window Loaded"

        );

    }

);

window.addEventListener(

    "pageshow",

    ()=>{

        refreshPortfolio?.();

        refreshLazyLoading?.();

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

        portfolioLog(

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

        portfolioError?.(

            event.message

        );

    }

);

window.addEventListener(

    "unhandledrejection",

    event=>{

        portfolioError?.(

            event.reason

        );

    }

);

/* ===========================================================
   CLEANUP
=========================================================== */

function cleanupPortfolioManager(){

    PortfolioLazy.observer?.disconnect();

    PortfolioState.observer?.disconnect?.();

    portfolioLog(

        "Portfolio Cleanup Complete"

    );

}

/* ===========================================================
   BEFORE UNLOAD
=========================================================== */

window.addEventListener(

    "beforeunload",

    ()=>{

        cleanupPortfolioManager();

    }

);

/* ===========================================================
   FREEZE CONFIG
=========================================================== */

Object.freeze(

    PORTFOLIO_CONFIG

);

Object.freeze(

    PortfolioInfo

);

/* ===========================================================
   EXPORT
=========================================================== */

window.PortfolioManager=Object.assign(

    window.PortfolioManager||{},

    {

        initialize:

            initializePortfolioManager,

        cleanup:

            cleanupPortfolioManager,

        version:

            ()=>PortfolioInfo.version,

        report:

            portfolioReport,

        ready:

            portfolioReady,

        app:

            PortfolioApp,

        config:

            PORTFOLIO_CONFIG,

        state:

            PortfolioState,

        info:

            PortfolioInfo

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializePortfolioManager();

    }

);

/* ===========================================================
   FINAL REPORT
=========================================================== */

portfolioLog(

"========================================"

);

portfolioLog(

"Investment Technology Indonesia"

);

portfolioLog(

"Portfolio Manager"

);

portfolioLog(

"Version:",

PortfolioInfo.version

);

portfolioLog(

"Environment:",

PortfolioInfo.environment

);

portfolioLog(

"========================================"

);

/* ===========================================================
   FEATURES
=========================================================== */

/*
✔ Portfolio Grid
✔ Masonry Layout
✔ Responsive Grid
✔ Category Filter
✔ Live Search
✔ Sorting Engine
✔ Grid/List View
✔ Portfolio Card Animation
✔ Hover Effects
✔ Tilt Effect
✔ Ripple Effect
✔ Reveal Animation
✔ Lightbox Gallery
✔ Gallery Navigation
✔ Project Detail Modal
✔ Technology Badges
✔ Website & GitHub Links
✔ Load More
✔ Pagination
✔ Infinite Scroll
✔ Lazy Loading Images
✔ Image Optimization
✔ Statistics Counter
✔ Progress Bar
✔ Category Progress
✔ Debug Utilities
✔ Report Generator
✔ Public API
✔ ES6+ Modern JavaScript
✔ Responsive
✔ Optimized
*/

/* ===========================================================
   END OF FILE
   assets/js/portfolio.js
===========================================================
*/