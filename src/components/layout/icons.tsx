import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'

interface IconPropsColor {
  color: string
}

export function Icons(name: string, props: IconPropsColor) {
  switch (name) {
    case 'home':
      return <FontAwesome size={28} name="home" {...props} />
    case 'statistics':
      return <Entypo name="line-graph" size={26} {...props} />
    case 'management':
      return <Ionicons name="settings" size={26} {...props} />
    default:
      return null
  }
}
