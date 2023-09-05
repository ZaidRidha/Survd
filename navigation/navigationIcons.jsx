import React, { useMemo } from 'react';
import { Icon } from '@rneui/themed';

export const ACTIVE_COLOR = 'black';
export const INACTIVE_COLOR = 'gray';

export const FOCUSED_PROPS = {
  size: 34,
  color: ACTIVE_COLOR,
};

export const UNFOCUSED_PROPS = {
  size: 30,
  color: INACTIVE_COLOR,
};

/**
 * @param {{
 * focused: boolean;
 * }} props
 */
export const HomeTabIcon = ({ focused }) => {
  const iconProps = useMemo(() => (focused ? FOCUSED_PROPS : UNFOCUSED_PROPS), [focused]);
  return (
    <Icon
      type="antdesign"
      name="home"
      size={iconProps.size}
      color={iconProps.color}
    />
  );
};

/**
 * @param {{
 * focused: boolean;
 * }} props
 */
export const ExploreTabIcon = ({ focused }) => {
  const iconProps = useMemo(() => (focused ? FOCUSED_PROPS : UNFOCUSED_PROPS), [focused]);
  return (
    <Icon
      type="entypo"
      name="magnifying-glass"
      size={iconProps.size}
      color={iconProps.color}
    />
  );
};

/**
 * @param {{
 * focused: boolean;
 * }} props
 */
export const AppointmentsTabIcon = ({ focused }) => {
  const iconProps = useMemo(() => (focused ? FOCUSED_PROPS : UNFOCUSED_PROPS), [focused]);
  return (
    <Icon
      type="antdesign"
      name="calendar"
      size={iconProps.size}
      color={iconProps.color}
    />
  );
};

/**
 * @param {{
 * focused: boolean;
 * }} props
 */
export const ProfileTabIcon = ({ focused }) => {
  const iconProps = useMemo(() => (focused ? FOCUSED_PROPS : UNFOCUSED_PROPS), [focused]);
  return (
    <Icon
      type="antdesign"
      name="user"
      size={iconProps.size}
      color={iconProps.color}
    />
  );
};
