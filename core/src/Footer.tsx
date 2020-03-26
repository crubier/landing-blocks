import React, { ReactNode, useContext } from 'react'
import Color from 'color-js'
import { Box, Text, Stack } from '@chakra-ui/core'
import { Row } from '.'
import { PageContainer } from './layout'

export const Footer = ({
    columns = {} as { [k: string]: ReactNode[] },
    businessName = 'Monster Inc.',
    ...rest
}) => {
    return (
        <PageContainer minHeight='200px' {...rest}>
            <Stack flexDir='row' flexWrap='wrap' justifyContent='space-evenly' spacing='40px'>
                {Object.keys(columns).map((k) => {
                    return (
                        <Stack
                            minW={{ sm: '100%', lg: '0px' }}
                            spacing='10px'
                            key={k}
                        >
                            <Text
                                d='block'
                                fontSize='16px'
                                fontWeight='medium'
                                width='auto'
                                textAlign='left'
                            >
                                {k}
                            </Text>
                            {columns[k].map((x) => (
                                <Text>{x}</Text>
                            ))}
                        </Stack>
                    )
                })}
            </Stack>
            <Text width='auto' opacity={0.6} fontSize='14px' alignSelf='center'>
                Copyright © 2019 {businessName}
            </Text>
        </PageContainer>
    )
}
