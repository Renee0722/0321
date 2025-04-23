let question, radio, inputBox, submitButton, result;
let table;
let correctAnswer;
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

function preload() {
  table = loadTable('questions.csv', 'csv', 'header');
}

function setup() {  //這是一個設定函數，只會執行一次
  //產生一個全視窗大小的畫布 
  createCanvas(windowWidth, windowHeight);
  //設定背景顏色f5ebe0
  background(245,235,224);

  // 題目
  question = createP('');
  question.style('font-size', '35px');
  question.style('color', '#000000');

  // 選項
  radio = createRadio();
  radio.style('font-size', '35px');
  radio.style('color', '#4a4e69');

  // 填空題文字框
  inputBox = createInput();
  inputBox.style('font-size', '35px');
  inputBox.hide();

  // 送出按鈕
  submitButton = createButton('下一題');
  submitButton.style('font-size', '35px');
  submitButton.mousePressed(nextQuestion);

  // 結果
  result = createP('');
  result.style('font-size', '35px');

  // 設定初始位置
  setElementPositions();

  // 顯示第一題
  displayQuestion();
}

function draw() {
  background(245,235,224);
  // 在視窗的中間產生一個寬為全視窗的1/2，高為全視窗的1/2，顏色為f5cac3的矩形
  fill(245, 202, 195);
  rect(windowWidth / 4, windowHeight / 4, windowWidth / 2, windowHeight / 2);
}

function displayQuestion() {  //顯示問題
  let row = table.getRow(currentQuestionIndex);
  let questionText = row.getString('question');
  let type = row.getString('type');
  correctAnswer = row.getString('answer');

  question.html(questionText);  //將問題顯示在網頁上
  radio.hide();
  inputBox.hide();
  result.html('');

  if (type === 'choice') {  //選擇題
    let options = [
      row.getString('option1'),
      row.getString('option2'),
      row.getString('option3'),
      row.getString('option4')
    ];
    radio.html('');
    options.forEach(option => radio.option(option));
    radio.show();
  } else if (type === 'fill') {  //填空題
    inputBox.value('');
    inputBox.show();
  }

  // 設定初始位置
  setElementPositions();
}

function nextQuestion() {
  let answer;
  if (radio.style('display') !== 'none') {
    answer = radio.value();
  } else if (inputBox.style('display') !== 'none') {
    answer = inputBox.value();
  }

  if (answer === correctAnswer) {
    correctCount++;
  } else {
    incorrectCount++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < table.getRowCount()) {
    displayQuestion();
  } else {
    displayResult();
  }
}

function displayResult() {
  question.html(`測驗結束！答對了 ${correctCount} 題，答錯了 ${incorrectCount} 題。`);
  radio.html('');
  inputBox.hide();
  submitButton.html('再試一次');
  submitButton.mousePressed(restartQuiz);

  // 將結果置中
  setElementPositions();
}

function restartQuiz() {
  currentQuestionIndex = 0;
  correctCount = 0;
  incorrectCount = 0;
  submitButton.html('下一題');
  submitButton.mousePressed(nextQuestion);
  displayQuestion();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setElementPositions();
}

function setElementPositions() {
  question.position(windowWidth / 2 - question.size().width / 2, windowHeight / 2 - 200);
  radio.position(windowWidth / 2 - radio.size().width / 2, windowHeight / 2 - 100);
  inputBox.position(windowWidth / 2 - inputBox.size().width / 2, windowHeight / 2 - 100);
  submitButton.position(windowWidth / 2 - submitButton.size().width / 2, windowHeight / 2);
  result.position(windowWidth / 2 - result.size().width / 2, windowHeight / 2 + 50);
}