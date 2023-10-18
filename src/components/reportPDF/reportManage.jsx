import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

function PdfManage({ data }) {
  const createTableHeader = () => {
    const DateTH = (date) =>
      Intl.DateTimeFormat("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(Date.parse(date));
    return (
      <View>
        <View style={styles.tableRow} fixed>
          <View style={styles.tableColHeader}>
            <Text>ตำเเหน่งง</Text>
          </View>
          <View style={styles.tableColHeaderA}>
            <Text>หน่วยงานบริหาร</Text>
          </View>
          <View style={styles.tableColHeaderA}>
            <Text>วันที่เริ่มบริหาร</Text>
          </View>
          <View style={styles.tableColHeaderA}>
            <Text>สถานะ</Text>
          </View>
        </View>
        {React.Children.toArray(
          data.map((item, i) => {
            return (
              <View style={styles.tableRow} key={i}>
                <View style={styles.tableCol}>
                  <Text>{item.manageP_position}</Text>
                </View>
                <View style={styles.tableColA}>
                  <Text>{item.manageP_agency}</Text>
                </View>
                <View style={styles.tableColB}>
                  <Text>{DateTH(item.manageP_startdate)}</Text>
                </View>
                <View style={styles.tableColC}>
                  <Text>{item.status.name}</Text>
                </View>
              </View>
            );
          })
        )}
      </View>
    );
  };
  const styles = StyleSheet.create({
    pageStyle: {
      paddingTop: 16,
      paddingHorizontal: 40,
      paddingBottom: 56,
    },

    tableRow: {
      flexDirection: "row",
    },
    tableColHeader: {
      width: "50%",
      textAlign: "center",
      fontSize: "12px",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      fontFamily: "K2D",
      padding: 5,
    },
    tableColHeaderA: {
      width: "50%",
      textAlign: "center",
      fontSize: "12px",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      fontFamily: "K2D",
      padding: 5,
    },
    tableCol: {
      width: "50%",
      fontSize: "12px",
      textAlign: "center",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      fontFamily: "K2D",
      borderLeftWidth: 0,
      padding: 3,
    },
    tableColA: {
      width: "50%",
      fontSize: "12px",
      textAlign: "center",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      fontFamily: "K2D",
      borderLeftWidth: 0,
      padding: 5,
    },
    tableColB: {
      width: "50%",
      fontSize: "12px",
      textAlign: "center",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      fontFamily: "K2D",
      borderTopWidth: 0,
      borderLeftWidth: 0,
      padding: 5,
    },
    tableColC: {
      width: "50%",
      fontSize: "12px",
      textAlign: "center",
      borderStyle: "solid",
      borderBottomWidth: 1,
      fontFamily: "K2D",
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      padding: 5,
    },
    tableA: {
      fontFamily: "K2D",
      textAlign: "center",
    },
    table: {
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bfbfbf",
      borderBottomWidth: 0,
      borderRightWidth: 0,
    },
  });
  return (
    <Document>
      <Page style={styles.pageStyle} size="A4" orientation="portrait">
        <Text style={styles.tableA}>ข้อมูลประวัติตำเเหน่งบริหารร</Text>

        <View style={styles.table}>{createTableHeader()}</View>
      </Page>
    </Document>
  );
}
export default PdfManage;
