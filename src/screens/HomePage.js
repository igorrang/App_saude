import React, { useEffect, useContext, useRef, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { TouchableOpacity, SafeAreaView, StyleSheet, Image,  Dimensions, PixelRatio } from 'react-native';
import { Box, Text, Icon, Flex, View, FlatList, IconButton, } from 'native-base'
import { MaterialIcons, AntDesign, MaterialCommunityIcons, FontAwesome5, Ionicons, Entypo, FontAwesome, Fontisto, } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, interpolate } from 'react-native-reanimated';
import Svg, { Path } from "react-native-svg"
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

import { formataNome, formataCartao, formataNomeCartao } from '../helpers/utils';
import VirtualizedScrollView from '../helpers/VirtualizedScrollView';
import LogoIPE from '../assets/Logo_IPE_saude.svg'
import LogoBanrisul from '../assets/Logo_Banrisul.svg'
import ToqueParaUtilizar from '../components/ToqueParaUtilizar'
import { ItemBoxCompletoHome } from '../components/ItemBoxCompletoHome';
import { Button } from '../components/Button';
import { SearchBar } from '../components/SearchBar';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
} = Dimensions.get('window');

const widthBaseScale = SCREEN_WIDTH / 375;
const heightBaseScale = SCREEN_HEIGHT / 812;

