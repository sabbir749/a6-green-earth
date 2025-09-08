const loadTrees = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then((res) => res.json())
        .then((data) => displayTrees(data.plants))
}

const loadPlantDetail = (id) => {

    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then((res) => res.json())
        .then((data) => displayPlantDetails(data.plants))
}


const displayPlantDetails = (plant) => {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `   
            
                    <h1 class="text-lg font-bold">${plant.name}</h1>
                    <div>
                        <img class="h-[300px] w-full rounded-xl mt-1" src="${plant.image}" alt="">
                    </div>
                    <div class="space-y-2 mt-4">
                        <div class="flex gap-2">
                            <h3 class="font-bold ">Category: </h3>
                            <span>${plant.category}</span>
                        </div>
                        <div class="flex gap-2">
                            <h3 class="font-bold ">Price: </h3>
                            <span>৳${plant.price}</span>
                        </div>
                        <div class="">
                            <h3 class="font-bold ">Description: </h3>
                            <span>${plant.description}</span>
                        </div>

                    </div>
                
                `;

    document.getElementById('plant_modal').showModal();


}

const displayTrees = (trees) => {

    const treesContainer = document.getElementById('trees-container');

    trees.forEach(tree => {

        const treesCard = document.createElement('div')
        treesCard.innerHTML = `
                    <div class="shadow-lg h-[450px] bg-white rounded-lg p-2">
                       <div>
                         <img class="w-full h-[190px] bg-[#EDEDED] rounded-lg" src="${tree.image}" alt="">
                       </div>
                        <h2  onclick="loadPlantDetail(${tree.id})" class="font-bold my-1.5">${tree.name}</h2>
                        <div class="h-[110px]"><p class="text-[14px] mb-1.5">${tree.description}</p></div>
                        <div class="flex justify-between">
                           <button class="btn rounded-full bg-[#dcfce7] text-[#15803d]"> <p>${tree.category}</p></button>
                            <p class="font-semibold">৳<span>${tree.price}</span></p>                            
                        </div>
                         <button
                        class="add-cart-btn w-full btn btn-neutral mt-2 text-white rounded-full bg-[#15803D] border-0 hover:bg-[#53a548]">Add to Cart</button>
                    </div>
        `;
        treesContainer.append(treesCard)



        // /////////////////
        let allCart = [];

        let getAddCardBtn = document.getElementsByClassName('add-cart-btn');

        for (let btn of getAddCardBtn) {
            btn.addEventListener('click', function () {
                const getPlantName = btn.parentNode.children[1].innerText;
                const getPlantPrice = btn.parentNode.children[3].children[1].children[0].innerText;


                allCart.push({
                    name: getPlantName,
                    price: parseFloat(getPlantPrice)
                });

                const cartContainer = document.getElementById('cart-container');
                cartContainer.innerHTML = '';

                let total = 0;

                allCart.forEach(cart => {
                    total += cart.price;

                    const cartItem = document.createElement('div');
                    cartItem.innerHTML = `
                <div class="cart bg-[#F0FDF4] h-[65px] rounded-lg w-full p-2.5 flex justify-between items-center mb-2">
                    <div>
                        <p class="font-medium text-[15px] mb-1">${cart.name}</p>
                        <p class="text-[15px] text-[#1f2937ab]">৳ <span>${cart.price}</span> x 1</p>
                    </div>
                    <div>
                        <img id="delete-cart" src="assets/Vector.png" class="cursor-pointer" alt="">
                    </div>
                </div>
            `;
                    cartContainer.appendChild(cartItem);
                });

                document.getElementById('total-price').innerText = total;
            });
        }

        // //////////////////////////////////



    });

}




const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then((res) => res.json())
        .then((data) => {
            displayCategories(data.categories)

        });
};


