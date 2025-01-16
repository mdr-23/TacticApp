import Header from '@/sections/header/header';
import Box from '@mui/material/Box';

import Main from './main';


// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {

    return (
      <>
        <Header />

        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >

          <Main>{children}</Main>
        </Box>
      </>
    );
  }