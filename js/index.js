let btn = document.getElementsByClassName("ApiTest");

const getValue = () => {
  let input = document.getElementById("name").value;

  btn[0].addEventListener("click", (e) => {
    e.preventDefault();
    console.log("vous avez cliqué");

    const APIKEY = "84e4aef03092973b527b8bfa07fe33b5";

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${APIKEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
        console.log(data[0].country);
        console.log(data[0].state);
        console.log(data[0].lat);
        console.log(data[0].lon);

        const htmlValue = document.querySelector(".hautDePage__ville");
        htmlValue.textContent = data[0].name;

        // for (let i = 0; i < data.length; i++) {
        //   // let resApi = document.getElementsByClassName("resAPI");
        //   // resApi.textContent = data[i].name;
        //   // resApi.innerHTML = resApi.textContent;
        //   // console.log(resApi.textContent);
        //   console.log(data[i].name);
        //   console.log(data[i].country);
        //   console.log(data[i].lat);
        //   console.log(data[i].lon);

        //   const test = document.querySelector(".resAPI");
        //   console.log(test);
        //   test.textContent = data[i].name;

        //   let latitude = data[i].lat;
        //   let longitude = data[i].lat;

        //   fetch(
        //     `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`
        //   )
        //     .then((res) => res.json())
        //     .then((data) => {
        //       console.log(data);
        //     });
        // }
      });
  });
};
