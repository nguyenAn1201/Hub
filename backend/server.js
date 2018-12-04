'use strict';
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const snoowrap = require('snoowrap');
require('dotenv').config();

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
    var data = null;
    axios.get(finalUrl)
      .then((respond) => {
          //Sending respond with data called from API
          res.write(JSON.stringify(respond.data), (err) => {res.end()});
          data = res.data;
          console.log("Data fetched");
      })
      .catch(error => console.log(error));
});


app.get('/reddit', (req, res) => {
    const r = new snoowrap({
        userAgent: process.env.USER_AGENT,
        clientId: process.env.SECRET_CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refeshToken: process.env.REFRESH_TOKEN,
        username: process.env.REDDIT_USERNAME,
        password: process.env.REDDIT_PASSWORD
    })

    var postsArray = [];

    r.getHot({limit: 25}).map(post => {
        var title = post.title;
        var subreddit = post.subreddit_name_prefixed;
        var thumbnail = post.thumbnail;
        var author = post.author.name;
        var permaLink = post.permalink; //link begins with /r so remember to append reddit.com before this String
        var url = post.url;
        var domain = post.domain;
        var result = {
            title, 
            subreddit,
            author, 
            thumbnail, 
            permaLink,
            url,
            domain
        }
        postsArray.push(result);
        
        //console.log("Reddit posts fetched");
        console.log(post);
    })
    .then((respond) => res.write(JSON.stringify(postsArray), (err)=>{res.end()}))
    .catch(err => console.log(err))
});