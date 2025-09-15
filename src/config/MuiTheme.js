import {createTheme} from '@mui/material/styles'

const MuiTheme = () => {
  const newTheme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background:
              'linear-gradient(45deg, #F2E2BA, transparent 25% 75%, #F2E2BA), linear-gradient(135deg, #e5eafb, #ffff 25% 75%, #e5eafb)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
    palette: {
      mode: 'light',
      primary: {
        main: '#424242',
      },
      secondary: {
        main: '#ffdede',
        contrastText: 'blue',
      },
      error: {
        main: '#1a237e',
      },
      text: {
        secondary: '#607d8b',
        primary: '#37474f',
      },
    },
  })
  return newTheme
}

export {MuiTheme}
