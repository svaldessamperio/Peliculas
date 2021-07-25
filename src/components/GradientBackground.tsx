import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientContext } from '../context/GradientContext';
import { useFadeInOut } from '../hooks/useFadeInOut';

interface Props{
    children: JSX.Element | JSX.Element[];
}

export default function GradientBackground({ children }: Props) {
    const { colors, prevColors, setPrevMainColors } = useContext(GradientContext);

    const { opacity, fadeIn, fadeOut } = useFadeInOut();

    useEffect(() => {
        fadeIn( () => {
            setPrevMainColors(colors);
            fadeOut(0);
        });
    }, [colors])

    return (
        <View style={{ flex: 1, }}>
            <LinearGradient
                colors={[prevColors.primary, prevColors.secondary, 'white']}
                style={{ ...StyleSheet.absoluteFillObject }}
                start={{ x: 0.1, y: 0.1 }}
                end={{ x: 0.5, y: 0.7 }}
            />
            <Animated.View
                style={{ 
                    ...StyleSheet.absoluteFillObject,
                    opacity,
                }}
            >
                <LinearGradient
                    colors={[colors.primary, colors.secondary, 'white']}
                    style={{ ...StyleSheet.absoluteFillObject }}
                    start={{ x: 0.1, y: 0.1 }}
                    end={{ x: 0.5, y: 0.7 }}
                />
            </Animated.View>

            { children }
        </View>
    )
}
