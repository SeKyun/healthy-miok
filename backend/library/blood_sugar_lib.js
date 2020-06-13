const db = require('../data/db'); 

exports.setBloodSugarStatus = function(value, when) {

    //set status
    // 저혈당 세팅 
    // 초기 저혈당 

    let status = 0; 
    
    if (value <= 90 && value > 70) {
        status = 2; 
    }
    // 저혈당 
    else if (value <= 70) {
        status = 1; 
    } 

    // 각 시점에 따른 혈당 상태 분류 
    if (when === '기상 직후' || when === '아침 식전') {
        if (value >= 90 && value <= 200) {
            status = 3; 
        }
        
        else if (value > 200 && value <= 300) {
            status = 4; 
        }
        else if (value > 300) {
            status = 5; 
        }
    }

    else if (when === '점심 식전' || when === '저녁 식전') {
        if (value >= 90 && value <= 250) {
            status = 3; 
        }
        else if (value > 250 && value <= 350) {
            status= 4; 
        }
        else if (value > 350) {
            status = 5; 
        }
    }

    else if (when === '아침 식후' || when === '점심 식후' || when === '저녁 식후') {
        // 초기 저혈당 
        if (value > 70 && value <150) {
            status = 2; 
        }
        else if (value >= 150 && value < 280) {
            status = 3; 
        }
        else if (value >= 280 && value <400) {
            status = 4; 
        }
        else if (value >= 400) {
            status = 5; 
        }
    }

    else if (when === '취침 전') {
        if (value > 70 && value <= 150) {
            status = 2; 
        }

        else if (value > 150 && value <= 280) {
            status = 3; 
        }
        else if (value > 280 && value <= 360) {
            status = 4; 
        }
        else if (value > 360) {
            status = 5; 
        }
    }

    else if (when === '새벽') {
        if (value > 70 && value <= 120) {
            status = 2; 
        }
        else if (value > 120 && value <= 250) {
            status = 3; 
        }
        else if (value > 250 && value <= 350) {
            status = 4; 
        }

        else if (value >= 350 ) {
            status = 5; 
        }
    }

    // when === 기타 
    else {
        if (value > 90 && value <= 260) {
            status =  3; 
        }
        else if (value > 260 && value <= 350) {
            status = 4; 
        }

        else if (value > 350) {
            status = 5; 
        }
    }

    return status
}