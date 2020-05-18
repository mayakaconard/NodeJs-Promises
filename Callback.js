function Engine (interface, token, request_type, external_ref_number, id, mpesa_code)
{

    var data = JSON.stringify({
        "message_validation":
        {
            "api_user": "unitmastermpesa",
            "api_password": "Ez[=8Ck@",
            "token": token
        },
        "message_route": {
            "interface": interface,
            "request_type": request_type,
            "external_ref_number": ''
        },
        "message_body": {
            "Id": id,
            "TelcoRef": mpesa_code
        }
    });
    var options = {
        'method': 'POST',
        'url': 'http://10.200.200.75:8070/api/Solid/SubmitRequest',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: data

    };


    let result = request(options, function (error, response)
    {
        let res1;
        if (error) throw new Error(error);
        res1 = response.body;
        // return res1;
        // var result = JSON.parse(response);

        // var token = result;
        console.log(response.body);
        // return result;


    });
}

var interface = 'TOKEN';
var token = '';
var request_type = ''
// var external_ref_number = external_ref_number;
var id = '';
var mpesa_code = '';
var d = Engine(interface, token, request_type, id, mpesa_code);
// console.log(d.body);