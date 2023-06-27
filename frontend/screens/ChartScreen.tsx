import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../style/style";
import PieChart from "react-native-pie-chart";
import {IData} from "../redux/sensor";
import {useSelector} from "react-redux";
import React, {useState} from "react";
import dayjs from "dayjs";



function ChartScreen() {
    const [type, setType] = useState<'tvoc' | 'temp' | 'co2'>('temp')
    const data: any = useSelector((state: any) => state.sensor.data);



    return (
        <ScrollView style={styles.container}>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => setType('temp')}>
                    <Text style={styles.buttonText}>TEMP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setType('co2')}>
                    <Text style={styles.buttonText}>CO2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setType('tvoc')}>
                    <Text style={styles.buttonText}>TVOC</Text>
                </TouchableOpacity>
            </View>
            {type === 'temp' &&
              <View style={styles.chartContainer}>
                <Text>Temp</Text>
                <PieChart
                    widthAndHeight={250}
                    series={[parseFloat(data[2].value), parseFloat(data[5].value), parseFloat(data[8].value)]}
                    sliceColor={[Colors.primary100, Colors.primary200, Colors.primary300]}
                    coverRadius={0.45}
                    coverFill={'#FFF'}
                />
                <View style={styles.quadsContainer}>
                  <View style={styles.quadContainer}>
                    <View style={styles.quad1}></View>
                    <Text style={{}}>{dayjs(data[2].date).format('DD/MM/YYYY HH:mm') + ': ' + data[2].value}</Text>
                  </View>
                  <View style={styles.quadContainer}>
                    <View style={styles.quad2}></View>
                    <Text style={{}}>{dayjs(data[5].date).format('DD/MM/YYYY HH:mm') + ': ' + data[5].value}</Text>
                  </View>
                  <View style={styles.quadContainer}>
                    <View style={styles.quad3}></View>
                    <Text style={{}}>{dayjs(data[8].date).format('DD/MM/YYYY HH:mm') + ': ' + data[8].value}</Text>
                  </View>
                </View>

              </View>}
            {type === 'tvoc' &&
              <View style={styles.chartContainer}>
              <Text>TVOC</Text>
              <PieChart
                widthAndHeight={250}
                series={[parseFloat(data[0].value), parseFloat(data[3].value), parseFloat(data[6].value)]}
                sliceColor={[Colors.primary100, Colors.primary200, Colors.primary300]}
                coverRadius={0.45}
                coverFill={'#FFF'}
              />
                <View style={styles.quadsContainer}>
                  <View style={styles.quadContainer}>
                    <View style={styles.quad1}></View>
                    <Text style={{}}>{dayjs(data[0].date).format('DD/MM/YYYY HH:mm') + ': ' + data[0].value}</Text>
                  </View>
                  <View style={styles.quadContainer}>
                    <View style={styles.quad2}></View>
                    <Text style={{}}>{dayjs(data[3].date).format('DD/MM/YYYY HH:mm') + ': ' + data[3].value}</Text>
                  </View>
                  <View style={styles.quadContainer}>
                    <View style={styles.quad3}></View>
                    <Text style={{}}>{dayjs(data[6].date).format('DD/MM/YYYY HH:mm') + ': ' + data[6].value}</Text>
                  </View>
                </View>
            </View>}
            {type === 'co2' &&
              <View style={styles.chartContainer}>
              <Text>CO2</Text>
              <PieChart
                widthAndHeight={250}
                series={[parseFloat(data[1].value), parseFloat(data[4].value), parseFloat(data[7].value)]}
                sliceColor={[Colors.primary100, Colors.primary200, Colors.primary300]}
                coverRadius={0.45}
                coverFill={'#FFF'}
              />
                <View style={styles.quadsContainer}>
                  <View style={styles.quadContainer}>
                    <View style={styles.quad1}></View>
                    <Text style={{}}>{dayjs(data[1].date).format('DD/MM/YYYY HH:mm') + ': ' + data[1].value}</Text>
                  </View>
                  <View style={styles.quadContainer}>
                    <View style={styles.quad2}></View>
                    <Text style={{}}>{dayjs(data[4].date).format('DD/MM/YYYY HH:mm') + ': ' + data[4].value}</Text>
                  </View>
                  <View style={styles.quadContainer}>
                    <View style={styles.quad3}></View>
                    <Text style={{}}>{dayjs(data[7].date).format('DD/MM/YYYY HH:mm') + ': ' + data[7].value}</Text>
                  </View>
                </View>
            </View>}



        </ScrollView>
    )
}

export default ChartScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary50,
        flex: 1
    },
    chartContainer: {
        alignItems: 'center',
        marginVertical: 10
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginVertical: 24
    },
    quad1:{
        height: 24,
        width: 24,
        backgroundColor: Colors.primary100,
        marginRight: 8
    },
    quad2:{
        height: 24,
        width: 24,
        backgroundColor: Colors.primary200,
        marginRight: 8
    },
    quad3:{
        height: 24,
        width: 24,
        backgroundColor: Colors.primary300,
        marginRight: 8
    },
    quadsContainer: {
        marginVertical: 16,
    },
    quadContainer: {
        marginVertical: 8,
        flexDirection: "row",
    }
})