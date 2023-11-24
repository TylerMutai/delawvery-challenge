import strings from "../localization/main";

/**
 *
 * @param error
 * @return {string}
 */
function parseErrorResponse(error) {
  console.log(error);
  return `<b>${error?.code || strings.internal_error}</b><br/> ${strings[error?.code || ""] || error.message}`;
}

export {parseErrorResponse}