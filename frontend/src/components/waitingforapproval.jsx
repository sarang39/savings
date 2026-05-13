export default function WaitingApproval() {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f4f4f4",
                fontFamily: "Arial"
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    textAlign: "center",
                    width: "350px"
                }}
            >
                <h1
                    style={{
                        color: "#ff9800",
                        marginBottom: "15px"
                    }}
                >
                    Waiting for Admin Approval
                </h1>

                <p
                    style={{
                        color: "#555",
                        fontSize: "16px",
                        lineHeight: "24px"
                    }}
                >
                    Your account is currently under review.
                    Please wait until the admin approves your request.
                </p>
            </div>
        </div>
    );
}