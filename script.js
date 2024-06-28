async function fetchProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=15');
        const data = await response.json();
        
        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = '';
        productContainer.style.display = 'grid';
        productContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
        productContainer.style.gap = '5px';
        
        data.products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.style.border = '1px solid #ccc';
            productCard.style.borderRadius = '5px';
            productCard.style.padding = '20px';
            productCard.style.marginBottom = '20px';
            productCard.style.maxWidth = '300px';
            productCard.style.width = '100%';
            productCard.style.boxSizing = 'border-box';
            // productCard.style.display = 'flex';

            const mainImage = document.createElement('img');
            mainImage.src = product.thumbnail;
            mainImage.classList.add('main-image');
            mainImage.style.width = '100%';
            mainImage.style.height = '200px';
            productCard.appendChild(mainImage);

            const title = document.createElement('div');
            title.classList.add('product-title');
            title.textContent = product.title.toUpperCase();
            title.style.fontFamily = "Poppins";
            title.style.fontWeight = 'bold';
            title.style.marginBottom = '10px';
            title.style.marginTop = '5px';
            title.style.textAlign = 'left'; 
            productCard.appendChild(title);

            const price = document.createElement('div');
            price.classList.add('product-price');
            price.textContent = 'Rs. ' + product.price + "/-";
            price.style.fontFamily = "Poppins";
            price.style.marginBottom = '10px';
            price.style.color="grey";
            price.style.display = 'flex';
            price.style.textDecoration='line-through';
            productCard.appendChild(price);

            const discountedPrice = document.createElement('div');
            const Discount_Price = (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2);
            discountedPrice.textContent = 'Rs. ' + Discount_Price + "/-";
            discountedPrice.style.fontFamily = "Poppins";
            discountedPrice.style.display = 'flex';
            discountedPrice.style.alignItems = 'center';
            discountedPrice.style.marginBottom = '10px';
            discountedPrice.style.fontWeight = 'bold';
            productCard.appendChild(discountedPrice);

            const save = document.createElement('div');
            save.style.display = 'flex';
            save.style.alignItems = 'center';
            save.style.marginBottom = '10px';
            const button = document.createElement('button');
            button.textContent = 'save ' + (product.discountPercentage) + '%';
            button.style.backgroundColor = "red";
            button.style.fontSize='12px';
            button.style.color="white";
            button.style.padding="5px 10px";
            button.style.borderRadius="10%";
            button.style.backgroundColor='#442C2E';
            save.appendChild(button);
            productCard.appendChild(save);

            const imageGallery = document.createElement('div');
            imageGallery.style.display = 'flex';
            imageGallery.style.flexWrap = 'wrap';
            imageGallery.classList.add('image-gallery');
            product.images.forEach(imageUrl => {
                const image = document.createElement('img');
                image.src = imageUrl;
                image.style.width = "40px";
                image.style.height = "40px";
                image.style.cursor = 'pointer';
                image.style.border = '1px solid #ccc';
                image.style.borderRadius = '5px';
                image.style.marginRight = '5px';
                image.style.objectFit = 'cover'; 
                imageGallery.appendChild(image);
            });
            imageGallery.style.marginBottom='10px';
            productCard.appendChild(imageGallery);

            const rating = document.createElement('div');
            if (product.rating >= 1 && product.rating <= 5) {
                for (let i = 0; i < product.rating; i++) {
                    const star = document.createElement('span'); 
                    star.textContent = "⭐";
                    rating.appendChild(star);        
                }
            } 
            else {
                console.error('Invalid rating:', product.rating);
            }
            rating.style.marginBottom='10px';
            productCard.appendChild(rating);

            const showDescriptionBtn = document.createElement('button');
            showDescriptionBtn.textContent = 'Show Description';
            showDescriptionBtn.style.width='100%';
            showDescriptionBtn.style.background='none';
            showDescriptionBtn.style.padding='5px 10px';
            showDescriptionBtn.style.borderRadius='10px';
            showDescriptionBtn.style.color="#442C2E";
            showDescriptionBtn.style.fontWeight='bold';
            showDescriptionBtn.style.fontFamily="Poppins";
            
            let count=0;
            const description = document.createElement('div');
            description.classList.add('description');
            description.textContent = product.description;
            description.style.color="#442C2E";
            description.style.fontFamily="Poppins";
            description.style.marginTop = '10px';
            description.textAlign = 'center'; 
            showDescriptionBtn.addEventListener('click', () => {
                if(count%2==0){
                    description.style.display = 'block';
                    showDescriptionBtn.textContent = 'Less Description';
                    count++;
                }
                else{
                    description.style.display = 'none';
                    description.textContent = product.description;
                    showDescriptionBtn.textContent = 'Show Description';
                    count++;
                }
                showDescriptionBtn.appendChild(description);
            });
            showDescriptionBtn.style.marginBottom='10px';
            productCard.appendChild(showDescriptionBtn);

            const cartBtn = document.createElement('button');
            cartBtn.textContent = 'Add To Cart';
            cartBtn.style.width='100%';
            cartBtn.style.background='#46351D';
            cartBtn.style.padding='5px 10px';
            cartBtn.style.borderRadius='10px';
            cartBtn.style.color="white";
            cartBtn.style.fontWeight='bold';
            cartBtn.style.fontFamily="Poppins";
            cartBtn.addEventListener('click', () => {
                addToCart(product);
            });
            productCard.appendChild(cartBtn);

            productContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function addToCart(product) {
    fetch('http://localhost:5000/add-to-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Error adding product to cart:', error);
    });
}

