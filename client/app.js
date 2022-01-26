let grains = [{ name: 'пшегица', time: 90 }, { name: 'кукуруза', time: 300 }];
let grainsTime = [];

class Board {
    constructor() {
        this.length = 6;
        this.width = 12;
        this.dictionary = {};
    }

    create() {
        let table = '';
        for (let i = 0; i < this.length; i++) {
            table += '<tr>';

            for (let j = 0; j < this.width; j++) {

                table += `<td><button id = '${i},${j}' class="button" onclick="onField('${i},${j}')">клетка</button></td>`;
                this.dictionary[`${i},${j}`] = 'cell';
            }
            table += '</tr>';
        }
        document.getElementById('fields').innerHTML = table;
    }

    update(gardenBed, grade) {
        //Обновление значения grade в базе, запуск таймера (создать дату если произошла посадка) и отрисовка
    }
}

let a = 0;

const onGardenBed = () => {
    if (a == 0) {
        a = 1;
    }
    else {
        a = 0;
    }
}

let newBoard = new Board();
newBoard.create();

class GardenBed {
    constructor(id, grade) {
        this.id = id
        this.grade = grade;
    }

    update(id, grade, time) {
        if (newBoard.dictionary[id].grade == "non") {
            newBoard.dictionary[id] = new GardenBed(id, grade);
            document.getElementById(id).innerHTML = `<div>${grade}</div>`;
            document.getElementById('plants').remove();
            document.getElementById('id').hidden = false;
            grainsTime.push({ id: id, grade: grade, time: time });
        }
        else {
            //добавить обработку ошибки
        }
    }
}

const onField = (id) => {
    if ((a == 1) && !(newBoard.dictionary[id] instanceof GardenBed)) {
        document.getElementById(id).innerHTML = '<div>грядка</div>'
        newBoard.dictionary[id] = new GardenBed(id, 'non');
    }
    if ((a != 1) && (newBoard.dictionary[id] instanceof GardenBed)) {
        if (newBoard.dictionary[id].grade == 'non') {
            document.getElementById('id').hidden = true;
            document.getElementById('block').innerHTML +=
                `<div id="plants"><button id="plant" class="button" onclick="onClick('${id}', 'пшеница', '20')">пшеница</button><button id="plant" class="button" onclick="onClick('${id}', 'кукуруза', '90')">кукуруза</button></div>`;
            let plantsArea = document.getElementById('plants');
            plantsArea.insertAdjacentHTML("afterbegin", '<button class="remove-button">[x]</button>');
            plantsArea.firstChild.onclick = () => {
                plantsArea.remove();
                document.getElementById('id').hidden = false;
            }
        }
        else if (newBoard.dictionary[id].grade != 'non') {
            debugger;
            const i = grainsTime.indexOf(el => el.id == id);
            const minutes = Math.floor(grainsTime[i].time / 60);
            let seconds = grainsTime[i].time % 60;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            document.getElementById(id).innerHTML += `${minutes}:${minutes}`;
        }
    }
}

const onClick = (id, grade, time) => {
    newBoard.dictionary[id].update(id, grade, time);
}

const undateCountdown = () => {
    for (let i = 0; i < grainsTime.length; i++) {
        const minutes = Math.floor(grainsTime[i].time / 60);
        let seconds = grainsTime[i].time % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        grainsTime[i].time--;
        console.log(grainsTime[i].time);
        if (grainsTime[i].time == 0) {
            document.getElementById(grainsTime[i].id).innerHTML = `<div>${grainsTime[i].grade} собрать </div>`;
            grainsTime.splice(i, 1);
        }
    }
}

setInterval(undateCountdown, 1000);