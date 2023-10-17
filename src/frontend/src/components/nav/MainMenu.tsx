import { Trans } from '@lingui/macro';
import { Group, Menu, Skeleton, Text, UnstyledButton } from '@mantine/core';
import {
  IconChevronDown,
  IconLogout,
  IconPlugConnected,
  IconSettings,
  IconUserCircle,
  IconUserCog
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { doClassicLogout } from '../../functions/auth';
import { InvenTreeStyle } from '../../globalStyle';
import { useUserState } from '../../states/UserState';
import { PlaceholderPill } from '../items/Placeholder';

export function MainMenu() {
  const { classes, theme } = InvenTreeStyle();
  const userState = useUserState();

  return (
    <Menu width={260} position="bottom-end">
      <Menu.Target>
        <UnstyledButton className={classes.layoutHeaderUser}>
          <Group spacing={7}>
            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
              {userState.username() ? (
                userState.username()
              ) : (
                <Skeleton height={20} width={40} radius={theme.defaultRadius} />
              )}
            </Text>
            <IconChevronDown />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<IconUserCircle />}>
          <Trans>Profile</Trans> <PlaceholderPill />
        </Menu.Item>

        <Menu.Label>
          <Trans>Settings</Trans>
        </Menu.Label>
        <Menu.Item icon={<IconSettings />} component={Link} to="/profile/user">
          <Trans>Account settings</Trans>
        </Menu.Item>
        <Menu.Item icon={<IconUserCog />} component={Link} to="/settings/user">
          <Trans>Account settings</Trans>
        </Menu.Item>
        {userState.user?.is_staff && (
          <Menu.Item icon={<IconSettings />} component={Link} to="/settings/">
            <Trans>System Settings</Trans>
          </Menu.Item>
        )}
        {userState.user?.is_staff && (
          <Menu.Item
            icon={<IconPlugConnected />}
            component={Link}
            to="/settings/plugin"
          >
            <Trans>Plugins</Trans>
          </Menu.Item>
        )}
        <Menu.Divider />

        <Menu.Item
          icon={<IconLogout />}
          onClick={() => {
            doClassicLogout();
          }}
        >
          <Trans>Logout</Trans>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
