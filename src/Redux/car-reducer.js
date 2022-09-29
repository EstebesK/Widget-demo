
const SET_CAR_ID = './car-reducer/SET_CAR_ID';


let initialState = {
    cars: [],
    carId: null
}


const carsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CAR_ID:
            return {
                ...state, carId: action.id
            }
        default:
            return state;
    }
}

export const setCarCategoryId = (id) => ({ type: SET_CAR_ID, id })

export default carsReducer;

// ByDistance = 1,
// ByHour = 2,
// AirportTransfer = 3

