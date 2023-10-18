import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { LeaveType } from "../../constants/LeaveType";

function PdfLeaveStatisticByUser({ data, leave }) {
  const createTableHeader = () => {
    return (
      <View>
        <View style={styles.tableRow} fixed>
          <View style={styles.tableColHeader}>
            <Text>ประเภทวันลา</Text>
          </View>
          <View style={styles.tableColHeaderA}>
            <Text>ลาเเล้ว</Text>
          </View>
          <View style={styles.tableColHeaderA}>
            <Text>คงเหลือ</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text>ประเภทวันลา</Text>
          </View>
          <View style={styles.tableColHeaderA}>
            <Text>ลาเเล้ว</Text>
          </View>
          <View style={styles.tableColHeaderA}>
            <Text>คงเหลือ</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text>ลาพักผ่อน</Text>
          </View>
          <View style={styles.tableColA}>
            <Text>{leave.leaveCount}</Text>
          </View>
          <View style={styles.tableColA}>
            <Text>{data.reportL_leave - leave.leaveCount}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>ลาป่วย</Text>
          </View>
          <View style={styles.tableColA}>
            <Text>{leave.leavesickCount}</Text>
          </View>
          <View style={styles.tableColA}>
            <Text>{data.reportL_leavesick - leave.leavesickCount}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text>ลากิจ</Text>
          </View>
          <View style={styles.tableColA}>
            <Text>{leave.leavepersonalCount}</Text>
          </View>
          <View style={styles.tableColA}>
            <Text>{data.reportL_leavepersonal - leave.leavepersonalCount}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>ลาคลอด</Text>
          </View>
          <View style={styles.tableColA}>
            <Text>{leave.leavematerntityCount}</Text>
          </View>
          <View style={styles.tableColA}>
            <Text>
              {data.reportL_leavematerntity - leave.leavematerntityCount}
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text>ลาไปช่วยภริยาที่คลอดบุตร</Text>
          </View>
          <View style={styles.tableColA}>
            <Text>{leave.leaveTHHWWGBCount}</Text>
          </View>
          <View style={styles.tableColA}>
            <Text>{data.reportL_leaveTHHWWGB - leave.leaveTHHWWGBCount}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>ลาอุปสมบท</Text>
          </View>
          <View style={styles.tableColA}>
            <Text>{leave.leaveordinationCount}</Text>
          </View>
          <View style={styles.tableColA}>
            <Text>
              {data.reportL_leaveordination - leave.leaveordinationCount}
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text>ลาไปถือศีลเเละปฎิบัติธรรม</Text>
          </View>
          <View style={styles.tableColA}>
            <Text>{leave.leaveforfastingCount}</Text>
          </View>
          <View style={styles.tableColA}>
            <Text>
              {data.reportL_leaveforfasting - leave.leaveforfastingCount}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const createTableHeader1 = () => {
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
          <View style={styles.tableColHeader}>
            <Text>จำนวนวันน</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text>วันที่เริ่มลา</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text>วันสุดท้ายที่ลา</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text>หมายเหตุ</Text>
          </View>
        </View>
        {React.Children.toArray(
          leave.leaves.map((item, i) => {
            return (
              <View style={styles.tableRow} key={i}>
                <View style={styles.tableCol}>
                  <Text>{LeaveType[item.leave_type]}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{item.leave_quantity}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{DateTH(item.leave_startdate)}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{DateTH(item.leave_enddate)}</Text>
                </View>
                <View style={styles.tableCol}>
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
      width: "30%",
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
      width: "10%",
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
      width: "30%",
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
      width: "10%",
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
        <Text style={styles.tableA}>ข้อมูลสถิติวันลา</Text>
        <View style={styles.table}>{createTableHeader()}</View>
        <Text style={styles.tableA}>
          ประวัติการลาประจำปี {new Date(data.createdate).getFullYear() + 543}
        </Text>
        <View style={styles.table}>{createTableHeader1()}</View>
      </Page>
    </Document>
  );
}
export default PdfLeaveStatisticByUser;
