import { Container, Typography } from '@mui/material';
import UsersTable from '../components/tables/usersTable';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h5" sx={{ my: 2 }}>
        Users
      </Typography>
      <UsersTable />
    </Container>
  );
}
