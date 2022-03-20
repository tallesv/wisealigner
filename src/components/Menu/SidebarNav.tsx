import { Stack } from '@chakra-ui/react';
import { RiDashboardLine, RiInputMethodLine } from 'react-icons/ri';

import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav() {
  return (
    <Stack spacing="8" align="flex-start">
      <NavSection title="PACIENTES">
        <NavLink icon={RiInputMethodLine} href="/new-case">
          Novo caso
        </NavLink>
        <NavLink icon={RiDashboardLine} href="/cases-table">
          Listar casos
        </NavLink>
      </NavSection>
    </Stack>
  );
}
