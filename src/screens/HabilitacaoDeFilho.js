import React, { useState } from 'react';
import { Box, Icon, Stack, Flex, ScrollView, Center, Link, Button, Text, AlertDialog, IconButton, CloseIcon, HStack, VStack, Alert, Actionsheet, useDisclose, } from 'native-base'
import { EvilIcons } from "@expo/vector-icons";
import * as DocumentPicker from 'expo-document-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UploadFile } from '../screens/fileUpload'

//formulario para banco
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { CampoTexto } from '../components/CampoTexto';
import { CampoNumero } from '../components/CampoNumero';
import { ScanDoc } from '../components/ScanDoc';
import ActionSheetComponent from '../components/ActionSheetComponent';

export default function HabilitFilho({ navigation }) {

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  //Formulário para BD
  const [nomeTitular, setNome] = useState("")
  const [cpfTitular, setcpfTitular] = useState("")
  const [nomeDependente, setNomeDependente] = useState("")
  const [cpfDependente, setcpfDependente] = useState("")
  const [email, setEmail] = useState("")

  const [errorEmail, setErrorEmail] = useState("")

  const userCollectionRef = collection(db, "habilitDependentes")

  //Arquivos para BD
  const [blobFile, setBlobFile] = useState(null);
  const [fileName, setFileName] = useState('Nenhum arquivo selecionado')
  const [isChoosed, setIsChoosed] = useState(false)
  const [uploadCompleted, isUploadCompleted] = useState(false)
  const [uploadStart, setUploadStart] = useState(false);
  const [buttonText, setButtonText] = useState('Enviar');

  //Animação uploadButton
  const [loading, setLoading] = useState(false);

  //AlertDialog
  const [fisOpen, setIsOpen] = useState(false);
  const fonClose = () => setIsOpen(false);

  const adicionarDadosNoBanco = async () => {
    const habilitDependentes = await addDoc(userCollectionRef, {
      nomeTitular,
      cpfTitular,
      nomeDependente,
      cpfDependente,
      email
    });
    console.log('Formulário Enviado!')
  }

  //envia para o componente fileUpload
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({})

    if (result != null) {

      const r = await fetch(result.uri);

      const b = await r.blob();

      setFileName(result.name)
      setBlobFile(b)
      setIsChoosed(true)
    }


  };
  const uploadFile = () => {
    setLoading(!loading)

    if (blobFile) {
      //   salvarDados()
      setUploadStart(true)
      UploadFile(blobFile, fileName, isUploadCompleted)
      clearFiles()
    } else {
      setIsOpen(!isOpen)
      setLoading(false)
    }
  };

  const clearFiles = () => {
    setBlobFile(null)
    setIsChoosed(false)

  }

  return (

    <ScrollView w="100%">
    <Box bg='white' w='95%' h='93%' alignSelf='center' shadow={5} p={5} mt={5} borderRadius={15}>

      <Center>
        <Stack w="100%" maxW="300px" mx="auto"  >

          <CampoTexto title={"Nome completo do titular:"} value={nomeTitular} onChangeText={setNome} keyboardType={'default'}/>
          <CampoNumero title={"CPF do Titular:"} value={cpfTitular} onChangeText={setcpfTitular} type={'cpf'} />
          <CampoTexto title={"Nome completo do Dependente:"} value={nomeDependente} onChangeText={setNomeDependente} keyboardType={'default'} />
          <CampoNumero title={"CPF do Dependente:"} value={cpfDependente} onChangeText={setcpfDependente} type={'cpf'} />
          <CampoTexto title={"E-mail para Contato:"} value={email} onChangeText={setEmail} keyboardType={'email-address'} />

       <ActionSheetComponent action1={" ●  RG e CPF do(a) filho(a) (frente e verso)"}
        action2={" ●  Certidão de nascimento do filho(a) atualizada (expedida até 90 dias para maiores de 16 anos)"}
        action3={"●  Atestado de matrícula e frequência atualizado (expedido até 30 dias)"}
        action4={"●  Se estudante entre 18 e 24 anos incompletos, comprovante de matrícula atualizado (mais informações na aba Dependente Estudante)"}
        />

        {/* Botão de escanear documentações*/}
        <ScanDoc />

       

        <Link alignSelf='center' onPress={() => pickDocument()}>
          <Text fontSize="15" color='gray.500' bold textDecorationLine='underline'>Selecionar Arquivos</Text>
        </Link>

        <Box alignItems="center">
          <Text color='gray.400' bold >{fileName}</Text>
        </Box>

        {!loading ?
          (<Button
            mt={5} mb={5}  paddingTop={5} paddingBottom={5}
            backgroundColor='#00b188' _pressed={{ bgColor: "orange.400" }}
            onPress={() => uploadFile()}>
            <Flex direction='row'>
              <MaterialCommunityIcons name="upload" size={22} color="white" />
              <Text color='white' fontSize='14' bold>Enviar</Text></Flex></Button>
          )
          :
          (<Button
            mt={5} paddingTop={7} paddingBottom={5}
            backgroundColor='orange.500'
            isLoading isLoadingText="Enviando"
          ></Button>)
        }
         </Stack>

        <AlertDialog isOpen={fisOpen} onClose={fonClose} motionPreset={"fade"}>
          <AlertDialog.Content  >
            <Alert w="100%" status="error" pb={9} py={5}>
              <HStack justifyContent="center" space={3} width="100%" left={7}>
                <Alert.Icon top={2} size="md" />
                <IconButton left={20} bottom={3} variant="unstyled" _focus={{
                  borderWidth: 0
                }} icon={<CloseIcon size="4" />} _icon={{
                  color: "coolGray.600"
                }} onPress={onClose} />
              </HStack>
              <VStack space={1} flexShrink={2} w="100%" alignItems="center">
                <Text fontSize="md" fontWeight="medium" _dark={{
                  color: "coolGray.800"
                }}> Dados não enviados </Text>

                <Box _text={{
                  textAlign: "center"
                }}>
                  Verifique se você preencheu todos os dados e tente novamente.
                </Box>
              </VStack>
            </Alert>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
    </Box>
    </ScrollView>
  );
}