fetchProducts();





























///////////////////////////////////////////////////////////////////////////
// async function fetchProducts() {
//     try {
//         const response = await fetch('https://dummyjson.com/products?limit=15');
//         const data = await response.json();
        
//         const productContainer = document.getElementById('product-container');
//         productContainer.innerHTML = '';
//         productContainer.style.display = 'grid';
//         productContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
//         productContainer.style.gap = '5px';
        
//         data.products.forEach(product => {
//             const productCard = document.createElement('div');
//             productCard.classList.add('product-card');
//             productCard.style.border = '1px solid #ccc';
//             productCard.style.borderRadius = '5px';
//             productCard.style.padding = '20px';
//             productCard.style.marginBottom = '20px';
//             productCard.style.maxWidth = '300px';
//             productCard.style.width = '100%';
//             productCard.style.boxSizing = 'border-box';

//             const mainImage = document.createElement('img');
//             mainImage.src = product.thumbnail;
//             mainImage.classList.add('main-image');
//             mainImage.style.width = '100%';
//             mainImage.style.height = '200px';
//             productCard.appendChild(mainImage);

//             const title = document.createElement('div');
//             title.classList.add('product-title');
//             title.textContent = product.title.toUpperCase();
//             title.style.fontFamily = "Poppins";
//             title.style.fontWeight = 'bold';
//             title.style.marginBottom = '10px';
//             title.style.marginTop = '5px';
//             title.style.textAlign = 'left'; 
//             productCard.appendChild(title);

//             const price = document.createElement('div');
//             price.classList.add('product-price');
//             price.textContent = 'Rs. ' + product.price + "/-";
//             price.style.fontFamily = "Poppins";
//             price.style.marginBottom = '10px';
//             price.style.color="grey";
//             price.style.display = 'flex';
//             price.style.textDecoration='line-through';
//             productCard.appendChild(price);

//             const discountedPrice = document.createElement('div');
//             const Discount_Price = (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2);
//             discountedPrice.textContent = 'Rs. ' + Discount_Price + "/-";
//             discountedPrice.style.fontFamily = "Poppins";
//             discountedPrice.style.display = 'flex';
//             discountedPrice.style.alignItems = 'center';
//             discountedPrice.style.marginBottom = '10px';
//             discountedPrice.style.fontWeight = 'bold';
//             productCard.appendChild(discountedPrice);

//             const save = document.createElement('div');
//             save.style.display = 'flex';
//             save.style.alignItems = 'center';
//             save.style.marginBottom = '10px';
//             const button = document.createElement('button');
//             button.textContent = 'save ' + (product.discountPercentage) + '%';
//             button.style.backgroundColor = "red";
//             button.style.fontSize='12px';
//             button.style.color="white";
//             button.style.padding="5px 10px";
//             button.style.borderRadius="10%";
//             button.style.backgroundColor='#442C2E';
//             save.appendChild(button);
//             productCard.appendChild(save);

