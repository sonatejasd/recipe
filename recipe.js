const meals = document.querySelector("select");
const recipesDiv = document.getElementById('recipes');
const container = document.getElementById('container');
const search = document.getElementById('search');
let recipeList;

async function fetchData() {
    const response = await fetch("https://dummyjson.com/recipes");
    const recipes = await response.json();
    recipeList = recipes.recipes;
    display(recipes.recipes);
}

fetchData();

function display(recipes) {
    recipesDiv.textContent = "";
    recipes.forEach(function(recipe){
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add('recipe');
        //recipe div contents
        const image = document.createElement("img");
        image.src = recipe.image;
        const name = document.createElement("p");
        const viewButton = document.createElement("button");
        viewButton.textContent = "view recipe";
        name.textContent = recipe.name;
        //add to recipe div contents
        recipeDiv.append(image,name,viewButton);
        recipesDiv.appendChild(recipeDiv);
        //recipe modal
        const modal = document.createElement("div");
        modal.classList.add("modal");
        const modalContent = document.createElement("div");
        modalContent.classList.add("modalContent");
        //modal header
        const modalHeader = document.createElement("div");
        modalHeader.classList.add("modalHeader");
        //recipe name in modal header
        const modalName = document.createElement("span");
        modalName.textContent = recipe.name;
        //close modal button in header
        const closeModal = document.createElement("button");
        closeModal.textContent = "❌";
        //close funcctionality
        closeModal.onclick = () =>{
            modal.style.display = "none";
            recipesDiv.style.opacity = 1;
        }
        //add recipe name and close button in header
        modalHeader.append(modalName,closeModal);
        //modal body
        const modalBody = document.createElement("div");
        modalBody.classList.add("modalBody");
        //modal body ingredients
        const ingredientTitle = document.createElement("p");
        ingredientTitle.textContent = "please find the ingredient list below:"
        const ingredients = document.createElement("ul");
        for(let i in recipe.ingredients){
            const ingredient = document.createElement("li");
            ingredient.textContent = recipe.ingredients[i];
            ingredients.appendChild(ingredient);
        }
        // //modal body image
        // const modalImage = document.createElement("img");
        // modalImage.src = recipe.image;
        //modal body instruction
        const instructionTitle = document.createElement("p");
        instructionTitle.textContent = "please find the steps to be followed below:"
        const instructions = document.createElement("ol");
        for(let i in recipe.instructions){
            const instruction = document.createElement("li");
            instruction.textContent = recipe.instructions[i];
            instructions.appendChild(instruction);
        }
        modalBody.append(ingredientTitle,ingredients,instructionTitle,instructions);
        //add modal header, body and footer
        modalContent.append(modalHeader,modalBody);
        modal.appendChild(modalContent);
        //view modal
        container.appendChild(modal);
        viewButton.onclick = function() {
            modal.style.display = "block";
            recipesDiv.style.opacity = 0.1;
        };

    });
}

search.addEventListener("input", function(event) {
    console.log(recipeList);
    let searchText = event.target.value;
    console.log(searchText);
    let searchedRecipe = recipeList.filter(function(recipe) {
        return recipe.name.toLowerCase().includes(searchText.toLowerCase());;
    })
    console.log(searchedRecipe);
    display(searchedRecipe);
});

meals.addEventListener("click", function() {
    meals.textContent = "";
    const options = new Set();
    recipeList.forEach(function (recipe){
        recipe.mealType.forEach(function (meal) {
            options.add(meal);
        })
    });
    options.forEach(function(option){
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        meals.appendChild(optionElement);
    });
});

meals.addEventListener("change", function(event){
    let searchedRecipe = recipeList.filter(function(recipe) {
        return recipe.mealType.includes(event.target.value);
    });
    console.log(searchedRecipe);
    display(searchedRecipe);

})


