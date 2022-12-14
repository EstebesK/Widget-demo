
export const SET_FORM_DATA = './form-reducer/SET_FORM_DATA';
const SET_NOTE = './form-reducer/SET_NOTE';
const LOGOUT = './form-reducer/LOGOUT';
const SET_CAR_ID = './form-reducer/SET_CAR_ID';
const SET_ORDER_SUM = './form-reducer/SET_ORDER_SUM';
const SET_PAYMENT_FORM = './form-reducer/SET_PAYMENT_FORM';

let initialState = {
    orderType: 3,
    bookingType: 0,
    orderSum: 0,
    orderStartDateTime: "",
    passengersQuantity: 0,
    carInfo: {
        id: 0,
    },
    orderAddressDetails: [
        {
            rideCheckPoint: "",
            latitude: 0,
            longitude: 0,
            placeType: 0,
            placeId: ""
        },
        {
            rideCheckPoint: "",
            latitude: 0,
            longitude: 0,
            placeType: 0,
            placeId: ""
        }
    ],
    orderNotes: "",
    hours: 0,
    paymentInfo: {
        cardNumber: "",
        month: null,
        year: null,
        cvc: "",
        amount: 0,
    },
    client: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        zip: "",
        cityId: 0,
        stateId: 0
    },
    greetClientInfo: {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    },
    isAirportPickupIncluded: false,
    flightNumber: "",
    airlines: {
        id: 0,
    }
}


const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FORM_DATA:
            return {
                ...state, ...action.dataForm
            }
        case SET_NOTE:
            return {
                ...state, orderNotes: action.note
            }
        case SET_CAR_ID:
            return {
                ...state, carInfo: { id: action.id }
            }
        case SET_ORDER_SUM:
            return {
                ...state, orderSum: action.sum
            }
        case LOGOUT:
            return {
                orderType: 3,
                bookingType: 0,
                orderSum: 0,
                orderStartDateTime: "",
                passengersQuantity: 0,
                carInfo: {
                    id: 0,
                },
                orderAddressDetails: [
                    {
                        rideCheckPoint: "",
                        latitude: 0,
                        longitude: 0,
                        placeType: 0,
                        placeId: ""
                    },
                    {
                        rideCheckPoint: "",
                        latitude: 0,
                        longitude: 0,
                        placeType: 0,
                        placeId: ""
                    }
                ],
                orderNotes: "",
                hours: 0,
                paymentInfo: {
                    cardNumber: "",
                    month: null,
                    year: null,
                    cvc: "",
                    amount: 0,
                },
                client: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    address: "",
                    zip: "",
                    cityId: 0,
                    stateId: 0
                },
                greetClientInfo: {
                    id: 0,
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: ""
                },
                isAirportPickupIncluded: false,
                flightNumber: "",
                airlines: {
                    id: 0,
                }
            }
        case SET_PAYMENT_FORM:
            return {
                ...state, greetClientInfo: { ...action.form.greetClientInfo }, paymentInfo: { ...action.form.paymentInfo, month: action.date[0], year: action.date[1] }, client: { ...action.form.client, cityId: action.cityId, stateId: action.stateId }
            }
        default:
            return state;
    }
}


export const setFormData = (dataForm) => ({ type: SET_FORM_DATA, dataForm })

export const logOut = () => ({ type: LOGOUT })

export const setNoteRedux = (note) => ({ type: SET_NOTE, note })

export const setCarId = (id) => ({ type: SET_CAR_ID, id })

export const setOrderSum = (sum) => ({ type: SET_ORDER_SUM, sum })

export const setPaymentForm = (form, cityId, stateId, date) => ({ type: SET_PAYMENT_FORM, form, cityId, stateId, date })


export default formReducer;


// ByDistance = 1,
// ByHour = 2,
// AirportTransfer = 3

