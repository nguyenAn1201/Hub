const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.port || 5000;
app.use(cors());
app.listen(port, () => console.log(`Listening on port: ${port}`));

app.get('/', (req, res) => {
    const baseUrl = "http://openweathermap.org/data/2.5/weather?q=";
    const key = "&units=imperial&appid=b6907d289e10d714a6e88b30761fae22";
    const userLocation = (url1, url2, city, country) => {
        var newUrl = url1+city+","+country+url2;
        return newUrl;
    };
    const finalUrl = userLocation(baseUrl, key, "boston", "us");

    axios.get(finalUrl)
      .then((respond) => {
          //Sending respond with data called from API
          res.send(respond.data);
          data = res.data;
      })
      .catch(error => console.log(error));
});

