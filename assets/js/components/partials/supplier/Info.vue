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
              <template v-if="supplier.phone.length > 1">
                <tr>
                  <th :rowspan="supplier.phone.length">
                    Telepon
                  </th>
                  <td>
                    : {{supplier.phone[0].number}}
                  </td>
                </tr>
                <template v-for="(p, i) in supplier.phone">
                  <tr v-if="i > 0">
                    <td>
                      : {{p.number}}
                    </td>
                  </tr>
                </template>
              </template>
              <tr v-else>
                <th>
                  Telepon
                </th>
                <td>
                  : {{ supplier.phone[0].number }}
                </td>
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
