import {Platform} from 'react-native'
import {Navigation} from 'react-native-navigation'
import registerScreens from './screens'

// screen related book keeping
registerScreens()

Navigation.startSingleScreenApp({
  screen: {
    screen: 'app.Feed',
    title: 'Feed',
    navigatorStyle: {
      navBarTextColor: 'white',
      navBarTextFontFamily: 'Menlo-Bold',
      navBarBackgroundColor: '#F96331',
      screenBackgroundColor: 'white',
      navBarButtonFontSize: 10,
      navBarButtonColor: 'white',
      statusBarTextColorScheme: 'white'
    }
  },
  drawer: {
    left: {
      screen: 'app.Drawer',
      passProps: {},
    },
    style: {
      drawerShadow: true
    },
    disableOpenGesture: false
  },
})
