import { Pressable, useWindowDimensions } from "react-native";

type Props = {
   icon: React.ReactElement,
   onClick: () => void;
}
export function StyledButton({ icon,onClick }: Props) {
   const { width } = useWindowDimensions();
   const buttonSize: number = (width - (16 * 2) - 8) / 3;
   return <Pressable
      onPress={onClick}
      style={{
         width: buttonSize,
         height: buttonSize,
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: 'red',
         borderRadius: buttonSize / 4
      }}
   >
      {
         icon
      }
   </Pressable>
}