let c1 = ["#ccc5b9", "#ede0d4", "#e0e1dd"];
let c2 = ["#252422", "#212922", "#433e3f", "#141b41"];

let shapes = []; // 儲存所有的形狀物件
let score = 0; // 記錄碰到螢幕邊緣的次數

function setup() {
  createCanvas(windowWidth, windowHeight); // 讓畫布填滿整個視窗
  let scoreBoard = createDiv('你現在的分數: 0'); // 創建記分板
  scoreBoard.style('position', 'fixed'); // 固定在左上角
  scoreBoard.style('top', '10px');
  scoreBoard.style('left', '10px');
  scoreBoard.style('background-color', '#FFFFFF'); // 白色背景
  scoreBoard.style('padding', '5px');
  scoreBoard.style('border-radius', '5px');
  
  for (let i = 0; i < 100; i++) { // 創建100個形狀物件
    let shape = new Shape(random(width), random(height), random(-3, 3), random(-3, 3));
    shapes.push(shape);
  }
}

function draw() {
  background("#FFFFFF");

  for (let i = 0; i < shapes.length; i++) {
    shapes[i].move(); // 移動每個形狀物件
    shapes[i].display(); // 顯示每個形狀物件
    
    // 檢查是否碰到螢幕邊緣
    if (shapes[i].checkEdge() && !shapes[i].counted) {
      score++;
      shapes[i].counted = true;
      updateScore();
    }
  }
}

class Shape {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx; // x方向速度
    this.dy = dy; // y方向速度
    this.diameter = random(80, 100); // 形狀大小
    this.shape_num = int(random(3)); // 隨機選擇形狀
    this.counted = false; // 是否已計算分數
  }

  move() {
    this.x += this.dx; // 更新x位置
    this.y += this.dy; // 更新y位置

    // 碰到螢幕邊緣時反彈
    if (this.x <= 0 || this.x >= width) {
      this.dx *= -1;
    }
    if (this.y <= 0 || this.y >= height) {
      this.dy *= -1;
    }
  }
  
  // 檢查是否碰到螢幕邊緣
  checkEdge() {
    return (this.x <= 0 || this.x >= width || this.y <= 0 || this.y >= height);
  }

  display() {
    push();
    translate(this.x, this.y);

    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.5) {
      let r = random(this.diameter / 2.5, this.diameter / 2);
      let xr = r * cos(a);
      let yr = r * sin(a);
      noStroke();
      fill(random(c1));
      vertex(xr, yr);
    }
    endShape(CLOSE);

    textAlign(CENTER, CENTER);
    textSize(this.diameter / 2);
    noStroke();
    fill(random(c2));

    if (this.shape_num == 0) {
      text("ї", 0, -this.diameter / 5);
      text("-", 0, this.diameter / 12);
    } else if (this.shape_num == 1) {
      text("Ё", 0, -this.diameter / 10);
    } else if (this.shape_num == 2) {
      text("ё", 0, -this.diameter / 5);
    }
    pop();
  }
}

// 更新分數
function updateScore() {
  let scoreBoard = select('div');
  scoreBoard.html('你現在的分數: ' + score);
}
