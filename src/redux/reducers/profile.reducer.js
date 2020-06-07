export { };

const initialState = {
    _id: '',
    img: '',
    userName: '',
    birthday: '',
    email: '',
    about: '',
    edit: false,
    age: '',
}

export const setProfileEdit = () => ({ type: 'TOGGLE_PROFILE_EDIT' })
export const setProfileData = (data) => ({ type: 'SET_PROFILE_DATA', data })
export const updateProfileData = (form) => ({ type: 'UPDATE_PROFILE_DATA', form })
export const updateProfileImg = (img) => ({ type: 'UPDATE_PROFILE_IMG', img })


export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case 'TOGGLE_PROFILE_EDIT':
            return { ...state, edit: !state.edit }
        case 'SET_PROFILE_DATA': {
            const { user } = action.data
            const { _id, birthday, email, about, age, userName, img } = user
            return {
                ...state,
                _id,
                img,
                userName,
                birthday,
                email,
                about,
                edit: false,
                age
            }
        }
        case 'UPDATE_PROFILE_DATA': {
            const { birthday, about, age, userName } = action.form
            return {
                ...state,
                userName,
                birthday,
                about,
                edit: false,
                age
            }
        }
        case 'UPDATE_PROFILE_IMG': {
            return { ...state, img: action.img }
        }

        default: return state
    }
}