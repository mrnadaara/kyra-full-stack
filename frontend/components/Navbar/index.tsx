import ButtonLink from '@mui/material/Link';
import Link from 'next/link';
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
          <Link href="https://github.com/mrnadaara" passHref>
            <ButtonLink
              target="_blank"
              rel="noopener"
              sx={{ my: 2, color: 'white', display: 'block' }}
              underline="none"
            >
              Visit my Github
            </ButtonLink>
          </Link>
          <Link href={`${process.env.NEXT_PUBLIC_KYRA_BACKEND_URL}/docs`} passHref>
            <ButtonLink
              target="_blank"
              rel="noopener"
              sx={{ my: 2, color: 'white', display: 'block' }}
              underline="none"
            >
              API Docs
            </ButtonLink>
          </Link>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Navbar;
