import { Stack } from '@chakra-ui/react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiInputMethodLine,
} from 'react-icons/ri';

import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav() {
  return (
    <Stack spacing="8" align="flex-start">
      <NavSection title="MEUS DADOS">
        <NavLink icon={RiContactsLine} href="/">
          Editar dados
        </NavLink>
      </NavSection>

      <NavSection title="PACIENTES">
        <NavLink icon={RiInputMethodLine} href="/forms">
          Novo caso
        </NavLink>
        <NavLink icon={RiDashboardLine} href="/automation">
          Listar casos
        </NavLink>
      </NavSection>
    </Stack>
  );
}
