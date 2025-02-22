// Sh**t! I Smoke
// Copyright (C) 2018-2019  Marcelo S. Coelho, Amaury Martiny

// Sh**t! I Smoke is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Sh**t! I Smoke is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Sh**t! I Smoke.  If not, see <http://www.gnu.org/licenses/>.

import React, { useContext } from 'react';
import { View } from 'react-native';
import {
  createAppContainer,
  CreateNavigatorConfig,
  NavigationRoute,
  NavigationStackRouterConfig
} from 'react-navigation';
import {
  createStackNavigator,
  NavigationStackConfig,
  NavigationStackOptions,
  NavigationStackProp
} from 'react-navigation-stack';

import { About } from './About';
import { Details } from './Details';
import { ErrorScreen } from './ErrorScreen';
import { Home } from './Home';
import { Loading } from './Loading';
import { Search } from './Search';
import { ApiContext, ErrorContext } from '../stores';
import { Api } from '../stores/fetchApi';
import * as theme from '../util/theme';

function stackNavigatorOptions (initialRouteName: string) {
  return {
    cardStyle: {
      backgroundColor: theme.backgroundColor
    },
    headerMode: 'none',
    initialRouteName,
    defaultNavigationOptions: {
      headerVisible: false
    }
  } as CreateNavigatorConfig<
    NavigationStackConfig,
    NavigationStackRouterConfig,
    NavigationStackOptions,
    NavigationStackProp<NavigationRoute, any>
  >;
}

/**
 * The main stack navigator, for the app.
 */
const RootStack = createAppContainer(
  createStackNavigator(
    {
      About: {
        screen: About
      },
      Details: {
        screen: Details
      },
      Home: {
        screen: Home
      },
      Search: {
        screen: Search
      }
    },
    stackNavigatorOptions('Home')
  )
);

/**
 * A stack navigator for the error case.
 */
const ErrorStack = createAppContainer(
  createStackNavigator(
    {
      Error: {
        screen: ErrorScreen
      },
      Search: {
        screen: Search
      }
    },
    stackNavigatorOptions('Error')
  )
);

export function Screens () {
  const { api } = useContext(ApiContext);
  const { error } = useContext(ErrorContext);

  const stack = renderScreen(api, error);

  return <View style={theme.fullScreen}>{stack}</View>;
}

function renderScreen (api?: Api, error?: string) {
  if (error) {
    return <ErrorStack />;
  }

  if (!api) {
    return <Loading />;
  }

  return <RootStack />;
}
