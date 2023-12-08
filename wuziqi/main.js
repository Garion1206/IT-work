var btn = document.getElementById("btn");
var canvas = document.getElementById("chessboard");
var context = canvas.getContext("2d");
var chessMapArr = [];
var chessColor = ["black","red"];
var step = 0;
var flag = true;
var checkMode = [
    [1,0],[0,1],[1,1],[1,-1],
];



function updateTitle(newTitle) {
    document.title = newTitle;
}

btn.addEventListener("click",function(){
    startGame();
    updateTitle("--五子棋--");
    var title = document.getElementById("title");
    title.innerText = "-- 五子棋 --";
})

function startGame(){
    for(var i=0; i<14; i++){
        chessMapArr[i]=[];
            for(var j=0;j<14; j++){
                chessMapArr[i][j]=0;
            }
    }
    cleanChessBoard();
    drawChessBoard();
    flag =false;
}

function drawChessBoard(){
    context.strokeStyle = "#b9b9b9";
    for (var i = 0; i < 14; i++){
        context.beginPath();
        context.moveTo((i+1)*30,30);
        context.lineTo((i+1) * 30, canvas.height - 30);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(30, (i+1) * 30);
        context.lineTo(canvas.width - 30, (i+1) * 30);
        context.closePath();
        context.stroke();
    }
}

function cleanChessBoard(){
    context.fillStyle = "white";
    context.fillRect(0,0, canvas.width,canvas.height);
}

function drawChess(x,y,color){
    context.beginPath();
    context.arc(x,y,13.5,0,Math.PI*2,false);
    context.closePath();
    context.fillStyle = color;
    context.fill();
}

canvas.addEventListener("click",function(e){
    if (flag){
        // alert("Game Over~");
        return;
    }
    if(e.offsetX < 30 || e.offsetX > 420 || e.offsetY < 30 || e.offsetY > 420){
        return;
    }
    var dx = Math.floor((e.offsetX + 15) / 30 ) * 30;
    var dy = Math.floor((e.offsetY + 15) / 30 ) * 30;
    if(chessMapArr[dx/30-1][dy/30-1] == 0){
        drawChess(dx,dy,chessColor[step % 2]);
        chessMapArr[dx/30-1][dy/30-1]= chessColor[step % 2];
        for(var i=0;i<4;i++){
            checkWin(dx/30-1,dy/30-1, chessColor[step % 2],checkMode[i]);
        }
        step++;
    } 
});

function checkWin(x,y,color,mode){
    var count =1;
    for(var i=1;i<5;i++){
        if(chessMapArr[x + i * mode[0]]){
            if(chessMapArr[x + i * mode[0]][y + i * mode[1]] == color){
                count++;
            }else{
                break;
            }
        }
    }
    
    for(var j=1;j<5;j++){
        if(chessMapArr[x - j * mode[0]]){
            if(chessMapArr[x - j * mode[0]][y - j * mode[1]] == color){
                count++;
            }else{
                break;
            }
        }
    }
    if(mode == checkMode[0])
    { console.log("水平方向有： " + count + "个" + color);}
    if(mode == checkMode[1])
    { console.log("竖直方向有： " + count + "个" + color);}
    if(mode == checkMode[2])
    { console.log("左斜方向有： " + count + "个" + color);}
    if(mode == checkMode[3])
    { console.log("右斜方向有： " + count + "个" + color);}


    if(count >= 5){
        // alert(color + "you habe win!");
        var title = document.getElementById("title");
        title.innerText = color + "获胜！";
        flag = true;


    }

}