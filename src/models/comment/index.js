export default class Comment {

  constructor(data) {
    this.id = data[`id`];
    this.author = data[`author`];
    this.text = data[`comment`];
    this.date = new Date(data[`date`]);
    this.emoji = data[`emotion`];
  }

  /**
   * Converts comment to raw data that conforms to server format
   * @return {Object} - raw object
   */
  toRAW() {
    return {
      'id': this.id,
      'author': this.author,
      'comment': this.text,
      'date': this.date,
      'emotion': this.emoji
    };
  }

  /**
   * Creates new comment from raw data
   * @param {Object} data - raw data
   * @return {Comment} - created comment
   */
  static parseComment(data) {
    return new Comment(data);
  }

  /**
   * Creates array of Comments from given raw data
   * @param {Array<Object>} data - array of raw data
   * @return {Array<Comment>} - array of comments
   */
  static parseComments(data) {
    return data.map(Comment.parseComment);
  }
}
