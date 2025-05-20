//начала команды, задать мин/макс
let minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
let maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));

minValue = validateNumber(minValue, 0);
maxValue = validateNumber(maxValue, 100);

// проверка вводимых чисел
function validateNumber(input, defaultValue = 10) {
  if (
    typeof input === 'number' &&
    !isNaN(input) &&
    isFinite(input) &&
    input % 1 === 0
  ) {
    // огран значений до +-1000
    return input > 1000 ? 999 : input < -1000 ? -999 : input;
  } else {
    return defaultValue;
  }
}

alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

// счётких ходов
const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

// получение ответа
orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${answerNumber }?`;

// обработка событий кнопки заново
document.getElementById('btnRetry').addEventListener('click', function () {
    if (gameRun = true||false ){
        location.reload()
    }
})

// обработка событий кнопки больше
document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;

            const questionVariants = [
                `Вы загадали число ${answerNumber}?`,
                `Может быть, это число ${answerNumber}?`,
                `Я думаю, это ${answerNumber}. Верно?`,
                `На этот раз попробую ${answerNumber}. Угадал?`,
                `Это точно ${answerNumber}`
            ];

            const randomIndex = Math.floor(Math.random() * questionVariants.length);
            const randomQuestion = questionVariants[randomIndex];
            answerField.innerText = randomQuestion;
            
        }
    }
})

// обработка событий кнопки меньше
document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
            // ограничение на выход в отрицательный диапазон
        } else {
            const newMax = answerNumber - 1;
            if (newMax < minValue) {
                answerField.innerText = `Число не может быть меньше ${minValue}!\n\u{1F928}`;
                gameRun = false;
            } else {
                maxValue = newMax;
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;

                const questionVariants = [
                    `Вы загадали число ${answerNumber}?`,
                    `Может быть, это число ${answerNumber}?`,
                    `Я думаю, это ${answerNumber}. Верно?`,
                    `На этот раз попробую ${answerNumber}. Угадал?`,
                    `Это точно ${answerNumber}`
                ];

                const randomIndex = Math.floor(Math.random() * questionVariants.length);
                const randomQuestion = questionVariants[randomIndex];
                answerField.innerText = randomQuestion;
            }
        }
    }
})

// обработка событий кнопки верно
document.getElementById('btnEqual').addEventListener('click', function() {
    if (gameRun) {
        const victoryMessages = [
            `Я угадал! Это число ${answerNumber} \u{1F60E}`,
            `Элементарно! Ваше число — ${answerNumber} \u{1F9D0}`,
            `Вот оно — загаданное число ${answerNumber}! \u{1F60F}`
        ];

        // берём случайный элемент массива
        const randomMessage = victoryMessages[Math.floor(Math.random() * victoryMessages.length)];
        
        answerField.innerText = randomMessage;
        gameRun = false;
    }
});
