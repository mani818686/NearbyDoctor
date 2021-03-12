function signup() {
    //Email verification
    function IsEmail(email) {
        var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!regex.test(email)) return false;
        else return true;
    }


    var name = String(document.getElementById("name").value);
    var emailid = String(document.getElementById("mail").value);
    var password = String(document.getElementById("password").value);
    var gen= String(document.getElementById("gender").value);
   


    console.log(name,emailid,password,gen);
    var c = 4;
    
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

    if (c == 4) {
        if (!IsEmail(emailid)) {
            document.getElementById("emailalert").innerHTML = `Invalid Email!`;
            c--;
        } else document.getElementById("emailalert").innerHTML = ``;
    }
    
    console.log(c)
    //ajax call to create an instance to the user in database
    if (c == 4) {
        $.ajax({
            type: "POST",
            url: "/api/patient/signup",
            data: {
                username:name,
                email: emailid,
                gender : gen,
                password: password,

            },
            success: function(resultData) {
                if (resultData.message == "Email already exists")
                    document.getElementById("emailalert").innerHTML = `This email already has an account`;
                if (resultData.message == "user created") {
                    window.location.href = '/ui/verify/patient';
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