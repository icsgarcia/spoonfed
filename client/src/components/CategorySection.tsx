export const CategorySection = () => {
    const categories = [
        {
            imageUrl: "images/category-images/main-course-img.jpg",
            name: "Main Course",
        },
        {
            imageUrl: "images/category-images/side-dish-img.jpg",
            name: "Side dish",
        },
        { imageUrl: "images/category-images/dessert-img.jpg", name: "Dessert" },
        {
            imageUrl: "images/category-images/appetizer-img.jpg",
            name: "Appetizer",
        },
        { imageUrl: "images/category-images/salad-img.jpg", name: "Salad" },
        { imageUrl: "images/category-images/bread-img.jpg", name: "Bread" },
        {
            imageUrl: "images/category-images/breakfast-img.jpg",
            name: "Breakfast",
        },
        { imageUrl: "images/category-images/soup-img.png", name: "Soup" },
        {
            imageUrl: "images/category-images/beverage-img.jpg",
            name: "Beverage",
        },
        { imageUrl: "images/category-images/sauce-img.jpg", name: "Sauce" },
        {
            imageUrl: "images/category-images/marinade-img.jpg",
            name: "Marinade",
        },
        {
            imageUrl: "images/category-images/fingerfood-img.jpg",
            name: "Fingerfood",
        },
        { imageUrl: "images/category-images/snack-img.jpg", name: "Snack" },
        { imageUrl: "images/category-images/drink-img.jpg", name: "Drink" },
    ];
    return (
        <div className="grid grid-cols-2 place-items-center place-content-center md:grid-cols-4 lg:grid-cols-6 gap-y-8">
            {categories.map((category, index) => (
                <CategoryCard
                    key={index}
                    imageUrl={category.imageUrl}
                    name={category.name}
                />
            ))}
        </div>
    );
};

interface CategoryCardProps {
    imageUrl: string;
    name: string;
}

export const CategoryCard = ({ imageUrl, name }: CategoryCardProps) => {
    return (
        <div
            data-testid="background-image"
            className="size-40 border border-gray-200 rounded-md bg-center bg-cover flex items-end hover:cursor-pointer hover:shadow-md"
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div className="w-full bg-white/80 text-gray-800">
                <p className="text-center">{name}</p>
            </div>
        </div>
    );
};
