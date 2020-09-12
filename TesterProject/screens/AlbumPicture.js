import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import { AppContext } from './Context';

class AlbumPicture extends React.Component {
    constructor() {
        super();
        this.state = {
            datalist: '',
            message: '',
            data: []
        }
    }

    findInArray = (array, id) => {
        var temparray = [];
        console.log("Find in array")
        for (var i = 0; i<array.length; i++) {
            if (array[i].albumId === id) {
            console.log("array", array[i].id)
            temparray.push(array[i])
            }
        }
        console.log("length", temparray.length)
        return temparray
    }

    async componentDidMount() {
        var findId = this.context.albumId
        this.setState({
            message: "Fetching... Please wait"
        })
        //GET request 
        await fetch('https://jsonplaceholder.typicode.com/photos', {
            method: 'GET'
            //Request Type 
        })
            .then((response) => response.json())
            //If response is in json then in success
            .then((responseJson) => {
                this.setState({
                    datalist : responseJson,
                    message: "Fetching picture success",
                    data: this.findInArray(responseJson, findId)
                })
                // //Success 
                // alert(JSON.stringify(responseJson));
                // console.log(responseJson);
            })
            //If response is not in json then in error
            .catch((error) => {
                this.setState({
                    message: "Fetching picture fail"
                })
                //Error 
                // alert(JSON.stringify(error));
                console.error(error);
            });
    }


    render() {
        // console.log("i am at album", this.context.albumId)
        // console.log("the data", this.state.data)
        return (
            <ScrollView>
            <View>
                 <Text>{this.state.message}</Text>
                 <Text>Album Photos:</Text>
            {
                this.state.data.map((album, index) => (
                    <View>
                        <Text>{index+1}. {album.title}</Text>
                        <Image style={styles.picture} source={{uri: album.thumbnailUrl}} />
                    </View>
                ))
            }
        </View>
        </ScrollView>
        );
    }
}

AlbumPicture.contextType = AppContext;

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



export default AlbumPicture