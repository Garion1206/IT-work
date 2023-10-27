    var chess = document.getElementsByClassName("chess") [0]
    var context = chess.getContext("2d")    /*得到当前棋盘的上下文 绘制二维画板*/
    context.strokeStyle="b9b9b9"

    window.onload=function(){
        drawChessBoard();
    }

    function drawChessBoard(){
        for(var i=0;i<15;i++) {
            context.moveto(15,15+i*30);    /*设置横线起始点的坐标*/
            context.lineto(15,15+i*30);    /*设置横线结束点的坐标*/
            context.stroke();              /*连接两点*/
        }
    }