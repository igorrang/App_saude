import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { Button } from 'native-base';
import { AuthContext } from '../contexts/AuthContext';

export default function Exemplo() {
    const { logout } = useContext(AuthContext);
    return (
        <View>
            <Text>Exemplo</Text>
            <Button onPress={() => logout()}>Sair</Button>
        </View>
    )
}