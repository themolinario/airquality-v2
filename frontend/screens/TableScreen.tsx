import {ScrollView, StyleSheet} from "react-native";
import {Colors} from "../style/style";
import {useSelector} from "react-redux";
import {IData} from "../redux/sensor";
import Table from "../components/Table";
import dayjs from "dayjs";



function TableScreen() {
    const data: IData[] = useSelector((state: any) => state.sensor.data);


    return (
        <ScrollView style={styles.container}>
            <Table headers={['Tipo', 'Valore', 'Ora', 'Sorgente']} data={data.map(el => [el.type, el.value, dayjs(el.date).format('DD/MM/YYYY HH:mm'), el.source])} />
        </ScrollView>
    )
}

export default TableScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary50
    },

})