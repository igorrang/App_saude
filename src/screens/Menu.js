import { View } from 'native-base'
import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JanelaPerfil from '../screens/JanelaPerfil.js'
import Home from '../screens/Home';
import Notificacoes from './Notificacoes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import notifications from '../JSON/notifications.json'

const Tab = createBottomTabNavigator();

export default function Menu({ navigation }) {
    const [numberNotifications, setNumberNotifications] = useState(0);

    useEffect(() => {
        const n = notifications.length
        setNumberNotifications(n)
    }, [numberNotifications])

    return (
        <View style={{ flex: 1, }}>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'JanelaPerfil') {
                            iconName = focused ? 'person-circle' : 'person-circle-outline';
                        } else if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Notificações') {
                            iconName = focused ? 'notifications' : 'notifications-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#00b188',
                    tabBarInactiveTintColor: '#667466',
                })}
           
            >
                <Tab.Screen
                    name="JanelaPerfil"
                    component={JanelaPerfil}
                    options={{
                        title: 'Perfil',
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        title: 'Home',
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Notificações"
                    component={Notificacoes}
                    options={{
                        title: 'Notificações',
                        headerShown: false,
                        tabBarBadge: numberNotifications
                    }}
                />

            </Tab.Navigator>
        </View>
    )
}