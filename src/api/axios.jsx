import axios from "axios";

export default axios.create(
    {
        baseURL: 'http://localhost:3000'
    }
);
const URL_AUTH = "/auth";
const URL_UPLOAD = "/upload";
const URL_REG = "/register";
const URL_TRACES = '/traces';
export {URL_AUTH, URL_UPLOAD, URL_REG, URL_TRACES}; 

// ------------------------------------

// ".../auth" - для аутентификация
// ОЖИДАЕТ
    // JSON.stringify({"user": user, "password": password}),
    //     {
    //         headers: {'Content-Type' : 'application/json'},
    //         withCredentials: true, //не знаю зачем, но пусть будет
    //     }
// ВОЗВРАЩАЕТ ЧТО-ТО ПОДОБНОЕ
// {
//     "data": {"accessToken": "123-123-123"},
//     "status": 200 - всео ок
//               400 - неверное имя пользователя или пароль
// }

// ------------------------------------

// ".../upload" - для скидывания файла
// ОЖИТАЕТ
    // FormData(), //внутри 
    //                  accessToken - токен пользвателя для сопоставления пользвателя и файла
    //                  filename - имя файла
    //                  file - сам файл
    // {
    //     headers: {
    //         'Content-Type': 'multipart/form-data'
    // }

// ------------------------------------

// ".../register" - для регистрации
// ОЖИДАЕТ
    // JSON.stringify({"firstname": name, "lastname": familia, "reglogin": user, "password": password}),
    //     {
    //         headers: {'Content-Type' : 'application/json'},
    //         withCredentials: true, //не знаю зачем, но пусть будет
    //     }
// ВОЗВРАЩАЕТ ЧТО-ТО ПОДОБНОЕ
// {
//     "status": 200 - всео ок
//               400 - пользователь уже зарегистрирован
// }

// ------------------------------------