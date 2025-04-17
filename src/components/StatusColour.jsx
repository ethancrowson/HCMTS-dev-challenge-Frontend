function StatusColour({ status }) {
    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "#FFC107";  // amber
            case "IN_PROGRESS":
                return "#17A2B8";  // cyan-blue
            case "COMPLETED":
                return "#28A745";  // green
            case "ON_HOLD":
                return "#6C757D";  // neutral grey
            case "CANCELLED":
                return "#DC3545";  // soft red
            default:
                return "#343A40";  // dark grey fallback
        }
    };

    const badgeStyle = {
        backgroundColor: getStatusColor(status),
        color: "#fff",
        padding: "4px 10px",
        borderRadius: "12px",
        fontSize: "0.85rem",
        fontWeight: "500",
        textTransform: "capitalize"
    };

    return (
        <span style={badgeStyle}>
            {status.replace("_", " ").toLowerCase()}
        </span>
    );
}

export default StatusColour;