let Utils = {
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },

  timeSince (date) {
    var seconds = Math.floor((new Date() - date) / 1000)

    var interval = Math.floor(seconds / 31536000)

    if (interval > 1) {
      return interval + ' years'
    }
    interval = Math.floor(seconds / 2592000)
    if (interval > 1) {
      return interval + ' months'
    }
    interval = Math.floor(seconds / 86400)
    if (interval > 1) {
      return interval + 'd'
    }
    interval = Math.floor(seconds / 3600)
    if (interval > 1) {
      return interval + 'h'
    }
    interval = Math.floor(seconds / 60)
    if (interval > 1) {
      return interval + 'm'
    }
    return Math.floor(seconds) + 's'
  }
}

module.exports = Utils
