/*
make a website to show how much calories in a prodcut based on a picture
so the user povides the image and then sees a loading screen then provies 
the name of the products,how much calories it has
and tell the user if that food is healthy or not
*/



// NOTE: problem is in the div no added class attribute

let clr1 = document.getElementById("clr1");
var clr2 = document.getElementById("clr2");
let img = document.getElementById("img")
var row = document.getElementById("row");
let col1 = document.createElement("div")
col1.classList.add("col-12")
col1.classList.add("cols")
let col2 = document.createElement("div")
col2.classList.add("col-12")
col2.classList.add("cols")
let retry;
let upImg;
let choose;
img.name = 'img'
img.addEventListener("change", function (event) {
    upImg = event.target.files[0];

    choose = document.createElement("button")
    choose.type = "submit"
    choose.id = "choose"
    choose.textContent = "Choose"
    choose.name = "choose"

    retry = document.createElement("button")
    retry.id = "retry"
    retry.textContent = "start over"
    retry.type = "reset"

    row.children[0].remove()
    row.children[0].remove()

    if (upImg) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let disImg = document.createElement("img")
            disImg.id = 'preview'
            //let image = document.createElement("img")
            console.log(e);

            //row.appendChild(image)
            let foodpic = e.target.result
            disImg.src = e.target.result;
            disImg.style.display = "block"; // Show image
            row.appendChild(col1)
            row.appendChild(col2)
            col1.appendChild(disImg)
            col2.appendChild(choose)
            col2.appendChild(retry)
            console.log(row);

            // Set image source
        };
        reader.readAsDataURL(upImg);

    }
    else {
        console.log("No file selected.");
    }


    fetch('https://t-food-kappa.vercel.app/api/oauth')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));


//     if (!upImg) return;
//     const formData = new FormData();
//     formData.append("image",upImg);

// fetch("server.php", {
//     method: "POST",
//     body: formData
// })
// .then(response => response.text())
// .then(data => console.log(data))
// .catch(error => console.error("Error:", error));



})


// choose.addEventListener("submit",function(event){
//     console.log(event);
    
//     event.target.preventDefault()


// event.target.submit()
// })





  
// console.log(location.href);
// retry.addEventListener("click", function(event){
//     location.reload()
    
// })
// choose.addEventListener("click",function(event){

// })

