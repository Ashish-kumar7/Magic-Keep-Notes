//console.log("Ashish project");
showfunction();

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {

    let addtext = document.getElementById("addText");
    let addtitle =document.getElementById("addTitle");

    let notesstr = localStorage.getItem("notes");

    if (notesstr == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notesstr);
    }
    
    let myobj={
        title:addtitle.value,
        text:addtext.value
    }

    notesobj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtext.value = "";
    addtitle.value="";

    showfunction();
})


function showfunction() {
    let notesstr = localStorage.getItem("notes");
    if (notesstr == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notesstr);
    }
    let stringsample = "";
    notesobj.forEach(function (element, index) {
        stringsample += `
            <div class="notecard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button  class="btn btn-primary" id="deletebtn" onclick="deletenote(${index})">Delete</button>
            </div>
            </div> 
        `
    });

    let notecard = document.getElementById("notes");
    if (notesobj.length != 0) {
        notecard.innerHTML = stringsample;
    } else {
        notecard.innerHTML = `nothing to show`;
    }
}

function deletenote(indexitm) {
    let notesstr = localStorage.getItem("notes");
    notesobj = JSON.parse(notesstr);
    notesobj.splice(indexitm, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    showfunction();
}

deleteall = document.getElementById("deleteall");
deleteall.addEventListener("click", deleteallnote);

function deleteallnote() {
    if (confirm("Do you want to delte all??")) {

       // console.log("Aass1");
        let notesstr = localStorage.getItem("notes");
        notesobj = JSON.parse(notesstr);
        notesobj.splice(0, notesobj.length);
        localStorage.setItem("notes", JSON.stringify(notesobj));
        showfunction();
    }

}

let searchtxt = document.getElementById("searchtxt");
searchtxt.addEventListener("input", function () {
    let txt = searchtxt.value.toLowerCase();

    //console.log("input getting fired!!!!!!!",txt);

    let notecard = document.getElementsByClassName("notecard");
    Array.from(notecard).forEach(function (element) {
        //  console.log(element);
        let cardtxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardtxt.includes(txt)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
        //console.log(cardtxt);

    })
})