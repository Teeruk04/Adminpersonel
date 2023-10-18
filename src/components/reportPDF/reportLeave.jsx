import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { LeaveType } from "../../constants/LeaveType";

function PdfLeaveByUser({ data, report }) {
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
            <Text>ประเภทวันลา</Text>
          </View>
          <View style={styles.tableColHeaderA}>
            <Text>จำนวนวันน</Text>
          </View>
          <View style={styles.tableColHeaderA}>
            <Text>วันที่เริ่มลา</Text>
          </View>
          <View style={styles.tableColHeaderA}>
            <Text>วันสุดท้ายที่ลา</Text>
          </View>
          <View style={styles.tableColHeaderA}>
            <Text>หมายเหตุ</Text>
          </View>
        </View>
        {React.Children.toArray(
          data.leaves.map((item, i) => {
            return (
              <View style={styles.tableRow} key={i}>
                <View style={styles.tableCol}>
                  <Text>{LeaveType[item.leave_type]}</Text>
                </View>
                <View style={styles.tableColA}>
                  <Text>{item.leave_quantity}</Text>
                </View>
                <View style={styles.tableColB}>
                  <Text>{DateTH(item.leave_startdate)}</Text>
                </View>
                <View style={styles.tableColC}>
                  <Text>{DateTH(item.leave_enddate)}</Text>
                </View>
                <View style={styles.tableColC}>
                  <Text>{item.leave_note}</Text>
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
        <Text style={styles.tableA}>
          ประวัติการลาประจำปี {new Date(report.createdate).getFullYear() + 543}
        </Text>

        <View style={styles.table}>{createTableHeader()}</View>
      </Page>
    </Document>
  );
}
export default PdfLeaveByUser;