//             const imageGallery = document.createElement('div');
//             imageGallery.style.display = 'flex';
//             imageGallery.style.flexWrap = 'wrap';
//             imageGallery.classList.add('image-gallery');
//             product.images.forEach(imageUrl => {
//                 const image = document.createElement('img');
//                 image.src = imageUrl;
//                 image.style.width = "40px";
//                 image.style.height = "40px";
//                 image.style.cursor = 'pointer';
//                 image.style.border = '1px solid #ccc';
//                 image.style.borderRadius = '5px';
//                 image.style.marginRight = '5px';
//                 image.style.objectFit = 'cover'; 
//                 imageGallery.appendChild(image);
//             });
//             imageGallery.style.marginBottom='10px';
//             productCard.appendChild(imageGallery);

//             const rating = document.createElement('div');
//             if (product.rating >= 1 && product.rating <= 5) {
//                 for (let i = 0; i < product.rating; i++) {
//                     const star = document.createElement('span'); 
//                     star.textContent = "⭐";
//                     rating.appendChild(star);        
//                 }
//             } 
//             else {
//                 console.error('Invalid rating:', product.rating);
//             }
//             rating.style.marginBottom='10px';
//             productCard.appendChild(rating);

//             const showDescriptionBtn = document.createElement('button');
//             showDescriptionBtn.textContent = 'Show Description';
//             showDescriptionBtn.style.width='100%';
//             showDescriptionBtn.style.background='none';
//             showDescriptionBtn.style.padding='5px 10px';
//             showDescriptionBtn.style.borderRadius='10px';
//             showDescriptionBtn.style.color="#442C2E";
//             showDescriptionBtn.style.fontWeight='bold';
//             showDescriptionBtn.style.fontFamily="Poppins";
            
//             let count=0;
//             const description = document.createElement('div');
//             description.classList.add('description');
//             description.textContent = product.description;
//             description.style.color="#442C2E";
//             description.style.fontFamily="Poppins";
//             description.style.marginTop = '10px';
//             description.textAlign = 'center'; 
//             showDescriptionBtn.addEventListener('click', () => {
//                 if(count%2==0){
//                     description.style.display = 'block';
//                     showDescriptionBtn.textContent = 'Less Description';
//                     count++;
//                 }
//                 else{
//                     description.style.display = 'none';
//                     description.textContent = product.description;
//                     showDescriptionBtn.textContent = 'Show Description';
//                     count++;
//                 }
//                 showDescriptionBtn.appendChild(description);
//             });
//             showDescriptionBtn.style.marginBottom='10px';
//             productCard.appendChild(showDescriptionBtn);

//             const cartBtn = document.createElement('button');
//             cartBtn.textContent = 'Add To Cart';
//             cartBtn.style.width='100%';
//             cartBtn.style.background='#46351D';
//             cartBtn.style.padding='5px 10px';
//             cartBtn.style.borderRadius='10px';
//             cartBtn.style.color="white";
//             cartBtn.style.fontWeight='bold';
//             cartBtn.style.fontFamily="Poppins";
//             cartBtn.addEventListener('click', () => {
//                 alert('Congratulations!!! ' + product.title.toUpperCase() + ' added to the cart');
//             });
//             productCard.appendChild(cartBtn);

//             productContainer.appendChild(productCard);
//         });
//     } catch (error) {
//         console.error('Error fetching products:', error);
//     }
// }

// const searchContainer = document.getElementById('searchContainer');
// searchContainer.style.backgroundColor = '#4E0D3A';
// searchContainer.style.width = '100%';
// searchContainer.style.padding = '10px 10px';
// searchContainer.style.display = 'flex';
// searchContainer.style.alignItems = 'center';

// const searchInput = document.createElement('input');
// searchInput.setAttribute('type', 'text');
// searchInput.setAttribute('id', 'searchInput');
// searchInput.setAttribute('placeholder', 'Search products...');
// searchInput.style.padding = '2px';
// searchInput.style.border = '1px solid #ccc';
// searchInput.style.borderRadius = '5px';
// searchInput.style.fontSize = '14px';
// searchInput.style.width='40%';
// searchInput.style.marginRight = '10px';

