<template>
  <div>
    <dialog ref="dialogg" id="dialogbox" >
      <h1>Added stuff to firebase, yay you!</h1>
  
    </dialog>
    <button
      id="floatyClose"
      @click="$emit('close')"
    >
      XX
    </button>

    <button class="btn-add" @click="firebaseAddSingleItem(), snackbarTest()">Add Item</button>
    <div>
      <input type="text" placeholder="Product name" v-model="AddProductData.productName" >

    </div>

  </div>
</template>

<script setup>
import useProducts from '../modules/useProducts.js';

import { ref } from 'vue';
const dialogg = ref(null);

let snackbarTest = () => {
  dialogg.value.setAttribute("open", "");
  //document.getElementById("dialogbox").setAttribute("open", "");
  setTimeout(() => { 
    dialogg.value.removeAttribute("open");
   // document.getElementById("dialogbox").removeAttribute("open");
  }, 2000);
}


const { 
  firebaseAddSingleItem ,
  AddProductData,
} = useProducts();


</script>

<style lang="scss" scoped>

</style>