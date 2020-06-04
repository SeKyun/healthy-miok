const db = require('../data/db'); 

exports.setBloodPressureStatus = function(value_high, value_low) {
    
    let high_status = 0; 
    let low_status = 0; 
    let _status = 0;

    // 수축기 혈압 status 
    if (value_high < 70) high_status = 0; 
    else if (value_high >= 70 && value_high < 100) high_status = 1; 
    else if (value_high >= 100 && value_high < 140) high_status = 2; 
    else if (value_high >= 140 && value_high < 160) high_status = 3; 
    else if (value_high >= 160 && value_high < 200) high_status = 4; 
    else high_status = 5; 

    // 이완기 혈압 status 
    if (value_low < 40) low_status = 0; 
    else if (value_low >= 40 && value_low < 60) low_status = 1; 
    else if (value_low >= 60 && value_low < 90) low_status = 2; 
    else if (value_low >= 90 && value_low < 100) low_status = 3; 
    else if (value_low >= 100 && value_low < 120) low_status = 4; 
    else low_status = 5; 

    // high_status 와 low_status 값으로 혈압 _status 판단
    if (low_status == 0 || high_status == 0) _status = 0; 
    else if (low_status == 5 || high_status == 5) _status = 5; 
    else if (low_status == 4 || high_status == 4) _status = 4; 
    else if (low_status == 3 || high_status == 3) _status = 3; 
    else if (low_status == 1 || high_status == 1) _status = 1; 
    else _status = 2; 

    return _status; 
}