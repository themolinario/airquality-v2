import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Colors} from "../style/style";

interface TableProps {
    headers: string[];
    data: string[][];
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                {headers.map((header, index) => (
                    <Text key={index} style={styles.headerCell}>
                        {header}
                    </Text>
                ))}
            </View>
            {data.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map((cell, cellIndex) => (
                        <Text key={cellIndex} style={styles.cell}>
                            {cell}
                        </Text>
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: Colors.primary200,
        paddingVertical: 10,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    headerCell: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
    },
});

export default Table;
