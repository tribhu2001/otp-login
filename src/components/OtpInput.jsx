import React, { useState, useRef, useEffect } from 'react'
import '../App.css'; // Assuming you have a CSS file for styling

const OtpInput = ({ length = 4, onOtpSubmit = () => { } }) => {

    const [otp, setOtp] = useState(new Array(length).fill(""));

    const [otpSubmitted, setOtpSubmitted] = useState(false);

    const inputRefs = useRef([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) {
            return; // Ignore non-numeric input or more than one character
        }

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only take the last character if more than one is entered
        setOtp(newOtp);

        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === length) {
            onOtpSubmit(combinedOtp); // Call the submit function when OTP is complete
        }

        // Move to the next input if the current one is filled
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    }
    const handleKeyDown = (e, index) => {
        if (
            e.key === 'Backspace' &&
            !otp[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
        ) {
            inputRefs.current[index - 1].focus();
        }
    }

    return (
        !otpSubmitted ? <div>
            {
                otp.map((value, index) => (
                    <input
                        key={index}
                        type="text"
                        value={value}
                        ref={(el) => (inputRefs.current[index] = el)}
                        onChange={(e) => handleOtpChange(e, index)}
                        onClick={() => handleOtpSubmit()}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className='otp-input'
                    />
                ))
            }
            <div>
                <button onClick={() => setOtpSubmitted(true)} className='otp-submit-button'>
                    Submit OTP
                </button>
            </div>

        </div> :
            <div className='otp-submitted-message'>
                <h2>OTP Submitted Successfully!</h2>
            </div>
    )
}

export default OtpInput
