

const SET_COMPANY_PROFILE = '/redux/companyProfileReducer/SET_COMPANY_PROFILE';
const RESERVATION_SUCCESS = '/redux/companyProfileReducer/RESERVATION_SUCCESS';
const APP_INITIALIZING = '/redux/companyProfileReducer/APP_INITIALIZING';

let initialState = {
    profile: {
        companyName: 'Test',
        carTypes: [
            {
                id: 1,
                name: 'Sedan',
                description: 'Passenger car',
                capacity: 3,
                imageUrl: 'https://admin.bookinglane.com/images/cartypes/sedan.png'
            },
            {
                id: 2,
                name: 'SUV',
                description: 'SUV',
                capacity: 7,
                imageUrl: 'https://admin.bookinglane.com/images/cartypes/suv.png'
            },
            {
                id: 3,
                name: 'Mini bus',
                description: 'Mini bus',
                capacity: 12,
                imageUrl: 'https://admin.bookinglane.com/images/cartypes/minibus.png'
            },
            {
                id: 4,
                name: 'Limousine',
                description: 'Limousine',
                capacity: 18,
                imageUrl: 'https://admin.bookinglane.com/images/cartypes/limo.png'
            }
        ],
    },
    isSuccess: false,
    initializing: false
}

const companyProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPANY_PROFILE:
            return {
                ...state, profile: action.profile
            }
        case RESERVATION_SUCCESS:
            return {
                ...state, isSuccess: action.isSuccess
            }
        case APP_INITIALIZING:
            return {
                ...state, initializing: action.initializing
            }
        default:
            return state;
    }
}

export const setCompanyProfile = (profile) => ({ type: SET_COMPANY_PROFILE, profile })

export const isSuccess = (isSuccess) => ({ type: RESERVATION_SUCCESS, isSuccess })

export const initializing = (initializing) => ({ type: APP_INITIALIZING, initializing })


export default companyProfileReducer;
