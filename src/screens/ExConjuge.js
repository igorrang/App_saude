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


export default function ExConjuge({ navigation }) {

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();

  //Formulário para BD
  const [nomeTitular, setNome] = useState("")
  const [cpfTitular, setcpfTitular] = useState("")
  const [nomeDependenteEx, setNomeDependenteEx] = useState("")
  const [cpfDependenteEx, setcpfDependenteEx] = useState("")
  const [numeroCertidaoCasamentoAtt, setnumeroCertidaoCasamentoAtt] = useState("")
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

  const openCam = [
    { name: "Camera", navlink: 'OpenCamera' },
    {}
  ]

  //Enviar Formulário para o Banco 
  const salvarDados = async () => {
    const habilitDependentes = await addDoc(userCollectionRef, {
      nomeTitular,
      cpfTitular,
      nomeDependenteEx,
      cpfDependenteEx,
      numeroCertidaoCasamentoAtt,
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
          <CampoTexto title={"Nome completo do Titular:"} value={nomeTitular} onChangeText={setNome} />
          <CampoNumero title={"CPF do Titular:"} value={cpfTitular} onChangeText={setcpfTitular} type={'cpf'} />
          <CampoTexto title={"Nome Completo do Ex-Cônjuge Dependente:"} value={nomeDependenteEx} onChangeText={setNomeDependenteEx} keyboardType={'default'} />
          <CampoNumero title={"CPF do Ex-Cônjuge Dependente:"} value={cpfDependenteEx} onChangeText={setcpfDependenteEx} type={'cpf'} />
          <CampoNumero title={"Número da certidão de Casamento Atualizada"} value={numeroCertidaoCasamentoAtt} onChangeText={setnumeroCertidaoCasamentoAtt} type={'cpf'} />
          <Text fontSize='11' color="#808080" ml="1" >(Expedida até 90 dias); </Text>
          <CampoTexto title={"E-mail para Contato:"} value={email} onChangeText={setEmail} keyboardType={'email-address'} />


          <ActionSheetComponent title={" Requisitos legais indispensáveis:"}
            fix={"- Fixação de pensão alimentícia em processo judicial ou escritura pública de divórcio ou separação"}
            action1={"●  Certidão de casamento com averbação da separação ou divórcio atualizada (expedida até 90 dias);"}
            action2={"●  Sentença judicial ou escritura pública de divórcio ou separação com a fixação de pensão alimentícia em benefício do ex-cônjuge ou   RG e CPF do(a) ex-cônjuge (frente e verso)"}
            action3={"●  Certidão de casamento atualizada (expedida até 90 dias)"}
            action4={"●  Comprovação do efetivo recebimento da pensão alimentícia pelo(a) habilitando(a) atualizado (até 90 dias) (Ex: contracheque, Declaração de Imposto de Renda, depósito bancário, etc.)"}
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
              mt={5} mb={5} paddingTop={5} paddingBottom={5}
              backgroundColor='#00b188' _pressed={{ bgColor: "orange.400" }}
              onPress={() => salvarDados()}>
              <Flex direction='row'>
                <MaterialCommunityIcons name="upload" size={22} color="white" />
                <Text color='white' fontSize='14' bold>Enviar</Text></Flex></Button>
            )
            :
            (<Button
              mt={5}  paddingTop={5} paddingBottom={5}
              backgroundColor='orange.500'
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



/* <Text fontSize={11} mr='300'>Requisitos legais indispensáveis:{"\n"} </Text>
<Text fontSize={10} mr='205' mt='-4'>
Fixação de pensão alimentícia em processo judicial ou escritura pública de divórcio ou separação;{"\n"}
Fixação de pensão alimentícia em processo judicial ou escritura pública de extinção de união estável.
</Text> */