const blur = document.getElementById("blur");
const opacity = document.getElementById("opacity");
const radius = document.getElementById("radius");
const border = document.getElementById("border");
const shadow = document.getElementById("shadow");
const glassColor = document.getElementById("glassColor");

const blurValue = document.getElementById("blurValue");
const opacityValue = document.getElementById("opacityValue");
const radiusValue = document.getElementById("radiusValue");
const borderValue = document.getElementById("borderValue");
const shadowValue = document.getElementById("shadowValue");

const glassCard = document.getElementById("glassCard");
const cssOutput = document.getElementById("cssOutput");

const copyBtn = document.getElementById("copyBtn");
const resetBtn = document.getElementById("resetBtn");
const randomBtn = document.getElementById("randomBtn");

const toast = document.getElementById("toast");

function showToast(message){

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

function hexToRGBA(hex,alpha){

    const r=parseInt(hex.substr(1,2),16);
    const g=parseInt(hex.substr(3,2),16);
    const b=parseInt(hex.substr(5,2),16);

    return `rgba(${r},${g},${b},${alpha})`;

}

function updateGlass(){

    blurValue.innerText=blur.value+"px";
    opacityValue.innerText=opacity.value+"%";
    radiusValue.innerText=radius.value+"px";
    borderValue.innerText=border.value+"px";
    shadowValue.innerText=shadow.value+"px";

    const bg=hexToRGBA(glassColor.value,opacity.value/100);

    glassCard.style.background=bg;

    glassCard.style.backdropFilter=`blur(${blur.value}px)`;

    glassCard.style.webkitBackdropFilter=`blur(${blur.value}px)`;

    glassCard.style.border=`${border.value}px solid rgba(255,255,255,.35)`;

    glassCard.style.borderRadius=`${radius.value}px`;

    glassCard.style.boxShadow=`0 15px ${shadow.value}px rgba(0,0,0,.18)`;

    cssOutput.value=
`background:${bg};
backdrop-filter:blur(${blur.value}px);
-webkit-backdrop-filter:blur(${blur.value}px);
border:${border.value}px solid rgba(255,255,255,.35);
border-radius:${radius.value}px;
box-shadow:0 15px ${shadow.value}px rgba(0,0,0,.18);`;

}

[
blur,
opacity,
radius,
border,
shadow,
glassColor

].forEach(item=>{

    item.addEventListener("input",updateGlass);

});

copyBtn.addEventListener("click",()=>{

    navigator.clipboard.writeText(cssOutput.value);

    showToast("CSS Copied");

});

resetBtn.addEventListener("click",()=>{

    blur.value=20;
    opacity.value=25;
    radius.value=25;
    border.value=1;
    shadow.value=30;
    glassColor.value="#ffffff";

    updateGlass();

    showToast("Reset Complete");

});

function random(min,max){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function randomColor(){

    return "#"+Math.floor(Math.random()*16777215).toString(16).padStart(6,"0");

}

randomBtn.addEventListener("click",()=>{

    blur.value=random(5,35);

    opacity.value=random(10,60);

    radius.value=random(10,50);

    border.value=random(1,5);

    shadow.value=random(15,60);

    glassColor.value=randomColor();

    updateGlass();

    showToast("Random Style Generated");

});

updateGlass();