import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, Alert, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { NumericInput } from './components/NumericInput';
import { StyledButton } from './components/StyledButton';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';

type OperationTypes = "sum" | "subtraction" | "division" | "multiplication"
type OperationProps = {
  type: OperationTypes;
  icon: React.ReactElement,
  signal: string;
}
const SIZE = 40
export default function App() {
  const operations: OperationProps[] = [
    {
      type: 'sum',
      icon: <FontAwesome5 name="plus" size={SIZE} color="black" />,
      signal: '+'
    },
    {
      type: 'subtraction',
      icon: <FontAwesome5 name="minus" size={SIZE} color="black" />,
      signal: '-'
    },
    {
      type: 'multiplication',
      icon: <FontAwesome5 name="times" size={SIZE} color="black" />,
      signal: '*'
    },
    {
      type: 'division',
      icon: <FontAwesome5 name="divide" size={SIZE} color="black" />,
      signal: '/'
    },
  ];
  const [value, setValue] = React.useState({
    field1: '',
    field2: ''
  });
  const [operation, setOperation] = React.useState<{ result?: number, operator?: OperationTypes }>();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Text style={{
            fontSize: 56
          }}>
            {
              operation?.result?.toString()
            }
          </Text>
        </View>
        <View style={{
          position: 'absolute', bottom: 0, left: 0, paddingHorizontal: 16
        }}>
          <View style={{ marginBottom: 24, rowGap: 24 }}>
            <NumericInput
              onChange={(str) => {
                setValue(prev => {
                  return {
                    ...prev,
                    field1: str
                  }
                })
              }}
            />
            <NumericInput
              onChange={(str) => {
                setValue(prev => {
                  return {
                    ...prev,
                    field2: str
                  }
                })
              }}
            />
          </View>
          <FlatList
            data={operations}
            keyExtractor={item => item.type}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'center',
              gap: 12
            }}
            contentContainerStyle={{
              width: '100%',
            }}
            renderItem={({ item }) => (
              <StyledButton onClick={() => {
                setOperation(prev => {
                  return {
                    ...prev,
                    operator: item.type
                  }
                });
              }} icon={item.icon} />
            )}
            ItemSeparatorComponent={() => <View style={{
              height: 12
            }} />}
          />
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            columnGap: 12,
            rowGap: 12,
            marginBottom: 8,
            marginTop: 8,
          }}>
            <StyledButton onClick={() => {
              setOperation({});
            }} icon={<FontAwesome6 name="delete-left" size={24} color="black" />} />
            <StyledButton onClick={() => {
              let result = 0;
              if(!value.field1 || !value.field2) 
                return Alert.alert('Error', 'Preencha os campos');
              if (!operation?.operator) 
                return Alert.alert('Error', 'Selecione um operador');
              
              switch (operation?.operator) {
                case 'sum':
                  result = Number(value.field1) + Number(value.field2);
                  break;
                case 'subtraction':
                  result = Number(value.field1) - Number(value.field2);
                  break;
                case 'multiplication':
                  result = Number(value.field1) * Number(value.field2);
                  break;
                case 'division':
                  result = Number(value.field1) / Number(value.field2);
                  break;
              }
              setOperation((prev) => {
                return {
                  ...prev,
                  result
                }
              });
            }} icon={<FontAwesome5 name="equals" size={24} color="black" />} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  content: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
