//Esta pág faz parte da Habilitação de dependentes, ela poderia se juntar às outras em componentes ou em um case switch!!
//Além disso é interessante rever o código e ver se é possível simplificar!!
//Possivelmente esta aqui poderia navigar ou abrir as demais!!
import { Text, View, VStack, Box, Image} from 'native-base';
//import {Image} from 'react-native'

export default function EmConstrucao({ navigation }) {
  return (
    <View width="100%" backgroundColor="gray.100">
        <Box  p={4} justifyContent="center" alignItems="center" px={10} width="100%" mt={40}>
          <Image source={require('../assets/ipe_logo-pb.png')} alt={'imagem em construção'} resizeMode={'contain'}  />
          <Text color="gray.500" fontSize={20} fontWeight="normal" mt={-5}>
            Página em Construção!
          </Text>
        </Box>
    </View>
  );
}