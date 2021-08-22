export const initialState = {
    basket: [],
    product: []
}

const reducer = (state, action) => {
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            }
        
        case 'RM_FROM_BASKET':
            console.log(action.id)
            return {
                ...state,
                basket: state.basket.filter(item => item.specific_id !== action.id)
            }

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }

        case 'SET_PRODUCTS':
            return{
                ...state,
                product: action.products
            }

        default:
            return "NONE"
    }

}

export default reducer;
