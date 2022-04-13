let elList = document.querySelector(".list")
let elForm = document.querySelector(".form")
let elInput = document.querySelector(".input")

let fragment = document.createDocumentFragment()

function render(base, list){

   list.innerHTML = null

   if (base.length > 0) {

      base.forEach(element => {

         let newItem = document.createElement("li")
         let newTitle = document.createElement("h2")
         let newDesc = document.createElement("p")

         newTitle.textContent = element.Title
         newDesc.textContent = element.Year

         newItem.appendChild(newTitle)
         newItem.appendChild(newDesc)
         fragment.appendChild(newItem)

      });

      list.appendChild(fragment)
      
   }

}

elForm.addEventListener("submit",async function(evt){
   
   evt.preventDefault()

   let inputVal = elInput.value.trim()

   const res = await fetch(`https://www.omdbapi.com/?apikey=3e1a6bc9&s=${inputVal}`)

   console.log(inputVal)

   const data = await res.json()

   console.log(data)

   render(data.Search, elList)

})