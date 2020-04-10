import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image, AsyncStorage } from 'react-native'
import Logo from '../assets/logo.png'
import SpotList from '../components/spotlist'


export default function List(){
    
    const [techs, setTechs] = useState([]);
    
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