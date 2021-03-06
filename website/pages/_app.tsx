import { Link, useColorMode } from '@chakra-ui/core'
import { DokzProvider, GithubLink } from 'dokz'
import { Footer } from 'landing-blocks/src/Footer'
import { useMyColorMode } from 'landing-blocks/src/hooks'
import { Box, Stack } from 'layout-kit-react'
import NextLink from 'next/link'
import React from 'react'
import { LogoBlack, LogoIcon, LogoIconBlack, LogoWhite } from '../svgs'
import { useRouter } from 'next/router'

export default function App(props) {
    const { Component, pageProps } = props
    const { pathname } = useRouter()
    if (pathname.startsWith('/docs')) {
        return (
            <DokzProvider
                docsRootPath='pages/docs'
                headerItems={[
                    ...headingNavLinks,
                    // <ColorModeSwitch key='1' />,
                    ,
                ]}
                headerLogo={<HeadingLogoIcon width='36px' opacity={0.8} />}
                mdxComponents={{
                    img: (p) => <img {...p} />,
                    a: (p) => <p {...p} />,
                }}
                sidebarOrdering={{
                    // sidebar ordering
                    demos: false,
                    docs: {
                        index: true,
                        components: { hero: true },
                    },
                }}
            >
                <Component {...pageProps} />
            </DokzProvider>
        )
    }
    return <Component {...pageProps} />
}

export const headingNavLinks = [
    <MyLink href='/#components'>Components</MyLink>,
    <MyLink href='/#demos'>Demos</MyLink>,
    <MyLink href='#'>Newsletter</MyLink>,
    <GithubLink key='0' url='https://github.com/remorses/landing-blocks' />,
]

export function MyFooter({ ...rest }) {
    return (
        <Footer
            businessName='Landing Blocks'
            columns={{
                Developers: [
                    <MyLink href='#'>Components</MyLink>,
                    <MyLink href='#'>Components</MyLink>,
                    <MyLink href='#'>Components</MyLink>,
                ],
                Company: [<MyLink href='#'>Components</MyLink>],
                Product: [<MyLink href='#'>Components</MyLink>],
            }}
            {...rest}
        />
    )
}

export function MyLink({ href, ...rest }) {
    const { colorMode } = useMyColorMode(rest)
    return (
        <NextLink href={href} passHref {...rest}>
            <Link
                fontWeight='medium'
                // color='black'
                // color={{ light: 'blue.400', dark: 'white' }[colorMode]}
                {...rest}
            />
        </NextLink>
    )
}

function MyBreadcrumbs({ items, ...rest }) {
    return (
        <Stack direction='row' spacing='10px' align='center' {...rest}>
            {items.map((x, i) => (
                <Stack
                    opacity={0.6}
                    fontWeight='medium'
                    direction='row'
                    align='center'
                    spacing='10px'
                >
                    <Box>{x}</Box>
                    {i !== items.length - 1 && <Box>></Box>}
                </Stack>
            ))}
        </Stack>
    )
}

export const HeadingLogoIcon = ({ long = false, ...props }) => {
    const { colorMode } = useColorMode()
    const dark = colorMode === 'dark'
    return (
        <NextLink href='/'>
            <Box
                cursor='pointer'
                as={
                    long
                        ? dark
                            ? LogoWhite
                            : LogoBlack
                        : dark
                        ? LogoIcon
                        : LogoIconBlack
                }
                width='36px'
                {...props}
            />
        </NextLink>
    )
}
