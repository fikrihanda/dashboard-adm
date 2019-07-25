<template>
  <div class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          Info Supplier
        </div>
        <div class="table-responsive">
          <table class="table mb-0">
            <tr>
              <th>Nama</th>
              <td>: {{supplier.name}}</td>
            </tr>
            <tr>
              <th>Alamat</th>
              <td>: {{supplier.street}}</td>
            </tr>
            <template v-if="supplier.phone">
              <tr>
                <th colspan="2" class="text-center">
                  Telepon
                </th>
              </tr>
              <tr v-for="(p, i) in supplier.phone" :key="'p-' + i">
                <th>{{p.alias}}</th>
                <td>: {{p.number}}</td>
              </tr>
            </template>
            <template v-if="supplier.bank">
              <tr>
                <th colspan="2" class="text-center">
                  Bank
                </th>
              </tr>
              <tr v-for="(b, i) in supplier.bank" :key="'b-' + i">
                <th>{{b.alias}}</th>
                <td>: {{b.number}}</td>
              </tr>
            </template>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['supplier'],
    mounted() {
      $(this.$el).on('hide.bs.modal', () => {
        this.$emit('delete-supplier')
      })
    }
  }
</script>
