// Rohail Shah
// 100492683
// February 27th, 2022

// 2g. User Class. Create a JavaScript Class named User, in the same file (app.js) but above the
// IIFE that includes firstName, lastName, username, email and password properties.
class User
    {
        // constructor
        constructor(firstName = "", lastName = "", emailAddress= "", username = "", password = "")
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.EmailAddress = emailAddress;
            this.Username = username;
            this.Password = password;
        }
    }

// IIFE -- Immediately Invoked Function Expression
// AKA Anonymous Self-Executing Function
(function()
{
    /**
     * This method uses AJAX to open a connection to the url and returns data to the callback function
     * @param {string} method
     * @param {string} url
     * @param {Function} callback
     */
    function AjaxRequest(method, url, callback)
    {
        // step 1 - instantiate an XHR object
        let XHR = new XMLHttpRequest();

        // step 2 - create an event listener / handler for readystatechange event
        XHR.addEventListener("readystatechange", () =>
        {
            if(XHR.readyState === 4 && XHR.status === 200)
            {
               callback(XHR.responseText);
            }
        });

        // step 3 - open a connection to the server
        XHR.open(method, url);

        // step 4 - send the request to the server
        XHR.send();
    }

    /**
     * This function loads the NavBar from the header file and injects it into the page
     *
     * @param {string} data
     */
    function LoadHeader(data)
    {
        $("header").html(data); // data payload
        $(`li>a:contains(${document.title})`).addClass("active"); // add a class of 'active'
        CheckLogin();
    }

    // Display About page.
    function DisplayAboutPage()
    {
        console.log("About Us Page");
    }

    // Display Procduts page.
    function DisplayProductsPage()
    {
        console.log("Products Page");
    }

    // Display Services page.
    function DisplayServicesPage()
    {
        console.log("Services Page");
    }

    // Display Home page.
    function DisplayHomePage()
    {
        console.log("Home Page");

        // Simple paragraph sample.
        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);
        //Article.innerHTML = ArticleParagraph;
        // Simple Article Paragraph sample.
        $("body").append(`<article class="container">
        <p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>
        </article>`);
    }

    /**
     * Adds a Contact Object to localStorage.
     * @param {string} fullName
     * @param {string} contactNumber
     * @param {string} emailAddress
     */
    function AddContact(fullName, contactNumber, emailAddress)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();

            localStorage.setItem(key, contact.serialize());
        }
    }

    /**
     * This method validates an input text field in the form and displays
     * an error in the message area div element
     * @param {string} input_field_ID
     * @param {RegExp} regular_expression
     * @param {string} error_message
     */
    function ValidateField(input_field_ID, regular_expression, error_message)
    {
        let messageArea = $("#messageArea").hide();

        $("#" + input_field_ID).on("blur", function()
        {
            let input_text_field = $(this).val(); 
            if(!regular_expression.test(input_text_field)) 
            {
                $(this).trigger("focus").trigger("select"); 
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else 
            {
                messageArea.removeAttr("class").hide();
            } 
        });
    }

    /**
     * This method validates an input text field in the Register Page form and displays
     * an error in the message area div element
     * @param {string} input_field_ID 
     * @param {RegExp} regular_expression 
     * @param {string} error_message 
     */
    function ValidateRegisterField(input_field_ID, regular_expression, error_message)
    {
        let ErrorMessage = $("#ErrorMessage").hide();

        $("#" + input_field_ID).on("blur", function()
        {
            let input_text_field = $(this).val(); 
            if(!regular_expression.test(input_text_field)) 
            {
                $(this).trigger("focus").trigger("select"); 
                ErrorMessage.addClass("alert alert-danger").text(error_message).show();
            }
            else 
            {
                ErrorMessage.removeAttr("class").hide();
            } 
        });
    }

    /**
     * Regex validation for full name, contact nubmer and email address on forms.
     */
    function ContactFormValidation()
    {
        ValidateField("fullName",/^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,25})+(\s|,|-)([A-Z][a-z]{1,25})+(\s|,|-)*$/,"Please enter a valid Full Name. This must include at least a Capitalized first name followed by a Capitalized last Name.");
        ValidateField("contactNumber",/^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/,"Please enter a valid Contact Number. Example: (905) 555-5555");
        ValidateField("emailAddress",/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,"Please enter a valid Email Address.");
    }

    /**
     * 2c, 2d, 2d
     * Regex validation for first name, last name and email address and password on forms.
     */
    function ContactRegisterFormValidation()
    {
        ValidateRegisterField("firstName",/^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{2,25})+(\s|,|-)*$/,"Please enter a valid First Name. This must include at least a Capitalized name.");
        ValidateRegisterField("lastName",/^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{2,25})+(\s|,|-)*$/,"Please enter a valid Last Name. This must include at least a Capitalized name.");
        ValidateRegisterField("emailAddress",/^([a-zA-Z0-9._-]{8,})+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,"Please enter a valid Email Address.");
        ValidateRegisterField("password",/^([a-zA-Z0-9._-]{6,})$/,"Please enter a minimum of 6 characters.");
        ValidateRegisterField("confirmPassword",/^([a-zA-Z0-9._-]{6,})$/,"Please enter a minimum of 6 characters to confirm.");


    }

    /**
     * Initialize Contact Us page, valdate form entry, add event listener for send button to add contact entries.
     */
    function DisplayContactPage()
    {
        console.log("Contact Us Page");

        ContactFormValidation();
        
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function(event)
        {
            //event.preventDefault();

            if(subscribeCheckbox.checked)
            {
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        });
    }

    /**
     * 2f, 2h
     */
    function DisplayRegisterPage()
    {
        console.log("Register Page");

        ContactRegisterFormValidation();

        let ErrorMessage = $("#ErrorMessage");
        ErrorMessage.hide();

        $("#submitButton").on("click", function()
        {
            // 2f. Using only JavaScript and jQuery, when the user clicks on the 
            // Register button prevent the default form behaviour (which submits the form).
            event.preventDefault();

            // 2h. Register Page. Using only JavaScript and jQuery, when the Register button is clicked,
            // create an instance of the User class and display it in the console. Finally, clear the form.
            console.log(User);
            document.forms[0].reset();
        });
    }

    /**
     * Displays contact list page and reads local storage and lists the full name, contact number and email address of all registered contacts.
     */
    function DisplayContactListPage()
    {
        console.log("Contact-List Page");

        if(localStorage.length > 0) // check if localStorage has something in it 
        {
            let contactList = document.getElementById("contactList");

            let data = "";

            let keys = Object.keys(localStorage);

            let index = 1;

            //for every key in the keys collection loop
            for(const key of keys)
            {
                let contactData = localStorage.getItem(key); // retrieve contact data from localStorage

                let contact = new core.Contact(); // create an empty Contact Object
                contact.deserialize(contactData);

                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
                <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
                </tr>
                `;

                index++;
            }

            contactList.innerHTML = data;

            $("#addButton").on("click", () =>
            {
                location.href = "edit.html#add";
            });

            $("button.delete").on("click", function()
            {
                if(confirm("Are you sure?"))
                {
                    localStorage.removeItem($(this).val());
                }
                
                location.href = "contact-list.html";
            });

            $("button.edit").on("click", function() 
            {
                location.href = "edit.html#" + $(this).val();
            });
        }
    }

    /**
     * Displays Edit page and adds edit functionality.
     */
    function DisplayEditPage()
    {
        console.log("Edit Page");

        ContactFormValidation();

        let page = location.hash.substring(1);

        switch(page)
        {
            case "add":
                {
                    $("main>h1").text("Add Contact");

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);

                    $("#editButton").on("click", (event) => 
                    {
                        event.preventDefault();
                        // Add Contactt
                        AddContact(fullName.value, contactNumber.value, emailAddress.value);
                        // Refresh the contact-list page
                        location.href ="contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href ="contact-list.html";
                    });

                }
                break;
            default:
                {
                    // get the contact info from localStorage
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));

                    // display the contact info in the edit form
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);

                    // when Edit is pressed - update the contact
                    $("#editButton").on("click", (event)=>
                    {
                        event.preventDefault();

                        // get any changes from the form
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();

                        // replace the item in localStorage
                        localStorage.setItem(page, contact.serialize());

                        // return to the contact-list
                        location.href ="contact-list.html";
                    });

                    $("#cancelButton").on("click", () =>
                    {
                        location.href ="contact-list.html";
                    });
                    
                }
                break;
        }
    }

    /**
     * Displays login page and login funtionality.
     */
    function DisplayLoginPage()
    {
        console.log("Login Page");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function()
        {
            let success = false;

            // create an empty User object
            let newUser = new core.User();

            // use jQuery shortcut to load the users.json file
            $.get("./Data/users.json", function(data)
            { 
                // for everry user in the users.json file, loop
                for (const user of data.users) 
                {
                    // check if the username and password entered match with user
                    if(username.value == user.Username && password.value == user.Password)
                    {
                        // get the user data from the file and assign it to our empty user object
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                 // if username and password matches - success...perform the login sequence
                if(success)
                {
                    // add user to session storage
                    sessionStorage.setItem("user", newUser.serialize());

                    // hide any error messages
                    messageArea.removeAttr("class").hide();

                    // redirect the user to the secure area of our site - contact-list
                    location.href = "contact-list.html";
                }
                else
                {
                    // display an error message
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Login Information.").show();
                }
            });

            $("#cancelButtton").on("click", function()
            {
                // clear the login form
                document.forms[0].reset();

                // return to  the home page
                location.href = "index.html";
            });
        });
    }

    function CheckLogin()
    {
        // if user is logged in
        if(sessionStorage.getItem("user"))
        {
            // swap out the login link for the logout link
            $("#login").html(
                `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`
            );

            $("#logout").on("click", function()
            {
                // perform logout
                sessionStorage.clear();

                // redirect back to login
                location.href = "login.html";
            });

            // When the user enters a username and password and then clicks the Login button, 
            // insert their username between the Contact Us link and the Login/Logout link.
            $("#usernav").html(
                `<a id="usernav" class="nav-link" href="#"><i class="fas fa-user"></i> Admin</a>`
            );
            
        }
    }

    // named function
    function Start()
    {
        console.log("App Started!!");

        AjaxRequest("GET", "header.html", LoadHeader);

        switch (document.title) {
          case "Home":
            DisplayHomePage();
            break;
          case "Contact Us":
            DisplayContactPage();
            break;
          case "Contact-List":
            DisplayContactListPage();
            break;
          case "About Us":
            DisplayAboutPage();
            break;
          case "Our Products":
            DisplayProductsPage();
            break;
          case "Our Services":
            DisplayServicesPage();
            break;
          case "Edit":
            DisplayEditPage();
            break;
          case "Login":
            DisplayLoginPage();
            break;
          case "Register":
            DisplayRegisterPage();
            break;
        }
    }

    window.addEventListener("load", Start);

})();