var canvas = document.getElementById("chessboard");
var context = canvas.getContext("2d");

//绘制棋盘
function drawChessBoard() {
    for(var i=0;i<15;i++){
        context.beginPath();
        ccontext.moveTo((i+1) * 30, 30);
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