import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image, ScrollView, TouchableOpacity } from 'react-native';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      title: "Appleen is the best app",
      userlist: [{ "username": "shir", "password": "leen", "picture":'https://banner2.cleanpng.com/20180402/puq/kisspng-apple-color-emoji-fire-symbol-fire-letter-5ac1d6665a7469.5616020915226527743705.jpg' }],
      searchlist: []
    }
  }

  componentWillMount() {
    this.setState({
      searchlist:this.state.userlist
    })
  }
  // changeTitle = (new) => {
  //   this.setState({
  //     title: new
  //   })
  // }
  deleteUser = (username) => {
    console.log(username)
    for (var i = 0; i< this.state.userlist.length; i++) {
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
    for (var i = 0; i< this.state.userlist.length; i++) {
      if (this.state.userlist[i].username.includes(username) || !username) {
        templist.push(this.state.userlist[i])
      }
    }
    this.setState({
      searchlist:templist
    })
    console.log("search", this.state.userlist)
  }

  render() {
    return (
      // <App title={this.state.title} changeTitle={title => this.setState({ title })}>
      <App
        userlist={this.state.userlist}
        searchlist={this.state.searchlist}
        addUser={user => this.state.userlist.push(user), this.searchUser}
        deleteUser={this.deleteUser}
        searchUser={this.searchUser}>
      </App>
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

    for (var i = 0; i < this.props.userlist.length; i++) {
      if (this.props.userlist[i].username === this.state.username) {
        return alert("Username has been used")
      }
    }

    this.props.addUser(newUser)
    return alert("Registration success")
  }

  loginUser = () => {

    if (!this.state.username) {
      return alert("Username is required")
    }

    if (!this.state.password) {
      return alert("Password is required")
    }

    for (var i = 0; i < this.props.userlist.length; i++) {
      if (this.props.userlist[i].username === this.state.username && this.props.userlist[i].password === this.state.password) {
        return alert("Login Success")
      }
    }
    return alert("Username/Password Invalid")
  }

  searchBar = () => {
    this.props.searchUser(this.state.search)
  }

  // handleChangeTitle = () => {
  //   this.props.changeTitle("Appleen is not the best")
  // }

  // UNSAFE_componentWillReceiveProps(a) {
  //   console.log("componentWillReceiveProps", a.title)
  //   console.log(a.title !== "Appleen is still the best")
  //   if (a.title !== "Appleen is still the best") {
  //     this.setState({
  //       title: "APPLEEN THE BEST"
  //     })
  //   }
  // }

  render() {
    return (
      <>
        <ScrollView>
          <View style={styles.container}>
            <Image style={styles.logo} source={{ uri: 'https://banner2.cleanpng.com/20180402/puq/kisspng-apple-color-emoji-fire-symbol-fire-letter-5ac1d6665a7469.5616020915226527743705.jpg' }} />
            <Text style={styles.title}>APPLEEN</Text>
            {/* <Text style={{ textAlign: "center" }}>{this.state.title}</Text>
            <Button onPress={this.handleChangeTitle} title="Change" /> */}
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

          <View>
            <Text>Search</Text>
            <TextInput style={styles.inputbox} onChangeText={search => this.setState({ search })} />
            <Button title="Search" onPress={this.searchBar}></Button>
          </View>

          <View>
            {
              this.props.searchlist.map((user, index) => (
                <View style={styles.list}>
                <TouchableOpacity
                  key={user.username}
                  onPress={() => alert(user.username)}>
                  <Text style={styles.text}>
                    {user.username}
                  </Text>
                  
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.deleteUser(user.username)}>
                  <Text>Delete</Text>
                </TouchableOpacity>
                <Image style={styles.picture} source={{uri:(user.picture)}} />
                </View>
               ))
            }
          </View>
        </ScrollView>
      </>
    )
  }

}

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