const displayCategories = (categories) => {

    const allCategories = document.getElementById('all-categories');
    // {
    //     "id": 1,
    //     "category_name": "Fruit Tree",
    //     "small_description": "Trees that bear edible fruits like mango, guava, and jackfruit."
    // }

    categories.forEach(category => {

        const oneCategory = document.createElement('p')
        oneCategory.innerHTML = `
       <button id="category-btn-${category.id}"  onclick="loadCategoryTrees('${category.id}')" class="category-btn cursor-pointer w-full py-2 font-medium text-left border-0 px-2.5 hover:bg-[#8affa3] rounded-sm">${category.category_name}</button>

       `;

        allCategories.append(oneCategory);

    });

}


loadCategories()
loadTrees()


const removeActive = () => {
    const categoryBtn = document.querySelectorAll('.category-btn');
    categoryBtn.forEach(btn => btn.classList.remove('active'));

}

const loadCategoryTrees = (id) => {
    manageSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            removeActive();
            const clickedCategory = document.getElementById(`category-btn-${id}`);
            // console.log(clickedCategory);
            clickedCategory.classList.add('active')
            displayCategoryTrees(data.plants)
        })
}



const displayCategoryTrees = (plants) => {
    const treesContainer = document.getElementById('trees-container');
    treesContainer.innerHTML = '';

    plants.forEach(plant => {

        const categoryTrees = document.createElement('div')
        categoryTrees.innerHTML = `

        <div class="shadow-lg h-[450px] bg-white rounded-lg p-2">
                       <div>
                         <img class="w-full h-[190px] bg-[#EDEDED] rounded-lg" src="${plant.image}" alt="">
                       </div>
                        <h2 onclick="loadPlantDetail(${plant.id})" class="font-bold my-1.5">${plant.name}</h2>
                        <div class="h-[110px]"><p class="text-[14px] mb-1.5">${plant.description}</p></div>
                        <div class="flex justify-between">
                           <button class="btn rounded-full bg-[#dcfce7] text-[#15803d]"> <p>${plant.category}</p></button>
                            <p class="font-semibold">৳ <span>${plant.price}</span></p>                            
                        </div>
                         <button
                        class="add-cart-btn w-full btn btn-neutral mt-2 text-white rounded-full bg-[#15803D] border-0 hover:bg-[#53a548]">Add to Cart</button>
                    </div>
`;

        treesContainer.append(categoryTrees)

        // /////////////////
        let allCart = [];

        let getAddCardBtn = document.getElementsByClassName('add-cart-btn');

        for (let btn of getAddCardBtn) {
            // console.log(btn);

            btn.addEventListener('click', function () {
                // console.log(btn);

                const getPlantName = btn.parentNode.children[1].innerText;
                const getPlantPrice = btn.parentNode.children[3].children[1].children[0].innerText;
                console.log(getPlantName, getPlantPrice);


                allCart.push({
                    name: getPlantName,
                    price: parseFloat(getPlantPrice)
                });

                const cartContainer = document.getElementById('cart-container');
                cartContainer.innerHTML = '';

                let total = 0;

                allCart.forEach(cart => {
                    total += cart.price;

                    const cartItem = document.createElement('div');
                    cartItem.innerHTML = `
                <div class="cart bg-[#F0FDF4] h-[65px] rounded-lg w-full p-2.5 flex justify-between items-center mb-2">
                    <div>
                        <p class="font-medium text-[15px] mb-1">${cart.name}</p>
                        <p class="text-[15px] text-[#1f2937ab]">৳ <span>${cart.price}</span> x 1</p>
                    </div>
                    <div>
                        <img id="delete-cart" src="assets/Vector.png" class="cursor-pointer" alt="">
                    </div>
                </div>
            `;
                    cartContainer.appendChild(cartItem);
                });

                document.getElementById('total-price').innerText = total;
            });
        }

        // //////////////////////////////////


    });



    manageSpinner(false)
}

const manageSpinner = (status) => {
    if (status === true) {
        document.getElementById('spinner').classList.remove('invisible');
        document.getElementById('trees-container').classList.add('invisible');
    } else {
        document.getElementById('trees-container').classList.remove('invisible');
        document.getElementById('spinner').classList.add('invisible');
    }
}




