import React, { useState } from 'react';
import { Box, Icon, Flex, ScrollView, Center, Link, Button, Text, AlertDialog, IconButton, CloseIcon, HStack, VStack, Alert, Actionsheet, useDisclose, } from 'native-base'
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
  const [numeroCertidao, setnumeroCertidao] = useState("")
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
      numeroCertidao,
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

    <ScrollView width="100%" backgroundColor='#eee'>
      <Center>
        <Box w='100%' padding='3' marginTop={-3}>
          <CampoTexto title={"Nome completo do Titular:"} value={nomeTitular} onChangeText={setNome} />
          <CampoNumero title={"CPF do Titular:"} value={cpfTitular} onChangeText={setcpfTitular} type={'cpf'} />
          <CampoTexto title={"Nome Completo do Dependente:"} value={nomeDependente} onChangeText={setNomeDependente} keyboardType={'default'} />
          <CampoNumero title={"CPF do Dependente:"} value={cpfDependente} onChangeText={setcpfDependente} type={'cpf'} />
          <CampoNumero title={"Número da certidão de Nascimento do Dependente:"} value={numeroCertidao} onChangeText={setnumeroCertidao} type={'cpf'} />
          <Text fontSize='11' color="#808080" ml="1" >(Expedida até 90 dias); </Text>
          <CampoTexto title={"E-mail para Contato:"} value={email} onChangeText={setEmail} keyboardType={'email-address'} />
          <Button w='95%' backgroundColor='muted.300' mt='4' ml="2" onPress={onOpen} endIcon={<Icon as={EvilIcons} color='gray.400' name="plus" size="xl" marginLeft="20" />} _icon={{

          }}>
            <Text top="-1.15" mt='0.5' mr='2' color='gray.500' bold fontSize='16' >Enviar os seguintes arquivos</Text>
          </Button>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content _dragIndicator={{
              bg: 'blue.500'
            }}>
              <Box w="100%" h={60} px={4} justifyContent="center">
                <Text underline italic bold fontSize="22" color="gray.800" _dark={{
                  color: 'gray.300'
                }}>
                  Arquivos necessários
                </Text>

              </Box>

              <Actionsheet.Item>
                ●  RG e CPF do(a) Dependente (frente e verso);
              </Actionsheet.Item>
              <Actionsheet.Item>
                ●  Certidão de nascimento do(a) Dependente atualizada (expedida até 90 dias).
              </Actionsheet.Item>
              <Actionsheet.Item>
                ●  Atestado de matrícula e frequência atualizado (expedido até 30 dias);
              </Actionsheet.Item>
              <Actionsheet.Item>
                ●  Nos casos de menor sob guarda e tutelado, também é preciso apresentar o Cadastro Nacional de Informações Sociais (CNIS) e a Certidão de Benefício do INSS.
              </Actionsheet.Item>

              <Box w="100%" h={60} px={4} justifyContent="center">
                <Text underline italic bold fontSize="14" color="gray.800" _dark={{
                  color: 'gray.300'
                }}>
                  (Observação: Caso o seu dependente já esteja habilitado como estudante e precise fazer a renovação semestral, vá para Renovação de Estudante)

                </Text>

              </Box>

            </Actionsheet.Content>
          </Actionsheet>

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
              mt={5} paddingTop={5} paddingBottom={5}
              backgroundColor='orange.500' _pressed={{ bgColor: "orange.400" }}
              onPress={() => salvarDados()}>
              <Flex direction='row'>
                <MaterialCommunityIcons name="upload" size={22} color="white" />
                <Text color='white' fontSize='14' bold>Enviar</Text></Flex></Button>
            )
            :
            (<Button
              mt={5} paddingTop={5} paddingBottom={5}
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
        </Box>
      </Center>
    </ScrollView>
  );
}
