// As rotas são os caminhos de navegação, aonde nós acessamos as telas e abrimos no App, temos q abrir o login primeiro e dps home e outros!
// Nesse momento para não precisar ficar fazendo o login toda h, estamos direcionados para a Home page, essa pasta será atualizada antes da entrega final!
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import AppStack from './AppStack'
import AuthStack from './AuthStack'
import notifee from '@notifee/react-native'

export default function Routes() {
    const { authData, userUid } = useContext(AuthContext)

    notifee.onForegroundEvent(async (detail, type) => {
        console.log('Foreground Event')
        console.log(type)
        const userid = detail.detail.notification.data.userid
        if (type == 2 && detail.notification.android.actions[0].pressAction.id === 'reply') {
            fetch(`https://nextjs-ipesaudeapi.vercel.app/api/update-notification/${userid}`, {
                method: 'PUT',
                body: JSON.stringify({
                    userReply: detail.input,
                    readConfirm: new Date()
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                }
            }).then(async response => {
                await notifee.cancelNotification(detail.notification.id)
                console.log('Resposta enviada para API com sucesso!')
            }).catch((error) => {
                console.error(error)
            })
        }
    })

    return (
        authData ? <AppStack /> : <AuthStack />
    )
}