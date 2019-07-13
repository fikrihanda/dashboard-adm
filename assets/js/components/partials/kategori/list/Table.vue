<template>
  <div class="card card-primary">
    <div class="card-header d-flex align-items-center">
      Kategori
      <slot name="modal"></slot>
    </div>
    <vuetable ref="table"
              pagination-path="pagination"
              @vuetable:pagination-data="onPaginationData"
              :fields="fields"
              :api-mode="false"
              :per-page="perPage"
              :data-manager="dataManager"
              :css="css.table">
      <template v-slot:actions="props">
        <slot name="actions" :row-data="props.rowData"></slot>
      </template>
    </vuetable>
    <vue-pagination ref="pagination"
                    @vuetable-pagination:change-page="onChangePage"></vue-pagination>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Vuetable from 'vuetable-2/src/components/Vuetable'
  import VuePagination from '@/js/components/partials/vuetable/VuePagination'

  export default {
    data() {
      return {
        fields: [
          {
            name: 'name',
            title: 'Nama',
            sortField: 'name',
            titleClass: 'd-flex align-items-center'
          },
          {
            name: '__slot:actions',
            title: 'Actions'
          }
        ],
        css: {
          table: {
            tableClass: 'table mb-0',
            sortableIcon: 'fa fa-sort fa-fw ml-auto',
            ascendingIcon: 'fa fa-sort-up fa-fw ml-auto',
            descendingIcon: 'fa fa-sort-down fa-fw ml-auto'
          }
        },
        perPage: 5
      }
    },
    components: {
      Vuetable,
      VuePagination
    },
    computed: {
      ...mapGetters('Kategori', {
        local: 'kategoris'
      })
    },
    watch: {
      local() {
        this.$refs.table.refresh()
      }
    },
    methods: {
      dataManager(sortOrder, pagination) {
        let local = this.local
        if (sortOrder.length > 0) local = _.orderBy(
          local,
          sortOrder[0].sortField,
          sortOrder[0].direction
        )
        pagination = this.$refs.table.makePagination(
          local.length,
          this.perPage
        )
        let from = pagination.from - 1
        let to = from + this.perPage
        return {
          pagination: pagination,
          data: _.slice(local, from, to)
        }
      },
      onPaginationData(paginationData) {
        this.$refs.pagination.setPaginationData(paginationData)
      },
      onChangePage(page) {
        this.$refs.table.changePage(page)
      }
    }
  }
</script>
