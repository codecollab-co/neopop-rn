import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NeoPopProvider } from 'neopop-rn';

export const decorators = [
  (Story, context) => {
    const colorMode = context.globals?.colorMode ?? 'dark';
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NeoPopProvider colorMode={colorMode}>
          <View
            style={{
              flex: 1,
              backgroundColor: colorMode === 'dark' ? '#0d0d0d' : '#ffffff',
              padding: 16,
            }}
          >
            <Story />
          </View>
        </NeoPopProvider>
      </GestureHandlerRootView>
    );
  },
];

export const globalTypes = {
  colorMode: {
    name: 'Color Mode',
    description: 'Toggle between dark and light theme',
    defaultValue: 'dark',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'dark',  title: 'Dark' },
        { value: 'light', title: 'Light' },
      ],
      showName: true,
    },
  },
};

export const parameters = {
  controls: { expanded: true },
  backgrounds: {
    disable: true, // We handle background via NeoPopProvider
  },
};
