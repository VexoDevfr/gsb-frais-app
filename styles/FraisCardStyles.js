import { StyleSheet as styleSheet } from "react-native";
const fraisStyles = styleSheet.create({
    card: {
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        marginBottom: 12,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#161B33",
    },
    meta: {
        fontSize: 14,
        color: "#5B6270",
        marginTop: 4,
    },
    montant: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#0E8C7C",
        marginTop: 4,
    },
    editButton: {
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "#0E8C7C",
        borderRadius: 8,
        alignItems: "center",
    },
    deleteButton: {
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "#FF4D4F",
        borderRadius: 8,
        alignItems: "center",
    },
})

export default fraisStyles;