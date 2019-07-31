<template>
  <div class="row">
    <div class="col-12">
      <form action="#" class="print-well" @submit.prevent="findSupplier">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Cari" v-model="s">
          <div class="input-group-append">
            <button type="submit" class="btn btn-primary">
              <i class="fa fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </form>
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
        s: '',
        supplier: [],
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
            {text: 'Data Supplier', style: 'contentTitle'},
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
      ...mapGetters('Supplier', [
        'suppliers'
      ])
    },
    watch: {
      suppliers() {
        this.supplier = this.suppliers
      },
      supplier() {
        this.makePdf()
      }
    },
    methods: {
      makeTable() {
        let supplier = []
        if (_.isEmpty(this.supplier)) supplier.push([
          {text: 'Supplier tidak ada', colSpan: 2}
        ])
        else _.forEach(this.supplier, val => {
          supplier.push([
            val.name,
            val.street
          ])
        })
        this.pdf.content[1] = {
          table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: [
              ['Nama', 'Alamat'],
              ...supplier
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
      findSupplier() {
        if (_.isEmpty(this.s)) this.supplier = this.suppliers
        else this.supplier = _.filter(this.suppliers, val => {
          let reg = new RegExp(this.s, 'i')
          let findName = val.name.search(reg)
          let findStreet = val.street.search(reg)
          return findName > -1 || findStreet > -1
        })
      }
    },
    mounted() {
      this.supplier = this.suppliers
      this.makePdf()
    }
  }
</script>
