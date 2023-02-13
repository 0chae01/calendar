const leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const commonYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const thisMonthAndYear = document.querySelector("#thisMonthAndYear");
const thisMonth = document.querySelector("#thisMonth");
const thisYear = document.querySelector("#thisYear");
const selectedWhatDay = document.getElementById('selected-whatDay');
const selectedDate = document.getElementById('selected-date');
// 윤년 여부 판별 함수
const checkLeap = function (year) {
  if (year % 4 === 0) {
    if (year % 100 === 0 && year % 400 !== 0) {
      return 'commonYear';
    } else return leapYear;
  } else return commonYear;
};
// 현재 연월 받아오기
const options = {year: 'numeric', month: 'long'};
const presentMonthAndYear = new Date().toLocaleDateString('en-US', options).split(' ');
const presentMonthStr = presentMonthAndYear[0];
const presentYearStr = presentMonthAndYear[1];
// 초기화면 월 년 출력
thisMonth.innerHTML = presentMonthStr;
thisYear.innerHTML = Number(presentYearStr);

let monthData; // 'yy-mm-01'형식
let start; // 1일의 요일 인덱스
let year; // yyyy
let monthIdx; // 현재 출력되어 있는 월의 monthArr 인덱스
let lastDate; // 현재 연도에서 현재 month의 마지막 날

function getInfo() {
  monthData = `${thisYear.innerHTML}-${monthArr.indexOf(thisMonth.innerHTML) + 1}-01`;
  start = new Date(monthData).getDay();
  year = Number(thisYear.innerHTML);
  monthIdx = monthArr.indexOf(thisMonth.innerHTML);
  lastDate = checkLeap(year)[monthIdx];
}

function addWeeks() {
  for (let i = 1; i <= 6; i++) {
    const tr = document.createElement('tr');
    const tbody = document.querySelector('tbody');
    tr.id = 'week' + i.toString();
    tbody.appendChild(tr);
  }
}

function removeWeeks() {
  for (let i = 1; i <= 6; i++) {
    const week = document.querySelector(`#week${i}`);
    week.remove();
  }
}

function createCalendar() {
  let cnt = 0;
  for (let i = 1; i <= start; i++) {
    const week = document.querySelector('#week1');
    const td = document.createElement('td');
    week.appendChild(td);
    td.innerHTML = ' ';
    cnt += 1;
  }
  for (let i = 1; i <= 6; i++) {
    if (cnt === lastDate + start) break;
    for (let j = 1; j <= lastDate; j++) {
      const week = document.querySelector(`#week${i}`);
      const td = document.createElement('td');
      week.appendChild(td);
      td.id = j;
      td.innerHTML = j;
      cnt += 1;
      if (cnt % 7 === 0) {
        i++;
        continue;
      }
    }
  }
}

function setStyle() {
  for (let i = 1; i <= lastDate; i++) {
    const dateBtn = document.getElementById(i);
    // 각 날짜 버튼 둥글게
    dateBtn.style.borderRadius = '10px';
    // mouseover, mouseout color 설정
    const setBackColorWhite = () => dateBtn.style.backgroundColor = 'white';
    const setBackColorLightgray = () => dateBtn.style.backgroundColor = 'lightgray';
    dateBtn.addEventListener('mouseover', setBackColorLightgray);
    dateBtn.addEventListener('mouseout', setBackColorWhite);

    // 다른 날짜 클릭 시 skyblue color 없애기
    const changeColor = () => {
      for (let i = 1; i <= lastDate; i++) {
        const dateBtn = document.getElementById(i);
        dateBtn.style.backgroundColor = 'white';
      }
      dateBtn.removeEventListener('mouseover', setBackColorLightgray);
      dateBtn.removeEventListener('mouseout', setBackColorWhite);
      dateBtn.style.backgroundColor = 'skyblue';
    };
    dateBtn.addEventListener('click', changeColor);

    // 날짜 클릭 시 왼편 출력
    const showDate = (num) => {
      const selectedFullDate = `${thisYear.innerHTML}-${monthArr.indexOf(thisMonth.innerHTML) + 1}-${num}`;
      selectedWhatDay.innerHTML = dayArr[new Date(selectedFullDate).getDay()];
      selectedDate.innerHTML = num;
      if (selectedWhatDay.innerHTML === 'Sunday') {
        selectedWhatDay.style.color = 'red';
        selectedDate.style.color = 'red';
      } else if (selectedWhatDay.innerHTML === 'Saturday') {
        selectedWhatDay.style.color = 'darkblue';
        selectedDate.style.color = 'darkblue';
      } else {
        selectedWhatDay.style.color = 'black';
        selectedDate.style.color = 'black';
      }
    };
    dateBtn.addEventListener('click', () => showDate(i));
  }
}

//초기화면 달력 생성
getInfo();
addWeeks();
createCalendar();
selectedWhatDay.innerHTML = dayArr[new Date().getDay()];
selectedDate.innerHTML = new Date().getDate();
const today = document.getElementById(new Date().getDate());
today.style.backgroundColor = 'skyblue';
today.style.border = '2px solid skyblue';
setStyle();

function goLast() {
  removeWeeks();
  addWeeks();
  if (monthIdx === 0) {
    thisYear.innerHTML -= 1;
    monthIdx = monthArr.length;
  }
  thisMonth.innerHTML = monthArr[monthIdx - 1];
  monthIdx -= 1;
  getInfo();
  createCalendar();
  if (thisMonth.innerHTML === presentMonthStr && thisYear.innerHTML === presentYearStr) {
    const today = document.getElementById(new Date().getDate());
    today.style.border = '2px solid skyblue';
  }
  setStyle();
}

function goNext() {
  removeWeeks();
  addWeeks();
  if (monthIdx === 11) {
    thisYear.innerHTML = Number(thisYear.innerHTML) + 1;
    monthIdx = -1;
  }
  thisMonth.innerHTML = monthArr[monthIdx + 1];
  monthIdx += 1;
  getInfo();
  createCalendar();
  if (thisMonth.innerHTML === presentMonthStr && thisYear.innerHTML === presentYearStr) {
    const today = document.getElementById(new Date().getDate());
    today.style.border = '2px solid skyblue';
  }
  setStyle();
}

const lastBtn = document.querySelector('#lastBtn');
lastBtn.addEventListener('click', goLast);
const nextBtn = document.querySelector('#nextBtn');
nextBtn.addEventListener('click', goNext);

// 오늘 날짜 - 일요일은 red, 토요일은 darkblue 나머지는 black
if (selectedWhatDay.innerHTML === 'Sunday') {
  selectedWhatDay.style.color = 'red';
  selectedDate.style.color = 'red';
} else if (selectedWhatDay.innerHTML === 'Saturday') {
  selectedWhatDay.style.color = 'darkblue';
  selectedDate.style.color = 'darkblue';
} else {
  selectedWhatDay.style.color = 'black';
  selectedDate.style.color = 'black';
}