// const searchButton = document.createElement('button');
// searchButton.setAttribute('id', 'searchButton');
// searchButton.textContent = 'SEARCH';
// searchButton.style.padding = '2px 5px';
// searchButton.style.border = 'none';
// searchButton.style.borderRadius = '5px';
// searchButton.style.backgroundColor = '#720D5D';
// searchButton.style.color = '#fff';
// searchButton.style.fontSize = '14px';
// searchButton.style.cursor = 'pointer';
// searchButton.style.marginRight = '10px';

// const clearButton = document.createElement('button');
// clearButton.setAttribute('id', 'clearButton');
// clearButton.textContent = 'CLEAR';
// clearButton.style.padding = '2px 5px';
// clearButton.style.border = 'none';
// clearButton.style.borderRadius = '5px';
// clearButton.style.backgroundColor = '#720D5D';
// clearButton.style.color = '#fff';
// clearButton.style.fontSize = '14px';
// clearButton.style.cursor = 'pointer';
// clearButton.style.marginRight = '10px';

// searchContainer.appendChild(searchInput);
// searchContainer.appendChild(searchButton);

// function showProducts(products) {
//     try {
//         const productContainer = document.getElementById('product-container'); 
//         productContainer.innerHTML = '';
//         productContainer.style.display = 'grid';
//         productContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
//         productContainer.style.gridGap = '20px';
        
//         products.forEach(product => {
//             const productCard = document.createElement('div');
//             productCard.classList.add('product-card');
//             productCard.style.border = '1px solid #ccc';
//             productCard.style.borderRadius = '5px';
//             productCard.style.padding = '20px';
//             productCard.style.marginBottom = '20px';
//             productCard.style.maxWidth = '300px';
//             productCard.style.width = '100%';
//             productCard.style.boxSizing = 'border-box';

//             const mainImage = document.createElement('img');
//             mainImage.src = product.thumbnail;
//             mainImage.classList.add('main-image');
//             mainImage.style.width = '100%';
//             mainImage.style.height = '200px';
//             productCard.appendChild(mainImage);

//             const title = document.createElement('div');
//             title.classList.add('product-title');
//             title.textContent = product.title.toUpperCase();
//             title.style.fontFamily = "Poppins";
//             title.style.fontWeight = 'bold';
//             title.style.marginBottom = '10px';
//             title.style.marginTop = '5px';
//             title.style.textAlign = 'left'; 
//             productCard.appendChild(title);

//             const price = document.createElement('div');
//             price.classList.add('product-price');
//             price.textContent = 'Rs. ' + product.price + "/-";
//             price.style.fontFamily = "Poppins";
//             price.style.marginBottom = '10px';
//             price.style.color="grey";
//             price.style.display = 'flex';
//             price.style.textDecoration='line-through';
//             productCard.appendChild(price);

//             const discountedPrice = document.createElement('div');
//             const Discount_Price = (product.price - (product.price * (product.discountPercentage / 100))).toFixed(2);
//             discountedPrice.textContent = 'Rs. ' + Discount_Price + "/-";
//             discountedPrice.style.fontFamily = "Poppins";
//             discountedPrice.style.display = 'flex';
//             discountedPrice.style.alignItems = 'center';
//             discountedPrice.style.marginBottom = '10px';
//             discountedPrice.style.fontWeight = 'bold';
//             productCard.appendChild(discountedPrice);

//             const save = document.createElement('div');
//             save.style.display = 'flex';
//             save.style.alignItems = 'center';
//             save.style.marginBottom = '10px';
//             const button = document.createElement('button');
//             button.textContent = 'save ' + (product.discountPercentage) + '%';
//             button.style.backgroundColor = "red";
//             button.style.fontSize='12px';
//             button.style.color="white";
//             button.style.padding="5px 10px";
//             button.style.borderRadius="10%";
//             button.style.backgroundColor='#442C2E';
//             save.appendChild(button);
//             productCard.appendChild(save);

