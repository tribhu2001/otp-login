import React, { useState } from 'react'
import OtpInput from './OtpInput';

const PhoneOtpForm = () => {
    const [phoneNumber, setphoneNumber] = useState("");
    const [showOtpForm, setShowOtpForm] = useState(false);

    const handlePhoneNumber = (e) => {
        setphoneNumber(e.target.value);
    }

    const handlePhoneNumberSubmit = (event) => {
        
        event.preventDefault();

        const regex = /[^0-9]/g;

        if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
            alert("Please enter a valid phone number");
            return;
        }

        setShowOtpForm(true);
    }

    const onOtpSubmit = (otp) => {
        console.log("OTP submitted:", otp);
    }

    return (
        <div>
            {!showOtpForm ? <form onSubmit={handlePhoneNumberSubmit}>
                <h1>Enter your phone number</h1>
                <input
                    type='text'
                    placeholder='Enter your phone number'
                    value={phoneNumber}
                    onChange={handlePhoneNumber}
                />
                <button type='submit'>Send OTP</button>
            </form> :
                <div>
                    <h2>Please enter OTP sent to {phoneNumber}</h2>
                    <OtpInput length={4} onOtpSubmit={onOtpSubmit}/>
                </div>
            }
        </div>
    )
}

export default PhoneOtpForm
