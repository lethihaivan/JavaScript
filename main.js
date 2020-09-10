var danhSachSinhVien = new DanhSachSinhVien();

var validate = new Validation();
// viet web thi cai apache vo, win thi dung thang xamp mà làm
// nguyen tac la html load xong moi goi function js
//  debug tưng bước 
document.addEventListener('DOMContentLoaded', (event) => {
  GetStorage();
})
function DomID(id)
{
    var element = document.getElementById(id);
    return element;
}

function ThemSinhVien()
{
    //Lấy dữ liệu từ người dùng nhập vào
    var masv = DomID("masv").value;
    var hoten = DomID("hoten").value;
    var email = DomID("email").value;
    var loi = 0;
    //Kiểm tra validation
    if(KiemTraDauVaoRong("masv",masv) == true)
    {
        loi++;
    }
    if(KiemTraDauVaoRong("hoten",hoten) == true)
    {
        loi++;
    }  
    if(validate.KiemTraEmail(email))
    {
        document.getElementById("email").style.borderColor = "green";
    }
    else
    {
        document.getElementById("email").style.borderColor = "red";
        loi++;
    }
    if(loi != 0)
    {
         return ;
    }
    //Thêm sinh viên 
    var sinhvien = new SinhVien(masv,hoten,email);
    danhSachSinhVien.ThemSinhVien(sinhvien);
    CapNhatDanhSachSV(danhSachSinhVien);
    console.log(danhSachSinhVien);
}


function KiemTraDauVaoRong(ID,value)
{
    //Kiểm tra mã sinh viên rổng
    if(validate.KiemTraRong(value) == true)
    {
        DomID(ID).style.borderColor = "red"; 
        return true;                 
    }
    else
    {
        DomID(ID).style.borderColor = "green";  
        return false;
    } 
}


function CapNhatDanhSachSV (DanhSachSinhVien)
{
    var lstTableSV = DomID("tbodySinhVien");
    lstTableSV.innerHTML = "";
    //  kiem tra nó có data hay null
    for(var i = 0; i <  DanhSachSinhVien.DSSV?.length ; i++ )
    {
        //Lấy thông tin sinh viên từ trong mảng sinh viên
        var sv = DanhSachSinhVien.DSSV[i];
        //Tạo thẻ tr
        var trSinhVien = document.createElement("tr");
        trSinhVien.id = sv.MaSV;
        trSinhVien.className = "trSinhVien";
        trSinhVien.setAttribute("onclick","ChinhSuaSinhVien('"+sv.MaSV+"')");
        //Tạo các thẻ td và filter dữ liệu sinh viên thứ [i] vào
        var tdCheckBox = document.createElement('td');
        var ckbMaSinhVien = document.createElement('input');
        console.log(ckbMaSinhVien);
        ckbMaSinhVien.setAttribute("class","ckbMaSV");
        ckbMaSinhVien.setAttribute("type","checkbox");
        ckbMaSinhVien.setAttribute("value",sv.MaSV);
        tdCheckBox.appendChild(ckbMaSinhVien);

        var tdMaSV = TaoTheTD("MaSV",sv.MaSV);
        var tdHoTen = TaoTheTD("HoTen",sv.HoTen);
        var tdEmail = TaoTheTD("Email",sv.Email);

        //Append các td vào tr
        trSinhVien.appendChild(tdCheckBox);
        trSinhVien.appendChild(tdMaSV);
        trSinhVien.appendChild(tdHoTen);
        trSinhVien.appendChild(tdEmail);

        //Append các tr vào tbodySinhVien
        lstTableSV.appendChild(trSinhVien);
    }

}
function SetStorage()
{
   
    var jsonDanhSachSinhVien = JSON.stringify(danhSachSinhVien.DSSV);
    localStorage.setItem("DanhSachSV",jsonDanhSachSinhVien);
}

function GetStorage()
{
    var jsonDanhSachSinhVien = localStorage.getItem("DanhSachSV");
    var mangDSSV = JSON.parse(jsonDanhSachSinhVien);
    // kiểm tra trước khi gán vô bảng
    if(mangDSSV && mangDSSV?.lengh) {
        danhSachSinhVien.DSSV = mangDSSV;
        console.log(danhSachSinhVien);
        CapNhatDanhSachSV(danhSachSinhVien);
    }

}
function TaoTheTD (className, value)
{
    var td = document.createElement("td");
    td.className = className;
    td.innerHTML = value;
    return td;
}



//Xóa sinh viên
function XoaSinhVien()
{

    var lstMaSV = document.getElementsByClassName("ckbMaSV");

    var lstMaSVDuocChon = [];
    for(i = 0 ; i<lstMaSV.length ;i++)
    {
        console.log(lstMaSV[i]);
        if(lstMaSV[i].checked)
        {
            lstMaSVDuocChon.push(lstMaSV[i].value);
        }
    }
    danhSachSinhVien.XoaSinhVien(lstMaSVDuocChon);
    CapNhatDanhSachSV(danhSachSinhVien);
}


function TimKiemSinhVien()
{
    var tukhoa = DomID("tukhoa").value;
    var lstDanhSachSinhVienTimKiem = danhSachSinhVien.TimKiemSinhVien(tukhoa);
    CapNhatDanhSachSV(lstDanhSachSinhVienTimKiem);
}



function ChinhSuaSinhVien(masv)
{
   
    var sinhvien = danhSachSinhVien.TimSVTheoMa(masv);
    if(sinhvien!=null)
    {
        DomID("masv").value = sinhvien.MaSV;
        DomID("hoten").value = sinhvien.HoTen;
        DomID("email").value = sinhvien.Email;
    }

}

function LuuThongTin()
{
    //Lấy dữ liệu từ người dùng nhập vào
    var masv = DomID("masv").value;
    var hoten = DomID("hoten").value;
    var email = DomID("email").value;

    var loi = 0;
    //Kiểm tra validation
    if(KiemTraDauVaoRong("masv",masv) == true)
    {
        loi++;
    }
    if(KiemTraDauVaoRong("hoten",hoten) == true)
    {
        loi++;
    }
    if(validate.KiemTraEmail(email))
    {
        document.getElementById("email").style.borderColor = "green";
    }
    else
    {
        document.getElementById("email").style.borderColor = "red";
        loi++;
    }

    if(loi != 0)
    {
        return ;
    }
    //Thêm sinh viên
    var sinhvien = new SinhVien(masv,hoten,email);
    danhSachSinhVien.SuaSinhVien(sinhvien);
    CapNhatDanhSachSV(danhSachSinhVien);
}

