import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Image, AsyncStorage } from 'react-native'
import socketio from 'socket.io-client'

import Logo from '../assets/logo.png'
import SpotList from '../components/spotlist'


export default function List(){
    
    const [techs, setTechs] = useState([]);

    useEffect(()=> {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.77:3333', { 
                query: { user_id }, 
                
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserba em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA': 'REJEITADA'}`)
            })
        })

    }, [])
    
    useEffect(() =>{
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray)
            console.log(techs)
        })

    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={Logo}/>
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
            </ScrollView>
            
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,

    },

    logo:{
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 40,

    },
})