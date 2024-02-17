import axios from 'axios';

const BASE_URL = 'https://online-code-compiler.p.rapidapi.com/v1';

const options = {
    method: 'POST',
    url: 'https://online-code-compiler.p.rapidapi.com/v1/',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'c981b75a76msh499a81f4d6afbb6p1fc349jsn0a5969d73e8e',
      'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
    },
    data: {
      language: 'python3',
      version: 'latest',
      code: 'print("Hello, World!");',
      input: null
    }
  };

export const fetchFromAPI = async ({lang,code,input}) => {
    options.data.code=code
    options.data.language=lang
    options.data.input=input
    console.log(options.data.language)
    const response = await axios.request(options);

    console.log(response)

    return response.data;
}

// https://rapidapi.com/Glavier/api/online-code-compiler