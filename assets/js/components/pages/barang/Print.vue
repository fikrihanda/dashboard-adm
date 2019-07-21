<template>
  <div class="row">
    <div class="col-12">
      <div class="print-well">
        <div class="input-group">
          <div class="input-group-prepend">
            <label for="kategori" class="input-group-text">
              Kategori
            </label>
          </div>
          <select id="kategori" class="form-control" v-model="kategori">
            <option value="">Select Kategori</option>
            <option v-for="(kat, index) in kategoris" :value="kat.id" :key="index">
              {{kat.name}}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="col-12">
      <embed :src="url" type="application/pdf" class="print-content">
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        url: '',
        kategori: '',
        barang: [],
        pdf: {
          header: [
            {
              text: [
                'DASHBOARD ',
                {text: 'ADM', style: 'headerTitleBold'}
              ],
              style: 'headerTitle'
            }
          ],
          content: [
            {text: 'Data Barang', style: 'contentTitle'},
            ''
          ],
          styles: {
            headerTitle: {
              fontSize: 18.75,
              alignment: 'center',
              margin: [0, 15, 0, 0]
            },
            headerTitleBold: {
              bold: true
            },
            contentTitle: {
              margin: [0, 0, 0, 15]
            }
          },
          defaultStyle: {
            font: 'OpenSans',
            fontSize: 12
          },
          pageSize: 'A4',
          pageMargins: [30, 60, 30, 30]
        }
      }
    },
    computed: {
      ...mapGetters('Kategori', [
        'kategoris'
      ]),
      ...mapGetters('Barang', [
        'barangs'
      ])
    },
    watch: {
      barangs() {
        this.barang = this.barangs
      },
      barang() {
        this.makePdf()
      },
      kategori() {
        if (_.isEmpty(this.kategori) && !_.isNumber(this.kategori)) return
        if (this.kategori === 0) return
        this.barang = this.$store.getters['Barang/barangsFindbyKat'](this.kategori)
      }
    },
    methods: {
      makeTable() {
        let barang = []
        if (_.isEmpty(this.barang)) barang.push([
          {text: 'Barang tidak ada', colSpan: 4}
        ])
        else _.forEach(this.barang, val => {
          barang.push([
            val.name,
            val.qty,
            this.formatPrice(val.price),
            val.kategori.name
          ])
        })
        this.pdf.content[1] = {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [
              ['Nama', 'Quantity', 'Harga', 'Kategori'],
              ...barang
            ]
          },
          layout: {
            paddingLeft: function() { return 6 },
            paddingRight: function() { return 6 },
            paddingTop: function() { return 6 },
            paddingBottom: function() { return 6 }
          }
        }
      },
      makePdf() {
        this.makeTable()
        pdfMake.createPdf(
          this.pdf
        ).getDataUrl((url) => {
          this.url = url
        })
      },
      formatPrice(val) {
        let rupiah = ''
        let valrev = val.toString().split('').reverse().join('')
        for(let i = 0; i < valrev.length; i++) {
          if((i % 3) === 0) rupiah += valrev.substr(i, 3) + '.'
        }
        return `Rp. ${rupiah.split('', rupiah.length - 1).reverse().join('')}`
      }
    },
    mounted() {
      this.barang = this.barangs
      this.makePdf()
    }
  }
</script>