function normalize(size, based = 'width') {
  const newSize = (based === 'height') ?
    size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
const heightPixel = (size) => {
  return normalize(size, 'height');
};
const fontPixel = (size) => {
  return heightPixel(size);
};

export default function HomePage({ navigation }) {

  const { userUid, userNome, userMatricula } = useContext(AuthContext);
  const cartao = formataCartao(userMatricula, '##.########.##.#')
  const nomeCartao = formataNomeCartao(userNome);
  const nome = formataNome(userNome)

  useEffect(() => {
    const getAppToken = async () => {
      await messaging().getToken()
        .then(response => {
          firestore()
            .collection('users')
            .doc(userUid)
            .update({
              token: response,
            })
            .then(() => {
              console.log('App token atualizado!')
            })
            .catch(console.error)
        }
        )
    }
    getAppToken().catch(console.error)
  }, [])

  const buttons = [
    { name: "Guia Médico Hospitalar", icon: 'add-location', navlink: 'GuiaMedicoHospitalar' },
    { name: "Profissionais Preferidos", icon: 'star', navlink: 'ProfissionaisFavoritos' },
    { name: "Boletos", icon: 'qr-code', navlink: 'EmContrucao' },
    { name: "Mais...", icon: 'add-circle', navlink: 'EmContrucao' },
  ];
  const acessoRapido = [
    { name: "Boletos", iconFamily: AntDesign, icon: 'barcode', navlink: 'Boletos' },
    { name: "Reembolso", iconFamily: MaterialCommunityIcons, icon: 'cash-refund', navlink: 'EmContrucao' },
    { name: "Renovação de Estudante", iconFamily: FontAwesome5, icon: 'user-graduate', navlink: 'EmContrucao' },
    { name: "Imposto de Renda", iconFamily: FontAwesome5, icon: 'clipboard-list', navlink: 'EmContrucao' },
  ];
  const atendimentoDigital = [
    { name: "PAC", iconFamily: Ionicons, icon: 'people-sharp', navlink: 'EmContrucao' },
    { name: "PAMES", iconFamily: MaterialCommunityIcons, icon: 'heart-plus', navlink: 'EmContrucao' },
    { name: "Habilitação de Dependentes", iconFamily: FontAwesome5, icon: 'user-plus', navlink: 'HabilitacaoDependentes', iconSize: 6, headingSize: 13, aspectRatio: 1.2 },
    { name: "Optante/Licenciado", iconFamily: FontAwesome5, icon: 'user-alt', iconSize: 6, navlink: 'EmContrucao' },
    { name: "Comunicado de Óbito", iconFamily: MaterialCommunityIcons, icon: 'coffin', navlink: 'EmContrucao' },
    { name: "Carta de Portabilidade", iconFamily: Entypo, icon: 'text-document-inverted', headingSize: 13, navlink: 'EmContrucao' },
    { name: "2ª Via de Cartão", iconFamily: MaterialIcons, icon: 'layers', navlink: 'EmContrucao' },
  ];
  const servicos = [
    { name: "Exame Covid-19 (PCR)", iconFamily: MaterialIcons, icon: 'coronavirus', navlink: 'EmContrucao' },
    { name: "Perícia Presencial", iconFamily: MaterialCommunityIcons, icon: 'clipboard-plus', navlink: 'EmContrucao' },
    { name: "Teleconsulta", iconFamily: FontAwesome, icon: 'stethoscope', navlink: 'EmContrucao' },
    { name: "Guia de Atendimento", iconFamily: Fontisto, icon: 'bed-patient', headingSize: 13, navlink: 'EmContrucao' },
    { name: "Histórico de Atendimento", iconFamily: MaterialCommunityIcons, icon: 'folder-multiple-plus', headingSize: 13, iconSize: 7, navlink: 'EmContrucao' },
    { name: "Cobertura de Honorários", iconFamily: MaterialCommunityIcons, icon: 'account-search', navlink: 'EmContrucao' },
    { name: "Atendimento Presencial", iconFamily: Fontisto, icon: 'person', headingSize: 13, iconSize: 7, navlink: 'EmContrucao' },
  ];

  const [openSearch, setOpenSearch] = useState(false) //Barra de Pesquisa
  
  // INÍCIO Animação do cartão e header//
  const offsetY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = SCREEN_WIDTH < 350 ? 0 : interpolate(offsetY.value, [0, 120], [0, 140]); 
    return { transform: [{ translateY }] };
  });
 
  const scrollHandler = useAnimatedScrollHandler(event => {
    offsetY.value = event.contentOffset.y;
  });

  const animatedHeader = useAnimatedStyle(() => {
    const translateY = SCREEN_WIDTH < 350 ? 0 : interpolate(offsetY.value, [0, 100], [0, 100]);
    return { transform: [{ translateY }] };
  });
 // FIM Animação do cartão e header//

  return (
    <SafeAreaView>
      <Box backgroundColor='orange.500' >
        <VirtualizedScrollView onScroll={scrollHandler} scrollEventThrottle={16}>        
          {/* INÍCIO HEADER */}
          <Animated.View style={[styles.Header, animatedHeader]}>
            <Box backgroundColor='orange.500' width='100%' paddingX={6} paddingY={4} marginBottom={-2} >
              <View marginBottom={-1} flexDirection='row' justifyContent='space-between' >
                <View marginLeft={2} alignItems='center' justifyContent='space-between' flexDirection='row'>
                  <Svg
                    width={30}
                    height={32}
                    fill="none"
                    viewBox="0 0 89 91"
                  >
                    <Path
                      fill="#fff"
                      d="M35.557 90.81c2.576-4.17 4.31-7.743 5.053-10.515 1.23-4.544-.021-6.277-3.49-9.895-5.486-5.69-12.145-10.249-18.169-15.342-5.776-4.891-13.685-10.106-16.713-17.335C-4.281 22.121 16.095 8.161 27.97 3.391c9.699-3.892 20.259-4.6 31.832-1.253 24.127 8.114 35.463 25.261 23.707 42.616-6.994 9.248-15.852 16.83-26.423 22.9 14.623-19.32 21.692-35.76 13.643-43.604-3.762-3.869-9.504-6.405-16.067-7.41-10.075-1.544-28.416.295-34.277 10.457-2.134 3.71-1.455 7.877 2.22 12.527 10.581 13.018 22.79 17.254 29.169 25.06 1.25 1.531 2.447 3.023 2.608 4.435.227 1.972-1.056 4.092-2.92 6.528C46.839 81.26 41.386 86.19 35.557 90.81z"
                    />
                  </Svg>
                  <Text ml={2} fontFamily='heading' color='white' fontSize={20}  >
                    Olá, {nome}.
                  </Text>
                </View>
                <View flexDir={'row'} >
                  <SearchBar placeholderTitle='Pesquise o serviço desejado' />
                  <IconButton onPress={() => navigation.navigate('Ajuda')} size={10}
                    icon={<MaterialCommunityIcons name="help-circle-outline" size={28}
                    color="white" borderRadius="full" />} borderRadius="full" _pressed={{
                    bg: 'coolGray.600:alpha.20',}} 
                  />
                </View>
              </View>
              {openSearch ? <SearchBar placeholderTitle={"Pesquise o serviço desejado"} /> : null}
            </Box>
          </Animated.View>
          {/* FIM HEADER */}

          {/* INÍCIO CARTÃO */}
          <Animated.View style={[styles.feature, animatedStyle]}>
            <TouchableOpacity onPress={() => navigation.navigate('CartaoVirtual')}>
              <Image
                source={require('../assets/cartao.png')}
                style={[styles.userCard ]}
              />
              
              <View style={[styles.featureLogos]}>
                <Flex mt={2} padding={4} paddingRight={-10} flexDirection='row'
                  justifyContent={'space-between'}>
                  <Box >
                    <LogoIPE height={32} position={'absolute'} left={-130}/>
                    <LogoBanrisul height={32} position={'absolute'} left={-270}/>
                  </Box>
                  <Box >
                    <Icon as={MaterialCommunityIcons} name='contactless-payment'
                      size='lg' color={'white'}/>
                  </Box>
                </Flex>
              </View>

              <ToqueParaUtilizar text={'Toque para utilizar'} />

              <View style={[styles.dataCard]}>
                <Flex mt={4} padding={4} flexDirection='row' justifyContent={'space-between'} >
                  <Box>
                    <Text fontFamily='virtualCard' color='white' fontWeight={'600'} fontSize={SCREEN_WIDTH < 350 ? 15 : 20} >
                      {cartao}
                    </Text>
                    <Text fontFamily='virtualCard' color='white' fontWeight={'medium'} fontSize={SCREEN_WIDTH < 350 ? 15 :16} >
                      {nomeCartao}
                    </Text>
                  </Box>
                  <Box mt={1} >
                    <Text fontFamily='virtualCard' color='white' fontWeight={'medium'} fontSize={SCREEN_WIDTH < 350 ? 15 :16} >
                      01/01/1975
                    </Text>
                    <Text fontFamily='virtualCard' color='white' fontWeight={'medium'} fontSize={SCREEN_WIDTH < 350 ? 15 : 16} >
                      PAMES
                    </Text>
                  </Box>
                </Flex>
              </View>

            </TouchableOpacity>
          </Animated.View>
          {/* FIM CARTÃO */}

          <View mt={-16} px={2} alignItems='center' borderTopRadius={25} bgColor='#F7F8F8'>
            <FlatList
              mx={4}
              mb={2}
              mt={10}
              data={buttons}
              renderItem={({ item }) => (
                <Button
                  title={item.name}
                  leftIcon={<Icon as={MaterialIcons} name={item.icon} color='orange.500' size='md' />}
                  _pressed={{ bgColor: 'gray.300' }}
                  navlink={item.navlink}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />

            <ItemBoxCompletoHome
              data={acessoRapido}
              w={SCREEN_WIDTH < 350 ? 110 : 150}
              showHorizontalScrollIndicator={false}
              numColumns={2}
              title={'Acesso Rápido'}
              navigation={navigation}
            />

            <ItemBoxCompletoHome
              data={atendimentoDigital}
              horizontal={true}
              title={'Atendimento digital'}
              navigation={navigation}
              opacity1={0.4}
              opacity2={0.6}
            />

            <ItemBoxCompletoHome
              data={servicos}
              title={'Serviços'}
              horizontal={true}
              navigation={navigation}
              opacity1={0.4}
              opacity2={0.6}
            />
          </View>

        </VirtualizedScrollView>
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Header: {
    width: 1 * SCREEN_WIDTH,
    height: 0.12 * SCREEN_WIDTH,
    bottom: 6,
    zIndex: -999
  },
  userCard: {
    width: 0.83 * SCREEN_WIDTH,
    height: 0.45 * SCREEN_WIDTH,
    maxWidth: 500,
    borderRadius: 15,
    marginTop: 8,
    marginBottom: 82,
    borderColor: '#FF9C4E',
    borderWidth: 3,
  },  
  feature: {
    marginTop: SCREEN_WIDTH < 350 ? 10 : 0,
    alignItems: 'center',
    zIndex: -2
  },
  featureLogos: {
    position: 'absolute',
    width: 0.77 * SCREEN_WIDTH,
    height: 4 / 8 * SCREEN_WIDTH,
  },
  dataCard: {
    position: 'absolute',
    width: SCREEN_WIDTH < 350 ? 0.80 * SCREEN_WIDTH : 0.77 * SCREEN_WIDTH,
    height: SCREEN_WIDTH < 350 ? 0.50 * SCREEN_WIDTH : 0.45 * SCREEN_WIDTH,
    justifyContent: 'flex-end',
  },
  featureData: {
    width: 0.83 * SCREEN_WIDTH,
    height: 4 / 8 * SCREEN_WIDTH,
    bottom: 10,
  },
  featureNumber: {
    fontSize: fontPixel(20),
    lineHeight: fontPixel(24),
    color: '#FFFFFF',
    fontFamily: 'Inconsolata_600SemiBold',
  },
  featureBirthDate: {
    fontSize: fontPixel(18),
    lineHeight: fontPixel(28),
    color: '#FFFFFF',
    fontFamily: 'Inconsolata_500Medium',
  },
  featureNameBottom: {
    fontSize: fontPixel(18),
    color: '#FFFFFF',
    fontFamily: 'Inconsolata_500Medium',
    marginTop: 10,
  },
  featurePAMESBottom: {
    fontSize: fontPixel(18),
    lineHeight: fontPixel(14),
    color: '#FFFFFF',
    fontFamily: 'Inconsolata_500Medium',
    marginTop: 14,
    marginBottom: 10,
  },
});
