function Cancel() {
    const canelpage = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#ffe6e6',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };



    return (
        <div style={canelpage}>
            <h1>Payment Cancelled</h1>
            <p>Your payment has been cancelled.</p>
        </div>
    );
}
export default Cancel();