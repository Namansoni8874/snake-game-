let inputDir={x:0 ,y:0};
const eatsound=new Audio('eat.mp3');
const gameover=new Audio('hit.wav');
let lastPaintTime=0;
let score=0;
let speed=10;
let snakeArr=[
    {
        x:10,
        y:10
    }
]
let food={x:5,y:9}

//game functions
function main(ctime){
    window.requestAnimationFrame(main);
    
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake){
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y)
        { return true}
    }
    if(snake[0].x>=12 || snake[0].x <=0 || snake[0].y>=12 || snake[0].y <=0)
    {return true}
    
}
function gameEngine(){
    //part 1 update the snake array&food
    if(isCollide(snakeArr)){
        gameover.play();
        inputDir={x:0 ,y:0};
        alert("press any key to start again")
        snakeArr=[
            {
                x:10,
                y:10
            }
        ]
        score=0;
        scorebox.innerHTML="score: "+score
    }
 // if snake eaten the food then increament
 if(snakeArr[0].x===food.x&&snakeArr[0].y===food.y){
    eatsound.play()
    score +=1;
    scorebox.innerHTML="score: "+score
    snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})
    let a=2;
    let b=10;
    food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
 }
 //moving the  snake
 for (let i =snakeArr.length-2; i >=0; i--) {
    snakeArr[i+1]={...snakeArr[i]}
    
 }
 snakeArr[0].x +=inputDir.x;
 snakeArr[0].y +=inputDir.y;

//part 2 display the snake and food
//display snake
    box.innerHTML="";
    snakeArr.forEach((e,index)=>{
    snakeElement=document.createElement('div');
    snakeElement.style.gridRowStart=e.y;
    snakeElement.style.gridColumnStart=e.x;
    if(index===0){
        snakeElement.classList.add('head')    
    }
    else{
        snakeElement.classList.add('snake')
    }
    box.appendChild(snakeElement);

    });
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    box.appendChild(foodElement);

}

// main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}; //start the game
    switch(e.key){
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break
       
    }

});