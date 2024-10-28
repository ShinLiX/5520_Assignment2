import { StyleSheet } from "react-native";
// Create a commonStyles object to store the styles that are shared across files
const commonStyles = StyleSheet.create({
    input: {
        borderWidth: 1.5,
        borderColor: '#521b6e',
        padding: 5,
        marginBottom: 5,
        borderRadius: 5,
        fontSize: 18,
        color: '#521b6e',
        backgroundColor: '#bcb8bf',
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
        left: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#420c6e',
        padding: 8,
        //paddingHorizontal: 10,
        justifyContent: 'space-around',
        margin: 10,
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
        minWidth: 100,
        alignItems: 'center',
        
    },
    dataContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    buttonStyle: {
        backgroundColor: '#754ba6',
        padding: 10,
        borderRadius: 5,
        minwidth: 100,
        alignItems: 'center',
    },
    pressedStyle: {
        backgroundColor: '#754ba6',
        opacity: 0.2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
    },
    iconContainer: {
        flexDirection: 'row',
        borderRadius: 5,
    },
    pressedIcon: {
        backgroundColor: '#754ba6',
        opacity: 0.2,
        borderRadius: 50,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '82%',
    },
});
export default commonStyles;