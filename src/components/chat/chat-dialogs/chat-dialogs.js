import React, { useEffect, useState } from 'react'
import './chat-dialogs.scss'
import { connect } from 'react-redux'
import { useHttp } from '../../../hooks/http-hook'
import { setDialogs, setCurrentMessages, setCurrentUser, setCurrentDialogId } from '../../../redux/reducers/dialogs.reducer'
import io from 'socket.io-client'
import Spinner from '../../spinner/spinner'
import { useHistory } from 'react-router-dom'

const socket = io('https://obscure-dusk-00211.herokuapp.com/')

function ChatDialogs(props) {
  const { request, loading } = useHttp()
  const history = useHistory()

  useEffect(() => {
    props.myProfile.dialogs.map(el => {
      return request('/api/profile/getinfo', 'POST', { userId: el.with }, true).then(res => {
        const dialogObj = { ...res.user, dialogId: el.id }
        props.setDialogs(dialogObj)
      }
      )
    })
  }, [props.myProfile])

  const loadMessages = async (dialogId, userId) => {
    try {
      const data = await request('/api/dialogs/getdialog', 'POST', {id: dialogId}, true)
      const user = await request('/api/profile/getinfo', 'POST', { userId }, true)
      props.setCurrentUser(user.user)
      props.setCurrentDialog(data.messages)
      props.setCurrentDialogId(dialogId)
      history.push('/messages/dialog')
    } catch (e) {
      throw new Error(e)
    }
  }

  return (
    <div>
      <div className="messages__contacts">
        <h2 className="messages__contacts-title">Dialogs</h2>
        {
          loading
            ? <Spinner />
            : <ul>
              {
                props.dialogs.dialogs.map(el => {
                  return (
                    <li key={el.dialogId} onClick={() => loadMessages(el.dialogId, el.userId)} className="messages__contact-item">
                      <span > {el.firstName + ' ' + el.lastName} </span>
                    </li>
                  )
                })
              }
            </ul>
        }
      </div>
    </div>
  )
}


function mapStateToProps(state) {
  return {
    myProfile: state.myProfile,
    dialogs: state.dialogs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setDialogs: (data) => dispatch(setDialogs(data)),
    setCurrentDialog: (currentDate) => dispatch(setCurrentMessages(currentDate)),
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setCurrentDialogId: (id) => dispatch(setCurrentDialogId(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatDialogs)