//Página q junto da Home page envia as navegações! Sempre atualizar no Stack.Navigator!!
import HomePage from '../screens/HomePage'
import GuiaMedicoHospitalar from '../screens/GuiaMedicoHospitalar'
import GuiaMedicoHospitalarEmergencia from '../screens/GuiaMedicoHospitalarEmergencia'
import ProfissionaisFavoritos from '../screens/ProfissionaisFavoritos'
import CartaoVirtual from '../screens/CartaoVirtual'
import Boletos from '../screens/Boletos'
import HabilitacaoDependentes from '../screens/HabilitacaoDependentes'
import FilhoRecemNasc from '../screens/FilhoRecemNasc'
import HabilitacaoDeFilho from '../screens/HabilitacaoDeFilho'
import HabilitacaoFilhos24 from './HabilitacaoFilhos24'
import ConjugeCasados from './ConjugeCasados'
import EditarDados from './EditarDados'
import ExConjuge from './ExConjuge'
import EmConstrucao from './EmConstrucao'
import NFC from '../screens/NFC'
import Ajuda from './Ajuda'
import Error401 from './errors/Error401'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OpenCamera from './OpenCamera'

const Stack = createNativeStackNavigator()
import { THEME } from '../../styles/theme'
export default function Home({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} >
      <Stack.Screen
        name="HomePage"
        component={HomePage}
      />
      <Stack.Screen
        name="CartaoVirtual"
        component={CartaoVirtual}
        options={{title: 'Cartão Virtual', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#f07e26' } }}
      />
      <Stack.Screen
        name="GuiaMedicoHospitalar"
        component={GuiaMedicoHospitalar}
        options={{ title: 'Guia Médico - Serviços', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#f07e26' } }}
      />
      <Stack.Screen
        name="GuiaMedicoHospitalarEmergencia"
        component={GuiaMedicoHospitalarEmergencia}
        options={{ title: 'Guia Médico - Emergência', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#f07e26' } }}
      />
      <Stack.Screen
        name="ProfissionaisFavoritos"
        component={ProfissionaisFavoritos}
        options={{ title: 'Profissionais Favoritos', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#f07e26' } }}
      />
      <Stack.Screen
        name="Boletos" 
        component={Boletos} 
        options={{ title: 'Boletos', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#f07e26' } }}
      />
      <Stack.Screen
        name="HabilitacaoDependentes"
        component={HabilitacaoDependentes}
        options={{ title: 'Habilitação de Dependentes', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#f07e26' } }}
      />
      <Stack.Screen
        name="FilhoRecemNasc"
        component={FilhoRecemNasc}
        options={{ title: 'Filho(a) Recém-Nascido(a)', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#f07e26' } }}
      />
      <Stack.Screen
        name="HabilitacaoDeFilho"
        component={HabilitacaoDeFilho}
        options={{ title: 'Habilitação de Filho -18', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#f07e26' } }}
      />
      <Stack.Screen
        name="HabilitacaoFilhos24"
        component={HabilitacaoFilhos24}
        options={{ title: 'Estudante (de 18 a 24 anos)', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#f07e26' } }}
      />
      <Stack.Screen
        name="ConjugeCasados"
        component={ConjugeCasados}
        options={{ title: 'Cônjuge (Civilmente Casado)', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#f07e26' } }}
      />

      <Stack.Screen
        name="ExConjuge"
        component={ExConjuge}
        options={{ title: 'Ex-Cônjuge com Pensão Alimentícia', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#f07e26' } }}
      />

      <Stack.Screen
        name="OpenCamera"
        component={OpenCamera}
        options={{ title: 'Escanear Documentações', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#f07e26' } }}
      />

      <Stack.Screen
        name="NFC"
        component={NFC}
        options={{ title: 'Autorizar consulta', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#f07e26' } }}
      />

      <Stack.Screen
        name="Ajuda"
        component={Ajuda}
        options={{ title: 'Ajuda e Suporte', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#f07e26' } }}
      />

      <Stack.Screen
        name="EmContrucao"
        component={EmConstrucao}
        options={{ title: 'Página em Construção', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#f07e26' } }}
      />

      <Stack.Screen
        name="Error401"
        component={Error401}
        options={{ title: 'Ocorreu um erro!', headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#f07e26' } }}
      />
     <Stack.Screen
        name="EditarDados"
        component={EditarDados}
        options={{ title: 'EditarDados',  headerShown: true, headerTintColor: '#fff', headerStyle: { backgroundColor: '#f07e26' } }}
      />
    </Stack.Navigator>
  );
}