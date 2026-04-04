
import React from 'react';

function Success() {
    const successContainer = {
        textAlign: 'center',
        padding: '50px',
        backgroundColor: '#f0f8ff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };
    return (
        <div style={successContainer}>
            <h1>Payment Successful!</h1>
            <p>Thank you for your payment. Your transaction has been completed successfully.</p>
        </div>
    );
}
export default Success;