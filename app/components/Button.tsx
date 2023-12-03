import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'

export enum IconType  {
    camera = 'camera',
    image = 'image',
    video = 'video',
    forward = 'forward',
    back = 'back',
    retweet = 'retweet',
    check = 'check',
    play = 'play',
    minuscircle = 'minuscircle'
}

type PropTypes = {
    title: string,
    onPress: () => void,
    icon: IconType,
    color?: string,

}

const CameraButton = ({title, onPress, icon, color}: PropTypes) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Entypo name={icon} size={24} color={color? color: '#f1f1f1'} />
            <Text style={styles.text}>{title}</Text> 
        </TouchableOpacity>
    )
}

export default CameraButton

const styles = StyleSheet.create({
    text: {
        color: '#f1f1f1',
        fontSize: 12,
        fontWeight: 'bold',
    },
    button: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        border: '1px solid #000',

    }
})
