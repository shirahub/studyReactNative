import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './screens/Menu';
import AlbumPicture from './screens/AlbumPicture'
import UserProfile from './screens/UserProfile'
import { AppContext } from './screens/Context';



const Stack = createStackNavigator();

class Main extends Component {
  constructor() {
    super();
    this.state = {
      title: "Appleen is the best app",
      userlist: [{ "username": "shir", "password": "leen", "picture": 'https://banner2.cleanpng.com/20180402/puq/kisspng-apple-color-emoji-fire-symbol-fire-letter-5ac1d6665a7469.5616020915226527743705.jpg' }],
      searchlist: [],
      userOn: '',
      albumId: ''
    }
  }

  userLogin = (username) => {
    this.setState({
      userOn: username
    })
  }

  // componentWillMount() {
  //   this.setState({
  //     searchlist: this.state.userlist
  //   })
  // }
  // changeTitle = (new) => {
  //   this.setState({
  //     title: new
  //   })
  // }
  deleteUser = (username) => {
    console.log(username)
    for (var i = 0; i < this.state.userlist.length; i++) {
      console.log(username === this.state.userlist[i].username)
      if (username === this.state.userlist[i].username) {
        this.state.userlist.splice(i, 1)
      }
    }
    console.log("delete", this.state.userlist)
  }

  searchUser = (username) => {
    console.log(username)
    var templist = []
    for (var i = 0; i < this.state.userlist.length; i++) {
      if (this.state.userlist[i].username.includes(username) || !username) {
        templist.push(this.state.userlist[i])
      }
    }
    this.setState({
      searchlist: templist
    })
    console.log("search", this.state.userlist)
  }

  render() {
    return (
      // <App title={this.state.title} changeTitle={title => this.setState({ title })}>
      <AppContext.Provider
      value={
        {
          userlist: this.state.userlist,
          addUser: user => this.state.userlist.push(user),
          userLogin: this.userLogin,
          chooseAlbum: id => this.setState({albumId:id}),
          albumId: this.state.albumId
        }
      }>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Open App" component={App} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Album Picture" component={AlbumPicture} />
          <Stack.Screen name="User Profile" component={UserProfile} />
          {/* <App
        userlist={this.state.userlist}
        searchlist={this.state.searchlist}
        addUser={user => this.state.userlist.push(user), this.searchUser}
        deleteUser={this.deleteUser}
        searchUser={this.searchUser}>
      </App> */}

          {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}


        </Stack.Navigator>
      </NavigationContainer>
      </AppContext.Provider>
    )
  }
}

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }
  }
  loginUser = () => {
    console.log("login", this.context.userlist)
    if (!this.state.username) {
      return alert("Username is required")
    }

    if (!this.state.password) {
      return alert("Password is required")
    }

    for (var i = 0; i < this.context.userlist.length; i++) {
      if (this.context.userlist[i].username === this.state.username && this.context.userlist[i].password === this.state.password) {
        // return alert("Login Success")
        this.context.userLogin(this.state.username)
        return this.props.navigation.navigate('Menu')
      }
    }
    return alert("Username/Password Invalid")
  }

  render() {
    return (
      <>
        <ScrollView>
          <View style={styles.container}>
            <Image style={styles.logo} source={{ uri: 'https://banner2.cleanpng.com/20180402/puq/kisspng-apple-color-emoji-fire-symbol-fire-letter-5ac1d6665a7469.5616020915226527743705.jpg' }} />
            <View style={styles.form}>
              <Text style={styles.subtitle}>
                Login
            </Text>
              <Text>Input username</Text>
              <TextInput style={styles.inputbox} onChangeText={username => this.setState({ username })} />
              <Text>Input password</Text>
              <TextInput style={styles.inputbox} secureTextEntry={true} onChangeText={password => this.setState({ password })} />
              <Button title="Login" onPress={this.loginUser}></Button>
            </View>
          </View>
        </ScrollView>
      </>
    )
  }
}

Login.contextType = AppContext;

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      repassword: '',
      picture: ''
    }
  }

  registerNewUser = () => {

    if (!this.state.username) {
      return alert("Username is required")
    }

    if (!this.state.password) {
      return alert("Password is required")
    }

    if (!this.state.repassword) {
      return alert("Password (again) is required")
    }

    if (!this.state.picture) {
      return alert("Picture is required")
    }

    if (!(this.state.password === this.state.repassword)) {
      return alert("Please input the same password")
    }

    var newUser = { "username": this.state.username, "password": this.state.password, "picture": this.state.picture }

    for (var i = 0; i < this.context.userlist.length; i++) {
      if (this.context.userlist[i].username === this.state.username) {
        return alert("Username has been used")
      }
    }

    this.context.addUser(newUser)
    return alert("Registration success")
  }

  render() {
    return (
      <>
        <ScrollView>
          <View style={styles.container}>
            <Image style={styles.logo} source={{ uri: 'https://banner2.cleanpng.com/20180402/puq/kisspng-apple-color-emoji-fire-symbol-fire-letter-5ac1d6665a7469.5616020915226527743705.jpg' }} />
            <View style={styles.form}>
              <Text style={styles.subtitle}>
                Register
            </Text>
              <Text>Input username</Text>
              <TextInput style={styles.inputbox} onChangeText={username => this.setState({ username })} />
              <Text>Input picture</Text>
              <TextInput style={styles.inputbox} onChangeText={picture => this.setState({ picture })} />
              <Text>Input password</Text>
              <TextInput style={styles.inputbox} secureTextEntry={true} onChangeText={password => this.setState({ password })} />
              <Text>Input password (again)</Text>
              <TextInput style={styles.inputbox} secureTextEntry={true} onChangeText={repassword => this.setState({ repassword })} />
              <Button title="Register" onPress={this.registerNewUser}></Button>
            </View>
          </View>
        </ScrollView>
      </>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      repassword: '',
      title: '',
      picture: '',
      search: '',
    }
  }

  


  render() {
    return (
      <>
        <ScrollView>
          <View style={styles.container}>
          <Image style={styles.logo} source={{ uri: 'https://banner2.cleanpng.com/20180402/puq/kisspng-apple-color-emoji-fire-symbol-fire-letter-5ac1d6665a7469.5616020915226527743705.jpg' }} />
          <Text style={styles.title}>NgeseLeen</Text>
            <Text style={styles.subtitle}>Slooowww</Text>
            <View></View>
            <Button
              title="Login"
              onPress={() =>
                this.props.navigation.navigate('Login')
              }
            />
            <Button
              title="Register"
              onPress={() =>
                this.props.navigation.navigate('Register')
              }
            />
          </View>
        </ScrollView>
      </>
    )
  }

}

Register.contextType = AppContext;

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

export default Main
