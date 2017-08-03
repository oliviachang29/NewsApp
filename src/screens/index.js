import {Navigation} from 'react-native-navigation'

import Feed from './Feed'
import Drawer from './Drawer'
import Article from './Article'

export default function () {
  Navigation.registerComponent('app.Feed', () => Feed)
  Navigation.registerComponent('app.Article', () => Article)
  Navigation.registerComponent('app.Drawer', () => Drawer)
}
