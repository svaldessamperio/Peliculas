import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { styles } from '../styles/Styles';

export default function IndicadorActividad() {
    return (
        <>
            <ActivityIndicator
                size={100}
                color="red"
            />
        </>
    )
}

