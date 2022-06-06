const express = require("express");
const app = express();
const Instagram = require("instagram-web-api");
require('dotenv').config();
// const {IgApiClient} = require("instagram-private-api")
// const {sample} = require("lodash")

const port = process.env.PORT || 4000;
const FileCookiesStore = require("tough-cookie-filestore2")
const cookieStore = new FileCookiesStore("./cookies.json")
const client = new Instagram({
            username:process.env.INSTAGRAM_USERNAME,
            password:process.env.INSTAGRAM_PASSWORD,
            cookieStore
        })
const instagramPost = async () =>{
  await client.uploadPhoto({
    photo:"./assets/01-1200x1200.jpg",
    caption:"Zero Two: Bunny Ver.",
    post:"feed",
  }).then(async (res)=>{
    const media = res.media;
    console.log(`http://instagram.com/p/${media.code}`);
    await client.addComment({
      mediaId:media.id,
      text:"test post"
    })
  })
}
const loginFunction = async ()=> {
  console.log("login ...");
  await client.login().then(()=>{
    console.log("sukses!!!");
  }).catch((err)=>{
    console.log("error!!!");
    console.log(err);
  })
}
loginFunction()
instagramPost()
// const ig = new IgApiClient();
// ig.state.generateDevice(process.env.INSTAGRAM_USERNAME);
// (async () => {
//     // Execute all requests prior to authorization in the real Android application
//     // Not required but recommended
//     await ig.simulate.preLoginFlow();
//     const loggedInUser = await ig.account.login(process.env.INSTAGRAM_USERNAME, process.env.INSTAGRAM_PASSWORD);
//     // The same as preLoginFlow()
//     // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
//     process.nextTick(async () => await ig.simulate.postLoginFlow());
//     // Create UserFeed instance to get loggedInUser's posts
//     const userFeed = ig.feed.user(loggedInUser.pk);
//     const myPostsFirstPage = await userFeed.items();
//     // All the feeds are auto-paginated, so you just need to call .items() sequentially to get next page
//     const myPostsSecondPage = await userFeed.items();
//     console.log(loggedInUser,userFeed);
//     await ig.media.like({
//       // Like our first post from first page or first post from second page randomly
//       mediaId: sample([myPostsFirstPage[0].id, myPostsSecondPage[0].id]),
//       moduleInfo: {
//         module_name: 'profile',
//         user_id: loggedInUser.pk,
//         username: loggedInUser.username,
//       },
//       d: sample([0, 1]),
//     });
//   })();
app.listen(port , ()=>{
    console.log(`listen port ${port} ...`);
})