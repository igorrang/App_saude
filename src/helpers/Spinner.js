import { Heading, Spinner, Text, View, Image } from "native-base";
import { LinearGradient } from 'expo-linear-gradient';


const SpinnerDefault = () => {
    return (
        <View zIndex={1} w={"full"} h={"full"} alignItems='center' justifyContent='center' bg='#fff'>
            <Image source={require('../assets/Splash.gif')} alt="Imagem Carregamento" size={'472'} ml='-13'/>
            <Spinner color="green.800" size='lg' />
           
        </View>
    )
}

export default SpinnerDefault