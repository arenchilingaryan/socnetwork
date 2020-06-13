import React, { useEffect, Fragment } from 'react'
import defaultUser from '../../img/defaultUser.jpg'
import { NavLink, Route, useParams } from 'react-router-dom'
import Followers from './followers/followers'
import Following from './following/following'
import { useHttp } from '../../hooks/http-hook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { setProfileData, updateProfileImg } from '../../redux/reducers/profile.reducer'
import { useAuth } from '../../hooks/auth-hook'
import ProfileInfo from './profile-info/profile-info'
import Spinner from '../spinner/spinner'
import './profile.scss'

function Profile(props) {

    const { request, loading } = useHttp()
    const { id, detail } = useParams()
    const auth = useAuth()
    useEffect(() => {
        if (!id && !detail) {
            if (auth.userId) {
                request('/api/profile/getinfo', 'POST', { userId: auth.userId }, true)
                    .then(data => props.setProfile(data.user))
            }
        } else if (id && id !== 'followers' && id !== 'following') {
            request('/api/profile/getinfo', 'POST', { userId: id }, false)
                .then(data => props.setProfile(data.user))
        }

    }, [auth.userId, id, detail, request])

    const handleFileSelect = (evt) => {
        const f = evt.target.files[0]
        const reader = new FileReader()
        reader.onload = (function (theFile) {
            return async function (e) {
                var binaryData = e.target.result
                const base64String = window.btoa(binaryData)
                try {
                    const imgReq = await request(
                        '/api/profile/updateimg',
                        'POST',
                        { userId: auth.userId, img: base64String },
                        true
                    )
                    if (!imgReq) {
                        return console.log('poka')
                    } else {
                        props.updateImg(base64String)
                    }

                } catch (e) {
                    throw new Error(e)
                }
            }
        })(f)
        if (!f) {
            return null
        }
        reader.readAsBinaryString(f)
    }

    return (
        <div className="profile__wrapper">
            <div className="profile__container">
                {
                    loading
                        ? <Spinner />
                        : <Fragment>
                            <div className="profile__header">
                                <div className="profile__img-content">
                                    <img className="profile__img" src={props.profile.img ? `data:image/png;base64,${props.profile.img}` : defaultUser} alt="sorry bro :'(" />
                                    <div className="profile__image-upload" style={id || !auth.token ? { display: 'none' } : { display: 'block' }}>
                                        <label htmlFor="file-input">
                                            <FontAwesomeIcon style={!id ? { display: 'block' } : { display: 'none' }} className="profile__uploadIcon" icon={faFileUpload} />
                                        </label>
                                        <input onChange={handleFileSelect} className="file-input" id="file-input" type="file" />
                                    </div>
                                </div>
                                <div className="profile__header-info">
                                    <h3> {props.profile.userName} </h3>
                                </div>
                                <NavLink to="/edit">
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        className="profile__edit-icon"
                                        style={!id ? { display: 'block' } : { display: 'none' }}
                                    />
                                </NavLink>
                            </div>
                            <div className="profile__stats">
                                <div className="profile__followers-num">
                                    <p>Followers</p>
                                    <h1> <NavLink className="profile__stats-item" to="/profile/followers"> {props.profile.followers.length} </NavLink> </h1>
                                </div>
                                <div className="profile__following-num">
                                    <p>Following</p>
                                    <h1> <NavLink className="profile__stats-item" to="/profile/following">{props.profile.following.length}</NavLink> </h1>
                                </div>
                            </div>
                            <div className="profile__content">
                                <Route path="/profile/:id?/followers" component={Followers} />
                                <Route path="/profile/:id?/following" component={Following} />
                                <Route path="/profile/:id?" exact component={ProfileInfo} />
                            </div>
                        </Fragment>
                }

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
        setProfile: (data) => dispatch(setProfileData(data)),
        updateImg: (img) => dispatch(updateProfileImg(img))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)