import {formatDateFromNow} from "../../utils";
import {CommentEmojiImages} from "../../consts";
import {encode} from "../../utils";

/**
 * Generates comments markup
 * @param {Array<*>} comments - array of comments
 * @param {String} deleteText - delete button text
 * @return {String} - comments markup
 */
const generateCommentsMarkup = (comments, deleteText) => comments
  .map(({id, text, author, date, emoji}) => `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${CommentEmojiImages[emoji]}" width="55" height="55" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${encode(text)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formatDateFromNow(date)}</span>
          <button data-comment-id="${id}" class="film-details__comment-delete">${deleteText}</button>
        </p>
      </div>
    </li>`
  ).join(``);

export {generateCommentsMarkup};
