import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image } from 'react-native';



class App extends Component {
  constructor() {
    super();
    this.state = {
      userlist: [{ "username": "shir", "password": "leen" }],
      username: '',
      password: '',
      repassword: ''
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

    if (!(this.state.password === this.state.repassword)) {
      return alert("Please input the same password")
    }

    var newUser = { "username": this.state.username, "password": this.state.password }

    for (var i = 0; i < this.state.userlist.length; i++) {
      if (this.state.userlist[i].username === this.state.username) {
        return alert("Username has been used")
      }
    }

    this.state.userlist.push(newUser)
    return alert("Registration success")
  }

  loginUser = () => {

    if (!this.state.username) {
      return alert("Username is required")
    }

    if (!this.state.password) {
      return alert("Password is required")
    }

    for (var i = 0; i < this.state.userlist.length; i++) {
      if (this.state.userlist[i].username === this.state.username && this.state.userlist[i].password === this.state.password) {
        return alert("Login Success")
      }
    }
    return alert("Username/Password Invalid")
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <Image style={styles.logo} source={{ uri: 'https://banner2.cleanpng.com/20180402/puq/kisspng-apple-color-emoji-fire-symbol-fire-letter-5ac1d6665a7469.5616020915226527743705.jpg' }} />
          <Text style={styles.title}>APPLEEN</Text>
          <View style={styles.form}>
            <Text style={styles.subtitle}>
              Register
            </Text>
            <Text>Input username</Text>
            <TextInput style={styles.inputbox} onChangeText={username => this.setState({ username })} />
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
      </>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    marginTop:20,
    alignSelf: 'center',
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

export default App
// const HelloWorldApp = () => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center"
//       }}>
//       <Text>Hello, world!</Text>
//     </View>
//   )
// }
// export default HelloWorldApp;



// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;
