import React, { useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import agent, { BaseURL } from "../../app/api/agent";

function PdfUserCivilServant() {
  const createTableHeader = () => {
    const [data, setData] = useState();
    useEffect(() => {
      getUser();
    }, []);

    const getUser = async (search = "พนักงานข้าราชการ") => {
      var result = await agent.User.getUsers(search);
      setData(result);
    };
    if (!data) return null;
    return (
      <>
        <View style={styles.tableRow} fixed>
          <View style={styles.tableColHeader}>
            <Text>คำหน้าชื่ออ</Text>
          </View>
          <View style={styles.tableColHeaderA}>
            <Text>ชื่อ</Text>
          </View>
          <View style={styles.tableColHeaderA}>
            <Text>นามสกุล</Text>
          </View>
          <View style={styles.tableColHeaderA}>
            <Text>ประเภทบุคลากร</Text>
          </View>
        </View>
        {React.Children.toArray(
          data.map((item, i) => {
            return (
              <>
                <View style={styles.tableRow} key={i}>
                  <View style={styles.tableCol}>
                    <Text>{item.titlename}</Text>
                  </View>
                  <View style={styles.tableColA}>
                    <Text>{item.user_name}</Text>
                  </View>
                  <View style={styles.tableColB}>
                    <Text>{item.user_lastname}</Text>
                  </View>
                  <View style={styles.tableColC}>
                    <Text>{item.statusUname}</Text>
                  </View>
                </View>
              </>
            );
          })
        )}
      </>
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
    <>
      <Document>
        <Page style={styles.pageStyle} size="A4" orientation="portrait">
          <Text style={styles.tableA}>ข้อมูลบุคลากรทั้งหมด</Text>
          <View style={styles.table}>{createTableHeader()}</View>
        </Page>
      </Document>
    </>
  );
}

export default PdfUserCivilServant;
