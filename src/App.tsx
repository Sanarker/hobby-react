import { useState } from 'react';
import { AnimatedContainer } from './components/AnimatedContainer';
import UsersTable from './components/tables/usersTable';

export default function App() {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ padding: 40 }}>
      <button onClick={() => setOpen(o => !o)}>
        Toggle Table
      </button>

      <AnimatedContainer>
        {open && <UsersTable />}
      </AnimatedContainer>
    </div>
  );
}
