import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'
import TabBar from '../../components/layout/tab-bar'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Início',
          // tabBarIcon: ({ color }) => (
          //   <FontAwesome size={28} name="home" color={color} />
          // ),
        }}
      />
      <Tabs.Screen
        name="management"
        options={{
          title: 'Gerenciamento',
          // tabBarIcon: ({ color }) => (
          //   <FontAwesome size={28} name="bar-chart" color={color} />
          // ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Estatísticas',
          // tabBarIcon: ({ color }) => (
          //   <FontAwesome size={28} name="line-chart" color={color} />
          // ),
        }}
      />
    </Tabs>
  )
}
