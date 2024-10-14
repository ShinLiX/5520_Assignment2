import { StyleSheet } from "react-native";
const commonStyles = StyleSheet.create({
    input: {
        borderWidth: 1.5,
        borderColor: '#521b6e',
        padding: 5,
        marginBottom: 5,
        borderRadius: 5,
        fontSize: 18,
        color: '#521b6e',
        backgroundColor: '#f5f5f5',
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
        marginTop: 10,
        fontWeight: 'bold',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#420c6e',
        padding: 8,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        margin: 8,
        borderRadius: 5,
        alignItems: 'center',
    },
    textItem: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        paddingEnd: 10,
    },
    textContainer: {
        backgroundColor: '#fff',
        color:'black',
        margin: 2,
        padding: 6,
        paddingHorizontal: 10,
    },
});
export default commonStyles;