import { Box, Stack, StackProps } from '@chakra-ui/core'
import React, { ReactNode, cloneElement, useState, useEffect } from 'react'
import { Row, SubHeading, Heading, Button, Bullet } from '.'
import {
    PageContainer,
    Col,
    FloatingElement,
    PageContainerProps,
} from './layout'
import { useFaded } from './hooks'

import { GradientRect } from './decorations'
import { clone } from './support'

export type SectionTitleProps = {
    heading?: ReactNode
    subheading?: ReactNode
    cta?: ReactNode
    bullet?: ReactNode
    deadline: Date
    animate?: any
} & PageContainerProps

export function Countdown({
    heading = '',
    subheading = '',
    deadline,
    bullet = '',
    cta = '' as ReactNode,
    animate = true,
    ...rest
}: SectionTitleProps) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft({ deadline }))
    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft({ deadline }))
        }, 1000)
    })

    const { Faded } = useFaded({ animate })
    return (
        <PageContainer {...rest}>
            <Stack
                as={Faded}
                alignSelf='center'
                maxW='700px'
                spacing='30px'
                align='center'
                textAlign='center'
            >
                <Bullet>{bullet}</Bullet>
                <Heading fontSize='32px'>{heading}</Heading>
                <SubHeading fontSize='18px'>{subheading}</SubHeading>
                <Stack spacing='20px' direction='row'>
                    {Object.keys(timeLeft).map((timeName, index) => {
                        const remaining: string = timeLeft[timeName]
                        const isLast =
                            index === Object.keys(timeLeft).length - 1
                        return (
                            <Stack
                                direction='row'
                                spacing='20px'
                                // fontSize='18px'
                            >
                                <Stack spacing='10px' align='center'>
                                    <Box fontSize='62px'>{remaining}</Box>
                                    <Box letterSpacing='2px' opacity={0.6}>
                                        {timeName.toUpperCase()}
                                    </Box>
                                </Stack>
                                {!isLast && <Box opacity={.8} fontSize='52px'>:</Box>}
                            </Stack>
                        )
                    })}
                </Stack>
                {cta && (
                    <Col justify='center' align='center'>
                        {clone(cta)}
                    </Col>
                )}
            </Stack>
        </PageContainer>
    )
}

const calculateTimeLeft = ({ deadline }: { deadline: Date }) => {
    const difference = +new Date(deadline) - +new Date()
    let timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    }
    timeLeft = Object.assign(
        {},
        ...Object.keys(timeLeft).map((k) => ({
            [k]: padZeros(timeLeft[k], 2),
        })),
    )
    return timeLeft
}

function padZeros(number, length) {
    var my_string = '' + number
    while (my_string.length < length) {
        my_string = '0' + my_string
    }

    return my_string
}
