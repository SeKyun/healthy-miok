const request = require('request-promise'); 
const axios = require('axios');
const KAKAO_REST_API_KEY = 'KakaoAK 89b667c46778ddf37b089136557f0da3'; 
const res_handler = require('../library/status_handler'); 

exports.get_img_url = async function (key_word) {
    // const option = {
    //     query: key_word ,
    //     headers: {
    //         'Authorization': KAKAO_REST_API_KEY
    //     }
    // }
    // const body = await axios.get(
    //     'https://dapi.kakao.com/v2/search/image?page=1', {}, option
    // )
    // // const body = await axios.get({
    // //     uri: 'https://dapi.kakao.com/v2/search/image?page=1&size=50',
    // //     qs: option,
    // //     headers: {
    // //         'Authorization': KAKAO_REST_API_KEY
    // //     }
    // // });

    // let json = JSON.parse(body) //json으로 파싱
    // console.log("이것이 나와야 함!!!!" + json.documents[0].image_url);
    // console.log("2");
    // let image_url = json.documents[0].image_url; 
    // return image_url;

    return new Promise(function(rejolve, reject) {
        const option = {
            query: key_word
            }
            
            request.get({
                uri: 'https://dapi.kakao.com/v2/search/image?page=1&size=50',
                qs: option,
                headers: {
                    'Authorization': KAKAO_REST_API_KEY
                }
            }, function (err, res, body) {
                let json = JSON.parse(body) //json으로 파싱
                console.log("이것이 나와야 함!!!!" + json.documents[0].image_url);
                console.log("2");
                let image_url = json.documents[0].image_url; 
                rejolve(image_url)
            })
    })

}

// const get_img_url = (key_word) => {
//     const option = {
//         query: key_word
//     }
//      request.get({
//         uri: 'https://dapi.kakao.com/v2/search/image?page=1&size=50',
//         qs: option,
//         headers: {
//             'Authorization': KAKAO_REST_API_KEY
//         }
//     }, function (err, res, body){
//         let json = JSON.parse(body) //json으로 파싱
//         console.log(json); 
//         // console.log("이것이 나와야 함!!!!" + json.documents[0].image_url);
//         // console.log("2");
//         // let image_url = json.documents[0].image_url; 
//         // return image_url; 
//     })
// }
// // exports.get_img_url = async function (key_word) {
// //     const option = {
// //         query: key_word
// //     }
// //     await request.get({
// //         uri: 'https://dapi.kakao.com/v2/search/image?page=1&size=50',
// //         qs: option,
// //         headers: {
// //             'Authorization': KAKAO_REST_API_KEY
// //         }
// //     }, function (err, res, body, next){
// //         let json = JSON.parse(body) //json으로 파싱
// //         console.log("이것이 나와야 함!!!!" + json.documents[0].image_url);
// //         console.log("2");
// //         let image_url = json.documents[0].image_url; 
// //         return image_url; 
// //     })
// // }; 

// module.exports = get_img_url; 