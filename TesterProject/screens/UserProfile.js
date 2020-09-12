import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { AppContext } from './Context';

class UserProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            datalist: '',
            message: '',
            data: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>USER PROFILE TO BE IMPLEMENTED SOON</Text>
                
            </View>
        );
    }
}

UserProfile.contextType = AppContext;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        marginTop: 20,
        alignSelf: 'center',
        width: 66,
        height: 58,
    },
    picture: {
        width: 66,
        height: 58,
    },
    title: {
        textAlign: 'center',
        fontSize: 30
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 20
    },
    form: {
        margin: 20,
        padding: 20,
        borderColor: 'red',
        borderWidth: 3,
        borderRadius: 10
    },
    inputbox: {
        borderBottomWidth: 1,
        padding: 0,
        marginBottom: 10
    }
})



export default UserProfile