/*!
===========================================================
 Investment Technology Indonesia
 assets/js/faq.js
 Part 1
 Core • Config • Initialization
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION
=========================================================== */

const FAQApp={

    name:"Investment Technology Indonesia FAQ",

    version:"1.0.0",

    initialized:false,

    debug:false

};

/* ===========================================================
   CONFIG
=========================================================== */

const FAQ_CONFIG={

    selector:".faq",

    itemSelector:".faq-item",

    questionSelector:".faq-question",

    answerSelector:".faq-answer",

    searchSelector:".faq-search",

    filterSelector:".faq-filter",

    animationDuration:300,

    singleOpen:true,

    autoClose:true,

    rememberState:true,

    scrollOffset:90,

    responsive:true,

    keyboard:true

};

/* ===========================================================
   STATE
=========================================================== */

const FAQState={

    initialized:false,

    opened:null,

    search:"",

    category:"all",

    total:0,

    visible:0,

    loading:false

};

/* ===========================================================
   ELEMENTS
=========================================================== */

const FAQ={

    container:null,

    items:[],

    questions:[],

    answers:[],

    search:null,

    filters:[]

};

/* ===========================================================
   LOGGER
=========================================================== */

function faqLog(...args){

    if(!FAQApp.debug){

        return;

    }

    console.log(

        "[FAQ]",

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

    FAQ.container=$(

        FAQ_CONFIG.selector

    );

    if(!FAQ.container){

        return false;

    }

    FAQ.items=$$(

        FAQ_CONFIG.itemSelector,

        FAQ.container

    );

    FAQ.questions=$$(

        FAQ_CONFIG.questionSelector,

        FAQ.container

    );

    FAQ.answers=$$(

        FAQ_CONFIG.answerSelector,

        FAQ.container

    );

    FAQ.search=$(

        FAQ_CONFIG.searchSelector,

        FAQ.container

    );

    FAQ.filters=$$(

        FAQ_CONFIG.filterSelector,

        FAQ.container

    );

    FAQState.total=

        FAQ.items.length;

    FAQState.visible=

        FAQ.items.length;

    return true;

}

/* ===========================================================
   PREPARE
=========================================================== */

function prepareFAQItems(){

    FAQ.items.forEach((item,index)=>{

        item.dataset.index=index;

        removeClass(

            item,

            "active"

        );

    });

    FAQ.answers.forEach(answer=>{

        answer.style.display="none";

        answer.style.height="0";

        answer.style.overflow="hidden";

    });

}

/* ===========================================================
   UPDATE STATE
=========================================================== */

function updateFAQState(){

    FAQState.visible=

        FAQ.items.filter(item=>

            item.style.display!=="none"

        ).length;

}

/* ===========================================================
   SHOW ALL
=========================================================== */

function showAllFAQ(){

    FAQ.items.forEach(item=>{

        item.style.display="";

    });

    updateFAQState();

}

/* ===========================================================
   HIDE ALL
=========================================================== */

function hideAllFAQ(){

    FAQ.items.forEach(item=>{

        item.style.display="none";

    });

    updateFAQState();

}

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeFAQ(){

    if(FAQApp.initialized){

        return;

    }

    if(!initializeElements()){

        return;

    }

    FAQApp.initialized=true;

    FAQState.initialized=true;

    prepareFAQItems();

    showAllFAQ();

    faqLog(

        "FAQ Initialized"

    );

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshFAQ(){

    initializeElements();

    prepareFAQItems();

    updateFAQState();

    faqLog(

        "FAQ Refreshed"

    );

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroyFAQ(){

    FAQ.items.forEach(item=>{

        item.removeAttribute(

            "style"

        );

        removeClass(

            item,

            "active"

        );

    });

    FAQ.answers.forEach(answer=>{

        answer.removeAttribute(

            "style"

        );

    });

    FAQState.initialized=false;

    faqLog(

        "FAQ Destroyed"

    );

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeFAQ();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

window.FAQManager={

    app:FAQApp,

    config:FAQ_CONFIG,

    state:FAQState,

    faq:FAQ,

    init:initializeFAQ,

    refresh:refreshFAQ,

    destroy:destroyFAQ

};

/* ===========================================================
   END PART 1
===========================================================
*/

/*!
===========================================================
 Investment Technology Indonesia
 assets/js/faq.js
 Part 2
 Accordion Toggle • Single Open Mode
===========================================================
*/

"use strict";

/* ===========================================================
   ACCORDION
=========================================================== */

const FAQAccordion={

    single:FAQ_CONFIG.singleOpen,

    autoClose:FAQ_CONFIG.autoClose,

    initialized:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeAccordion(){

    FAQ.questions.forEach((question,index)=>{

        on(

            question,

            "click",

            ()=>{

                toggleFAQ(index);

            }

        );

    });

    FAQAccordion.initialized=true;

}

/* ===========================================================
   TOGGLE
=========================================================== */

function toggleFAQ(index){

    const item=

        FAQ.items[index];

    const answer=

        FAQ.answers[index];

    if(

        item.classList.contains(

            "active"

        )

    ){

        closeFAQ(index);

        return;

    }

    if(

        FAQAccordion.single

    ){

        closeAllFAQ();

    }

    openFAQ(index);

}

/* ===========================================================
   OPEN
=========================================================== */

function openFAQ(index){

    const item=

        FAQ.items[index];

    const answer=

        FAQ.answers[index];

    addClass(

        item,

        "active"

    );

    answer.style.display="block";

    answer.style.height=

        `${answer.scrollHeight}px`;

    FAQState.opened=index;

    saveFAQState();

}

/* ===========================================================
   CLOSE
=========================================================== */

function closeFAQ(index){

    const item=

        FAQ.items[index];

    const answer=

        FAQ.answers[index];

    removeClass(

        item,

        "active"

    );

    answer.style.height="0";

    setTimeout(()=>{

        if(

            !item.classList.contains(

                "active"

            )

        ){

            answer.style.display="none";

        }

    },FAQ_CONFIG.animationDuration);

    if(

        FAQState.opened===index

    ){

        FAQState.opened=null;

    }

    saveFAQState();

}

/* ===========================================================
   CLOSE ALL
=========================================================== */

function closeAllFAQ(){

    FAQ.items.forEach((item,index)=>{

        if(

            item.classList.contains(

                "active"

            )

        ){

            closeFAQ(index);

        }

    });

}

/* ===========================================================
   OPEN FIRST
=========================================================== */

function openFirstFAQ(){

    if(

        FAQ.items.length===0

    ){

        return;

    }

    openFAQ(0);

}

/* ===========================================================
   OPEN LAST
=========================================================== */

function openLastFAQ(){

    if(

        FAQ.items.length===0

    ){

        return;

    }

    openFAQ(

        FAQ.items.length-1

    );

}

/* ===========================================================
   REMEMBER STATE
=========================================================== */

function saveFAQState(){

    if(

        !FAQ_CONFIG.rememberState

    ){

        return;

    }

    localStorage.setItem(

        "faq-open",

        FAQState.opened

    );

}

/* ===========================================================
   RESTORE
=========================================================== */

function restoreFAQState(){

    if(

        !FAQ_CONFIG.rememberState

    ){

        return;

    }

    const index=

        Number(

            localStorage.getItem(

                "faq-open"

            )

        );

    if(

        Number.isNaN(index)

    ){

        return;

    }

    if(

        FAQ.items[index]

    ){

        openFAQ(index);

    }

}

/* ===========================================================
   NEXT
=========================================================== */

function nextFAQ(){

    let index=

        FAQState.opened??-1;

    index++;

    if(

        index>=FAQ.items.length

    ){

        index=0;

    }

    toggleFAQ(index);

}

/* ===========================================================
   PREVIOUS
=========================================================== */

function previousFAQ(){

    let index=

        FAQState.opened??

        FAQ.items.length;

    index--;

    if(

        index<0

    ){

        index=

            FAQ.items.length-1;

    }

    toggleFAQ(index);

}

/* ===========================================================
   STATUS
=========================================================== */

function accordionStatus(){

    return{

        initialized:

            FAQAccordion.initialized,

        single:

            FAQAccordion.single,

        autoClose:

            FAQAccordion.autoClose,

        opened:

            FAQState.opened

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeAccordion();

        restoreFAQState();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.FAQManager,

    {

        accordion:{

            init:

                initializeAccordion,

            open:

                openFAQ,

            close:

                closeFAQ,

            toggle:

                toggleFAQ,

            next:

                nextFAQ,

            previous:

                previousFAQ,

            closeAll:

                closeAllFAQ,

            openFirst:

                openFirstFAQ,

            openLast:

                openLastFAQ,

            status:

                accordionStatus

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
 assets/js/faq.js
 Part 3
 Multiple Open Mode • Expand All • Collapse All
===========================================================
*/

"use strict";

/* ===========================================================
   MULTIPLE OPEN MODE
=========================================================== */

const FAQMultiple={

    enabled:false,

    initialized:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeMultipleMode(){

    FAQMultiple.enabled=

        !FAQ_CONFIG.singleOpen;

    FAQMultiple.initialized=true;

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableMultipleMode(){

    FAQMultiple.enabled=true;

    FAQAccordion.single=false;

}

/* ===========================================================
   DISABLE
=========================================================== */

function disableMultipleMode(){

    FAQMultiple.enabled=false;

    FAQAccordion.single=true;

    closeAllFAQ();

}

/* ===========================================================
   EXPAND ALL
=========================================================== */

function expandAllFAQ(){

    FAQ.items.forEach((item,index)=>{

        if(

            !item.classList.contains(

                "active"

            )

        ){

            openFAQ(index);

        }

    });

}

/* ===========================================================
   COLLAPSE ALL
=========================================================== */

function collapseAllFAQ(){

    FAQ.items.forEach((item,index)=>{

        if(

            item.classList.contains(

                "active"

            )

        ){

            closeFAQ(index);

        }

    });

}

/* ===========================================================
   TOGGLE ALL
=========================================================== */

function toggleAllFAQ(){

    const opened=

        FAQ.items.filter(item=>

            item.classList.contains(

                "active"

            )

        ).length;

    if(

        opened===FAQ.items.length

    ){

        collapseAllFAQ();

    }else{

        expandAllFAQ();

    }

}

/* ===========================================================
   EXPAND CATEGORY
=========================================================== */

function expandCategory(category){

    FAQ.items.forEach((item,index)=>{

        if(

            item.dataset.category===

            category

        ){

            openFAQ(index);

        }

    });

}

/* ===========================================================
   COLLAPSE CATEGORY
=========================================================== */

function collapseCategory(category){

    FAQ.items.forEach((item,index)=>{

        if(

            item.dataset.category===

            category

        ){

            closeFAQ(index);

        }

    });

}

/* ===========================================================
   TOGGLE CATEGORY
=========================================================== */

function toggleCategory(category){

    FAQ.items.forEach((item,index)=>{

        if(

            item.dataset.category!==

            category

        ){

            return;

        }

        toggleFAQ(index);

    });

}

/* ===========================================================
   OPEN COUNT
=========================================================== */

function openedFAQCount(){

    return FAQ.items.filter(item=>

        item.classList.contains(

            "active"

        )

    ).length;

}

/* ===========================================================
   IS ALL OPEN
=========================================================== */

function allOpened(){

    return(

        openedFAQCount()===

        FAQ.items.length

    );

}

/* ===========================================================
   IS ALL CLOSED
=========================================================== */

function allClosed(){

    return(

        openedFAQCount()===0

    );

}

/* ===========================================================
   STATUS
=========================================================== */

function multipleStatus(){

    return{

        initialized:

            FAQMultiple.initialized,

        enabled:

            FAQMultiple.enabled,

        opened:

            openedFAQCount(),

        total:

            FAQ.items.length,

        allOpened:

            allOpened(),

        allClosed:

            allClosed()

    };

}

/* ===========================================================
   SHORTCUT BUTTONS
=========================================================== */

function initializeExpandButtons(){

    const expand=$(

        ".faq-expand-all",

        FAQ.container

    );

    const collapse=$(

        ".faq-collapse-all",

        FAQ.container

    );

    if(expand){

        on(

            expand,

            "click",

            expandAllFAQ

        );

    }

    if(collapse){

        on(

            collapse,

            "click",

            collapseAllFAQ

        );

    }

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeMultipleMode();

        initializeExpandButtons();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.FAQManager,

    {

        multiple:{

            init:

                initializeMultipleMode,

            enable:

                enableMultipleMode,

            disable:

                disableMultipleMode,

            expandAll:

                expandAllFAQ,

            collapseAll:

                collapseAllFAQ,

            toggleAll:

                toggleAllFAQ,

            expandCategory,

            collapseCategory,

            toggleCategory,

            status:

                multipleStatus

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
 assets/js/faq.js
 Part 4
 Search FAQ • Category Filter • Live Search
===========================================================
*/

"use strict";

/* ===========================================================
   FILTER
=========================================================== */

const FAQFilter={

    category:"all",

    keyword:"",

    total:0,

    visible:0,

    initialized:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeFAQFilter(){

    initializeCategoryFilter();

    initializeSearch();

    updateFilterCounter();

    FAQFilter.initialized=true;

}

/* ===========================================================
   CATEGORY BUTTONS
=========================================================== */

function initializeCategoryFilter(){

    FAQ.filters.forEach(button=>{

        on(

            button,

            "click",

            ()=>{

                const category=

                    button.dataset.filter||

                    "all";

                filterFAQ(category);

            }

        );

    });

}

/* ===========================================================
   FILTER
=========================================================== */

function filterFAQ(category){

    FAQFilter.category=category;

    FAQState.category=category;

    FAQ.items.forEach(item=>{

        const itemCategory=

            item.dataset.category||

            "all";

        const visible=

            category==="all" ||

            itemCategory===category;

        item.style.display=

            visible

            ? ""

            : "none";

    });

    updateActiveCategory();

    updateFilterCounter();

    updateEmptyState();

}

/* ===========================================================
   ACTIVE BUTTON
=========================================================== */

function updateActiveCategory(){

    FAQ.filters.forEach(button=>{

        removeClass(

            button,

            "active"

        );

        if(

            button.dataset.filter===

            FAQFilter.category

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

function initializeSearch(){

    if(!FAQ.search){

        return;

    }

    on(

        FAQ.search,

        "input",

        event=>{

            searchFAQ(

                event.target.value

            );

        }

    );

}

/* ===========================================================
   SEARCH ENGINE
=========================================================== */

function searchFAQ(keyword){

    keyword=

        keyword

        .trim()

        .toLowerCase();

    FAQFilter.keyword=keyword;

    FAQState.search=keyword;

    FAQ.items.forEach(item=>{

        const text=

            item.textContent

            .toLowerCase();

        const category=

            item.dataset.category||

            "all";

        const categoryMatch=

            FAQFilter.category==="all" ||

            category===FAQFilter.category;

        const keywordMatch=

            keyword==="" ||

            text.includes(keyword);

        item.style.display=

            categoryMatch && keywordMatch

            ? ""

            : "none";

    });

    updateFilterCounter();

    updateEmptyState();

}

/* ===========================================================
   RESET
=========================================================== */

function resetFAQFilter(){

    FAQFilter.category="all";

    FAQFilter.keyword="";

    FAQState.category="all";

    FAQState.search="";

    if(FAQ.search){

        FAQ.search.value="";

    }

    showAllFAQ();

    updateActiveCategory();

    updateFilterCounter();

    updateEmptyState();

}

/* ===========================================================
   COUNTER
=========================================================== */

function updateFilterCounter(){

    FAQFilter.total=

        FAQ.items.length;

    FAQFilter.visible=

        FAQ.items.filter(item=>

            item.style.display!=="none"

        ).length;

    FAQState.visible=

        FAQFilter.visible;

    const counter=$(

        ".faq-counter",

        FAQ.container

    );

    if(counter){

        counter.textContent=

            `${FAQFilter.visible} / ${FAQFilter.total}`;

    }

}

/* ===========================================================
   EMPTY STATE
=========================================================== */

function updateEmptyState(){

    const empty=$(

        ".faq-empty",

        FAQ.container

    );

    if(!empty){

        return;

    }

    empty.style.display=

        FAQFilter.visible===0

        ? "block"

        : "none";

}

/* ===========================================================
   APPLY CURRENT
=========================================================== */

function applyCurrentFilter(){

    if(

        FAQFilter.keyword

    ){

        searchFAQ(

            FAQFilter.keyword

        );

    }else{

        filterFAQ(

            FAQFilter.category

        );

    }

}

/* ===========================================================
   STATUS
=========================================================== */

function filterStatus(){

    return{

        initialized:

            FAQFilter.initialized,

        category:

            FAQFilter.category,

        keyword:

            FAQFilter.keyword,

        visible:

            FAQFilter.visible,

        total:

            FAQFilter.total

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeFAQFilter();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.FAQManager,

    {

        filter:{

            init:

                initializeFAQFilter,

            apply:

                filterFAQ,

            search:

                searchFAQ,

            reset:

                resetFAQFilter,

            refresh:

                applyCurrentFilter,

            status:

                filterStatus

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
 assets/js/faq.js
 Part 5
 Highlight Search Results • Auto Scroll • Search Navigation
===========================================================
*/

"use strict";

/* ===========================================================
   SEARCH HIGHLIGHT
=========================================================== */

const FAQHighlight={

    keyword:"",

    current:0,

    matches:[],

    initialized:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeHighlight(){

    initializeSearchHighlight();

    initializeSearchNavigation();

    FAQHighlight.initialized=true;

}

/* ===========================================================
   HIGHLIGHT
=========================================================== */

function initializeSearchHighlight(){

    if(!FAQ.search){

        return;

    }

    on(

        FAQ.search,

        "input",

        event=>{

            highlightKeyword(

                event.target.value

            );

        }

    );

}

/* ===========================================================
   APPLY
=========================================================== */

function highlightKeyword(keyword){

    FAQHighlight.keyword=

        keyword.trim();

    clearHighlights();

    FAQHighlight.matches=[];

    FAQHighlight.current=0;

    if(

        FAQHighlight.keyword===""

    ){

        return;

    }

    FAQ.items.forEach(item=>{

        highlightElement(

            item,

            FAQHighlight.keyword

        );

    });

}

/* ===========================================================
   ELEMENT
=========================================================== */

function highlightElement(

    item,

    keyword

){

    const answer=$(

        FAQ_CONFIG.answerSelector,

        item

    );

    const question=$(

        FAQ_CONFIG.questionSelector,

        item

    );

    [

        question,

        answer

    ].forEach(element=>{

        if(!element){

            return;

        }

        const original=

            element.dataset.original ||

            element.innerHTML;

        element.dataset.original=

            original;

        const regex=

            new RegExp(

                `(${escapeRegex(keyword)})`,

                "gi"

            );

        element.innerHTML=

            original.replace(

                regex,

                '<mark class="faq-highlight">$1</mark>'

            );

        $$(
            "mark.faq-highlight",
            element
        ).forEach(mark=>{

            FAQHighlight.matches.push(mark);

        });

    });

}

/* ===========================================================
   CLEAR
=========================================================== */

function clearHighlights(){

    FAQ.items.forEach(item=>{

        [

            $(
                FAQ_CONFIG.questionSelector,

                item

            ),

            $(
                FAQ_CONFIG.answerSelector,

                item

            )

        ].forEach(element=>{

            if(

                !element ||

                !element.dataset.original

            ){

                return;

            }

            element.innerHTML=

                element.dataset.original;

        });

    });

}

/* ===========================================================
   ESCAPE
=========================================================== */

function escapeRegex(text){

    return text.replace(

        /[.*+?^${}()|[\]\\]/g,

        "\\$&"

    );

}

/* ===========================================================
   NEXT RESULT
=========================================================== */

function nextSearchResult(){

    if(

        FAQHighlight.matches.length===0

    ){

        return;

    }

    FAQHighlight.current++;

    if(

        FAQHighlight.current>=

        FAQHighlight.matches.length

    ){

        FAQHighlight.current=0;

    }

    scrollToHighlight();

}

/* ===========================================================
   PREVIOUS RESULT
=========================================================== */

function previousSearchResult(){

    if(

        FAQHighlight.matches.length===0

    ){

        return;

    }

    FAQHighlight.current--;

    if(

        FAQHighlight.current<0

    ){

        FAQHighlight.current=

            FAQHighlight.matches.length-1;

    }

    scrollToHighlight();

}

/* ===========================================================
   SCROLL
=========================================================== */

function scrollToHighlight(){

    FAQHighlight.matches.forEach(mark=>{

        removeClass(

            mark,

            "active-highlight"

        );

    });

    const mark=

        FAQHighlight.matches[

            FAQHighlight.current

        ];

    if(!mark){

        return;

    }

    addClass(

        mark,

        "active-highlight"

    );

    const item=

        mark.closest(

            FAQ_CONFIG.itemSelector

        );

    if(item){

        const index=

            Number(

                item.dataset.index

            );

        openFAQ(index);

    }

    window.scrollTo({

        top:

            mark.getBoundingClientRect()

            .top+

            window.scrollY-

            FAQ_CONFIG.scrollOffset,

        behavior:"smooth"

    });

}

/* ===========================================================
   FIRST MATCH
=========================================================== */

function scrollToFirstResult(){

    if(

        FAQHighlight.matches.length===0

    ){

        return;

    }

    FAQHighlight.current=0;

    scrollToHighlight();

}

/* ===========================================================
   SEARCH NAVIGATION
=========================================================== */

function initializeSearchNavigation(){

    const next=$(

        ".faq-search-next",

        FAQ.container

    );

    const previous=$(

        ".faq-search-prev",

        FAQ.container

    );

    if(next){

        on(

            next,

            "click",

            nextSearchResult

        );

    }

    if(previous){

        on(

            previous,

            "click",

            previousSearchResult

        );

    }

}

/* ===========================================================
   STATUS
=========================================================== */

function highlightStatus(){

    return{

        initialized:

            FAQHighlight.initialized,

        keyword:

            FAQHighlight.keyword,

        current:

            FAQHighlight.current+1,

        matches:

            FAQHighlight.matches.length

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeHighlight();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.FAQManager,

    {

        highlight:{

            init:

                initializeHighlight,

            search:

                highlightKeyword,

            clear:

                clearHighlights,

            next:

                nextSearchResult,

            previous:

                previousSearchResult,

            first:

                scrollToFirstResult,

            status:

                highlightStatus

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
 assets/js/faq.js
 Part 6
 URL Hash • Deep Linking • Navigation
===========================================================
*/

"use strict";

/* ===========================================================
   DEEP LINK
=========================================================== */

const FAQNavigation={

    hashPrefix:"#faq-",

    currentHash:"",

    initialized:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeFAQNavigation(){

    initializeHashNavigation();

    initializeHashChange();

    initializePermalinkButtons();

    FAQNavigation.initialized=true;

}

/* ===========================================================
   HASH
=========================================================== */

function initializeHashNavigation(){

    const hash=

        window.location.hash;

    if(

        !hash ||

        !hash.startsWith(

            FAQNavigation.hashPrefix

        )

    ){

        return;

    }

    const index=

        Number(

            hash.replace(

                FAQNavigation.hashPrefix,

                ""

            )

        );

    if(

        Number.isNaN(index)

    ){

        return;

    }

    if(

        FAQ.items[index]

    ){

        openFAQ(index);

        scrollToFAQ(index);

    }

}

/* ===========================================================
   HASH CHANGE
=========================================================== */

function initializeHashChange(){

    window.addEventListener(

        "hashchange",

        ()=>{

            initializeHashNavigation();

        }

    );

}

/* ===========================================================
   UPDATE HASH
=========================================================== */

function updateFAQHash(index){

    FAQNavigation.currentHash=

        `${FAQNavigation.hashPrefix}${index}`;

    history.replaceState(

        null,

        "",

        FAQNavigation.currentHash

    );

}

/* ===========================================================
   CLEAR HASH
=========================================================== */

function clearFAQHash(){

    FAQNavigation.currentHash="";

    history.replaceState(

        null,

        "",

        window.location.pathname+

        window.location.search

    );

}

/* ===========================================================
   SCROLL
=========================================================== */

function scrollToFAQ(index){

    const item=

        FAQ.items[index];

    if(!item){

        return;

    }

    window.scrollTo({

        top:

            item.getBoundingClientRect()

            .top+

            window.scrollY-

            FAQ_CONFIG.scrollOffset,

        behavior:"smooth"

    });

}

/* ===========================================================
   GO TO
=========================================================== */

function goToFAQ(index){

    if(

        index<0 ||

        index>=FAQ.items.length

    ){

        return;

    }

    openFAQ(index);

    updateFAQHash(index);

    scrollToFAQ(index);

}

/* ===========================================================
   NEXT
=========================================================== */

function goToNextFAQ(){

    let index=

        FAQState.opened??

        -1;

    index++;

    if(

        index>=FAQ.items.length

    ){

        index=0;

    }

    goToFAQ(index);

}

/* ===========================================================
   PREVIOUS
=========================================================== */

function goToPreviousFAQ(){

    let index=

        FAQState.opened??

        FAQ.items.length;

    index--;

    if(

        index<0

    ){

        index=

            FAQ.items.length-1;

    }

    goToFAQ(index);

}

/* ===========================================================
   PERMALINK
=========================================================== */

function initializePermalinkButtons(){

    FAQ.items.forEach((item,index)=>{

        const button=

            $(".faq-link",item);

        if(!button){

            return;

        }

        on(

            button,

            "click",

            event=>{

                event.preventDefault();

                updateFAQHash(index);

                navigator.clipboard

                ?.writeText(

                    window.location.href

                );

            }

        );

    });

}

/* ===========================================================
   SHARE
=========================================================== */

async function shareFAQ(index){

    const url=

        `${window.location.origin}${

            window.location.pathname

        }${FAQNavigation.hashPrefix}${index}`;

    if(

        navigator.share

    ){

        await navigator.share({

            title:

                document.title,

            url

        });

        return;

    }

    await navigator.clipboard

        ?.writeText(url);

}

/* ===========================================================
   STATUS
=========================================================== */

function navigationStatus(){

    return{

        initialized:

            FAQNavigation.initialized,

        hash:

            FAQNavigation.currentHash,

        opened:

            FAQState.opened

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeFAQNavigation();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.FAQManager,

    {

        navigation:{

            init:

                initializeFAQNavigation,

            goTo:

                goToFAQ,

            next:

                goToNextFAQ,

            previous:

                goToPreviousFAQ,

            scroll:

                scrollToFAQ,

            updateHash:

                updateFAQHash,

            clearHash:

                clearFAQHash,

            share:

                shareFAQ,

            status:

                navigationStatus

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
 assets/js/faq.js
 Part 7
 Keyboard Accessibility • ARIA Support • Focus Navigation
===========================================================
*/

"use strict";

/* ===========================================================
   ACCESSIBILITY
=========================================================== */

const FAQAccessibility={

    keyboard:FAQ_CONFIG.keyboard,

    initialized:false,

    focused:0

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeAccessibility(){

    initializeARIA();

    initializeKeyboardNavigation();

    initializeFocusManagement();

    FAQAccessibility.initialized=true;

}

/* ===========================================================
   ARIA
=========================================================== */

function initializeARIA(){

    FAQ.questions.forEach((question,index)=>{

        const answer=

            FAQ.answers[index];

        question.setAttribute(

            "role",

            "button"

        );

        question.setAttribute(

            "tabindex",

            "0"

        );

        question.setAttribute(

            "aria-expanded",

            "false"

        );

        question.setAttribute(

            "aria-controls",

            `faq-answer-${index}`

        );

        answer.setAttribute(

            "id",

            `faq-answer-${index}`

        );

        answer.setAttribute(

            "role",

            "region"

        );

        answer.setAttribute(

            "aria-hidden",

            "true"

        );

    });

}

/* ===========================================================
   UPDATE ARIA
=========================================================== */

function updateARIA(index,isOpen){

    const question=

        FAQ.questions[index];

    const answer=

        FAQ.answers[index];

    if(!question||!answer){

        return;

    }

    question.setAttribute(

        "aria-expanded",

        isOpen

            ? "true"

            : "false"

    );

    answer.setAttribute(

        "aria-hidden",

        isOpen

            ? "false"

            : "true"

    );

}

/* ===========================================================
   KEYBOARD
=========================================================== */

function initializeKeyboardNavigation(){

    if(

        !FAQAccessibility.keyboard

    ){

        return;

    }

    FAQ.questions.forEach((question,index)=>{

        on(

            question,

            "keydown",

            event=>{

                handleKeyboard(

                    event,

                    index

                );

            }

        );

    });

}

/* ===========================================================
   HANDLE
=========================================================== */

function handleKeyboard(

    event,

    index

){

    switch(event.key){

        case "Enter":

        case " ":

            event.preventDefault();

            toggleFAQ(index);

            break;

        case "ArrowDown":

            event.preventDefault();

            focusNext(index);

            break;

        case "ArrowUp":

            event.preventDefault();

            focusPrevious(index);

            break;

        case "Home":

            event.preventDefault();

            focusFirst();

            break;

        case "End":

            event.preventDefault();

            focusLast();

            break;

    }

}

/* ===========================================================
   FOCUS
=========================================================== */

function initializeFocusManagement(){

    FAQ.questions.forEach((question,index)=>{

        on(

            question,

            "focus",

            ()=>{

                FAQAccessibility.focused=index;

            }

        );

    });

}

/* ===========================================================
   NEXT
=========================================================== */

function focusNext(index){

    index++;

    if(

        index>=FAQ.questions.length

    ){

        index=0;

    }

    FAQ.questions[index].focus();

}

/* ===========================================================
   PREVIOUS
=========================================================== */

function focusPrevious(index){

    index--;

    if(index<0){

        index=

            FAQ.questions.length-1;

    }

    FAQ.questions[index].focus();

}

/* ===========================================================
   FIRST
=========================================================== */

function focusFirst(){

    FAQ.questions[0]?.focus();

}

/* ===========================================================
   LAST
=========================================================== */

function focusLast(){

    FAQ.questions[
        FAQ.questions.length-1
    ]?.focus();

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableKeyboardNavigation(){

    FAQAccessibility.keyboard=true;

}

/* ===========================================================
   DISABLE
=========================================================== */

function disableKeyboardNavigation(){

    FAQAccessibility.keyboard=false;

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshAccessibility(){

    initializeARIA();

    initializeKeyboardNavigation();

}

/* ===========================================================
   STATUS
=========================================================== */

function accessibilityStatus(){

    return{

        initialized:

            FAQAccessibility.initialized,

        keyboard:

            FAQAccessibility.keyboard,

        focused:

            FAQAccessibility.focused

    };

}

/* ===========================================================
   EVENTS
=========================================================== */

document.addEventListener(

    "faq:open",

    event=>{

        updateARIA(

            event.detail.index,

            true

        );

    }

);

document.addEventListener(

    "faq:close",

    event=>{

        updateARIA(

            event.detail.index,

            false

        );

    }

);

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

    window.FAQManager,

    {

        accessibility:{

            init:

                initializeAccessibility,

            refresh:

                refreshAccessibility,

            update:

                updateARIA,

            enable:

                enableKeyboardNavigation,

            disable:

                disableKeyboardNavigation,

            focusFirst,

            focusLast,

            status:

                accessibilityStatus

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
 assets/js/faq.js
 Part 8
 Animation Engine • Slide • Fade • Height Transition
===========================================================
*/

"use strict";

/* ===========================================================
   ANIMATION ENGINE
=========================================================== */

const FAQAnimation={

    effect:"slide",

    duration:FAQ_CONFIG.animationDuration,

    easing:"ease",

    initialized:false,

    supported:[

        "slide",

        "fade",

        "height",

        "scale"

    ]

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeAnimation(){

    applyAnimationDuration();

    applyAnimationEffect();

    FAQAnimation.initialized=true;

}

/* ===========================================================
   DURATION
=========================================================== */

function applyAnimationDuration(){

    FAQ.answers.forEach(answer=>{

        answer.style.transition=

            `all ${FAQAnimation.duration}ms ${FAQAnimation.easing}`;

    });

}

/* ===========================================================
   EFFECT
=========================================================== */

function applyAnimationEffect(){

    FAQ.items.forEach(item=>{

        FAQAnimation.supported.forEach(effect=>{

            removeClass(

                item,

                `faq-effect-${effect}`

            );

        });

        addClass(

            item,

            `faq-effect-${FAQAnimation.effect}`

        );

    });

}

/* ===========================================================
   CHANGE EFFECT
=========================================================== */

function setAnimationEffect(effect){

    if(

        !FAQAnimation.supported.includes(effect)

    ){

        return;

    }

    FAQAnimation.effect=effect;

    applyAnimationEffect();

}

/* ===========================================================
   OPEN ANIMATION
=========================================================== */

function animateOpen(answer){

    switch(

        FAQAnimation.effect

    ){

        case "fade":

            animateFadeOpen(answer);

            break;

        case "scale":

            animateScaleOpen(answer);

            break;

        case "height":

            animateHeightOpen(answer);

            break;

        default:

            animateSlideOpen(answer);

            break;

    }

}

/* ===========================================================
   CLOSE ANIMATION
=========================================================== */

function animateClose(answer){

    switch(

        FAQAnimation.effect

    ){

        case "fade":

            animateFadeClose(answer);

            break;

        case "scale":

            animateScaleClose(answer);

            break;

        case "height":

            animateHeightClose(answer);

            break;

        default:

            animateSlideClose(answer);

            break;

    }

}

/* ===========================================================
   SLIDE
=========================================================== */

function animateSlideOpen(answer){

    answer.style.display="block";

    answer.style.opacity="1";

    answer.style.height=

        `${answer.scrollHeight}px`;

}

function animateSlideClose(answer){

    answer.style.height="0";

    answer.style.opacity="0";

}

/* ===========================================================
   FADE
=========================================================== */

function animateFadeOpen(answer){

    answer.style.display="block";

    answer.style.opacity="0";

    answer.style.height="auto";

    requestAnimationFrame(()=>{

        answer.style.opacity="1";

    });

}

function animateFadeClose(answer){

    answer.style.opacity="0";

    setTimeout(()=>{

        answer.style.display="none";

    },FAQAnimation.duration);

}

/* ===========================================================
   HEIGHT
=========================================================== */

function animateHeightOpen(answer){

    answer.style.display="block";

    answer.style.height="0";

    requestAnimationFrame(()=>{

        answer.style.height=

            `${answer.scrollHeight}px`;

    });

}

function animateHeightClose(answer){

    answer.style.height="0";

}

/* ===========================================================
   SCALE
=========================================================== */

function animateScaleOpen(answer){

    answer.style.display="block";

    answer.style.transform=

        "scale(.95)";

    answer.style.opacity="0";

    requestAnimationFrame(()=>{

        answer.style.transform=

            "scale(1)";

        answer.style.opacity="1";

    });

}

function animateScaleClose(answer){

    answer.style.transform=

        "scale(.95)";

    answer.style.opacity="0";

    setTimeout(()=>{

        answer.style.display="none";

    },FAQAnimation.duration);

}

/* ===========================================================
   SPEED
=========================================================== */

function setAnimationSpeed(speed){

    FAQAnimation.duration=speed;

    applyAnimationDuration();

}

/* ===========================================================
   RESET
=========================================================== */

function resetAnimation(){

    FAQ.answers.forEach(answer=>{

        answer.style.transition="";

        answer.style.transform="";

        answer.style.opacity="";

        answer.style.height="";

    });

}

/* ===========================================================
   STATUS
=========================================================== */

function animationStatus(){

    return{

        initialized:

            FAQAnimation.initialized,

        effect:

            FAQAnimation.effect,

        duration:

            FAQAnimation.duration,

        easing:

            FAQAnimation.easing

    };

}

/* ===========================================================
   INITIALIZE
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

    window.FAQManager,

    {

        animation:{

            init:

                initializeAnimation,

            open:

                animateOpen,

            close:

                animateClose,

            effect:

                setAnimationEffect,

            speed:

                setAnimationSpeed,

            reset:

                resetAnimation,

            status:

                animationStatus

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
 assets/js/faq.js
 Part 9
 Lazy Loading • Performance • Responsive Optimization
===========================================================
*/

"use strict";

/* ===========================================================
   PERFORMANCE
=========================================================== */

const FAQLazy={

    observer:null,

    initialized:false,

    loaded:0,

    total:0,

    enabled:true

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeLazyFAQ(){

    if(

        !("IntersectionObserver" in window)

    ){

        revealAllFAQ();

        return;

    }

    createFAQObserver();

    observeFAQItems();

    optimizeFAQPerformance();

    FAQLazy.initialized=true;

}

/* ===========================================================
   OBSERVER
=========================================================== */

function createFAQObserver(){

    FAQLazy.observer=

        new IntersectionObserver(

            handleFAQIntersection,

            {

                root:null,

                rootMargin:"100px",

                threshold:0.15

            }

        );

}

/* ===========================================================
   OBSERVE
=========================================================== */

function observeFAQItems(){

    FAQLazy.total=

        FAQ.items.length;

    FAQ.items.forEach(item=>{

        FAQLazy.observer.observe(item);

    });

}

/* ===========================================================
   CALLBACK
=========================================================== */

function handleFAQIntersection(entries){

    entries.forEach(entry=>{

        if(

            !entry.isIntersecting

        ){

            return;

        }

        revealFAQItem(

            entry.target

        );

        FAQLazy.observer.unobserve(

            entry.target

        );

    });

}

/* ===========================================================
   REVEAL
=========================================================== */

function revealFAQItem(item){

    addClass(

        item,

        "faq-visible"

    );

    item.style.opacity="1";

    item.style.transform=

        "translateY(0)";

    FAQLazy.loaded++;

}

/* ===========================================================
   REVEAL ALL
=========================================================== */

function revealAllFAQ(){

    FAQ.items.forEach(item=>{

        revealFAQItem(item);

    });

}

/* ===========================================================
   RESPONSIVE
=========================================================== */

function optimizeResponsiveFAQ(){

    const width=

        window.innerWidth;

    if(width<768){

        FAQ.container?.classList.add(

            "faq-mobile"

        );

    }else{

        FAQ.container?.classList.remove(

            "faq-mobile"

        );

    }

}

/* ===========================================================
   PERFORMANCE
=========================================================== */

function optimizeFAQPerformance(){

    FAQ.questions.forEach(button=>{

        button.setAttribute(

            "draggable",

            "false"

        );

    });

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshLazyFAQ(){

    FAQLazy.observer?.disconnect();

    initializeLazyFAQ();

}

/* ===========================================================
   ENABLE
=========================================================== */

function enableLazyFAQ(){

    FAQLazy.enabled=true;

    refreshLazyFAQ();

}

/* ===========================================================
   DISABLE
=========================================================== */

function disableLazyFAQ(){

    FAQLazy.enabled=false;

    revealAllFAQ();

}

/* ===========================================================
   RESIZE
=========================================================== */

let faqResizeTimer=null;

window.addEventListener(

    "resize",

    ()=>{

        clearTimeout(

            faqResizeTimer

        );

        faqResizeTimer=

        setTimeout(()=>{

            optimizeResponsiveFAQ();

        },150);

    },

    {

        passive:true

    }

);

/* ===========================================================
   VISIBILITY
=========================================================== */

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(

            !document.hidden

        ){

            optimizeFAQPerformance();

        }

    }

);

/* ===========================================================
   STATUS
=========================================================== */

function lazyFAQStatus(){

    return{

        initialized:

            FAQLazy.initialized,

        enabled:

            FAQLazy.enabled,

        loaded:

            FAQLazy.loaded,

        total:

            FAQLazy.total

    };

}

/* ===========================================================
   INITIALIZE
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeLazyFAQ();

        optimizeResponsiveFAQ();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.FAQManager,

    {

        lazy:{

            init:

                initializeLazyFAQ,

            refresh:

                refreshLazyFAQ,

            enable:

                enableLazyFAQ,

            disable:

                disableLazyFAQ,

            optimize:

                optimizeFAQPerformance,

            status:

                lazyFAQStatus

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
 assets/js/faq.js
 Part 10
 Statistics • Analytics • Progress • Insights
===========================================================
*/

"use strict";

/* ===========================================================
   FAQ STATISTICS
=========================================================== */

const FAQStatistics={

    total:0,

    visible:0,

    opened:0,

    categories:0,

    searched:0,

    initialized:false

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeFAQStatistics(){

    calculateFAQStatistics();

    updateStatisticsUI();

    initializeStatisticsObserver();

    FAQStatistics.initialized=true;

}

/* ===========================================================
   CALCULATE
=========================================================== */

function calculateFAQStatistics(){

    FAQStatistics.total=

        FAQ.items.length;

    FAQStatistics.visible=

        FAQ.items.filter(item=>

            item.style.display!=="none"

        ).length;

    FAQStatistics.opened=

        FAQ.items.filter(item=>

            item.classList.contains(

                "active"

            )

        ).length;

    FAQStatistics.categories=

        new Set(

            FAQ.items.map(item=>

                item.dataset.category||

                "General"

            )

        ).size;

    FAQStatistics.searched=

        FAQFilter.keyword

            ? FAQStatistics.visible

            : 0;

}

/* ===========================================================
   UPDATE UI
=========================================================== */

function updateStatisticsUI(){

    updateStatistic(

        ".faq-total",

        FAQStatistics.total

    );

    updateStatistic(

        ".faq-visible",

        FAQStatistics.visible

    );

    updateStatistic(

        ".faq-opened",

        FAQStatistics.opened

    );

    updateStatistic(

        ".faq-categories",

        FAQStatistics.categories

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

        FAQ.container

    );

    if(!element){

        return;

    }

    animateCounter(

        element,

        Number(value)

    );

}

/* ===========================================================
   COUNTER
=========================================================== */

function animateCounter(

    element,

    target

){

    const duration=1000;

    const start=0;

    const startTime=

        performance.now();

    function frame(now){

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

                frame

            );

        }

    }

    requestAnimationFrame(frame);

}

/* ===========================================================
   PROGRESS BAR
=========================================================== */

function updateFAQProgress(){

    const progress=$(

        ".faq-progress-bar",

        FAQ.container

    );

    if(!progress){

        return;

    }

    const percent=

        FAQStatistics.total===0

        ?0

        :(FAQStatistics.visible/

        FAQStatistics.total)*100;

    progress.style.width=

        `${percent}%`;

}

/* ===========================================================
   CATEGORY PROGRESS
=========================================================== */

function updateCategoryStatistics(){

    $$(
        ".faq-category-progress",

        FAQ.container

    ).forEach(bar=>{

        const category=

            bar.dataset.category;

        const total=

            FAQ.items.filter(item=>

                item.dataset.category===

                category

            ).length;

        const percent=

            FAQStatistics.total===0

            ?0

            :(total/

            FAQStatistics.total)*100;

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

                        refreshFAQStatistics();

                    }

                });

            },

            {

                threshold:.2

            }

        );

    observer.observe(

        FAQ.container

    );

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshFAQStatistics(){

    calculateFAQStatistics();

    updateStatisticsUI();

    updateFAQProgress();

    updateCategoryStatistics();

}

/* ===========================================================
   EXPORT
=========================================================== */

function exportFAQStatistics(){

    return{

        total:

            FAQStatistics.total,

        visible:

            FAQStatistics.visible,

        opened:

            FAQStatistics.opened,

        categories:

            FAQStatistics.categories,

        searched:

            FAQStatistics.searched,

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

            FAQStatistics.initialized,

        total:

            FAQStatistics.total,

        visible:

            FAQStatistics.visible,

        opened:

            FAQStatistics.opened,

        categories:

            FAQStatistics.categories,

        searched:

            FAQStatistics.searched

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeFAQStatistics();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.FAQManager,

    {

        statistics:{

            init:

                initializeFAQStatistics,

            refresh:

                refreshFAQStatistics,

            progress:

                updateFAQProgress,

            category:

                updateCategoryStatistics,

            export:

                exportFAQStatistics,

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
 assets/js/faq.js
 Part 11
 Utilities • Debug • Report • Public API
===========================================================
*/

"use strict";

/* ===========================================================
   INFORMATION
=========================================================== */

const FAQInfo={

    name:"FAQ Manager",

    version:"1.0.0",

    author:"Investment Technology Indonesia",

    environment:"production"

};

/* ===========================================================
   DEBUG
=========================================================== */

function enableFAQDebug(){

    FAQApp.debug=true;

    faqLog(

        "Debug Enabled"

    );

}

function disableFAQDebug(){

    FAQApp.debug=false;

}

function faqDebug(...args){

    if(!FAQApp.debug){

        return;

    }

    console.log(

        "[FAQ Debug]",

        ...args

    );

}

function faqWarn(message){

    console.warn(

        "[FAQ Warning]",

        message

    );

}

function faqError(message){

    console.error(

        "[FAQ Error]",

        message

    );

}

/* ===========================================================
   UNIQUE ID
=========================================================== */

function faqID(){

    if(window.crypto?.randomUUID){

        return crypto.randomUUID();

    }

    return "faq-"+

        Date.now()+"-"+

        Math.random()

        .toString(36)

        .substring(2,10);

}

/* ===========================================================
   WAIT
=========================================================== */

function faqWait(milliseconds=300){

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

function faqTimestamp(){

    return new Date()

        .toLocaleString(

            "id-ID"

        );

}

/* ===========================================================
   REPORT
=========================================================== */

function faqReport(){

    return{

        info:FAQInfo,

        app:FAQApp,

        config:FAQ_CONFIG,

        state:FAQState,

        accordion:

            accordionStatus?.(),

        multiple:

            multipleStatus?.(),

        filter:

            filterStatus?.(),

        highlight:

            highlightStatus?.(),

        navigation:

            navigationStatus?.(),

        accessibility:

            accessibilityStatus?.(),

        animation:

            animationStatus?.(),

        lazy:

            lazyFAQStatus?.(),

        statistics:

            statisticsStatus?.(),

        timestamp:

            faqTimestamp()

    };

}

/* ===========================================================
   PRINT REPORT
=========================================================== */

function printFAQReport(){

    console.table(

        faqReport()

    );

}

/* ===========================================================
   RESET
=========================================================== */

function resetFAQManager(){

    collapseAllFAQ?.();

    resetFAQFilter?.();

    clearHighlights?.();

    refreshFAQStatistics?.();

    refreshLazyFAQ?.();

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroyFAQManager(){

    destroyFAQ?.();

    FAQLazy.observer?.disconnect();

    faqLog(

        "FAQ Manager Destroyed"

    );

}

/* ===========================================================
   RESTART
=========================================================== */

function restartFAQManager(){

    destroyFAQManager();

    initializeFAQ?.();

    initializeAccordion?.();

    initializeMultipleMode?.();

    initializeFAQFilter?.();

    initializeHighlight?.();

    initializeFAQNavigation?.();

    initializeAccessibility?.();

    initializeAnimation?.();

    initializeLazyFAQ?.();

    initializeFAQStatistics?.();

}

/* ===========================================================
   READY
=========================================================== */

function faqReady(){

    return{

        initialized:

            FAQApp.initialized,

        total:

            FAQState.total,

        visible:

            FAQState.visible,

        opened:

            FAQState.opened,

        category:

            FAQState.category,

        search:

            FAQState.search

    };

}

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.FAQManager,

    {

        info:FAQInfo,

        report:faqReport,

        printReport:printFAQReport,

        ready:faqReady,

        reset:resetFAQManager,

        restart:restartFAQManager,

        destroy:destroyFAQManager,

        enableDebug:enableFAQDebug,

        disableDebug:disableFAQDebug,

        debug:faqDebug,

        warn:faqWarn,

        error:faqError,

        wait:faqWait,

        debounce,

        throttle,

        clamp,

        faqID,

        formatMilliseconds,

        formatPercent,

        timestamp:faqTimestamp

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        faqDebug(

            "FAQ Utilities Ready"

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
 assets/js/faq.js
 Part 12
 Final Initialization • Cleanup • Export • End of File
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION INITIALIZER
=========================================================== */

function initializeFAQManager(){

    if(FAQApp.initialized){

        faqLog(

            "FAQ Manager already initialized."

        );

        return;

    }

    FAQApp.initialized=true;

    faqLog(

        "Initializing FAQ Manager..."

    );

    initializeFAQ?.();

    initializeAccordion?.();

    initializeMultipleMode?.();

    initializeFAQFilter?.();

    initializeHighlight?.();

    initializeFAQNavigation?.();

    initializeAccessibility?.();

    initializeAnimation?.();

    initializeLazyFAQ?.();

    initializeFAQStatistics?.();

    faqLog(

        "FAQ Manager Ready."

    );

}

/* ===========================================================
   GLOBAL EVENTS
=========================================================== */

window.addEventListener(

    "load",

    ()=>{

        refreshFAQ?.();

        refreshFAQStatistics?.();

        faqLog(

            "Window Loaded"

        );

    }

);

window.addEventListener(

    "pageshow",

    ()=>{

        refreshFAQ?.();

        refreshLazyFAQ?.();

    }

);

window.addEventListener(

    "focus",

    ()=>{

        refreshFAQStatistics?.();

    }

);

window.addEventListener(

    "blur",

    ()=>{

        faqLog(

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

        faqError?.(

            event.message

        );

    }

);

window.addEventListener(

    "unhandledrejection",

    event=>{

        faqError?.(

            event.reason

        );

    }

);

/* ===========================================================
   CLEANUP
=========================================================== */

function cleanupFAQManager(){

    FAQLazy.observer?.disconnect();

    faqLog(

        "FAQ Cleanup Complete"

    );

}

/* ===========================================================
   BEFORE UNLOAD
=========================================================== */

window.addEventListener(

    "beforeunload",

    ()=>{

        cleanupFAQManager();

    }

);

/* ===========================================================
   FREEZE CONFIG
=========================================================== */

Object.freeze(

    FAQ_CONFIG

);

Object.freeze(

    FAQInfo

);

/* ===========================================================
   EXPORT
=========================================================== */

window.FAQManager=Object.assign(

    window.FAQManager||{},

    {

        initialize:

            initializeFAQManager,

        cleanup:

            cleanupFAQManager,

        version:

            ()=>FAQInfo.version,

        report:

            faqReport,

        ready:

            faqReady,

        app:

            FAQApp,

        config:

            FAQ_CONFIG,

        state:

            FAQState,

        info:

            FAQInfo

    }

);

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeFAQManager();

    }

);

/* ===========================================================
   FINAL REPORT
=========================================================== */

faqLog(

"========================================"

);

faqLog(

"Investment Technology Indonesia"

);

faqLog(

"FAQ Manager"

);

faqLog(

"Version:",

FAQInfo.version

);

faqLog(

"Environment:",

FAQInfo.environment

);

faqLog(

"========================================"

);

/* ===========================================================
   FEATURES
=========================================================== */

/*
✔ FAQ Accordion
✔ Single Open Mode
✔ Multiple Open Mode
✔ Expand All
✔ Collapse All
✔ Category Filter
✔ Live Search
✔ Search Highlight
✔ Auto Scroll Result
✔ URL Hash Navigation
✔ Deep Linking
✔ Share FAQ Link
✔ Keyboard Navigation
✔ ARIA Accessibility
✔ Slide Animation
✔ Fade Animation
✔ Height Animation
✔ Scale Animation
✔ Lazy Loading
✔ Responsive Layout
✔ Performance Optimization
✔ FAQ Statistics
✔ Analytics
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
   assets/js/faq.js
===========================================================
*/

