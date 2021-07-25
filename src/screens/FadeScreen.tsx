
import React, { useRef } from 'react'
import { View, Animated, Button } from 'react-native'
import { useFadeInOut } from '../hooks/useFadeInOut';

export default function FadeScreen() {
const { opacity, fadeIn, fadeOut } = useFadeInOut();
    return (
        <View style={{
            flex:1,
            flexDirection:'column',
            backgroundColor: 'gray',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Animated.View style={{
                backgroundColor: 'blue',
                width: 130,
                height: 150,
                borderColor: 'white',
                borderWidth: 5,
                opacity: opacity,
            }}/>
            <Button
                title='Fade In'
                onPress={fadeIn}
            />
            <Button
                title='Fade Out'
                onPress={fadeOut}
            />            
        </View>
    )
}
