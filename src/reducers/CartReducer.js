export default function CartReducer(state, action) {
    if (state === undefined) {
        const localStorageCart = localStorage.getItem('cart');
        if (localStorageCart) {
            return JSON.parse(localStorageCart)
        }
        else {
            return []
        }

    }
    else if (action.type === 'REMOVE_ITEM') {
        const newCart = [...state];
        const prodIndex = newCart.findIndex((e) => e.id === action.payload);
        if (prodIndex !== -1) {
            newCart.splice(prodIndex, 1);
        }

        localStorage.setItem("cart", JSON.stringify(newCart));

        return newCart

    }
    else if (action.type === 'ADD_ITEM') {
        const existingItemIndex = state.findIndex((item) => item.id === action.payload);

        if (existingItemIndex !== -1) {
            const updatedCart = [...state];
            updatedCart[existingItemIndex] = {
                ...updatedCart[existingItemIndex],
                count: updatedCart[existingItemIndex].count + 1,
            };

            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart
        } else {
            const newItem = {
                id: action.payload.id,
                price: action.payload.price,
                title: action.payload.title,
                description: action.payload.description,
                image: action.payload.image,
                count: 1,
            };

            const updatedCart = [...state, newItem];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart
        }

    }
    else if (action.type === 'ADD_ONE') {
        const updatedCart = [...state];
        const elemenToUpdate = updatedCart.find((e) => e.id === action.payload);

        elemenToUpdate.count = elemenToUpdate.count + 1;

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart
    }
    else if (action.type === 'REMOVE_ONE') {
        const updatedCart = [...state];
        const elemenToUpdate = updatedCart.find((e) => e.id === action.payload);

        if (elemenToUpdate.count > 1) {
            elemenToUpdate.count = elemenToUpdate.count - 1;
        }


        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart
    }
    else {
        return state
    }
}