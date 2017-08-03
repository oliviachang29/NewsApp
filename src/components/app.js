import {Platform} from 'react-native'
import {Navigation} from 'react-native-navigation'
import registerScreens from './screens'
import codePush from 'react-native-code-push'

// screen related book keeping
registerScreens()

function startApp () {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'app.ProgramList',
      title: 'Programs',
      navigatorStyle: {
        navBarHidden: true,
        statusBarBlur: true
      },
      navigatorButtons: {}
    }
  })
}

codePush.sync()
startApp()
