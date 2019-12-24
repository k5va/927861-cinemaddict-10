import {formatDate} from "../../utils";
import {CommentEmojiImages, COMMENT_DATE_FORMAT} from "../../consts";
import {encode} from "../../utils";

/**
 * Generates comments markup
 * @param {Array<*>} comments - array of comments
 * @return {String} - comments markup
 */
const generateCommentsMarkup = (comments) => comments
  .map(({id, text, author, date, emoji}) => `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${CommentEmojiImages[emoji]}" width="55" height="55" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${encode(text)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formatDate(date, COMMENT_DATE_FORMAT)}</span>
          <button data-comment-id="${id}" class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  ).join(``);

export {generateCommentsMarkup};
