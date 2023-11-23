import {AiFillCheckCircle} from "react-icons/ai";
import {MdCancel} from "react-icons/md";

/** @type {object} Show
 *
 * @property {number} id
 * @property {string} profile_id
 * @property {string} title
 * @property {string} description
 * @property {string} includes
 * @property {string} show_type
 * @property {string} age_restriction
 * @property {string} duration
 * @property {string} price
 * @property {string} tags
 */
const File = {}

const showStatuses = {
  active: {
    icon: AiFillCheckCircle,
    background: "rgba(116, 209, 110, 0.2)",
    border: "rgba(116, 209, 110, 0.9)",
    statusText: "פָּעִיל"
  },
  inactive: {
    icon: MdCancel,
    background: "rgba(245, 59, 48, 0.1)",
    border: "rgba(245, 59, 48, 0.5)",
    statusText: "לֹא פָּעִיל"
  }
}

const getShowStatusProps = (status) => {
  let keys = Object.keys(showStatuses);
  const statusName = keys.includes(status) ? status : "active";
  return showStatuses[statusName];
}

export {File, getShowStatusProps}

