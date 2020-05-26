import React, { useState, memo, useMemo, useRef, useEffect } from 'react';
import './Slider.css';
import PropTypes from 'prop-types';
import leftPad from 'left-pad';

import useWinSize from './useWinSize';

const Slider = memo(function Slider(props) {
    const {
        title,
        currentStartHour,
        currentEndHour,
        onStartChange,
        onEndChange,
    } = props;

    const range = useRef();
    const rangeWidth = useRef();

    const startHandle = useRef();
    const endHandle = useRef();

    const lastStartX = useRef();
    const lastEndX = useRef();

    const prevCurrentStartHours = useRef(currentStartHour);
    const prevCurrentEndHours = useRef(currentEndHour);

    const [start, setStart] = useState(() => {
        return currentStartHour / 24 * 100
    });
    const [end, setEnd] = useState(() => {
        return currentEndHour / 24 * 100
    });

    if (prevCurrentStartHours.current !== currentStartHour) {
        setStart((currentStartHour / 24) * 100);
        prevCurrentStartHours.current = currentStartHour;
    };

    if (prevCurrentEndHours.current !== currentEndHour) {
        setEnd((currentEndHour / 24) * 100);
        prevCurrentEndHours.current = currentEndHour;
    };

    // if (prevCurrentStartHours.current !== currentStartHour) {
    //     setStart((currentStartHour / 24) * 100);
    //     prevCurrentStartHours.current = currentStartHour;
    // }

    // if (prevCurrentEndHours.current !== currentEndHour) {
    //     setEnd((currentEndHour / 24) * 100);
    //     prevCurrentEndHours.current = currentEndHour;
    // }

    const startPercent = useMemo(() => {
        if(start > 100) {
            return 100
        }
        if (start < 0) {
            return 0
        }
        return start
    }, [start]);

    const endPercent = useMemo(() => {
        if(end > 100) {
            return 100
        }
        if (end < 0) {
            return 0
        }
        return end
    }, [end]);

    const startHour = useMemo(() => {
        return Math.round(startPercent * 24 / 100);
    },[startPercent]);

    const endHour = useMemo(() => {
        return Math.round(endPercent * 24 / 100)
    }, [endPercent]);

    const startText = useMemo(() => {
        return leftPad(startHour, 2, '0') + ':00';
    }, [startHour])

    const endText = useMemo(() => {
        return leftPad(endHour, 2, '0') + ':00' 
    }, [endHour])

    useEffect(() => {
        rangeWidth.current = parseFloat(window.getComputedStyle(range.current).width)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useWinSize.width])

    function onStartTouchBegin(e) {
        const touch = e.targetTouches[0];
        lastStartX.current = touch.pageX;
    }

    function onEndTouchBegin(e) {
        const touch = e.targetTouches[0];
        lastEndX.current = touch.pageX;
    }

    function onStartTouchMove(e) {
        const touch = e.targetTouches[0];
        const distance = touch.pageX - lastStartX.current;
        lastStartX.current = touch.pageX;
        
        setStart(start => {
            return start + (distance / rangeWidth.current) * 100
        })
    }

    function onEndTouchMove(e) {
        const touch = e.targetTouches[0];
        const distance = touch.pageX - lastEndX.current;
        lastEndX.current = touch.pageX;

        setEnd(end => {
            return end + (distance / rangeWidth.current) * 100
        })
    }

    useEffect(() => {

        startHandle.current.addEventListener('touchstart', onStartTouchBegin, false)
        startHandle.current.addEventListener('touchmove', onStartTouchMove, false)

        endHandle.current.addEventListener('touchstart', onEndTouchBegin, false)
        endHandle.current.addEventListener('touchmove', onEndTouchMove, false)

        const startRef = startHandle.current;
        const endRef = endHandle.current;

        return () => {
            startRef.removeEventListener('touchstart', onStartTouchBegin, false);
            startRef.removeEventListener('touchmove', onStartTouchMove, false);
            endRef.removeEventListener('touchstart', onEndTouchBegin, false);
            endRef.removeEventListener('touchmove', onEndTouchMove, false);
        }

    }, [])

    useEffect(() => {
        onStartChange(startHour)
    }, [onStartChange, startHour])

    useEffect(() => {
        onEndChange(endHour)
    }, [endHour, onEndChange])

    return (
        <div className="option">
            <h3>{ title }</h3>
            <div className="range-slider">
                <div className="slider" ref={range}>
                    <div
                        className="slider-range"
                        style={{
                            left: startPercent + '%',
                            width: endPercent - startPercent + '%',
                        }}
                    ></div>
                    <i
                        ref={startHandle}
                        className="slider-handle"
                        style={{
                            left: startPercent + '%',
                        }}
                    >
                        <span>{startText}</span>
                    </i>
                    <i
                        ref={endHandle}
                        className="slider-handle"
                        style={{
                            left: endPercent + '%',
                        }}
                    >
                        <span>{endText}</span>
                    </i>
                </div>
            </div>
        </div>
    )
})

export default Slider;

Slider.proptypes = {
    title: PropTypes.string.isRequired,
    currentStartHour: PropTypes.number.isRequired,
    currentEndHour: PropTypes.number.isRequired,
    onStartChange: PropTypes.func.isRequired,
    onEndChange: PropTypes.func.isRequired,
}
