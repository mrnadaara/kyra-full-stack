import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styles from '../../styles/Navbar.module.scss';

const Navbar = () => (
  <AppBar className={styles.appbar} position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters className={styles.toolbar}>
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
          >
            Kyra Full-stack
        </Typography>
        <Box className={styles.buttoncontainer}>
          <Button
            onClick={() => ''}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            View on Github
          </Button>
          <Button
            onClick={() => ''}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            API Docs
          </Button>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Navbar;
