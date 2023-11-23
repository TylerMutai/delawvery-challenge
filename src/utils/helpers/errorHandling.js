import strings from "../localization/main";

/**
 *
 * @param error
 * @return {string}
 */
function parseErrorResponse(error) {
  return `<b>${error?.code || 0}</b><br/> ${strings[error?.code || ""] || error.message}`;
}

export {parseErrorResponse}