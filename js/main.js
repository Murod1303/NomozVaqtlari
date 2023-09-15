const elForm = document.querySelector(".form");
const elSelect = document.querySelector(".form__select");
const elDate = document.querySelector(".hero__date");
const elCurrunt = document.querySelector(".hero__current");
const elRealLocation =document.querySelector(".real__location");
const elHeroName = document.querySelector(".hero__title-change");
const elBtnLocationNameF = document.querySelector(".tableTime__btn-span-f")
const elBtnLocationNameS = document.querySelector(".tableTime__btn-span-s")
const elRealList = document.querySelector(".real__list");
const elTableRow = document.querySelector(".table__heading--row");
const elTemplate = document.querySelector(".template")
const fragment = new DocumentFragment()
const dataArr = []



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
    console.log(dataArr)
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
  function render(arr ,node ) {
    node.innerHTML = "";
    arr.forEach(item => {
      console.log(item);
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





