import React, { useEffect } from 'react'
import DefaultUser from '../../../img/defaultUser.jpg'
import { useParams } from 'react-router-dom'
import { useHttp } from '../../../hooks/http-hook'
import { useAuth } from '../../../hooks/auth-hook'
import { connect } from 'react-redux'
import { setProfileData } from '../../../redux/reducers/profile.reducer'
import './followers.scss'

function Followers(props) {
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
        <div className="profile__followers">
            <div className="followers__item">
                <img className="followers__item-img" src={DefaultUser} alt="sorry bro"/>
                <span className="followers__item-name">USERNAME</span>
            </div>
            <div className="followers__item">
                <img className="followers__item-img" src={DefaultUser} alt="sorry bro"/>
                <span className="followers__item-name">USERNAME</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Followers)