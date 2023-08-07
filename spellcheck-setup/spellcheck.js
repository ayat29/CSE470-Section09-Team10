const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://grammarbot-neural.p.rapidapi.com/v1/check',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'ac9903a1c0msh22c08682f303d27p18a6e4jsndd939611f7ec',
    'X-RapidAPI-Host': 'grammarbot-neural.p.rapidapi.com'
  },
  data: {
    text: 'This are some wel-written text.',
    lang: 'en'
  }
};

async function run() {
    try {
        const response = await axios.request(options);
        console.log(response.data["correction"]);
    } catch (error) {
        console.error(error);
    }
}

run()
