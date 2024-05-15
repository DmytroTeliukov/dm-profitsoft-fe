
export const mockCategories = [
    {
        id: 1,
        name: "Main course"
    },
    {
        id: 2,
        name: "Dessert"
    },
    {
        id: 3,
        name: "Drink"
    },
];

export const mockDietarySpecifics = ['Gluten-Free', 'Dairy-Free'];
export const mockCuisines = ['Seafood', 'Mediterranean'];
export const mockIngredients = ['Salmon fillet', 'Olive oil', 'Salt', 'Pepper', 'Mixed vegetables'];


export const mockDishes = [
    {
        "id": 1,
        "name": "Grilled Salmon",
        "description": "Freshly grilled salmon fillet with a side of vegetables.",
        "price": 15,
        "weight": 250,
        "calories": 350.5,
        "category": {
            id: 1,
            name: "Main course"
        },
        "ingredients": ["Salmon fillet", "Olive oil", "Salt", "Pepper", "Mixed vegetables"],
        "cuisines": ["Seafood", "Mediterranean"],
        "dietarySpecifics": ["High protein", "Low carb", "Gluten-free"]
    },
    {
        "id": 2,
        "name": "Chicken Caesar Salad",
        "description": "Classic Caesar salad topped with grilled chicken strips.",
        "price": 12,
        "weight": 300,
        "calories": 280.5,
        "category": {
            id: 1,
            name: "Main course"
        },
        "ingredients": ["Romaine lettuce", "Grilled chicken", "Parmesan cheese", "Caesar dressing", "Croutons"],
        "cuisines": ["Italian", "American"],
        "dietarySpecifics": ["Low calorie", "High protein", "Gluten-free"]
    },
    {
        "id": 3,
        "name": "Vegetable Stir-Fry",
        "description": "Assorted vegetables stir-fried with tofu in a savory sauce.",
        "price": 10,
        "weight": 200,
        "calories": 220.5,
        "category": {
            id: 1,
            name: "Main course"
        },
        "ingredients": ["Tofu", "Broccoli", "Bell peppers", "Carrots", "Soy sauce"],
        "cuisines": ["Asian", "Vegetarian"],
        "dietarySpecifics": ["Vegan", "Low carb", "Gluten-free"]
    }
];