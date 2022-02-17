const boredApi     = 'https://www.boredapi.com/api/activity';
const choice       = document.querySelector('.choice');
const cartTexts    = document.querySelectorAll('.choice>.wireframe__element>.wireframe__text');
const cartTypes    = document.querySelectorAll('.choice>.wireframe__element>.wireframe__comment');
const prevButton   = document.querySelector('.prev-button');
const nextButton   = document.querySelector('.next-button');
const sliderDiv    = document.querySelector('.wireframe__slider');
const sliderNumber = document.querySelector('.wireframe__number');
const titleButton  = document.querySelector('.wireframe__title');
let radius         = document.querySelector('.radius');
let radiusChildren = radius.children
let titleCompleted = document.querySelector('.title_text');
let typeCompleted  = document.querySelector('.type_text')
let numberCompleted= document.querySelector('.number_text')
let sumComp = 1;
let number = 1;

let recreationalNumber;
let socialNumber      ;
let educationNumber   ;
let musicNumber       ;
let relaxationNumber  ;
let busyworkNumber    ;
let charityNumber     ;
let cookingNumber     ;
let diyNumber         ;

if (Boolean (localStorage.getItem('number'))) {
    recreationalNumber = localStorage.getItem('number')[0];
    socialNumber       = localStorage.getItem('number')[2];
    educationNumber    = localStorage.getItem('number')[4];
    musicNumber        = localStorage.getItem('number')[6];
    relaxationNumber   = localStorage.getItem('number')[8];
    busyworkNumber     = localStorage.getItem('number')[10];
    charityNumber      = localStorage.getItem('number')[12];
    cookingNumber      = localStorage.getItem('number')[14];
    diyNumber          = localStorage.getItem('number')[16];
} else {
    recreationalNumber = 0;
    socialNumber       = 0;
    educationNumber    = 0;
    musicNumber        = 0;
    relaxationNumber   = 0;
    busyworkNumber     = 0;
    charityNumber      = 0;
    cookingNumber      = 0;
    diyNumber          = 0;
}

let achNumber = [recreationalNumber, socialNumber, educationNumber, musicNumber, relaxationNumber, busyworkNumber, charityNumber, cookingNumber, diyNumber];


 if (Boolean (localStorage.getItem('completedTitle'))) {
   var completedTitle = [localStorage.getItem('completedTitle')];
 } else {
   var completedTitle = [];
 }
 if (Boolean (localStorage.getItem('completedType'))) {
    var completedType = [localStorage.getItem('completedType')];
  } else {
    var completedType = [];
  }

async function fetchChoice() {
        for (let cartChoice of document.querySelectorAll('.choice>.wireframe__element')) {
            let response = await fetch (boredApi)
            let json     = await response.json()
            let {activity, type,} = json;

            cartChoice.firstElementChild.innerHTML = activity;
            cartChoice.lastElementChild.innerHTML  = type;
            function addDivSlider() {

                sliderDiv.innerHTML +=
                `<div class="wireframe__element">
                    <div class="wireframe__text">
                        ${activity}
                    </div>
                    <div class="wireframe__comment">
                        ${type}
                    </div>
                </div>`;

                cartChoice.remove();
                sliderNumber.innerHTML = `${number} / ${sliderDiv.children.length}`;
                sliderAdd() 
            }

            cartChoice.addEventListener('click', addDivSlider);
        }
}

titleButton.addEventListener('click', function () {
            
    choice.innerHTML += 
        `<div class="wireframe__element">
            <div class="wireframe__text">
        
            </div>
            <div class="wireframe__comment">
        
            </div>
        </div>`;

fetchChoice()
});
sliderDiv.innerHTML = localStorage.getItem ('sliderBlocks');

if (Boolean(localStorage.getItem('number'))) {
    radiusChildren[0].firstElementChild.innerHTML = localStorage.getItem('number')[0];
    radiusChildren[1].firstElementChild.innerHTML = localStorage.getItem('number')[2];
    radiusChildren[2].firstElementChild.innerHTML = localStorage.getItem('number')[4];
    radiusChildren[3].firstElementChild.innerHTML = localStorage.getItem('number')[6];
    radiusChildren[4].firstElementChild.innerHTML = localStorage.getItem('number')[8];
    radiusChildren[5].firstElementChild.innerHTML = localStorage.getItem('number')[10];
    radiusChildren[6].firstElementChild.innerHTML = localStorage.getItem('number')[12];
    radiusChildren[7].firstElementChild.innerHTML = localStorage.getItem('number')[14];
    radiusChildren[8].firstElementChild.innerHTML = localStorage.getItem('number')[16];
    }


// localStorage.clear()

