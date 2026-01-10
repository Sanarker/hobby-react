import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import type { User } from '../../schemas/user.schema';

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@test.com', age: 28 },
  { id: 2, name: 'Jane Smith', email: 'jane@test.com', age: 32 },
];

export default function UsersTable() {
  const [parent] = useAutoAnimate();

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'age', header: 'Age' },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      muiTableBodyProps={{
        ref: parent,
      }}
    />
  );
}
