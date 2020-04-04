import React from 'react'
import Head from 'next/head'
import {
    Hero,
    Heading,
    LandingProvider,
    SubHeading,
    Divider,
    Col,
    Feature,
    HowItWorks,
    FeaturesList,
    NavBar,
    Footer,
    Banner,
    Button,
    Pricing,
} from 'react-landing/src'
import { GradientCurtains } from 'react-landing/src/decorations'
import { Link, Box } from '@chakra-ui/core'
import { FiCheck } from 'react-icons/fi'

const Page = () => (
    <LandingProvider primary='#2D7FF9'>
        <NavBar
            logo={<img width='120px' src='/airtable/logo.svg' />}
            navs={[
                <a>Features</a>,
                <a>Use Cases</a>,
                <a>Pricing</a>,
                <a>About Us</a>,
                <a>Login</a>,
            ]}
        />
        <Hero
            heading='Create, your way'
            subhead='Part spreadsheet, part database, and entirely flexible, teams use Airtable to organize their work, their way.'
            image={<img width='500px' src='/airtable/hero.png' />}
            cta={<Button>Get Started</Button>}
            fingerprint='Already using Airtable? Sign in'
        />
        <Feature
            heading='Unleash your team’s creative potential with Blocks'
            subhead='Airtable Blocks give you a creative palette of app-like functionality that you can mix and match to create the perfect workflow for your team.'
            image={<img src='/airtable/feature1.jpg' width='500px' />}
            flip
        />
        <Pricing
            features={[
                'Records per base',
                'Attachment space per base',
                'Revision and snapshot history',
                'Rich field types including file attachments, checkboxes, dropdowns, and more',
                'Grid, calendar, form, kanban, and gallery views',
                'Realtime collaboration and commenting',
            ]}
            prices={[
                {
                    heading: 'FREE',
                    subhead: 'Essential Features',
                    features: ['Unlimited', '1200', '2Gb', '2 Weeks'],
                    price: 'Free',
                    cta: <Link color='blue.600'>Get started</Link>,
                },
                {
                    heading: 'PLUS',
                    subhead: 'Essential Features',
                    features: [
                        'Unlimited',
                        '1200',
                        '2Gb',
                        '2 Weeks',
                        <Box as={FiCheck} />,
                    ],
                    price: '$10',
                    background: '#D1F0FD',
                    cta: <Link color='blue.600'>Get started</Link>,
                },
                {
                    heading: 'PRO',
                    subhead: 'Essential Features',
                    features: [
                        'Unlimited',
                        '1200',
                        '2Gb',
                        '2 Weeks',
                        <Box as={FiCheck} />,
                        <Box as={FiCheck} />,
                    ],
                    price: '$20',
                    background: '#FFEAB6',
                    cta: <Link color='blue.600'>Get started</Link>,
                },
            ]}
        />
        <Footer
            businessName='Prismic'
            columns={{
                Developers: [
                    <a>Quickstart</a>,
                    <a>Documentation</a>,
                    <a>Samples</a>,
                ],
                Company: [
                    <a>Quickstart</a>,
                    <a>Documentation</a>,
                    <a>Samples</a>,
                ],
                Product: [
                    <a>Quickstart</a>,
                    <a>Documentation</a>,
                    <a>Samples</a>,
                ],
            }}
        />
    </LandingProvider>
)

export default Page