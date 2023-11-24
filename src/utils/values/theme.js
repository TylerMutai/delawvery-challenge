/**
 *
 * @type {{}}
 */
const theme = {
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Barlow', sans-serif`,
    text: `'Barlow', sans-serif`,
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "6px",
        backgroundColor: "#464646",
        color: "white",
        paddingX: "32px",
        height: "45px",
        _hover: {
          backgroundColor: "black"
        }
      },
      defaultProps: {
        size: "",
        variant: "solid",
        colorScheme: ""
      }
    },
  }
}
const backgroundColor = "#F2F2F2";
const fontSizeNormal = "16px";
const fontSizeLarge = "18px";

const fontSizeExtraLarge = "22px";

const fontSizeExtraExtraLarge = "28px";

const fontSizeExtraExtraExtraLarge = "38px";
const transition = "all ease-in-out .3s"

export default theme;
export {
  backgroundColor,
  fontSizeNormal,
  fontSizeLarge,
  fontSizeExtraLarge,
  fontSizeExtraExtraLarge,
  fontSizeExtraExtraExtraLarge,
  transition
};