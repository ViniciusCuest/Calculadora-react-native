import { forwardRef, LegacyRef } from "react";
import { TextInput, StyleSheet } from "react-native";

type Props = {
   onChange: (text: string) => void
}

export const NumericInput = forwardRef(({
   onChange
} : Props, ref:LegacyRef<TextInput> | null) => {
   return <TextInput
      ref={ref}
      inputMode={"numeric"}
      style={styles.input}
      onChangeText={onChange}
      placeholder="0.0"
      placeholderTextColor={'lightgray'}
   />
})

const styles = StyleSheet.create({
   input: {
      width: '100%',
      textAlign: 'center',
      fontSize: 52,

   }
})