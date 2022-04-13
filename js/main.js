let elList = document.querySelector(".list")
let elForm = document.querySelector(".form")
let elInput = document.querySelector(".input")
let elBox = document.querySelector(".skipBtns")
let elPrev = document.querySelector(".prev")
let elNext = document.querySelector(".next")

let activePage = 1;

let fragment = document.createDocumentFragment()

function render(base, list){
   
   list.innerHTML = null
   
   if (base.length > 0) {
      
      base.forEach(element => {
         
         let newItem = document.createElement("li")
         let newTitle = document.createElement("h2")
         let newDesc = document.createElement("p")
         let newImg = document.createElement("img")
         
         newImg.setAttribute("src",element.Poster)
         newTitle.textContent = element.Title
         newDesc.textContent = element.Year
         
         newItem.appendChild(newImg)
         newItem.appendChild(newTitle)
         newItem.appendChild(newDesc)
         fragment.appendChild(newItem)
         
      });
      
      elBox.style.display = "block"
      list.appendChild(fragment)
      
   }
   
}



elForm.addEventListener("submit",async function(evt){
   
   evt.preventDefault()
   
   let inputVal = elInput.value.trim()
   
   const res = await fetch(`https://www.omdbapi.com/?apikey=3e1a6bc9&s=${inputVal}&page=${activePage}`)
   
   const data = await res.json()

   let total = Math.ceil(data.totalResults / 10)
   
   if (activePage == 1) {
      elPrev.setAttribute("disabled","")
   }
   if(activePage == total){
      elNext.setAttribute("disabled","")
   }
   
   render(data.Search, elList)
   
})

elPrev.addEventListener("click",async e=>{
   activePage--
   let inputVal = elInput.value.trim()
   const res = await fetch(`https://www.omdbapi.com/?apikey=3e1a6bc9&s=${inputVal}&page=${activePage}`)
   const data = await res.json()
   render(data.Search, elList)

   let total = Math.ceil(data.totalResults / 10)

   if (activePage == 1) {
      elPrev.setAttribute("disabled","")
   }
   else{
      elPrev.removeAttribute("disabled")
   }

   if (activePage == total) {
      elNext.setAttribute("disabled","")
   }
   else{
      elNext.removeAttribute("disabled")
   }

})
elNext.addEventListener("click",async e=>{
   ++activePage
   let inputVal = elInput.value.trim()
   const res = await fetch(`https://www.omdbapi.com/?apikey=3e1a6bc9&s=${inputVal}&page=${activePage}`)
   const data = await res.json()
   render(data.Search, elList)

   let total = Math.ceil(data.totalResults / 10)

   if (activePage == 1) {
      elPrev.setAttribute("disabled","")
   }
   else{
      elPrev.removeAttribute("disabled")
   }

   if (activePage == total) {
      elNext.setAttribute("disabled","")
   }
   else{
      elNext.removeAttribute("disabled")
   }
})