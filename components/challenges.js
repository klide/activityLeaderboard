import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Button,
    TextInput
} from 'react-native';

export default class Challenges extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Manage Challenges</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        padding: 10
    }
});
