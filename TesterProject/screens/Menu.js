import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { AppContext } from './Context';

class MenuScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            isFetching: false,
            datalist: [],
            templist: [],
            message: '',
            jump:0,
            pagination: 1
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        //GET request 
        this.setState({
            message: "Fetching... Please wait",
            isFetching: true
        })
        fetch('https://jsonplaceholder.typicode.com/albums', {
            method: 'GET'
            //Request Type 
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    datalist: responseJson,
                    message: "Fetching success",
                    isFetching: false,
                    templist: responseJson.slice(0, 10)
                })
                // //Success 
                // alert(JSON.stringify(responseJson));
                // console.log(responseJson);
            })
            //If response is not in json then in error
            .catch((error) => {
                this.setState({
                    message: "Fetching fail",
                    isFetching: false
                })
                //Error 
                // alert(JSON.stringify(error));
                console.error(error);
            });
    }


    onPrevious = async () => {
        await this.setState({
            pagination: this.state.pagination - 1,
        })
        await this.setState({
            templist: this.state.datalist.slice(this.state.pagination * 10 - 10, this.state.pagination * 10)
        })
    }

    onNext = async () => {
        await this.setState({
            pagination: this.state.pagination + 1
        })

        await this.setState({
            templist: this.state.datalist.slice(this.state.pagination * 10 - 10, this.state.pagination * 10)
        })
    }

    onJump = async (i) => {
        console.log("the value", i)

        await this.setState({
            jump: i
        })

        await this.setState({
            pagination: this.state.jump
        })

        await this.setState({
            templist: this.state.datalist.slice(this.state.pagination * 10 - 10, this.state.pagination * 10)
        })
    }

    generateLinks = () => {
        var template = []
        for (var i=1; i<11;i++) {
            if (i !== this.state.pagination) {
                console.log(i)
                var k = i
                template.push(
                        <TouchableOpacity key={k} onPress={this.onJump.bind(this,k)}>
                            <Text>{k}</Text>
                        </TouchableOpacity>
                )
            } else {
                continue
            }
        }
        return template
    }

    // onPress={this.onJump(i)

    showPageButton = () => {

        if (this.state.pagination === 1) {
            return (
                <View>
                    <Button title="Next" onPress={this.onNext}></Button>
                    {this.generateLinks()}
                </View>
            )
        } else if (this.state.pagination === 10) {
            return (
                <View>
                    <Button title="Previous" onPress={this.onPrevious}></Button>
                    {this.generateLinks()}
                </View>
            )
        } else {
            return (
                <View>
                    <Button title="Previous" onPress={this.onPrevious}></Button>
                    {this.generateLinks()}
                    <Button title="Next" onPress={this.onNext}></Button>
                </View>
            )
        }

    }

    render() {
        // console.log("my data", this.state.datalist)
        // console.log("templist" ,this.state.templist)
        console.log("jump", this.state.jump)
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text>{this.state.isFetching}</Text>
                    <Text>{this.state.message}</Text>
                    <Text>Click on an album to view album's picture</Text>
                    <Text style={styles.subtitle}>{this.state.pagination}</Text>
                    <View>
                        {
                            this.state.templist.map((album, index) => (
                                <View style={styles.list}>
                                    <TouchableOpacity
                                        key={album.id}
                                        onPress={() => { this.props.navigation.navigate('Album Picture'); this.context.chooseAlbum(album.id) }}>
                                        <Text style={styles.text}>
                                            {album.id}. {album.title}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                        {this.showPageButton()}

                    </View>
                </View>
            </ScrollView>
        );

    }
}

MenuScreen.contextType = AppContext;



const styles = StyleSheet.create({
    text: {
        textAlign: 'left'
    },
    container: {
        flex: 1
    },
    list: {
        flex: 1,
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

export default MenuScreen