//             const imageGallery = document.createElement('div');
//             imageGallery.style.display = 'flex';
//             imageGallery.style.flexWrap = 'wrap';
//             imageGallery.classList.add('image-gallery');
//             product.images.forEach(imageUrl => {
//                 const image = document.createElement('img');
//                 image.src = imageUrl;
//                 image.style.width = "50px";
//                 image.style.height = "80px";
//                 image.style.cursor = 'pointer';
//                 image.style.border = '1px solid #ccc';
//                 image.style.borderRadius = '5px';
//                 image.style.marginRight = '10px';
//                 image.style.objectFit = 'cover'; 
//                 imageGallery.appendChild(image);
//             });
//             imageGallery.style.marginBottom='10px';
//             productCard.appendChild(imageGallery);

//             const rating = document.createElement('div');
//             if (product.rating >= 1 && product.rating <= 5) {
//                 for (let i = 0; i < product.rating; i++) {
//                     const star = document.createElement('span'); 
//                     star.textContent = "⭐";
//                     rating.appendChild(star);        
//                 }
//             } 
//             else {
//                 console.error('Invalid rating:', product.rating);
//             }
//             rating.style.marginBottom='10px';
//             productCard.appendChild(rating);

//             const showDescriptionBtn = document.createElement('button');
//             showDescriptionBtn.textContent = 'Show Description';
//             showDescriptionBtn.style.width='100%';
//             showDescriptionBtn.style.background='none';
//             showDescriptionBtn.style.padding='5px 10px';
//             showDescriptionBtn.style.borderRadius='10px';
//             showDescriptionBtn.style.color="#442C2E";
//             showDescriptionBtn.style.fontWeight='bold';
//             showDescriptionBtn.style.fontFamily="Poppins";
            
//             let count=0;
//             const description = document.createElement('div');
//             description.classList.add('description');
//             description.textContent = product.description;
//             description.style.color="#442C2E";
//             description.style.fontFamily="Poppins";
//             description.style.marginTop = '10px';
//             description.textAlign = 'center'; 
//             showDescriptionBtn.addEventListener('click', () => {
//                 if(count%2==0){
//                     description.style.display = 'block';
//                     showDescriptionBtn.textContent = 'Less Description';
//                     count++;
//                 }
//                 else{
//                     description.style.display = 'none';
//                     description.textContent = product.description;
//                     showDescriptionBtn.textContent = 'Show Description';
//                     count++;
//                 }
//                 showDescriptionBtn.appendChild(description);
//             });
//             showDescriptionBtn.style.marginBottom='10px';
//             productCard.appendChild(showDescriptionBtn);

//             const cartBtn = document.createElement('button');
//             cartBtn.textContent = 'Add To Cart';
//             cartBtn.style.width='100%';
//             cartBtn.style.background='#46351D';
//             cartBtn.style.padding='5px 10px';
//             cartBtn.style.borderRadius='10px';
//             cartBtn.style.color="white";
//             cartBtn.style.fontWeight='bold';
//             cartBtn.style.fontFamily="Poppins";
//             cartBtn.addEventListener('click', () => {
//                 alert('Congratulations!!! ' + product.title.toUpperCase() + ' added to the cart');
//             });
//             productCard.appendChild(cartBtn);

//             productContainer.appendChild(productCard);
//         });
//     } catch (error) {
//         console.error('Error showing products:', error);
//     }
// }

// searchContainer.appendChild(searchInput);
// searchContainer.appendChild(searchButton);

// searchButton.addEventListener('click', () => {
//     const searchQuery = searchInput.value.trim().toLowerCase();
//     fetch('https://dummyjson.com/products?limit=15')
//     .then(response => response.json())
//     .then(data => {
//         const filteredProducts = data.products.filter(product =>
//             product.title.toLowerCase().includes(searchQuery)
//         );
//         showProducts(filteredProducts);
//     })
//     .catch(error => {
//         console.error('Error searching products:', error);
//     });
// });

// clearButton.addEventListener('click', () => {
//     searchInput.value = '';
//     fetchProducts();
// });

// searchContainer.appendChild(clearButton);

// fetchProducts();
