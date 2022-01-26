const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBT = document.getElementById("jsSave");

const INITIAL_COLOR = "black";

ctx.fillStyle = "white"
ctx.fillRect(0, 0, 700, 700);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function handleRangeChange(event){
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(){
  if(filling === true){
    filling = false;
    mode.innerText = "Fill"
  }else{
    filling = true;
    mode.innerText = "Paint"
  }
}

function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0, 0, 700, 700);
  }
}

function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function stopPainting(){
  painting = false;
}

function startPainting(){
  painting = true;
}

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    //painting이 false일땨 실행
    //끝점
    ctx.beginPath();
    ctx.moveTo(x,y);
  }else{
    //painting이 true일때 살향
    //시작점 잡아주기
    ctx.lineTo(x,y);
    ctx.stroke();
  }
}

function handleCM(event){
  event.preventDefault();
}

function handleSaveImage(){
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image;
  link.download = "paintJS[Export]";
  link.click();
}

function onMouseDown(event){
  painting = true;
}

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
  range.addEventListener("input", handleRangeChange)
}

if(mode){
  mode.addEventListener("click", handleModeClick)
}

if(saveBT){
  saveBT.addEventListener("click", handleSaveImage)
}