const boredApi = 'https://www.boredapi.com/api/activity';
let num = 1;

async function addCart() {
    for (let i = 1; i <= 4; i++) {
        let response = await fetch(boredApi);
        let json = await response.json();
        let { activity, type, } = json;

        let element = document.createElement('div')
        element.classList.add('wireframe__element')

        let textCreate = document.createElement('div');
        textCreate.classList.add('wireframe__text')
        let textContent = document.createTextNode(`${activity}`)
        textCreate.appendChild(textContent);


        let commentCreate = document.createElement('div')
        commentCreate.classList.add('wireframe__comment')
        let commentContent = document.createTextNode(`${type}`)
        commentCreate.appendChild(commentContent);


        element.appendChild(textCreate)
        element.appendChild(commentCreate)

        if (document.querySelectorAll('.choice>.wireframe__element').length < 4) {
            document.querySelector('.choice').appendChild(element)
        } else {
            return
        }
    }
}


function countCartInMyList(slider) {
    let cartCount = document.querySelector('.wireframe__number');
    if (slider.children.length > 0) {
        if (num <= 1) {
            num = 1;
        }
        cartCount.textContent = `${num} / ${slider.children.length}`;
    } else {
        cartCount.textContent = '';
    }
}

function challengeFinish(title, type) {
    let wireframeTitleElement = document.querySelector('.wireframe__title_element')
    let wireframeTitleText = wireframeTitleElement.lastElementChild;
    let newDivTitle = document.createElement('div')
    let newDivTitleText = document.createTextNode(title)
    newDivTitle.appendChild(newDivTitleText);
    wireframeTitleText.appendChild(newDivTitle);

    let wireframeTypeElement = document.querySelector('.wireframe__type_element')
    let wireframeTypeText = wireframeTypeElement.lastElementChild;
    let newDivType = document.createElement('div')
    let newDivTypeText = document.createTextNode(type)
    newDivType.appendChild(newDivTypeText);
    wireframeTypeText.appendChild(newDivType);

    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();
    if (today.getMinutes() <= 9) {
        time = today.getHours() + ":" + '0' + today.getMinutes();
    }
    let dateTime = date + ' ' + time;
    let wireframeTimeElement = document.querySelector('.wireframe__time_element')
    let wireframeTimeText = wireframeTimeElement.lastElementChild;
    let newDivTime = document.createElement('div')
    let newDivTimeText = document.createTextNode(dateTime)
    newDivTime.appendChild(newDivTimeText);
    wireframeTimeText.appendChild(newDivTime);

    let wireframeNumberElement = document.querySelector('.wireframe__number_element');
    let wireframeNumberText = wireframeNumberElement.lastElementChild;
    let newDivNumber = document.createElement('div')
    if (wireframeNumberText.lastElementChild == null) {
        let newDivText = document.createTextNode(1);
        newDivNumber.appendChild(newDivText);
        wireframeNumberText.appendChild(newDivNumber);
    } else {
        let currentValue = parseInt(wireframeNumberText.lastElementChild.textContent);
        let incrementedValue = currentValue + 1;
        let newDivText = document.createTextNode(incrementedValue)
        newDivNumber.appendChild(newDivText);
        wireframeNumberText.appendChild(newDivNumber);
    }
}

addCart();

let ideasBlock = document.getElementById('ideas');
ideasBlock.addEventListener('click', (e) => {
    let clickedCart = e.target;
    if (clickedCart.parentElement.classList.contains('wireframe__element')) {
        let slider = document.querySelector('.wireframe__slider');
        slider.appendChild(clickedCart.parentElement)
        countCartInMyList(slider)
        addCart();
    }
});
/////////////// With loop "forEach" i can't use "break", so i decide to use usual loop "for"
// let myListBlock = document.getElementById('myList')
// myListBlock.addEventListener('click', (e) => {
//     let clickedCart = e.target;
//     if (clickedCart.parentElement.classList.contains('wireframe__element')) {
//         let cartType = clickedCart.parentElement.lastElementChild.textContent
//         let circles = document.querySelectorAll('.wireframe__circle')
//         let found = false;
//         circles.forEach(circle => {
//             if (circle.id === cartType && !found) {
//                 clickedCart.parentElement.remove()
//                 let currentValue = parseInt(circle.firstElementChild.textContent);
//                 let incrementedValue = currentValue + 1;
//                 circle.firstElementChild.textContent = incrementedValue;
//                 found = true;

//             } else {
//                 return
//             }
//         })
//     }
// })

let myListBlock = document.getElementById('myList');
myListBlock.addEventListener('click', (e) => {
    let clickedCart = e.target;
    if (clickedCart.parentElement.classList.contains('wireframe__element')) {
        let cartType = clickedCart.parentElement.lastElementChild.textContent;
        let circles = document.querySelectorAll('.wireframe__circle');
        for (let i = 0; i < circles.length; i++) {
            let circle = circles[i];
            if (circle.id === cartType) {



                let title = clickedCart.parentElement.firstElementChild.textContent;
                let type = clickedCart.parentElement.lastElementChild.textContent;

                clickedCart.parentElement.remove();
                let currentValue = parseInt(circle.firstElementChild.textContent);
                let incrementedValue = currentValue + 1;
                circle.firstElementChild.textContent = incrementedValue;
                let slider = document.querySelector('.wireframe__slider');
                if (num >= slider.children.length) {
                    num--;
                }
                countCartInMyList(slider);
                challengeFinish(title, type);
                break;
            }
        }
    }
});
document.querySelector('.next-button').addEventListener('click', (e) => {
    e.preventDefault();
    let slider = document.querySelector('.wireframe__slider');
    if (slider.children.length > 1) {
        slider.appendChild(slider.firstElementChild);
        num++;
        if (num == slider.children.length + 1) {
            num = 1;
        }
        countCartInMyList(slider);
    }
    else {
        console.error('404');
    }
});
document.querySelector('.prev-button').addEventListener('click', (e) => {
    e.preventDefault();
    let slider = document.querySelector('.wireframe__slider');
    if (slider.children.length > 1) {
        slider.prepend(slider.lastElementChild);
        num--;
        if (num == 0) {
            num = slider.children.length;
        }
        countCartInMyList(slider);
    }
    else {
        console.error('404')
    }
});
document.querySelector('.wireframe__title').addEventListener('click', () => {
    let carts = document.querySelectorAll('.choice>.wireframe__element');
    carts.forEach(cart => {
        cart.remove();
        addCart();
    })
})
