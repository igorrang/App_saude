import React, { useContext } from 'react'
import { Notification } from '../components/Notification';
import { FlatList, View, Text } from 'native-base'
import notifications from '../JSON/notifications.json'
import { AuthContext } from '../contexts/AuthContext';

export default function Notificacoes() {
    return (
        <>
            <View backgroundColor='orange.500' height={55} alignItems='center' paddingY={2} flexDirection='row' borderBottomRadius={15} justifyContent='center'>
                <Text fontSize={20} color='white'>Notificações</Text>
            </View>
            <View bg="white" w="100%" flex={1} alignItems="center">
                <FlatList
                    width="100%"
                    contentContainerStyle={{
                        alignItems: 'center',
                    }}
                    data={notifications}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (
                        <Notification key={item._id} title={item.title} description={item.description} />
                    )} />
            </View>
        </>
    )
}