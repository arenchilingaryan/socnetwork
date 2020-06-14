import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import Profile from '../profile/profile'
import EditPage from '../edit/edit'
import Users from '../users/users'
import { connect } from 'react-redux'
import { setMyProfileData } from '../../redux/reducers/my.profile.reducer'
import { useHttp } from '../../hooks/http-hook'
import { useAuth } from '../../hooks/auth-hook'

function AuthRoutes(props) {
    const { request } = useHttp()
    const { userId } = useAuth()
    useEffect(() => {
        if (userId) {
            request('/api/profile/getinfo', 'POST', {userId}, true)
            .then(res => props.setMyProfile(res.user))
        }
    }, [userId])

    return (
        <div>
            <Route path="/profile/:id?/:detail?" component={Profile}/>
            <Route path="/edit" component={EditPage}/>
            <Route path="/users" component={Users} />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        myProfile: state.myProfile
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setMyProfile: (data) => dispatch(setMyProfileData(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthRoutes)