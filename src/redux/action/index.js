export const addCart = (product) =>{
    return {
        type:"ADDITEM",
        payload:product
    }
}

export const delCart = (product) =>{
    return {
        type:"DELITEM",
        payload:product
    }
}

export const resetCart = (product) =>{
    return {
        type:"RESETCART",
        payload:product
    }
}