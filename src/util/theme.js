export default {
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff"
    }
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    useNextVariants: true
  },
  spreadThis: {
    form: {
      textAlign: "center"
    },
    image: {
      margin: "10px auto"
    },
    pageTitle: {
      margin: "0px auto"
    },
    textField: {
      margin: "10px auto"
    },
    button: {
      margin: "20px auto",
      position: "relative"
    },
    customError: {
      color: "#fff",
      fontSize: "0.8rem"
    },
    progress: {
      position: "absolute"
    }
  }
};
