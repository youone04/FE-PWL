import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import moment from "moment";
import "moment/locale/id";

const DownloadLaporan = async (offset,limit,months) => {
    const dateNow = new Date();
    const date = dateNow.getDate();
    const month = dateNow.getMonth() + 1;
    const year = dateNow.getFullYear();

    const numberWithCommas = (x) => {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
  try {
    const dataLaporan = await fetch(
        // process.env.REACT_APP_API_URL_TRANSAKSI
      `${process.env.REACT_APP_API}/api/laporan-denda?offset=${offset}&limit=${limit}&month=${months}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const dataLapor = await dataLaporan.json();
  

    const convertNo = dataLapor.dataAll.map((item ,i) => 
      ({ ...item, No: i+ 1, ID_Transaksi: item.id,Nama_Peminjam: item.nama_peminjam,Nama_Buku:item.nama_buku,Denda: numberWithCommas(item.denda),Tanggal_pengembalian:moment(item.updated_at).format("LL")}));
     
    function buildTableBody(data, columns) {
      var body = [];

      body.push(columns);

      data.forEach(function (row) {
        var dataRow = [];

        columns.forEach(function (column) {
          dataRow.push(row[column].toString());
        });

        body.push(dataRow);
      });

      return body;
    }

    function table(data, columns) {
      return {
        table: {
          headerRows: 1,
          widths: [28, 100, 120, 80,60, 80],
          body: buildTableBody(data, columns),
        },
      };
    }

    var dd = {
      content: [
        { text: `Data Denda Perpustakaan`, style: "header" },
        { text: `Bulan ${months}`, style: "subheader" },
        { text: `Di cetak : ${date}/${month}/${year}`, style: "tanggal" },
        table(convertNo, [
          "No",
          "ID_Transaksi",
          "Nama_Peminjam",
          "Nama_Buku",
          "Denda",
          "Tanggal_pengembalian",
        ]),
        { text: "Total Denda", style: "normal" },
        { text: `Rp.${numberWithCommas(dataLapor.denda) || 0}`, style: "harga" },
      ],
      styles: {
        normal: {
          fontSize: 12,
          margin: [0, 20, 0, 0],
          alignment: "left",
        },
        harga: {
          fontSize: 12,
          margin: [0, 10, 0, 0],
          alignment: "left",
          bold: true,
        },
        tanggal: {
          fontSize: 12,
          margin: [0, 10, 0, 10],
          alignment: "left",
          bold: true,
        },
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          alignment: "center",
        },
        subheader: {
          fontSize: 12,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 2],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
      },
      defaultStyle: {
        // alignment: 'justify'
      },
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(dd).open();
  } catch (error) {
    console.log(error.response && error.response.data.message ? error.response.data.message : error.message,)
    alert("err");
  }
};
export default DownloadLaporan;