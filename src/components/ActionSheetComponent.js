import React, { useState } from 'react';
import { Box, Icon, Flex, ScrollView, Center, Link, Button, Text, AlertDialog, IconButton, CloseIcon, HStack, VStack, Alert, Actionsheet, useDisclose, } from 'native-base'
import { EvilIcons } from "@expo/vector-icons";
export default function ActionSheetComponent(props) {

    const { isOpen, onOpen, onClose } = useDisclose();

    const action1 = props.action1
    const action2 = props.action2
    const action3 = props.action3
    const action4 = props.action4
    const action5 = props.action5
    const descricao = props.descricao
    const title = props.title
    const fix = props.fix

    return (
        <Box>
            <Button w='95%' backgroundColor='muted.300' mt='4' ml="2" onPress={onOpen} endIcon={<Icon as={EvilIcons} color='gray.400' name="plus" size="xl" marginLeft="20" />} _icon={{
            }}>
                <Text top="-1.15" mt='0.5' mr='2' color='gray.500' bold fontSize='16' >Enviar os seguintes arquivos</Text>
            </Button>

            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content _dragIndicator={{
                    bg: 'blue.500'
                }}>

                    {
                        title != null && fix != null ? <Box w="100%" h={60} px={4} justifyContent="center">
                            <Text bold fontSize="16" color="gray.800" _dark={{
                                color: 'gray.300'
                            }}>
                                {title}
                            </Text>
                            <Text mt="3" italic fontSize="13" color="gray.800" _dark={{
                                color: 'gray.300'
                            }}>
                                {fix}

                            </Text>
                        </Box> : <Box />
                    }



                    <Box w="100%" h={60} px={4} justifyContent="center">
                        <Text underline italic bold fontSize="22" color="gray.800" _dark={{
                            color: 'gray.300'
                        }}>
                            Arquivos necessários
                        </Text>
                    </Box>

                    <Actionsheet.Item>
                        {action1}
                    </Actionsheet.Item>

                    <Actionsheet.Item>
                        {action2}
                    </Actionsheet.Item>

                    <Actionsheet.Item>
                        {action3}
                    </Actionsheet.Item>

                    <Actionsheet.Item>
                        {action4}
                    </Actionsheet.Item>


                    {
                        descricao != null ? <Box w="100%"  justifyContent="center">
                            <Text underline italic bold fontSize="14" color="gray.800" _dark={{
                                color: 'gray.300'
                            }}>
                                {descricao}

                            </Text>

                        </Box> : null
                    }
                </Actionsheet.Content>
            </Actionsheet>
        </Box>
    )

}