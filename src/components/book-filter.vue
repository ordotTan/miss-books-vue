<template>
<div>
    <form>
        Search Books by:
      <input @input="filter" type="text" placeholder="Title" v-model="filterBy.searchStr"/>
      <input @input="filter" type="number" placeholder="Min price" v-model.number="filterBy.minPrice"/>
      <input @input="filter" type="number" placeholder="Max price" v-model.number="filterBy.maxPrice"/>
    </form>
    <button @click="clearFilter">Clear</button>
</div>
</template>

<script>
    export default {
        name: 'book-filter',
        data() {
            return {
                filterBy: {
                    searchStr: '',
                    minPrice:'',
                    maxPrice:''
                }
            }
        },
        methods: {
            filter() {
                this.$emit('filter', {...this.filterBy});
            },
            clearFilter() {
               this.filterBy.searchStr= ''
               this.filterBy.minPrice=''
               this.filterBy.maxPrice=''
               this.filter()
            }
        }
    }
</script>
<style lang="scss" scoped>
form {
    border-top:1px solid grey;
}
input {
    margin: 10px;;  
}
button {
    margin-top:10px;
}
</style>