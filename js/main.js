const elForm = document.querySelector(".form");
const elSelect = document.querySelector(".form__select");
const elDate = document.querySelector(".hero__date");
const elCurrunt = document.querySelector(".hero__current");
const elRealLocation =document.querySelector(".real__location");
const elHeroName = document.querySelector(".hero__title-change");
const elBtnWrapper = document.querySelector(".tableTime__inner")
const elBtnWeek =document.querySelector(".tableTime__btn--week")
const elBtnMonth =document.querySelector(".tableTime__btn--month")
const elBtnLocationNameF = document.querySelector(".tableTime__btn-span-f")
const elBtnLocationNameS = document.querySelector(".tableTime__btn-span-s")
const elTable = document.querySelector(".tableTime__table")
const elRealList = document.querySelector(".real__list");
const elTableBody = document.querySelector(".table__body")
const elTableRow = document.querySelector(".table__row")
const fragment = new DocumentFragment()
const fragmentTable = new DocumentFragment()
const dataArr = []
const dataArrT = []



function dateCurrent() {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, 0);
  const month = date.getMonth().toString().padStart(2, 0);
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, 0);
  const minut = date.getMinutes().toString().padStart(2, 0);
  const second = date.getSeconds().toString().padStart(2, 0);
  
  console.log(day, month, year, hour, minut, second);
  elDate.textContent = `${day}.${month}.${year}` 
  elCurrunt.textContent = `${hour}:${minut}:${second}` 

}
dateCurrent()
setInterval(dateCurrent, 1000)

const dateForFetch = new Date()
const monthFetch = dateForFetch.getMonth()+1
console.log(monthFetch);


elSelect.addEventListener("change", ms=>{
  ms.preventDefault()
  const elSelectValue=elSelect.value
  fetchAPI(`https://islomapi.uz/api/present/day?region=${elSelectValue}`)
  elBtnLocationNameS.textContent = elSelectValue
  elBtnLocationNameF.textContent = elSelectValue
  elRealLocation.textContent = elSelectValue
  elHeroName.textContent = elSelectValue
})



async function fetchAPI(url) {
  try {
    const res = await fetch(url)
    const data = await res.json()
    dataArr.push(data)
    render(dataArr, elRealList)
    dataArr.splice(data, 1)
    return dataArr
  } catch (error) {
    console.log(error);
  }
}
fetchAPI(`https://islomapi.uz/api/present/day?region=Toshkent`)


// template 
const tempFrag = document.querySelector(".template").content;

function render(arr, node) {
  node.innerHTML = "";
  arr.forEach(item => {
    
    const tempClone = tempFrag.cloneNode(true);
    
    // template inside
    tempClone.querySelector(".pray__time-bomdod").textContent = item.times.tong_saharlik
    tempClone.querySelector(".pray__time-quyosh").textContent = item.times.quyosh
    tempClone.querySelector(".pray__time-peshin").textContent = item.times.peshin
    tempClone.querySelector(".pray__time-asr").textContent = item.times.asr
    tempClone.querySelector(".pray__time-shom").textContent = item.times.shom_iftor
    tempClone.querySelector(".pray__time-hufton").textContent = item.times.hufton
    
    fragment.appendChild(tempClone)
  });
  elRealList.appendChild(fragment)
}
render(dataArr, elRealList);




/* week and month */
elBtnWrapper.addEventListener("click", evt=>{
  if (evt.target.matches(".tableTime__btn--week")) {
    async function fetchWeek(url) {
      try {
        const res = await fetch(`${url}`);
        const dataT = await res.json()
        renderTable(dataT, elTableBody)
        console.log(dataT);
      } catch (error) {
        console.log(error);
      }
      elTable.style.display = "inline-table"
    }
    fetchWeek(`https://islomapi.uz/api/present/week?region=${elSelect.value}`)
  }else if (evt.target.matches(".tableTime__btn--month")) {
    async function fetchMonth(url) {
      try {
        const res = await fetch(`${url}`)
        const dataT = await res.json()
        renderTable(dataT, elTableBody)
        console.log(dataT);
      } catch (error) {
        console.log(error);
      }
      elTable.style.display = "inline-table"
      
    }
    fetchMonth(`https://islomapi.uz/api/monthly?region=${elSelect.value}&month=${monthFetch}`)
  }
})

const tempFragWeek = document.querySelector(".temp__table").content
function renderTable(arrT, nodeT) {
  nodeT.innerHTML = "";
  arrT.forEach(item => {
    const tempTableClone = tempFragWeek.cloneNode(true)
    tempTableClone.querySelector(".table__haeding-weekday").textContent = item.weekday
    tempTableClone.querySelector(".table__data-day").textContent = item.date.slice(0, 10)
    tempTableClone.querySelector(".table__data-bomdod").textContent = item.times.tong_saharlik
    tempTableClone.querySelector(".table__data-quyosh").textContent = item.times.quyosh
    tempTableClone.querySelector(".table__data-peshin").textContent = item.times.peshin
    tempTableClone.querySelector(".table__data-asr").textContent = item.times.asr
    tempTableClone.querySelector(".table__data-shom").textContent = item.times.shom_iftor
    tempTableClone.querySelector(".table__data-hufton").textContent = item.times.hufton
    fragmentTable.appendChild(tempTableClone)
  });
  elTableBody.appendChild(fragmentTable)
  
}