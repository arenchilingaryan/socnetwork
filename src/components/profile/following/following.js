import React, { useEffect } from 'react'
import DefaultUser from '../../../img/defaultUser.jpg'
import { useParams } from 'react-router-dom'
import { useHttp } from '../../../hooks/http-hook'
import { useAuth } from '../../../hooks/auth-hook'
import { connect } from 'react-redux'
import { setProfileData } from '../../../redux/reducers/profile.reducer'
import './following.scss'

function Following(props) {
    const { id } = useParams()
    const { request } = useHttp()
    const auth = useAuth()

    useEffect(() => {
        if (!id) {
            if (auth.userId) {
                request('/api/profile/getinfo', 'POST', {userId: auth.userId}, true)
                .then(data => props.setProfile(data.user))
            }
        } else {
            request('/api/profile/getinfo', 'POST', {userId: id}, false)
            .then(data => props.setProfile(data.user))
        }
    }, [auth.userId])
    return (
        <div className="profile__following">
            <div className="following__item">
                <img className="following__item-img" src={DefaultUser} alt="sorry bro :'("/>
                <span className="following__item-name">USERNAME</span>
                <button>Unfollow</button>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        profile: state.profile
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setProfile: (data) => dispatch(setProfileData(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Following)