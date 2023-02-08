const leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const commonYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const thisMonthAndYear = document.querySelector("#thisMonthAndYear");
const thisMonth = document.querySelector("#thisMonth");
const thisYear = document.querySelector("#thisYear");

// 윤년 여부 판별 함수
const checkLeap = function (year) {
  if (year % 4 === 0) {
    if (year % 100 === 0 && year % 400 !== 0) {
      return 'commonYear';
    } else return leapYear;
  } else return commonYear;
};

// 초기화면 월 년
const options = {year: 'numeric', month: 'long'};
let presentMonthAndYear = new Date().toLocaleDateString('en-US', options).split(' ');
const presentMonthStr = presentMonthAndYear[0];
const presentYearStr = presentMonthAndYear[1];
//초기 월 년
thisMonth.innerHTML = presentMonthStr;
thisYear.innerHTML = Number(presentYearStr);

let monthData = `${thisYear.innerHTML}-${monthArr.indexOf(thisMonth.innerHTML) + 1}-01`;
let start = new Date(monthData).getDay(); // 1일의 요일 인덱스

// 현재 month의 마지막 날은 몇 일?
let year = Number(thisYear.innerHTML);
let monthIdx = monthArr.indexOf(thisMonth.innerHTML);
let lastDate = checkLeap(year)[monthIdx];
// console.log(lastDate);

//초기화면 달력 생성
for (let i = 1; i <= 6; i++) {
  const tr = document.createElement('tr');
  const tbody = document.querySelector('tbody');
  tr.id = 'week' + i.toString();
  tbody.appendChild(tr);
}
createCalendar();

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

function goLast() {
  for (let i = 1; i <= 6; i++) {
    const week = document.querySelector(`#week${i}`);
    week.remove();
  }
  for (let i = 1; i <= 6; i++) {
    const tr = document.createElement('tr');
    const tbody = document.querySelector('tbody');
    tr.id = 'week' + i.toString();
    tbody.appendChild(tr);
  }
  if (monthIdx === 0) {
    thisYear.innerHTML -= 1;
    monthIdx = monthArr.length;
  }
  thisMonth.innerHTML = monthArr[monthIdx - 1];
  monthIdx -= 1;

  monthData = `${thisYear.innerHTML}-${monthArr.indexOf(thisMonth.innerHTML) + 1}-01`;
  start = new Date(monthData).getDay(); // 1일의 요일 인덱스
  year = Number(thisYear.innerHTML);
  monthIdx = monthArr.indexOf(thisMonth.innerHTML);
  lastDate = checkLeap(year)[monthIdx];
  createCalendar();
}

function goNext() {
  for (let i = 1; i <= 6; i++) {
    const week = document.querySelector(`#week${i}`);
    week.remove();
  }
  for (let i = 1; i <= 6; i++) {
    const tr = document.createElement('tr');
    const tbody = document.querySelector('tbody');
    tr.id = 'week' + i.toString();
    tbody.appendChild(tr);
  }
  if (monthIdx === 11) {
    thisYear.innerHTML = Number(thisYear.innerHTML) + 1;
    monthIdx = -1;
  }
  thisMonth.innerHTML = monthArr[monthIdx + 1];
  monthIdx += 1;
  
  monthData = `${thisYear.innerHTML}-${monthArr.indexOf(thisMonth.innerHTML) + 1}-01`;
  start = new Date(monthData).getDay(); // 1일의 요일 인덱스
  year = Number(thisYear.innerHTML);
  monthIdx = monthArr.indexOf(thisMonth.innerHTML);
  lastDate = checkLeap(year)[monthIdx];
  createCalendar();
}

const lastBtn = document.querySelector('#lastBtn');
lastBtn.addEventListener('click', goLast);
const nextBtn = document.querySelector('#nextBtn');
nextBtn.addEventListener('click', goNext);