import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import Header1 from '../uneti_online/header1';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { token } from '../uneti_online/DangNhap';
import { maSinhVien } from '../uneti_online/DangNhap';
import { DataTable } from 'react-native-paper';
import CheckBox from 'react-native-check-box';
import moment from 'moment';
import ModalThongBao from '../uneti_online/Modal_ThongBao';



const PhucKhao = ({ navigation }: any) => {
  const [tenDot, setTenDot] = useState([]);
  const [valueDotThi, setValueDotThi] = useState('');
  const [isFocusDotThi, setIsFocusDotThi] = useState(false);
  const [dotThi, setDotThi] = useState('');

  const [loaiThi, setLoaiThi] = useState('');
  const [valueLoaiThi, setValueLoaiThi] = useState('');
  const [isFocusLoaiThi, setIsFocusLoaiThi] = useState(false);

  const [kiemTraChonMonHoc, setKiemTraChonMonHoc] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const handleModalPress = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleModalPress1 = () => {
    setShowModal1(true);
  };

  const handleCloseModal1 = () => {
    setShowModal1(false);
  };

  const handleModalPress2 = () => {
    setShowModal2(true);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
  };

  const handleModalPress3 = () => {
    setShowModal3(true);
  };

  const handleCloseModal3 = () => {
    setShowModal3(false);
  };

  const handleModalPress4 = () => {
    setShowModal4(true);
  };

  const handleCloseModal4 = () => {
    setShowModal4(false);
  };

  const xuLiPost = () => {
    PostYeuCau();
  };

  //get tên đợt
  const getapi = 'https://apiv2.uneti.edu.vn/api/SP_EDU/Load_TenDot';
  const fetchData = async () => {
    try {
      const response = await axios.get(getapi, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const arraytendot = response.data.body.map((td: any) => td.TenDot);
      setTenDot(arraytendot);
    } catch (error) {
      console.error(error);
    }
  };
  const dataLoaiThi = [
    { labelLoaiThi: 'Thi lần 1', valueLoaiThi: '2' },
    { labelLoaiThi: 'Thi lại', valueLoaiThi: '1' },
  ];
  //type
  type MC_KT_PhucKhao = {
    id: number;
    tenCoSo: string;
    tenDot: string;
    idSinhVien: string;
    maSinhVien: string;
    hoDem: string;
    ten: string;
    gioiTinh: boolean;
    ngaySinh2: string;
    tenHeDaoTao: string;
    tenLoaiHinhDT: string;
    tenKhoaHoc: string;
    tenNganh: string;
    tenNghe: string;
    tenLop: string;
    maLopHocPhan: string;
    tenMonHoc: string;
    khoaChuQuanMon: string;
    tenHinhThucThi: string;
    ngayThi: string;
    thu: string;
    nhom: string;
    tuTiet: string;
    denTiet: string;
    loaiThi: string;
    tenPhong: string;
    sbd: string;
    diemThi: string;
    diemThi1: string;
    diemThi2: string;
    diemTongKet: string;
    diemTongKet1: string;
    diemTongKet2: string;
    tuiBaiThi: string;
    soPhach: string;
  };

  const [tableData, setTableData] = useState<MC_KT_PhucKhao[]>([]);
  //
  const getAPI = `https://apiv2.uneti.edu.vn/api/SP_MC_KT_PhucKhao_TiepNhan/EDU_Load_R_Para_MaSinhVien_KetQuaHT?MaSinhVien=${maSinhVien}&MC_KT_PhucKhao_TenDot=${dotThi}&MC_KT_PhucKhao_LoaiThi=${valueLoaiThi}`;
  const getDataTable = async () => {
    try {
      const response = await axios.get(getAPI, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // const newTableData : MC_KT_PhucKhao[] = response.data.body.map((mh: any, index:number) => [
      //   id: index + 1,
      //   mh.MaLopHocPhan,
      //   mh.TenMonHoc,
      //   mh.TenHinhThucThi,
      //   new Date(mh.NgayThi).toLocaleDateString('vi-VN'),
      //   mh.DiemThi,
      //   mh.DiemTongKet1,
      // ]);
      const newTableData: MC_KT_PhucKhao[] = response.data.body.map((mh: any, index: number) => ({
        id: index + 1,
        tenCoSo: mh.TenCoSo ?? 'null'.toString(),
        tenDot: mh.TenDot ?? 'null'.toString(),
        idSinhVien: mh.IDSinhVien ?? 'null'.toString(),
        maSinhVien: mh.MaSinhVien ?? 'null'.toString(),
        hoDem: mh.HoDem ?? 'null'.toString(),
        ten: mh.Ten ?? 'null'.toString(),
        gioiTinh: mh.GioiTinh ?? 'null',
        ngaySinh2: mh.NgaySinh2 ?? 'null'.toString(),
        tenHeDaoTao: mh.TenHeDaoTao ?? 'null'.toString(),
        tenLoaiHinhDT: mh.TenLoaiHinhDT ?? 'null'.toString(),
        tenKhoaHoc: mh.TenKhoaHoc ?? 'null'.toString(),
        tenNganh: mh.TenNganh ?? 'null'.toString(),
        tenNghe: mh.TenNghe ?? 'null'.toString(),
        tenLop: mh.TenLop ?? 'null'.toString(),
        maLopHocPhan: mh.MaLopHocPhan ?? 'null'.toString(),
        tenMonHoc: mh.TenMonHoc ?? 'null'.toString(),
        khoaChuQuanMon: mh.KhoaChuQuanMon ?? 'null'.toString(),
        tenHinhThucThi: mh.TenHinhThucThi ?? 'null'.toString(),
        ngayThi: new Date(mh.NgayThi).toLocaleDateString('vi-VN'),
        thu: mh.Thu ?? 'null'.toString(),
        nhom: mh.Nhom ?? 'null'.toString(),
        tuTiet: mh.TuTiet ?? 'null'.toString(),
        denTiet: mh.DenTiet ?? 'null'.toString(),
        loaiThi: mh.LoaiThi ?? 'null'.toString(),
        tenPhong: mh.TenPhong ?? 'null'.toString(),
        sbd: mh.SBD ?? 'null'.toString(),
        diemThi: mh.DiemThi ?? ''.toString(),
        diemThi1: mh.DiemThi1 ?? ''.toString(),
        diemThi2: mh.DiemThi2 ?? ''.toString(),
        diemTongKet: mh.DiemTongKet ?? ''.toString(),
        diemTongKet1: mh.DiemTongKet1 ?? ''.toString(),
        diemTongKet2: mh.DiemTongKet2 ?? ''.toString(),
        tuiBaiThi: mh.TuiBaiThi ?? 'null'.toString(),
        soPhach: mh.SoPhach ?? 'null'.toString(),
      }));

      setTableData(newTableData); ""
    } catch (error) {
      console.error(error);
    }
  };

  //Xử lí check box
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  // Khởi tạo mảng môn học với kiểu dữ liệu đã định nghĩa
  // Xử lý khi checkbox được chọn hoặc bỏ chọn
  const handleCheckboxToggle = (id: number) => {
    const newCheckedItems = [...checkedItems];
    const index = newCheckedItems.indexOf(id);

    // Nếu checkbox được chọn đã tồn tại trong mảng, loại bỏ nó
    if (index == -1) {
      newCheckedItems.push(id);
    }
    else {
      newCheckedItems.splice(index, 1);
    }
    // Cập nhật mảng checkedItems với chỉ một checkbox được chọn
    setCheckedItems(newCheckedItems);
    // newCheckedItems.forEach(id => {
    //   const indexRow = tableData.findIndex(item => item.id === id);
    //   if (indexRow !== -1) {
    //     setSelectedIndex(indexRow)
    //   }
    // });
    // Cập nhật kiểm tra chọn môn học
    setKiemTraChonMonHoc(newCheckedItems.length > 0);
  };

  var apiPhucKhao =
    'https://apiv2.uneti.edu.vn/api/SP_MC_KT_PhucKhao_TiepNhan/Add_Para';
  const PostYeuCau = async () => {
    var postdataList: any[] = [];
    tableData.forEach(selectedRow => {
      if (checkedItems.includes(selectedRow.id)) {
        var postdata = {
          MC_KT_PhucKhao_TenDot: dotThi ? dotThi : 'null', //*
          MC_KT_PhucKhao_LoaiThi: loaiThi ? loaiThi : 'null', //*
          MC_KT_PhucKhao_TenCoSo: selectedRow.tenCoSo, //*
          MC_KT_PhucKhao_MaSinhVien: selectedRow.maSinhVien, //*
          MC_KT_PhucKhao_HoDem: selectedRow.hoDem, //*
          MC_KT_PhucKhao_Ten: selectedRow.ten, //*
          MC_KT_PhucKhao_GioiTinh: selectedRow.gioiTinh, //*
          MC_KT_PhucKhao_TenHeDaoTao: selectedRow.tenHeDaoTao, //*
          MC_KT_PhucKhao_TenLoaiHinhDT: selectedRow.tenLoaiHinhDT, //*
          MC_KT_PhucKhao_TenKhoaHoc: selectedRow.tenKhoaHoc, //*
          MC_KT_PhucKhao_TenNganh: selectedRow.tenNganh, //*
          MC_KT_PhucKhao_TenNghe: selectedRow.tenNghe, //*
          MC_KT_PhucKhao_TenLop: selectedRow.tenLop, //*
          MC_KT_PhucKhao_DienThoai: '0984476305', //*
          MC_KT_PhucKhao_Email: 'quanganhsnake2001@gmail.com', //*
          MC_KT_PhucKhao_IDSinhVien: selectedRow.idSinhVien.toString(), //*
          MC_KT_PhucKhao_NgaySinh2: moment.utc(selectedRow.ngaySinh2, 'DD/MM/YYYY').toISOString(), //*
          MC_KT_PhucKhao_MaLopHocPhan: selectedRow.maLopHocPhan, //*
          MC_KT_PhucKhao_TenMonHoc: selectedRow.tenMonHoc, //*
          MC_KT_PhucKhao_KhoaChuQuanMon: selectedRow.khoaChuQuanMon, //*
          MC_KT_PhucKhao_TenHinhThucThi: selectedRow.tenHinhThucThi, //*
          MC_KT_PhucKhao_NgayThi: moment.utc(selectedRow.ngayThi, 'DD/MM/YYYY').toISOString(), //*
          MC_KT_PhucKhao_Thu: selectedRow.thu.toString(), //*
          MC_KT_PhucKhao_Nhom: selectedRow.nhom.toString(), //*
          MC_KT_PhucKhao_TuTiet: selectedRow.tuTiet.toString(), //*
          MC_KT_PhucKhao_DenTiet: selectedRow.denTiet.toString(), //*
          MC_KT_PhucKhao_TenPhong: selectedRow.tenPhong, //*
          MC_KT_PhucKhao_SBD: selectedRow.sbd.toString(), //*
          MC_KT_PhucKhao_DiemThi: selectedRow.diemThi.toString() == '' ? 'null' : selectedRow.diemThi.toString(), //*
          MC_KT_PhucKhao_DiemThi1: selectedRow.diemThi1.toString() == '' ? 'null' : selectedRow.diemThi1.toString(), //*
          MC_KT_PhucKhao_DiemThi2: selectedRow.diemThi2.toString() == '' ? 'null' : selectedRow.diemThi2.toString(), //*
          MC_KT_PhucKhao_DiemTongKet: selectedRow.diemTongKet.toString() == '' ? 'null' : selectedRow.diemTongKet.toString(), //*
          MC_KT_PhucKhao_DiemTongKet1: selectedRow.diemTongKet1.toString() == '' ? 'null' : selectedRow.diemTongKet1.toString(), //*
          MC_KT_PhucKhao_DiemTongKet2: selectedRow.diemTongKet2.toString() == '' ? 'null' : selectedRow.diemTongKet2.toString(), //*
          MC_KT_PhucKhao_TuiBaiThi: selectedRow.tuiBaiThi.toString(), //*
          MC_KT_PhucKhao_SoPhach: selectedRow.soPhach.toString(), //*
        };
        postdataList.push(postdata);
      }
    })

    console.log(postdataList)
    try {
      const response = await axios.post(apiPhucKhao, postdataList, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.data.message === 'Bản ghi bị trùng.') {
        handleModalPress3();
      } else {
        handleModalPress4();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ClearDataTable = () => {
    setTableData([]);
    setValueDotThi('-1');
    setValueLoaiThi('-1');
  };

  //Call api
  useEffect(() => {
    fetchData();
    if (
      dotThi !== '' &&
      loaiThi !== '' &&
      valueDotThi !== '-1' &&
      valueLoaiThi !== '-1'
    ) {
      getDataTable();
    }
  }, [valueDotThi, valueLoaiThi]);

  return (
    <SafeAreaView style={styles.container}>
      <Header1
        title="Phúc khảo"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <ModalThongBao
        visible={showModal}
        onClose={handleCloseModal}
        message="Không có dữ liệu!"
      />

      <ModalThongBao
        visible={showModal1}
        onClose={handleCloseModal1}
        message="Không có dữ liệu môn học để gửi yêu cầu!"
      />

      <ModalThongBao
        visible={showModal2}
        onClose={handleCloseModal2}
        message="Mời chọn môn học trước khi gửi yêu cầu!"
      />

      <ModalThongBao
        visible={showModal3}
        onClose={handleCloseModal3}
        message="Môn học này đã được phúc khảo! Vui lòng kiểm tra lại!"
      />

      <ModalThongBao
        visible={showModal4}
        onClose={handleCloseModal4}
        message="Gửi phúc khảo thành công!"
      />

      <View style={styles.viewBody}>
        <ScrollView>
          <View style={styles.viewText}>
            <View style={styles.viewTextChild}>
              <Text style={styles.textTieuDe}>
                1.Lưu ý
              </Text>
              <Text style={styles.styleText}>
                - Người họ thực hiện phúc khảo kết quả bài thi theo kế hoạch tổ
                chức thi (Ngày nộp đơn phúc khảo) trong từng học kỳ.
              </Text>

              <Text style={styles.styleText}>
                - Lệ phí phúc khảo kết quả học tập: Có mức thu theo quy định,
                được chuyển trực tiếp vào công nợ, người học nộp cùng học phí kì
                kế tiếp.
              </Text>

              <Text
                style={styles.textTieuDe}>
                1.Nội dung đề nghị
              </Text>

              <View style={styles.viewNoiDungDeNghi}>
                <Text style={styles.styleText}>Tên đợt: (*)</Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocusDotThi && { borderColor: 'black' },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={tenDot.map((item, index) => ({
                    labelDotThi: item,
                    valueDotThi: index.toString(),
                  }))}
                  maxHeight={300}
                  labelField="labelDotThi"
                  valueField="valueDotThi"
                  placeholder={!isFocusDotThi ? 'Chọn đợt thi' : '...'}
                  value={valueDotThi}
                  onFocus={() => setIsFocusDotThi(true)}
                  onBlur={() => setIsFocusDotThi(false)}
                  onChange={item => {
                    setValueDotThi(item.valueDotThi);
                    setDotThi(item.labelDotThi);
                    setIsFocusDotThi(false);
                  }}
                />
              </View>

              <View style={styles.viewNoiDungDeNghi}>
                <Text style={styles.styleText}>Loại thi:  (*)</Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocusLoaiThi && { borderColor: 'black' },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={dataLoaiThi}
                  maxHeight={300}
                  labelField="labelLoaiThi"
                  valueField="valueLoaiThi"
                  placeholder={!isFocusLoaiThi ? 'Chọn loại thi' : '...'}
                  value={valueLoaiThi}
                  onFocus={() => setIsFocusLoaiThi(true)}
                  onBlur={() => setIsFocusLoaiThi(false)}
                  onChange={item => {
                    setValueLoaiThi(item.valueLoaiThi);
                    setLoaiThi(item.labelLoaiThi);
                    setIsFocusLoaiThi(false);
                  }}
                />
              </View>

              <ScrollView>
                <View style={styles.viewTable}>
                  <ScrollView horizontal>
                    <DataTable style={{ width: 1150 }}>
                      <DataTable.Header>
                        <DataTable.Title
                          style={{
                            flex: 0.3,
                            backgroundColor: '#2e6b8b',
                            justifyContent: 'center',
                          }}>
                          <Text style={styles.textDataTitle}>
                            Chọn
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title
                          style={{
                            flex: 0.5,
                            backgroundColor: '#2e6b8b',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={styles.textDataTitle}>
                            Mã lớp học phần
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title
                          style={{
                            flex: 0.65,
                            backgroundColor: '#2e6b8b',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={styles.textDataTitle}>
                            Tên học phần
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title
                          style={{
                            flex: 0.5,
                            backgroundColor: '#2e6b8b',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={styles.textDataTitle}>
                            Hình thức thi
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title
                          style={{
                            flex: 0.4,
                            backgroundColor: '#2e6b8b',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={styles.textDataTitle}>
                            Ngày thi
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title
                          style={{
                            flex: 0.3,
                            backgroundColor: '#2e6b8b',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={styles.textDataTitle}>
                            Điểm thi
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title
                          style={{
                            flex: 0.4,
                            backgroundColor: '#2e6b8b',
                            justifyContent: 'center',
                            marginLeft: 10,
                          }}>
                          <Text style={styles.textDataTitle}>
                            Điểm tổng kết
                          </Text>
                        </DataTable.Title>
                      </DataTable.Header>

                      {tableData.map(item => (
                        <DataTable.Row key={item.id}>
                          <DataTable.Cell
                            style={{
                              flex: 0.3,
                              justifyContent: 'center',
                              backgroundColor: '#f7f9ff',
                            }}>
                            <CheckBox
                              isChecked={checkedItems.includes(item.id)}
                              onClick={() => handleCheckboxToggle(item.id)}
                              checkBoxColor="#2e6b8b"
                            />
                          </DataTable.Cell>
                          <DataTable.Cell
                            style={{
                              flex: 0.5,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#f7f9ff',
                              marginLeft: 10,
                            }}>
                            <Text style={styles.textDataCell}>
                              {item.maLopHocPhan}
                            </Text>
                          </DataTable.Cell>
                          <DataTable.Cell
                            style={{
                              flex: 0.65,
                              backgroundColor: '#f7f9ff',
                              marginLeft: 10,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: 'black',
                                marginLeft: 10,
                              }}>
                              {item.tenMonHoc}
                            </Text>
                          </DataTable.Cell>
                          <DataTable.Cell
                            style={{
                              flex: 0.5,
                              backgroundColor: '#f7f9ff',
                              marginLeft: 10,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: 'black',
                                marginLeft: 10,
                              }}>
                              {item.tenHinhThucThi}
                            </Text>
                          </DataTable.Cell>
                          <DataTable.Cell
                            style={{
                              flex: 0.4,
                              justifyContent: 'center',
                              backgroundColor: '#f7f9ff',
                              marginLeft: 10,
                            }}>
                            <Text style={styles.textDataCell}>
                              {item.ngayThi}
                            </Text>
                          </DataTable.Cell>
                          <DataTable.Title
                            style={{
                              flex: 0.3,
                              justifyContent: 'center',
                              backgroundColor: '#f7f9ff',
                              marginLeft: 10,
                            }}>
                            <Text style={styles.textDataCell}>
                              {item.diemThi}
                            </Text>
                          </DataTable.Title>

                          <DataTable.Title
                            style={{
                              flex: 0.4,
                              justifyContent: 'center',
                              backgroundColor: '#f7f9ff',
                              marginLeft: 10,
                            }}>
                            <Text style={styles.textDataCell}>
                              {item.diemTongKet}
                            </Text>
                          </DataTable.Title>
                        </DataTable.Row>
                      ))}
                    </DataTable>
                  </ScrollView>
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>

        <View style={styles.viewButton}>
          <View style={styles.buttonHuy}>
            <TouchableOpacity
              style={styles.touchableOpacityButton}
              onPress={() => {
                if (tableData.length != 0) {
                  ClearDataTable();
                } else {
                  handleModalPress();
                }
              }}>
              <Text style={{ color: 'black', fontSize: 19 }}>Hủy</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonLuu}>
            <TouchableOpacity
              onPress={() => {
                if (tableData.length == 0) {
                  handleModalPress1();
                } else {
                  if (!kiemTraChonMonHoc) {
                    handleModalPress2();
                  } else {
                    Alert.alert(
                      'Xác nhận',
                      `Bạn có chắc chắn muốn phúc khảo các môn học đã chọn?`,
                      [
                        {
                          text: 'Không',
                          style: 'cancel',
                        },
                        {
                          text: 'Có',
                          onPress: PostYeuCau,
                        },
                      ],
                      { cancelable: false },
                    );
                  }
                }
              }}
              style={styles.touchableOpacityButton}>
              <Text style={{ color: '#ffffff', fontSize: 19 }}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={styles.viewFooter}>
        <View
          style={styles.viewIcon}>
          <TouchableOpacity
            style={styles.touchableOpacityIcon}
            onPress={() => {
              navigation.navigate('TheoDoiDeNghi');
            }}>
            <Image
              resizeMode="stretch"
              source={require('../uneti_online/images/notification.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableOpacityIcon}
            onPress={() => {
              navigation.navigate('HomeMain');
            }}>
            <Image
              resizeMode="stretch"
              source={require('../uneti_online/images/home.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableOpacityIcon}
            onPress={() => {
              navigation.navigate('Thongtinsinhvien');
            }}>
            <Image
              resizeMode="stretch"
              source={require('../uneti_online/images/person.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PhucKhao;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  textTieuDe: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },

  viewBody: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  styleText: {
    color: 'black',
    fontSize: 20,
    marginTop: 10,
    lineHeight: 36,
    textAlign: 'justify',
  },

  viewText: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  viewTextChild: {
    width: '93%',
    height: '100%',
    marginTop: 15,
  },

  viewNoiDungDeNghi: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
  },

  dropdown: {
    flex: 1,
    marginLeft: 16,
    marginTop: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.8,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },

  viewTable: {
    marginTop: 20,
    marginBottom: 20,
  },
  textDataTitle: {
    fontSize: 16,
    color: 'white'
  },
  textDataCell: {
    fontSize: 16,
    color: 'black'
  },
  viewButton: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f7f9ff',
  },

  buttonHuy: {
    width: '35%',
    height: 40,
    marginLeft: 30,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },

  buttonLuu: {
    width: '35%',
    height: 40,
    marginRight: 30,
    borderRadius: 40,
    backgroundColor: '#245d7c',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  touchableOpacityButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  viewFooter: {
    height: '8%',
    backgroundColor: '#f7f9ff',
    width: '100%',
  },
  viewIcon: {
    height: '100%',
    borderBlockColor: 'gray',
    backgroundColor: 'white',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 8,
  },
  touchableOpacityIcon: {
    width: '30%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 33,
    height: 33
  }
});
