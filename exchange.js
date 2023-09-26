
document.addEventListener("DOMContentLoaded", function(){
    
    const amount = document.getElementById("amount");
    const currencyHave = document.getElementById("currencyHave");
    const currencyWant = document.getElementById("currencyWant");
    const convert = document.getElementById("convert");
    const result = document.getElementById("result");
    const apiKey = "GYizENZpODSZp7Ere2EzMA==dKnrO9ueAXeoBfwz";
    const apiUrl = "https://api.api-ninjas.com/v1/convertcurrency?";
    
    convert.addEventListener('click', () => {
        const amountTotal = amount.value;
        const convertFrom = currencyHave.value;
        const convertTo = currencyWant.value;
        const url = apiUrl + 'want=' + convertTo + '&have=' + convertFrom + '&amount=' + amountTotal;
            
        fetch(url, {
            headers: {      //Headers — Additional metadata passed to the API to help the server understand what type of request it is dealing with, for example “content-type”.          
                "X-API-KEY": apiKey   
            }
        })
        .then(response => response.json())      //Response — Any data you get back from the server after a successful / failed request. The json() method of the Response interface takes a Response stream and reads it to completion. It returns a promise which resolves with the result of parsing the body text as JSON.
        .then(data => {
            const converted = data.new_amount;
            result.style.color = "black"
            result.value = `${amountTotal} ${convertFrom} = ${converted.toFixed(2)} ${convertTo}`
        })
        .catch(error => {
            console.error("Request failed:", error);
            result.style.color = "red";
            result.value = "Please enter a number";
        })
    })

    result.addEventListener('click', () => {
        result.select();
        navigator.clipboard.writeText(result.value);
    })


    const copy = document.querySelector(".fa-copy");

    copy.addEventListener('click', () => {
        result.select();
        navigator.clipboard.writeText(result.value);
    })



    amount.addEventListener('keypress', function(event) {   //if my keypress is Enter, convert is clicked
        if (event.key === "Enter") {
            event.preventDefault();
            convert.click();
        }
    })



    amount.addEventListener('click', ()=>{   //clicking textbox selects all text making it easier to delete
        amount.select();
    })



    const settings = document.querySelector(".fa-gear");
    const modal = document.getElementById("myModal");

    settings.addEventListener('click', () => {
        modal.style.display = "block";
    })



    const span = document.getElementsByClassName("close")[0];

    span.addEventListener('click', () => {
        modal.style.display = "none";
    })



    const setting_colour_background = document.getElementById("setting-colour-background");
    const setting_colour_title = document.getElementById("setting-colour-title");
    const confirm = document.querySelector(".confirm");
    let title = document.querySelector(".main-title"); 

    confirm.addEventListener('click', () => {
        const colour = setting_colour_background.value;
        const titleColour = setting_colour_title.value;
        document.body.style.backgroundColor = colour;
        title.style.color = titleColour;
        modal.style.display = "none";
        result.style.backgroundColor = colour;
        document.querySelector('.one').style.color = titleColour;
        document.querySelector('.two').style.color = titleColour;
        localStorage.setItem('bg_colour', colour);
        localStorage.setItem('title_colour', titleColour);
    })

    if (!localStorage.getItem('bg_colour')){
        document.body.style.backgroundColor = "lightblue";
        result.style.backgroundColor = "lightblue";
        document.querySelector('#setting-colour-background').value = "lightblue";
    } else {
        document.body.style.backgroundColor = localStorage.getItem('bg_colour');
        result.style.backgroundColor = localStorage.getItem('bg_colour');
        document.querySelector('#setting-colour-background').value = localStorage.getItem('bg_colour');
    }

    if (!localStorage.getItem('title_colour')){
        title.style.color = "black";
        document.querySelector('#setting-colour-background').value = "black";
        document.querySelector('#setting-colour-title').value = "black";
        document.querySelector('.one').style.color = "black";
        document.querySelector('.two').style.color = "black";
    } else {
        title.style.color = localStorage.getItem('title_colour');
        document.querySelector('#setting-colour-title').value = localStorage.getItem('title_colour');
        document.querySelector('.one').style.color = localStorage.getItem('title_colour');
        document.querySelector('.two').style.color = localStorage.getItem('title_colour');
    }


})

