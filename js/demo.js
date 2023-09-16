async function getData(url, day, week, month){
  fetch(`${url}`).then(res => res.json()).then(res => {
    if(day){
      renderDay(res)
    }
    if(week){
      renderDays(res)
    }
    if(month){
      renderDays(res)
    }
  })
}


function renderDay(data){
  console.log(data)
  // Your day code here ...
}

function renderDays(data, ){
  data.forEach(item => {
    const times = item.times
    console.log(times)
  })
  // Your Week code here  ...
}


getData("https://islomapi.uz/api/present/day?region=Toshkent", false) // day
getData("https://islomapi.uz/api/present/week?region=Toshkent", false, false) // week
getData("https://islomapi.uz/api/monthly?region=Toshkent&month=4", false, false, true) // month