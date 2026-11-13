import { StyleSheet } from "react-native";
export const fraisFormStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24
    },
    formTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24
    },
    input: {
        borderWidth: 1,
        borderColor: "#d6d6d6",
        borderRadius: 8,
        padding: 12,
        marginTop: 4,
        marginBottom: 16,
    },
    smallButtonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    smallbutton: {
        backgroundColor: "#363535",
        borderRadius: 8,
        padding: 10,
        width: "48%",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#363535",
        borderRadius: 8,
        padding: 14,
        alignItems: "center",
    },
    buttonDisabled: { opacity: 0.5 },
    buttonText: { color: "#FFFFFF", fontWeight: "bold" },
    error: { color: "red", marginBottom: 12 },
});
