'use client';

import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSunHigh, IconMoon } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon variant="transparent" aria-label="Settings">
      {colorScheme === 'dark' ? (
        <IconSunHigh
          style={{ width: '70%', height: '70%' }}
          stroke={1.5}
          onClick={() => setColorScheme('light')}
        />
      ) : (
        <IconMoon
          style={{ width: '70%', height: '70%' }}
          stroke={1.5}
          onClick={() => setColorScheme('dark')}
        />
      )}
    </ActionIcon>
  );
}
