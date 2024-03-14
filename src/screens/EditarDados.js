import React, { useState, useEffect, useContext } from 'react';
import { Input, Button, Text, Box, FormControl, ScrollView, Stack, AlertDialog,Select, CheckIcon, VStack, HStack, IconButton, CloseIcon, Center, useToast } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import Users from '../JSON/users.json';
import { TextInputMask } from 'react-native-masked-text';

export default function EditarDados({ title, email, gender, company, phone, adress, zipcode, onChange }) {
  const [userData, setUserData] = useState(Users[0].personalData);
  const [users, setUsers] = useState(Users);
  const navigation = useContext(NavigationContext);
  const toast = useToast();

  useEffect(() => {
    const getData = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem('users');
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
          setUserData(JSON.parse(storedUsers)[0].personalData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const updateUserData = async () => {
    const updatedUsers = [...Users];
    updatedUsers[0].personalData = userData;

    try {
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView w="100%">
      <Box bg='white' w='95%' h='93%' alignSelf='center' shadow={3} p={5} mt={5} borderRadius={15}>
        <Stack w="100%" maxW="300px" mx="auto"  >
          <FormControl mb="5" mt={-5}>
            <Text>{title}</Text>

            <FormControl.Label>Email</FormControl.Label>
            <Input
              size={'md'}
              type='email'
              placeholder="Email"
              value={userData.email}
              onChangeText={text => setUserData({ ...userData, email: text })}
              borderRadius={10}
            />

            <FormControl.Label mt={2}>Genêro</FormControl.Label>
            <Select
              minWidth="200"
              placeholder="Selecione o gênero"
              borderRadius={10}
              size={'md'}
              selectedValue={userData.gender}
              onValueChange={(value) => setUserData({ ...userData, gender: value })}
              _selectedItem={{
                endIcon: <CheckIcon size={5} />
              }}
              mt="1"

            >
              <Select.Item label="Masculino" value="Masculino" />
              <Select.Item label="Feminino" value="Feminino" />
              <Select.Item label="Não Binário" value="Não Binário" />
            </Select>



            <FormControl.Label mt={2}>Empresa</FormControl.Label>
            <Input
              color={'white'}
              borderRadius={10}
              size={'md'}
              placeholder="Empresa"
              value={userData.company}
              onChangeText={text => setUserData({ ...userData, company: text })}
              editable={false}
              bg={'#00b188'}
            />
            <FormControl.HelperText >
              A empresa não pode ser alterada
            </FormControl.HelperText>
            <FormControl.Label mt={2}>Telefone</FormControl.Label>
            <TextInputMask
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              value={userData.phone}
              onChangeText={text => setUserData({ ...userData, phone: text })}
              placeholder={'Telefone'}
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 10,
                marginTop: 5,
                borderWidth: 1,  // Adiciona a borda com uma largura de 1
                borderColor: '#ccc', // Define a cor da borda
                borderRadius: 5, // Define o raio da borda
                height: 45, // Define a altura do componente
                borderRadius: 10,
              }}
            />

            <FormControl.Label mt={2}>CEP</FormControl.Label>
            <TextInputMask
              type={'custom'}
              options={{
                mask: '99999-999',
              }}
              value={userData.zipcode}
              onChangeText={text => setUserData({ ...userData, zipcode: text })}
              placeholder={'CEP'}
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 10,
                marginTop: 5,
                borderWidth: 1,  // Adiciona a borda com uma largura de 1
                borderColor: '#ccc', // Define a cor da borda
                borderRadius: 5, // Define o raio da borda
                height: 45, // Define a altura do componente
                borderRadius: 10,
              }}
            />

            <FormControl.Label mt={2}>Endereço</FormControl.Label>
            <Input
              size={'md'}
              borderRadius={10}
              placeholder="Endereço"
              value={userData.address}
              onChangeText={text => setUserData({ ...userData, address: text })}
            />

            <Button
              placeholder={'SALVAR'}
              bg={'#00b188'}
              mt={3}
              mb={3}
              borderRadius={10}
              onPress={() => {
                Alert.alert(
                  'Editar dados',
                  'Tem certeza que deseja Editar os dados?',
                  [
                    {
                      text: 'Cancelar',
                      style: 'cancel',
                    },
                    {
                      text: 'Salvar',
                      onPress: () => {
                        updateUserData(userData);
                        toast.show({ title: "Dados salvos com sucesso!", bg: "emerald.500", shadow: 2 });
                        navigation.navigate('Perfil', { updatedData: userData });
                      },
                    },
                  ],
                  
                );
              }}
            >
              <Text color={'white'}>Salvar</Text>
            </Button>
          </FormControl>
        </Stack>
      </Box>
    </ScrollView>
  );
};
