
function createAccountMenu() {
    var id, name, first, last, image, email, capabilitiesm, cookie;
    if(sessionStorage.getItem('cookie')){
        id = sessionStorage.getItem('id');
        name = sessionStorage.getItem('name');
        first = sessionStorage.getItem('first');
        last = sessionStorage.getItem('last');
        image = sessionStorage.getItem('image');
        email = sessionStorage.getItem('eamil');
        loginSuccess(id, name, first, last, image, email);
    }
    else {
        $(".main").append("<div class='navMenuContainer'><div class='navProfile'><p>My Account</p><div class='divider'></div><input type='text' placeholder='Username' id='username'><input id='password' type='password' placeholder='Password'><button class='login-button' type='button'>Login</button><div class='divider'></div><a href=''><div>Sign Up</div></a><a href=''><div>Forgot Password?</div></a><a href=''><div>Go to our website</div></a></div></div>");
        
    }
    $(".navMenuContainer").click(function(e){
        if(e.target.getAttribute("class") === "navMenuContainer")
        $(".navMenuContainer").empty().remove();
    });
    $(".login-button").click(function(e){
        var username = $("#username").val();
        var password = $('#password').val();
       /* fingerauth();*/
        $.ajax({
            type: "POST",
            dataType: "jsonp",
            url: "https://www.ecommerce18.xyz/api/auth/generate_auth_cookie/?username="+username+"&password="+password,
            success: function(data){
                console.log(data);
                auth = true;
                createAccountMenu();
                id = data.user.id;
                name = data.user.username;
                first = data.user.firstname;
                last = data.user.lastname;
                image = data.user.avatar;
                email = data.user.email;
                cookie = data.cookie;
                capabilities = data.user.capabilities;
                $(".navMenuContainer").empty().remove();
                loginSuccess(id, name, first, last, image, email);
                sessionStorage.setItem("id", id);
                sessionStorage.setItem('name', name);
                sessionStorage.setItem('first', first);
                sessionStorage.setItem('last', last);
                sessionStorage.setItem('image', image);
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('capabilities', capabilities);
                sessionStorage.setItem('cookie', cookie);
            }
        });
    });
}
function loginSuccess(id, name, first, last, image, email){
    $(".main").append("<div class='navMenuContainer'>"+
            "<div class='navProfile' id='"+name+"' account-number='"+id+"'>"+
                "<p class='myProfileName' >"+first+ " "+last+"</p>"+
                "<div class='myProfileImage'><img src='"+image+"' alt=''></div>"+
                "<div class='myAccountName'>"+name+"</div>"+
                "<div class='divider'></div>"+
                "<div class='accountMenu'>"+
                   "<div id='orders'><a href=''>Orders</a></div>"+
                   "<div id='prof-info'><a href=''>Profile Info.</a></div>"+
                   "<div id='downloads'><a href=''>Downloads</a></div>"+
                   "<div id='bill-info'><a href=''>Billing Info.</a></div>"+
                   "<div class='logout'>Logout</div>"+
                "</div>"+
                "<div class='divider'></div>"+
                "<p id='checkText'>Remeber Me</p><input type='checkbox' id='checkbox'/>"+
            "</div>"+
        "</div>"
    );
     $(".navMenuContainer").click(function(e){
        if(e.target.getAttribute("class") === "navMenuContainer")
        $(".navMenuContainer").empty().remove();
    });
    $('.logout').click(function(e){
        sessionStorage.removeItem('cookie');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('first');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('image');
        sessionStorage.removeItem('item-selected');
        sessionStorage.removeItem('last');
        sessionStorage.removeItem('name');
    })
}

function fingerauth(){
            // Check if device supports fingerprint
    /*
    * @return {
    *      isAvailable:boolean,
    *      isHardwareDetected:boolean,
    *      hasEnrolledFingerprints:boolean
    *   }
    */
    
    FingerprintAuth.isAvailable(function (result) {

        console.log("FingerprintAuth available: " + JSON.stringify(result));

        // If has fingerprint device and has fingerprints registered
        if (result.isAvailable == true && result.hasEnrolledFingerprints == true) {

            // Check the docs to know more about the encryptConfig object :)
            var encryptConfig = {
                clientId: "myAppName",
                username: "currentUser",
                password: "currentUserPassword",
                maxAttempts: 5,
                locale: "en_US",
                dialogTitle: "Hey dude, your finger",
                dialogMessage: "Put your finger on the device",
                dialogHint: "No one will steal your identity, promised"
            }; // See config object for required parameters

            // Set config and success callback
            FingerprintAuth.encrypt(encryptConfig, function(_fingerResult){
                console.log("successCallback(): " + JSON.stringify(_fingerResult));
                if (_fingerResult.withFingerprint) {
                    console.log("Successfully encrypted credentials.");
                    console.log("Encrypted credentials: " + result.token);
                } else if (_fingerResult.withBackup) {
                    console.log("Authenticated with backup password");
                }
            // Error callback
            }, function(err){
                    if (err === "Cancelled") {
                    console.log("FingerprintAuth Dialog Cancelled!");
                } else {
                    console.log("FingerprintAuth Error: " + err);
                }
            });
        }
    
    /* @return {
    *      isAvailable:boolean,
    *      isHardwareDetected:boolean,
    *      hasEnrolledFingerprints:boolean
    *   }*/
    
        }, function (message) {
            console.log("isAvailableError(): " + message);
        });

}

