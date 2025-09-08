const loadTrees = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
        .then((res) => res.json())
        .then((data) => displayTrees(data.plants))
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
                        <h2 class="font-bold my-1.5">${tree.name}</h2>
                        <div class="h-[110px]"><p class="text-[14px] mb-1.5">${tree.description}</p></div>
                        <div class="flex justify-between">
                           <button class="btn rounded-full bg-[#dcfce7] text-[#15803d]"> <p>${tree.category}</p></button>
                            <p class="font-semibold">৳${tree.price}</p>                            
                        </div>
                         <button
                        class="w-full btn btn-neutral mt-2 text-white rounded-full bg-[#15803D] border-0 hover:bg-[#53a548]">Add to Cart</button>
                    </div>
        `;
        treesContainer.append(treesCard)
    });
}


const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories)
        )
}

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
       <button class="w-full py-2 font-medium text-left border-0 px-2.5 hover:bg-[#8affa3] rounded-sm">${category.category_name}</button>
       `;
        console.log(oneCategory);
       
    allCategories.append(oneCategory);


    });

}


loadCategories()
loadTrees()
