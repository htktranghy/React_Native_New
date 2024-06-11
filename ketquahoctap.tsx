import React, { Component, useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  TextInput,
  ImageBackground,
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


const KetQuaHocTap = ({ navigation }: any) => {
  const dataDeNghi = [
    { labelDeNghi: 'Xem kết quả học tập', valueDeNghi: '0' },
    { labelDeNghi: 'Điều chỉnh, bổ sung: Điểm thường kỳ', valueDeNghi: '1' },
    { labelDeNghi: 'Điều chỉnh, bổ sung: Điểm thi', valueDeNghi: '2' },
  ];

  const dataDeNghiDiemThuongKy = [
    {
      labelDeNghiDTK: 'Có đi học nhưng không có điểm thường kỳ',
      valueDeNghiDTK: '0',
    },
    {
      labelDeNghiDTK:
        'Tự nhận thấy điểm thường kỳ chưa phản ánh đúng năng lực học tập. Đề nghị kiểm tra lại điểm thường kỳ.',
      valueDeNghiDTK: '1',
    },
    {
      labelDeNghiDTK: 'Điểm thường kỳ thay đổi so với trước đây xem',
      valueDeNghiDTK: '2',
    },
  ];

  const dataDeNghiDiemThi = [
    {
      labelDeNghiDT: 'Bị mất điểm thi trên trang cá nhân',
      valueDeNghiDT: '0'
    },
    {
      labelDeNghiDT: 'Điểm thi thay đổi so với điểm trước đây đã xem',
      valueDeNghiDT: '1',
    },
  ];

  const [tenDot, setTenDot] = useState<string[]>([]);

  const [deNghi, setDeNghi] = useState('-1');
  const [valueDeNghi, setValueDeNghi] = useState('');
  const [isFocusDeNghi, setIsFocusDeNghi] = useState(false);

  const [deNghiDTK, setDeNghiDTK] = useState('');
  const [valueDeNghiDTK, setValueDeNghiDTK] = useState('');
  const [isFocusDeNghiDTK, setIsFocusDeNghiDTK] = useState(false);


  const [deNghiDT, setDeNghiDT] = useState('');
  const [valueDeNghiDT, setValueDeNghiDT] = useState('');
  const [isFocusDeNghiDT, setIsFocusDeNghiDT] = useState(false);

  const [onClickText, setOnClickText] = useState(false);

  const [selectedHocKy, setSelectedHocKy] = useState('');

  const [monHocTheoKy, setMonHocTheoKy] = useState<MC_KT_KetQuaHT[]>([]);

  const [diemThuongKy, setDiemThuongKy] = useState('');
  const [diemThi, setDiemThi] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);

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

  const handleModalPress5 = () => {
    setShowModal5(true);
  };

  const handleCloseModal5 = () => {
    setShowModal5(false);
  };

  const handleModalPress6 = () => {
    setShowModal6(true);
  };

  const handleCloseModal6 = () => {
    setShowModal6(false);
  };
  type MC_KT_KetQuaHT = {
    id: number,
    namHoc: string,
    tenCoSo: string,
    tenDot: string,
    idSinhVien: string,
    maSinhVien: string,
    hoDem: string,
    ten: string,
    gioiTinh: string,
    ngaySinh2: string,
    tenHeDaoTao: string,
    tenLoaiHinhDT: string,
    tenKhoaHoc: string,
    tenNganh: string,
    tenLop: string,
    email: string,
    soDienThoai: string,
    idLopHocPhan: string,
    maMonHoc: string,
    tenMonHoc: string,
    khoaChuQuanMon: string,
    diemThuongKy1: string,
    diemThi: string,
    diemThi1: string,
    diemThi2: string,
    diemTongKet: string,
    diemTongKet1: string,
    diemTongKet2: string,
    diemTinChi: string,
    diemChu: string,
    isDat: string,
    MC_KT_KetQuaHT_YeuCau_DiemThuongKy_SVYeuCau: string,
    MC_KT_KetQuaHT_YeuCau_DiemThuongKy_SVYeuCauLyDo: string,
    MC_KT_KetQuaHT_YeuCau_DiemThi_SVYeuCau: string,
    MC_KT_KetQuaHT_YeuCau_DiemThi_SVYeuCauLyDo: string,
  };

  //Lấy tên đợt
  var apiKetQuaHocTap = `https://apiv2.uneti.edu.vn/api/SP_MC_KT_KetQuaHT_TiepNhan/EDU_Load_Para_MaSinhVien_KetQuaHT?MaSinhVien=${maSinhVien}`;

  const fetchDataKetQuaHocTap = async () => {

    try {
      const response = await axios.get(apiKetQuaHocTap, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const dataTenDot: string[] = response.data.body.map(
        (dt: { TenDot: string }) => dt.TenDot,
      );

      const dataTableXemKetQuaHocTap: MC_KT_KetQuaHT[] = response.data.body.map((mh: any, index: number) => ({
        id: index + 1,
        namHoc: mh.NamHoc ?? 'null'.toString(),
        tenCoSo: mh.TenCoSo ?? 'null'.toString(),
        tenDot: mh.TenDot ?? 'null'.toString(),
        idSinhVien: mh.IDSinhVien ?? 'null'.toString(),
        maSinhVien: mh.MaSinhVien ?? 'null'.toString(),
        hoDem: mh.HoDem ?? 'null'.toString(),
        ten: mh.Ten ?? 'null',
        gioiTinh: mh.GioiTinh ?? 'null',
        ngaySinh2: mh.NgaySinh2 ?? 'null'.toString(),
        tenHeDaoTao: mh.TenHeDaoTao ?? 'null'.toString(),
        tenLoaiHinhDT: mh.TenLoaiHinhDT ?? 'null'.toString(),
        tenKhoaHoc: mh.TenKhoaHoc ?? 'null'.toString(),
        tenNganh: mh.TenNganh ?? 'null'.toString(),
        tenLop: mh.TenLop ?? 'null'.toString(),
        email: mh.Email ?? 'null'.toString(),
        soDienThoai: mh.SoDienThoai ?? 'null'.toString(),
        idLopHocPhan: mh.IDLopHocPhan ?? 'null'.toString(),
        maMonHoc: mh.MaMonHoc ?? 'null'.toString(),
        tenMonHoc: mh.TenMonHoc ?? 'null'.toString(),
        khoaChuQuanMon: mh.KhoaChuQuanMon ?? 'null'.toString(),
        diemThuongKy1: mh.DiemThuongKy1 ?? ''.toString(),
        diemThi: mh.DiemThi ?? ''.toString(),
        diemThi1: mh.DiemThi1 ?? ''.toString(),
        diemThi2: mh.DiemThi2 ?? ''.toString(),
        diemTongKet: mh.DiemTongKet ?? ''.toString(),
        diemTongKet1: mh.DiemTongKet1 ?? ''.toString(),
        diemTongKet2: mh.DiemTongKet2 ?? ''.toString(),
        diemTinChi: mh.DiemTinChi ?? ''.toString(),
        diemChu: mh.DiemChu ?? ''.toString(),
        isDat: mh.IsDat ?? ' '.toString(),
        MC_KT_KetQuaHT_YeuCau_DiemThuongKy_SVYeuCau: mh.MC_KT_KetQuaHT_YeuCau_DiemThuongKy_SVYeuCau ?? 'null'.toString(),
        MC_KT_KetQuaHT_YeuCau_DiemThuongKy_SVYeuCauLyDo: mh.MC_KT_KetQuaHT_YeuCau_DiemThuongKy_SVYeuCauLyDo ?? 'null'.toString(),
        MC_KT_KetQuaHT_YeuCau_DiemThi_SVYeuCau: mh.MC_KT_KetQuaHT_YeuCau_DiemThi_SVYeuCau ?? 'null'.toString(),
        MC_KT_KetQuaHT_YeuCau_DiemThi_SVYeuCauLyDo: mh.MC_KT_KetQuaHT_YeuCau_DiemThi_SVYeuCauLyDo ?? 'null'.toString(),
      }));




      const filteredByHocKy = dataTableXemKetQuaHocTap.filter(
        item => item.tenDot === selectedHocKy,
      );

      setMonHocTheoKy(filteredByHocKy);

      // Loại bỏ các phần tử trùng nhau
      const uniqueData = [...new Set(dataTenDot)];

      setTenDot(uniqueData.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const [kiemTraChonMonHoc, setKiemTraChonMonHoc] = useState(false);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleCheckboxToggle = (rowIndex: number) => {
    const newCheckedItems = [...checkedItems];
    const index = newCheckedItems.indexOf(rowIndex);

    //Check box đã tồn tại
    if (index !== -1) {
      newCheckedItems.splice(index, 1);

    }
    else {
      console.log(rowIndex)
      newCheckedItems.push(rowIndex);
    }
    setCheckedItems(newCheckedItems);
    setKiemTraChonMonHoc(newCheckedItems.length > 0);
  };

  //Hủy
  const ClearData = () => {
    setMonHocTheoKy([]);
    setValueDeNghi('-1');
    setValueDeNghiDTK('-1');
    setValueDeNghiDT('-1');
    setDiemThi('');
    setDiemThuongKy('');
  };

  //post dữ liệu
  var apiTiepNhan =
    'https://apiv2.uneti.edu.vn/api/SP_MC_KT_KetQuaHT_TiepNhan/Add_Para';
  const PostYeuCau = async () => {
    var postdataList: any[] = [];
    monHocTheoKy.forEach(selectedRow => {
      if (checkedItems.includes(selectedRow.id)) {
        console.log(selectedRow)
        var postdata = {
          MC_KT_KetQuaHT_YeuCau: valueDeNghi.toString() ? valueDeNghi.toString() : null,
          MC_KT_KetQuaHT_YeuCau_DiemThuongKy_SVYeuCauLyDo: valueDeNghi.toString() == '1' ? String(deNghiDTK) : ' ',
          MC_KT_KetQuaHT_YeuCau_DiemThuongKy_SVYeuCau: valueDeNghi.toString() == '1' ? String(diemThuongKy) : ' ',
          MC_KT_KetQuaHT_TenCoSo: selectedRow.tenCoSo,
          MC_KT_KetQuaHT_TenDot: selectedRow.tenDot,
          MC_KT_KetQuaHT_MaSinhVien: selectedRow.maSinhVien,
          MC_KT_KetQuaHT_HoDem: selectedRow.hoDem,
          MC_KT_KetQuaHT_Ten: selectedRow.ten,
          MC_KT_KetQuaHT_GioiTinh: selectedRow.gioiTinh,
          MC_KT_KetQuaHT_TenHeDaoTao: selectedRow.tenHeDaoTao,
          MC_KT_KetQuaHT_TenLoaiHinhDT: selectedRow.tenLoaiHinhDT,
          MC_KT_KetQuaHT_TenKhoaHoc: selectedRow.tenKhoaHoc,
          MC_KT_KetQuaHT_TenNganh: selectedRow.tenNganh,
          MC_KT_KetQuaHT_TenLop: selectedRow.tenLop,
          MC_KT_KetQuaHT_DienThoai: '0984476305',
          MC_KT_KetQuaHT_Email: 'quanganhsnake2001@gmail.com',
          MC_KT_KetQuaHT_IDSinhVien: selectedRow.idSinhVien.toString(),
          MC_KT_KetQuaHT_NgaySinh2: moment.utc(selectedRow.ngaySinh2, 'DD/MM/YYYY').toISOString(),
          MC_KT_KetQuaHT_TenMonHoc: selectedRow.tenMonHoc,
          MC_KT_KetQuaHT_DiemThuongKy1: selectedRow.diemThuongKy1.toString() == '' ? ' ' : selectedRow.diemThuongKy1.toString(),
          MC_KT_KetQuaHT_DiemThi: selectedRow.diemThi.toString() == '' ? ' ' : selectedRow.diemThi.toString(), //*
          MC_KT_KetQuaHT_DiemThi1: selectedRow.diemThi1.toString() == '' ? ' ' : selectedRow.diemThi.toString(), //*
          MC_KT_KetQuaHT_DiemThi2: selectedRow.diemThi2.toString() == '' ? ' ' : selectedRow.diemThi.toString(), //*
          MC_KT_KetQuaHT_DiemTongKet: selectedRow.diemTongKet.toString() == '' ? ' ' : selectedRow.diemThi.toString(), //*
          MC_KT_KetQuaHT_DiemTongKet1: selectedRow.diemTongKet1.toString() == '' ? ' ' : selectedRow.diemThi.toString(), //*
          MC_KT_KetQuaHT_DiemTongKet2: selectedRow.diemTongKet2.toString() == '' ? ' ' : selectedRow.diemThi.toString(), //*
          MC_KT_KetQuaHT_DiemTinChi: selectedRow.diemTinChi.toString() == '' ? ' ' : selectedRow.diemTinChi.toString(),
          MC_KT_KetQuaHT_DiemChu: selectedRow.diemChu.toString() == '' ? ' ' : selectedRow.diemChu.toString(),
          MC_KT_KetQuaHT_IsDat: selectedRow.isDat.toString(),
          MC_KT_KetQuaHT_IDLopHocPhan: selectedRow.idLopHocPhan.toString(),
          MC_KT_KetQuaHT_MaMonHoc: selectedRow.maMonHoc.toString(),
          MC_KT_KetQuaHT_KhoaChuQuanMon: selectedRow.khoaChuQuanMon.toString(),
          MC_KT_KetQuaHT_YeuCau_XemKetQuaHT_LyDo: ' ',
          MC_KT_KetQuaHT_YeuCau_XemKetQuaHT_LyDoChiTiet: ' ',
          MC_KT_KetQuaHT_YeuCau_DiemThi_SVYeuCau: valueDeNghi.toString() == '2' ? String(diemThi) : ' ',
          MC_KT_KetQuaHT_YeuCau_DiemThi_SVYeuCauLyDo: valueDeNghi.toString() == '2' ? String(deNghiDT) : ' ',
        };
        postdataList.push(postdata);
      }
    })

    console.log(postdataList)
    try {
      const response = await axios.post(apiTiepNhan, postdataList, {
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

  useEffect(() => {
    if (deNghi !== '' && valueDeNghi !== '-1') {
      fetchDataKetQuaHocTap();
    }
  }, [selectedHocKy, valueDeNghi]);

  //return
  return (
    <SafeAreaView style={styles.container}>
      <Header1 title="Kết quả học tập" onPress={() => navigation.goBack()} />

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
        message="Môn học này đã được gửi yêu cầu! Vui lòng kiểm tra lại!"
      />

      <ModalThongBao
        visible={showModal4}
        onClose={handleCloseModal4}
        message="Gửi yêu cầu thành công!"
      />

      <ModalThongBao
        visible={showModal5}
        onClose={handleCloseModal5}
        message="Với đề nghị xem kết quả học tập tính năng này không gửi yêu cầu!"
      />

      <ModalThongBao
        visible={showModal6}
        onClose={handleCloseModal6}
        message="Vui lòng chọn đầy đủ dữ liệu!"
      />

      <View style={styles.viewBody}>
        <ScrollView>
          <View style={styles.viewText}>
            <View style={styles.viewTextChild}>
              <Text style={styles.textTieuDe}>
                1.Lưu ý
              </Text>
              <Text style={styles.styleText}>
                - Người học được thắc mắc điểm quá trình trong vòng 7 ngày kể từ
                khi điểm quá trình được công bố trên trang cá nhân và sau khi
                người đọc đã phản hồi với giảng viên giảng dạy.
              </Text>

              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                2.Nội dung đề nghị
              </Text>

              <View style={styles.viewNoiDungDeNghi}>
                <Text style={[styles.styleText, { marginTop: 15 }]}>
                  Đề nghị: (*)
                </Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocusDeNghi && { borderColor: 'black' },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={dataDeNghi}
                  maxHeight={300}
                  labelField="labelDeNghi"
                  valueField="valueDeNghi"
                  placeholder={!isFocusDeNghi ? 'Chọn đề nghị' : '...'}
                  value={valueDeNghi}
                  onFocus={() => setIsFocusDeNghi(true)}
                  onBlur={() => setIsFocusDeNghi(false)}
                  onChange={item => {
                    setValueDeNghi(item.valueDeNghi);
                    setDeNghi(item.labelDeNghi);
                    setIsFocusDeNghi(false);
                  }}
                />
              </View>

              {deNghi === 'Điều chỉnh, bổ sung: Điểm thường kỳ' ? (
                <View>
                  <View style={styles.viewNoiDungDeNghi}>
                    <Text style={[styles.styleText, { marginTop: 15 }]}>
                      Lí do: (*)
                    </Text>
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocusDeNghi && { borderColor: 'black' },
                        { marginLeft: 35 },
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={dataDeNghiDiemThuongKy}
                      maxHeight={300}
                      labelField="labelDeNghiDTK"
                      valueField="valueDeNghiDTK"
                      placeholder={!isFocusDeNghiDTK ? 'Chọn lí do' : '...'}
                      value={valueDeNghiDTK}
                      onFocus={() => setIsFocusDeNghiDTK(true)}
                      onBlur={() => setIsFocusDeNghiDTK(false)}
                      onChange={item => {
                        setValueDeNghiDTK(item.valueDeNghiDTK);
                        setDeNghiDTK(item.labelDeNghiDTK);
                        setIsFocusDeNghiDTK(false);
                      }}
                    />
                  </View>

                  <View style={[styles.viewNoiDungDeNghi, { marginTop: 10 }]}>
                    <Text style={[styles.styleText, { marginTop: 7 }]}>
                      Điểm thường kỳ: (*)
                    </Text>
                    <View
                      style={{
                        width: 232,
                        backgroundColor: '#ffffff',
                        marginHorizontal: 20,
                        borderRadius: 10,
                        marginTop: 1,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: 'gray',
                      }}>
                      <TextInput
                        textAlign="center"
                        placeholderTextColor={'gray'}
                        placeholder="0.0"
                        style={{ fontSize: 16, color: 'black', height: '100%' }}
                        onChangeText={text => setDiemThuongKy(text)}
                        keyboardType="numeric"
                        value={diemThuongKy}
                      />
                    </View>
                  </View>
                </View>
              ) : null}

              {deNghi === 'Điều chỉnh, bổ sung: Điểm thi' ? (
                <View>
                  <View style={styles.viewNoiDungDeNghi}>
                    <Text style={[styles.styleText, { marginTop: 15 }]}>
                      Lí do: (*)
                    </Text>
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocusDeNghi && { borderColor: 'black' },
                        { marginLeft: 35 },
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={dataDeNghiDiemThi}
                      maxHeight={300}
                      labelField="labelDeNghiDT"
                      valueField="valueDeNghiDT"
                      placeholder={!isFocusDeNghiDT ? 'Chọn lí do' : '...'}
                      value={valueDeNghiDT}
                      onFocus={() => setIsFocusDeNghiDT(true)}
                      onBlur={() => setIsFocusDeNghiDT(false)}
                      onChange={item => {
                        setValueDeNghiDT(item.valueDeNghiDT);
                        setDeNghiDT(item.labelDeNghiDT);
                        setIsFocusDeNghiDT(false);
                      }}
                    />
                  </View>

                  <View style={[styles.viewNoiDungDeNghi, { marginTop: 10 }]}>
                    <Text style={[styles.styleText, { marginTop: 7 }]}>
                      Điểm thi: (*)
                    </Text>
                    <View
                      style={{
                        width: 295,
                        backgroundColor: '#ffffff',
                        marginLeft: 10,
                        borderRadius: 10,
                        marginTop: 1,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: 'gray',
                      }}>
                      <TextInput
                        textAlign="center"
                        placeholderTextColor={'gray'}
                        placeholder="0.0"
                        style={{ fontSize: 18, color: 'black', height: '100%' }}
                        onChangeText={text => setDiemThi(text)}
                        keyboardType="numeric"
                        value={diemThi}
                      />
                    </View>
                  </View>
                </View>
              ) : null}

              {deNghi === '-1' || deNghi === 'Xem kết quả học tập' ? (
                <ScrollView>
                  <View style={{ marginTop: 20 }}>
                    <ScrollView horizontal>
                      <DataTable style={{ width: 700 }}>
                        <DataTable.Header>
                          <DataTable.Title
                            style={{
                              flex: 0.5,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                            }}>
                            <Text style={{ fontSize: 16, color: 'white' }}>
                              Mã môn học
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 1,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{ fontSize: 16, color: 'white' }}>
                              Tên học phần
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 0.5,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{ fontSize: 16, color: 'white' }}>
                              Điểm thường kì
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 0.3,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{ fontSize: 16, color: 'white' }}>
                              Điểm thi
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 0.5,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{ fontSize: 16, color: 'white' }}>
                              Điểm tổng kết
                            </Text>
                          </DataTable.Title>
                        </DataTable.Header>

                        {tenDot.map((item, index) => (
                          <View>
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                setSelectedHocKy(item);
                                setOnClickText(!onClickText);
                              }}>
                              <View style={styles.viewTenHocKy}>
                                {onClickText && selectedHocKy === item ? (
                                  <Image
                                    source={require('../uneti_online/images/minus.png')}
                                    style={styles.iconHocKy}
                                    resizeMode="stretch"
                                  />
                                ) : (
                                  <Image
                                    source={require('../uneti_online/images/plus.png')}
                                    style={styles.iconHocKy}
                                    resizeMode="stretch"
                                  />
                                )}
                                {onClickText && selectedHocKy === item ? (
                                  <Text
                                    style={[
                                      styles.styleTextBold,
                                      { color: '#245d7c' },
                                    ]}>
                                    Học kỳ: {item}
                                  </Text>
                                ) : (
                                  <Text style={[styles.styleTextBold]}>
                                    Học kỳ: {item}
                                  </Text>
                                )}
                              </View>
                            </TouchableOpacity>

                            {onClickText && item === selectedHocKy
                              ? monHocTheoKy.map(item => (
                                <View>
                                  <DataTable.Row key={item.id}>
                                    <DataTable.Cell
                                      style={{
                                        flex: 0.5,
                                        justifyContent: 'center',
                                        backgroundColor: '#f7f9ff',
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          color: 'black',
                                        }}>
                                        {item.maMonHoc}
                                      </Text>
                                    </DataTable.Cell>

                                    <DataTable.Cell
                                      style={{
                                        flex: 1,
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
                                        justifyContent: 'center',
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          color: 'black',
                                          marginLeft: 10,
                                        }}>
                                        {item.diemThuongKy1}
                                      </Text>
                                    </DataTable.Cell>

                                    <DataTable.Cell
                                      style={{
                                        flex: 0.3,
                                        justifyContent: 'center',
                                        backgroundColor: '#f7f9ff',
                                        marginLeft: 10,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          color: 'black',
                                        }}>
                                        {item.diemThi}
                                      </Text>
                                    </DataTable.Cell>

                                    <DataTable.Cell
                                      style={{
                                        flex: 0.5,
                                        justifyContent: 'center',
                                        backgroundColor: '#f7f9ff',
                                        marginLeft: 10,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          color: 'black',
                                        }}>
                                        {item.diemTongKet}
                                      </Text>
                                    </DataTable.Cell>
                                  </DataTable.Row>
                                </View>
                              ))
                              : null}
                          </View>
                        ))}
                      </DataTable>
                    </ScrollView>
                  </View>
                </ScrollView>
              ) : null}

              {deNghi === 'Điều chỉnh, bổ sung: Điểm thường kỳ' || deNghi === 'Điều chỉnh, bổ sung: Điểm thi' ? (
                <ScrollView>
                  <View style={{ marginTop: 20 }}>
                    <ScrollView horizontal>
                      <DataTable style={{ width: 900 }}>
                        <DataTable.Header>
                          <DataTable.Title
                            style={{
                              flex: 0.35,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                            }}>
                            <Text style={{ fontSize: 16, color: 'white' }}>
                              Chọn
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 0.5,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{ fontSize: 16, color: 'white' }}>
                              Mã môn học
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 1,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{ fontSize: 16, color: 'white' }}>
                              Tên môn học
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 0.5,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{ fontSize: 16, color: 'white' }}>
                              Điểm thường kỳ
                            </Text>
                          </DataTable.Title>
                          <DataTable.Title
                            style={{
                              flex: 0.3,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{ fontSize: 16, color: 'white' }}>
                              Điểm thi
                            </Text>
                          </DataTable.Title>

                          <DataTable.Title
                            style={{
                              flex: 0.5,
                              backgroundColor: '#245d7c',
                              justifyContent: 'center',
                              marginLeft: 10,
                            }}>
                            <Text style={{ fontSize: 16, color: 'white' }}>
                              Điểm tổng kết
                            </Text>
                          </DataTable.Title>
                        </DataTable.Header>

                        {tenDot.map((item, index) => (
                          <View>
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                setSelectedHocKy(item);
                                setOnClickText(!onClickText);
                              }}>
                              <View style={styles.viewTenHocKy}>
                                {onClickText && selectedHocKy === item ? (
                                  <Image
                                    source={require('../uneti_online/images/minus.png')}
                                    style={styles.iconHocKy}
                                    resizeMode="stretch"
                                  />
                                ) : (
                                  <Image
                                    source={require('../uneti_online/images/plus.png')}
                                    style={styles.iconHocKy}
                                    resizeMode="stretch"
                                  />
                                )}
                                {onClickText && selectedHocKy === item ? (
                                  <Text
                                    style={[
                                      styles.styleTextBold,
                                      { color: '#245d7c' },
                                    ]}>
                                    Học kỳ: {item}
                                  </Text>
                                ) : (
                                  <Text style={[styles.styleTextBold]}>
                                    Học kỳ: {item}
                                  </Text>
                                )}
                              </View>
                            </TouchableOpacity>

                            {onClickText && item === selectedHocKy
                              ? monHocTheoKy.map(item => (
                                <View>
                                  <DataTable.Row key={item.id}>
                                    <DataTable.Cell
                                      style={{
                                        flex: 0.35,
                                        justifyContent: 'center',
                                        backgroundColor: '#f7f9ff',
                                      }}>
                                      <CheckBox
                                        isChecked={checkedItems.includes(
                                          item.id,
                                        )}
                                        onClick={() =>
                                          handleCheckboxToggle(item.id)
                                        }
                                        checkBoxColor="#2e6b8b"
                                      />
                                    </DataTable.Cell>

                                    <DataTable.Cell
                                      style={{
                                        flex: 0.5,
                                        backgroundColor: '#f7f9ff',
                                        marginLeft: 10,
                                        justifyContent: 'center',
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          color: 'black',
                                          marginLeft: 10,
                                        }}>
                                        {item.maMonHoc}
                                      </Text>
                                    </DataTable.Cell>

                                    <DataTable.Cell
                                      style={{
                                        flex: 1,
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
                                        justifyContent: 'center',
                                        backgroundColor: '#f7f9ff',
                                        marginLeft: 10,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          color: 'black',
                                        }}>
                                        {item.diemThuongKy1}
                                      </Text>
                                    </DataTable.Cell>

                                    <DataTable.Cell
                                      style={{
                                        flex: 0.3,
                                        justifyContent: 'center',
                                        backgroundColor: '#f7f9ff',
                                        marginLeft: 10,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          color: 'black',
                                        }}>
                                        {item.diemThi}
                                      </Text>
                                    </DataTable.Cell>

                                    <DataTable.Cell
                                      style={{
                                        flex: 0.5,
                                        justifyContent: 'center',
                                        backgroundColor: '#f7f9ff',
                                        marginLeft: 10,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          color: 'black',
                                        }}>
                                        {item.diemTongKet}
                                      </Text>
                                    </DataTable.Cell>
                                  </DataTable.Row>
                                </View>
                              ))
                              : null}
                          </View>
                        ))}
                      </DataTable>
                    </ScrollView>
                  </View>
                </ScrollView>
              ) : null}

            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.viewButton}>
        <View style={styles.buttonHuy}>
          <TouchableOpacity
            style={styles.touchableOpacityButton}
            onPress={() => {
              if (
                monHocTheoKy.length != 0
              ) {
                ClearData();
              } else {
                handleModalPress();
                setDiemThi('');
                setDiemThuongKy('');
              }
            }}>
            <Text style={{ color: 'black', fontSize: 19 }}>Hủy</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.buttonHuy,
            { marginRight: 30, backgroundColor: '#245d7c' },
          ]}>
          <TouchableOpacity
            style={styles.touchableOpacityButton}
            onPress={() => {
              if (deNghi === 'Xem kết quả học tập') {
                handleModalPress5();
              }
              else {
                if (monHocTheoKy.length == 0) {
                  handleModalPress1();
                }
                else {
                  if (!kiemTraChonMonHoc) {
                    handleModalPress2();
                  } else {
                    PostYeuCau();
                  }
                }
              }
            }}>
            <Text style={{ color: '#ffffff', fontSize: 19 }}>Lưu</Text>
          </TouchableOpacity>
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
  viewTenHocKy: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 8,
    alignItems: 'center',
  },

  iconHocKy: {
    width: 16,
    height: 16,
    tintColor: 'black',
  },
  styleTextBold: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
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

export default KetQuaHocTap;
