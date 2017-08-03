import React, { Component } from 'react'
import {
  WebView
} from 'react-native'

class Article extends Component {

  render () {
    return (
      <WebView
        source={{uri: this.props.article.url}}
        style={{marginTop: 20}}
      />
    )
  }
}

module.exports = Article
