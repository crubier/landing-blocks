/** @jsx jsx */
import * as React from 'react'
import { isFragment } from 'react-is'
import { useInView } from 'react-intersection-observer'

import styled from '@emotion/styled'
import { keyframes, jsx, css } from '@emotion/core'
import { forwardRef } from 'react'
import * as animations from './animations'

export function getAnimationCss({
    duration = 1000,
    delay = 0,
    timingFunction = 'ease',
    keyframes = animations.FadeInUpAnimation,
    iterationCount = 1,
}) {
    return css`
        animation-duration: ${duration}ms;
        animation-timing-function: ${timingFunction};
        animation-delay: ${delay}ms;
        animation-name: ${keyframes};
        animation-direction: normal;
        animation-fill-mode: both;
    `
}

export type Props = {
    cascade?: boolean
    damping?: number
    duration?: number
    threshold?: number
    triggerOnce?: boolean
    children: any
}

const cloneElement = (element, props) =>
    jsx(element.type, {
        key: element.key,
        ref: element.ref,
        ...element.props,
        ...props,
    })

export const Reveal = forwardRef(
    (
        {
            cascade = true,
            damping = 0.3,
            duration = 600,
            threshold = 0.3,
            triggerOnce = true,
            children,
            ...rest
        }: Props,
        ref1,
    ) => {
        const [ref, inView] = useInView({ threshold, triggerOnce })
        const combinedRef = useCombinedRefs(ref, ref1)

        function makeAnimated(nodes: React.ReactNode): React.ReactNode {
            if (!nodes) {
                return null
            }

            if (typeof nodes === 'string') {
                return nodes
            }

            if (isFragment(nodes)) {
                return jsx(
                    'div',
                    {
                        css: getAnimationCss({}),
                    },
                    nodes,
                )
            }

            return React.Children.map(nodes, (node, index) => {
                const childElement = node as React.ReactElement
                const css = [childElement.props.css]
                if (inView) {
                    css.push(
                        getAnimationCss({
                            delay: cascade ? index * duration * damping : 0,
                            duration,
                        }),
                    )
                } else {
                    css.push({ opacity: 0 })
                }
                return cloneElement(childElement, {
                    css,
                    // children: makeAnimated(childElement.props.children),
                })
            })
        }
        return (
            <div ref={combinedRef} {...rest}>
                {makeAnimated(children)}
            </div>
        )
    },
)

function useCombinedRefs(...refs) {
    const targetRef = React.useRef()

    React.useEffect(() => {
        refs.forEach((ref) => {
            if (!ref) return

            if (typeof ref === 'function') {
                ref(targetRef.current)
            } else {
                ref.current = targetRef.current
            }
        })
    }, [refs])

    return targetRef
}
