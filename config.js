module.exports = {
  // crypto token from bot
  token: {
    iv: '9d24671c3ef8b4f3564a883aec6c8857',
    content: '475c1ae30d68f4c3b33cc929ff510824f3b6ec416111cc043735db4b7503ce6c404a77b70f00ab75d40c45468a782b10027a051c791b976e17f246'
  },

    prefix: "v-", // default prefix
    database: "mongodb+srv://guardian:ASDFasdf1234@cluster0.i86ba.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", // link from mongodb
    clientId: "913522072947408897", //client id from bot
    clientSecret: "dr-aKbTUZwLgZbBzcLjqzMW4yM852eXi", // client secret from bot
    callbackurl: "/api/auth/discord/redirect", // callback
    port: 8000, // port
    FRONTEND_URL: "https://shroom-website.herokuapp.com/" // Front-End URL
}