import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Pressable, useColorScheme, View } from 'react-native';
import {
 Menu,
 MenuProvider,
 MenuOptions,
 MenuOption,
 MenuTrigger,
} from "react-native-popup-menu";

import addMarkerAlert from './addMarkerAlert';
import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One: Flag Litter.',
          tabBarIcon: ({ color }) => <TabBarIcon name="map-pin" color={color} />,
          headerRight: () => (
            <View style={styles.inline}>
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
            <Link href="" asChild>
              {/* <MenuProvider>
                <Menu>
                  <MenuTrigger> */}
                      <Pressable onPress={addMarkerAlert}>
                        {({ pressed }) => (
                          <FontAwesome
                            name="plus"
                            size={25}
                            color={Colors[colorScheme ?? 'light'].text}
                            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                          />
                        )}
                      </Pressable>
                  {/* </MenuTrigger>
                  <MenuOptions>
                      <MenuOption onSelect={() => alert(`Save`)} text="Save" />
                      <MenuOption onSelect={() => alert(`Delete`)} text="Delete" />
                  </MenuOptions>
                </Menu>
              </MenuProvider> */}
            </Link>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two: Bounty Board.',
          tabBarIcon: ({ color }) => <TabBarIcon name="star-o" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  inline: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
});
