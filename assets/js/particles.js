/*!
===========================================================
 Investment Technology Indonesia
 assets/js/particles.js
 Part 1
 Core • Config • Initialization
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION
=========================================================== */

const ParticlesApp={

    name:"Investment Technology Indonesia Particles",

    version:"1.0.0",

    initialized:false,

    running:false,

    debug:false

};

/* ===========================================================
   CONFIG
=========================================================== */

const PARTICLES_CONFIG={

    selector:"#particles",

    autoStart:true,

    fps:60,

    retina:true,

    background:"transparent",

    particleCount:120,

    minRadius:1,

    maxRadius:4,

    speed:1,

    opacity:0.6,

    color:"#ffffff",

    connectDistance:120,

    mouseRadius:150,

    resize:true,

    pauseOnHidden:true

};

/* ===========================================================
   STATE
=========================================================== */

const ParticlesState={

    initialized:false,

    running:false,

    width:0,

    height:0,

    pixelRatio:1,

    mouseX:0,

    mouseY:0,

    mouseActive:false,

    frame:0,

    particles:[]

};

/* ===========================================================
   ELEMENTS
=========================================================== */

const Particles={

    canvas:null,

    context:null,

    animation:null

};

/* ===========================================================
   LOGGER
=========================================================== */

function particlesLog(...args){

    if(!ParticlesApp.debug){

        return;

    }

    console.log(

        "[Particles]",

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

function random(min,max){

    return Math.random()*

        (max-min)+min;

}

function clamp(value,min,max){

    return Math.min(

        Math.max(value,min),

        max

    );

}

/* ===========================================================
   INITIALIZE CANVAS
=========================================================== */

function initializeCanvas(){

    Particles.canvas=$(

        PARTICLES_CONFIG.selector

    );

    if(!Particles.canvas){

        particlesLog(

            "Canvas not found."

        );

        return false;

    }

    Particles.context=

        Particles.canvas.getContext(

            "2d",

            {

                alpha:true

            }

        );

    return true;

}

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeParticles(){

    if(

        ParticlesApp.initialized

    ){

        return;

    }

    if(

        !initializeCanvas()

    ){

        return;

    }

    ParticlesState.initialized=true;

    ParticlesApp.initialized=true;

    particlesLog(

        "Particles Initialized"

    );

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshParticles(){

    initializeCanvas();

    particlesLog(

        "Particles Refreshed"

    );

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroyParticles(){

    cancelAnimationFrame(

        Particles.animation

    );

    ParticlesState.running=false;

    ParticlesApp.running=false;

    ParticlesState.particles=[];

    particlesLog(

        "Particles Destroyed"

    );

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeParticles();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

window.ParticlesManager={

    app:ParticlesApp,

    config:PARTICLES_CONFIG,

    state:ParticlesState,

    elements:Particles,

    init:initializeParticles,

    refresh:refreshParticles,

    destroy:destroyParticles

};

/* ===========================================================
   END PART 1
===========================================================
*/

/*!
===========================================================
 Investment Technology Indonesia
 assets/js/particles.js
 Part 2
 Canvas Manager • Resize • DPI • Clear Canvas
===========================================================
*/

"use strict";

/* ===========================================================
   CANVAS ENGINE
=========================================================== */

const CanvasEngine={

    initialized:false,

    width:0,

    height:0,

    ratio:1,

    centerX:0,

    centerY:0

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeCanvasEngine(){

    updateCanvasSize();

    initializeResize();

    initializeVisibility();

    CanvasEngine.initialized=true;

}

/* ===========================================================
   CANVAS SIZE
=========================================================== */

function updateCanvasSize(){

    if(

        !Particles.canvas ||

        !Particles.context

    ){

        return;

    }

    CanvasEngine.ratio=

        PARTICLES_CONFIG.retina

        ?Math.min(

            window.devicePixelRatio||1,

            2

        )

        :1;

    CanvasEngine.width=

        window.innerWidth;

    CanvasEngine.height=

        window.innerHeight;

    CanvasEngine.centerX=

        CanvasEngine.width/2;

    CanvasEngine.centerY=

        CanvasEngine.height/2;

    Particles.canvas.width=

        CanvasEngine.width*

        CanvasEngine.ratio;

    Particles.canvas.height=

        CanvasEngine.height*

        CanvasEngine.ratio;

    Particles.canvas.style.width=

        `${CanvasEngine.width}px`;

    Particles.canvas.style.height=

        `${CanvasEngine.height}px`;

    Particles.context.setTransform(

        1,

        0,

        0,

        1,

        0,

        0

    );

    Particles.context.scale(

        CanvasEngine.ratio,

        CanvasEngine.ratio

    );

    ParticlesState.width=

        CanvasEngine.width;

    ParticlesState.height=

        CanvasEngine.height;

    ParticlesState.pixelRatio=

        CanvasEngine.ratio;

}

/* ===========================================================
   CLEAR
=========================================================== */

function clearCanvas(){

    if(

        !Particles.context

    ){

        return;

    }

    Particles.context.clearRect(

        0,

        0,

        CanvasEngine.width,

        CanvasEngine.height

    );

}

/* ===========================================================
   BACKGROUND
=========================================================== */

function fillBackground(){

    if(

        !Particles.context ||

        PARTICLES_CONFIG.background==="transparent"

    ){

        return;

    }

    Particles.context.fillStyle=

        PARTICLES_CONFIG.background;

    Particles.context.fillRect(

        0,

        0,

        CanvasEngine.width,

        CanvasEngine.height

    );

}

/* ===========================================================
   RESIZE
=========================================================== */

function initializeResize(){

    if(

        !PARTICLES_CONFIG.resize

    ){

        return;

    }

    window.addEventListener(

        "resize",

        debounceResize,

        {

            passive:true

        }

    );

}

let resizeTimer=null;

function debounceResize(){

    clearTimeout(

        resizeTimer

    );

    resizeTimer=setTimeout(()=>{

        updateCanvasSize();

        regenerateParticles?.();

    },150);

}

/* ===========================================================
   VISIBILITY
=========================================================== */

function initializeVisibility(){

    if(

        !PARTICLES_CONFIG.pauseOnHidden

    ){

        return;

    }

    document.addEventListener(

        "visibilitychange",

        ()=>{

            if(document.hidden){

                pauseParticles?.();

            }else{

                resumeParticles?.();

            }

        }

    );

}

/* ===========================================================
   DPI
=========================================================== */

function devicePixelRatio(){

    return CanvasEngine.ratio;

}

/* ===========================================================
   CENTER
=========================================================== */

function canvasCenter(){

    return{

        x:CanvasEngine.centerX,

        y:CanvasEngine.centerY

    };

}

/* ===========================================================
   STATUS
=========================================================== */

function canvasStatus(){

    return{

        initialized:

            CanvasEngine.initialized,

        width:

            CanvasEngine.width,

        height:

            CanvasEngine.height,

        ratio:

            CanvasEngine.ratio,

        center:

            canvasCenter()

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeCanvasEngine();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ParticlesManager,

    {

        canvas:{

            init:

                initializeCanvasEngine,

            resize:

                updateCanvasSize,

            clear:

                clearCanvas,

            fill:

                fillBackground,

            center:

                canvasCenter,

            ratio:

                devicePixelRatio,

            status:

                canvasStatus

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
 assets/js/particles.js
 Part 3
 Particle Class • Generator • Spawn Engine
===========================================================
*/

"use strict";

/* ===========================================================
   PARTICLE ENGINE
=========================================================== */

const ParticleEngine={

    initialized:false,

    particles:[],

    created:0

};

/* ===========================================================
   PARTICLE CLASS
=========================================================== */

class Particle{

    constructor(){

        this.reset(true);

    }

    reset(initial=false){

        this.x=random(

            0,

            CanvasEngine.width

        );

        this.y=random(

            0,

            CanvasEngine.height

        );

        this.radius=random(

            PARTICLES_CONFIG.minRadius,

            PARTICLES_CONFIG.maxRadius

        );

        this.speedX=random(

            -PARTICLES_CONFIG.speed,

            PARTICLES_CONFIG.speed

        );

        this.speedY=random(

            -PARTICLES_CONFIG.speed,

            PARTICLES_CONFIG.speed

        );

        this.opacity=random(

            0.2,

            PARTICLES_CONFIG.opacity

        );

        this.color=

            PARTICLES_CONFIG.color;

        this.life=1;

        this.initial=initial;

    }

    update(){

        this.x+=this.speedX;

        this.y+=this.speedY;

        if(

            this.x<0 ||

            this.x>

            CanvasEngine.width

        ){

            this.speedX*=-1;

        }

        if(

            this.y<0 ||

            this.y>

            CanvasEngine.height

        ){

            this.speedY*=-1;

        }

    }

    draw(){

        if(

            !Particles.context

        ){

            return;

        }

        Particles.context.save();

        Particles.context.globalAlpha=

            this.opacity;

        Particles.context.beginPath();

        Particles.context.arc(

            this.x,

            this.y,

            this.radius,

            0,

            Math.PI*2

        );

        Particles.context.fillStyle=

            this.color;

        Particles.context.fill();

        Particles.context.restore();

    }

}

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeParticleEngine(){

    createParticles();

    ParticleEngine.initialized=true;

}

/* ===========================================================
   CREATE
=========================================================== */

function createParticles(){

    ParticleEngine.particles=[];

    ParticlesState.particles=[];

    for(

        let i=0;

        i<PARTICLES_CONFIG.particleCount;

        i++

    ){

        const particle=

            new Particle();

        ParticleEngine.particles.push(

            particle

        );

        ParticlesState.particles.push(

            particle

        );

        ParticleEngine.created++;

    }

}

/* ===========================================================
   ADD
=========================================================== */

function addParticle(){

    const particle=

        new Particle();

    ParticleEngine.particles.push(

        particle

    );

    ParticlesState.particles.push(

        particle

    );

    return particle;

}

/* ===========================================================
   REMOVE
=========================================================== */

function removeParticle(){

    ParticleEngine.particles.pop();

    ParticlesState.particles.pop();

}

/* ===========================================================
   REGENERATE
=========================================================== */

function regenerateParticles(){

    createParticles();

}

/* ===========================================================
   UPDATE
=========================================================== */

function updateParticles(){

    ParticleEngine.particles.forEach(

        particle=>{

            particle.update();

        }

    );

}

/* ===========================================================
   DRAW
=========================================================== */

function drawParticles(){

    ParticleEngine.particles.forEach(

        particle=>{

            particle.draw();

        }

    );

}

/* ===========================================================
   RESET
=========================================================== */

function resetParticles(){

    ParticleEngine.particles.forEach(

        particle=>{

            particle.reset();

        }

    );

}

/* ===========================================================
   RANDOMIZE
=========================================================== */

function randomizeParticles(){

    ParticleEngine.particles.forEach(

        particle=>{

            particle.radius=random(

                PARTICLES_CONFIG.minRadius,

                PARTICLES_CONFIG.maxRadius

            );

            particle.opacity=random(

                0.2,

                PARTICLES_CONFIG.opacity

            );

        }

    );

}

/* ===========================================================
   STATUS
=========================================================== */

function particleStatus(){

    return{

        initialized:

            ParticleEngine.initialized,

        total:

            ParticleEngine.particles.length,

        created:

            ParticleEngine.created

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeParticleEngine();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ParticlesManager,

    {

        particles:{

            init:

                initializeParticleEngine,

            create:

                createParticles,

            regenerate:

                regenerateParticles,

            update:

                updateParticles,

            draw:

                drawParticles,

            add:

                addParticle,

            remove:

                removeParticle,

            reset:

                resetParticles,

            randomize:

                randomizeParticles,

            status:

                particleStatus

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
 assets/js/particles.js
 Part 4
 Animation Loop • Rendering • FPS Controller
===========================================================
*/

"use strict";

/* ===========================================================
   ANIMATION ENGINE
=========================================================== */

const AnimationEngine={

    initialized:false,

    running:false,

    animationId:null,

    lastFrame:0,

    frameInterval:

        1000/PARTICLES_CONFIG.fps,

    frameCount:0,

    currentFPS:0,

    fpsTimer:performance.now()

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeAnimation(){

    AnimationEngine.lastFrame=

        performance.now();

    AnimationEngine.running=false;

    AnimationEngine.initialized=true;

}

/* ===========================================================
   START
=========================================================== */

function startParticles(){

    if(

        AnimationEngine.running

    ){

        return;

    }

    AnimationEngine.running=true;

    ParticlesApp.running=true;

    ParticlesState.running=true;

    animate(

        performance.now()

    );

}

/* ===========================================================
   STOP
=========================================================== */

function stopParticles(){

    AnimationEngine.running=false;

    ParticlesApp.running=false;

    ParticlesState.running=false;

    cancelAnimationFrame(

        AnimationEngine.animationId

    );

}

/* ===========================================================
   PAUSE
=========================================================== */

function pauseParticles(){

    stopParticles();

}

/* ===========================================================
   RESUME
=========================================================== */

function resumeParticles(){

    if(

        AnimationEngine.running

    ){

        return;

    }

    startParticles();

}

/* ===========================================================
   MAIN LOOP
=========================================================== */

function animate(timestamp){

    if(

        !AnimationEngine.running

    ){

        return;

    }

    const delta=

        timestamp-

        AnimationEngine.lastFrame;

    if(

        delta>=

        AnimationEngine.frameInterval

    ){

        AnimationEngine.lastFrame=

            timestamp-

            (delta%

            AnimationEngine.frameInterval);

        renderFrame();

        updateFPS(timestamp);

    }

    AnimationEngine.animationId=

        requestAnimationFrame(

            animate

        );

}

/* ===========================================================
   RENDER FRAME
=========================================================== */

function renderFrame(){

    clearCanvas();

    fillBackground();

    updateParticles();

    drawParticles();

    drawConnections?.();

    updateMouseEffect?.();

    ParticlesState.frame++;

}

/* ===========================================================
   FPS
=========================================================== */

function updateFPS(timestamp){

    AnimationEngine.frameCount++;

    if(

        timestamp-

        AnimationEngine.fpsTimer>=1000

    ){

        AnimationEngine.currentFPS=

            AnimationEngine.frameCount;

        AnimationEngine.frameCount=0;

        AnimationEngine.fpsTimer=

            timestamp;

    }

}

/* ===========================================================
   STEP
=========================================================== */

function renderOnce(){

    renderFrame();

}

/* ===========================================================
   SPEED
=========================================================== */

function setFPS(value){

    value=

        clamp(

            Number(value)||60,

            10,

            240

        );

    PARTICLES_CONFIG.fps=value;

    AnimationEngine.frameInterval=

        1000/value;

}

/* ===========================================================
   TOGGLE
=========================================================== */

function toggleParticles(){

    if(

        AnimationEngine.running

    ){

        pauseParticles();

    }else{

        resumeParticles();

    }

}

/* ===========================================================
   STATUS
=========================================================== */

function animationStatus(){

    return{

        initialized:

            AnimationEngine.initialized,

        running:

            AnimationEngine.running,

        fps:

            AnimationEngine.currentFPS,

        targetFPS:

            PARTICLES_CONFIG.fps,

        frame:

            ParticlesState.frame

    };

}

/* ===========================================================
   AUTO START
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeAnimation();

        if(

            PARTICLES_CONFIG.autoStart

        ){

            startParticles();

        }

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ParticlesManager,

    {

        animation:{

            init:

                initializeAnimation,

            start:

                startParticles,

            stop:

                stopParticles,

            pause:

                pauseParticles,

            resume:

                resumeParticles,

            toggle:

                toggleParticles,

            render:

                renderOnce,

            fps:

                setFPS,

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
 assets/js/particles.js
 Part 5
 Mouse Interaction • Touch Support • Repulse • Attraction
===========================================================
*/

"use strict";

/* ===========================================================
   INTERACTION ENGINE
=========================================================== */

const InteractionEngine={

    initialized:false,

    enabled:true,

    touching:false,

    mouseRadius:

        PARTICLES_CONFIG.mouseRadius,

    force:0.08,

    mode:"repulse"

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeInteraction(){

    initializeMouse();

    initializeTouch();

    initializeLeave();

    InteractionEngine.initialized=true;

}

/* ===========================================================
   MOUSE
=========================================================== */

function initializeMouse(){

    if(!Particles.canvas){

        return;

    }

    on(

        Particles.canvas,

        "mousemove",

        handleMouseMove,

        {

            passive:true

        }

    );

}

/* ===========================================================
   TOUCH
=========================================================== */

function initializeTouch(){

    if(!Particles.canvas){

        return;

    }

    on(

        Particles.canvas,

        "touchstart",

        handleTouchStart,

        {

            passive:true

        }

    );

    on(

        Particles.canvas,

        "touchmove",

        handleTouchMove,

        {

            passive:true

        }

    );

    on(

        Particles.canvas,

        "touchend",

        handleTouchEnd,

        {

            passive:true

        }

    );

}

/* ===========================================================
   EVENTS
=========================================================== */

function handleMouseMove(event){

    const rect=

        Particles.canvas

        .getBoundingClientRect();

    ParticlesState.mouseX=

        event.clientX-

        rect.left;

    ParticlesState.mouseY=

        event.clientY-

        rect.top;

    ParticlesState.mouseActive=true;

}

function handleTouchStart(event){

    InteractionEngine.touching=true;

    updateTouchPosition(

        event.touches[0]

    );

}

function handleTouchMove(event){

    updateTouchPosition(

        event.touches[0]

    );

}

function handleTouchEnd(){

    InteractionEngine.touching=false;

    ParticlesState.mouseActive=false;

}

function updateTouchPosition(touch){

    const rect=

        Particles.canvas

        .getBoundingClientRect();

    ParticlesState.mouseX=

        touch.clientX-

        rect.left;

    ParticlesState.mouseY=

        touch.clientY-

        rect.top;

    ParticlesState.mouseActive=true;

}

/* ===========================================================
   LEAVE
=========================================================== */

function initializeLeave(){

    if(!Particles.canvas){

        return;

    }

    on(

        Particles.canvas,

        "mouseleave",

        ()=>{

            ParticlesState.mouseActive=false;

        }

    );

}

/* ===========================================================
   UPDATE EFFECT
=========================================================== */

function updateMouseEffect(){

    if(

        !ParticlesState.mouseActive ||

        !InteractionEngine.enabled

    ){

        return;

    }

    ParticleEngine.particles.forEach(

        particle=>{

            applyMouseForce(

                particle

            );

        }

    );

}

/* ===========================================================
   FORCE
=========================================================== */

function applyMouseForce(particle){

    const dx=

        particle.x-

        ParticlesState.mouseX;

    const dy=

        particle.y-

        ParticlesState.mouseY;

    const distance=

        Math.sqrt(

            dx*dx+

            dy*dy

        );

    if(

        distance>

        InteractionEngine.mouseRadius ||

        distance===0

    ){

        return;

    }

    const strength=

        (InteractionEngine.mouseRadius-

        distance)

        /

        InteractionEngine.mouseRadius;

    const angle=

        Math.atan2(

            dy,

            dx

        );

    if(

        InteractionEngine.mode===

        "repulse"

    ){

        particle.x+=

            Math.cos(angle)*

            strength*

            8*

            InteractionEngine.force;

        particle.y+=

            Math.sin(angle)*

            strength*

            8*

            InteractionEngine.force;

    }else{

        particle.x-=

            Math.cos(angle)*

            strength*

            8*

            InteractionEngine.force;

        particle.y-=

            Math.sin(angle)*

            strength*

            8*

            InteractionEngine.force;

    }

}

/* ===========================================================
   SETTINGS
=========================================================== */

function setInteractionMode(mode){

    if(

        mode==="repulse" ||

        mode==="attract"

    ){

        InteractionEngine.mode=

            mode;

    }

}

function setMouseRadius(radius){

    InteractionEngine.mouseRadius=

        clamp(

            radius,

            20,

            500

        );

}

function setInteractionForce(force){

    InteractionEngine.force=

        clamp(

            force,

            0,

            1

        );

}

/* ===========================================================
   ENABLE / DISABLE
=========================================================== */

function enableInteraction(){

    InteractionEngine.enabled=true;

}

function disableInteraction(){

    InteractionEngine.enabled=false;

}

/* ===========================================================
   STATUS
=========================================================== */

function interactionStatus(){

    return{

        initialized:

            InteractionEngine.initialized,

        enabled:

            InteractionEngine.enabled,

        touching:

            InteractionEngine.touching,

        mode:

            InteractionEngine.mode,

        radius:

            InteractionEngine.mouseRadius,

        force:

            InteractionEngine.force,

        mouseActive:

            ParticlesState.mouseActive

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeInteraction();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ParticlesManager,

    {

        interaction:{

            init:

                initializeInteraction,

            enable:

                enableInteraction,

            disable:

                disableInteraction,

            mode:

                setInteractionMode,

            radius:

                setMouseRadius,

            force:

                setInteractionForce,

            update:

                updateMouseEffect,

            status:

                interactionStatus

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
 assets/js/particles.js
 Part 6
 Particle Connection • Network Lines • Glow Effect
===========================================================
*/

"use strict";

/* ===========================================================
   CONNECTION ENGINE
=========================================================== */

const ConnectionEngine={

    initialized:false,

    enabled:true,

    maxDistance:
        PARTICLES_CONFIG.connectDistance,

    opacity:0.25,

    lineWidth:1,

    color:PARTICLES_CONFIG.color,

    glow:true,

    totalConnections:0

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeConnections(){

    ConnectionEngine.initialized=true;

}

/* ===========================================================
   DRAW CONNECTIONS
=========================================================== */

function drawConnections(){

    if(

        !ConnectionEngine.enabled ||

        !Particles.context

    ){

        return;

    }

    ConnectionEngine.totalConnections=0;

    const particles=

        ParticleEngine.particles;

    for(

        let i=0;

        i<particles.length;

        i++

    ){

        for(

            let j=i+1;

            j<particles.length;

            j++

        ){

            connectParticles(

                particles[i],

                particles[j]

            );

        }

    }

}

/* ===========================================================
   CONNECT
=========================================================== */

function connectParticles(

    particleA,

    particleB

){

    const dx=

        particleA.x-

        particleB.x;

    const dy=

        particleA.y-

        particleB.y;

    const distance=

        Math.sqrt(

            dx*dx+

            dy*dy

        );

    if(

        distance>

        ConnectionEngine.maxDistance

    ){

        return;

    }

    const opacity=

        (1-

        distance/

        ConnectionEngine.maxDistance)

        *

        ConnectionEngine.opacity;

    drawLine(

        particleA.x,

        particleA.y,

        particleB.x,

        particleB.y,

        opacity

    );

    ConnectionEngine.totalConnections++;

}

/* ===========================================================
   DRAW LINE
=========================================================== */

function drawLine(

    x1,

    y1,

    x2,

    y2,

    opacity

){

    Particles.context.save();

    Particles.context.beginPath();

    Particles.context.moveTo(

        x1,

        y1

    );

    Particles.context.lineTo(

        x2,

        y2

    );

    Particles.context.lineWidth=

        ConnectionEngine.lineWidth;

    Particles.context.strokeStyle=

        hexToRGBA(

            ConnectionEngine.color,

            opacity

        );

    if(

        ConnectionEngine.glow

    ){

        Particles.context.shadowBlur=8;

        Particles.context.shadowColor=

            ConnectionEngine.color;

    }

    Particles.context.stroke();

    Particles.context.restore();

}

/* ===========================================================
   RGBA
=========================================================== */

function hexToRGBA(

    hex,

    alpha

){

    let value=

        hex.replace(

            "#",

            ""

        );

    if(

        value.length===3

    ){

        value=

            value

            .split("")

            .map(

                item=>item+item

            )

            .join("");

    }

    const number=

        parseInt(

            value,

            16

        );

    const r=

        (number>>16)&255;

    const g=

        (number>>8)&255;

    const b=

        number&255;

    return `rgba(${r},${g},${b},${alpha})`;

}

/* ===========================================================
   SETTINGS
=========================================================== */

function setConnectionDistance(distance){

    ConnectionEngine.maxDistance=

        clamp(

            distance,

            20,

            400

        );

}

function setConnectionOpacity(opacity){

    ConnectionEngine.opacity=

        clamp(

            opacity,

            0,

            1

        );

}

function setLineWidth(width){

    ConnectionEngine.lineWidth=

        clamp(

            width,

            0.5,

            5

        );

}

function setConnectionColor(color){

    ConnectionEngine.color=color;

}

function enableGlow(){

    ConnectionEngine.glow=true;

}

function disableGlow(){

    ConnectionEngine.glow=false;

}

/* ===========================================================
   ENABLE / DISABLE
=========================================================== */

function enableConnections(){

    ConnectionEngine.enabled=true;

}

function disableConnections(){

    ConnectionEngine.enabled=false;

}

/* ===========================================================
   STATUS
=========================================================== */

function connectionStatus(){

    return{

        initialized:

            ConnectionEngine.initialized,

        enabled:

            ConnectionEngine.enabled,

        glow:

            ConnectionEngine.glow,

        distance:

            ConnectionEngine.maxDistance,

        opacity:

            ConnectionEngine.opacity,

        width:

            ConnectionEngine.lineWidth,

        total:

            ConnectionEngine.totalConnections

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeConnections();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ParticlesManager,

    {

        connections:{

            init:

                initializeConnections,

            draw:

                drawConnections,

            enable:

                enableConnections,

            disable:

                disableConnections,

            glowOn:

                enableGlow,

            glowOff:

                disableGlow,

            distance:

                setConnectionDistance,

            opacity:

                setConnectionOpacity,

            width:

                setLineWidth,

            color:

                setConnectionColor,

            status:

                connectionStatus

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
 assets/js/particles.js
 Part 7
 Shapes • Colors • Gradient • Glow • Effects
===========================================================
*/

"use strict";

/* ===========================================================
   EFFECT ENGINE
=========================================================== */

const EffectEngine={

    initialized:false,

    shape:"circle",

    glow:true,

    gradient:false,

    rainbow:false,

    rotation:0,

    hue:0

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeEffects(){

    EffectEngine.initialized=true;

}

/* ===========================================================
   DRAW SHAPE
=========================================================== */

function drawParticleShape(particle){

    switch(

        EffectEngine.shape

    ){

        case "square":

            drawSquare(

                particle

            );

            break;

        case "triangle":

            drawTriangle(

                particle

            );

            break;

        case "star":

            drawStar(

                particle

            );

            break;

        default:

            drawCircle(

                particle

            );

    }

}

/* ===========================================================
   CIRCLE
=========================================================== */

function drawCircle(particle){

    const ctx=

        Particles.context;

    ctx.beginPath();

    ctx.arc(

        particle.x,

        particle.y,

        particle.radius,

        0,

        Math.PI*2

    );

    applyParticleStyle(

        particle

    );

    ctx.fill();

}

/* ===========================================================
   SQUARE
=========================================================== */

function drawSquare(particle){

    const ctx=

        Particles.context;

    ctx.beginPath();

    ctx.rect(

        particle.x-

        particle.radius,

        particle.y-

        particle.radius,

        particle.radius*2,

        particle.radius*2

    );

    applyParticleStyle(

        particle

    );

    ctx.fill();

}

/* ===========================================================
   TRIANGLE
=========================================================== */

function drawTriangle(particle){

    const ctx=

        Particles.context;

    ctx.beginPath();

    ctx.moveTo(

        particle.x,

        particle.y-

        particle.radius

    );

    ctx.lineTo(

        particle.x-

        particle.radius,

        particle.y+

        particle.radius

    );

    ctx.lineTo(

        particle.x+

        particle.radius,

        particle.y+

        particle.radius

    );

    ctx.closePath();

    applyParticleStyle(

        particle

    );

    ctx.fill();

}

/* ===========================================================
   STAR
=========================================================== */

function drawStar(particle){

    const ctx=

        Particles.context;

    const spikes=5;

    const outer=

        particle.radius;

    const inner=

        particle.radius/2;

    let rotation=

        Math.PI/2*3;

    let step=

        Math.PI/spikes;

    ctx.beginPath();

    ctx.moveTo(

        particle.x,

        particle.y-

        outer

    );

    for(

        let i=0;

        i<spikes;

        i++

    ){

        ctx.lineTo(

            particle.x+

            Math.cos(rotation)*outer,

            particle.y+

            Math.sin(rotation)*outer

        );

        rotation+=step;

        ctx.lineTo(

            particle.x+

            Math.cos(rotation)*inner,

            particle.y+

            Math.sin(rotation)*inner

        );

        rotation+=step;

    }

    ctx.closePath();

    applyParticleStyle(

        particle

    );

    ctx.fill();

}

/* ===========================================================
   STYLE
=========================================================== */

function applyParticleStyle(particle){

    const ctx=

        Particles.context;

    if(

        EffectEngine.gradient

    ){

        const gradient=

            ctx.createRadialGradient(

                particle.x,

                particle.y,

                0,

                particle.x,

                particle.y,

                particle.radius*2

            );

        gradient.addColorStop(

            0,

            particle.color

        );

        gradient.addColorStop(

            1,

            "transparent"

        );

        ctx.fillStyle=

            gradient;

    }else{

        ctx.fillStyle=

            particle.color;

    }

    if(

        EffectEngine.glow

    ){

        ctx.shadowBlur=15;

        ctx.shadowColor=

            particle.color;

    }

}

/* ===========================================================
   RAINBOW
=========================================================== */

function updateRainbow(){

    if(

        !EffectEngine.rainbow

    ){

        return;

    }

    EffectEngine.hue+=0.5;

    ParticleEngine.particles.forEach(

        particle=>{

            particle.color=

                `hsl(${EffectEngine.hue},100%,65%)`;

        }

    );

}

/* ===========================================================
   SETTINGS
=========================================================== */

function setShape(shape){

    EffectEngine.shape=shape;

}

function enableGlow(){

    EffectEngine.glow=true;

}

function disableGlow(){

    EffectEngine.glow=false;

}

function enableGradient(){

    EffectEngine.gradient=true;

}

function disableGradient(){

    EffectEngine.gradient=false;

}

function enableRainbow(){

    EffectEngine.rainbow=true;

}

function disableRainbow(){

    EffectEngine.rainbow=false;

}

/* ===========================================================
   STATUS
=========================================================== */

function effectStatus(){

    return{

        initialized:

            EffectEngine.initialized,

        shape:

            EffectEngine.shape,

        glow:

            EffectEngine.glow,

        gradient:

            EffectEngine.gradient,

        rainbow:

            EffectEngine.rainbow,

        hue:

            Math.round(

                EffectEngine.hue

            )

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeEffects();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ParticlesManager,

    {

        effects:{

            init:

                initializeEffects,

            draw:

                drawParticleShape,

            rainbow:

                updateRainbow,

            shape:

                setShape,

            glowOn:

                enableGlow,

            glowOff:

                disableGlow,

            gradientOn:

                enableGradient,

            gradientOff:

                disableGradient,

            rainbowOn:

                enableRainbow,

            rainbowOff:

                disableRainbow,

            status:

                effectStatus

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
 assets/js/particles.js
 Part 8
 Performance • Responsive • Optimization
===========================================================
*/

"use strict";

/* ===========================================================
   PERFORMANCE ENGINE
=========================================================== */

const PerformanceEngine={

    initialized:false,

    mobile:false,

    tablet:false,

    desktop:true,

    reducedMotion:false,

    visible:true,

    paused:false,

    fps:0,

    frameCount:0,

    lastFPSUpdate:performance.now(),

    targetFPS:PARTICLES_CONFIG.fps,

    adaptiveQuality:true

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializePerformance(){

    detectDevice();

    detectMotionPreference();

    initializeResizeWatcher();

    initializeVisibilityWatcher();

    optimizeParticleCount();

    PerformanceEngine.initialized=true;

}

/* ===========================================================
   DEVICE
=========================================================== */

function detectDevice(){

    const width=

        window.innerWidth;

    PerformanceEngine.mobile=

        width<768;

    PerformanceEngine.tablet=

        width>=768 &&

        width<1200;

    PerformanceEngine.desktop=

        width>=1200;

}

/* ===========================================================
   REDUCED MOTION
=========================================================== */

function detectMotionPreference(){

    PerformanceEngine.reducedMotion=

        window.matchMedia(

            "(prefers-reduced-motion: reduce)"

        ).matches;

    if(

        PerformanceEngine.reducedMotion

    ){

        setFPS(30);

    }

}

/* ===========================================================
   PARTICLE OPTIMIZATION
=========================================================== */

function optimizeParticleCount(){

    if(

        !PerformanceEngine.adaptiveQuality

    ){

        return;

    }

    let count=

        PARTICLES_CONFIG.particleCount;

    if(

        PerformanceEngine.mobile

    ){

        count=

            Math.floor(count*0.45);

    }

    else if(

        PerformanceEngine.tablet

    ){

        count=

            Math.floor(count*0.7);

    }

    if(

        ParticleEngine.particles.length!==count

    ){

        PARTICLES_CONFIG.particleCount=

            count;

        regenerateParticles();

    }

}

/* ===========================================================
   RESIZE
=========================================================== */

function initializeResizeWatcher(){

    window.addEventListener(

        "resize",

        ()=>{

            detectDevice();

            optimizeParticleCount();

        },

        {

            passive:true

        }

    );

}

/* ===========================================================
   VISIBILITY
=========================================================== */

function initializeVisibilityWatcher(){

    document.addEventListener(

        "visibilitychange",

        ()=>{

            if(

                document.hidden

            ){

                pauseEngine();

            }

            else{

                resumeEngine();

            }

        }

    );

}

/* ===========================================================
   PAUSE
=========================================================== */

function pauseEngine(){

    PerformanceEngine.visible=false;

    PerformanceEngine.paused=true;

    pauseParticles?.();

}

/* ===========================================================
   RESUME
=========================================================== */

function resumeEngine(){

    PerformanceEngine.visible=true;

    PerformanceEngine.paused=false;

    resumeParticles?.();

}

/* ===========================================================
   FPS
=========================================================== */

function updatePerformanceFPS(){

    PerformanceEngine.frameCount++;

    const now=

        performance.now();

    if(

        now-

        PerformanceEngine.lastFPSUpdate>=1000

    ){

        PerformanceEngine.fps=

            PerformanceEngine.frameCount;

        PerformanceEngine.frameCount=0;

        PerformanceEngine.lastFPSUpdate=

            now;

    }

}

/* ===========================================================
   LOW FPS
=========================================================== */

function autoOptimize(){

    if(

        !PerformanceEngine.adaptiveQuality

    ){

        return;

    }

    if(

        PerformanceEngine.fps<30 &&

        ParticleEngine.particles.length>25

    ){

        ParticleEngine.particles.pop();

    }

}

/* ===========================================================
   MEMORY
=========================================================== */

function memoryStatus(){

    if(

        !performance.memory

    ){

        return null;

    }

    return{

        used:

            performance.memory.usedJSHeapSize,

        total:

            performance.memory.totalJSHeapSize,

        limit:

            performance.memory.jsHeapSizeLimit

    };

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshPerformance(){

    detectDevice();

    detectMotionPreference();

    optimizeParticleCount();

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

        tablet:

            PerformanceEngine.tablet,

        desktop:

            PerformanceEngine.desktop,

        reducedMotion:

            PerformanceEngine.reducedMotion,

        visible:

            PerformanceEngine.visible,

        paused:

            PerformanceEngine.paused,

        fps:

            PerformanceEngine.fps,

        particles:

            ParticleEngine.particles.length,

        memory:

            memoryStatus()

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

    window.ParticlesManager,

    {

        performance:{

            init:

                initializePerformance,

            refresh:

                refreshPerformance,

            pause:

                pauseEngine,

            resume:

                resumeEngine,

            optimize:

                autoOptimize,

            memory:

                memoryStatus,

            status:

                performanceStatus

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
 assets/js/particles.js
 Part 9
 Visibility • Pause • Resume • Lifecycle Manager
===========================================================
*/

"use strict";

/* ===========================================================
   LIFECYCLE ENGINE
=========================================================== */

const LifecycleEngine={

    initialized:false,

    paused:false,

    destroyed:false,

    sleeping:false,

    focused:true,

    autoPause:true,

    autoResume:true,

    startTime:Date.now(),

    pauseTime:0,

    totalPaused:0

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeLifecycle(){

    initializeVisibilityEvents();

    initializeFocusEvents();

    initializePageEvents();

    LifecycleEngine.initialized=true;

}

/* ===========================================================
   VISIBILITY
=========================================================== */

function initializeVisibilityEvents(){

    document.addEventListener(

        "visibilitychange",

        handleVisibility

    );

}

function handleVisibility(){

    if(

        document.hidden

    ){

        sleepParticles();

    }

    else{

        wakeParticles();

    }

}

/* ===========================================================
   FOCUS
=========================================================== */

function initializeFocusEvents(){

    window.addEventListener(

        "focus",

        ()=>{

            LifecycleEngine.focused=true;

            if(

                LifecycleEngine.autoResume

            ){

                wakeParticles();

            }

        }

    );

    window.addEventListener(

        "blur",

        ()=>{

            LifecycleEngine.focused=false;

            if(

                LifecycleEngine.autoPause

            ){

                sleepParticles();

            }

        }

    );

}

/* ===========================================================
   PAGE EVENTS
=========================================================== */

function initializePageEvents(){

    window.addEventListener(

        "pageshow",

        ()=>{

            wakeParticles();

        }

    );

    window.addEventListener(

        "pagehide",

        ()=>{

            sleepParticles();

        }

    );

}

/* ===========================================================
   SLEEP
=========================================================== */

function sleepParticles(){

    if(

        LifecycleEngine.sleeping

    ){

        return;

    }

    LifecycleEngine.sleeping=true;

    LifecycleEngine.paused=true;

    LifecycleEngine.pauseTime=

        Date.now();

    pauseParticles?.();

}

/* ===========================================================
   WAKE
=========================================================== */

function wakeParticles(){

    if(

        !LifecycleEngine.sleeping

    ){

        return;

    }

    LifecycleEngine.sleeping=false;

    LifecycleEngine.paused=false;

    LifecycleEngine.totalPaused+=

        Date.now()-

        LifecycleEngine.pauseTime;

    resumeParticles?.();

}

/* ===========================================================
   MANUAL PAUSE
=========================================================== */

function pauseLifecycle(){

    LifecycleEngine.paused=true;

    pauseParticles?.();

}

/* ===========================================================
   MANUAL RESUME
=========================================================== */

function resumeLifecycle(){

    LifecycleEngine.paused=false;

    resumeParticles?.();

}

/* ===========================================================
   TOGGLE
=========================================================== */

function toggleLifecycle(){

    if(

        LifecycleEngine.paused

    ){

        resumeLifecycle();

    }

    else{

        pauseLifecycle();

    }

}

/* ===========================================================
   RUN TIME
=========================================================== */

function runningTime(){

    return Math.floor(

        (

            Date.now()

            -

            LifecycleEngine.startTime

            -

            LifecycleEngine.totalPaused

        )/1000

    );

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroyLifecycle(){

    stopParticles?.();

    LifecycleEngine.destroyed=true;

}

/* ===========================================================
   RESTART
=========================================================== */

function restartLifecycle(){

    LifecycleEngine.destroyed=false;

    LifecycleEngine.paused=false;

    LifecycleEngine.sleeping=false;

    LifecycleEngine.startTime=

        Date.now();

    LifecycleEngine.totalPaused=0;

    resumeParticles?.();

}

/* ===========================================================
   STATUS
=========================================================== */

function lifecycleStatus(){

    return{

        initialized:

            LifecycleEngine.initialized,

        paused:

            LifecycleEngine.paused,

        sleeping:

            LifecycleEngine.sleeping,

        focused:

            LifecycleEngine.focused,

        destroyed:

            LifecycleEngine.destroyed,

        runningTime:

            runningTime(),

        totalPaused:

            LifecycleEngine.totalPaused

    };

}

/* ===========================================================
   DOM READY
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeLifecycle();

    }

);

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ParticlesManager,

    {

        lifecycle:{

            init:

                initializeLifecycle,

            pause:

                pauseLifecycle,

            resume:

                resumeLifecycle,

            toggle:

                toggleLifecycle,

            sleep:

                sleepParticles,

            wake:

                wakeParticles,

            restart:

                restartLifecycle,

            destroy:

                destroyLifecycle,

            status:

                lifecycleStatus

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
 assets/js/particles.js
 Part 10
 Analytics • Statistics • Performance Metrics
===========================================================
*/

"use strict";

/* ===========================================================
   ANALYTICS ENGINE
=========================================================== */

const AnalyticsEngine={

    initialized:false,

    startTime:Date.now(),

    frames:0,

    fps:0,

    maxFPS:0,

    minFPS:999,

    averageFPS:0,

    totalParticles:0,

    totalConnections:0,

    mouseInteractions:0,

    resizeEvents:0,

    pauseEvents:0,

    resumeEvents:0,

    renderTime:0,

    lastSecond:performance.now()

};

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeAnalytics(){

    AnalyticsEngine.totalParticles=

        ParticleEngine.particles.length;

    AnalyticsEngine.initialized=true;

}

/* ===========================================================
   FRAME
=========================================================== */

function trackFrame(renderTime=0){

    AnalyticsEngine.frames++;

    AnalyticsEngine.renderTime+=

        renderTime;

    const now=

        performance.now();

    if(

        now-

        AnalyticsEngine.lastSecond>=1000

    ){

        AnalyticsEngine.fps=

            AnalyticsEngine.frames;

        AnalyticsEngine.maxFPS=

            Math.max(

                AnalyticsEngine.maxFPS,

                AnalyticsEngine.fps

            );

        AnalyticsEngine.minFPS=

            Math.min(

                AnalyticsEngine.minFPS,

                AnalyticsEngine.fps

            );

        AnalyticsEngine.averageFPS=

            Math.round(

                (

                    AnalyticsEngine.averageFPS+

                    AnalyticsEngine.fps

                )/2

            );

        AnalyticsEngine.frames=0;

        AnalyticsEngine.lastSecond=

            now;

    }

}

/* ===========================================================
   CONNECTIONS
=========================================================== */

function trackConnections(){

    AnalyticsEngine.totalConnections=

        ConnectionEngine.totalConnections;

}

/* ===========================================================
   PARTICLES
=========================================================== */

function trackParticles(){

    AnalyticsEngine.totalParticles=

        ParticleEngine.particles.length;

}

/* ===========================================================
   INTERACTION
=========================================================== */

function trackInteraction(){

    AnalyticsEngine.mouseInteractions++;

}

/* ===========================================================
   RESIZE
=========================================================== */

function trackResize(){

    AnalyticsEngine.resizeEvents++;

}

/* ===========================================================
   PAUSE
=========================================================== */

function trackPause(){

    AnalyticsEngine.pauseEvents++;

}

/* ===========================================================
   RESUME
=========================================================== */

function trackResume(){

    AnalyticsEngine.resumeEvents++;

}

/* ===========================================================
   RUN TIME
=========================================================== */

function uptime(){

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

        uptime:

            uptime(),

        fps:

            AnalyticsEngine.fps,

        maxFPS:

            AnalyticsEngine.maxFPS,

        minFPS:

            AnalyticsEngine.minFPS,

        averageFPS:

            AnalyticsEngine.averageFPS,

        particles:

            AnalyticsEngine.totalParticles,

        connections:

            AnalyticsEngine.totalConnections,

        mouseInteractions:

            AnalyticsEngine.mouseInteractions,

        resizeEvents:

            AnalyticsEngine.resizeEvents,

        pauseEvents:

            AnalyticsEngine.pauseEvents,

        resumeEvents:

            AnalyticsEngine.resumeEvents,

        renderTime:

            AnalyticsEngine.renderTime

    };

}

/* ===========================================================
   RESET
=========================================================== */

function resetAnalytics(){

    AnalyticsEngine.frames=0;

    AnalyticsEngine.fps=0;

    AnalyticsEngine.maxFPS=0;

    AnalyticsEngine.minFPS=999;

    AnalyticsEngine.averageFPS=0;

    AnalyticsEngine.totalConnections=0;

    AnalyticsEngine.mouseInteractions=0;

    AnalyticsEngine.resizeEvents=0;

    AnalyticsEngine.pauseEvents=0;

    AnalyticsEngine.resumeEvents=0;

    AnalyticsEngine.renderTime=0;

    AnalyticsEngine.startTime=

        Date.now();

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

        uptime:

            uptime(),

        fps:

            AnalyticsEngine.fps,

        particles:

            AnalyticsEngine.totalParticles,

        connections:

            AnalyticsEngine.totalConnections,

        interactions:

            AnalyticsEngine.mouseInteractions

    };

}

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

    window.ParticlesManager,

    {

        analytics:{

            init:

                initializeAnalytics,

            frame:

                trackFrame,

            particles:

                trackParticles,

            connections:

                trackConnections,

            interaction:

                trackInteraction,

            resize:

                trackResize,

            pause:

                trackPause,

            resume:

                trackResume,

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
 assets/js/particles.js
 Part 11
 Utilities • Debug • Report • Public API
===========================================================
*/

"use strict";

/* ===========================================================
   INFORMATION
=========================================================== */

const ParticlesInfo={

    name:"Particles Manager",

    version:"1.0.0",

    author:"Investment Technology Indonesia",

    environment:"production"

};

/* ===========================================================
   DEBUG
=========================================================== */

function enableDebug(){

    ParticlesApp.debug=true;

    particlesLog(

        "Debug Enabled"

    );

}

function disableDebug(){

    ParticlesApp.debug=false;

}

function debug(...args){

    if(!ParticlesApp.debug){

        return;

    }

    console.log(

        "[Particles Debug]",

        ...args

    );

}

function warn(message){

    console.warn(

        "[Particles Warning]",

        message

    );

}

function error(message){

    console.error(

        "[Particles Error]",

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

    return "particles-"+

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

            ParticlesInfo,

        app:

            ParticlesApp,

        config:

            PARTICLES_CONFIG,

        state:

            ParticlesState,

        canvas:

            canvasStatus?.(),

        particles:

            particleStatus?.(),

        animation:

            animationStatus?.(),

        interaction:

            interactionStatus?.(),

        connections:

            connectionStatus?.(),

        effects:

            effectStatus?.(),

        performance:

            performanceStatus?.(),

        lifecycle:

            lifecycleStatus?.(),

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

    resetParticles?.();

    resetAnalytics?.();

    refreshParticles?.();

}

/* ===========================================================
   DESTROY
=========================================================== */

function destroyManager(){

    destroyLifecycle?.();

    destroyParticles?.();

    cleanupDOM?.();

    particlesLog(

        "Particles Manager Destroyed"

    );

}

/* ===========================================================
   RESTART
=========================================================== */

function restartManager(){

    destroyManager();

    initializeParticles?.();

    initializeCanvasEngine?.();

    initializeParticleEngine?.();

    initializeAnimation?.();

    initializeInteraction?.();

    initializeConnections?.();

    initializeEffects?.();

    initializePerformance?.();

    initializeLifecycle?.();

    initializeAnalytics?.();

}

/* ===========================================================
   READY
=========================================================== */

function ready(){

    return{

        initialized:

            ParticlesApp.initialized,

        running:

            ParticlesApp.running,

        particles:

            ParticleEngine.particles.length,

        frame:

            ParticlesState.frame,

        fps:

            AnimationEngine.currentFPS

    };

}

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    window.ParticlesManager,

    {

        info:

            ParticlesInfo,

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

            "Particles Utilities Ready"

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
 assets/js/particles.js
 Part 12
 Final Initialization • Cleanup • Export • End of File
===========================================================
*/

"use strict";

/* ===========================================================
   APPLICATION INITIALIZER
=========================================================== */

function initializeParticlesManager(){

    if(ParticlesApp.initialized){

        particlesLog(

            "Particles Manager already initialized."

        );

        return;

    }

    particlesLog(

        "Initializing Particles Manager..."

    );

    initializeParticles?.();

    initializeCanvasEngine?.();

    initializeParticleEngine?.();

    initializeAnimation?.();

    initializeInteraction?.();

    initializeConnections?.();

    initializeEffects?.();

    initializePerformance?.();

    initializeLifecycle?.();

    initializeAnalytics?.();

    updateCanvasSize?.();

    regenerateParticles?.();

    startParticles?.();

    ParticlesApp.initialized=true;

    particlesLog(

        "Particles Manager Ready."

    );

}

/* ===========================================================
   GLOBAL EVENTS
=========================================================== */

window.addEventListener(

    "load",

    ()=>{

        refreshParticles?.();

        refreshPerformance?.();

        particlesLog(

            "Window Loaded"

        );

    }

);

window.addEventListener(

    "pageshow",

    ()=>{

        resumeParticles?.();

    }

);

window.addEventListener(

    "focus",

    ()=>{

        resumeParticles?.();

    }

);

window.addEventListener(

    "blur",

    ()=>{

        pauseParticles?.();

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

function cleanupParticlesManager(){

    pauseParticles?.();

    cleanupDOM?.();

    destroyLifecycle?.();

    particlesLog(

        "Particles Cleanup Complete"

    );

}

/* ===========================================================
   BEFORE UNLOAD
=========================================================== */

window.addEventListener(

    "beforeunload",

    ()=>{

        cleanupParticlesManager();

    }

);

/* ===========================================================
   FREEZE CONFIG
=========================================================== */

Object.freeze(

    PARTICLES_CONFIG

);

Object.freeze(

    ParticlesInfo

);

/* ===========================================================
   EXPORT
=========================================================== */

window.ParticlesManager=

Object.assign(

    window.ParticlesManager||{},

    {

        initialize:

            initializeParticlesManager,

        cleanup:

            cleanupParticlesManager,

        version:

            ()=>ParticlesInfo.version,

        app:

            ParticlesApp,

        config:

            PARTICLES_CONFIG,

        state:

            ParticlesState,

        info:

            ParticlesInfo,

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

        initializeParticlesManager();

    }

);

/* ===========================================================
   FINAL LOG
=========================================================== */

particlesLog(

"========================================"

);

particlesLog(

"Investment Technology Indonesia"

);

particlesLog(

"Particles Manager"

);

particlesLog(

"Version:",

ParticlesInfo.version

);

particlesLog(

"Environment:",

ParticlesInfo.environment

);

particlesLog(

"========================================"

);

/* ===========================================================
   FEATURES
=========================================================== */

/*
✔ HTML5 Canvas
✔ Animated Particles
✔ Particle Generator
✔ Dynamic Resize
✔ Retina Display Support
✔ Mouse Interaction
✔ Touch Support
✔ Attraction & Repulsion
✔ Connection Lines
✔ Glow Effect
✔ Gradient Effect
✔ Rainbow Effect
✔ Multiple Shapes
✔ Responsive Optimization
✔ FPS Controller
✔ Adaptive Performance
✔ Visibility Pause / Resume
✔ Lifecycle Manager
✔ Analytics & Statistics
✔ Performance Monitoring
✔ Debug Utilities
✔ Report Generator
✔ Public API
✔ ES6+ Modern JavaScript
✔ Production Ready
*/

/* ===========================================================
   END OF FILE
   assets/js/particles.js
===========================================================
*/