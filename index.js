let btn = document.getElementsByClassName("ApiTest");

btn[0].addEventListener("click", (e) => {
  e.preventDefault();
  console.log("vous avez cliqué");

  const APIKEY = "84e4aef03092973b527b8bfa07fe33b5";
  let city = "London";

  let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKEY}`;

  fetch(url)
    .then((res) => res.json())

    // .then((data) => console.log(data[0].name));

    .then((data) => {
      // console.log(data[0].name);

      for (let i = 0; i < data.length; i++) {
        // let resApi = document.getElementsByClassName("resAPI");
        // resApi.textContent = data[i].name;
        // resApi.innerHTML = resApi.textContent;
        // console.log(resApi.textContent);
        console.log(data[i].name);
        console.log(data[i].country);
        console.log(data[i].lat);
        console.log(data[i].lon);
      }
    });
});
