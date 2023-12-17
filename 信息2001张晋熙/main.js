    var btn = document.getElementById("btn");
    var canvas = document.getElementById("chessboard");
    //通过getElementById方法获取了id为btn和chessboard的元素，分别存储在btn和canvas变量中。
    var context = canvas.getContext("2d");
    //创建一个 2D 渲染上下文，提供绘图方法和属性
    var chessMapArr = [];//记录棋盘落子情况
    var chessColor = ["black","red"];//棋子颜色
    var step = 0;//记录当前步数
    var flag = true;//游戏结束
    var checkMode = [
        [1,0],// 水平方向
        [0,1],// 竖直方向
        [1,1],// 右斜方向
        [1,-1],// 左斜方向
    ];//定义了四个方向用于检查胜利条件
    var scores = { black: 0, red: 0 };//记录玩家得分
    var scoreElement = document.getElementById("score");//将id为score的元素引用，存储在scoreElement变量中，用于后续更新得分显示


    function resetGame() {
        // 重置游戏状态，但不重置计分器
    }


    function updateTitle(newTitle) {//定义名为updateTitle的函数，此函数接受一个参数 newTitle
        document.title = newTitle;//将 newTitle 赋值给 document.title
    }


    btn.addEventListener("click",function(){             //添加了一个点击事件的处理函数
        startGame();                                     
        updateTitle("--五子棋--");
        //按钮被点击时，会依次调用startGame()函数开始游戏，updateTitle()函数更新网页标题
        var title = document.getElementById("title");
        title.innerText = "-- 五子棋 --";//通过getElementById方法获取id为title的元素，将其文本内容修改为"-- 五子棋 --"
    })

    function startGame(){//开始新游戏
        resetGame();// 不要重置计分器 scores 的代码
        updateScore();//更新游戏的得分和计分板

        for(var i=0; i<14; i++){
            chessMapArr[i]=[];
                for(var j=0;j<14; j++){
                    chessMapArr[i][j]=0;
                }
        }
        cleanChessBoard();//清空棋盘
        drawChessBoard();
        flag =false;//游戏开始
    }


    function updateScore() {
        scoreElement.innerText = "黑棋得分：" + scores.black + "，红棋得分：" + scores.red;
    }


    //绘制棋盘
    function drawChessBoard(){
        context.strokeStyle = "#b9b9b9";
        for (var i = 0; i < 14; i++){    //循环14次，画14条线
            context.beginPath();//创建一个新的路径
            context.moveTo((i+1)*30,30);//移动到x坐标为(i+1)*30，y坐标为30
            context.lineTo((i+1) * 30, canvas.height - 30);//终点坐标，canvas.height - 30 表示画布的高度减去 30
            context.closePath();//将路径的起点和终点连接起来
            context.stroke();//将路径绘制出来
            context.beginPath();
            context.moveTo(30, (i+1) * 30);//起点移动到（x,y）=(30, (i+1) * 30)
            context.lineTo(canvas.width - 30, (i+1) * 30);//终点canvas.width - 30 表示将画布的宽度减去 30
            context.closePath();
            context.stroke();
        }
    }
    //清除棋盘
    function cleanChessBoard(){
        context.fillStyle = "white";//填充图形颜色为白色
        context.fillRect(0,0, canvas.width,canvas.height);//绘制一个填充矩形，参照矩形的左上角，画布的宽度和高度
    }   

    //绘制棋子
    function drawChess(x,y,color){
        context.beginPath();
        context.arc(x,y,13.5,0,Math.PI*2,false);
        //context.arc(x, y, radius, startAngle, endAngle, anticlockwise)原点坐标（x,y），半径，起始角度，结束角度，顺/逆时针绘制
        context.closePath();
        context.fillStyle = color;//填充颜色为“color”值
        context.fill();//使用之前的填充样式
    }

    canvas.addEventListener("click",function(e){
        if (flag){
            return;// 如果游戏结束，不执行下棋操作
        }


            //判断点击范围是否越出棋盘
        if(e.offsetX < 30 || e.offsetX > 420 || e.offsetY < 30 || e.offsetY > 420){
            return;
        }

        //Math.floor向下取整
        var dx = Math.floor((e.offsetX + 15) / 30 ) * 30;
        var dy = Math.floor((e.offsetY + 15) / 30 ) * 30;
        
        if(chessMapArr[dx/30-1][dy/30-1] == 0){
            //step 为偶数，颜色为 "black"，step 为奇数，颜色为 "red"
            drawChess(dx,dy,chessColor[step % 2]);//画出棋子x,y坐标，和棋子的颜色
            chessMapArr[dx/30-1][dy/30-1]= chessColor[step % 2];//将右侧棋子的颜色赋值给左侧棋盘这个位置棋子的颜色

            //检查当前玩家是否赢了游戏
            for(var i=0;i<4;i++){
                //调用checkWin函数，传递四个参数
                checkWin(dx/30-1,dy/30-1, chessColor[step % 2],checkMode[i]);
            }
            step++;// 执行完第一步后，递增 step 的值
        } 
    });

    //胜负判断函数
    function checkWin(x,y,color,mode){
        
        var count =1;//记录分数
        for(var i=1;i<5;i++){
            //通过 chessMapArr[x + i * mode[0]] 来检查 chessMapArr 数组中这个新的横坐标位置是否存在
            if(chessMapArr[x + i * mode[0]]){
                //通过 chessMapArr[x + i * mode[0]][y + i * mode[1]] 来访问 chessMapArr 数组中这个新的位置
                if(chessMapArr[x + i * mode[0]][y + i * mode[1]] == color){
                    count++;
                }else{
                    break;
                }
            }
        }
        
        for(var j=1;j<5;j++){
            ////先检查 chessMapArr[x - j * mode[0]] 是否存在并且为真
            if(chessMapArr[x - j * mode[0]]){
                //检查 chessMapArr[x - j * mode[0]][y - j * mode[1]] 是否等于 color
                if(chessMapArr[x - j * mode[0]][y - j * mode[1]] == color){
                    count++;
                }else{
                    break;
                }
            }
        }

        // //它检查 mode 是否等于 checkMode[0]
        // if(mode == checkMode[0]){ 
        //     //输出一条消息到控制台，显示水平方向上的 count 值和 color
        //     console.log("水平方向有： " + count + "个" + color);
        // }
        // if(mode == checkMode[1]){ 
        //     console.log("竖直方向有： " + count + "个" + color);
        // }
        // if(mode == checkMode[2]){
        //     console.log("左斜方向有： " + count + "个" + color);
        // }
        // if(mode == checkMode[3]){ 
        //     console.log("右斜方向有： " + count + "个" + color);
        // }


        if(count >= 5){
            scores[color]++;
            // alert(color + "you habe win!");
            var title = document.getElementById("title");
            title.innerText = color + "获胜！";
            flag = true;
            updateScore();

        }

    }


