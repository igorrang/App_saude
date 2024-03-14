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

export default function FilhoRecemNasc({ navigation }) {
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
  const [numeroCertidaoFilho, setnumeroCertidaoFilho] = useState("")
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

  //Enviar Formulário para o Banco 
  const salvarDados = async () => {
    const habilitDependentes = await addDoc(userCollectionRef, {
      nomeTitular,
      cpfTitular,
      nomeDependente,
      cpfDependente,
      numeroCertidaoFilho,
      email
    });
    console.log('Formulário Enviado!')
  }


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

          <CampoTexto shadow={5}  title={"Nome completo do titular:"} value={nomeTitular} onChangeText={setNome} />
          <CampoNumero shadow={5} title={"CPF do Titular:"} value={cpfTitular} onChangeText={setcpfTitular} type={'cpf'} />
          <CampoTexto shadow={5} title={"Nome Completo do Dependente:"} value={nomeDependente} onChangeText={setNomeDependente} keyboardType={'default'} />
          <CampoNumero shadow={5} title={"CPF do Dependente:"} value={cpfDependente} onChangeText={setcpfDependente} type={'cpf'} />
          <CampoNumero shadow={5} title={"Número da certidão de Nascimento Filho(a):"} value={numeroCertidaoFilho} onChangeText={setnumeroCertidaoFilho} type={'cpf'} />
          <Text fontSize='11' color="#808080" ml="1" >(Expedida até 90 dias); </Text>
          <CampoTexto shadow={5} title={"E-mail para Contato:"} value={email} onChangeText={setEmail} keyboardType={'email-address'} />
          
          <ActionSheetComponent  action1={"●  RG e CPF do segurado (frente e verso)"}
        action2={" ●  Certidão de nascimento do(a) filho(a) atualizada (expedida até 90 dias)"}/>

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
              mt={5} mb={5} paddingTop={5} paddingBottom={5}
              backgroundColor='#00b188' _pressed={{ bgColor: "orange.400" }}
              onPress={() => salvarDados()}>
              <Flex direction='row'>
                <MaterialCommunityIcons  name="upload" size={22} color="white" />
                <Text color='white' fontSize='14' bold>Enviar</Text></Flex></Button>
            )
            :
            (<Button
              mt={5} paddingTop={5} paddingBottom={5}
              backgroundColor='#00b188'
              isLoading isLoadingText="Enviando"
            ></Button>)
          }


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
        </Stack>

      </Center>
      </Box>
    </ScrollView>
  );
}
