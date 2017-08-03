'use strict'
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'

import GlobalStyles from '../GlobalStyles'
import Utils from '../Utils'

class ArticleRow extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <TouchableOpacity style={styles.articleRow} onPress={() => this.props.openArticle(this.props.article)}>
        <Text style={styles.title}>{this.props.article.title}</Text>
        <Text style={styles.description}>{this.props.article.description}</Text>
        <Text style={styles.publishedAt}>{Utils.timeSince(new Date(this.props.article.publishedAt))} ago</Text>
      </TouchableOpacity>
    )
  }

}

class Feed extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        icon: require('../assets/images/drawer.png'),
        id: 'drawer',
        buttonColor: '#95989A'
      }
    ]
  };

  constructor (props) {
    super(props)

    this.fetchData = this.fetchData.bind(this)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.state = {
      data: '',
      activityIndicatorAnimating: true,
      refreshing: false
    }
  }

  componentDidMount () {
    this.fetchData()
  }

  toggleDrawer() {
    this.props.navigator.toggleDrawer({
      side: 'left'
    });
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'drawer') {
        this.props.navigator.toggleDrawer({
          side: 'left'
        });
      }
    }
  }

  renderSeparator () {
    return (
      <View style={styles.separator} />
    )
  }

  renderLoader() {
    if (this.state.activityIndicatorAnimating) {
      return (
        <ActivityIndicator animating={this.state.activityIndicatorAnimating} style={styles.activityIndicator} />
      )
    }
  }

  render () {
    return (
      <ScrollView
        style={GlobalStyles.container}
        showsVerticalScrollIndicator={false}>
        {this.renderLoader()}
        <FlatList
          data={this.state.data.slice(0, 4)}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={item => item.title}
          renderItem={({item}) => <ArticleRow article={item} openArticle={(article) => this.openArticle(article)}/>}
        />
        <Text style={styles.poweredBy}>Powered by NewsApi.org</Text>
      </ScrollView>
    )
  }

  setData(articles) {
    this.setState({ data: Utils.shuffle(articles), activityIndicatorAnimating: false })
    console.log('data finished loading')
  }

  fetchData () {
    if (this.state.activityIndicatorAnimating) {
      var articles = []
      var nytimes, wsj, cnn, washpo
      // TODO: make all of this into a for loop
      // nytimes
      fetch('https://newsapi.org/v1/articles?source=the-new-york-times&apiKey=878444c9e5b74b93bef4da8fda49887b')
  		  .then((response) => response.json())
  	    .then((responseJson) => {
          for (var i = 0; i < responseJson.articles.length; i++){
            articles.push(responseJson.articles[i])
          }
          nytimes = true
          console.log('Data fetched from nyt')

          if (nytimes && wsj && cnn && washpo) {
            this.setData(articles)
          }

  	    })
  	    .catch((error) => {
  	      console.error(error)
  	    })
      // wsj
      fetch('https://newsapi.org/v1/articles?source=the-wall-street-journal&sortBy=top&apiKey=878444c9e5b74b93bef4da8fda49887b')
  		  .then((response) => response.json())
  	    .then((responseJson) => {
          for (var i = 0; i < responseJson.articles.length; i++){
            articles.push(responseJson.articles[i])
          }
          wsj = true
          console.log('Data fetched from wsj')

          if (nytimes && wsj && cnn && washpo) {
            this.setData(articles)
          }
  	    })
  	    .catch((error) => {
  	      console.error(error)
  	    })
      // cnn
      fetch('https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=878444c9e5b74b93bef4da8fda49887b')
  		  .then((response) => response.json())
  	    .then((responseJson) => {
          for (var i = 0; i < responseJson.articles.length; i++){
            articles.push(responseJson.articles[i])
          }
          cnn = true
          console.log('Data fetched from cnn')

          if (nytimes && wsj && cnn && washpo) {
            this.setData(articles)
          }
  	    })
  	    .catch((error) => {
  	      console.error(error)
  	    })
      // washpo
      fetch('https://newsapi.org/v1/articles?source=the-washington-post&sortBy=top&apiKey=878444c9e5b74b93bef4da8fda49887b')
  		  .then((response) => response.json())
  	    .then((responseJson) => {
          for (var i = 0; i < responseJson.articles.length; i++){
            articles.push(responseJson.articles[i])
          }
          washpo = true
          console.log('Data fetched from washpo')

          if (nytimes && wsj && cnn && washpo) {
            this.setData(articles)
          }
  	    })
  	    .catch((error) => {
  	      console.error(error)
  	    })
      }
  }

  openArticle (article) {
    this.props.navigator.push({
      screen: 'app.Article',
      title: article.title,
      passProps: {article},
      animated: true,
      backButtonTitle: '',
      backButtonHidden: false,
      navigatorButtons: {}
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    alignSelf: 'center',
    margin: 20
  },
  articleRow: {
    margin: 20
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#F4F4F4',
    alignSelf: 'center'
  },
  title: {
    fontSize: 15,
    marginBottom: 10,
    fontFamily: 'Menlo-Bold'
  },
  description: {
    marginBottom: 8,
    fontFamily: 'Menlo-Regular'
  },
  publishedAt: {
    fontFamily: 'Menlo-Regular'
  },
  poweredBy: {
    alignSelf: 'center',
    margin: 20,
    marginBottom: 50,
    fontFamily: 'Menlo-Regular'
  }
})

module.exports = Feed
