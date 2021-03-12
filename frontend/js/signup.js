function signup() {
    //Email verification
    function IsEmail(email) {
        var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!regex.test(email)) return false;
        else return true;
    }


    var name = String(document.getElementsByClassName("form")[0].value);
    var emailid = String(document.getElementsByClassName("form")[1].value);
    var password = String(document.getElementsByClassName("form")[2].value);
    var hpname= String(document.getElementsByClassName("form")[3].value);
    var hpadd= String(document.getElementsByClassName("form")[4].value);
    var timing =String(document.getElementsByClassName("form")[5].value);
    var fee=  String(document.getElementsByClassName("form")[6].value);
    var spec= document.getElementById("slist").value;
    var loc= document.getElementById("loc").value;


    console.log(name,emailid,password,spec,hpname,hpadd,loc,timing,fee);
    var c = 9;
    
    if (name == "") {
        document.getElementById("namealert").innerHTML = `Please Enter the name!`;
        c--;
    } else document.getElementById("namealert").innerHTML = ``;
    if (emailid == "") {
        document.getElementById("emailalert").innerHTML = `Please Enter the email!`;
        c--;
    } else document.getElementById("emailalert").innerHTML = ``;
    if (password == "") {
        document.getElementById("passwordalert").innerHTML = `Please Enter the Password!`;
        c--;
    } else document.getElementById("passwordalert").innerHTML = ``;

    if (c == 9) {
        if (!IsEmail(emailid)) {
            document.getElementById("emailalert").innerHTML = `Invalid Email!`;
            c--;
        } else document.getElementById("emailalert").innerHTML = ``;
    }
    
    console.log(c)
    //ajax call to create an instance to the user in database
    if (c == 9) {
        $.ajax({
            type: "POST",
            url: "/api/doctor/signup",
            data: {
                username:name,
                specialist: spec,
                location: loc,
                hname: hpname,
                hadrs: hpadd,
                time: timing,
                cfee: fee,
                email: emailid,
                password: password
            },
            success: function(resultData) {
                if (resultData.message == "Email already exists")
                    document.getElementById("emailalert").innerHTML = `This email already has an account`;
                if (resultData.message == "user created") {
                    window.location.href = '/ui/verify/doctor';
                }
            }, //sucess
            error: function(resultData) {
                    if (resultData.responseJSON.message == "Unauthorized access") {
                        location.href = "/"
                    } else {
                        var x = document.getElementById("snackbar");

                        x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ${resultData.responseJSON.message}`
                        x.className = "show";
                        setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
                    }
                } //error
        });
    }
    
} //End of signup function