function sliderAdd() {
    for (let sliderElement of document.querySelectorAll('.wireframe__slider>.wireframe__element')) {

        let type         = sliderElement.lastElementChild.textContent;
        let typeGood     = type.replace(/[^a-zа-яё]/gi, '');
        let sliderBlocks = [sliderDiv].map((sliderElement) => sliderElement.innerHTML);
        
        localStorage.setItem ('sliderBlocks', sliderBlocks)
        
        sliderElement.addEventListener ('click', function () {
            sliderElement.remove()
            
            sliderBlocks = [sliderDiv].map((sliderElement) => sliderElement.innerHTML)
            localStorage.setItem ('sliderBlocks', sliderBlocks)

            achNumber = [recreationalNumber, socialNumber, educationNumber, musicNumber, relaxationNumber, busyworkNumber, charityNumber, cookingNumber, diyNumber];
            localStorage.setItem ('number', achNumber)


            completedTitle.push (sliderElement.firstElementChild.innerHTML)
            localStorage.setItem ('completedTitle', completedTitle)
            // for (const title of localStorage.getItem('completedTitle').split(',')) {
            //     titleCompleted.innerHTML += `<div>${title}</div>`;
            // }

            completedType.push (sliderElement.lastElementChild.innerHTML)
            localStorage.setItem ('completedType', completedType)
            // for (const type of localStorage.getItem('completedType').split(',')) {
            //     typeCompleted.innerHTML += `<div>${type}</div>`;
            // }

            if (radiusChildren[0].lastElementChild.classList.contains (`${typeGood}`)) {
            
                recreationalNumber++
                radiusChildren[0].firstElementChild.innerHTML = localStorage.getItem('number')[0];
                
            }
            else if (radiusChildren[1].lastElementChild.classList.contains (`${typeGood}`)) {
                
                socialNumber++
                radiusChildren[1].firstElementChild.innerHTML = localStorage.getItem('number')[2];
            }
            else if (radiusChildren[2].lastElementChild.classList.contains (`${typeGood}`)) {
                
                educationNumber++
                radiusChildren[2].firstElementChild.innerHTML = localStorage.getItem('number')[4];
            }
            else if (radiusChildren[3].lastElementChild.classList.contains (`${typeGood}`)) {
               
                musicNumber++
                radiusChildren[3].firstElementChild.innerHTML = localStorage.getItem('number')[6];
            }
            else if (radiusChildren[4].lastElementChild.classList.contains (`${typeGood}`)) {
               
                relaxationNumber++
                radiusChildren[4].firstElementChild.innerHTML = localStorage.getItem('number')[8];
            }
            else if (radiusChildren[5].lastElementChild.classList.contains (`${typeGood}`)) {
                
                busyworkNumber++
                radiusChildren[5].firstElementChild.innerHTML = localStorage.getItem('number')[10];
            }
            else if (radiusChildren[6].lastElementChild.classList.contains (`${typeGood}`)) {
                
                charityNumber++
                radiusChildren[6].firstElementChild.innerHTML = localStorage.getItem('number')[12];
            }
            else if (radiusChildren[7].lastElementChild.classList.contains (`${typeGood}`)) {
                
                cookingNumber++
                radiusChildren[7].firstElementChild.innerHTML = localStorage.getItem('number')[14];
            }
            else if (radiusChildren[8].lastElementChild.classList.contains (`${typeGood}`)) {
                
                diyNumber++
                radiusChildren[8].firstElementChild.innerHTML = localStorage.getItem('number')[16];
            }
            else {
                alert ('ERROR')
            }
            localStorage.setItem ('number', achNumber)

            number--;
            if (number <= 0) {
                number = 1;           
            }
            sliderNumber.innerHTML = `${number} / ${sliderDiv.children.length}`;

        })
    }
}
fetchChoice();
sliderAdd();



nextButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (sliderDiv.children.length > 1) {
        sliderDiv.append(sliderDiv.firstElementChild);
        number++;
        if (number == sliderDiv.children.length + 1) {
            number = 1;
        }
        sliderNumber.innerHTML = `${number} / ${sliderDiv.children.length}`;
    }
    else {
        console.error ('404');
    }

});

prevButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (sliderDiv.children.length > 1) {
        sliderDiv.prepend( sliderDiv.lastElementChild);
        number--;
        if (number == 0) {
            number = sliderDiv.children.length;
        }
        sliderNumber.innerHTML = `${number}` + ' ' + `/ ${sliderDiv.children.length}`;}
    else {
            console.error ('404')
    }
    });
sliderNumber.insertAdjacentHTML ('beforeend',`${number} / ${sliderDiv.children.length}`);

for (const title of localStorage.getItem('completedTitle').split(',')) {
    titleCompleted.innerHTML += `<div>${title}</div>`;
    numberCompleted.innerHTML += `<div>${sumComp++}</div>`;

}
for (const type of localStorage.getItem('completedType').split(',')) {
    typeCompleted.innerHTML += `<div>${type}</div>`;
}









